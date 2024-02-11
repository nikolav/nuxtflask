<script setup lang="ts">
// const { $command } = useNuxtApp();
import { type IThemeToggle } from "@/types";
import { noop } from "@/utils";
const { themeToggle } = <IThemeToggle>useNuxtApp().$theme;


// #eos
</script>

<template>
  <section id="page-home">
    <Title>--home</Title>
    <h1 class="text-amber-darken-2">@home.nuxt</h1>
    <VBtn size="small" @click="themeToggle()"> theme:toggle </VBtn>
    <VBtn size="small" class="text-none" @click="noop"> ok </VBtn>
    <hr class="border-2 border-sky-400" />
  </section>
</template>

<style scoped>
</style>
