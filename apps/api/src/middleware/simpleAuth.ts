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

export interface SimpleAuthRequest extends Request {
  user?: any;
}

export const simpleAuthenticateToken = (
  req: SimpleAuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
      return res.status(401).json({
        message: "Authorization header required",
        debug: "No Authorization header found",
      });
    }

    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Invalid authorization header format",
        debug: `Expected 'Bearer <token>', got: ${authHeader.substring(0, 20)}...`,
      });
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    if (!token || token.trim() === "") {
      return res.status(401).json({
        message: "Access token required",
        debug: "Empty token after Bearer prefix",
      });
    }

    // For Management API, we need to be more flexible with audience validation
    const verifyOptions: jwt.VerifyOptions = {
      issuer: `https://${process.env.AUTH0_DOMAIN}/`,
      algorithms: ["RS256"],
    };

    // Only add audience if it's not the Management API
    if (!process.env.AUTH0_AUDIENCE?.includes("/api/v2/")) {
      verifyOptions.audience = process.env.AUTH0_AUDIENCE;
    }

    console.log("Verifying token with options:", {
      issuer: verifyOptions.issuer,
      audience: verifyOptions.audience,
      algorithms: verifyOptions.algorithms,
      tokenLength: token.length,
    });

    jwt.verify(token, getKey, verifyOptions, (err, decoded) => {
      if (err) {
        console.error("Token verification failed:", {
          error: err.message,
          name: err.name,
          tokenPreview: token.substring(0, 50) + "...",
        });

        return res.status(403).json({
          message: "Invalid token",
          error: err.message,
          debug: {
            errorName: err.name,
            verifyOptions,
          },
        });
      }

      console.log("Token verified successfully:", {
        sub: (decoded as any)?.sub,
        aud: (decoded as any)?.aud,
        iss: (decoded as any)?.iss,
        scope: (decoded as any)?.scope,
      });

      req.user = decoded;
      next();
    });
  } catch (error: any) {
    console.error("Authentication middleware error:", error);
    return res.status(500).json({
      message: "Authentication processing error",
      error: error.message,
      debug: "Unexpected error in auth middleware",
    });
  }
};
