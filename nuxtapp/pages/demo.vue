<script setup lang="ts">
import { idGen } from "@/utils";
// import { useStoreApiAuth } from '@/stores';

useHead({
  title: "--demo",
});


const auth = inject("auth:api");
// const token$ = computed(() => auth.token$);

const noop = () => {};
const credsAdmin = {
  "email": "admin@nikolav.rs",
  "password": "122",
};
const credsRand = () => {
  const ID = idGen();
  return {
    "email": `user:${ID}@email.com`,
    "password": ID
  }
};
const loginAdmin   = async () => await auth.login(credsAdmin);
const registerUser = async () => await auth.register(credsRand())

// #eos
</script>

<template>
    <section id="page-demo">
      <button class="p-2 bg-sky-600 rounded text-white/80" @click="loginAdmin">login</button>
      <button class="p-2 bg-sky-600 rounded text-white/80" @click="auth.logout">logout</button>
      <button class="p-2 bg-sky-600 rounded text-white/80" @click="registerUser">register</button>
    <hr class="border-sky-600 border-4"/>
    <p>
      <pre>
        {{ JSON.stringify({ token$: auth.token$, user$: auth.user$ }, null, 2) }}
      </pre>
    </p>
  </section>
</template>

<style scoped></style>
