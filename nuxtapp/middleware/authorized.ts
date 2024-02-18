export default defineNuxtRouteMiddleware(async () => {
  if (!useStoreApiAuth().isAuth$) return await navigateTo("auth");
});
