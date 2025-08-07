import { type IPageable } from "../../types";

export interface IPlayerListParams {
  page: number;
  size: number;
  minGamesPlayed?: number;
  locationId?: string;
}

export interface IPlayerFindParams {
  name: string;
  locationId?: string;
}

export interface IPlayer {
  id: string;
  name: string;
  email: string;
  profileImage: string;
  locationRef: {
    id: string;
    name: string;
  };
  rating: number;
  registeredWhen: string;
  gamesPlayed: number;
  gamesWon: number;
  winRate: number;
}

export interface IPlayerList {
  content: IPlayer[];
  pageable: IPageable;
}

export interface IPlayerRating {
  opponentName: string;
  gameScore: string;
  userWon: boolean;
}
