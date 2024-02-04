// .useDocs
export const useDocs = (tagInitial = "") => {
  const topic$ = ref(tagInitial);
  const auth = useStoreApiAuth();
  const enabled$ = computed(
    () => topic$.value && auth?.token$ && useAppMounted().value
  );
  return {
    topic$,
  };
};
