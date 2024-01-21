import { BASE_DIR } from "./config";
import { stripSlashesEnd } from "./utils";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  // # client-side output
  // # use .generate command to produce html in .output/public
  // # specify routes for nitro to prerender @nitro.prerender.routes<path[]>

  // #universal rendering
  // ssr: true,

  // #client-side only rendering; no prerender
  // ssr: false,
  //
  modules: [
    "@vueuse/nuxt",
    "@pinia/nuxt",
    // #https://color-mode.nuxtjs.org/
    "@nuxtjs/color-mode",
    "@nuxtjs/tailwindcss",
    // #https://google-fonts.nuxtjs.org/
    "@nuxtjs/google-fonts",
  ],
  runtimeConfig: {
    // The private keys which are only available server-side
    // apiSecret: '123',
    // Keys within public are also exposed client-side
    public: {
      // apiBase: '/api'
    },
  },
  imports: {
    // #disable auto-imports; use explicit imports from #imports
    // autoImport: false
    //
    // #enable the auto-import of the `useI18n` composable from the `vue-i18n` package
    // presets: [
    //   {
    //     from: "vue-i18n",
    //     imports: ["useI18n"],
    //   },
    // ],
  },
  // #https://nuxt.com/docs/guide/concepts/rendering#:~:text=defineNuxtConfig(%7B-,routeRules,-%3A%20%7B
  // routeRules: {},
  app: {
    //
    // #run app from public subfolder `/app/122--nuxtapp/`
    baseURL: BASE_DIR,
    buildAssetsDir: `${stripSlashesEnd(BASE_DIR)}/_nuxt/`,
    //
    head: {
      charset: "utf-8",
      viewport:
        "width=device-width, initial-scale=1.0, shrink-to-fit=no, minimum-scale=1",
      title: "nuxtapp.nikolav.rs",
      // https://www.geeksforgeeks.org/meta-tags-in-nuxt-js/
      meta: [
        { name: "description", content: "NuxtApp" },
        { name: "theme-color", content: "#fafafa" },
      ],
      link: [
        {
          rel: "icon",
          type: "image/x-icon",
          href: "/favicon.ico",
        },
        // {
        //   rel: "preconnect",
        //   href: "https://fonts.googleapis.com",
        // },
        // {
        //   rel: "stylesheet",
        //   href: "https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600;1,700&display=swap",
        // },
        // {
        //   rel: "stylesheet",
        //   href: "https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap",
        // },
      ],
      noscript: [
        // <noscript>JavaScript is required</noscript>
        { children: "JavaScript is required" },
      ],
    },
    // transition pages
    pageTransition: { name: "BLUR", mode: "out-in" },
    // transition layouts
    layoutTransition: { name: "BLUR", mode: "out-in" },
  },
  css: [
    // default
    "~/assets/styles/main.scss",
    
    // ui styles
    // @todo/vuetify,

    // plugin styles
    "@fancyapps/ui/dist/fancybox/fancybox.css",
  ],
  //
  // #hybrid-rendering
  // #https://nuxt.com/docs/getting-started/server#hybrid-rendering
  // routeRules: {
  //   // Generated at build time for SEO purpose
  //   "/": { prerender: true },
  //   // Cached for 1 hour
  //   "/api/*": { cache: { maxAge: 60 * 60 } },
  //   // Redirection to avoid 404
  //   "/old-page": {
  //     redirect: { to: "/new-page", statusCode: 302 },
  //   },
  //   // ...
  // },
  //
  // #Selective Pre-rendering @nitro
  // nitro: {
  //   prerender: {
  //     routes: ["/user/1", "/user/2"],
  //     ignore: ["/dynamic"],
  //   },
  // },
  //
  // @tw
  tailwindcss: {
    cssPath: "~/assets/tailwind.css",
    configPath: "~/config/tailwind.config.ts",
    //
    // # Import fully resolved config
    // # import tailwindConfig from '#tailwind-config'
    exposeConfig: true,
    // config: {},
    // injectPosition: 0,
    viewer: false,
  },
  colorMode: {
    // preference: "system", // default value of $colorMode.preference
    // fallback: "light", // fallback value if not system preference found
    // hid: "nuxt-color-mode-script",
    // globalName: "__NUXT_COLOR_MODE__",
    // componentName: "ColorScheme",
    // classPrefix: "",
    classSuffix: "",
    // storageKey: "nuxt-color-mode",
  },
  // #https://google-fonts.nuxtjs.org
  googleFonts: {
    families: {
      "Roboto+Mono": true,
      "Open+Sans": true,
    },
    useStylesheet: true,
    download: false,
  },
});
