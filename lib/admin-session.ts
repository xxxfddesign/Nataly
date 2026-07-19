// Подпись сессии через Web Crypto API (SubtleCrypto), чтобы одинаково
// работать и в обычных API-роутах, и в middleware на Edge Runtime.

const COOKIE_NAME = "asn_admin_session";
const MAX_AGE_SECONDS = 60 * 60 * 8; // 8 часов

function getSecret() {
  return process.env.ADMIN_SESSION_SECRET || "dev-only-insecure-secret";
}

async function hmacHex(message: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(getSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, enc.encode(message));
  return Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function createSessionToken(login: string): Promise<string> {
  const expires = Date.now() + MAX_AGE_SECONDS * 1000;
  const payload = `${login}.${expires}`;
  const signature = await hmacHex(payload);
  return `${payload}.${signature}`;
}

export async function verifySessionToken(token: string | undefined | null): Promise<boolean> {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const [login, expires, signature] = parts;
  const payload = `${login}.${expires}`;
  const expected = await hmacHex(payload);
  if (signature.length !== expected.length) return false;
  // сравнение постоянного времени
  let diff = 0;
  for (let i = 0; i < expected.length; i++) {
    diff |= signature.charCodeAt(i) ^ expected.charCodeAt(i);
  }
  if (diff !== 0) return false;
  return Date.now() < Number(expires);
}

export const ADMIN_COOKIE_NAME = COOKIE_NAME;
export const ADMIN_COOKIE_MAX_AGE = MAX_AGE_SECONDS;
