<script setup lang="ts">
import { faker } from "@faker-js/faker";

useHead({
  title: "--home",
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

const { data } = useDocs("@vars");

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
    <VCard max-width="550" class="ma-2 mx-auto" rounded>
      <VToolbar height="32">
        <template #append>
          <VBtn class="translate-x-2" icon size="small" variant="text" density="comfortable">
            <VIcon icon="$close" size="14" />
          </VBtn>
        </template>
      </VToolbar>
      <div class="pa-4">
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Excepturi facere sed fuga, voluptate veniam ratione nihil vero consequuntur eveniet in ducimus voluptatibus minus impedit rerum natus dolore blanditiis tempora nostrum!</p>
      </div>
    </VCard>
    <VSheet>
      <p>
        <pre>
          {{ JSON.stringify({ token: auth.token$, user: auth.user$ }, null, 2) }}
        </pre>
      </p>
      <p>
        <pre>
          {{ JSON.stringify({ data }, null, 2) }}
        </pre>
      </p>
    </VSheet>
  </section>
</template>

<style scoped></style>
