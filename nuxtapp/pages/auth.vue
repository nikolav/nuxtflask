<script setup lang="ts">
import { schemaAuthCredentials } from "@/schemas";

useHead({
  title: "--auth",
});

const auth = useStoreApiAuth();
const { AUTH_CREDS, APP_PROCESSING } = useAppConfig().key;
const main$ = useStoreMain();
const flags = useStoreFlags();
const password$ = ref("");

watch(
  () => auth.isAdmin$ || auth.isUser$,
  async (isAdminOrUser) => {
    if (isAdminOrUser) {
      await navigateTo({ name: "index" });
      main$.put({ [AUTH_CREDS]: null });
      flags.off(APP_PROCESSING);
    }
  }
);

watch(
  [() => !auth.isAuth$, () => main$.get(AUTH_CREDS)],
  async ([notIsAuth, authCreds]) => {
    if (notIsAuth && null != authCreds) await auth.login(authCreds);
  }
);

const toggleAuthSnackbar = useToggleFlag();
const submited_ = async () => {
  try {
    const [email, password] = password$.value.split("::");
    const authCreds = schemaAuthCredentials.parse({ email, password });
    main$.put({
      [AUTH_CREDS]: authCreds,
    });
    flags.on(APP_PROCESSING);
    await auth.logout();
  } catch (error) {
    flags.off(APP_PROCESSING);
    toggleAuthSnackbar.delay.off(3456);
    toggleAuthSnackbar.on();
  }
};

// #eos
</script>
<template>
  <section class="page-auth d-flex justify-center pt-16 md:pt-24">
    <VForm autocomplete="off" @submit.prevent="submited_" class="flex-1">
      <h1 class="mb-1 mx-auto max-w-96 opacity-50 text-center">Dobrodošli</h1>
      <VTextField
        class="mx-auto max-w-96 space-x-0"
        variant="solo-inverted"
        name="password"
        type="password"
        rounded="s-pill"
        autocomplete="off"
        v-model="password$"
        clearable
      >
        <template #prepend-inner>
          <VIcon class="ps-1 !opacity-40" start :size="32" icon="$iconKey" />
        </template>
        <template #append>
          <VBtn
            type="submit"
            rounded="e-pill"
            block
            height="100%"
            elevation="3"
            color="primary-darken-2"
            icon
          >
            <VIcon
              :size="21"
              class="-translate-x-[2px] opacity-40"
              icon="$iconLock"
            />
            <VTooltip
              open-delay="122"
              text="Otključaj"
              location="bottom"
              activator="parent"
            />
          </VBtn>
        </template>
      </VTextField>
    </VForm>
    <VSnackbar
      class="opacity-85"
      color="error"
      location="top"
      v-model="toggleAuthSnackbar.isActive.value"
    >
      <em>Pokušajte ponovo.</em>
      <template #actions>
        <VBtn
          size="small"
          icon="$close"
          variant="plain"
          @click="toggleAuthSnackbar.off"
        />
      </template>
    </VSnackbar>
  </section>
</template>
<style lang="scss" scoped>
</style>
