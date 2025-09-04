import React from "react";

import { useAxiosAuth } from "../hooks/useAxiosAuth";

export const AxiosAuthSetup: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  useAxiosAuth();

  return <>{children}</>;
};
