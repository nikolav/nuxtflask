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
import { schemaAuthData, schemaAuthCredentials } from "@/schemas";

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
    watch: [token$],
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

  onMounted(authDataReload);

  // track api activity
  const status = useProcessMonitor();

  // apply auth token to Apollo client
  // ..if GraphQL API expects authentication to be passed via a HTTP header
  const {
    // https://apollo.nuxtjs.org/getting-started/auth-helpers#onlogin
    onLogin: onLoginApollo,
    // https://apollo.nuxtjs.org/getting-started/auth-helpers#onlogout-reference
    onLogout: onLogoutApollo,
  } = useApollo();

  // sync apollo:auth
  watch(user$, async (user) => {
    if (user) {
      await onLoginApollo(token$.value);
    } else {
      // signal logout to apollo
      // await onLogoutApollo(undefined, true);
      await onLogoutApollo();
    }
  });

  const authentication$ =
    (authEndpoint: string = URL_AUTH_login) =>
    async (credentials: IAuthCreds) => {
      if (user$.value) return;
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
        if (token) {
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
    if (!user$.value) return;
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

  // flag `logged in`
  const isAuth$ = computed(() => null != get(user$.value, "id"));

  // #api
  return {
    // @auth/data
    token$,
    user$,
    isAuth$,

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
