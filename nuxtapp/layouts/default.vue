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
  {
    title: "auth",
    href: "/auth",
  },
];
const btnVariant = (href: string) =>
  href == useRoute().name ? "text" : "plain";

const sidebarWindow$ = ref("chat");

// # eos
</script>

<template>
  <section id="layout-default" class="ma-0 pa-0">
    <VAppBar name="appbar-main" :height="appBarHeight" elevation="2">
      <VAppBarTitle class="text-disabled text-h5 ps-2 ps-sm-4">
        <pre class="italic">uni.nikolav.rs</pre>
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
        </template>
        <VAppBarNavIcon class="ms-2 ms-md-3" color="primary-darken-1" />
      </template>
    </VAppBar>

    <VMain :style="{ paddingTop }">
      <slot>
        <p>Lorem!</p>
      </slot>
    </VMain>

    <VNavigationDrawer
      elevation="2"
      class="*bg-red"
      location="end"
      permanent
      :width="372"
    >
      <div class="pa-1 pa-sm-2 text-[88%]">
        <VWindow v-model="sidebarWindow$">
          <VFadeTransition leave-absolute>
            <VWindowItem value="chat">@chat: </VWindowItem>
          </VFadeTransition>
          <VFadeTransition leave-absolute>
            <VWindowItem value="tasks">@tasks</VWindowItem>
          </VFadeTransition>
          <VFadeTransition leave-absolute>
            <VWindowItem value="log">@dnevnik</VWindowItem>
          </VFadeTransition>
        </VWindow>
      </div>
      <VBtnToggle
        class="absolute w-[88%] bottom-3 start-1/2 -translate-x-[50%] opacity-95"
        mandatory
        v-model="sidebarWindow$"
        elevation="1"
      >
        <VBtn size="small" color="primary" value="chat" class="flex-1" stacked>
          <VIcon :size="18" icon="$iconChat" />
          <span>ćaskanje</span>
        </VBtn>
        <VBtn size="small" color="primary" value="tasks" class="flex-1" stacked>
          <VIcon :size="18" icon="$iconTodo" />
          <span>zadaci</span>
        </VBtn>
        <VBtn size="small" color="primary" value="log" class="flex-1" stacked>
          <VIcon :size="18" icon="$iconJournal" class="mb-px" />
          <span>dnevnik</span>
        </VBtn>
      </VBtnToggle>
    </VNavigationDrawer>
    <VNavigationDrawer
      :order="1"
      location="start"
      permanent
      :width="64"
      color="secondary"
    >
      <VList>
        <VListItem v-for="n in 3" title="foo" :key="n" link />
      </VList>
    </VNavigationDrawer>
    <VFooter class="opacity-95" color="primary-darken-1" app height="35">foo</VFooter>
  </section>
</template>
