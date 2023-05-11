import axios from "axios";

import { baseURL } from "./urls";

const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

interface IGetRequestParams {
  accessToken: string;
  url: string;
}

export async function getRequest<T>({
  accessToken,
  url,
}: IGetRequestParams): Promise<T> {
  const response = await axiosInstance(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
}

interface IPostRequestParams extends IGetRequestParams {
  body: object;
}

export async function postRequest<T>({
  accessToken,
  body,
  url,
}: IPostRequestParams): Promise<T> {
  const response = await axiosInstance(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    method: "POST",
    data: JSON.stringify(body),
  });
  return response.data;
}
