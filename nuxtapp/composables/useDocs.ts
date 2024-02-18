import { Q_docsByTopic, M_docsUpsert, M_docsRm } from "@/graphql";
import type { OrNull, IDoc, TDocData } from "@/types";

// .useDocs
export const useDocs = <TData = TDocData>(
  initialTag = "",
  initialEnabled = true
) => {
  const topic$ = ref(initialTag);
  const auth = useStoreApiAuth();
  const toggleEnabled = useToggleFlag(initialEnabled);
  const mounted$ = useMounted();
  const enabled$ = computed(
    () =>
      !!(
        mounted$.value &&
        toggleEnabled.isActive.value &&
        auth.token$ &&
        topic$.value
      )
  );

  const { result, refetch, load, loading, error } = useLazyQuery<{
    docsByTopic: IDoc<TData>[];
  }>(
    Q_docsByTopic,
    { topic: topic$ },
    {
      enabled: enabled$,
      pollInterval: useAppConfig().graphql.STORAGE_QUERY_POLL_INTERVAL,
    }
  );

  const data$ = computed(() =>
    enabled$.value ? result.value?.docsByTopic || [] : []
  );
  const reload = async () => await refetch();

  const { runSetup: queryStart } = useRunSetupOnce(load);
  watchEffect(() => {
    if (enabled$.value) queryStart();
  });

  const ioEvent$ = computed(() =>
    enabled$.value
      ? `${useAppConfig().io.IOEVENT_DOCS_CHANGE_JsonData}${topic$.value}`
      : ""
  );

  const { mutate: mutateDocsUpsert } = useMutation<IDoc<TData>>(M_docsUpsert);
  const { mutate: mutateDocsRm } = useMutation<OrNull<IDoc<TData>>>(M_docsRm);

  const upsert = async (data: TData, id: OrNull<number> = null) => {
    if (enabled$.value)
      await mutateDocsUpsert({ topic: topic$.value, data, id });
  };

  const remove = async (id: number) => {
    if (enabled$.value) await mutateDocsRm({ topic: topic$.value, id });
  };

  // @io/listen
  watchEffect(() => {
    useIOEvent(ioEvent$.value, reload);
  });

  return {
    // # data by topic
    topic$,

    // # data
    data: data$,

    // # crud
    upsert,
    remove,
    reload,

    // # flags
    error,
    loading,
    IOEVENT: ioEvent$,
    enabled: enabled$,

    // on/off
    toggleEnabled,
  };
};
