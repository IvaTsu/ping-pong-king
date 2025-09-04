import { useMemo } from "react";

export const WinRate = ({ value }: { value?: number }): JSX.Element => {
  if (value === null || value === undefined || !Number.isFinite(value)) {
    return (
      <span className="rounded bg-cloudBirst p-2 font-ubuntuBold dark:bg-none">
        N/A
      </span>
    );
  }

  const winRateColorGradation = useMemo(() => {
    if (value <= 0.3) {
      return "text-red";
    }
    if (value > 0.3 && value <= 0.5) {
      return "text-orange";
    }
    if (value > 0.5 && value <= 0.7) {
      return "text-yellow";
    }
    if (value > 0.7 && value <= 0.9) {
      return "text-green";
    }
    if (value > 0.9 && value <= 1) {
      return "text-aqua";
    }
    return "";
  }, [value]);

  return (
    <span
      className={`bg-cloudBirst p-2 font-ubuntuBold dark:bg-none ${winRateColorGradation} rounded`}
    >
      {Math.round(value * 100)}%
    </span>
  );
};
