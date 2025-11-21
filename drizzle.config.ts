import { defineConfig } from "drizzle-kit";
import "dotenv/config";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is required");
}

// Parse connection string to get individual credentials
const url = new URL(process.env.DATABASE_URL);
const host = url.hostname;
const database = url.pathname.slice(1); // Remove leading slash
const user = url.username;
const password = url.password;
const ssl = true;

export default defineConfig({
  schema: "./lib/db.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    host,
    database,
    user,
    password,
    ssl: "require"
  }
});
