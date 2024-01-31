import { type TStoreMain } from "@/types";
import { type TStoreFlags } from "@/types";
import { assign } from "@/utils";

export default defineAppConfig({
  //
  ADMIN_EMAIL: "admin@nikolav.rs",
  //
  KEY_APP_MOUNTED: "Zkcmk4BnXHU",
  KEY_APP_PROCESSING: "FlaelfhZddK",
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
      initial: () => "",
      authHeaders: (token: string, additional?: Record<string, any>) =>
        assign(
          {
            Authorization: `Bearer ${token}`,
          },
          additional || {}
        ),
    },
  },
  //
  io: {
    IOEVENT_DOCS_CHANGE: "change:docs",
    IOEVENT_STORAGE_CHANGE: "@storage:",
  },
});
