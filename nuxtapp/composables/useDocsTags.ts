import { Q_tagsByDocId } from "@/graphql";

export const useDocsTags = (id: number) => {
  const ID$ = ref(id);

  const auth = useStoreApiAuth();
  const mounted$ = useMounted();
  const enabled_ = computed(() => !!(mounted$.value && auth.token$));

  const { result, refetch, load } = useLazyQuery<{
    tagsByDocId: string[];
  }>(
    Q_tagsByDocId,
    { id: ID$ },
    {
      enabled: enabled_,
      pollInterval: useAppConfig().graphql.STORAGE_QUERY_POLL_INTERVAL,
    }
  );
  const tags$ = computed(
    () => (enabled_.value ? result.value?.tagsByDocId : undefined) || []
  );
  const reload = async () => await refetch();
  const { runSetup: queryStart } = useRunSetupOnce(load);
  watchEffect(() => {
    if (enabled_.value) queryStart();
  });

  const ioEvent$ = computed(() =>
    enabled_.value
      ? `${useAppConfig().io.IOEVENT_DOCS_TAGS_CHANGE_prefix}${ID$.value}`
      : ""
  );
  // @io/listen
  watchEffect(() => useIOEvent(ioEvent$.value, reload));

  return {
    ID$,
    tags: tags$,
  };
};
