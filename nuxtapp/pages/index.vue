<script setup lang="ts">
// const { $command } = useNuxtApp();
import type { TChartDataBar } from "@/types";
import { map, idGen, noop, transform, assign } from "@/utils";
// import { faker } from "@faker-js/faker";
import { Bar } from "vue-chartjs";


const { themeToggle } = useNuxtApp().$theme;

const data$: TChartDataBar<number[]> = {
  labels: ["January", "February", "March"],
  datasets: [{ data: [40, 20, 12] }],
};
const options$ = {
  plugins: {
    legend: {
      display: false,
    },
  },
};

// #eos
</script>

<template>
  <section id="page-home">
    <Title>--home</Title>
    <VContainer fluid class="flex justify-center space-x-2">
      <VBtn @click="themeToggle()" color="primary"> theme:toggle </VBtn>
      <VBtn @click="noop"> ok </VBtn>
    </VContainer>
    <VDivider thickness="4" />
    <VCard width="500" class="mx-auto">
      <VCardTitle class="text-medium-emphasis text-center mb-2">
        chart demo
      </VCardTitle>
      <VCardText>
        <Bar :data="data$" :options="options$" />
      </VCardText>
      <VDivider thickness="2" class="ma-0" />
      <VCardActions class="**bg-red">
        <VSpacer />
        <VBtn variant="text" color="primary">ok</VBtn>
      </VCardActions>
    </VCard>
  </section>
</template>

<style scoped lang="scss">
</style>
