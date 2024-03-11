<script setup lang="ts">
import { emojify } from "node-emoji";
import {
  isNumeric,
  matchEmailStart,
  capitalize,
  // get,
} from "@/utils";
import {
  TaskChat,
  TaskEdit,
  WindowChat,
  WindowJournal,
  WindowTasks,
  TaskShare,
} from "@/components/app";
// import type { IDoc, IDocDataChat, OrNoValue } from "@/types";

const auth = useStoreApiAuth();
const isAdminOrUser$ = computed(() => auth.isAdmin$ || auth.isUser$);

const { appBarHeight, offsetTop } = useAppConfig().layout;
const paddingTop = `calc(${
  isNumeric(appBarHeight) ? appBarHeight + "px" : appBarHeight
} + ${isNumeric(offsetTop) ? offsetTop + "px" : offsetTop}) !important`;

const sidebarWindow$ = ref("chat");

const logoutHard = async () => {
  await auth.logout();
  reloadNuxtApp({ force: true, persistState: false });
};

const pageNamesLocal: Record<string, string> = {
  help: "pomoć",
};
const route = useRoute();
const page$ = computed(() =>
  route.name
    ? route.name in pageNamesLocal
      ? pageNamesLocal[String(route.name)]
      : route.name
    : undefined
);

const sidebarLeftLinks = [
  {
    title: "home",
    route: "/",
    icon: "$iconHome",
  },
  {
    title: "radnja",
    route: "radnja",
    icon: "$iconStore",
  },
  {
    title: "tim",
    icon: "$iconPeople",
    route: "tim",
    size: 22,
  },
  {
    title: "pomoć",
    icon: "$iconHelp",
    route: "help",
    size: 22,
  },
];

const { CHAT_ACTIVE, TASK_EDIT_active } = useAppConfig().stores.main;
const main$ = useStoreMain();

const taskEditActive$ = computed({
  get: () => main$.get(TASK_EDIT_active),
  set: (node: any) => {
    main$.put({
      [TASK_EDIT_active]: node,
    });
  },
});

const clearTaskEditActive = () => {
  taskEditActive$.value = null;
};
const dialogTaskEditModelUpdated = (val: boolean) => {
  if (!val) clearTaskEditActive();
};

const { TASKS_SELECTED_IDS } = useAppConfig().key;
const tasksSelectedIds$ = computed({
  get: () => main$.get(TASKS_SELECTED_IDS),
  set: (val) => {
    main$.put({
      [TASKS_SELECTED_IDS]: val,
    });
  },
});
const cleatTasksSelectedIds = () => {
  tasksSelectedIds$.value = null;
};
const updatedTasksSelectedIds = (val: boolean) => {
  if (!val) cleatTasksSelectedIds();
};

// # eos
</script>

<template>
  <section id="layout-default" class="ma-0 pa-0">
    <!-- @dialog/assign:share-tasks -->
    <VDialog
      fullscreen
      persistent
      no-click-animation
      transition="slide-y-reverse-transition"
      :model-value="null != tasksSelectedIds$"
      @update:model-value="updatedTasksSelectedIds"
    >
      <VSheet>
        <VBtn
          @click="cleatTasksSelectedIds"
          color="accent2"
          icon
          size="large"
          variant="plain"
          class="position-absolute top-2 start-2 z-10 text-high-emphasis"
        >
          <VIcon icon="$close" size="large" />
        </VBtn>
        <TaskShare />
      </VSheet>
    </VDialog>
    <!-- @dialog/edit-task -->
    <VDialog
      fullscreen
      :model-value="null != taskEditActive$"
      @update:model-value="dialogTaskEditModelUpdated"
      persistent
      no-click-animation
      transition="slide-y-reverse-transition"
    >
      <VSheet elevation="0" rounded="0">
        <VBtn
          @click="clearTaskEditActive"
          color="accent2"
          icon
          size="large"
          variant="plain"
          class="position-absolute top-2 start-2 z-10 text-high-emphasis"
        >
          <VIcon icon="$close" size="large" />
        </VBtn>

        <TaskEdit />
      </VSheet>
    </VDialog>
    <!-- @navigation-drawer/active-chat -->
    <VNavigationDrawer
      touchless
      location="right"
      temporary
      :model-value="null != main$.get(CHAT_ACTIVE)"
      width="345"
      @update:model-value="
        (val) => {
          if (!val)
            main$.put({
              [CHAT_ACTIVE]: null,
            });
        }
      "
    >
      <TaskChat />
    </VNavigationDrawer>

    <!-- @appbar -->
    <VAppBar name="app-appbar" :height="appBarHeight" elevation="2">
      <VAppBarTitle class="text-disabled text-h5 ps-2 ps-sm-4">
        <pre class="italic">uni.nikolav.rs</pre>
      </VAppBarTitle>
      <template #append>
        <em class="text-disabled text-sm me-4 me-sm-8" v-if="isAdminOrUser$">
          <pre
            >{{ emojify(":wave:") }} {{
              capitalize(matchEmailStart(get(auth.user$, "email")))
            }}</pre
          >
        </em>
        <VBtn
          @click="logoutHard"
          v-if="isAdminOrUser$"
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
      </template>
    </VAppBar>

    <!-- @page/main -->
    <VMain :style="{ paddingTop }">
      <slot>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit
          aspernatur ab dolores!
        </p>
      </slot>
    </VMain>

    <!-- @sidebar -->
    <VNavigationDrawer
      elevation="2"
      class="*bg-red"
      location="end"
      permanent
      :width="372"
    >
      <div class="text-[88%]">
        <VWindow v-model="sidebarWindow$" :touch="false">
          <VFadeTransition mode="in-out" leave-absolute>
            <VWindowItem value="chat"><WindowChat /></VWindowItem>
          </VFadeTransition>
          <VFadeTransition mode="in-out" leave-absolute>
            <VWindowItem value="tasks"><WindowTasks /></VWindowItem>
          </VFadeTransition>
          <VFadeTransition mode="in-out" leave-absolute>
            <VWindowItem value="log"><WindowJournal /></VWindowItem>
          </VFadeTransition>
        </VWindow>
      </div>

      <!-- @sidebar/controls -->
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
          :disabled="!(auth.isAdmin$ || auth.isUser$)"
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
          :disabled="!(auth.isAdmin$ || auth.isUser$)"
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

    <!-- @sidebarLeft -->
    <VNavigationDrawer
      :order="1"
      location="start"
      permanent
      width="52"
      color="secondary"
    >
      <VList class="pt-0">
        <template v-for="link in sidebarLeftLinks" :key="link.title">
          <NuxtLink :to="link.route">
            <VListItem link class="d-flex justify-center px-0">
              <VIcon
                color="primary-lighten-1"
                v-if="link.icon"
                :icon="link.icon"
                :size="link.size"
              />
              <VListItemTitle v-else>{{ link.title }}</VListItemTitle>
            </VListItem>
          </NuxtLink>
        </template>
      </VList>
    </VNavigationDrawer>

    <!-- @footer -->
    <VFooter
      app
      class="text-sm px-1 opacity-95"
      color="accent2-darken-2"
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
