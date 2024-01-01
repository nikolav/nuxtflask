import type { Config } from "tailwindcss";
// import defaultTheme from "tailwindcss/defaultTheme";

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
      // colors: {
      //   primary: "#4682b3"
      // },
      // fontFamily: {
      //   sans: ["Poppins", "sans-serif"],
      // },
      screens: {
        // 'sm': '640px',
        // 'md': '768px',
        // lg: "968px",
        // 'xl': '1280px',
        // '2xl': '1536px',
        tall: { raw: "(min-height: 792px)" },
      },
    },
  },
  safelist: [
    // "safelisted",
    // {
    //   pattern: /bg-(red|green|blue)-(100|200|300)/,
    // },
  ],
  // plugins: [
  //   require("@tailwindcss/typography"),
  //   require("@tailwindcss/forms"),
  //   require("@tailwindcss/aspect-ratio"),
  //   require("@tailwindcss/line-clamp"),
  // ],
};
