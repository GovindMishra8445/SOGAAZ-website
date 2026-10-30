import fp from "fastify-plugin";
import helmet from "@fastify/helmet";
import cors from "@fastify/cors";
import rateLimit from "@fastify/rate-limit";
import { env } from "../config/env.js";

const DEV_ORIGINS = ["http://localhost:5173", "http://127.0.0.1:5173"];
const UNSAFE_METHODS = new Set(["POST", "PUT", "PATCH", "DELETE"]);

export default fp(async (app) => {
  const allowedOrigins = new Set([
    ...env.corsOrigins,
    ...(env.isProduction ? [] : DEV_ORIGINS),
  ]);
  const isAllowedOrigin = (origin) => allowedOrigins.has(origin.replace(/\/$/, ""));

  /* ── HTTPS only in production (Render terminates TLS and sets x-forwarded-proto) ── */
  app.addHook("onRequest", async (request, reply) => {
    if (env.isProduction && request.headers["x-forwarded-proto"] === "http") {
      if (request.method === "GET" || request.method === "HEAD") {
        return reply.redirect(`https://${request.hostname}${request.url}`, 301);
      }
      return reply.code(403).send({ message: "HTTPS is required" });
    }
  });

  /* ── Secure headers (API returns JSON only, so the CSP is fully locked down) ── */
  await app.register(helmet, {
    contentSecurityPolicy: {
      useDefaults: false,
      directives: {
        defaultSrc: ["'none'"],
        frameAncestors: ["'none'"],
        baseUri: ["'none'"],
        formAction: ["'none'"],
      },
    },
    crossOriginResourcePolicy: { policy: "same-site" },
    referrerPolicy: { policy: "no-referrer" },
    hsts: env.isProduction
      ? { maxAge: 31536000, includeSubDomains: true, preload: true }
      : false,
  });

  /* ── CORS: only the configured frontend origins, with credentials ── */
  await app.register(cors, {
    origin: (origin, cb) => {
      // Same-origin requests (via the Vercel /api proxy), curl and health checks have no Origin.
      if (!origin || isAllowedOrigin(origin)) return cb(null, true);
      cb(null, false);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
    maxAge: 600,
  });

  /* ── CSRF defence in depth: state-changing requests must come from an allowed origin ── */
  app.addHook("onRequest", async (request, reply) => {
    if (!UNSAFE_METHODS.has(request.method)) return;
    const origin = request.headers.origin;
    if (origin && !isAllowedOrigin(origin)) {
      request.log.warn({ origin }, "Blocked request from disallowed origin");
      return reply.code(403).send({ message: "Origin not allowed" });
    }
  });

  /* ── Global rate limit (routes can tighten it further) ── */
  await app.register(rateLimit, {
    global: true,
    max: 300,
    timeWindow: "1 minute",
    errorResponseBuilder: (_req, ctx) => ({
      statusCode: 429,
      message: `Too many requests. Please try again in ${Math.ceil(ctx.ttl / 1000)} seconds.`,
    }),
  });
});
