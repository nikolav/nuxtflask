import type { Config } from "tailwindcss";
// import plugin from "tailwindcss/plugin";
import tailwindcssTypography from "@tailwindcss/typography";
import tailwindcssAspectRatio from "@tailwindcss/aspect-ratio";
// import defaultTheme from "tailwindcss/defaultTheme";

// # full config
// # https://github.com/tailwindlabs/tailwindcss/blob/master/stubs/config.full.js
export default <Partial<Config>>{
  content: [
    "../components/**/*.{vue,js,ts}",
    "../pages/**/*.vue",
    "../layouts/**/*.vue",
    "../plugins/**/*.{js,ts}",
    "../composables/**/*.{js,ts}",
    "../utils/**/*.{js,ts}",
    "../app.{js,ts,vue}",
    "../App.{js,ts,vue}",
    "../error.{js,ts,vue}",
    "../Error.{js,ts,vue}",
    "../static/**/*.html",
    "../content/**/*.md",
    "../docs/**/*.html",
    "../app/**/*.html",
    "../nuxt.config.{js,ts}",
    "../app.config.{js,ts}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      // #https://tailwindcss.com/docs/customizing-colors
      colors: {
        // primary: "colors.indigo",
        // secondary: "colors.yellow",
        // neutral: "colors.gray",
        current: "currentColor",
        transparent: "transparent",
      },
      // fontFamily: {
      //   sans: ["Poppins", "sans-serif"],
      // },
      screens: {
        // 'sm': '640px',
        // 'md': '768px',
        // lg: "1024px",
        // 'xl': '1280px',
        // '2xl': '1536px',
        tablet: "640px",
        laptop: "1024px",
        desktop: "1280px",
        tall: { raw: "(min-height: 802px)" },
      },
    },
  },
  // 
  corePlugins: {
    // #disable the aspectRatio core plugin to avoid conflicts with the native aspect-ratio utilities
    aspectRatio: false,
  },
  // generate classes
  safelist: [
    // "safelisted",
    // {
    //   pattern: /bg-(red|green|blue)-(100|200|300)/,
    // },
  ],
  // discard classes
  blocklist: [],
  plugins: [
    //   require("@tailwindcss/typography"),
    tailwindcssTypography,
    // require("@tailwindcss/aspect-ratio"),
    // @https://github.com/tailwindlabs/tailwindcss-aspect-ratio?tab=readme-ov-file#usage
    tailwindcssAspectRatio,
    // require("@tailwindcss/line-clamp"),
    // require("@tailwindcss/forms"),
  ],
  // presets: [],
};
