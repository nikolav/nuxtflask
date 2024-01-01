declare module "@nuxt/schema" {
  interface NuxtConfig {
    tailwindcss?: {
      cssPath?: string | undefined;
      configPath?: string | undefined;
      exposeConfig?: boolean | undefined;
      config?: any;
      injectPosition?: number | undefined;
      viewer?: boolean | undefined;
    };
    colorMode?: {
      classSuffix?: string | undefined;
      preference?: string | undefined;
      fallback?: string | undefined;
      hid?: string | undefined;
      globalName?: string | undefined;
      componentName?: string | undefined;
      classPrefix?: string | undefined;
      storageKey?: string | undefined;
    };
  }
}

export {};
