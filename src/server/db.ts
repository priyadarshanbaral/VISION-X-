import { MongoClient, Db } from "mongodb";
import {
  ODISHA_MONUMENTS,
  ODISHA_HANDICRAFTS,
  ODISHA_WORKSHOPS,
  ODISHA_RESORTS,
  ODISHA_PACKAGES,
  ODISHA_WEDDINGS,
  ODISHA_TRANSIT_OPTIONS,
  ODISHA_FESTIVALS,
  ODISHA_CUISINE,
} from "../data/odishaData.js";
import { ODISHA_ALL_DESTINATIONS } from "../data/odishaDestinations.js";

const MONGO_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";
const DB_NAME = process.env.MONGODB_DB || "vision_x";

let client: MongoClient | null = null;
let db: Db | null = null;
export let mongoReady = false;

export async function connectDb(): Promise<Db | null> {
  if (db) return db;
  try {
    client = new MongoClient(MONGO_URI, { serverSelectionTimeoutMS: 3000 });
    await client.connect();
    db = client.db(DB_NAME);
    await db.command({ ping: 1 });
    mongoReady = true;
    console.log(`[db] MongoDB connected -> ${MONGO_URI} (db: ${DB_NAME})`);
    await seedIfEmpty(db);
    return db;
  } catch (err) {
    console.warn(
      "[db] MongoDB unavailable, falling back to in-memory data:",
      (err as Error).message,
    );
    mongoReady = false;
    try {
      await client?.close();
    } catch {
      /* noop */
    }
    client = null;
    db = null;
    return null;
  }
}

export function getDb(): Db | null {
  return db;
}

const SEED_SETS: Record<string, any[]> = {
  destinations: ODISHA_ALL_DESTINATIONS,
  monuments: ODISHA_MONUMENTS,
  handicrafts: ODISHA_HANDICRAFTS,
  workshops: ODISHA_WORKSHOPS,
  resorts: ODISHA_RESORTS,
  festivals: ODISHA_FESTIVALS,
  cuisine: ODISHA_CUISINE,
  packages: ODISHA_PACKAGES,
  weddings: ODISHA_WEDDINGS,
  transit: ODISHA_TRANSIT_OPTIONS,
};

export async function seedIfEmpty(database: Db) {
  for (const [collection, docs] of Object.entries(SEED_SETS)) {
    if (!Array.isArray(docs)) continue;
    const col = database.collection(collection);
    const count = await col.estimatedDocumentCount();
    if (count === 0) {
      await col.insertMany(docs.map((d) => ({ ...d, _id: d.id ?? undefined })));
      console.log(`[db] seeded ${collection}: ${docs.length} documents`);
    }
  }

  const logins = database.collection("logins");
  await logins.updateMany(
    { password: { $exists: true } },
    { $unset: { password: "" } },
  );
  await logins.createIndex({ userId: 1, at: -1 });

  // Real accounts collection (username / email / hashed password)
  const users = database.collection("users");
  await users.createIndex({ email: 1 }, { unique: true });
  await users.createIndex({ username: 1 }, { unique: true });

  if ((await users.estimatedDocumentCount()) === 0) {
    const { hashPassword } = await import("./auth.js");
    await users.insertOne({
      username: "demo",
      name: "Demo Traveller",
      email: "demo@visionx.in",
      phone: "+91 98765 43210",
      passwordHash: hashPassword("demo1234"),
      role: "user",
      avatarColor: "#b45309",
      bio: "Odisha heritage explorer.",
      createdAt: new Date(),
      lastLoginAt: null,
    } as any);
    console.log("[db] seeded users: 1 demo account (demo / demo1234)");
  }

  // Per-user data collections
  await database
    .collection("bookings")
    .createIndex({ userId: 1, createdAt: -1 });
  await database
    .collection("wishlist")
    .createIndex({ userId: 1, itemId: 1 }, { unique: true });
  await database.collection("activity").createIndex({ userId: 1, at: -1 });
}

/** Read a collection, falling back to the in-memory seed data when Mongo is down. */
export async function readCollection<T = any>(name: string): Promise<T[]> {
  const database = getDb();
  if (database) {
    try {
      return (await database.collection(name).find({}).toArray()) as T[];
    } catch (err) {
      console.warn(
        `[db] read ${name} failed, using fallback:`,
        (err as Error).message,
      );
    }
  }
  return (SEED_SETS[name] || []) as T[];
}
