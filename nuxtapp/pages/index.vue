<script setup lang="ts">
// import { ref } from "vue";

interface IDatum {
  count: number;
}

const d$ = ref<IDatum>({ count: 0 });
const dInc = () => {
  d$.value.count += 1;
};

// eos
</script>

<template>
  <section id="page-home">
    <Title>--home</Title>
    <h1>@home.nuxt</h1>
    <button @click="dInc">ok</button>
    <p>data: [{{ d$.count }}]</p>
  </section>
</template>

<style scoped></style>
