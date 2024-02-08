<script setup lang="ts">
import { idGen } from "@/utils";

interface IDocDataVars {
  [key: string]: string;
}


useHead({
  title: "--demo",
});


const auth = useStoreApiAuth2();

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
const loginAdmin   = async () => await auth?.login(credsAdmin);
const registerUser = async () => await auth?.register(credsRand())


  // const { docs, put, rm, reload } = useApiDocs<IDocDataVars>("@vars");
  // const varsUpsert = async () => {
  //   const ID = idGen()
  //   await put({ data: { [`var::${ID}`]: ID } });
  // }
  // const choice = (ls: any[]) => ls[Math.floor(Math.random() * ls.length)];
  // const varsRm = async () => await rm(choice(docs.value));

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
        {{ JSON.stringify({ token$: auth?.token$, user$: auth?.user$ }, null, 2) }}
      </pre>
      <!-- <pre>
        {{ JSON.stringify({ docs }, null, 2) }}
      </pre> -->
    </p>
  </section>
</template>

<style scoped></style>
