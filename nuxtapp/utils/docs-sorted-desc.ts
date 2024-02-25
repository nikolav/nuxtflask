import { type IDoc } from "@/types";

export const docsSortedDesc = <TData = any>(docs: IDoc<TData>[]) => {
  return [...docs].sort((docA, docB) => {
    return (
      new Date(String(docB.updated_at)).getTime() -
      new Date(String(docA.updated_at)).getTime()
    );
  });
};
