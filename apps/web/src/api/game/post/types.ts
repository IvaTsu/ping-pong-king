import { type IPlayerScore } from "../types";

interface IPlayerRefId {
  id: string;
}

interface IPlayerScoreWOutAlternation
  extends Omit<IPlayerScore, "ratingAlteration" | "playerRef"> {
  playerRef: IPlayerRefId;
}

export interface IPostGameBody {
  playerScoreA: IPlayerScoreWOutAlternation;
  playerScoreB: IPlayerScoreWOutAlternation;
}
