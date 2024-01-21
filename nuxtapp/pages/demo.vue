<script setup lang="ts">
import { idGen } from "@/utils";
// import { useStoreApiAuth } from '@/stores';
import sampleGallery from "@/assets/sample-gallery.json";

useHead({
  title: "--demo",
});

// lightbox
const lightbox = () => useNuxtApp().$lightbox.open(sampleGallery);

// #eos
</script>

<template>
    <section id="page-demo">
      <button class="p-2 bg-sky-600 rounded text-white/80" @click="lightbox">gallery</button>
      <hr class="border-2 border-sky-600 my-2" />
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime temporibus officiis illum.</p>
  </section>
</template>

<style scoped></style>
