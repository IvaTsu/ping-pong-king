import { type IPageable } from "../../types";
import { type IGame } from "../types";

export interface IGamesByUserId {
  content: IGame[];
  pageable: IPageable;
}
