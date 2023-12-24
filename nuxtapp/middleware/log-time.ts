export default defineNuxtRouteMiddleware((to, from) => {
  console.log({ ["@middleware.log-time"]: Date.now() });
});
