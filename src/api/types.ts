export interface ICreateMutationParams<T> {
  accessToken: string;
  body: T;
}

export interface IPageable {
  pageNumber: number;
  pageSize: number;
  numberOfElements: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}
