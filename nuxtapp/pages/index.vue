<script setup lang="ts">
// const { $command } = useNuxtApp();
import { type IThemeToggle } from "@/types";
import { map, idGen, noop, transform } from "@/utils";
import { faker } from "@faker-js/faker";
import Chart from "chart.js/auto";

const chartCanvas = ref();
const chart = ref();

const { themeToggle, theme } = <IThemeToggle>useNuxtApp().$theme;
const isDark$ = computed(() => useAppConfig().theme.DARK === theme.value);
const chartDraw = () => {
  chart.value?.destroy();
  const data = [
    { x: 10, y: 20 },
    { x: 15, y: 30 },
    { x: 20, y: 12 },
    { x: 34, y: 112 },
  ];

  chart.value = new Chart(toValue(chartCanvas), {
    type: "line",
    data: {
      labels: map(data, "x"),
      datasets: [
        {
          label: "foo",
          data,
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
      scales: {
        y: {
          beginAtZero: true,
        },
        x: {
          beginAtZero: true,
        },
      },
      // parsing: {
      //   xAxisKey: "x",
      // },
    },

    // type: "line",
    // // options: {
    // //   animation: false,
    // //   plugins: {
    // //     legend: {
    // //       display: false,
    // //     },
    // //     tooltip: {
    // //       // enabled: false,
    // //       animation: false,
    // //     },
    // //   },
    // // },
    // data: {
    //   // labels: data.map((row) => row.year),
    //   datasets: [
    //     {
    //       data,
    //       ...(toValue(isDark$)
    //         ? {
    //             backgroundColor: "grey",
    //           }
    //         : {}),
    //     },
    //   ],
    // },
  });
};

onMounted(() => watchEffect(chartDraw));

// #eos
</script>

<template>
  <section id="page-home">
    <Title>--home</Title>
    <h1 class="text-amber-darken-2">@home.nuxt</h1>
    <VBtn size="small" @click="themeToggle()"> theme:toggle </VBtn>
    <VBtn size="small" class="text-none" @click="noop"> ok </VBtn>
    <VDivider thickness="4" />
    <VSheet width="500" class="mx-auto pa-4">
      <canvas ref="chartCanvas" id="chartDemo"></canvas>
    </VSheet>
  </section>
</template>

<style scoped>
</style>
