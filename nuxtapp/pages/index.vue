<script setup lang="ts">
// import { faker } from "@faker-js/faker";
// https://github.com/surmon-china/videojs-player
// import { VideoPlayer } from "@videojs-player/vue";

definePageMeta({
  middleware: "authorized",
});

useHead({
  title: "--home",
});

// #eos
</script>

<template>
  <section id="page-demo" class="pa-2 pa-md-4">
    <template v-for="n in 12" :key="n">
      <p class="mb-4 indent-4">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci
        temporibus quos nesciunt at quod voluptates obcaecati doloribus magnam
        voluptate porro magni ducimus, reiciendis id inventore, illum eos eum
        corrupti ut?
      </p>
    </template>
  </section>
</template>

<style scoped lang="scss">
</style>
