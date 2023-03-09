export const baseURL: string = import.meta.env.VITE_API_URL ?? "";

export interface IPlayerListParams {
  page: number;
  size: number;
}

export const playersList = ({ page, size }: IPlayerListParams): string =>
  `${baseURL}/player/list?page=${page}&size=${size}`;

export interface IPlayerFindParams {
  name: string;
  tournamentId?: string;
}

export const playerFind = ({
  name,
  tournamentId,
}: IPlayerFindParams): string => {
  return tournamentId != null
    ? `${baseURL}/player/find?name=${name}&tournamentId=${tournamentId}`
    : `${baseURL}/player/find?name=${name}`;
};

export const tournamentList = (): string => `${baseURL}/tournament/list`;

export const playerCreate = (): string => `${baseURL}/player/create`;
