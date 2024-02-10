<script setup lang="ts">
import { idGen } from "@/utils";
import { type IThemeToggle } from "@/types";

const { themeToggle } = <IThemeToggle>useNuxtApp().$theme;

const { data$: doc, put } = useDoc("#122:1");
const ok = async () => {
  //
  await put({ "foo:1": idGen() })
};

// #eos
</script>

<template>
  <section id="page-home">
    <Title>--home</Title>
    <h1>@home.nuxt</h1>
    <VBtn size="small" @click="themeToggle()"> theme:toggle </VBtn>
    <VBtn size="small" @click="ok"> ok </VBtn>
    <hr class="border-2 border-sky-400" />
    <p>
      <pre>
        {{ JSON.stringify(doc, null, 2) }}
      </pre>
    </p>
  </section>
</template>

<style scoped>
</style>
