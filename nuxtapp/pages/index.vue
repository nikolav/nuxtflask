<script setup lang="ts">
// import { faker } from "@faker-js/faker";
// https://github.com/surmon-china/videojs-player
import { VideoPlayer } from "@videojs-player/vue";

definePageMeta({
  middleware: "authorized",
});

useHead({
  title: "--home",
});

const toggle = useToggleFlag();

// #eos
</script>

<template>
  <section id="page-demo" class="pa-2 pa-md-4">
    <VBtn @click="toggle">ok</VBtn>
    <template v-for="n in 20" :key="n">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci
        temporibus quos nesciunt at quod voluptates obcaecati doloribus magnam
        voluptate porro magni ducimus, reiciendis id inventore, illum eos eum
        corrupti ut?
      </p>
    </template>
    <VDivider thickness="4" />
    <VOverlay
      scrim="complement-darken-2"
      class="d-flex items-center justify-center"
      v-model="toggle.isActive.value"
      persistent
      no-click-animation
    >
      <VSheet class="mx-auto overflow-hidden" rounded width="720">
        <VBtn
          density="comfortable"
          variant="plain"
          icon="$close"
          class="!absolute -top-[2.34rem] end-0"
          color="on-surface"
          @click="toggle.off"
        />
        <VideoPlayer
          autoplay
          fluid
          src="/dummyogg.ogg"
          controls
          :volume="0.22"
        ></VideoPlayer>
      </VSheet>
    </VOverlay>
  </section>
</template>

<style scoped></style>
