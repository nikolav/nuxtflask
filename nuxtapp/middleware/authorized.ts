export default defineNuxtRouteMiddleware(async () => {
  if (!useStoreApiAuth().isAdmin$) return await navigateTo({ name: "auth" });
});
