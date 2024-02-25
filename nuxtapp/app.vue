<script setup lang="ts">
// # force the color mode at the page level (only parent)
// # by setting the colorMode property, nuxt3 only
// definePageMeta({
//   colorMode: "light",
// });
import { SpinnerAppProcessing } from "@/components/ui";
import { authUser } from "@/config";

onUnmounted(() => {
  useAppMounted().value = false;
});

const auth = useStoreApiAuth();

const { runSetup: onceDefaultUserLogin } = useRunSetupOnce(
  async () => await auth.login(authUser)
);
onMounted(() => {
  watchEffect(() => {
    if (auth.initialized$ && !auth.isAuth$) onceDefaultUserLogin();
  });
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
    class: "dark:selection:bg-white/20 scrollbar-thin-light",
  },
  htmlAttrs: htmlAttrs$,
});

// eos
</script>

<template>
  <VApp :theme="theme" id="app-main">
    <VSystemBar color="primary-darken-2" height="18" class="px-2">
      <VSpacer />
      <VIcon v-if="auth.isAdmin$" start size="14" icon="$iconUserShield" />
      <VIcon v-if="auth.isAuth$" start size="14" icon="$complete" />
    </VSystemBar>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <NuxtLoadingIndicator color="red" />
    <SpinnerAppProcessing />
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
