import { db } from "./src/db";
import { users } from "./src/db/schema";

async function run() {
  const allUsers = await db.select().from(users);
  console.log("Users:", allUsers);
}

run().catch(console.error).finally(() => process.exit(0));
