<script setup lang="ts">
import { isEmpty, docsSortedDesc } from "@/utils";
import { ChatItem } from "@/components/app";
import type { IDocDataChat, TVoid } from "@/types";
import { schemaChatTask } from "@/schemas";

const auth$ = useStoreApiAuth();

const { CHAT_ACTIVE, CHAT_ACTIVE_title } = useAppConfig().stores.main;
const main$ = useStoreMain();
const chatActive$ = computed({
  get: () => main$.get(CHAT_ACTIVE),
  set: (val) => {
    main$.put({
      [CHAT_ACTIVE]: val,
    });
  },
});
const chatActiveTitle$ = computed({
  get: () => main$.get(CHAT_ACTIVE_title),
  set: (val) => {
    main$.put({
      [CHAT_ACTIVE_title]: val,
    });
  },
});
const clearActiveChat = () => {
  chatActive$.value = null;
  chatActiveTitle$.value = null;
};

const {
  topic$,
  data: docsActiveChat$,
  upsert,
  remove,
} = useDocs<IDocDataChat>(`${CHAT_ACTIVE}:${chatActive$.value}`);
const docsActiveChatSorted$ = computed(() =>
  docsSortedDesc<IDocDataChat>(docsActiveChat$.value)
);

const chatName$ = useLocalStorage(useAppConfig().key.CHAT_NAME, () => "", {
  initOnMounted: true,
});
const chatComment$ = ref("");

const taskChatSubmit = async (onDone: TVoid) => {
  console.log(`taskChatSubmit`);
  try {
    const chatData = schemaChatTask.parse({
      name: chatName$.value,
      comment: chatComment$.value,
    });
    await upsert(chatData);
  } catch (error) {
    // pass
  }
  onDone();
};

watch(chatActive$, (chatActive) => {
  if (null != chatActive) topic$.value = `${CHAT_ACTIVE}:${chatActive}`;
});

// #eos
</script>
<template>
  <div class="pa-2 *bg-red d-flex flex-col">
    <p
      class="text-end !text-sm truncate mb-2 mb-sm-4 pe-4 d-flex justify-between items-center"
    >
      <VBtn
        @click="clearActiveChat"
        icon
        variant="plain"
        color="accent2-lighten-1"
      >
        <VIcon icon="$close" />
      </VBtn>
      <span class="text-disabled grow">
        <VIcon icon="$iconChat" start class="opacity-40" size="large" />
        {{ chatActiveTitle$ }}
      </span>
    </p>
    <div class="grow !pb-28">
      <template v-if="isEmpty(docsActiveChat$)">
        <p class="text-center pt-10">🚫</p>
      </template>
      <template v-else>
        <div class="space-y-1">
          <ChatItem
            v-for="doc in docsActiveChatSorted$"
            :doc="doc"
            :rm="
              async () => {
                await remove(Number(doc.id));
              }
            "
            :key="doc.id"
          />
        </div>
      </template>
    </div>
    <VBtn
      variant="elevated"
      elevation="4"
      color="surface"
      class="end-5 bottom-10 position-absolute z-10"
      icon
      size="x-large"
    >
      <VIcon color="accent1-lighten-2" size="33" icon="$iconPaperPlane" />
      <VMenu
        activator="parent"
        :close-on-content-click="false"
        :offset="[8, 6]"
        transition="slide-y-reverse-transition"
      >
        <template #default="{ isActive }">
          <VCard min-width="320" rounded="t-lg" variant="tonal">
            <VCardTitle class="bg-accent2-lighten-2 d-flex items-center">
              <em class="grow items-center d-flex gap-4 opacity-60">
                <VIcon icon="$iconEditNote" size="small" />
                <span> Nova poruka </span>
              </em>
              <VBtn
                icon
                @click="isActive.value = false"
                variant="text"
                color="on-surface"
                size="small"
              >
                <VIcon icon="$close" />
              </VBtn>
            </VCardTitle>
            <VCardText class="pb-2">
              <VForm
                @submit.prevent="
                  taskChatSubmit(() => {
                    isActive.value = false;
                  })
                "
                autocomplete="off"
                class="mt-4"
              >
                <VTextField
                  v-model.trim="chatName$"
                  name="chatName"
                  variant="underlined"
                  label="Ime *"
                />
                <VTextarea
                  v-model.trim="chatComment$"
                  clearable
                  name="chatComment"
                  variant="underlined"
                  label="Poruka *"
                />
                <VCardActions class="*bg-red justify-center">
                  <VBtn
                    @click="isActive.value = false"
                    class="grow"
                    color="primary-lighten-2"
                    variant="flat"
                    >Odustani</VBtn
                  >
                  <VBtn
                    type="submit"
                    class="grow"
                    color="primary"
                    variant="text"
                    size="large"
                  >
                    <VIcon start icon="$iconCheck" class="opacity-50" />
                    <strong> ok </strong>
                  </VBtn>
                </VCardActions>
              </VForm>
            </VCardText>
          </VCard>
        </template>
      </VMenu>
    </VBtn>
  </div>
</template>
<style lang="scss" scoped>
</style>
