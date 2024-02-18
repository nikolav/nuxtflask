<script setup lang="ts">
import { useTheme } from "vuetify";
import BeatLoader from "vue-spinner/src/BeatLoader.vue";
import { isNumeric } from "@/utils";

const props$ = withDefaults(
  defineProps<{ size?: string; opacity?: number }>(),
  {
    size: ".88rem",
    opacity: 0.5,
  }
);
const size = isNumeric(props$.size) ? `${props$.size}px` : props$.size;
const color$ = computed(() => useTheme().current.value.colors.primary);

// #eos
</script>
<template>
  <BeatLoader
    :color="color$"
    :size="size"
    :key="color$"
    :style="`opacity: ${opacity}`"
  />
</template>
<style lang="scss">
</style>
