import Fastify from "fastify";
import mongoose from "mongoose";
import { env } from "./config/env.js";
import securityPlugin from "./plugins/security.js";
import authPlugin from "./plugins/auth.js";
import authRoutes from "./routes/auth.js";
import {
  adminCertificateRoutes,
  publicCertificateRoutes,
} from "./routes/certificates.js";

export const buildApp = async () => {
  const app = Fastify({
    logger: {
      level: env.logLevel,
      redact: {
        paths: ["req.headers.cookie", "req.headers.authorization", "res.headers['set-cookie']"],
        remove: true,
      },
    },
    // Render (and the Vercel /api proxy) sit in front of the app.
    trustProxy: true,
    bodyLimit: 100 * 1024,
    ajv: { customOptions: { removeAdditional: false, allErrors: false } },
  });

  await app.register(securityPlugin);
  await app.register(authPlugin);

  app.setErrorHandler((error, request, reply) => {
    if (error.validation) {
      return reply.code(400).send({ message: `Invalid request: ${error.message}` });
    }
    const status = error.statusCode && error.statusCode < 600 ? error.statusCode : 500;
    if (status >= 500) request.log.error(error);
    reply.code(status).send({
      message: status >= 500 && env.isProduction ? "Internal server error" : error.message,
    });
  });

  app.setNotFoundHandler((_request, reply) => reply.code(404).send({ message: "Not found" }));

  app.get("/", async () => ({ name: "SOGAAZ API", status: "ok" }));

  app.get("/api/health", { config: { rateLimit: false } }, async (_request, reply) => {
    const dbUp = mongoose.connection.readyState === 1;
    return reply.code(dbUp ? 200 : 503).send({
      status: dbUp ? "ok" : "degraded",
      db: dbUp ? "connected" : "disconnected",
      uptime: Math.round(process.uptime()),
    });
  });

  await app.register(authRoutes, { prefix: "/api/auth" });
  await app.register(adminCertificateRoutes, { prefix: "/api/admin/certificates" });
  await app.register(publicCertificateRoutes, { prefix: "/api/certificates" });

  return app;
};
