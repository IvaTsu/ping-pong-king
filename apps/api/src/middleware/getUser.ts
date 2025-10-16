import { Response, NextFunction } from "express";
import { eq } from "drizzle-orm";
import { db } from "../db";
import { usersTable } from "../db/schema";
import { AuthenticatedRequest } from "./auth";

export interface UserRequest extends AuthenticatedRequest {
  dbUser?: typeof usersTable.$inferSelect;
}

/**
 * Middleware to fetch user from database based on the authenticated user's email (Auth0 ID)
 * Attaches the database user to req.dbUser
 */
export const getUser = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.body?.email) {
      return res.status(401).json({
        message: "User not authenticated",
      });
    }

    const users = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, req.body.email))
      .limit(1);

    if (users.length > 0) {
      req.dbUser = users[0];
    }

    next();
  } catch (error) {
    console.error("Error fetching user from database:", error);
    return res.status(500).json({
      message: "Error fetching user from database",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
