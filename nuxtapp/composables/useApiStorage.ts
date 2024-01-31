// import { useApiDocs } from './useApiDocs';
import axios from "axios";
import FormData from "form-data";

import { Q_storageList } from "@/graphql/queries";
import { each } from "@/utils";
import { URL_STORAGE } from "@/config";
import { type IStorageFileInfo } from "@/types";

interface IFilesUpload {
  [name: string]: {
    file?: any | undefined;
    data: {
      title?: string | undefined;
      description?: string | undefined;
    };
  };
}

export const useApiStorage = () => {
  const {
    graphql: { STORAGE_QUERY_POLL_INTERVAL },
    io: { IOEVENT_STORAGE_CHANGE },
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

  const { runSetup: queryStart } = useSetupOnce(loadStorage);
  watchEffect(() => {
    if (isAuth$.value) queryStart();
  });

  watch(
    () => [auth.token$, useAppMounted().value],
    (token, appMounted) => {
      if (!(token && appMounted)) return;
      reloadFiles();
    }
  );

  useIOEvent(`${IOEVENT_STORAGE_CHANGE}${auth.user$?.id}`, reloadFiles);

  // upload({
  //   'file-1': {
  //     'data': {},
  //     'file': {}
  //   },
  //   // ...
  // })
  const uploadStatus = useProcessMonitor();
  const upload = async (uplFiles: IFilesUpload) => {
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
      const { data } = await axios({
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
          // upload info available here; set flag =true; resolve
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
  const download = async (file_id: string) => {};
  const remove = async (file_id: string) => {};

  return {
    files: files$,
    upload,
    download,
    remove,
  };
};
