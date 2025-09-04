import React, { type PropsWithChildren } from "react";

import { useAxiosAuth } from "../hooks/useAxiosAuth";

interface AxiosAuthSetupProps extends PropsWithChildren {}

export const AxiosAuthSetup: React.FC<AxiosAuthSetupProps> = ({ children }) => {
  useAxiosAuth();

  return <>{children}</>;
};
