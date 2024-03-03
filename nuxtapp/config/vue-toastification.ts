import type { PluginOptions } from "vue-toastification";
import { POSITION } from "vue-toastification";

export const options = <PluginOptions>{
  hideProgressBar: true,
  maxToasts: 20,
  newestOnTop: true,
  position: POSITION.TOP_RIGHT,
  shareAppContext: true,
  timeout: 5678,
  // transition: "Vue-Toastification__fade",
  transition: "Vue-Toastification__bounce",
};
