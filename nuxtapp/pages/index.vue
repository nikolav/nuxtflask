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
    <button
      @click="dInc"
      class="rounded active:bg-sky-900 bg-sky-700 px-4 py-2 text-white hover:bg-sky-800 sm:px-8 sm:py-3"
    >
      ok
    </button>
    <p>data: [{{ d$.count }}]</p>
  </section>
</template>

<style scoped></style>
