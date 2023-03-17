interface IPostRequestAuthParams<T> {
  body: T;
  url: string;
}

export async function postRequestAuth<T>({
  body,
  url,
}: IPostRequestAuthParams<URLSearchParams>): Promise<T> {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    method: "POST",
    body,
  });
  return await response.json();
}
