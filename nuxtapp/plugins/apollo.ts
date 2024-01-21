export default defineNuxtPlugin((nuxtApp) => {
  // access cookie for auth
  nuxtApp.hook("apollo:auth", ({ client, token }) => {
    // apply apollo client token
    token.value = useStoreApiAuth().token$;
  });
});
