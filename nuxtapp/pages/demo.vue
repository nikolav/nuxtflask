<script setup lang="ts">
useHead({
  title: "--demo",
});

const flags = useStoreFlags();

// #eos
</script>

<template>
  <section id="page-demo">
    <button @click="flags.toggle('A1')" class="p-2 bg-sky-600 rounded shadow">
      flag:toggle:A1 [{{ flags.flag("A1") }}]
    </button>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat autem
      ab corporis!
    </p>
  </section>
</template>

<style scoped></style>
