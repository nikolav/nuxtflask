export type OrNull<T = any> = T | null;
export type OrNoValue<T = any> = OrNull<T> | undefined;
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

// @types/auth

export type TAuthUser = OrNull<{ email: string }>;

export interface IAuthCreds {
  email: string;
  password: string;
}

export interface IAuthResponse {
  token?: string | undefined;
}

export interface IAuthWhoResponse {
  email?: string | undefined;
}

export interface IAuthLogoutResponse {}
