import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
// Throw error early if env var is missing
if (!process.env.NEON_DATABASE_URL) {
  throw new Error("NEON_DATABASE_URL is not defined in environment variables");
}

const sql = neon(process.env.NEON_DATABASE_URL!);
export const db = drizzle(sql);
