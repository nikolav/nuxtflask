<script setup lang="ts">
// import { ref } from "vue";

interface IDatum {
  count: number;
}

const d$ = ref<IDatum>({ count: 0 });
const dInc = () => {
  d$.value.count += 1;
};

const theme$ = inject(useAppConfig().key.INJECT_THEME);
const themeToggle = () => {
  theme$.value = "dark" !== theme$.value ? "dark" : "light2";
};

// eos
</script>

<template>
  <section id="page-home">
    <Title>--home</Title>
    <h1>@home.nuxt</h1>
    <VBtn color="primary" @click="dInc" variant="flat">
      <VIcon icon="$menu" start />
      <strong class="ms-2"> ok </strong>
    </VBtn>
    <VBtn size="small" color="secondary" @click="themeToggle" variant="flat">
      theme:toggle
    </VBtn>
    <p>data: [{{ d$.count }}]</p>
  </section>
</template>

<style scoped></style>
