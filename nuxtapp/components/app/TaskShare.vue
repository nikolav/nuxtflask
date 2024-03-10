<script setup lang="ts">
import { schemaUsersNotReserved } from "@/schemas";
import type { IDocDataUsers, IDocDataTask, OrNoValue } from "@/types";
import { filter, get, isEmpty, reduce } from "@/utils";

const {
  docs: { TAG_USERS, TASKS_ALL, TASKS_USER_prefix },
} = useAppConfig();

const { data: docs$ } = useDocs<IDocDataUsers>(TAG_USERS);
// get users that can be asigned tasks to
const users$ = computed(() =>
  filter(
    docs$.value,
    (node) => schemaUsersNotReserved.safeParse(node.id).success
  )
);
const { data: tasks$, tags } = useDocs<IDocDataTask>(TASKS_ALL);
const taskTitleById = (id: number) =>
  get(find(tasks$.value, { id }), "data.title");

const main$ = useStoreMain();
const { TASKS_SELECTED_IDS } = useAppConfig().key;
const tasksSelectedIds$ = computed<OrNoValue<number[]>>({
  get: () => main$.get(TASKS_SELECTED_IDS) || [],
  set: (val) => {
    main$.put({
      [TASKS_SELECTED_IDS]: val,
    });
  },
});
const clearTaskSelectedIds = () => {
  tasksSelectedIds$.value = null;
};

const selectedUsersIds$ = ref<number[]>([]);
const someUsersSelected_ = computed(() => !isEmpty(selectedUsersIds$.value));

const submitTasksShare = async (assign_: boolean) => {
  console.log(`@submitTasksShare`);
  try {
    const tagsUserTasks = reduce(
      selectedUsersIds$.value,
      (acc, id) => {
        acc[`${TASKS_USER_prefix}${id}`] = assign_;
        return acc;
      },
      <Record<string, boolean>>{}
    );
    // console.log({ tagsUserTasks });
    // promise.all
    await Promise.all(
      (tasksSelectedIds$.value || []).map((taskId) =>
        tags(taskId, tagsUserTasks)
      )
    );
  } catch (error) {
    // pass
  } finally {
    console.log(`@@submitTasksShare/done`);
  }
  // close modal
  clearTaskSelectedIds();
};

// #eos
</script>
<template>
  <VCard
    max-width="640"
    class="mx-auto mt-12 mt-sm-16 *bg-red"
    variant="text"
    color="accent2-darken-2"
    rounded="t-lg"
  >
    <template #append>
      <VForm
        @submit.prevent="submitTasksShare(false)"
        :disabled="!someUsersSelected_"
      >
        <VBtn
          type="submit"
          :disabled="!someUsersSelected_"
          icon
          variant="text"
          color="accent2-darken-1"
          size="large"
        >
          <VIcon icon="$iconShareOff" size="x-large" />
          <VTooltip
            open-delay="156"
            text="Udalji izabrane članove sa zadataka"
            activator="parent"
            location="bottom"
          />
        </VBtn>
      </VForm>
      <VForm
        class="ms-8"
        @submit.prevent="submitTasksShare(true)"
        :disabled="!someUsersSelected_"
      >
        <VBtn
          type="submit"
          :disabled="!someUsersSelected_"
          icon
          :variant="!someUsersSelected_ ? 'plain' : 'tonal'"
          color="accent2-darken-1"
          size="large"
        >
          <VIcon icon="$iconShare" size="x-large" />
          <VTooltip
            open-delay="156"
            text="Dodeli zadatke izabranim članovima"
            activator="parent"
            location="bottom"
          />
        </VBtn>
      </VForm>
    </template>
    <VCardItem class="*bg-red pt-4">
      <VCardTitle class="*ps-2 *text-center text-h6 *sm:translate-x-12">
        <VIcon
          icon="$iconTaskShare"
          color="accent2"
          start
          class="-translate-y-[4px] me-3 opacity-30"
        />
        <em class="text-h5 text-medium-emphasis"> Podela zadataka </em>
      </VCardTitle>
    </VCardItem>
    <VCardText class="mt-sm-2">
      <!-- @selected-tags:list -->
      <div>
        <VTable hover>
          <thead class="text-disabled">
            <tr>
              <th class="w-24 font-mono">#</th>
              <th>Izabrani zadaci</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="taskId in tasksSelectedIds$" :key="taskId">
              <td class="*w-24 font-mono text-disabled">{{ taskId }}</td>
              <td>{{ taskTitleById(taskId) }}</td>
            </tr>
          </tbody>
        </VTable>
      </div>
    </VCardText>
    <VCardItem class="*bg-red pt-4 pt-sm-8">
      <VCardTitle
        class="*ps-2 *text-center text-h6 *sm:translate-x-12 opacity-50"
      >
        <VIcon
          icon="$iconPeople"
          color="accent2"
          start
          size="small"
          class="-translate-y-[4px] me-3"
        />
      </VCardTitle>
    </VCardItem>
    <VCardText class="mt-sm-2">
      <!-- @selected-tags:list -->
      <VItemGroup
        multiple
        v-model="selectedUsersIds$"
        selected-class="bg-accent2"
      >
        <VTable hover>
          <tbody>
            <template v-for="user in users$" :key="user.id">
              <VItem :value="user.id">
                <template #default="{ toggle, selectedClass, isSelected }">
                  <tr
                    @click="toggle"
                    class="cursor-pointer"
                    :class="isSelected ? selectedClass : ''"
                  >
                    <td class="w-24 ps-1">
                      <span class="d-flex items-center">
                        <VCheckboxBtn
                          density="comfortable"
                          inline
                          :model-value="isSelected"
                        />
                        <span class="opacity-40 font-mono">{{ user.id }}</span>
                      </span>
                    </td>
                    <td>{{ user.data.email }}</td>
                  </tr>
                </template>
              </VItem>
            </template>
          </tbody>
        </VTable>
      </VItemGroup>
    </VCardText>
  </VCard>
</template>
<style lang="scss" scoped>
</style>
