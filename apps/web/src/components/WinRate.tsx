import { useMemo } from "react";

export const WinRate = ({ value }: { value?: number }): JSX.Element => {
  if (!value) {
    return <span className="bg-cloudBirst font-ubuntuBold p-2 dark:bg-none rounded">N/A</span>;
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
      className={`bg-cloudBirst font-ubuntuBold p-2 dark:bg-none ${winRateColorGradation} rounded`}
    >
      {Math.round(value * 100)}%
    </span>
  );
};
