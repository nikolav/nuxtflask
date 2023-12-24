<script setup lang="ts">
useHead({
  titleTemplate: (ttl) => `[${ttl}]`,
});

// eos
</script>

<template>
  <main id="app-main">
    <ul>
      <li><NuxtLink to="/">home</NuxtLink></li>
      <li><NuxtLink to="about">about</NuxtLink></li>
      <li><NuxtLink to="demo">demo</NuxtLink></li>
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
