<script setup lang="ts">
// import { faker } from "@faker-js/faker";
// https://github.com/surmon-china/videojs-player
import { VideoPlayer } from "@videojs-player/vue";

useHead({
  title: "--home",
});

// const auth = useStoreApiAuth();

// const credsAdmin = {
//   email: "admin@nikolav.rs",
//   password: "122",
// };
// const credsRand = () => {
//   return {
//     email: faker.internet.email(),
//     password: faker.internet.password({ length: 5, memorable: true }),
//   };
// };
// const loginAdmin = async () => await auth.login(credsAdmin);
// const registerUser = async () => await auth.register(credsRand());

// const { data } = useDocs("@vars");

// #eos
</script>

<template>
  <section id="page-demo">
    <VSheet class="mx-auto overflow-hidden" rounded width="640">
      <VideoPlayer
        fluid
        src="/dummy.mp4"
        controls
        :autoplay="true"
        :volume="0.22"
      ></VideoPlayer>
    </VSheet>
  </section>
</template>

<style scoped></style>
