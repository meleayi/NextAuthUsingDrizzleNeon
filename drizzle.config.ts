// import "dotnet/config";

// import * as dotenv from "dotenv";

// import { defineConfig } from "drizzle-kit";

// dotenv.config({
//   path: ".env",
// });

// export default defineConfig({
//   schema: "@/db/schema.ts",
//   dialect: "postgresql",
//   dbCredentials: {
//     url: process.env.NEON_DATABASE_URL!,
//   },
// });
import * as dotenv from "dotenv";
import { defineConfig } from "drizzle-kit";

dotenv.config({ path: ".env" });

export default defineConfig({
  schema: "./db/schema.ts", // or "@/db/schema.ts" if using path aliases
  out: "./drizzle/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.NEON_DATABASE_URL!,
  },
  verbose: true,
  strict: true,
});
