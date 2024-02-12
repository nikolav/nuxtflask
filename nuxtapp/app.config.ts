import type { TStoreMain, TStoreFlags, IConfigDocs } from "@/types";
import { assign } from "@/utils";
import { PRODUCTION$ } from "@/config";

export default defineAppConfig({
  ADMIN_EMAIL: "admin@nikolav.rs",
  DEBUG: true !== PRODUCTION$,
  //
  KEY_APP_MOUNTED: "Zkcmk4BnXHU",
  KEY_APP_PROCESSING: "FlaelfhZddK",
  //
  key: {
    APP_MOUNTED: "Zkcmk4BnXHU",
    APP_PROCESSING: "FlaelfhZddK",
    INJECT_AUTHAPI: "WYvEK29UZIP",
    INJECT_THEME: "Aasnvy2eaxE",
    THEME: "0Fgky53B2UbA1fG3lKcV",
  },
  //
  FIELDS_OMIT_STORAGE_META: ["id", "created_at", "updated_at", "__typename"],
  //
  DEFAULT_CONFIG_useApiDocs: <IConfigDocs>{ autoReload: true },
  //
  api: {
    TAG_STORAGE: "@storage:",
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
      initial: <TStoreFlags>{},
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
    DARK: "dark",
    LIGHT: "light2",
  },
  layout: {
    appBarHeight: 82,
    // additional @VMain/padding-top
    offsetTop: "1rem",
  },
});
