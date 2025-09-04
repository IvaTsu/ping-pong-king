import { useAuth0 } from "@auth0/auth0-react";
import React, { createContext, useContext } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: unknown;
  getAccessTokenSilently: () => Promise<string>;
  loginWithRedirect: () => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const {
    isAuthenticated,
    isLoading,
    user,
    getAccessTokenSilently,
    loginWithRedirect,
    logout: auth0Logout,
  } = useAuth0();

  const logout = (): void => {
    auth0Logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    }).catch(() => {
      // Handle logout error if needed
    });
  };

  const contextValue: AuthContextType = {
    isAuthenticated,
    isLoading,
    user,
    getAccessTokenSilently,
    loginWithRedirect,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAppAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAppAuth must be used within an AuthProvider");
  }
  return context;
};
