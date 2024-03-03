import {
  Q_docsByTopic,
  M_docsUpsert,
  M_docsRm,
  M_docsUsersAdd,
  M_docsUsersRemove,
} from "@/graphql";
import type { OrNull, IDoc, TDocData } from "@/types";
import { schemaAuthCredentials } from "@/schemas";
import { isNumeric } from "@/utils";

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

  const data$ = computed(
    () => (enabled$.value ? result.value?.docsByTopic : undefined) || []
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

  const { mutate: mutateDocsUsersAdd } = useMutation(M_docsUsersAdd);
  const { mutate: mutateDocsUsersRemove } = useMutation(M_docsUsersRemove);

  const { TAG_USERS } = useAppConfig().docs;
  const usersAdd = async (email: string, password: string) => {
    let authData;
    try {
      if (TAG_USERS !== topic$.value) throw `--topic:${TAG_USERS}--`;
      authData = schemaAuthCredentials.parse({ email, password });
      return await mutateDocsUsersAdd(authData);
    } catch (error) {
      // pass
    }
  };
  const usersRemove = async (id: any) => {
    try {
      if (TAG_USERS !== topic$.value) throw `--topic:${TAG_USERS}--`;
      if (!isNumeric(id)) throw `--id:number--`;
      return await mutateDocsUsersRemove({ id: Number(id) });
    } catch (error) {
      // pass
    }
  };

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

    // users
    usersAdd,
    usersRemove,
  };
};
