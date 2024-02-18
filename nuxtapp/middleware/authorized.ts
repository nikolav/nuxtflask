export default defineNuxtRouteMiddleware(() => useStoreApiAuth().isAuth$);
