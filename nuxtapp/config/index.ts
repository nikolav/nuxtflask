export const PRODUCTION$ = false;
// export const PRODUCTION$ = true;

export const BASE_DIR__DEVELOPMENT = "/";
export const BASE_DIR__PRODUCTION = "/app/122--nuxtapp/";

export const BASE_DIR = PRODUCTION$
  ? BASE_DIR__PRODUCTION
  : BASE_DIR__DEVELOPMENT;
