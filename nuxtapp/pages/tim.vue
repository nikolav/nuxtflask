<script setup lang="ts">
import { useDisplay } from "vuetify";
import { SpinnerBeat } from "@/components/spinners";
import type { IDocDataUsers, IDoc, OrNoValue } from "@/types";
import { schemaUsersNotReserved } from "@/schemas";
import { get, isEmpty } from "@/utils";

definePageMeta({
  middleware: "authorized-admin",
});

useHead({
  title: "--tim",
});

const { smAndUp } = useDisplay();

// @users/docs
const { TAG_USERS } = useAppConfig().docs;
const {
  data: users$,
  usersAdd,
  usersRemove,
} = useDocs<IDocDataUsers>(TAG_USERS);

// @users/selected
const userAction$ = ref<OrNoValue<IDoc<IDocDataUsers>>>(null);
const toggleUserActive = useToggleFlag();
const userSelect = (user: IDoc<IDocDataUsers>) => {
  userAction$.value = user;
  toggleUserActive.on();
};

// @users/crud
const newUserEmail$ = ref();
const newUserPassword$ = ref();

const usersRm = async () => {
  await usersRemove(userAction$.value?.id);
  toggleUserActive.off();
};
const submitUserAdd = async (onDone: () => void) => {
  await usersAdd(newUserEmail$.value, newUserPassword$.value);
  newUserPassword$.value = "";
  onDone();
};

const isUserNotReserved = (user: any) =>
  true === schemaUsersNotReserved.safeParse(get(user, "id")).success;

// #eos
</script>
<template>
  <section id="page-people" class="pa-2 pa-md-4">
    <!-- @panel/tim -->
    <VCard min-height="122" max-width="720" class="mx-auto">
      <VCardItem class="pa-0 ma-0">
        <!-- @panel/tim:toolbar -->
        <VToolbar density="comfortable" flat class="ps-2 *pe-0">
          <VToolbarTitle
            ><strong>Tim</strong>
            <VBadge
              color="complement"
              class="d-inline-block ms-1 -translate-y-[2px] cursor-default !font-mono"
              :content="users$.length"
              inline
            />
          </VToolbarTitle>

          <VSpacer />
          <!-- @panel/tim:toolbar.usersAdd -->
          <VBtn icon variant="plain"
            ><VIcon
              icon="$iconPersonAdd"
              size="20"
              color="complement-lighten-1"
            />
            <!-- @panel/tim:toolbar.usersAdd.form -->
            <VDialog activator="parent">
              <template #default="{ isActive }">
                <VCard
                  :min-width="smAndUp ? 550 : `100%`"
                  class="mx-auto pa-2 pt-5 *position-relative *overflow-visible"
                >
                  <VBtn
                    icon
                    @click="isActive.value = false"
                    color="complement-darken-2"
                    variant="plain"
                    class="position-absolute top-2 end-2"
                    ><VIcon icon="$close" size="large"
                  /></VBtn>
                  <VCardTitle class="mb-4 ms-3 items-center d-flex">
                    <VIcon
                      start
                      icon="$iconPersonAdd"
                      size="small"
                      class="opacity-40 -translate-y-px"
                    />
                    <span class="ms-4 text-xl">Dodaj novog člana tima</span>
                  </VCardTitle>
                  <VCardText>
                    <VForm
                      @submit.prevent="
                        submitUserAdd(() => {
                          isActive.value = false;
                        })
                      "
                      autocomplete="off"
                    >
                      <VTextField
                        type="email"
                        name="userEmail"
                        label="Email"
                        variant="underlined"
                        v-model="newUserEmail$"
                        clearable
                      >
                        <template #prepend>
                          <VIcon
                            icon="$iconEnvelope"
                            size="large"
                            class="!opacity-30 !-rotate-2"
                            start
                          />
                        </template>
                      </VTextField>
                      <VTextField
                        name="userPassword"
                        type="password"
                        autocomplete="off"
                        label="Lozinka"
                        variant="underlined"
                        v-model.lazy="newUserPassword$"
                        clearable
                      >
                        <template #prepend>
                          <VIcon
                            icon="$iconKey"
                            start
                            size="large"
                            class="!opacity-40"
                          />
                        </template>
                      </VTextField>
                      <VBtnGroup
                        rounded="pill"
                        class="d-flex justify-center mt-4 mt-sm-6 mb-1"
                      >
                        <VBtn
                          size="large"
                          variant="tonal"
                          class="grow"
                          @click="isActive.value = false"
                          >odustani</VBtn
                        >
                        <VBtn
                          variant="text"
                          type="submit"
                          class="grow"
                          color="accent2"
                          size="large"
                        >
                          <VIcon icon="$iconSave" start size="large" />
                          <strong class="ms-1">OK</strong>
                        </VBtn>
                      </VBtnGroup>
                    </VForm>
                  </VCardText>
                </VCard>
              </template>
            </VDialog>
          </VBtn>
        </VToolbar>
      </VCardItem>
      <VCardText class="pt-2">
        <!-- @users/table -->
        <p v-if="isEmpty(users$)" class="text-center mt-4">
          <SpinnerBeat size="16" />
        </p>
        <VTable
          v-else
          class="max-h-[389px]"
          hover
          fixed-header
          density="comfortable"
        >
          <thead class="text-disabled">
            <tr>
              <th class="!w-24" scope="col"><strong>#</strong></th>
              <th><strong>email</strong></th>
            </tr>
          </thead>
          <tbody class="text-start">
            <template v-for="user in users$" :key="user.id">
              <VHover>
                <template #default="{ isHovering, props }">
                  <tr class="position-relative" v-bind="props">
                    <td>{{ user.id }}</td>
                    <td>{{ user.data["email"] }}</td>
                    <!-- @users/remove.button -->
                    <VBtn
                      v-if="isHovering && isUserNotReserved(user)"
                      class="position-absolute end-2 top-1/2 -translate-y-[50%]"
                      variant="plain"
                      color="error"
                      icon
                      size="small"
                      @click="userSelect(user)"
                    >
                      <VIcon
                        class="opacity-80 position-relative translate-x-[2px] -translate-y-[1px]"
                        icon="$iconPersonRemove"
                    /></VBtn>
                  </tr>
                </template>
              </VHover>
            </template>
          </tbody>
        </VTable>
      </VCardText>
    </VCard>
    <!-- @users/remove.menu.confirm -->
    <VMenu
      max-width="333"
      :close-on-content-click="false"
      v-model="toggleUserActive.isActive.value"
      class="d-flex justify-center items-center"
      v-click-outside="toggleUserActive.off"
    >
      <VCard elevation="4" color="error" variant="tonal">
        <VCardItem class="pa-sm-4">
          <VCardTitle class="text-center">
            Obriši <strong>#{{ userAction$?.id }}</strong>
          </VCardTitle>
          <VCardSubtitle class="text-center">
            {{ userAction$?.data["email"] }}</VCardSubtitle
          >
        </VCardItem>
        <VCardActions class="justify-between mt-6 mt-sm-8 bg-red-500/20 pa-3">
          <VBtn variant="tonal" color="primary" @click="toggleUserActive.off"
            >Odustani</VBtn
          >
          <VBtn
            class="text-none"
            variant="plain"
            color="error"
            @click="usersRm"
          >
            <VIcon icon="$iconTrash" start />
            <strong>Obriši</strong>
          </VBtn>
        </VCardActions>
      </VCard>
    </VMenu>
  </section>
</template>
<style lang="scss" scoped>
</style>
