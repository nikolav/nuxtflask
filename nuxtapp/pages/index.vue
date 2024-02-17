<script setup lang="ts">
// const { $command } = useNuxtApp();
import type { TChartDataBar } from "@/types";
import { now, map, idGen, noop, transform, assign } from "@/utils";
// import { faker } from "@faker-js/faker";
import { Bar } from "vue-chartjs";

const data$: TChartDataBar<number[]> = {
  labels: ["January", "February", "March"],
  datasets: [{ label: "@data/1", data: [40, 20, 12] }],
};
const options$ = {
  plugins: {
    legend: {
      // display: false,
    },
  },
};

const signalEffect$ = useUniqueId(false);

// const okOnClick = () => {
//   // flags$.toggle(useAppConfig().key.APP_PROCESSING);
//   value1$.value = now();
// };
// #eos
</script>

<template>
  <section id="page-home">
    <Title>--home</Title>
    <VBtn @click="signalEffect$"> ok </VBtn>
    <VDivider thickness="4" />
    <VCard
      width="500"
      class="mx-auto"
      v-effect:headShake="{ watch: signalEffect$.ID.value }"
    >
      <VCardText class="position-relative">
        <Bar :data="data$" :options="options$" />
      </VCardText>
      <VDivider thickness="2" class="ma-0" />
    </VCard>
  </section>
</template>

<style scoped lang="scss">
</style>
