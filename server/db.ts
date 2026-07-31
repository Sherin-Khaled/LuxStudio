import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "@shared/schema";

/* Postgres is entirely optional. If DATABASE_URL isn't set, `db` stays
   undefined and server/storage.ts falls back to in-memory storage instead —
   the same "works now, upgrades automatically once configured" pattern used
   for SMTP. Nothing here should ever throw just because the var is missing. */

const databaseUrl = process.env.DATABASE_URL;

export const pool = databaseUrl ? new Pool({ connectionString: databaseUrl }) : undefined;

export const db = pool ? drizzle(pool, { schema }) : undefined;

if (!databaseUrl) {
  console.warn(
    "[db] DATABASE_URL is not set — using in-memory storage. Submissions will not persist across server restarts until a database is configured.",
  );
}
