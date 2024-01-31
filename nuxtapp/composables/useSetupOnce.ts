type IConfigureOnceSetup<T = any> = {
  (...args: T[]): void;
};

export const useSetupOnce = (setup: IConfigureOnceSetup) => {
  const toggleConfigured = useToggleFlag();
  const runSetup = <T = any>(...args: T[]) => {
    if (false !== toggleConfigured.isActive.value) return;
    toggleConfigured.on();
    setup(...args);
  };

  return {
    configured: toggleConfigured.isActive,
    runSetup,
  };
};
