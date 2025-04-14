import { pgTable, text, serial } from "drizzle-orm/pg-core";

export const students = pgTable("students", {
  id: serial("id").primaryKey(),
  name: text("name"),
  status: text("status"),
  sex: text("sex"),
});
