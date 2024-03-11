import type { TStoreMain, TStoreFlags, IConfigDocs, IAppData } from "@/types";
import { assign } from "@/utils";
import { PRODUCTION$, URL_APP_PUBLIC } from "@/config";

const themeDark = "dark";
const themeLight = "light2";
const AUTH_LOCKED = "eq1hiOTCPNCfo20Y";
const CHAT_EDIT_active = "rAkrT0XZJvlXbb";
const TASK_EDIT_active = "TB2HXTaILV3eKlQAoSa8";

export default defineAppConfig({
  ADMIN_EMAIL: "admin@nikolav.rs",
  DEBUG: true !== PRODUCTION$,
  APP_USER_DEFAULT: {
    email: "user@nikolav.rs",
    password: "user@nikolav.rs",
  },
  docs: {
    TAG_USERS: "@users",
    prefix_TAG_USERS_DOCS: "pH82VKaHwf3RLfZlR:",
    prefix_CHAT_ACTIVE: "KFrbiAW5Zm3:",
    TASKS_ALL: "@tasks:all",
    TASKS_USER_prefix: "Njvrw1gYEXd3yv:",
  },
  //
  key: {
    APP_MOUNTED: "Zkcmk4BnXHU",
    APP_PROCESSING: "FlaelfhZddK",
    AUTH_CREDS: "pafer98hf",
    AUTH_LOCKED,
    CHAT_NAME: "QOPnfTw9",
    INJECT_AUTHAPI: "WYvEK29UZIP",
    INJECT_THEME: "Aasnvy2eaxE",
    PROVIDE_APP_DATA: "Ud8dHoadmBgSr55P6gJ",
    THEME: "0Fgky53B2UbA1fG3lKcV",
    TASKS_SELECTED_IDS: "f6sSDP",
  },
  //
  FIELDS_OMIT_STORAGE_META: ["id", "created_at", "updated_at", "__typename"],
  //
  DEFAULT_CONFIG_useApiDocs: <IConfigDocs>{ autoReload: true },
  defaults: {
    appData: <IAppData>{
      "admin:email": "admin@nikolav.rs",
    },
  },
  //
  api: {
    TAG_STORAGE: "@storage:",
    DOCS_CHAT_ALL: "@chat:all",
  },
  //
  graphql: {
    STORAGE_QUERY_POLL_INTERVAL: 67890,
  },
  //
  stores: {
    main: {
      initial: <TStoreMain>{
        "app:name": "nikolav.rs",
        [CHAT_EDIT_active]: null,
        [TASK_EDIT_active]: null,
      },
      CHAT_ACTIVE: "ozbbRlAv19DO",
      CHAT_ACTIVE_title: "SFImifljHov",
      CHAT_EDIT_active,
      TASK_EDIT_active,
    },
    flags: {
      initial: <TStoreFlags>{
        [AUTH_LOCKED]: false,
      },
    },
    auth: {
      KEY_ACCESS_TOKEN: ":sEe5xYuTL4q",
      KEY_USEFETCH_AUTHDATA: "GEXjh1kt9Oc",
      authDataFields: ["id", "email"],
      initial: () => "",
      authHeaders: (token: string, additional?: Record<string, any>) =>
        assign(
          token
            ? {
                Authorization: `Bearer ${token}`,
              }
            : {},
          additional || {}
        ),
    },
  },
  //
  io: {
    IOEVENT_DOCS_CHANGE: "change:docs",
    IOEVENT_STORAGE_CHANGE: "@storage:",
    IOEVENT_DOCS_CHANGE_JsonData: "change:docs:JsonData:",
    IOEVENT_DOC_CHANGE_prefix: "change://doc@",
    IOEVENT_DOCS_TAGS_CHANGE_prefix: "change:docs:tags:",
  },
  theme: {
    DEFAULT: themeLight,
    DARK: themeDark,
    LIGHT: themeLight,
  },
  layout: {
    appBarHeight: 82,
    // additional @VMain/padding-top
    offsetTop: "1.22rem",
  },
  effect: {
    default: "headShake",
    duration: 890,
  },
  urls: {
    appPublic: URL_APP_PUBLIC,
    github: "https://github.com/nikolav/nuxtflask",
  },
});
