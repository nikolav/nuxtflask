import { False } from "@/utils";
export const useAppMounted = () => {
  const { KEY_APP_MOUNTED } = useAppConfig();
  return useState(KEY_APP_MOUNTED, False);
};
