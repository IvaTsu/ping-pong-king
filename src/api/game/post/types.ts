import { type IPlayer } from "../../player/get/types";
import { type IPlayerScore } from "../types";
import { type ITournamentRef } from "./../types";

interface IPlayerRefId extends Omit<IPlayer, "name" | "rating"> {}

interface IPlayerScoreWOutAlternation
  extends Omit<IPlayerScore, "ratingAlteration" | "playerRef"> {
  playerRef: IPlayerRefId;
}

interface ITournamentRefId extends Omit<ITournamentRef, "name"> {}

export interface IPostGameBody {
  playerScoreA: IPlayerScoreWOutAlternation;
  playerScoreB: IPlayerScoreWOutAlternation;
  tournamentRef: ITournamentRefId;
}
