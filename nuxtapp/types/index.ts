export type OrNull<T = any> = T | null;
export type OrNoValue<T = any> = OrNull<T> | undefined;
export type TStoreMain<T = any> = Record<string, T>;
export type TStoreFlags = Record<string, boolean>;
export type TDocData = Record<string, any>;
export interface IDoc<T = TDocData> {
  id?: number | undefined;
  data: T;
}
export interface IDocDataUsers {
  email: string;
  password: string;
}

// @types/auth

export type TAuthUser = OrNull<{ id: number; email: string }>;

export interface IAuthCreds {
  email: string;
  password: string;
}

export interface IAuthResponse {
  token?: string | undefined;
}

export interface IAuthWhoResponse {
  id?: number | undefined;
  email?: string | undefined;
  error?: string | undefined;
}

export interface IAuthLogoutResponse {}

export interface IStorageFileInfo {
  id: number;
  file_id: string;
  title: string;
  description: string;
  filename: string;
  path: string;
  size: number;
  mimetype: string;
  public: boolean;
  created_at: string;
  updated_at: string;
}

export interface IFilesUpload {
  [name: string]: {
    file?: any | undefined;
    data: {
      title?: string | undefined;
      description?: string | undefined;
    };
  };
}

export interface IStorageFileDataSaved {
  file_id: string;
  user_id: number;
  title: string;
  description: string;
  filename: string;
  path: string;
  size: number;
  mimetype: string;
  public: boolean;
}

export interface IStorageStatusFileSaved {
  id: number;
  data: IStorageFileDataSaved;
  created_at: string;
  updated_at: string;
}

export interface IConfigDocs {
  autoReload: boolean;
}
