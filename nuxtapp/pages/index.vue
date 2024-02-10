<script setup lang="ts">
// import { ref } from "vue";
import { type IThemeToggle } from "@/types";
import { typeCore, get, idGen } from "@/utils";

const { themeToggle } = <IThemeToggle>useNuxtApp().$theme;

const { files, upload, download, remove, meta } = useApiStorage();
const file$ = ref();
const fileId$ = ref("");
const setFile = ([file]: File[]) => {
  file$.value = file;
};
// await upload({
//   "#01": {
//     file,
//     data: {
//       title: "#01:title",
//       description: "#01:description",
//     },
//   },
// });
const fileUpload = async () =>
  await upload({
    "#01": {
      file: file$.value,
      data: {
        title: `title: --VcnhMt4Z`,
        description: `desc: --cBLOO`,
      },
    },
  });
const fileRm = async () => await remove(toValue(fileId$));
const fileTitle = async () =>
  await meta(fileId$.value, { title: `--${idGen()}` });
const fileDl = async () => await download(toValue(fileId$));
</script>

<template>
  <section id="page-home">
    <Title>--home</Title>
    <h1>@home.nuxt</h1>
    <VBtn size="small" @click="themeToggle()"> theme:toggle </VBtn>
    <div>
      <VFileInput @update:model-value="setFile" />
      <VTextField v-model="fileId$" label="file_id" />
      <VBtn size="small" @click="fileUpload"> file:upload </VBtn>
      <VBtn size="small" @click="fileRm"> file:rm </VBtn>
      <VBtn size="small" @click="fileTitle"> file:title </VBtn>
      <VBtn size="small" @click="fileDl"> file:dl </VBtn>
    </div>
    <VSheet elevation="2" class="pa-2">
      <pre>{{ JSON.stringify(files, null, 2) }}</pre>
    </VSheet>
  </section>
</template>

<style scoped></style>
