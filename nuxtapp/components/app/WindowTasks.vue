<script setup lang="ts">
import type { OrNoValue, IDocDataTask } from "@/types";
import { schemaTask } from "@/schemas";
import { isEmpty, get, find, pull } from "@/utils";
import { M_docsRmById } from "@/graphql";

const auth = useStoreApiAuth();
const { CHAT_ACTIVE, CHAT_ACTIVE_title, TASK_EDIT_active } =
  useAppConfig().stores.main;
const main$ = useStoreMain();
const chatActive$ = computed({
  get: () => main$.get(CHAT_ACTIVE),
  set: (value) => {
    main$.put({
      [CHAT_ACTIVE]: value,
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
const taskToDeleteId$ = ref<OrNoValue<number>>(null);
const updatedTaskToDeleteId = (value: boolean) => {
  if (!value) taskToDeleteId$.value = null;
};
const page$ = ref(1);
const addTaskTitle$ = ref("");
const addTaskHref$ = ref("");
const addTaskDescription$ = ref("");

const itemExpandedId$ = ref<OrNoValue<number>>();
const setItemExpanded = (id: number) => {
  itemExpandedId$.value = id !== itemExpandedId$.value ? id : null;
};
const itemHasInfo = (itemRaw: any) =>
  !isEmpty(get(itemRaw, "data.href")) ||
  !isEmpty(get(itemRaw, "data.description"));

const { TASKS_ALL, TASKS_USER_prefix } = useAppConfig().docs;
const {
  // topic$,
  data: docsTasks$,
  // tags: taskTags,
  upsert: tasksUpsert,
  // remove: tasksRemove,
  // } = useDocs<IDocDataTask>(TASKS_ALL);
} = useDocs<IDocDataTask>(
  auth.isAdmin$ ? TASKS_ALL : `${TASKS_USER_prefix}${get(auth.user$, "id")}`
);
const { mutate: mutateTasksRemoveByID } = useMutation(M_docsRmById);
const tasksRemove = async (id: number) => await mutateTasksRemoveByID({ id });

const tasksLength_ = computed(() => docsTasks$.value?.length || 0);

const taskCreateSubmit_ = async () => {
  console.log(`@taskCreateSubmit_`);
  const task_ = schemaTask.parse({
    title: addTaskTitle$.value,
    ...(addTaskHref$.value ? { href: addTaskHref$.value } : null),
    ...(addTaskDescription$.value
      ? { description: addTaskDescription$.value }
      : null),
  });
  console.log({ "adding task": task_ });
  await tasksUpsert(task_);
};

const setChatActive = (itemRaw: any) => {
  chatActive$.value = get(itemRaw, "id");
  chatActiveTitle$.value = get(itemRaw, "data.title");
};

const setTaskEditActive = (node: any) => {
  // console.log(`setTaskEditActive`);
  // console.log({ TASK_EDIT_active });
  main$.put({
    [TASK_EDIT_active]: node,
  });
};

// manage selected tasks
// contains selected tasks ids
const { TASKS_SELECTED_IDS } = useAppConfig().key;
const tasksSelectedIds$ = ref([]);
const someTasksSelected_ = computed(() => !isEmpty(tasksSelectedIds$.value));
const cacheSelectedTags = () => {
  main$.put({
    [TASKS_SELECTED_IDS]: [...tasksSelectedIds$.value],
  });
};

// #eos
</script>
<template>
  <div class="window-tasks">
    <VCard flat rounded="0" class="*bg-blue">
      <VCardItem class="pa-0">
        <!-- @tasks:toolbar -->
        <VToolbar class="*bg-transparent" color="accent2-lighten-2">
          <VToolbarTitle
            ><strong>Zadaci</strong>
            <VBadge
              color="accent2-darken-1"
              inline
              :content="tasksLength_"
              class="-translate-y-[2px] ms-1 !font-mono"
            />
          </VToolbarTitle>
          <VSpacer />
          <VBtn
            v-if="auth.isAdmin$"
            :disabled="!someTasksSelected_" 
            @click="cacheSelectedTags"
            icon 
          >
            <VIcon icon="$iconShare" class="opacity-85" />
            <VTooltip
              class="opacity-95"
              open-delay="333"
              activator="parent"
              text="Deli"
              location="bottom"
            />
          </VBtn>
          <!-- @@ -->
          <VBtn icon v-if="auth.isAdmin$">
            <VIcon icon="$iconTasksAdd" />
            <VTooltip
              class="opacity-95"
              open-delay="333"
              activator="parent"
              text="Nov zadatak"
              location="bottom"
            />
            <!-- @dialog:tasks-add -->
            <VDialog
              activator="parent"
              fullscreen
              persistent
              no-click-animation
            >
              <template #default="{ isActive }">
                <VSheet elevation="0">
                  <VBtn 
                    icon
                    @click="isActive.value = false" 
                    size="large"
                    variant="plain" 
                    class="position-absolute top-2 start-2 z-10 text-high-emphasis"
                    color="accent2"
                  >
                    <VIcon icon="$close" size="large"/>
                  </VBtn>
                    <VCard variant="flat" max-width="550" class="mx-auto mt-8 mt-sm-16">
                    <!-- @dialog:tasks-add/toolbar -->
                    <VToolbar class="bg-transparent">
                      <em class="text-h5 grow text-center text-disabled sm:translate-x-12">
                        <VIcon icon="$iconTasksAdd" class="opacity-30" start />
                        Nov zadatak
                      </em>
                      </VToolbar>
                    <!-- @dialog:tasks-add/form -->
                    <VForm
                      autocomplete="off"
                      @submit.prevent="
                        async () => {
                          await taskCreateSubmit_();
                          console.log(`taskCreateSubmit_:done`);
                          isActive.value = false;
                        }
                      "
                    >
                    <VCardText>
                      <VTextField
                        name="taskCreateTitle"
                        v-model="addTaskTitle$"
                        clearable
                        label="Naziv *"
                        variant="underlined"
                      >
                        <template #prepend>
                          <VIcon
                            start
                            icon="$iconTag"
                            color="accent2-darken-2"
                          />
                        </template>
                      </VTextField>
                      <VTextField
                        name="taskCreateHref"
                        v-model="addTaskHref$"
                        clearable
                        label="Veza"
                        variant="underlined"
                      >
                        <template #prepend>
                          <VIcon
                            start
                            icon="$iconAttach"
                            class="text-disabled"
                          />
                        </template>
                      </VTextField>
                      <VTextarea
                        name="taskCreateDescription"
                        v-model="addTaskDescription$"
                        clearable
                        label="Opis"
                        variant="underlined"
                      >
                        <template #prepend>
                          <VIcon
                            start
                            icon="$iconDescription"
                            class="text-disabled"
                          />
                        </template>
                      </VTextarea>
                    </VCardText>

                    <!-- @dialog:tasks-add/controlls -->
                    <VCardActions class="*bg-red justify-around">
                      <VBtn 
                        @click="isActive.value = false" 
                        class="px-4 px-sm-6" 
                        min-width="122" 
                        rounded="pill" 
                        variant="tonal" 
                        color="accent2"
                        size="large"
                      >odustani</VBtn>
                      <VBtn 
                        type="submit" 
                        size="large" 
                        class="px-4 px-sm-6" 
                        min-width="122" 
                        rounded="pill" 
                        color="accent2" 
                        variant="text"
                      >
                        <VIcon class="opacity-80" icon="$iconSave" start  size="x-large"/>
                        <strong>sačuvaj</strong>
                    </VBtn>
                    </VCardActions>

                  </VForm>
                  </VCard>
                </VSheet>
              </template>
            </VDialog>
          </VBtn>
        </VToolbar>
      </VCardItem>
      <VCardText>
        <!-- @tasks:list -->
        <VDataIterator
          v-if="!isEmpty(docsTasks$)"
          item-value="id"
          :page="page$"
          :items="docsTasks$"
          :items-per-page="10"
        >
          <template #default="{ items }">
            <VItemGroup v-model="tasksSelectedIds$" multiple>
              <section class="space-y-px mt-2 mt-sm-4">
                <template v-for="item in items" :key="item.raw.id">
                  <VItem :value="item.raw.id">
                    <template #default="{ isSelected, toggle }">
                      <!-- @tasks:list/item -->
                      <VHover open-delay="156">
                        <template #default="{ isHovering, props }">
                          <VCard
                            v-bind="props"
                            @click="toggle"
                            color="accent2"
                            :variant="isSelected ? 'elevated' : 'tonal'"
                            class="cursor-pointer"
                            link
                            density="compact"
                          >
                            <VCardTitle class="!text-sm pb-1">
                              <em class="w-[61%] !truncate d-inline-block">
                                {{ item.raw.data.title }}
                              </em>
                              <VFadeTransition>
                                <div v-if="isHovering" class="position-absolute end-px top-px">
                                  <VBtn 
                                    @click.stop="setChatActive(item.raw)" 
                                    icon 
                                    size="x-small" 
                                    variant="text"
                                    :color="isSelected ? undefined : 'accent2'" 
                                  >
                                    <VIcon icon="$iconChatDots" size="x-large" class="opacity-50" />
                                  </VBtn>
                                  <VBtn 
                                    v-if="auth.isAdmin$"
                                    icon 
                                    @click.stop="setTaskEditActive(item.raw)"
                                    variant="text" 
                                    :color="isSelected ? undefined : 'accent2'" 
                                    size="x-small"
                                  >
                                    <VIcon icon="$edit" size="x-large" class="opacity-50" />
                                  </VBtn>
                                  <VBtn 
                                    icon 
                                    @click.stop="setItemExpanded(item.raw.id)" 
                                    variant="text" 
                                    :color="isSelected ? undefined : 'accent2'" 
                                    size="x-small"
                                  >
                                    <VIcon 
                                      :icon="item.raw.id === itemExpandedId$ ? '$collapse' : '$expand'" 
                                      size="28" 
                                      class="opacity-50" 
                                    />
                                  </VBtn>
                                  <VBtn
                                    v-if="auth.isAdmin$"
                                    icon 
                                    @click.stop="taskToDeleteId$ = item.raw.id" 
                                    variant="text" 
                                    :color="isSelected ? undefined : 'accent2'" 
                                    size="x-small" 
                                    class="*ms-2"
                                  >
                                    <VIcon icon="$iconTrash" size="large" class="opacity-40" />
                                  </VBtn>
                                </div>
                              </VFadeTransition>
                            </VCardTitle>
                             <VExpandTransition>
                              <div v-if="itemHasInfo(item.raw) && (item.raw.id === itemExpandedId$)">
                                <VCardText class="space-y-4 sm:space-y-6">
                                  <p v-if="!isEmpty(get(item.raw, 'data.href'))" class="opacity-60">
                                    <a 
                                      @click.stop class="hover:underline" 
                                      :href="get(item.raw, 'data.href')" target="_blank"
                                    >
                                      {{ get(item.raw, 'data.href') }}
                                    </a>
                                  </p>
                                  <p v-if="!isEmpty(get(item.raw, 'data.description'))">
                                    {{ get(item.raw, 'data.description') }}
                                  </p>
                                </VCardText>
                              </div>
                            </VExpandTransition>
                        </VCard>
                      </template>
                    </VHover>
                        </template>
                      </VItem>
                </template>
              </section>
              </VItemGroup>
          </template>
        </VDataIterator>
        <p v-else class="mt-4 mt-sm-8 text-center text-disabled">
          <pre class="text-2xl d-inline">👌</pre> <strong>Nema aktivnih zadataka.</strong>
        </p>
      </VCardText>
    </VCard>
        <!-- @tasks:bottom-sheet/confirm-delete -->
        <VBottomSheet
          :model-value="null != taskToDeleteId$"
          inset
          scrim="white"
          @update:model-value="updatedTaskToDeleteId"
        >
        <VSheet elevation="4" color="error" class="pa-2 d-flex flex-col items-center opacity-95">
          <div class="text-center space-y-2">
            <p>
              Obriši zadatak <em class="opacity-50">#{{ taskToDeleteId$ }}</em>
            </p>
            <p>
              {{ get(find(docsTasks$, { id: taskToDeleteId$ }), "data.title") }}
            </p>
          </div>
          <div class="my-2 mt-4 mt-sm-6 d-flex gap-12">
            <VBtn @click="taskToDeleteId$ = null" variant="tonal">odustani</VBtn>
            <VBtn @click="async () => {
              await tasksRemove(Number(taskToDeleteId$));
              pull(tasksSelectedIds$, taskToDeleteId$);
              taskToDeleteId$ = null;
            }" variant="plain">
              <VIcon start size="large" icon="$iconTrash" />
              <em>obriši</em>
            </VBtn>
          </div>
        </VSheet>
        </VBottomSheet>
  </div>      
</template>
<style lang="scss" scoped>
</style>
