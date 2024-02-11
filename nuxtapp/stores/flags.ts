export const useStoreFlags = defineStore("flags", () => {
  const flags$ = ref(useAppConfig().stores.flags.initial);
  const flag = (name: string) => flags$.value[name] || false;
  const on = (name: string) => {
    flags$.value[name] = true;
  };
  const off = (name: string) => {
    flags$.value[name] = false;
  };
  const toggle = (name: string) => {
    flags$.value[name] = !flag(name);
  };
  const isSet = (name: string) => true === flag(name);
  return { flag, on, off, toggle, isSet };
});
// const flags = useStoreFlags()
// console.log(flags.flag("APP_PROCESSING"))
// flags.toggle("APP_PROCESSING")
// console.log(flags.isSet("APP_PROCESSING"))
