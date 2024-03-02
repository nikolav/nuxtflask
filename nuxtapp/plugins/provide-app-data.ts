import { APP_DATA } from "@/src";

export default defineNuxtPlugin((nuxtapp) => {
  const { appData: defaultAppData } = useAppConfig().defaults;
  const { PROVIDE_APP_DATA } = useAppConfig().key;
  const appData$ = useState(PROVIDE_APP_DATA, () => defaultAppData);
  nuxtapp.vueApp.provide(APP_DATA, appData$);
});
