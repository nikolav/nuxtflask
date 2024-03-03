import vitePluginVuetify, { transformAssetUrls } from "vite-plugin-vuetify";

import { ENDPOINT_GRAPHQL, API_URL } from "./config";
import { stripSlashesEnd } from "./utils/strip-slashes-end";

type TMeta = Record<string, string>[];

const BASE_DIR = process.env.BASE_DIR;
const meta: TMeta = [
  { name: "description", content: "NuxtApp" },
  { name: "theme-color", content: "#fafafa" },
];

// --force-https-if-heroku
// <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
if (/herokuapp\.com/.test(API_URL))
  meta.push({
    "http-equiv": "Content-Security-Policy",
    content: "upgrade-insecure-requests",
  });

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  // # client-side output
  // # use .generate command to produce html in .output/public
  // # specify routes for nitro to prerender @nitro.prerender.routes<path[]>

  // # universal rendering
  //   ssr: true,
  // # client-side only rendering; no prerender
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
    // https://apollo.nuxtjs.org/getting-started/quick-start
    "@nuxtjs/apollo",
    // https://image.nuxt.com/
    "@nuxt/image",
    // https://vuetifyjs.com/en/getting-started/installation/#using-nuxt-3
    (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        // --at-ts-expect-error
        // config.plugins.push(vitePluginVuetify({ autoImport: true }));
        try {
          config.plugins &&
            config.plugins.push(
              vitePluginVuetify({
                autoImport: true,
                styles: {
                  configFile: "assets/styles/vuetify/settings.scss",
                },
              })
            );
        } catch (error) {
          // ignore
        }
      });
    },
  ],
  build: {
    transpile: ["vuetify"],
  },

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
    baseURL: BASE_DIR,
    buildAssetsDir: `${stripSlashesEnd(BASE_DIR)}/_nuxt/`,
    //
    head: {
      charset: "utf-8",
      viewport:
        "width=device-width, initial-scale=1.0, shrink-to-fit=no, minimum-scale=1",
      title: "nuxtflaskapp.nikolav.rs",
      // https://www.geeksforgeeks.org/meta-tags-in-nuxt-js/
      meta,
      //
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
      bodyAttrs: {
        class: "dark:selection:bg-white/20 scrollbar-thin-light",
      },
      noscript: [
        // <noscript>JavaScript is required</noscript>
        { children: "JavaScript is required" },
      ],
    },
    // transition pages
    pageTransition: { name: "BLUR", mode: "in-out" },
    // transition layouts
    layoutTransition: { name: "BLUR", mode: "in-out" },
  },
  css: [
    // default
    "~/assets/styles/main.scss",
    "animate.css",

    // vuetify
    "@mdi/font/css/materialdesignicons.css",
    "vuetify/lib/styles/main.sass",

    // plugin styles
    "@fancyapps/ui/dist/fancybox/fancybox.css",
    // https://github.com/surmon-china/videojs-player
    "video.js/dist/video-js.css",
    // https://github.com/Maronato/vue-toastification?tab=readme-ov-file#usage
    // "vue-toastification/dist/index.css",
    "~/assets/styles/toast.scss",
  ],

  // https://vuetifyjs.com/en/getting-started/installation/#using-nuxt-3
  vite: {
    define: {
      "process.env.DEBUG": false,
    },
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },

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
      "Open+Sans": true,
      "Roboto+Mono": true,
    },
    useStylesheet: true,
    download: false,
  },

  // https://image.nuxt.com/get-started/configuration
  image: {
    // quality: 92,
    // inject: true,
    // format: ["webp"],
    // domains: ["nuxtjs.org"],
    //
    // The screen sizes predefined by `@nuxt/image`:
    // screens: {
    //   xs: 320,
    //   sm: 640,
    //   md: 768,
    //   lg: 1024,
    //   xl: 1280,
    //   xxl: 1536,
    //   "2xl": 1536,
    // },
  },

  // https://apollo.nuxtjs.org/getting-started/configuration#configuration
  // https://apollo.nuxtjs.org/getting-started/configuration#clients
  apollo: {
    autoImports: true,
    authType: "Bearer",
    authHeader: "Authorization",
    tokenStorage: "cookie",
    proxyCookies: true,
    clients: {
      default: {
        httpEndpoint: ENDPOINT_GRAPHQL,
        httpLinkOptions: {
          // Enable sending cookies over cross-origin requests
          credentials: "include",
        },
        tokenName: "@apollo/token:McW3G38G4ic",
      },
    },
  },
});
