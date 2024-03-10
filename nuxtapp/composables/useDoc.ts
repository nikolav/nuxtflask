import type { IDoc } from "@/types";
import { Q_docByDocId, M_docUpsert } from "@/graphql";
import { get, batchSet } from "@/utils";

export const useDoc = <TDoc = Record<string, any>>(
  doc_id: string,
  initialEnabled = true
) => {
  const auth = useStoreApiAuth();
  const toggleEnabled = useToggleFlag(initialEnabled);
  const mounted$ = useMounted();
  const enabled$ = computed(
    () => !!(mounted$.value && toggleEnabled.isActive.value && auth.token$)
  );
  const { result, refetch, load, loading, error } = useLazyQuery<{
    docByDocId: IDoc<TDoc>;
  }>(
    Q_docByDocId,
    { doc_id },
    {
      enabled: enabled$,
      pollInterval: useAppConfig().graphql.STORAGE_QUERY_POLL_INTERVAL,
    }
  );
  const data$ = computed(
    () =>
      (enabled$.value ? result.value?.docByDocId : undefined) || <IDoc<TDoc>>{}
  );
  const reload = async () => await refetch();

  const { runSetup: queryStart } = useRunSetupOnce(load);
  watchEffect(() => {
    if (enabled$.value) queryStart();
  });

  const { mutate: mutateDocUpsert } = useMutation<IDoc<TDoc>>(M_docUpsert);

  const put = async (putData: Record<string, any>) => {
    if (!enabled$.value) return;
    // update clone
    const newData_ = batchSet(get(data$.value, "data"), putData);
    await mutateDocUpsert({ data: newData_, doc_id });
  };

  const ioEvent$ = computed(() =>
    enabled$.value
      ? `${useAppConfig().io.IOEVENT_DOC_CHANGE_prefix}${doc_id}`
      : ""
  );
  watchEffect(() => {
    useIOEvent(ioEvent$.value, reload);
  });

  return {
    // #crud
    data: data$,
    put,
    reload,

    // #crud/read
    error,
    loading,
    IOEVENT: ioEvent$,
    enabled: enabled$,
    doc_id,

    // #on/off
    toggleEnabled,
  };
};
