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
      if (data?.email) {
        token$.value = token;
        user$.value = <TAuthUser>data;
      }
    }
    toggleProcessing.off();
  };
  // @token/change
  watch(token$, async (token) => {
    let data;
    if (token) {
      toggleProcessing.on();
      try {
        data = await authData(token);
      } catch (error) {
        error$.value = error;
      } finally {
        if (data?.email) {
          user$.value = <TAuthUser>data;
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
        onResponse: ({ response }) => {
          if (response.ok) {
            token$.value = "";
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
