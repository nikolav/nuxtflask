export default defineNuxtRouteMiddleware((to, from) => {
  console.log({ time: Date.now(), to, from });
});
