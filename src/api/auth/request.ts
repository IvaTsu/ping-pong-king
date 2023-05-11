import axios from "axios";

interface IPostRequestAuthParams<T> {
  body: T;
  url: string;
}

export async function postRequestAuth<T>({
  body,
  url,
}: IPostRequestAuthParams<URLSearchParams>): Promise<T> {
  const response = await axios(url, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    method: "POST",
    data: body,
  });
  return response.data;
}
