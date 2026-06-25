"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import { db } from "@/db";
import { users, products, verifications } from "@/db/schema";
import { eq } from "drizzle-orm";
import { GoogleGenAI } from "@google/genai";

export async function verifyReceiptAction(formData: FormData) {
  const { userId } = await auth();

  if (!userId) {
    return { success: false, error: "You must be signed in to verify a product." };
  }

  const file = formData.get("file") as File | null;
  if (!file) {
    return { success: false, error: "No receipt file provided." };
  }

  try {
    // RACE CONDITION FIX: Ensure user exists in our DB before inserting verifications
    const existingUser = await db.select().from(users).where(eq(users.id, userId));
    
    if (existingUser.length === 0) {
      const client = await clerkClient();
      const clerkUser = await client.users.getUser(userId);
      const email = clerkUser.emailAddresses[0]?.emailAddress;
      
      if (email) {
        const name = [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(" ") || null;
        const imageUrl = clerkUser.imageUrl || null;
        
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
        return { success: false, error: "Could not sync user profile from Clerk." };
      }
    }

    // Convert file to base64 buffer for AI
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Data = buffer.toString("base64");
    const mimeType = file.type || "image/jpeg";

    if (!process.env.GEMINI_API_KEY) {
      return { success: false, error: "GEMINI_API_KEY is not configured on the server." };
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    // STRICT SINGLE-REQUEST AI INVOCATION (RPM & Quota Protection)
    // We execute exactly ONE request to gemini-3.1-flash-lite using the modern Google Interactions API (GA June 2026).
    const interaction = await ai.interactions.create({
      model: "gemini-3.1-flash-lite",
      input: [
        {
          type: "text",
          text: "Analyze this receipt image. Extract ONLY the primary consumer product name (e.g. 'iPhone 16 Pro', 'ThinkPad X1 Carbon') and the date of purchase (YYYY-MM-DD). Return pure JSON object with keys: 'valid_receipt' (boolean), 'product_name' (string or null), 'purchase_date' (string or null), 'error_reason' (string or null if invalid). Ignore all prices, personal names, store addresses, and payment card details. Output ONLY pure JSON without markdown code blocks.",
        },
        {
          type: "image",
          data: base64Data,
          mime_type: mimeType,
        },
      ],
      response_mime_type: "application/json",
    });

    const textResponse = interaction.output_text;
    if (!textResponse) {
      return { success: false, error: "AI returned an empty response. Please ensure the image is clear and try again." };
    }

    let parsed: {
      valid_receipt: boolean;
      product_name: string | null;
      purchase_date: string | null;
      error_reason: string | null;
    };

    try {
      // Clean potential markdown if any
      const cleanedText = textResponse.replace(/^```json/, '').replace(/^```/, '').replace(/```$/, '').trim();
      parsed = JSON.parse(cleanedText);
    } catch (parseErr) {
      console.error("JSON parse error:", parseErr, textResponse);
      return { success: false, error: "Failed to parse AI extraction results. Please try another receipt image." };
    }

    if (!parsed.valid_receipt || !parsed.product_name) {
      return { 
        success: false, 
        error: parsed.error_reason || "No verified consumer electronics or physical products could be detected on this receipt." 
      };
    }

    const productName = parsed.product_name.trim();
    const purchaseDate = parsed.purchase_date ? parsed.purchase_date.trim() : new Date().toISOString().split("T")[0];

    // Generate slug from product name
    const slug = productName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

    // Find or create product in products table
    let existingProduct = await db.select().from(products).where(eq(products.slug, slug));
    let productId: number;

    if (existingProduct.length === 0) {
      const inserted = await db.insert(products).values({
        slug,
        name: productName,
        category: "tech",
        description: `Verified community hub for ${productName}`,
      }).returning({ id: products.id });
      productId = inserted[0].id;
    } else {
      productId = existingProduct[0].id;
    }

    // Insert into verifications table with IMMEDIATE DISCARD policy enforcement
    await db.insert(verifications).values({
      userId,
      productId,
      invoiceUrl: "DISCARDED_PER_PRIVACY_POLICY",
      productName,
      purchaseDate,
      status: "approved",
      verifiedAt: new Date(),
    });

    return { 
      success: true, 
      data: {
        productName,
        purchaseDate,
        slug
      } 
    };
  } catch (error: any) {
    console.error("Error in verifyReceiptAction:", error);
    return { success: false, error: error.message || "An unexpected error occurred during verification." };
  }
}
