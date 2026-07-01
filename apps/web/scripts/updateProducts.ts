import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "../src/db/schema";
import { eq } from "drizzle-orm";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

async function main() {
  console.log("Updating existing products with prices and images...");

  // Update MacBook Pro M3 Max
  await db.update(schema.products)
    .set({
      price: 349900,
      imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
    })
    .where(eq(schema.products.slug, "macbook-pro-m3-max"));

  // Update Sony a7 IV
  await db.update(schema.products)
    .set({
      price: 249800,
      imageUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80",
    })
    .where(eq(schema.products.slug, "sony-a7iv"));

  // Update Herman Miller Embody
  await db.update(schema.products)
    .set({
      price: 199500,
      imageUrl: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=800&q=80",
    })
    .where(eq(schema.products.slug, "herman-miller-embody"));

  console.log("Products updated successfully!");
}

main().catch(console.error);
