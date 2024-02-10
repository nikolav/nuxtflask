export default defineNuxtPlugin((_nuxtapp) => {
  const { DARK, LIGHT } = useAppConfig().theme;
  const theme$ = useState(useAppConfig().key.THEME, () => DARK);
  const themeToggle = (mode?: string) => {
    theme$.value = mode || (DARK !== theme$.value ? DARK : LIGHT);
  };

  return {
    provide: {
      theme: {
        theme: theme$,
        themeToggle,
      }
    }
  };

});
