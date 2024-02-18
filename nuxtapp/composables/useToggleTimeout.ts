export const useToggleTimeout = (timeout = 1000, initial = false) => {
  const toggle = useToggleFlag(initial);
  watchEffect(() => {
    if (toggle.isActive.value) setTimeout(toggle.off, timeout);
  });
  return {
    on: toggle.on,
    isActive: toggle.isActive,
  };
};
