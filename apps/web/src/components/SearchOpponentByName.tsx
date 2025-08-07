import { type Dispatch, type SetStateAction } from "react";

export const SearchOpponentByName = ({
  value,
  onChange,
}: {
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
}): JSX.Element => {
  return (
    <div className="py-10">
      <div>
        <label className="input-group">
          <span>Opponent</span>
          <input
            type="text"
            placeholder="Search…"
            className="input input-bordered dark:focus:border-aqua focus:border-navy focus:outline-none"
            value={value}
            onChange={(e) => {
              onChange(e.target.value);
            }}
          />
        </label>
      </div>
    </div>
  );
};
