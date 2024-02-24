<script setup lang="ts">
useHead({
  title: "--auth",
});

const password$ = ref("");
// #eos
</script>
<template>
  <section class="page-auth">
    <h1 class="text-center pt-4 pt-md-6">Dobrodošli Nikola.</h1>
    <VForm autocomplete="off" @submit.prevent>
      <VTextField
        class="mx-auto max-w-96 mt-4 mt-md-8 space-x-0"
        variant="solo-inverted"
        name="password"
        type="password"
        rounded="s-pill"
        autocomplete="off"
        v-model="password$"
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
          </VBtn>
        </template>
      </VTextField>
    </VForm>
    <pre>
      {{ password$ }}
    </pre>
  </section>
</template>
<style lang="scss" scoped>
</style>