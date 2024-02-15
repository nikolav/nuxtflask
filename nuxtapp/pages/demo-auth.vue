<script setup lang="ts">
import { faker } from "@faker-js/faker";

useHead({
  title: "--auth",
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
    <VBtnGroup density="comfortable">
      <VBtn size="small" @click="loginAdmin" color="primary">login:admin</VBtn>
      <VBtn size="small" @click="auth.logout" color="primary-lighten-1"
        >logout</VBtn
      >
      <VBtn size="small" @click="registerUser" color="primary-lighten-1"
        >register</VBtn
      >
    </VBtnGroup>
    <VDivider thickness="2" class="mb-2" />
    <VSheet>
      <p>
        <pre>
          {{ JSON.stringify({ token: auth.token$, user: auth.user$ }, null, 2) }}
        </pre>
      </p>
    </VSheet>
  </section>
</template>

<style scoped></style>
