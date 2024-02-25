<script setup lang="ts">
import type { IDoc, IDocDataChat } from "@/types";

const auth = useStoreApiAuth();
const props$ = defineProps<{ doc: IDoc<IDocDataChat>; rm: () => void }>();

// #eos
</script>
<template>
  <div class="chat--item pb-1">
    <VHover #default="{ isHovering, props }">
      <VSheet
        v-bind="props"
        rounded
        elevation="2"
        class="position-relative px-4 pa-3"
      >
        <VBtn
          v-if="isHovering && auth.isAdmin$"
          @click="props$.rm"
          class="position-absolute top-0 right-0 z-10"
          icon
          variant="plain"
          size="small"
          ><VIcon color="error" class="opacity-90" icon="$iconTrash"
        /></VBtn>
        <small class="text-medium-emphasis d-flex justify-between">
          <span class="truncate grow">
            {{ props$.doc.data.name }}
          </span>
          <pre class="opacity-50 italic">
            {{ new Date(String(props$.doc.updated_at)).toLocaleDateString() }}
          </pre>
        </small>
        <p class="pb-2">
          {{ props$.doc.data.comment }}
        </p>
      </VSheet>
    </VHover>
  </div>
</template>
<style lang="scss" scoped>
</style>
