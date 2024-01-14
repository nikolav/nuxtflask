import { URL_DOCS } from "@/config";
import type { OrNull, IDoc } from "@/types";

export const useApiDocs = <TDocData>(tagName: string) => {
  const {
    io: { IOEVENT_DOCS_CHANGE },
  } = useAppConfig();
  const ioEventDocsChange = `${IOEVENT_DOCS_CHANGE}:${tagName}`;
  const docsUrl = `${URL_DOCS}/${tagName}`;
  const toggleProcessing = useToggleFlag();

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

  useIOEvent(ioEventDocsChange, reload);

  // # upsert docs
  const put = async (doc: IDoc<TDocData>) => {
    let res: OrNull<IDoc<TDocData>> = null;

    if (toggleProcessing.isActive.value) return;

    toggleProcessing.on();

    try {
      res = await $fetch(docsUrl, {
        method: "POST",
        body: doc,
      });
    } catch (err) {
      throw err;
    } finally {
      toggleProcessing.off();
    }

    return res;
  };

  // # delete docs
  const rm = async (doc: IDoc<TDocData>) => {
    let res: OrNull<IDoc<TDocData>> = null;
    if (toggleProcessing.isActive.value) return;

    toggleProcessing.on();

    try {
      res = await $fetch(docsUrl, {
        method: "DELETE",
        body: {
          id: doc?.id,
        },
      });
    } catch (err) {
      throw err;
    } finally {
      toggleProcessing.off();
    }

    return res;
  };
  //
  return {
    error,
    pending,
    processing: toggleProcessing.isActive,
    reload,
    put,
    rm,
    docs,
  };
};
