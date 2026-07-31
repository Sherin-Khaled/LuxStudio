import session from "express-session";
import type { Express, Request, Response, NextFunction } from "express";
import { randomBytes } from "crypto";

/* Single shared-password gate for the admin dashboard — no user accounts,
   no extra tables. If ADMIN_DASHBOARD_PASSWORD isn't set, login always
   fails (fail closed) rather than leaving the dashboard open. */

const sessionSecret = process.env.SESSION_SECRET || randomBytes(32).toString("hex");

if (!process.env.SESSION_SECRET) {
  console.warn(
    "[admin] SESSION_SECRET is not set — using a random secret generated at startup. " +
      "Existing dashboard logins will be invalidated on every restart. Set SESSION_SECRET " +
      "in your deployment environment for stable sessions.",
  );
}

declare module "express-session" {
  interface SessionData {
    isAdmin?: boolean;
  }
}

export function setupAdminSession(app: Express) {
  app.use(
    session({
      secret: sessionSecret,
      name: "lux_admin_session",
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 12, // 12 hours
      },
    }),
  );
}

export function checkAdminPassword(password: string): boolean {
  const expected = process.env.ADMIN_DASHBOARD_PASSWORD;
  if (!expected) {
    console.warn("[admin] ADMIN_DASHBOARD_PASSWORD is not set — dashboard login is disabled.");
    return false;
  }
  return password === expected;
}

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if (req.session.isAdmin) {
    next();
    return;
  }
  res.status(401).json({ message: "Not authenticated" });
}
