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
  return assign(toggle, { on, off, isActive: isActive$ });
};
