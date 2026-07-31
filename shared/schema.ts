import { sql } from "drizzle-orm";
import { pgEnum, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

/* ─── Contact / project request submissions ─── */

export const submissionStatusValues = ["new", "reviewed", "replied", "archived"] as const;
export const submissionStatusEnum = pgEnum("submission_status", submissionStatusValues);

export const contactSubmissions = pgTable("contact_submissions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  contact: text("contact").notNull(), // email address or WhatsApp number
  company: text("company"),
  projectType: text("project_type"),
  budget: text("budget"),
  timeline: text("timeline"),
  message: text("message").notNull(),
  status: submissionStatusEnum("status").notNull().default("new"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertContactSubmissionSchema = createInsertSchema(contactSubmissions)
  .pick({
    name: true,
    contact: true,
    company: true,
    projectType: true,
    budget: true,
    timeline: true,
    message: true,
  })
  .extend({
    name: z.string().trim().min(1, "Name is required").max(120),
    contact: z.string().trim().min(1, "Email or WhatsApp is required").max(160),
    company: z.string().trim().max(160).optional().or(z.literal("")),
    projectType: z.string().trim().max(120).optional().or(z.literal("")),
    budget: z.string().trim().max(120).optional().or(z.literal("")),
    timeline: z.string().trim().max(120).optional().or(z.literal("")),
    message: z.string().trim().min(1, "Message is required").max(5000),
    // Honeypot — real users never fill this in; bots that auto-fill every field will.
    // No length limit here on purpose: it must always validate structurally so the
    // route handler can silently discard the submission instead of surfacing an error.
    website: z.string().optional().or(z.literal("")),
  });

export type InsertContactSubmission = z.infer<typeof insertContactSubmissionSchema>;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;

export const updateSubmissionStatusSchema = z.object({
  status: z.enum(submissionStatusValues),
});

/* ─── Newsletter / news subscriptions ─── */

export const newsletterStatusValues = ["active", "unsubscribed"] as const;
export const newsletterStatusEnum = pgEnum("newsletter_status", newsletterStatusValues);

export const newsletterSubscriptions = pgTable("newsletter_subscriptions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  name: text("name"),
  source: text("source"),
  status: newsletterStatusEnum("status").notNull().default("active"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertNewsletterSubscriptionSchema = createInsertSchema(newsletterSubscriptions)
  .pick({
    email: true,
    name: true,
    source: true,
  })
  .extend({
    email: z.string().trim().min(1, "Email is required").max(160).email("Enter a valid email"),
    name: z.string().trim().max(120).optional().or(z.literal("")),
    source: z.string().trim().max(120).optional().or(z.literal("")),
    // Honeypot — always validates structurally so the route handler can
    // silently discard the submission instead of surfacing an error.
    website: z.string().optional().or(z.literal("")),
  });

export type InsertNewsletterSubscription = z.infer<typeof insertNewsletterSubscriptionSchema>;
export type NewsletterSubscription = typeof newsletterSubscriptions.$inferSelect;
