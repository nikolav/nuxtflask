import type { TStoreMain, TStoreFlags, IConfigDocs } from "@/types";
import { assign } from "@/utils";
import { PRODUCTION$ } from "@/config";

const themeDark = "dark";
const themeLight = "light2";
const AUTH_LOCKED = "eq1hiOTCPNCfo20Y";

export default defineAppConfig({
  ADMIN_EMAIL: "admin@nikolav.rs",
  DEBUG: true !== PRODUCTION$,
  APP_USER_DEFAULT: {
    email: "user@nikolav.rs",
    password: "user@nikolav.rs",
  },
  //
  key: {
    APP_MOUNTED: "Zkcmk4BnXHU",
    APP_PROCESSING: "FlaelfhZddK",
    INJECT_AUTHAPI: "WYvEK29UZIP",
    INJECT_THEME: "Aasnvy2eaxE",
    THEME: "0Fgky53B2UbA1fG3lKcV",
    AUTH_LOCKED,
    AUTH_CREDS: "pafer98hf",
  },
  //
  FIELDS_OMIT_STORAGE_META: ["id", "created_at", "updated_at", "__typename"],
  //
  DEFAULT_CONFIG_useApiDocs: <IConfigDocs>{ autoReload: true },
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
      },
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
});
