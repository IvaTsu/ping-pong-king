import { pgTable, serial, varchar } from "drizzle-orm/pg-core";
export const usersTable = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar({ length: 255 }).notNull().unique(),
  sub: varchar({ length: 255 }).notNull().unique(),
});
