<script setup lang="ts">
//
// # force the color mode at the page level (only parent)
// # by setting the colorMode property, nuxt3 only
// definePageMeta({
//   colorMode: "light",
// });

const { THEME_LIGHT, THEME_DARK } = useAppConfig();
// provide(useAppConfig().key.INJECT_AUTHAPI, useStoreApiAuth());
// provide(useAppConfig().key.INJECT_AUTHAPI, useStoreApiAuth2());

onUnmounted(() => {
  useAppMounted().value = false;
});

useHead({
  titleTemplate: (ttl) => `[${ttl}]`,
  bodyAttrs: {
    class:
      "**dark:bg-slate-900 **dark:text-white/80 **dark:selection:bg-white/20",
  },
});


const theme$ = ref("dark");
provide(useAppConfig().key.INJECT_THEME, theme$);


// eos
</script>

<template>
  <VApp :theme="theme$" id="app-main" class="**text-indigo-800">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <NuxtLoadingIndicator color="red" />
  </VApp>
</template>

<style>
.BLUR-enter-active,
.BLUR-leave-active {
  transition: all 0.122s;
}

.BLUR-leave-active {
  position: absolute;
  z-index: -1;
  width: 100%;
}

.BLUR-enter-from,
.BLUR-leave-to {
  opacity: 0;
  filter: blur(0.2rem);
}
</style>
