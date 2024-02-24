export default defineNuxtPlugin((_nuxtapp) => {
  const { DARK, LIGHT, DEFAULT } = useAppConfig().theme;
  const theme$ = useState(useAppConfig().key.THEME, () => DEFAULT);
  const themeToggle = (mode?: string) => {
    theme$.value = mode || (DARK !== theme$.value ? DARK : LIGHT);
  };

  return {
    provide: {
      theme: {
        theme: theme$,
        themeToggle,
      },
    },
  };
});
