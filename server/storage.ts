import { randomUUID } from "crypto";
import { eq, desc } from "drizzle-orm";
import { db } from "./db";
import {
  users,
  contactSubmissions,
  newsletterSubscriptions,
  type User,
  type InsertUser,
  type ContactSubmission,
  type InsertContactSubmission,
  type NewsletterSubscription,
  type InsertNewsletterSubscription,
  type submissionStatusValues,
} from "@shared/schema";

type SubmissionStatus = (typeof submissionStatusValues)[number];

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  createContactSubmission(data: InsertContactSubmission): Promise<ContactSubmission>;
  getContactSubmissions(): Promise<ContactSubmission[]>;
  updateContactSubmissionStatus(id: string, status: SubmissionStatus): Promise<ContactSubmission | undefined>;

  createNewsletterSubscription(data: InsertNewsletterSubscription): Promise<NewsletterSubscription>;
  getNewsletterSubscriptions(): Promise<NewsletterSubscription[]>;
}

/* ─── In-memory storage — the default until DATABASE_URL is configured ─── */

export class MemStorage implements IStorage {
  private users = new Map<string, User>();
  private contacts = new Map<string, ContactSubmission>();
  private subscriptions = new Map<string, NewsletterSubscription>();

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find((user) => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createContactSubmission(data: InsertContactSubmission): Promise<ContactSubmission> {
    const id = randomUUID();
    const now = new Date();
    const submission: ContactSubmission = {
      id,
      name: data.name,
      contact: data.contact,
      company: data.company || null,
      projectType: data.projectType || null,
      budget: data.budget || null,
      timeline: data.timeline || null,
      message: data.message,
      status: "new",
      createdAt: now,
      updatedAt: now,
    };
    this.contacts.set(id, submission);
    return submission;
  }

  async getContactSubmissions(): Promise<ContactSubmission[]> {
    return Array.from(this.contacts.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
    );
  }

  async updateContactSubmissionStatus(
    id: string,
    status: SubmissionStatus,
  ): Promise<ContactSubmission | undefined> {
    const existing = this.contacts.get(id);
    if (!existing) return undefined;
    const updated: ContactSubmission = { ...existing, status, updatedAt: new Date() };
    this.contacts.set(id, updated);
    return updated;
  }

  async createNewsletterSubscription(
    data: InsertNewsletterSubscription,
  ): Promise<NewsletterSubscription> {
    const existing = Array.from(this.subscriptions.values()).find(
      (s) => s.email.toLowerCase() === data.email.toLowerCase(),
    );
    if (existing) {
      const reactivated: NewsletterSubscription = { ...existing, status: "active" };
      this.subscriptions.set(existing.id, reactivated);
      return reactivated;
    }
    const id = randomUUID();
    const subscription: NewsletterSubscription = {
      id,
      email: data.email,
      name: data.name || null,
      source: data.source || null,
      status: "active",
      createdAt: new Date(),
    };
    this.subscriptions.set(id, subscription);
    return subscription;
  }

  async getNewsletterSubscriptions(): Promise<NewsletterSubscription[]> {
    return Array.from(this.subscriptions.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
    );
  }
}

/* ─── Postgres-backed storage — used automatically once DATABASE_URL is set ─── */

export class DbStorage implements IStorage {
  private get database() {
    if (!db) throw new Error("DbStorage used without a configured database connection");
    return db;
  }

  async getUser(id: string): Promise<User | undefined> {
    const [user] = await this.database.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await this.database.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await this.database.insert(users).values(insertUser).returning();
    return user;
  }

  async createContactSubmission(data: InsertContactSubmission): Promise<ContactSubmission> {
    const [submission] = await this.database
      .insert(contactSubmissions)
      .values({
        name: data.name,
        contact: data.contact,
        company: data.company || null,
        projectType: data.projectType || null,
        budget: data.budget || null,
        timeline: data.timeline || null,
        message: data.message,
      })
      .returning();
    return submission;
  }

  async getContactSubmissions(): Promise<ContactSubmission[]> {
    return this.database.select().from(contactSubmissions).orderBy(desc(contactSubmissions.createdAt));
  }

  async updateContactSubmissionStatus(
    id: string,
    status: SubmissionStatus,
  ): Promise<ContactSubmission | undefined> {
    const [updated] = await this.database
      .update(contactSubmissions)
      .set({ status, updatedAt: new Date() })
      .where(eq(contactSubmissions.id, id))
      .returning();
    return updated;
  }

  async createNewsletterSubscription(
    data: InsertNewsletterSubscription,
  ): Promise<NewsletterSubscription> {
    const [existing] = await this.database
      .select()
      .from(newsletterSubscriptions)
      .where(eq(newsletterSubscriptions.email, data.email));

    if (existing) {
      const [reactivated] = await this.database
        .update(newsletterSubscriptions)
        .set({ status: "active" })
        .where(eq(newsletterSubscriptions.id, existing.id))
        .returning();
      return reactivated;
    }

    const [subscription] = await this.database
      .insert(newsletterSubscriptions)
      .values({
        email: data.email,
        name: data.name || null,
        source: data.source || null,
      })
      .returning();
    return subscription;
  }

  async getNewsletterSubscriptions(): Promise<NewsletterSubscription[]> {
    return this.database
      .select()
      .from(newsletterSubscriptions)
      .orderBy(desc(newsletterSubscriptions.createdAt));
  }
}

export const storage: IStorage = db ? new DbStorage() : new MemStorage();
