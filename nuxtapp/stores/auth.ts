import { get } from "@/utils";
import type {
  OrNoValue,
  IAuthCreds,
  IAuthResponse,
  IAuthWhoResponse,
  IAuthLogoutResponse,
} from "@/types";
import {
  URL_AUTH_login,
  URL_AUTH_register,
  URL_AUTH_logout,
  URL_API_who,
} from "@/config";
import {
  schemaAuthCredentials,
  schemaAuthData,
  schemaAuthDataAdmin,
  schemaJwt,
} from "@/schemas";

export const useStoreApiAuth = defineStore("auth", () => {
  const {
    KEY_ACCESS_TOKEN,
    KEY_USEFETCH_AUTHDATA,
    initial: initialStorage,
    authHeaders,
  } = useAppConfig().stores.auth;
  const token$ = useLocalStorage(KEY_ACCESS_TOKEN, initialStorage, {
    initOnMounted: true,
  });
  const headers$ = computed(() => authHeaders(token$.value));
  const { data: user$, refresh: authDataReload } = useFetch<
    OrNoValue<IAuthWhoResponse>
  >(URL_API_who, {
    key: KEY_USEFETCH_AUTHDATA,
    method: "GET",
    headers: headers$,
    lazy: true,
    default: () => null,
    transform: (responseAuth) => {
      try {
        return schemaAuthData.parse(responseAuth);
      } catch (error) {
        // pass
      }
      return null;
    },
  });

  // handle auth:enabled flag manually
  // const enabled$ = ref(true);

  const initialized$ = ref(false);
  onMounted(async () => {
    await authDataReload();
    initialized$.value = true;
  });

  // `logged in` .flag
  const isAuth$ = computed(() => {
    try {
      return true === schemaAuthData.safeParse(user$.value).success;
    } catch (error_) {
      // pass
    }
    return false;
  });

  // `admin logged in` .flag
  const isAdmin$ = computed(() => {
    try {
      return true === schemaAuthDataAdmin.safeParse(user$.value).success;
    } catch (error_) {
      // pass
    }
    return false;
  });

  // apply auth token to Apollo client
  // ..if GraphQL API expects authentication to be passed via a HTTP header
  const {
    // https://apollo.nuxtjs.org/getting-started/auth-helpers#onlogin
    onLogin: onLoginApollo,
    // https://apollo.nuxtjs.org/getting-started/auth-helpers#onlogout-reference
    onLogout: onLogoutApollo,
  } = useApollo();

  // sync apollo:auth
  watch(isAuth$, async (isAuth) => {
    if (isAuth) {
      await onLoginApollo(token$.value);
    } else {
      // signal logout to apollo
      // await onLogoutApollo(undefined, true);
      await onLogoutApollo();
    }
  });

  // track api activity
  const status = useProcessMonitor();

  const authentication$ =
    (authEndpoint: string = URL_AUTH_login) =>
    async (credentials: IAuthCreds) => {
      if (isAuth$.value) return;
      let token: OrNoValue<string> = "";
      status.begin();
      try {
        token = get(
          await $fetch<IAuthResponse>(authEndpoint, {
            method: "POST",
            body: schemaAuthCredentials.parse(credentials),
          }),
          "token"
        );
      } catch (error) {
        status.setError(error);
      } finally {
        if (true === schemaJwt.safeParse(token).success) {
          token$.value = token;
          status.successful();
        }
      }
      status.done();
    };
  // @register
  const register = authentication$(URL_AUTH_register);
  // @login
  const login = authentication$();
  // @logout
  const logout = async () => {
    if (!isAuth$.value) return;
    status.begin();
    try {
      await $fetch<IAuthLogoutResponse>(URL_AUTH_logout, {
        method: "POST",
        headers: authHeaders(token$.value),
        onResponse: async ({ response }) => {
          if (response.ok) {
            // logout success, token invalid
            token$.value = "";
            status.successful();
          }
        },
      });
    } catch (error) {
      status.setError(error);
    }
    status.done();
  };

  const callack$ = ref();
  watchEffect(() => {
    const callack = callack$.value;
    if (callack) callack(isAuth$.value, isAdmin$.value);
  });
  const onAuthStatusChange = (
    callack: (isAuth: boolean, isAdmin: boolean) => void
  ) => {
    callack$.value = callack;
  };

  // #api
  return {
    // @auth/data
    token$,
    user$,
    isAuth$,
    isAdmin$,
    onAuthStatusChange,
    initialized$,
    // enabled$,

    // @auth/crud
    register,
    login,
    logout,
    authDataReload,

    // @api/flags
    processing: status.processing,
    error: status.error,
    success: status.success,
  };
});
