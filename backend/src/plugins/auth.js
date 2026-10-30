import fp from "fastify-plugin";
import cookie from "@fastify/cookie";
import jwt from "@fastify/jwt";
import { env } from "../config/env.js";
import { Admin } from "../models/Admin.js";

export const COOKIE_NAME = "sogaaz_admin";

const durationToMs = (value) => {
  const m = /^(\d+)\s*([smhd])$/.exec(value);
  if (!m) return 8 * 60 * 60 * 1000;
  return Number(m[1]) * { s: 1e3, m: 6e4, h: 36e5, d: 864e5 }[m[2]];
};

export default fp(async (app) => {
  await app.register(cookie);
  await app.register(jwt, {
    secret: env.jwtSecret,
    cookie: { cookieName: COOKIE_NAME, signed: false },
    sign: { expiresIn: env.jwtExpiresIn, algorithm: "HS256" },
    verify: { algorithms: ["HS256"] },
  });

  const cookieOptions = {
    httpOnly: true,
    secure: env.cookieSecure,
    sameSite: env.cookieSameSite,
    path: "/api",
  };

  app.decorateReply("setSession", async function (admin) {
    const token = await this.jwtSign({ sub: admin._id.toString(), tv: admin.tokenVersion });
    this.setCookie(COOKIE_NAME, token, {
      ...cookieOptions,
      maxAge: Math.floor(durationToMs(env.jwtExpiresIn) / 1000),
    });
  });

  app.decorateReply("clearSession", function () {
    this.clearCookie(COOKIE_NAME, cookieOptions);
  });

  // preHandler for protected routes: valid JWT + admin still exists + token not revoked.
  app.decorate("authenticate", async (request, reply) => {
    let payload;
    try {
      payload = await request.jwtVerify();
    } catch {
      return reply.code(401).send({ message: "Not authenticated" });
    }
    const admin = await Admin.findById(payload.sub);
    if (!admin || admin.tokenVersion !== payload.tv) {
      reply.clearSession();
      return reply.code(401).send({ message: "Session expired. Please sign in again." });
    }
    request.admin = admin;
  });
});
