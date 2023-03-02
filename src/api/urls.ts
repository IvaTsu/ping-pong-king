export const baseURL: string = import.meta.env.VITE_API_URL ?? "";

export interface IPlayerListParams {
  page: number;
  size: number;
}

export const playersList = ({ page, size }: IPlayerListParams): string =>
  `${baseURL}/player/list?page=${page}&size=${size}`;
