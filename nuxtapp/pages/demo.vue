<script setup lang="ts">
import { find, isEmpty } from "@/utils";

definePageMeta({
  // middleware: "authorized",
});

const { ID$, tags } = useDocsTags(3023);

const toggle = useToggleFlag();

// #eos
</script>
<template>
  <section class="page-demo">
    <VBtn @click="toggle">ok</VBtn>
    <VResponsive class="mx-auto" max-width="550">
      <p>
        <pre>
          {{ JSON.stringify({ tags }, null, 2) }}
        </pre>
      </p>
    </VResponsive>
  </section>
</template>
<style lang="scss" scoped>
</style>
