import { useAxiosAuth } from "../hooks/useAxiosAuth";

interface AxiosAuthSetupProps {
  children: React.ReactNode;
}

export const AxiosAuthSetup: React.FC<AxiosAuthSetupProps> = ({ children }) => {
  useAxiosAuth();

  return <>{children}</>;
};
