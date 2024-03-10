<script setup lang="ts">
import { get, assign } from "@/utils";
import { schemaTask } from "@/schemas";
import type { IDocDataTask } from "@/types";

const { upsert: upsertTaskEdit } = useDocs<IDocDataTask>("@tasks:all");

const { TASK_EDIT_active } = useAppConfig().stores.main;
const main$ = useStoreMain();
const taskEditActive$ = computed({
  get: () => main$.get(TASK_EDIT_active),
  set: (val: any) => {
    main$.put({
      [TASK_EDIT_active]: val,
    });
  },
});
const clearTaskEdit = () => {
  taskEditActive$.value = null;
};
const taskEditTitle$ = ref(get(taskEditActive$.value, "data.title"));
const taskEditHref$ = ref(get(taskEditActive$.value, "data.href"));
const taskEditDescription$ = ref(
  get(taskEditActive$.value, "data.description")
);

const submitTaskEdit = async () => {
  try {
    const taskData_ = assign({}, get(taskEditActive$.value, "data"), {
      title: taskEditTitle$.value,
      href: taskEditHref$.value || "",
      description: taskEditDescription$.value || "",
    });

    await upsertTaskEdit(schemaTask.parse(taskData_), taskEditActive$.value.id);
  } catch (error) {
    // pass
  }
  //
  clearTaskEdit();
};
// #eos
</script>
<template>
  <VCard variant="flat" max-width="550" class="mx-auto mt-6 mt-sm-12">
    <!-- @dialog:tasks-add/toolbar -->
    <VToolbar class="bg-transparent">
      <em class="text-h5 grow text-center text-disabled">
        <VIcon icon="$iconTaskEdit" class="opacity-30" start />
        Uredi zadatak
      </em>
    </VToolbar>
    <!-- @dialog:tasks-add/form -->
    <VForm autocomplete="off" @submit.prevent="submitTaskEdit">
      <VCardText>
        <VTextField
          name="editChatTitle"
          v-model="taskEditTitle$"
          clearable
          label="Naziv *"
          variant="underlined"
        >
          <template #prepend>
            <VIcon start icon="$iconTag" class="text-disabled" size="small" />
          </template>
        </VTextField>
        <VTextField
          name="editChatHref"
          v-model="taskEditHref$"
          clearable
          label="Veza"
          variant="underlined"
        >
          <template #prepend>
            <VIcon
              start
              icon="$iconAttach"
              size="small"
              class="text-disabled"
            />
          </template>
        </VTextField>
        <VTextarea
          name="editChatDescription"
          v-model="taskEditDescription$"
          clearable
          label="Opis"
          variant="underlined"
        >
          <template #prepend>
            <VIcon
              start
              icon="$iconDescription"
              size="small"
              class="text-disabled"
            />
          </template>
        </VTextarea>
      </VCardText>

      <!-- @dialog:tasks-add/controlls -->
      <VCardActions class="*bg-red justify-around">
        <VBtn
          class="px-4 px-sm-6"
          @click="clearTaskEdit"
          min-width="122"
          rounded="pill"
          variant="tonal"
          color="primary"
          >odustani</VBtn
        >
        <VBtn
          class="px-4 px-sm-6"
          min-width="122"
          rounded="pill"
          type="submit"
          color="success"
          variant="text"
        >
          <VIcon class="opacity-80" icon="$iconSave" start size="x-large" />
          <strong>sačuvaj</strong>
        </VBtn>
      </VCardActions>
    </VForm>
  </VCard>
</template>
<style lang="scss" scoped>
</style>
