import { type Dispatch, type SetStateAction } from "react";

export const SearchOpponentByName = ({
  value,
  onChange,
}: {
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
}): JSX.Element => {
  return (
    <>
      <label className="label">
        <span className="label-text">Opponent Name</span>
      </label>

      <div>
        <label className="input-group">
          <span>Opponent</span>
          <input
            type="text"
            placeholder="Search…"
            className="input input-bordered"
            value={value}
            onChange={(e) => {
              onChange(e.target.value);
            }}
          />
        </label>
      </div>
    </>
  );
};
