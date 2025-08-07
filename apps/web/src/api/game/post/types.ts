import { type IPlayerRef, type IPlayerScore } from "../types";

interface IPlayerRefId extends Omit<IPlayerRef, "name" | "rating"> {}

interface IPlayerScoreWOutAlternation
  extends Omit<IPlayerScore, "ratingAlteration" | "playerRef"> {
  playerRef: IPlayerRefId;
}

export interface IPostGameBody {
  playerScoreA: IPlayerScoreWOutAlternation;
  playerScoreB: IPlayerScoreWOutAlternation;
}
