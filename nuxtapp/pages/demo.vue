<script setup lang="ts">
import { idGen } from "@/utils";
import type { IDocDataUsers } from "@/types";

useHead({
  title: "--demo",
});

const {
  docs: users,
  put: usersUpsert,
  rm: usersRemove,
} = useApiDocs<IDocDataUsers>("users");

const choice = (ls: any[]) => ls[Math.floor(ls.length * Math.random())];
const usersRemoveRandom = async () => 0 < users.value.length ? await usersRemove(choice(users.value)) : null;
const usersAddRandom = async () => await usersUpsert({ 
  data: { 
    email: `user.${idGen()}@email.com`,
    password: idGen(),
  } 
});

// #eos
</script>

<template>
    <section id="page-demo">
     <button @click="usersAddRandom" class="p-2 bg-sky-600 rounded shadow">users:add</button>
     <button @click="usersRemoveRandom" class="p-2 bg-red-600 rounded shadow">users:rm</button>
    <p>
      <pre>
        {{ JSON.stringify({ users }, null, 2) }}
      </pre>
    </p>
  </section>
</template>

<style scoped></style>
