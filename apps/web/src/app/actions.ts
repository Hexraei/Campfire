"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import { db } from "@/db";
import { userPreferences, users } from "@/db/schema";
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
    // RACE CONDITION FIX: Ensure user exists in our DB before inserting preferences
    // Sometimes the frontend calls this before the Clerk Webhook has finished creating the user
    const existingUser = await db.select().from(users).where(eq(users.id, userId));
    
    if (existingUser.length === 0) {
      // User doesn't exist yet! Fetch their profile from Clerk immediately
      const client = await clerkClient();
      const clerkUser = await client.users.getUser(userId);
      const email = clerkUser.emailAddresses[0]?.emailAddress;
      
      if (email) {
        const name = [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(" ") || null;
        const imageUrl = clerkUser.imageUrl || null;
        
        // Upsert into users table just to be safe
        await db.insert(users).values({
          id: userId,
          email,
          name,
          imageUrl,
        }).onConflictDoUpdate({
          target: users.id,
          set: { email, name, imageUrl }
        });
      } else {
        throw new Error("Could not fetch user email from Clerk");
      }
    }

    // Now it is perfectly safe to save the preferences
    const existingPref = await db.select().from(userPreferences).where(eq(userPreferences.userId, userId));

    if (existingPref.length > 0) {
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

export async function getPollPreferences() {
  const { userId } = await auth();

  if (!userId) {
    return { success: false, data: null };
  }

  try {
    const existingPref = await db.select().from(userPreferences).where(eq(userPreferences.userId, userId));
    
    if (existingPref.length > 0) {
      return { success: true, data: existingPref[0].categories as string[] };
    }
    
    return { success: true, data: null };
  } catch (error) {
    console.error("Error fetching preferences:", error);
    return { success: false, data: null };
  }
}
