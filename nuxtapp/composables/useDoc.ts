import type { IDoc } from "@/types";
import { Q_docByDocId, M_docUpsert } from "@/graphql";
import { get, batchSet } from "@/utils";


export const useDoc = <TDoc = Record<string, any>>(doc_id: string) => {
    const auth = useStoreApiAuth();
    const toggleEnabled = useToggleFlag(true);
    const mounted$ = useMounted();
    const enabled$ = computed(
        () =>
            !!(
                toggleEnabled.isActive.value &&
                auth?.token$ &&
                mounted$.value
            )
    );
    const { result, refetch, load, loading, error } =
        useLazyQuery<{ docByDocId: IDoc<TDoc> }>(
            Q_docByDocId,
            { doc_id },
            {
                enabled: enabled$,
                pollInterval: useAppConfig().graphql.STORAGE_QUERY_POLL_INTERVAL,
            }
        );
    const data$ = computed(() => result.value?.docByDocId || {});
    const reload = async () => await refetch();

    const { runSetup: queryStart } = useRunSetupOnce(load);
    watchEffect(() => {
        if (enabled$.value) queryStart();
    });

    const ioEvent$ = computed(() =>
        enabled$.value
            ? `${useAppConfig().io.IOEVENT_DOC_CHANGE_prefix}${doc_id}`
            : ""
    );
    watchEffect(() => {
        useIOEvent(ioEvent$.value, reload);
    });

    const { mutate: mutateDocUpsert } = useMutation<IDoc<TDoc>>(M_docUpsert);

    const put = async (putData: TDoc) => {
        if (!enabled$.value) return;
        // update clone
        const newData_ = batchSet(get(data$.value, "data"), Object(putData))
        await mutateDocUpsert({ data: newData_, doc_id });
    };

    return {

        // #crud
        data$,
        put,
        reload,

        // #flags
        error,
        loading,
        IOEVENT: ioEvent$,
        enabled: enabled$,

        // #on/off
        toggleEnabled,
    }
};