import { type IPageable } from "../../types";

export interface IPlayerListParams {
  page: number;
  size: number;
  minGamesPlayed?: number;
}

export interface IPlayerFindParams {
  name: string;
}

export interface IPlayer {
  id: string;
  name: string;
  email: string;
  profileImage: string;
  tournamentRef: {
    id: string;
    name: string;
  };
  rating: number;
  registeredWhen: string;
  gamesPlayed: number;
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
