import { JWT_EXPIRED } from "@/constants/code";
import {
  ACCESS_TOKEN_HEADER,
  API_KEY_HEADER,
  REFRESH_TOKEN_HEADER,
  ROUTE_REFRESH_TOKEN,
  X_CLIENT_ID,
} from "@/constants/headers";
import { BASE_URL } from "@/constants/host";
import { authActions } from "@/features/auth";
import store from "@/stores/store";
import { ErrorResponse, LoginResponse, SuccessResponseProp } from "@/types/common";
import axios, { AxiosError } from "axios";

console.log("====================================");
console.log(`BASE_URL: ${BASE_URL}`);
console.log("====================================");

const instance = axios.create({
  baseURL: `${BASE_URL}/api/v1`,
  withCredentials: true,
});

let errorCount = 1;

instance.interceptors.request.use(
  (config) => {
    const { accessToken, apiKey, refreshToken, userId } = store.getState().auth;

    if (accessToken) {
      config.headers[ACCESS_TOKEN_HEADER] = accessToken;
    }

    if (apiKey) {
      config.headers[API_KEY_HEADER] = apiKey;
    }

    if (refreshToken) {
      config.headers[REFRESH_TOKEN_HEADER] = refreshToken;
    }

    if (userId) {
      config.headers[X_CLIENT_ID] = userId;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response.data,
  async (error: AxiosError<ErrorResponse>) => {
    const { config, response } = error;
    errorCount++;

    console.log(`error AxiosError`, error);

    if (response) {
      const { status, data } = response;

      console.log("====================================");
      console.log(`url`, config?.url);
      console.log("====================================");

      if (errorCount >= 3) {
        errorCount = 0;
        return Promise.reject(error);
      }

      if (status === 403 && config?.url === ROUTE_REFRESH_TOKEN) {
        console.log(`error axios config refreshToken`, JSON.stringify(data, null, 4));

        if (data && data?.message && data.message === "jwt expired") {
          store.dispatch(authActions.logout());
          return;
        }

        return Promise.reject(error);
      }

      if (status === 401 && data) {
        const { code, message } = data;

        if (message === "jwt expired" || code === JWT_EXPIRED) {
          const { accessToken, apiKey, refreshToken, userId } = store.getState().auth;

          try {
            const {
              metadata: { tokens, user },
            }: SuccessResponseProp<LoginResponse> = await instance.post("/Customers/RefreshToken", {
              Headers: {
                [X_CLIENT_ID]: userId,
                [REFRESH_TOKEN_HEADER]: refreshToken,
              },
            });

            store.dispatch(authActions.setAccessToken(tokens.accessToken));
            store.dispatch(authActions.setRefreshToken(tokens.refreshToken));

            instance.defaults.headers.common[ACCESS_TOKEN_HEADER] = tokens.accessToken;
            instance.defaults.headers.common[REFRESH_TOKEN_HEADER] = tokens.refreshToken;

            return instance(config!);
          } catch (error) {
          } finally {
            errorCount = 0;
          }
        }
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
