<script setup lang="ts">
const toggleActive = useToggleFlag();
const { store$: main$$, put, drop } = useStoreMain();

const updateKeyA = () => {
  put({
    "a.a1": Math.random(),
    "users.nikolav.user:name": `nikolav@${Date.now()}`,
  });
};
</script>

<template>
  <section id="page-demo">
    <pre>
      {{ JSON.stringify(main$$, null, 2) }}
    </pre>
    <Title>--demo</Title>
    <h1>@demo [{{ toggleActive.isActive.value }}]</h1>
    <button @click="toggleActive.on">on</button> |
    <button @click="toggleActive.off">off</button> |
    <button @click="updateKeyA">put</button> |
    <button @click="drop('a.a1')">drop</button>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat autem
      ab corporis!
    </p>
  </section>
</template>

<style scoped></style>
