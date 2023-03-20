interface IGetRequestParams {
  accessToken: string;
  url: string;
}

export async function getRequest<T>({
  accessToken,
  url,
}: IGetRequestParams): Promise<T> {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
}

interface IPostRequestParams extends IGetRequestParams {
  body: object;
}

export async function postRequest<T>({
  accessToken,
  body,
  url,
}: IPostRequestParams): Promise<T> {
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(body),
  });
  return await response.json();
}
