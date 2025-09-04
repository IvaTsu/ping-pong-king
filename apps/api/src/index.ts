import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import {
  authenticateToken,
  requireScope,
} from "./middleware/auth";
import {
  simpleAuthenticateToken,
  type SimpleAuthRequest,
} from "./middleware/simpleAuth";
import {
  healthCheck,
  getProfile,
  getGames,
  createGame,
  getPlayers,
} from "./controllers/apiController";
import jwt from "jsonwebtoken";

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Public routes
app.get("/", (req, res) => {
  res.json({ message: "Ping Pong King API", status: "running" });
});

app.get("/health", healthCheck);

// Debug endpoint to check token
app.get("/debug/token", (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  res.json({
    hasAuthHeader: !!authHeader,
    authHeaderPreview: authHeader ? authHeader.substring(0, 20) + "..." : null,
    hasToken: !!token,
    tokenPreview: token ? token.substring(0, 50) + "..." : null,
    tokenLength: token ? token.length : 0,
    auth0Domain: process.env.AUTH0_DOMAIN,
    auth0Audience: process.env.AUTH0_AUDIENCE,
  });
});

// Simple test endpoint with basic auth
app.get(
  "/test/simple-auth",
  simpleAuthenticateToken,
  (req: SimpleAuthRequest, res) => {
    res.json({
      message: "Simple authentication test successful",
      user: {
        sub: req.user?.sub,
        email: req.user?.email,
        name: req.user?.name,
        scope: req.user?.scope,
      },
    });
  },
);

// Debug endpoint to check token without verification
app.post("/debug/token", (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return res.json({
      error: "No token provided",
      authHeader,
      headers: req.headers,
    });
  }

  // Decode token without verification to see its contents
  const decoded = jwt.decode(token, { complete: true });
  res.json({
    message: "Token debug info",
    tokenPreview: token.substring(0, 50) + "...",
    decoded: decoded,
    expectedAudience: process.env.AUTH0_AUDIENCE,
    expectedIssuer: `https://${process.env.AUTH0_DOMAIN}/`,
  });
});

// Protected routes
app.get("/api/profile", authenticateToken, getProfile);

// Game routes with scope requirements
app.get("/api/games", authenticateToken, requireScope("read:games"), getGames);
app.post(
  "/api/games",
  authenticateToken,
  requireScope("create:games"),
  createGame,
);

// Player routes
app.get("/api/players", authenticateToken, getPlayers);

app.listen(port, () => {
  console.log(`Ping Pong King API listening on http://localhost:${port}`);
  console.log(`Auth0 Domain: ${process.env.AUTH0_DOMAIN}`);
  console.log(`Auth0 Audience: ${process.env.AUTH0_AUDIENCE}`);
});
