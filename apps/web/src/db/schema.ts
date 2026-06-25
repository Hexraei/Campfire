import { pgTable, varchar, text, integer, timestamp, serial, jsonb } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// 1. Users Table (Synchronized with Clerk user profiles)
export const users = pgTable("users", {
  id: varchar("id", { length: 256 }).primaryKey(), // Holds Clerk User ID (user_...)
  email: varchar("email", { length: 256 }).notNull(),
  name: varchar("name", { length: 256 }),
  imageUrl: varchar("image_url", { length: 1024 }),
  trustScore: integer("trust_score").default(100).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Waitlist Preferences (Tracks product category votes before/during signup)
export const userPreferences = pgTable("user_preferences", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id", { length: 256 })
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  categories: jsonb("categories").notNull(), // Stores array of category IDs
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 2. Products Table (The catalog of items like laptops/smartphones)
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 256 }).unique().notNull(), // e.g. macbook-air-m3
  name: varchar("name", { length: 256 }).notNull(),
  category: varchar("category", { length: 100 }).notNull(), // 'laptops' | 'smartphones'
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 3. Verifications Table (Proof uploads to get verified owner badge)
export const verifications = pgTable("verifications", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id", { length: 256 })
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  productId: integer("product_id")
    .references(() => products.id, { onDelete: "cascade" })
    .notNull(),
  invoiceUrl: varchar("invoice_url", { length: 1024 }).notNull(),
  productName: varchar("product_name", { length: 256 }),
  purchaseDate: varchar("purchase_date", { length: 100 }),
  status: varchar("status", { length: 50 }).default("pending").notNull(), // 'pending' | 'approved' | 'rejected'
  verifiedAt: timestamp("verified_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 4. Timeline Posts Table (Ownership lifecycle milestones)
export const timelinePosts = pgTable("timeline_posts", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id", { length: 256 })
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  productId: integer("product_id")
    .references(() => products.id, { onDelete: "cascade" })
    .notNull(),
  milestone: varchar("milestone", { length: 100 }).notNull(), // 'Day 1' | 'Month 1' | 'Month 6' | 'Year 1'
  content: text("content").notNull(),
  rating: integer("rating"), // 1 to 5 stars
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 5. Questions Table (Asked by buyers on a product page)
export const questions = pgTable("questions", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id", { length: 256 })
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(), // The buyer
  productId: integer("product_id")
    .references(() => products.id, { onDelete: "cascade" })
    .notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 6. Answers Table (Provided exclusively by verified owners of that product)
export const answers = pgTable("answers", {
  id: serial("id").primaryKey(),
  questionId: integer("question_id")
    .references(() => questions.id, { onDelete: "cascade" })
    .notNull(),
  userId: varchar("user_id", { length: 256 })
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(), // The verified owner
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 7. Discussions Table (General product discussions / threads)
export const discussions = pgTable("discussions", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id", { length: 256 })
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  productId: integer("product_id")
    .references(() => products.id, { onDelete: "cascade" })
    .notNull(),
  title: varchar("title", { length: 512 }).notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 8. Discussion Replies Table (Replies to general discussion threads)
export const discussionReplies = pgTable("discussion_replies", {
  id: serial("id").primaryKey(),
  discussionId: integer("discussion_id")
    .references(() => discussions.id, { onDelete: "cascade" })
    .notNull(),
  userId: varchar("user_id", { length: 256 })
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ==========================================
// DB Relations definitions for Drizzle queries
// ==========================================

export const usersRelations = relations(users, ({ many }) => ({
  verifications: many(verifications),
  timelinePosts: many(timelinePosts),
  questions: many(questions),
  answers: many(answers),
  discussions: many(discussions),
  discussionReplies: many(discussionReplies),
  preferences: many(userPreferences),
}));

export const userPreferencesRelations = relations(userPreferences, ({ one }) => ({
  user: one(users, { fields: [userPreferences.userId], references: [users.id] }),
}));

export const productsRelations = relations(products, ({ many }) => ({
  verifications: many(verifications),
  timelinePosts: many(timelinePosts),
  questions: many(questions),
  discussions: many(discussions),
}));

export const verificationsRelations = relations(verifications, ({ one }) => ({
  user: one(users, { fields: [verifications.userId], references: [users.id] }),
  product: one(products, { fields: [verifications.productId], references: [products.id] }),
}));

export const timelinePostsRelations = relations(timelinePosts, ({ one }) => ({
  user: one(users, { fields: [timelinePosts.userId], references: [users.id] }),
  product: one(products, { fields: [timelinePosts.productId], references: [products.id] }),
}));

export const questionsRelations = relations(questions, ({ one, many }) => ({
  user: one(users, { fields: [questions.userId], references: [users.id] }),
  product: one(products, { fields: [questions.productId], references: [products.id] }),
  answers: many(answers),
}));

export const answersRelations = relations(answers, ({ one }) => ({
  question: one(questions, { fields: [answers.questionId], references: [questions.id] }),
  user: one(users, { fields: [answers.userId], references: [users.id] }),
}));

export const discussionsRelations = relations(discussions, ({ one, many }) => ({
  user: one(users, { fields: [discussions.userId], references: [users.id] }),
  product: one(products, { fields: [discussions.productId], references: [products.id] }),
  replies: many(discussionReplies),
}));

export const discussionRepliesRelations = relations(discussionReplies, ({ one }) => ({
  discussion: one(discussions, { fields: [discussionReplies.discussionId], references: [discussions.id] }),
  user: one(users, { fields: [discussionReplies.userId], references: [users.id] }),
}));
