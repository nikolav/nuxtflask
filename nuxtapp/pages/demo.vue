<script setup lang="ts">
import { idGen } from "@/utils";

useHead({
  title: "--demo",
});

const { $socket } = useNuxtApp();

useIOEvent("app:io", (...ioargs: any[]) => {
  console.log({
    ioargs,
  });
});
const ioEmitMsg = () => {
  console.log({ $socket });
  $socket?.emit("msg", idGen());
};

// #eos
</script>

<template>
  <section id="page-demo">
    <button @click="ioEmitMsg" class="p-2 bg-sky-600 rounded shadow">
      io:emit:msg
    </button>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat autem
      ab corporis!
    </p>
  </section>
</template>

<style scoped></style>
