<script setup lang="ts">
import { useDisplay } from "vuetify";
import { ChatItem } from "@/components/app";
import { docsSortedDesc } from "@/utils";
import type { IDocDataChat } from "@/types";

const { DOCS_CHAT_ALL } = useAppConfig().api;
// calc chat:`max-height`
const mh$ = computed(() => Math.max(122, useDisplay().height.value - 168));

const { data, upsert, remove } = useDocs<IDocDataChat>(DOCS_CHAT_ALL);
const dataSorted$ = computed(() => docsSortedDesc<IDocDataChat>(data.value));

const chatName$ = useLocalStorage(useAppConfig().key.CHAT_NAME, () => "", {
  initOnMounted: true,
});
const chatComment$ = ref("");

const commentAdd = async () => {
  if (!chatName$.value || !chatComment$.value) return false;
  await upsert(<IDocDataChat>{
    name: chatName$.value,
    comment: chatComment$.value,
  });
  chatComment$.value = "";
  return true;
};
// #eos
</script>
<template>
  <div class="window-chat *bg-yellow-100">
    <VMenu
      :close-on-content-click="false"
      location="top"
      :offset="[8, 6]"
      transition="slide-y-reverse-transition"
    >
      <template #activator="{ props }">
        <VBtn
          v-bind="props"
          variant="elevated"
          elevation="4"
          color="surface"
          class="end-10 bottom-20 position-fixed z-10"
          icon
          size="x-large"
        >
          <VIcon color="accent1-lighten-2" size="33" icon="$iconPaperPlane" />
        </VBtn>
      </template>
      <template #default="{ isActive }">
        <VSheet
          elevation="4"
          min-width="320"
          min-height="240"
          rounded="lg"
          density="comfortable"
          color="accent1-lighten-2"
          class="pa-4"
        >
          <VForm
            @submit.prevent="
              async () => {
                if (await commentAdd()) {
                  isActive.value = false;
                }
              }
            "
            autocomplete="off"
          >
            <VTextField
              v-model.trim="chatName$"
              label="Ime *"
              variant="underlined"
              name="name"
            />
            <VTextarea
              v-model.trim="chatComment$"
              variant="underlined"
              label="Komentar *"
              name="komentar"
              clearable
            />
            <VBtn block size="large" type="submit" class="text-none"
              >Pošalji</VBtn
            >
          </VForm>
        </VSheet>
      </template>
    </VMenu>
    <VSheet
      :max-height="mh$"
      class="pa-1 pa-sm-2 overflow-y-auto scrollbar-thin-light overflow-x-hidden"
    >
      <template v-if="!dataSorted$.length">
        <p class="opacity-20 mt-10 text-h2 text-center">⛔</p>
      </template>
      <template v-else>
        <TransitionGroup name="chatItem">
          <template v-for="doc in dataSorted$" :key="doc.id">
            <ChatItem
              :doc="doc"
              :rm="async () => await remove(Number(doc.id))"
            />
          </template>
        </TransitionGroup>
        <p class="pb-20"></p>
      </template>
    </VSheet>
  </div>
</template>
<style lang="scss" scoped>
.chatItem-enter-active,
.chatItem-leave-active {
  transition: all 0.5s ease-out;
}
.chatItem-enter-from,
.chatItem-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>