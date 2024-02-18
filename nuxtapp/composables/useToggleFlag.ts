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
  const timeout_ = ref();
  const delayCancel = () => {
    clearTimeout(timeout_.value);
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
      cancel: delayCancel,
    },
  });
};
