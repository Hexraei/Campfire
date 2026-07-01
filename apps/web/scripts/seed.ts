import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "../src/db/schema";
import { config } from "dotenv";
import path from "path";
import fs from "fs";

// Load .env.local from the project root
config({ path: path.resolve(process.cwd(), ".env.local") });

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

async function main() {
  console.log("Seeding database...");

  // 1. Create a dummy user
  const dummyUserId = "user_mock_12345";
  await db.insert(schema.users).values({
    id: dummyUserId,
    email: "mockuser@example.com",
    name: "Alex Reviewer",
    imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    trustScore: 100,
  }).onConflictDoNothing();
  console.log("User seeded.");

  // 2. Create products
  const productsToInsert = [
    {
      slug: "macbook-pro-m3-max",
      name: "Apple MacBook Pro 16-inch (M3 Max)",
      category: "laptops",
      description: "The ultimate pro laptop. Mind-blowing performance with the M3 Max chip, amazing battery life, and a brilliant Liquid Retina XDR display.",
    },
    {
      slug: "sony-a7iv",
      name: "Sony a7 IV Mirrorless Camera",
      category: "cameras",
      description: "A hybrid powerhouse. Features a 33MP full-frame sensor, advanced autofocus, and stunning 4K 60p video capabilities for creators.",
    },
    {
      slug: "herman-miller-embody",
      name: "Herman Miller Embody Chair",
      category: "furniture",
      description: "Ergonomic excellence. Designed with the help of physicians and PhDs in biomechanics to keep you focused and healthy during long working hours.",
    }
  ];

  await db.insert(schema.products)
    .values(productsToInsert)
    .onConflictDoNothing();
  
  // Fetch them by slug to get their IDs
  const products = await db.select().from(schema.products);
  const macbook = products.find(p => p.slug === "macbook-pro-m3-max");
  const sony = products.find(p => p.slug === "sony-a7iv");

  console.log("Products seeded.");

  if (!macbook || !sony) {
      throw new Error("Failed to find products after insert.");
  }

  // 3. Create verifications for the dummy user
  await db.insert(schema.verifications).values([
    {
      userId: dummyUserId,
      productId: macbook.id,
      invoiceUrl: "DISCARDED_PER_PRIVACY_POLICY",
      productName: "Apple MacBook Pro 16-inch (M3 Max)",
      purchaseDate: "2023-11-15",
      status: "approved",
      verifiedAt: new Date(),
    },
    {
      userId: dummyUserId,
      productId: sony.id,
      invoiceUrl: "DISCARDED_PER_PRIVACY_POLICY",
      productName: "Sony a7 IV Mirrorless Camera",
      purchaseDate: "2022-05-10",
      status: "approved",
      verifiedAt: new Date(),
    }
  ]).onConflictDoNothing();
  console.log("Verifications seeded.");

  // 4. Create Timeline Posts (First-hand experiences)
  await db.insert(schema.timelinePosts).values([
    {
      userId: dummyUserId,
      productId: macbook.id,
      milestone: "Day 1",
      content: "Just unboxed it! The screen is incredibly bright and the speakers sound better than my actual desktop speakers. The M3 Max feels completely overkill for my web development workload, but the instant responsiveness is insane.",
      rating: 5,
    },
    {
      userId: dummyUserId,
      productId: macbook.id,
      milestone: "Month 1",
      content: "I've been using this daily. The battery life is surprisingly good even when running multiple Docker containers. The only downside is it's a bit heavy to lug around in a small backpack, but the performance trade-off is worth it.",
      rating: 5,
    },
    {
      userId: dummyUserId,
      productId: sony.id,
      milestone: "Year 1",
      content: "One year later and this is still the best hybrid camera on the market. The autofocus is basically cheating. I primarily use it for video, and while the 4K60 crop is annoying, the color science straight out of the camera saves me so much time in post-production.",
      rating: 4,
    }
  ]).onConflictDoNothing();
  console.log("Timeline posts seeded.");

  // 5. Create Q&A
  const insertedQuestion = await db.insert(schema.questions).values({
    userId: dummyUserId, // Let's pretend they asked it before owning it, or someone else did
    productId: macbook.id,
    content: "Does the 16-inch version fit comfortably on an airplane tray table?",
  }).returning();

  await db.insert(schema.answers).values({
    questionId: insertedQuestion[0].id,
    userId: dummyUserId,
    content: "It fits, but it's very tight. If the person in front of you reclines, you'll have to quickly adjust the screen to avoid it getting crushed. I usually use a tablet on flights instead.",
  });
  console.log("Q&A seeded.");

  console.log("Seeding complete!");
}

main().catch(e => {
  console.error("Seed error:", e);
  process.exit(1);
});
