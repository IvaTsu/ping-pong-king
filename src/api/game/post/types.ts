import { type IPlayerRef, type IPlayerScore } from "../types";
import { type ILocationRef } from "./../types";

interface IPlayerRefId extends Omit<IPlayerRef, "name" | "rating"> {}

interface IPlayerScoreWOutAlternation
  extends Omit<IPlayerScore, "ratingAlteration" | "playerRef"> {
  playerRef: IPlayerRefId;
}

interface ILocationRefId extends Omit<ILocationRef, "name"> {}

export interface IPostGameBody {
  playerScoreA: IPlayerScoreWOutAlternation;
  playerScoreB: IPlayerScoreWOutAlternation;
  locationRef: ILocationRefId;
}
