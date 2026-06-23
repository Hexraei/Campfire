"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { userPreferences } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function savePollPreferences(categories: string[]) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  if (!categories || categories.length === 0) {
    return { success: false, error: "No categories provided" };
  }

  try {
    // Check if preferences already exist for this user
    const existing = await db.select().from(userPreferences).where(eq(userPreferences.userId, userId));

    if (existing.length > 0) {
      await db
        .update(userPreferences)
        .set({ categories })
        .where(eq(userPreferences.userId, userId));
    } else {
      await db.insert(userPreferences).values({
        userId,
        categories,
      });
    }

    return { success: true };
  } catch (error) {
    console.error("Error saving preferences:", error);
    return { success: false, error: "Database error" };
  }
}
