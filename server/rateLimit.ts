import type { Request, Response, NextFunction } from "express";

/* Minimal in-memory rate limiter — no extra dependency needed for a handful
   of low-traffic form endpoints. Keyed by IP; resets after `windowMs`. */

type Bucket = { count: number; resetAt: number };

export function rateLimit(options: { windowMs: number; max: number; message?: string }) {
  const buckets = new Map<string, Bucket>();

  return (req: Request, res: Response, next: NextFunction) => {
    const key = req.ip || "unknown";
    const now = Date.now();
    const bucket = buckets.get(key);

    if (!bucket || now > bucket.resetAt) {
      buckets.set(key, { count: 1, resetAt: now + options.windowMs });
      next();
      return;
    }

    if (bucket.count >= options.max) {
      res.status(429).json({ message: options.message || "Too many requests. Please try again later." });
      return;
    }

    bucket.count += 1;
    next();
  };
}
