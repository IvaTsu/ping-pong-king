import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";

const Auth0Debug: React.FC = () => {
  const { isLoading, isAuthenticated, error, user } = useAuth0();
  const [isExpanded, setIsExpanded] = useState(false);

  console.log("Auth0 Debug Info:", {
    domain: import.meta.env.VITE_AUTH0_DOMAIN,
    clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
    audience: import.meta.env.VITE_AUTH0_AUDIENCE,
    isLoading,
    isAuthenticated,
    error,
    user,
  });

  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  const toggleExpanded = (): void => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "10px",
        right: "10px",
        zIndex: 9999,
        fontFamily: "monospace",
      }}
    >
      {/* Toggle Button */}
      <button
        onClick={toggleExpanded}
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          background: isAuthenticated ? "#10B981" : "#EF4444",
          color: "white",
          border: "none",
          cursor: "pointer",
          fontSize: "12px",
          fontWeight: "bold",
          boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        title={
          isAuthenticated ? "Auth0: Authenticated" : "Auth0: Not Authenticated"
        }
      >
        🔐
      </button>

      {/* Expanded Debug Panel */}
      {isExpanded && (
        <div
          style={{
            background: "rgba(0,0,0,0.9)",
            color: "white",
            padding: "15px",
            borderRadius: "8px",
            fontSize: "12px",
            maxWidth: "350px",
            marginTop: "45px",
            marginRight: "5px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "10px",
              borderBottom: "1px solid rgba(255,255,255,0.2)",
              paddingBottom: "8px",
            }}
          >
            <span style={{ fontWeight: "bold", color: "#10B981" }}>
              Auth0 Debug
            </span>
            <button
              onClick={toggleExpanded}
              style={{
                background: "transparent",
                border: "none",
                color: "white",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              ✕
            </button>
          </div>

          <div style={{ lineHeight: "1.4" }}>
            <div>
              <strong>Domain:</strong> {import.meta.env.VITE_AUTH0_DOMAIN}
            </div>
            <div>
              <strong>Client ID:</strong> {import.meta.env.VITE_AUTH0_CLIENT_ID}
            </div>
            <div>
              <strong>Audience:</strong> {import.meta.env.VITE_AUTH0_AUDIENCE}
            </div>
            <div
              style={{
                marginTop: "8px",
                paddingTop: "8px",
                borderTop: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <div>
                <strong>Loading:</strong>
                <span
                  style={{
                    color: isLoading ? "#F59E0B" : "#10B981",
                    marginLeft: "8px",
                  }}
                >
                  {isLoading.toString()}
                </span>
              </div>
              <div>
                <strong>Authenticated:</strong>
                <span
                  style={{
                    color: isAuthenticated ? "#10B981" : "#EF4444",
                    marginLeft: "8px",
                  }}
                >
                  {isAuthenticated.toString()}
                </span>
              </div>
              {error != null && (
                <div
                  style={{
                    color: "#EF4444",
                    marginTop: "8px",
                    padding: "8px",
                    background: "rgba(239, 68, 68, 0.1)",
                    borderRadius: "4px",
                    border: "1px solid rgba(239, 68, 68, 0.3)",
                  }}
                >
                  <strong>Error:</strong> {error.message}
                </div>
              )}
              {user != null && (
                <div
                  style={{
                    marginTop: "8px",
                    padding: "8px",
                    background: "rgba(16, 185, 129, 0.1)",
                    borderRadius: "4px",
                    border: "1px solid rgba(16, 185, 129, 0.3)",
                  }}
                >
                  <strong>User:</strong>{" "}
                  {user.email ?? user.name ?? user.sub ?? "Unknown"}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Auth0Debug;
