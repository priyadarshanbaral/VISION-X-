import crypto from "crypto";
import { ObjectId } from "mongodb";
import { getDb } from "./db.js";

const TOKEN_SECRET = process.env.AUTH_SECRET || "vision_x_dev_secret_change_me";
const TOKEN_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

/* ---------------- password hashing (scrypt) ---------------- */

export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  if (!stored || !stored.includes(":")) return false;
  const [salt, hash] = stored.split(":");
  const candidate = crypto.scryptSync(password, salt, 64);
  const expected = Buffer.from(hash, "hex");
  if (candidate.length !== expected.length) return false;
  return crypto.timingSafeEqual(candidate, expected);
}

/* ---------------- tokens (HMAC signed, JWT-like) ---------------- */

function base64url(input: Buffer | string): string {
  return Buffer.from(input)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function sign(payload: string): string {
  return crypto
    .createHmac("sha256", TOKEN_SECRET)
    .update(payload)
    .digest("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export function createToken(userId: string): string {
  const header = base64url(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload = base64url(
    JSON.stringify({
      sub: userId,
      iat: Date.now(),
      exp: Date.now() + TOKEN_TTL_MS,
    }),
  );
  return `${header}.${payload}.${sign(`${header}.${payload}`)}`;
}

export function verifyToken(token: string): { sub: string } | null {
  try {
    const [header, payload, signature] = token.split(".");
    if (!header || !payload || !signature) return null;
    const expected = sign(`${header}.${payload}`);
    if (signature.length !== expected.length) return null;
    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected)))
      return null;
    const data = JSON.parse(Buffer.from(payload, "base64").toString("utf8"));
    if (!data.exp || Date.now() > data.exp) return null;
    return { sub: data.sub };
  } catch {
    return null;
  }
}

export function readToken(req: any): string | null {
  const header = req.headers?.authorization || "";
  if (header.startsWith("Bearer ")) return header.slice(7).trim();
  return null;
}

export const PUBLIC_USER_FIELDS = { passwordHash: 0 } as const;

export function sanitizeUser(user: any) {
  if (!user) return null;
  const { passwordHash, _id, ...rest } = user;
  return { id: String(_id), ...rest };
}

/* ---------------- express middleware ---------------- */

export async function requireAuth(req: any, res: any, next: any) {
  const token = readToken(req);
  if (!token)
    return res.status(401).json({ success: false, error: "Not authenticated" });

  const decoded = verifyToken(token);
  if (!decoded)
    return res
      .status(401)
      .json({ success: false, error: "Session expired, please sign in again" });

  const db = getDb();
  if (!db)
    return res
      .status(503)
      .json({ success: false, error: "Database unavailable" });

  const user = await db.collection("users").findOne({
    _id: new ObjectId(decoded.sub),
  } as any);
  if (!user)
    return res.status(401).json({ success: false, error: "Account not found" });

  (req as any).user = user;
  next();
}
