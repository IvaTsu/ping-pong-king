import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

interface IUseAccessToken {
  accessToken: string | undefined;
}

export const useAccessToken = (): IUseAccessToken => {
  const [userAccessToken, setUserAccessToken] = useState<string>();
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const getUserAccessToken = async (): Promise<void> => {
      const accessToken = await getAccessTokenSilently({
        authorizationParams: {
          audience: import.meta.env.VITE_API_AUDIENCE_URL,
        },
      });
      setUserAccessToken(accessToken);
    };
    void getUserAccessToken();
  }, []);

  return {
    accessToken: userAccessToken,
  };
};
