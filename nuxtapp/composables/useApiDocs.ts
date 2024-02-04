import { URL_DOCS } from "@/config";
import type { OrNull, IDoc, TDocData as TDocData_default } from "@/types";


// .useApiDocs
export const useApiDocs = <TDocData = TDocData_default>(tagName: string) => {
  const {
    io: { IOEVENT_DOCS_CHANGE },
  } = useAppConfig();
  const ioEventDocsChange = `${IOEVENT_DOCS_CHANGE}:${tagName}`;
  const URL_DOCS__TAGGED = `${URL_DOCS}/${tagName}`;
  const KEY_NUXT_DATA_DOCS = `docs:${tagName}`;

  const crudToggleProcessing = useToggleFlag();
  const crudProcessingError$ = ref<any>(null);
  const crudProcessingStart = () => {
    crudProcessingError$.value = null;
    crudToggleProcessing.on();
  };

  const auth = useStoreApiAuth();
  const {
    stores: {
      auth: { authHeaders },
    },
  } = useAppConfig();
  const authHeaders$ = computed(() =>
    auth.token$ ? authHeaders(auth.token$) : {}
  );

  const {
    error,
    pending,
    refresh,
    data: docs,
  } = useFetch<IDoc<TDocData>[]>(URL_DOCS__TAGGED, {
    key: KEY_NUXT_DATA_DOCS,
    lazy: true,
    default: () => [],
    headers: authHeaders$,
    immediate: false,
  });

  const processing$ = computed(
    () => pending.value || crudToggleProcessing.isActive.value
  );

  const reload = async () => {
    if (auth.token$) await refresh();
  };
  watch(() => auth.token$, reload);
  onMounted(reload);

  useIOEvent(ioEventDocsChange, reload);

  // # upsert docs
  const put = async (doc: IDoc<TDocData>) => {
    let res: OrNull<IDoc<TDocData>> = null;

    if (!auth.token$) return;
    if (processing$.value) return;

    crudProcessingStart();

    try {
      res = await $fetch(URL_DOCS__TAGGED, {
        headers: authHeaders(auth.token$),
        method: "POST",
        body: doc,
      });
    } catch (err) {
      crudProcessingError$.value = err;
    }

    crudToggleProcessing.off();

    return res;
  };

  // # delete docs
  const rm = async (doc: IDoc<TDocData>) => {
    let res: OrNull<IDoc<TDocData>> = null;

    if (!auth.token$) return;
    if (processing$.value) return;

    crudProcessingStart();

    try {
      res = await $fetch(URL_DOCS__TAGGED, {
        headers: authHeaders(auth.token$),
        method: "DELETE",
        body: {
          id: doc?.id,
        },
      });
    } catch (err) {
      crudProcessingError$.value = err;
    }

    crudToggleProcessing.off();

    return res;
  };
  //
  return {
    error,
    pending,
    crudError: crudProcessingError$,
    processing: processing$,
    reload,
    put,
    rm,
    docs,
    IOEVENT: ioEventDocsChange,
  };
};
