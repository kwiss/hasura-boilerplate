import fs from "fs";
import fnv from "fnv-plus";

export const key = (
  process.env.AUTH_PRIVATE_KEY || fs.readFileSync("private.pem").toString()
).replace(/\\n/g, "\n");

export const publicKey = (
  process.env.AUTH_PUBLIC_KEY || fs.readFileSync("public.pem").toString()
).replace(/\\n/g, "\n");

// Key Identifier – Acts as an ‘alias’ for the key
export const kid = process.env.AUTH_KEY_ID || fnv.hash(publicKey, 128).hex();
