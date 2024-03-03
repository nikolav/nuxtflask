import axios from "axios";
import FormData from "form-data";

import { Q_storageList, M_STORAGE_FILE_REMOVE } from "@/graphql";
import { assign, each, find, get, len, omit } from "@/utils";
import { URL_STORAGE } from "@/config";
import type {
  IStorageFileInfo,
  IFilesUpload,
  IStorageStatusFileSaved,
} from "@/types";
import { schemaStorageMeta } from "@/schemas";

// .useApiStorage
export const useApiStorage = (initialEnabled = true) => {
  const {
    graphql: { STORAGE_QUERY_POLL_INTERVAL },
    io: { IOEVENT_STORAGE_CHANGE },
    api: { TAG_STORAGE },
    FIELDS_OMIT_STORAGE_META,
  } = useAppConfig();

  const auth = useStoreApiAuth();
  const toggleEnabled = useToggleFlag(initialEnabled);
  const mounted$ = useMounted();
  const enabled$ = computed(
    () => !!(mounted$.value && toggleEnabled.isActive.value && auth.token$)
  );

  const {
    load: loadStorage,
    result,
    refetch,
  } = useLazyQuery<{ storageList: IStorageFileInfo[] }>(
    Q_storageList,
    undefined,
    {
      enabled: enabled$,
      pollInterval: STORAGE_QUERY_POLL_INTERVAL,
    }
  );
  const files$ = computed(
    () => (enabled$.value ? result.value?.storageList : undefined) || []
  );
  const reloadFiles = async () => await refetch();

  const { runSetup: queryStart } = useRunSetupOnce(loadStorage);
  watchEffect(() => {
    if (enabled$.value) queryStart();
  });

  watch(
    () => [auth.token$, enabled$],
    (token, enabled) => {
      if (token && enabled) reloadFiles();
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
    if (!enabled$.value) return;

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
  const publicUrl = (file_id: string) =>
    !find(files$.value, { file_id, public: true })
      ? ""
      : `${URL_STORAGE}/${file_id}`;

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
  const remove = async (fileID: string) => {
    if (enabled$.value) return await mutateRemoveFile({ fileID });
  };

  // # .meta
  const {
    enabled: enabledMeta$,
    topic$: topicStorageUser$,
    upsert: metaPut,
    IOEVENT: IOEVENT_STORAGE_META_CHANGE,
  } = useDocs();

  watch(
    () => get(auth.user$, "id"),
    (id) => {
      if (!id) return;
      topicStorageUser$.value = `${TAG_STORAGE}${id}`;
    }
  );

  const meta = async (
    values: Record<string, string | number | boolean>,
    file_id: string
  ) => {
    if (!enabled$.value) return;

    const doc = find(files$.value, { file_id });
    if (!doc?.id) return;

    let values_;
    try {
      values_ = schemaStorageMeta.parse(values);
    } catch (error) {
      // skip
      return;
    }
    if (!len(values_)) return;

    return await metaPut(
      omit(assign({}, doc, values_), FIELDS_OMIT_STORAGE_META),
      doc.id
    );
  };

  // @io/listen
  watch(
    () => get(auth.user$, "id"),
    (id) => {
      if (!id) return;
      useIOEvent(`${IOEVENT_STORAGE_CHANGE}${id}`, reloadFiles);
    }
  );
  watchEffect(() => {
    if (!enabledMeta$.value) return;
    useIOEvent(toValue(IOEVENT_STORAGE_META_CHANGE), reloadFiles);
  });

  return {
    // # ls
    files: files$,

    // # crud
    upload,
    remove,
    download,
    meta,
    publicUrl,

    // # flags
    uploadStatus,

    // @toggle
    enabled: enabled$,
    toggleEnabled,
  };
};
