<script setup lang="ts">
import { isNumeric } from "@/utils";

const appbar = ref();
// const { height } = useElementSize(appbar);
const { appBarHeight, offsetTop } = useAppConfig().layout;
const paddingTop = `calc(${
  isNumeric(appBarHeight) ? appBarHeight + "px" : appBarHeight
} + ${isNumeric(offsetTop) ? offsetTop + "px" : offsetTop}) !important`;
// # eos
</script>

<template>
  <section id="layout-default" class="ma-0 pa-0">
    <VAppBar ref="appbar" :height="useAppConfig().layout.appBarHeight">
      <template #prepend>
        <VAppBarNavIcon color="primary-darken-1" />
      </template>
      <template #append>
        <VBtn icon="$iconDotsV" size="small" color="primary-darken-1"/>
      </template>
      <VAppBarTitle>app:foo</VAppBarTitle>
      <ul class="d-flex space-x-2 items-center me-6">
        <li><NuxtLink to="/">home</NuxtLink></li>
        <li><NuxtLink to="demo-auth">auth</NuxtLink></li>
      </ul>
    </VAppBar>

    <VMain :style="{ paddingTop }">
      <slot>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          Necessitatibus, natus sit deleniti, ullam, officia quas sapiente porro
          quis at id a eligendi quibusdam vel dignissimos architecto fugiat
          minus aut ad!
        </p>
      </slot>
    </VMain>
  </section>
</template>
