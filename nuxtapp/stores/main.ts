import { unset, set, each, forEach, get as getPath } from "@/utils";
import { type TStoreMain } from "@/types";
// @useStoreMain
export const useStoreMain = defineStore("main", () => {
  const {
    stores: {
      main: { initial },
    },
  } = useAppConfig();
  // @store
  const store$ = ref(initial);
  const get = (path: any) => getPath(store$.value, path);
  const put = (vars: TStoreMain) => {
    each(vars, (value, path) => {
      set(store$.value, path, value);
    });
  };
  const drop = (...keysToDrop: string[]) => {
    forEach(keysToDrop, (path) => {
      unset(store$.value, path);
    });
  };

  return {
    store$,
    get,
    put,
    drop,
  };
});
