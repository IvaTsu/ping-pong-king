import { type IPlayer } from "../api/player/get/types";
import { ChooseOpponentsDropdown } from "./ChooseOpponentDropdown";

export const ScoreInput = ({
  user,
  setUserScore,
  value,
  isInvalid,
  playersList,
}: {
  user: IPlayer | null;
  setUserScore: (value: number | "") => void;
  value: number | "";
  isInvalid: boolean;
  playersList?: IPlayer[];
}): JSX.Element => {
  const _onUserScoreChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.value === "") setUserScore("");
    else setUserScore(Number.parseInt(e.target.value, 10));
  };
  const borderColor = isInvalid ? "border-rose" : " ";
  // const userName = user != null ? `${user?.name}'s Score` : "Your Score";
  return (
    <div>
      <label className="label">
        <span className="label-text relative">
          {user != null ? (
            <ChooseOpponentsDropdown
              playersList={playersList}
              userName={user?.name}
            />
          ) : (
            "Your Score"
          )}
          {/* <div className="absolute w-40 flex flex-col top-15 left-0 z-10 bg-cloudBirst rounded p-2 max-h-96 overflow-auto">
            {playersList?.map((player) => {
              return (
                <div
                  className="p-0 btn btn-ghost font-ubuntuRegular bg-base-100 my-1"
                  key={player.name}
                >
                  {player.name}
                </div>
              );
            })}
          </div> */}
        </span>
      </label>
      <label className="input-group">
        <span>Score</span>
        <input
          value={value}
          type="number"
          placeholder="Insert score number"
          className={`input input-bordered ${borderColor} focus:outline-none dark:focus:border-aqua focus:border-navy`}
          onChange={(e) => {
            _onUserScoreChange(e);
          }}
          min="0"
        />
      </label>
    </div>
  );
};
