import { type IPageable } from "../../types";
import { type IGame } from "../types";

export interface IGamesByUserIdParams {
  id: string;
  page: number;
  size: number;
}

export interface IGamesByUserId {
  content: IGame[];
  pageable: IPageable;
}
