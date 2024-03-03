export default defineNuxtRouteMiddleware(async () => {
  const auth = useStoreApiAuth();
  if (!(auth.isUser$ || auth.isAdmin$))
    return await navigateTo({ name: "auth" });
});
