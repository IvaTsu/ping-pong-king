import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

import { setAuth0TokenGetter } from "../api/request";

export const useAxiosAuth = (): void => {
  const { getAccessTokenSilently, isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      setAuth0TokenGetter(getAccessTokenSilently);
    } else {
      console.log("Not authenticated yet or still loading");
      // Don't set any token getter when not authenticated
      // Let the axios interceptor handle the missing token gracefully
    }
  }, [getAccessTokenSilently, isAuthenticated, isLoading]);
};
