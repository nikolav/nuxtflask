import axios from "axios";
import FormData from "form-data";

import { Q_storageList, M_STORAGE_FILE_REMOVE } from "@/graphql";
import { assign, each, find, get, omit, pick, len, some } from "@/utils";
import { URL_STORAGE } from "@/config";
import type {
  IStorageFileInfo,
  IFilesUpload,
  IStorageStatusFileSaved,
} from "@/types";

// .useApiStorage
export const useApiStorage = () => {
  const {
    graphql: { STORAGE_QUERY_POLL_INTERVAL },
    io: { IOEVENT_STORAGE_CHANGE },
    api: { TAG_STORAGE },
    FIELDS_STORAGE_META_CAN_UPDATE,
    FIELDS_OMIT_DOCS_DATA,
  } = useAppConfig();

  const auth = useStoreApiAuth();
  const isAuth$ = computed(() => !!auth.token$);

  const {
    load: loadStorage,
    result,
    refetch,
  } = useLazyQuery<{ storageList: IStorageFileInfo[] }>(
    Q_storageList,
    undefined,
    {
      pollInterval: STORAGE_QUERY_POLL_INTERVAL,
      enabled: isAuth$,
    }
  );
  const files$ = computed(() => result.value?.storageList || []);
  const reloadFiles = async () => await refetch();

  const { runSetup: queryStart } = useRunSetupOnce(loadStorage);
  watchEffect(() => {
    if (isAuth$.value) queryStart();
  });

  const appMounted$ = useAppMounted();
  watch(
    () => [auth.token$, appMounted$.value],
    (token, appMounted) => {
      if (!(token && appMounted)) return;
      reloadFiles();
    }
  );

  // upload({
  //   '#1:fileName': {
  //     'data': {},
  //     'file': File{}
  //   },
  //   // ...
  // })

  // .upload
  const uploadStatus = useProcessMonitor();
  const upload = async <TFileData = IStorageStatusFileSaved>(
    uplFiles: IFilesUpload
  ) => {
    if (!auth.token$) return;

    const fdata = new FormData();
    let numfiles = 0;
    each(uplFiles, ({ file, data }, name) => {
      if (!file) return;
      fdata.append(name, file);
      fdata.append(name, JSON.stringify(data));
      numfiles += 1;
    });
    if (!numfiles) return;

    uploadStatus.begin();
    try {
      const { data } = await axios<Record<string, TFileData>>({
        url: URL_STORAGE,
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${auth.token$}`,
        },
        data: fdata,
      });
      try {
        for (let _ in data) {
          // files uploaded; set flag =true; resolve
          uploadStatus.successful();
          return data;
        }
      } catch (error) {
        // ignore
      }
    } catch (error_) {
      uploadStatus.setError(error_);
    } finally {
      uploadStatus.done();
    }
  };

  // # .publicUrl
  const publicUrl = (file_id: string) => {
    const file = find(files$.value, { file_id, public: true });
    if (!file) return;
    return `${URL_STORAGE}/${file_id}`;
  };

  // # .download
  const download = async (file_id: string) => {
    const path = publicUrl(file_id);
    return !path
      ? null
      : await navigateTo(
        {
          path,
        },
        {
          external: true,
        }
      );
  };

  // # .remove
  const { mutate: mutateRemoveFile } = useMutation(M_STORAGE_FILE_REMOVE);
  const remove = async (fileID: string) => await mutateRemoveFile({ fileID });

  // # .meta
  // const { put: metaPut, IOEVENT: IOEVENT_STORAGE_META_CHANGE } = useApiDocs(
  //   `${TAG_STORAGE}${get(auth.user$, "id")}`
  // );
  // # .meta
  const {
    enabled: enabledMeta$,
    topic$: topicStorageUser$,
    upsert: metaPut,
    IOEVENT: IOEVENT_STORAGE_META_CHANGE
  } = useDocs();

  watch(() => get(auth.user$, "id"),
    (id) => {
      if (!id) return;
      topicStorageUser$.value = `${TAG_STORAGE}${id}`;
    });

  const meta = async (
    file_id: string,
    values: Record<string, string | number | boolean>
  ) => {
    const values_ = pick(values, FIELDS_STORAGE_META_CAN_UPDATE);
    if (!len(values_)) return;

    const doc = find(files$.value, { file_id });
    if (!doc?.id) return;

    if (!some(Object.keys(values_), (key) => get(doc, key) != values_[key]))
      return;

    return await metaPut(
      omit(assign({}, doc, values_), FIELDS_OMIT_DOCS_DATA),
      doc.id);
  };

  // @io/listen
  watch(() => get(auth.user$, "id"), (id) => {
    if (!id) return;
    useIOEvent(`${IOEVENT_STORAGE_CHANGE}${id}`, reloadFiles);
  });
  watch(enabledMeta$, (enabled) => {
    if (!enabled) return;
    useIOEvent(toValue(IOEVENT_STORAGE_META_CHANGE), reloadFiles);
  });


  return {
    // # ls
    files: files$,

    // # flags
    uploadStatus,

    // # crud
    upload,
    remove,
    download,

    // @set
    meta,

    // @get
    publicUrl,
  };
};
