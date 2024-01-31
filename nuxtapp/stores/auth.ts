import { get } from "@/utils";
import type {
  OrNull,
  OrNoValue,
  TAuthUser,
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

// @useStoreApiAuth
export const useStoreApiAuth = defineStore("auth", () => {
  const token$ = ref("");
  const user$ = ref<TAuthUser>(null);

  // track api activity
  const error$ = ref<OrNull<any>>(null);
  const toggleProcessing = useToggleFlag();
  const processingStart = () => {
    error$.value = null;
    toggleProcessing.on();
  };

  const {
    stores: {
      auth: { KEY_ACCESS_TOKEN, initial: initialStorage, authHeaders },
    },
  } = useAppConfig();
  const tokenStorage$ = useLocalStorage(KEY_ACCESS_TOKEN, initialStorage);
  const authData = async (token: string) =>
    await $fetch<IAuthWhoResponse>(URL_API_who, {
      method: "GET",
      headers: authHeaders(token),
    });
  const localStorageAutoLogin = async () => {
    let data;
    const token = tokenStorage$.value;

    if (!token) return;

    processingStart();
    try {
      data = await authData(token);
    } catch (error) {
      error$.value = error;
    } finally {
      if (data) {
        token$.value = token;
        user$.value = <TAuthUser>data;
      }
    }
    toggleProcessing.off();
  };

  // apply auth token to Apollo client
  // ..if GraphQL API expects authentication to be passed via a HTTP header
  const {
    // https://apollo.nuxtjs.org/getting-started/auth-helpers#onlogin
    onLogin: onLoginApollo,
    // https://apollo.nuxtjs.org/getting-started/auth-helpers#onlogout-reference
    onLogout: onLogoutApollo,
  } = useApollo();

  // @token/change
  //   refresh auth data
  //   apply apollo auth
  //   persist locally
  watch(token$, async (token) => {
    let data;
    if (token) {
      toggleProcessing.on();
      try {
        data = await authData(token);
      } catch (error) {
        error$.value = error;
      } finally {
        if (data) {
          // cache auth data
          user$.value = <TAuthUser>data;
          // pass auth token to apollo
          // await onLoginApollo(token, undefined, true);
          await onLoginApollo(token);
        }
      }
    } else {
      user$.value = null;
    }
    // store token locally to enable auto login @mounted
    tokenStorage$.value = token;
    toggleProcessing.off();
  });

  // @app/loaded,
  // run auto login from session if any
  onMounted(localStorageAutoLogin);

  const authentication$ =
    (authEndpoint: string = URL_AUTH_login) =>
    async (credentials: IAuthCreds) => {
      let token: OrNoValue<string> = "";
      if (token$.value) return;
      processingStart();
      try {
        token = get(
          await $fetch<IAuthResponse>(authEndpoint, {
            method: "POST",
            body: credentials,
          }),
          "token"
        );
      } catch (error) {
        error$.value = error;
      } finally {
        if (token) {
          token$.value = token;
        }
      }
      toggleProcessing.off();
    };

  // @login
  const login = authentication$();

  // @register
  const register = authentication$(URL_AUTH_register);

  // @logout
  const logout = async () => {
    const token = token$.value;
    if (!token) return;

    processingStart();
    try {
      await $fetch<IAuthLogoutResponse>(URL_AUTH_logout, {
        method: "POST",
        headers: authHeaders(token),
        onResponse: async ({ response }) => {
          if (response.ok) {
            // logout success, token invalid
            token$.value = "";
            // signal logout to apollo
            // await onLogoutApollo(undefined, true);
            await onLogoutApollo();
          }
        },
      });
    } catch (error) {
      error$.value = error;
    }
    toggleProcessing.off();
  };

  return {
    token$,
    user$,
    error$,
    processing$: toggleProcessing.isActive,
    register,
    login,
    logout,
  };
});
