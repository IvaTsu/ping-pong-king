import { useSessionStore } from "../store";

const useAuth = (): boolean => {
  const { getSession } = useSessionStore();
  const session = getSession();

  return session?.exp != null && new Date(session.exp) < new Date();
};

export default useAuth;
