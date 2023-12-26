// #https://nuxt.com/docs/getting-started/error-handling#vue-rendering-lifecycle
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook("vue:error", (error, instance, info) => {
    // handle error, e.g. report to a service
  });
});
