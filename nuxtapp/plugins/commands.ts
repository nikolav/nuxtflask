
import { timeLog } from "@/commands";

export default defineNuxtPlugin((_nuxtApp) => {
  return {
    provide: {
      command: {
        timeLog
      }
    }
  }
});
