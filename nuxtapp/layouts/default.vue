<script setup lang="ts">
import { isNumeric } from "@/utils";

const { appBarHeight, offsetTop } = useAppConfig().layout;
const paddingTop = `calc(${
  isNumeric(appBarHeight) ? appBarHeight + "px" : appBarHeight
} + ${isNumeric(offsetTop) ? offsetTop + "px" : offsetTop}) !important`;

const links = [
  {
    title: "home",
    href: "/",
  },
];
const btnVariant = (href: string) =>
  href == useRoute().name ? "text" : "plain";

// # eos
</script>

<template>
  <section id="layout-default" class="ma-0 pa-0">
    <VAppBar name="appbar-main" :height="appBarHeight" elevation="1">
      <VAppBarTitle class="text-disabled text-body-1">
        <pre>uni.nikolav.rs</pre>
      </VAppBarTitle>
      <template #append>
        <template v-for="link in links" :key="link.href">
          <NuxtLink :to="link.href">
            <VBtn
              :variant="btnVariant(link.href)"
              class="text-none !text-sm"
              slim
              rounded="pill"
              >{{ link.title }}</VBtn
            >
          </NuxtLink>
          <VAppBarNavIcon class="ms-2 ms-md-3" color="primary-darken-1" />
        </template>
      </template>
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
