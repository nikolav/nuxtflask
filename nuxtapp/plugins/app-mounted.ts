// #https://nuxt.com/docs/getting-started/error-handling#vue-rendering-lifecycle
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook("app:mounted", () => {
    useAppMounted().value = true;
  });
});
