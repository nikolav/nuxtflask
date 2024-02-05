import { Q_docsByTopic, M_docsUpsert, M_docsRm } from "@/graphql";
import type { OrNull, IDoc, TDocData } from "@/types";

// .useDocs
export const useDocs = <TData = TDocData>(tagInitial = "") => {
  const topic$ = ref(tagInitial);
  const auth = useStoreApiAuth();
  const toggleEnabled = useToggleFlag(true);
  const enabled$ = computed(
    () =>
      !!(
        toggleEnabled.isActive.value &&
        topic$.value &&
        auth?.token$ &&
        useAppMounted().value
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
  const docs$ = computed(() => result.value?.docsByTopic || []);
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
  useIOEvent(ioEvent$.value, reload);

  const { mutate: mutateDocsUpsert } = useMutation<IDoc<TData>>(M_docsUpsert, {
    variables: {
      topic: topic$,
    },
  });
  const { mutate: mutateDocsRm } = useMutation<OrNull<IDoc<TData>>>(M_docsRm, {
    variables: {
      topic: topic$,
    },
  });

  const upsert = async (data: TData, id: OrNull<number> = null) =>
    await mutateDocsUpsert({ data, id });

  const remove = async (id: number) => await mutateDocsRm({ id });

  return {
    // # data by topic
    topic$,

    // # data
    data: docs$,

    // # crud
    upsert,
    remove,
    reload,

    // # get
    error,
    loading,
    IOEVENT: ioEvent$,
    enabled: enabled$,

    // on/off
    toggleEnabled,
  };
};
