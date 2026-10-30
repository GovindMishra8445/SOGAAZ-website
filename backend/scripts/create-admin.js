/**
 * Create an admin, or reset an existing admin's password.
 *
 *   npm run create-admin -- <email> <password>
 *   (or set ADMIN_EMAIL / ADMIN_PASSWORD in .env and run `npm run create-admin`)
 *
 * Resetting a password also signs that admin out of every browser.
 */
import "../src/config/dns.js";
import mongoose from "mongoose";
import { Admin, validatePasswordStrength } from "../src/models/Admin.js";

const [, , argEmail, argPassword] = process.argv;
const email = (argEmail || process.env.ADMIN_EMAIL || "").trim().toLowerCase();
const password = argPassword || process.env.ADMIN_PASSWORD || "";

if (!process.env.MONGODB_URI) {
  console.error("❌ MONGODB_URI is not set (add it to backend/.env)");
  process.exit(1);
}
if (!email || !password) {
  console.error("Usage: npm run create-admin -- <email> <password>");
  process.exit(1);
}
const problem = validatePasswordStrength(password);
if (problem) {
  console.error(`❌ ${problem}`);
  process.exit(1);
}

await mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 15000 });

let admin = await Admin.findOne({ email });
const isNew = !admin;
if (isNew) admin = new Admin({ email });
await admin.setPassword(password);
admin.tokenVersion += 1;
admin.failedLogins = 0;
admin.lockUntil = null;
await admin.save();

console.log(isNew ? `✅ Admin created: ${email}` : `✅ Password reset for: ${email}`);
await mongoose.disconnect();
