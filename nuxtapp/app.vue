<script setup lang="ts">
//
// # force the color mode at the page level (only parent)
// # by setting the colorMode property, nuxt3 only
// definePageMeta({
//   colorMode: "light",
// });

const auth = useStoreApiAuth();
provide("auth:api", auth);

useHead({
  titleTemplate: (ttl) => `[${ttl}]`,
  bodyAttrs: {
    class: "**dark:bg-slate-900 **dark:text-white/80 **dark:selection:bg-white/20",
  },
});

onUnmounted(() => {
  useAppMounted().value = false;
});

const route$ = useRoute();
const fullPath$ = computed(() => route$.fullPath);

// eos
</script>

<template>
  <main id="app-main" class="**text-indigo-800">
    <pre>
      {{ JSON.stringify({ token: auth?.token$, fullPath$ }, null, 2) }}
    </pre>
    <ul>
      <li><NuxtLink to="/">home</NuxtLink></li>
      <li><NuxtLink to="about">about</NuxtLink></li>
      <li><NuxtLink to="demo">demo</NuxtLink></li>
      <li><NuxtLink to="demo-auth">auth</NuxtLink></li>
    </ul>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <NuxtLoadingIndicator color="red" />
  </main>
</template>

<style>
/* defalut page/layout transition */
.BLUR-enter-active,
.BLUR-leave-active {
  transition: all 0.122s;
}

/* place outgoing page behind, full-width, to prevent content jump @mode.in-out */
.BLUR-leave-active {
  /* position: absolute;
  z-index: -1;
  width: 100%; */
}

.BLUR-enter-from,
.BLUR-leave-to {
  opacity: 0;
  filter: blur(0.2rem);
}
</style>
