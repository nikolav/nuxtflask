import { assign } from "@/utils";
//
export const useToggleFlag = (initial = false) => {
  const isActive$ = ref(initial);
  const toggle = () => {
    isActive$.value = !isActive$.value;
  };
  const on = () => {
    isActive$.value = true;
  };
  const off = () => {
    isActive$.value = false;
  };
  // @delayed
  const timeout_ = ref<ReturnType<typeof setTimeout>>();
  const delayCancel = () => clearTimeout(timeout_.value);
  const delayToggle = (msTimeout = 1000) => {
    delayCancel();
    timeout_.value = setTimeout(toggle, msTimeout);
  };
  const delayOn = (msTimeout = 1000) => {
    delayCancel();
    timeout_.value = setTimeout(on, msTimeout);
  };
  const delayOff = (msTimeout = 1000) => {
    delayCancel();
    timeout_.value = setTimeout(off, msTimeout);
  };
  // @api
  return assign(toggle, {
    isActive: isActive$,
    on,
    off,
    delay: {
      on: delayOn,
      off: delayOff,
      toggle: delayToggle,
      cancel: delayCancel,
    },
  });
};
