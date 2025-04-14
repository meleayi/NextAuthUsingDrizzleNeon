import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { users } from "./usersSchema";

export const passwordResetTokens = pgTable("passwordResetToken", {
  id: serial("id").primaryKey(),
  userId: integer("userId").references(() => users.id, {
    onDelete: "cascade",
  }).unique(),
  token: text("token"),
  tokenExpiry: timestamp("tokenExpriry"),
});
