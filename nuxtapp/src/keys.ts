import type { InjectionKey } from "vue";
import type { IAppData } from "@/types";

export const APP_DATA = <InjectionKey<IAppData>>Symbol();
