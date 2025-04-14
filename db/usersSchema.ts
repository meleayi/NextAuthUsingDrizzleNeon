import { pgTable, serial, text, timestamp, boolean } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").unique(),
  password: text("password"),
  createdAt: timestamp("createdAt").defaultNow(),
  twoFactorAuthSecret: text("2faSecret"),
  twoFactorAuthActivated: boolean("2faActivated").default(false), // Fixed typo (was 'zfaActivated')
});
