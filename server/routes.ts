import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { sendNotificationEmail } from "./email";
import { setupAdminSession, checkAdminPassword, requireAdmin } from "./adminAuth";
import { rateLimit } from "./rateLimit";
import {
  insertContactSubmissionSchema,
  insertNewsletterSubscriptionSchema,
  updateSubmissionStatusSchema,
} from "@shared/schema";

const publicFormLimiter = rateLimit({ windowMs: 10 * 60 * 1000, max: 20 });
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: "Too many login attempts. Please try again later.",
});

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  setupAdminSession(app);

  // ─── Contact / project request ───
  app.post("/api/contact", publicFormLimiter, async (req, res) => {
    const parsed = insertContactSubmissionSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({
        message: "Please check the required fields and try again.",
        errors: parsed.error.flatten().fieldErrors,
      });
      return;
    }

    // Honeypot: real visitors never fill this in.
    if (parsed.data.website) {
      res.status(200).json({ success: true });
      return;
    }

    try {
      const submission = await storage.createContactSubmission(parsed.data);

      await sendNotificationEmail({
        subject: "New Contact Form Submission - Website",
        heading: "New Contact Form Submission",
        fields: [
          { label: "Name", value: submission.name },
          { label: "Email / WhatsApp", value: submission.contact },
          { label: "Company", value: submission.company },
          { label: "Project Type", value: submission.projectType },
          { label: "Budget", value: submission.budget },
          { label: "Timeline", value: submission.timeline },
          { label: "Message", value: submission.message },
          { label: "Submitted At", value: submission.createdAt.toISOString() },
        ],
        footerNote: "This message was sent from the website contact form.",
      });

      res.status(201).json({ success: true });
    } catch (error) {
      console.error("[contact] Failed to save submission:", error);
      res.status(500).json({ message: "Something went wrong. Please try again." });
    }
  });

  // ─── Newsletter / news subscription ───
  app.post("/api/newsletter", publicFormLimiter, async (req, res) => {
    const parsed = insertNewsletterSubscriptionSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({
        message: "Please check the required fields and try again.",
        errors: parsed.error.flatten().fieldErrors,
      });
      return;
    }

    if (parsed.data.website) {
      res.status(200).json({ success: true });
      return;
    }

    try {
      const subscription = await storage.createNewsletterSubscription(parsed.data);

      await sendNotificationEmail({
        subject: "New Newsletter Subscription - Website",
        heading: "New Newsletter Subscription",
        fields: [
          { label: "Email", value: subscription.email },
          { label: "Name", value: subscription.name },
          { label: "Source", value: subscription.source },
          { label: "Submitted At", value: subscription.createdAt.toISOString() },
        ],
        footerNote: "This message was sent from the website newsletter form.",
      });

      res.status(201).json({ success: true });
    } catch (error) {
      console.error("[newsletter] Failed to save subscription:", error);
      res.status(500).json({ message: "Something went wrong. Please try again." });
    }
  });

  // ─── Admin auth ───
  app.post("/api/admin/login", loginLimiter, (req, res) => {
    const password = typeof req.body?.password === "string" ? req.body.password : "";
    if (!checkAdminPassword(password)) {
      res.status(401).json({ message: "Incorrect password." });
      return;
    }
    req.session.isAdmin = true;
    res.json({ success: true });
  });

  app.post("/api/admin/logout", (req, res) => {
    req.session.destroy(() => {
      res.json({ success: true });
    });
  });

  app.get("/api/admin/me", (req, res) => {
    res.json({ authenticated: Boolean(req.session.isAdmin) });
  });

  // ─── Admin dashboard data ───
  app.get("/api/admin/contact-submissions", requireAdmin, async (_req, res) => {
    const submissions = await storage.getContactSubmissions();
    res.json(submissions);
  });

  app.get("/api/admin/newsletter-subscriptions", requireAdmin, async (_req, res) => {
    const subscriptions = await storage.getNewsletterSubscriptions();
    res.json(subscriptions);
  });

  app.patch("/api/admin/contact-submissions/:id/status", requireAdmin, async (req, res) => {
    const parsed = updateSubmissionStatusSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ message: "Invalid status." });
      return;
    }

    const id = String(req.params.id);
    const updated = await storage.updateContactSubmissionStatus(id, parsed.data.status);
    if (!updated) {
      res.status(404).json({ message: "Submission not found." });
      return;
    }
    res.json(updated);
  });

  return httpServer;
}
