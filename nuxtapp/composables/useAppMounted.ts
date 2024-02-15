import { False } from "@/utils/fn-false";
export const useAppMounted = () => {
  const { APP_MOUNTED } = useAppConfig().key;
  return useState(APP_MOUNTED, False);
};
