<script setup lang="ts">
import type { IDocDataUsers } from "@/types";
import { idGen } from "@/utils";

definePageMeta({
  middleware: "authorized",
});

useHead({
  title: "--tim",
});

const {
  data: users$,
  usersAdd,
  usersRemove,
} = useDocs<IDocDataUsers>("@users");

const ID$ = ref();
const usersadd = async () => await usersAdd(`user-${idGen()}@email.com`, "122");
const usersrm = async () => await usersRemove(ID$.value);

// #eos
</script>
<template>
  <section id="page-people" class="pa-2 pa-md-4">
    <VTextField label="ID" type="number" v-model.number="ID$" />
    <VBtn @click="usersadd">users:add</VBtn>
    <VBtn @click="usersrm">users:rm</VBtn>
    <p>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis
      itaque corrupti deserunt aperiam quas, dicta fugiat! Debitis ad veniam
      quia sed nisi eligendi in ea molestias necessitatibus id, nam temporibus!
    </p>
    <pre class="text-xs">
      {{ JSON.stringify({ users$ }, null, 2) }}
    </pre>
  </section>
</template>
<style lang="scss" scoped>
</style>
