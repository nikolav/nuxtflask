export const useProcessMonitor = () => {
  const toggleProcessing = useToggleFlag();
  const error$ = ref<any>(null);
  const success$ = ref(false);
  const begin = () => {
    error$.value = null;
    success$.value = false;
    toggleProcessing.on();
  };
  const setError = (err: any) => {
    error$.value = err;
  };
  const done = toggleProcessing.off;
  const successful = () => {
    success$.value = true;
  };
  //
  return {
    processing: toggleProcessing.isActive,
    error: error$,
    success: success$,
    begin,
    done,
    setError,
    successful,
  };
};
