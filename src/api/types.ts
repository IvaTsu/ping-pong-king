export interface ICreateMutationParams<T> {
  accessToken: string;
  body: T;
}

export interface IGetGamesMutationParams {
  accessToken: string;
  id: string
}
