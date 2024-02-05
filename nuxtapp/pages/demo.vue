<script setup lang="ts">

useHead({
  title: "--demo",
});

const { topic$, data } = useDocs("@vars");
const topicToggle = () => {
  topic$.value = '@vars' !== topic$.value ? '@vars' : '@users';
}

// #eos
</script>

<template>
  <section id="page-demo">
    <h1>@demo</h1>
    <p>
      <VBtn @click="topicToggle" color="secondary" variant="flat">
        topic:toggle
      </VBtn>
      <pre>
        {{ JSON.stringify({ data }, null, 2) }}
      </pre>
    </p>
  </section>
</template>

<style scoped></style>
