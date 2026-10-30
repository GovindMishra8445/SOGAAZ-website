import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import {
  Admin,
  LOCK_TIME_MS,
  MAX_FAILED_LOGINS,
  validatePasswordStrength,
} from "../models/Admin.js";

// Compared against when the email is unknown, so response time doesn't reveal valid emails.
const DUMMY_HASH = bcrypt.hashSync("dummy-password-for-timing", 12);
const INVALID = "Invalid email or password";

const emailSchema = { type: "string", format: "email", maxLength: 254 };
const passwordSchema = { type: "string", minLength: 1, maxLength: 128 };

export default async function authRoutes(app) {
  app.post(
    "/login",
    {
      config: {
        rateLimit: {
          max: 10,
          timeWindow: "15 minutes",
          keyGenerator: (req) => `login:${req.ip}`,
        },
      },
      schema: {
        body: {
          type: "object",
          required: ["email", "password"],
          additionalProperties: false,
          properties: { email: emailSchema, password: passwordSchema },
        },
      },
    },
    async (request, reply) => {
      const email = request.body.email.trim().toLowerCase();
      const admin = await Admin.findOne({ email }).select("+passwordHash");

      if (!admin) {
        await bcrypt.compare(request.body.password, DUMMY_HASH);
        return reply.code(401).send({ message: INVALID });
      }

      if (admin.isLocked()) {
        const mins = Math.ceil((admin.lockUntil - Date.now()) / 60000);
        return reply.code(429).send({
          message: `Account temporarily locked after too many failed attempts. Try again in ${mins} minute${mins > 1 ? "s" : ""}.`,
        });
      }

      const ok = await admin.checkPassword(request.body.password);
      if (!ok) {
        admin.failedLogins += 1;
        if (admin.failedLogins >= MAX_FAILED_LOGINS) {
          admin.lockUntil = new Date(Date.now() + LOCK_TIME_MS);
          admin.failedLogins = 0;
          request.log.warn({ email }, "Admin account locked after failed logins");
        }
        await admin.save();
        return reply.code(401).send({ message: INVALID });
      }

      admin.failedLogins = 0;
      admin.lockUntil = null;
      admin.lastLoginAt = new Date();
      await admin.save();

      await reply.setSession(admin);
      request.log.info({ adminId: admin.id }, "Admin signed in");
      return { admin: admin.toPublic() };
    },
  );

  app.post("/logout", async (_request, reply) => {
    reply.clearSession();
    return { ok: true };
  });

  app.get("/me", { preHandler: app.authenticate }, async (request) => ({
    admin: request.admin.toPublic(),
  }));

  // Change login email and/or password. Always requires the current password.
  app.put(
    "/credentials",
    {
      preHandler: app.authenticate,
      config: { rateLimit: { max: 10, timeWindow: "15 minutes" } },
      schema: {
        body: {
          type: "object",
          required: ["currentPassword"],
          additionalProperties: false,
          properties: {
            currentPassword: passwordSchema,
            newEmail: emailSchema,
            newPassword: passwordSchema,
            name: { type: "string", minLength: 1, maxLength: 80 },
          },
        },
      },
    },
    async (request, reply) => {
      const { currentPassword, newEmail, newPassword, name } = request.body;
      const admin = await Admin.findById(request.admin._id).select("+passwordHash");

      if (!(await admin.checkPassword(currentPassword))) {
        return reply.code(400).send({ message: "Current password is incorrect" });
      }

      let securityChanged = false;

      if (newEmail) {
        const email = newEmail.trim().toLowerCase();
        if (email !== admin.email) {
          const taken = await Admin.exists({ email, _id: mongoose.trusted({ $ne: admin._id }) });
          if (taken) return reply.code(409).send({ message: "This email is already in use" });
          admin.email = email;
          securityChanged = true;
        }
      }

      if (newPassword) {
        const problem = validatePasswordStrength(newPassword);
        if (problem) return reply.code(400).send({ message: problem });
        if (await admin.checkPassword(newPassword)) {
          return reply.code(400).send({ message: "New password must be different from the current one" });
        }
        await admin.setPassword(newPassword);
        securityChanged = true;
      }

      if (name) admin.name = name.trim();

      // Revoke every other session; keep this browser signed in with a fresh token.
      if (securityChanged) admin.tokenVersion += 1;
      await admin.save();
      if (securityChanged) await reply.setSession(admin);

      request.log.info({ adminId: admin.id, securityChanged }, "Admin credentials updated");
      return { admin: admin.toPublic() };
    },
  );
}
