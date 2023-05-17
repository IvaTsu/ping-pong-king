import axios from "axios";

import { type IAuth } from "../store";
import { oauthToken } from "./auth/post/urls";
import { baseURL } from "./urls";

const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

interface IAuthStorage {
  state: { auth: IAuth };
}

interface IRefreshTokenResponse {
  access_token: string;
  refresh_token: string;
  id_token: string;
  scope: string;
  expires_in: number;
  token_type: string;
}

axiosInstance.interceptors.request.use(
  (config) => {
    const value = localStorage.getItem("auth-storage");
    if (value != null) {
      const keys: IAuthStorage = JSON.parse(value);
      if (keys?.state?.auth?.accessToken != null) {
        config.headers.Authorization = `Bearer ${keys.state.auth.accessToken}`;
      }
    }
    return config;
  },
  (error) => {
    Promise.reject(error).finally(() => {});
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      !(originalRequest?._retry as boolean)
    ) {
      originalRequest._retry = true;
      const value = localStorage.getItem("auth-storage");
      if (value != null) {
        const keys: IAuthStorage = JSON.parse(value);
        if (
          keys?.state?.auth?.accessToken != null &&
          keys?.state?.auth?.refreshToken != null
        ) {
          const refreshTokenOptions = {
            method: "POST",
            url: oauthToken,
            headers: { "content-type": "application/x-www-form-urlencoded" },
            data: new URLSearchParams({
              grant_type: "refresh_token",
              client_id: import.meta.env.VITE_AUTH0_CLIENT_ID,
              refresh_token: keys?.state?.auth?.refreshToken,
            }),
          };
          try {
            const response = await axiosInstance.request(refreshTokenOptions);
            const authData: IRefreshTokenResponse = response.data;

            if (
              authData?.access_token != null &&
              authData?.refresh_token != null &&
              authData?.id_token != null
            ) {
              const authState = {
                state: {
                  auth: {
                    accessToken: authData?.access_token,
                    refreshToken: authData?.refresh_token,
                    idToken: authData?.id_token,
                  },
                },
                version: 0,
              };
              localStorage.setItem("auth-storage", JSON.stringify(authState));
              axios.defaults.headers.common.Authorization = `Bearer ${authData?.access_token}`;
            }
          } catch (error) {
            localStorage.removeItem("auth-storage");
          }
        }
      }

      return await axiosInstance(originalRequest);
    }
    return await Promise.reject(error);
  }
);

interface IGetRequestParams {
  url: string;
}

export async function getRequest<T>({ url }: IGetRequestParams): Promise<T> {
  const response = await axiosInstance(url, {
    method: "GET",
  });

  return response.data;
}

interface IPostRequestParams extends IGetRequestParams {
  body: object;
}

export async function postRequest<T>({
  body,
  url,
}: IPostRequestParams): Promise<T> {
  const response = await axiosInstance(url, {
    method: "POST",
    data: JSON.stringify(body),
  });
  return response.data;
}
