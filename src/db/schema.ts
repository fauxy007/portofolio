import { pgTable, text, varchar, timestamp, uuid } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: text("password_hash").notNull(),
});

export const projects = pgTable("projects", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  imageUrl: varchar("image_url", { length: 500 }).notNull(),
  techStack: text("tech_stack").array().notNull(), // Using text array as requested
  liveUrl: varchar("live_url", { length: 500 }),
  repoUrl: varchar("repo_url", { length: 500 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
