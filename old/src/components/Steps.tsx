import { type IPlayer } from "../api/player/get/types";

export const Steps = ({
  currentOpponent,
  isSuccess,
}: {
  currentOpponent: IPlayer | undefined;
  isSuccess: boolean;
}): JSX.Element => {
  const lastStepStyle =
    currentOpponent !== null && isSuccess ? "step-success" : "step-warning";
  return (
    <div className="inset-x-0 bottom-20 p-10">
      <ul className="steps lg:steps-horizontal">
        <li
          className={`step ${
            currentOpponent != null ? "step-success" : "step-warning"
          }`}
        >
          Opponent
        </li>
        <li className={`step ${lastStepStyle}`}>Game Results</li>
      </ul>
    </div>
  );
};
