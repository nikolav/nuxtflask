<script setup lang="ts">
import { find, isEmpty } from "@/utils";

definePageMeta({
  // middleware: "authorized",
});

const toggle = useToggleFlag();

// #eos
</script>
<template>
  <section class="page-demo">
    <VBtn @click="toggle">ok</VBtn>
    <VResponsive class="mx-auto" max-width="550">
      <p>foo</p>
    </VResponsive>
  </section>
</template>
<style lang="scss" scoped>
</style>
