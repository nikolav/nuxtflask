export type OrNull<T = any> = T | null;
export type TStoreMain<T = any> = Record<string, T>;
export type TStoreFlags = Record<string, boolean>;
export interface IDoc<TDocData = Record<string, any>> {
  id?: number | undefined;
  data: TDocData;
}
export interface IDocDataUsers {
  email: string;
  password: string;
}
