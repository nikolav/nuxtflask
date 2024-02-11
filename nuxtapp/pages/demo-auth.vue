<script setup lang="ts">
import { faker } from "@faker-js/faker";

interface IDocDataVars {
  [key: string]: string;
}

useHead({
  title: "--demo",
});

const auth = useStoreApiAuth();

const credsAdmin = {
  email: "admin@nikolav.rs",
  password: "122",
};
const credsRand = () => {
  return {
    email: faker.internet.email(),
    password: faker.internet.password({ length: 5, memorable: true }),
  };
};
const loginAdmin = async () => await auth.login(credsAdmin);
const registerUser = async () => await auth.register(credsRand());

// #eos
</script>

<template>
    <section id="page-demo">
      <button class="p-2 bg-sky-600 rounded text-white/80" @click="loginAdmin">login</button>
      <button class="p-2 bg-sky-600 rounded text-white/80" @click="auth?.logout">logout</button>
      <button class="p-2 bg-sky-600 rounded text-white/80" @click="registerUser">register</button>
    <!-- <hr class="border-sky-600 border-4"/>
    <button class="p-2 bg-sky-600 rounded text-white/80" @click="varsUpsert">docs:upsert</button>
    <button class="p-2 bg-sky-600 rounded text-white/80" @click="varsRm">docs:rm</button>
    <button class="p-2 bg-sky-600 rounded text-white/80" @click="reload">docs:reload</button> -->
    <hr class="border-sky-600 border-4"/>

    <p>
      <pre>
        {{ JSON.stringify({ token$: auth.token$, user$: auth.user$ }, null, 2) }}
      </pre>
    </p>
  </section>
</template>

<style scoped></style>
