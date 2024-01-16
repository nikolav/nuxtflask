import { URL_DOCS } from "@/config";
import type { OrNull, IDoc } from "@/types";

export const useApiDocs = <TDocData>(tagName: string) => {
  const {
    io: { IOEVENT_DOCS_CHANGE },
  } = useAppConfig();
  const ioEventDocsChange = `${IOEVENT_DOCS_CHANGE}:${tagName}`;
  const docsUrl = `${URL_DOCS}/${tagName}`;

  const crudToggleProcessing = useToggleFlag();
  const crudProcessingError$ = ref<any>(null);
  const crudProcessingStart = () => {
    crudProcessingError$.value = null;
    crudToggleProcessing.on();
  };

  const {
    error,
    pending,
    refresh,
    data: docs,
  } = useFetch<IDoc<TDocData>[]>(docsUrl, {
    key: `docs:${tagName}`,
    lazy: true,
    default: () => [],
  });
  const reload = async () => await refresh();
  const processing$ = computed(
    () => pending.value || crudToggleProcessing.isActive.value
  );

  useIOEvent(ioEventDocsChange, reload);

  // # upsert docs
  const put = async (doc: IDoc<TDocData>) => {
    let res: OrNull<IDoc<TDocData>> = null;

    if (processing$.value) return;

    crudProcessingStart();

    try {
      res = await $fetch(docsUrl, {
        method: "POST",
        body: doc,
      });
    } catch (err) {
      crudProcessingError$.value = err;
    } finally {
      crudToggleProcessing.off();
    }

    return res;
  };

  // # delete docs
  const rm = async (doc: IDoc<TDocData>) => {
    let res: OrNull<IDoc<TDocData>> = null;

    if (processing$.value) return;

    crudProcessingStart();

    try {
      res = await $fetch(docsUrl, {
        method: "DELETE",
        body: {
          id: doc?.id,
        },
      });
    } catch (err) {
      crudProcessingError$.value = err;
    } finally {
      crudToggleProcessing.off();
    }

    return res;
  };
  //
  return {
    error,
    crudError: crudProcessingError$,
    pending,
    processing: processing$,
    reload,
    put,
    rm,
    docs,
  };
};
