<script setup lang="ts">
// const { $command } = useNuxtApp();
import { type IThemeToggle } from "@/types";
import { map, idGen, noop, transform } from "@/utils";
// import { faker } from "@faker-js/faker";
// import { type ChartData } from "chart.js";
import Chart from "chart.js/auto";
import chroma from "chroma-js";
import { useTheme } from "vuetify";

const chartCanvas = ref();
const chart = ref();
const { current: themeCurrent } = useTheme();

const { themeToggle } = <IThemeToggle>useNuxtApp().$theme;
const chartDraw = () => {
  chart.value?.destroy();
  chart.value = new Chart(toValue(chartCanvas), {
    type: "bar",
    data: {
      datasets: [
        {
          label: "Total",
          data: [
            { key: "New York", value: 20 },
            { key: "Chicago", value: 10 },
            { key: "Ohio", value: 43 },
            { key: "Virginia", value: 11 },
          ],
          backgroundColor: `${chroma(themeCurrent.value.colors.primary).alpha(
            0.5
          )}`,
          parsing: {
            xAxisKey: "key",
            yAxisKey: "value",
          },
        },
      ],
    },
    options: {
      animation: false,
      plugins: {
        legend: {
          display: false,
        },
      },
    },
  });
};

onMounted(() => watchEffect(chartDraw));

// #eos
</script>

<template>
  <section id="page-home">
    <Title>--home</Title>
    <VContainer fluid class="flex justify-center space-x-2">
      <VBtn @click="themeToggle()" color="primary">
        theme:toggle
      </VBtn>
      <VBtn @click="noop"> ok </VBtn>
    </VContainer>
    <VDivider thickness="4" />
    <VCard width="500" class="mx-auto">
      <VCardTitle class="text-medium-emphasis text-center mb-2">
        chart demo
      </VCardTitle>
      <VCardText>
        <canvas ref="chartCanvas" id="chartDemo"></canvas>
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
