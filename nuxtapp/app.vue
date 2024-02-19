<script setup lang="ts">
// # force the color mode at the page level (only parent)
// # by setting the colorMode property, nuxt3 only
// definePageMeta({
//   colorMode: "light",
// });
import { SpinnerAppProcessing } from "@/components/ui";

const auth = useStoreApiAuth();
onMounted(() => {
  watchEffect(() => console.log({ auth: auth.isAuth$ }));
});

onUnmounted(() => {
  useAppMounted().value = false;
});

// theme
// import { type IThemeToggle } from "@/types";
const { theme } = useNuxtApp().$theme;

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
    <VSystemBar height="16" class="px-2">
      <VSpacer />
      <VIcon size="12" icon="$complete"/>
    </VSystemBar>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <NuxtLoadingIndicator color="red" />
    <SpinnerAppProcessing />
    <VFooter app height="35">foo</VFooter>
  </VApp>
</template>

<style>
.BLUR-enter-active,
.BLUR-leave-active {
  transition: all 0.24s;
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
