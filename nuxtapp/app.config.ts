import { type TStoreMain } from "@/types";
export default defineAppConfig({
  //
  KEY_APP_MOUNTED: "Zkcmk4BnXHU",
  stores: {
    main: {
      initial: <TStoreMain>{
        "app:name": "nikolav.rs",
      },
    },
  },
});
