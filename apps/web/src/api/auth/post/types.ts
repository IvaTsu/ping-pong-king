export interface ICreateAuthMutationParams {
  body: URLSearchParams;
}

export interface ICreateToken {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  id_token: string;
  scope: string;
  token_type: "Bearer";
}
