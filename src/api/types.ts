export interface ICreateMutationParams<T> {
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
