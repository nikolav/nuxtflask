<script setup lang="ts">
import { SpinnerBeat } from "@/components/spinners";

const flags = useStoreFlags();
const { APP_PROCESSING } = useAppConfig().key;
// #eos
</script>

<template>
  <VFadeTransition>
    <strong
      v-if="flags.isSet(APP_PROCESSING)"
      class="position-fixed top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] z-[9999]"
    >
      <SpinnerBeat />
    </strong>
  </VFadeTransition>
</template>

<style scoped>
</style>
