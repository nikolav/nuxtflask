<script setup lang="ts">
// # force the color mode at the page level (only parent)
// # by setting the colorMode property, nuxt3 only
// definePageMeta({
//   colorMode: "light",
// });
onUnmounted(() => {
  useAppMounted().value = false;
});

// theme
import { type IThemeToggle } from "@/types";
const { theme } = <IThemeToggle>useNuxtApp().$theme;

const { DARK, LIGHT } = useAppConfig().theme;
const htmlAttrs$ = computed(() => ({
  class: DARK === theme.value ? "dark" : LIGHT,
}));
useHead({
  titleTemplate: (ttl) => `[${ttl}]`,
  bodyAttrs: {
    class: "dark:selection:bg-white/20",
  },
  htmlAttrs: htmlAttrs$,
});

// eos
</script>

<template>
  <VApp :theme="theme" id="app-main" class="**text-indigo-800">
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
