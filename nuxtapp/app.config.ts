import { type TStoreMain } from "@/types";
import { type TStoreFlags } from "@/types";
export default defineAppConfig({
  //
  ADMIN_EMAIL: "admin@nikolav.rs",
  //
  KEY_APP_MOUNTED: "Zkcmk4BnXHU",
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
  },
  //
  io: {
    IOEVENT_DOCS_CHANGE: "change:docs",
  },
});
