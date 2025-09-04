import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import jwksClient from "jwks-rsa";

// Initialize jwks client lazily to ensure env vars are loaded
let client: jwksClient.JwksClient | null = null;

function getJwksClient() {
  if (!client) {
    if (!process.env.AUTH0_DOMAIN) {
      throw new Error("AUTH0_DOMAIN environment variable is required");
    }
    client = jwksClient({
      jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
      requestHeaders: {},
      timeout: 30000,
    });
  }
  return client;
}

function getKey(header: any, callback: any) {
  if (!header || !header.kid) {
    return callback(new Error("No kid found in token header"));
  }

  try {
    const jwksClient = getJwksClient();
    jwksClient.getSigningKey(header.kid, (err, key) => {
      if (err) {
        console.error("Error getting signing key:", err);
        callback(err);
        return;
      }
      const signingKey = key?.getPublicKey();
      callback(null, signingKey);
    });
  } catch (error) {
    callback(error);
  }
}

export interface AuthenticatedRequest extends Request {
  user?: any;
}

export const authenticateToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
      return res.status(401).json({
        message: "Authorization header required",
        expected: "Bearer <token>",
      });
    }

    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Invalid authorization header format",
        expected: "Bearer <token>",
        received: authHeader.substring(0, 20) + "...",
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token || token.trim() === "") {
      return res.status(401).json({ message: "Access token required" });
    }

    // Validate environment variables before processing
    if (!process.env.AUTH0_DOMAIN || !process.env.AUTH0_AUDIENCE) {
      console.error("Missing Auth0 configuration");
      return res.status(500).json({ message: "Server configuration error" });
    }

    jwt.verify(
      token,
      getKey,
      {
        audience: process.env.AUTH0_AUDIENCE,
        issuer: `https://${process.env.AUTH0_DOMAIN}/`,
        algorithms: ["RS256"],
      },
      (err, decoded) => {
        if (err) {
          console.error("Token verification failed:", {
            error: err.message,
            name: err.name,
            audience: process.env.AUTH0_AUDIENCE,
            issuer: `https://${process.env.AUTH0_DOMAIN}/`,
            tokenPreview: token.substring(0, 50) + "...",
          });

          let errorMessage = "Invalid token";
          if (err.name === "TokenExpiredError") {
            errorMessage = "Token has expired";
          } else if (err.name === "JsonWebTokenError") {
            errorMessage = "Malformed token";
          } else if (err.name === "NotBeforeError") {
            errorMessage = "Token not active yet";
          }

          return res.status(403).json({
            message: errorMessage,
            error: err.message,
          });
        }

        req.user = decoded;
        next();
      }
    );
  } catch (error: any) {
    console.error("Authentication middleware error:", error);
    return res.status(500).json({
      message: "Authentication processing error",
      error: error.message,
    });
  }
};

// Optional middleware to check specific scopes
export const requireScope = (requiredScope: string) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const scopes = req.user?.scope?.split(" ") || [];

    if (!scopes.includes(requiredScope)) {
      return res.status(403).json({
        message: `Insufficient scope. Required: ${requiredScope}`,
        userScopes: scopes,
      });
    }

    next();
  };
};
