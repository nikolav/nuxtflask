<script setup lang="ts">
// import { idGen } from "@/utils";
import { Q_vars } from "@/graphql";

useHead({
  title: "--demo",
});


const { result } = useQuery<{ vars: { name: string; value: string }[] }>(Q_vars);

// #eos
</script>

<template>
    <section id="page-demo">
      <h1>
        @demo
      </h1>
      <p>
        <pre>
          {{ JSON.stringify({ result }, null, 2) }}
        </pre>
      </p>
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime temporibus officiis illum.</p>
  </section>
</template>

<style scoped></style>
