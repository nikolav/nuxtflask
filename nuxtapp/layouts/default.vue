<script setup lang="ts">
import { isNumeric } from "@/utils";
import { WindowChat, WindowTasks, WindowJournal } from "@/components/ui";

const auth = useStoreApiAuth();

const { appBarHeight, offsetTop } = useAppConfig().layout;
const paddingTop = `calc(${
  isNumeric(appBarHeight) ? appBarHeight + "px" : appBarHeight
} + ${isNumeric(offsetTop) ? offsetTop + "px" : offsetTop}) !important`;

const sidebarWindow$ = ref("chat");

const logoutHard = async () => {
  await auth.logout();
  reloadNuxtApp({
    path: "/",
  });
};

const page$ = computed(() => useRoute().name);
// # eos
</script>

<template>
  <section id="layout-default" class="ma-0 pa-0">
    <VAppBar name="app-appbar" :height="appBarHeight" elevation="2">
      <VAppBarTitle class="text-disabled text-h5 ps-2 ps-sm-4">
        <pre class="italic">uni.nikolav.rs</pre>
      </VAppBarTitle>
      <template #append>
        <VBtn
          @click="logoutHard"
          v-if="auth.isAdmin$"
          icon
          variant="text"
          size="small"
        >
          <VIcon icon="$iconPowerOff" />
          <VTooltip
            open-delay="122"
            location="bottom"
            activator="parent"
            text="Kraj"
          />
        </VBtn>
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
      <div class="text-[88%]">
        <VWindow v-model="sidebarWindow$">
          <VFadeTransition leave-absolute>
            <VWindowItem value="chat"><WindowChat /></VWindowItem>
          </VFadeTransition>
          <VFadeTransition leave-absolute>
            <VWindowItem value="tasks"><WindowTasks /></VWindowItem>
          </VFadeTransition>
          <VFadeTransition leave-absolute>
            <VWindowItem value="log"><WindowJournal /></VWindowItem>
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
        <VBtn
          :disabled="!auth.isAdmin$"
          size="small"
          color="primary"
          value="tasks"
          class="flex-1"
          stacked
        >
          <VIcon :size="18" icon="$iconTodo" />
          <span>zadaci</span>
        </VBtn>
        <VBtn
          :disabled="!auth.isAdmin$"
          size="small"
          color="primary"
          value="log"
          class="flex-1"
          stacked
        >
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
      <VList :disabled="!auth.isAdmin$">
        <VListItem v-for="n in 3" title="foo" :key="n" link />
      </VList>
    </VNavigationDrawer>
    <VFooter
      app
      class="text-sm px-1 opacity-95"
      color="primary-darken-1"
      height="35"
    >
      <template v-if="'index' === page$"
        ><VIcon icon="$iconHome" start
      /></template>
      <template v-else>
        <em class="text-secondary"> @{{ page$ }} </em>
      </template>
    </VFooter>
  </section>
</template>

<style lang="scss" scoped>
</style>
