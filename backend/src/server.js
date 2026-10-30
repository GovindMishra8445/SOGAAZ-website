import { env } from "./config/env.js";
import { connectDB, disconnectDB } from "./config/db.js";
import { buildApp } from "./app.js";
import { Admin, validatePasswordStrength } from "./models/Admin.js";

// First deploy only: create the admin from ADMIN_EMAIL / ADMIN_PASSWORD when none exists.
const bootstrapAdmin = async (log) => {
  if (await Admin.exists({})) return;
  if (!env.adminEmail || !env.adminPassword) {
    log.warn("No admin account exists. Set ADMIN_EMAIL and ADMIN_PASSWORD, or run `npm run create-admin`.");
    return;
  }
  const problem = validatePasswordStrength(env.adminPassword);
  if (problem) {
    log.error(`ADMIN_PASSWORD rejected: ${problem}. Admin was not created.`);
    return;
  }
  const admin = new Admin({ email: env.adminEmail });
  await admin.setPassword(env.adminPassword);
  await admin.save();
  log.info(`Initial admin created: ${admin.email} — you can now remove ADMIN_PASSWORD from the environment.`);
};

const start = async () => {
  const app = await buildApp();

  try {
    await connectDB(app.log);
    await bootstrapAdmin(app.log);
    await app.listen({ port: env.port, host: env.host });
  } catch (err) {
    app.log.error(err, "Failed to start server");
    process.exit(1);
  }

  const shutdown = async (signal) => {
    app.log.info(`${signal} received, shutting down`);
    try {
      await app.close();
      await disconnectDB();
    } finally {
      process.exit(0);
    }
  };
  process.on("SIGTERM", () => shutdown("SIGTERM"));
  process.on("SIGINT", () => shutdown("SIGINT"));
};

start();
