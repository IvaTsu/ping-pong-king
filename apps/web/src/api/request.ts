import axios from "axios";

import { baseURL } from "./urls";

const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

let getAccessTokenSilently: (() => Promise<string>) | null = null;

export const setAuth0TokenGetter = (
  tokenGetter: () => Promise<string>,
): void => {
  getAccessTokenSilently = tokenGetter;
};

// Request interceptor to add auth token
axiosInstance.interceptors.request.use(
  async (config) => {
    console.log("Axios request interceptor:", {
      url: config.url,
      hasTokenGetter: !(getAccessTokenSilently == null),
    });

    if (getAccessTokenSilently != null) {
      try {
        const token = await getAccessTokenSilently();
        console.log(
          "Token retrieved for request:",
          typeof token === "string" ? token.substring(0, 50) + "..." : "null",
        );
        if (token != null) {
          config.headers.Authorization = `Bearer ${token}`;
          console.log("Authorization header set");
        }
      } catch (error) {
        console.error("Error getting access token:", error);
        // If we can't get a token, let the request continue without auth
        // The backend will return 401 if auth is required
      }
    } else {
      console.log(
        "No token getter available - request will continue without auth header",
      );
    }
    return config;
  },
  async (error) => {
    console.error("Request interceptor error:", error);
    return await Promise.reject(error);
  },
);

// Response interceptor to handle auth errors
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    if (error.response?.status === 401) {
      // Token might be expired or invalid
      // Auth0 React SDK handles token refresh automatically
      // You might want to trigger a re-login here if needed
      console.error("Authentication failed:", error.response.data);
    }
    return await Promise.reject(error);
  },
);

interface IGetRequestParams<P> {
  url: string;
  params?: P;
}

export async function getRequest<T, P>({
  url,
  params,
}: IGetRequestParams<P>): Promise<T> {
  const response = await axiosInstance(url, {
    method: "GET",
    params,
  });

  return response.data;
}

interface IPostRequestParams {
  url: string;
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
