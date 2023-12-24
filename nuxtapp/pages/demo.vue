<script setup lang="ts">
const toggleActive = useToggleFlag();
</script>

<template>
  <section id="page-demo">
    <Title>--demo</Title>
    <h1>@demo [{{ toggleActive.isActive.value }}]</h1>
    <button @click="toggleActive.on">on</button>
    <button @click="toggleActive.off">off</button>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat autem
      ab corporis!
    </p>
  </section>
</template>

<style scoped></style>
