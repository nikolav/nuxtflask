<script setup lang="ts">
// const { $command } = useNuxtApp();
import type { TChartDataBar } from "@/types";
import { now, map, idGen, noop, transform, assign } from "@/utils";
// import { faker } from "@faker-js/faker";
import { Bar } from "vue-chartjs";
import { useTheme } from "vuetify";

const thm = useTheme();
const barColor$ = computed(() => thm.current.value.colors.primary);
const data$: Ref<TChartDataBar<number[]>> = computed(() => ({
  labels: ["January", "February", "March"],
  datasets: [
    { label: "@data/1", data: [40, 20, 12], backgroundColor: barColor$.value },
  ],
}));
const options$ = {
  plugins: {
    legend: {
      // display: false,
    },
  },
};

const {
  $theme: { themeToggle },
} = useNuxtApp();

const okOnClick = () => {};

// #eos
</script>

<template>
  <section id="page-home">
    <Title>--home</Title>
    <VBtn @click="okOnClick"> ok </VBtn>
    <VBtn @click="themeToggle()"> theme </VBtn>
    <VDivider thickness="4" />
    <VAlert
      border-color="accent1-darken-2"
      border="start"
      max-width="550"
      class="mx-auto"
      position="relative"
      variant="elevated"
    >
      <template #prepend>
        <VIcon icon="$loading" size="20" color="accent2-lighten-1" />
      </template>
      <VAlertTitle class="ms-4 mb-4"> Lorem, ipsum dolor </VAlertTitle>
      <Bar :data="data$" :options="options$" />
    </VAlert>
  </section>
</template>

<style scoped lang="scss">
</style>
