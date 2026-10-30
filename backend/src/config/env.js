import "./dns.js";

const required = (name) => {
  const value = process.env[name]?.trim();
  if (!value) {
    console.error(`❌ Missing required environment variable: ${name}`);
    process.exit(1);
  }
  return value;
};

const list = (value) =>
  (value || "")
    .split(",")
    .map((v) => v.trim().replace(/\/$/, ""))
    .filter(Boolean);

const isProduction = process.env.NODE_ENV === "production";

const jwtSecret = required("JWT_SECRET");
if (jwtSecret.length < 32) {
  console.error("❌ JWT_SECRET must be at least 32 characters long");
  process.exit(1);
}

const sameSite = (process.env.COOKIE_SAMESITE || "strict").toLowerCase();
if (!["strict", "lax", "none"].includes(sameSite)) {
  console.error("❌ COOKIE_SAMESITE must be one of: strict, lax, none");
  process.exit(1);
}

export const env = {
  isProduction,
  port: Number(process.env.PORT) || 5000,
  host: process.env.HOST || "0.0.0.0",
  mongoUri: required("MONGODB_URI"),
  jwtSecret,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "8h",
  corsOrigins: list(process.env.CORS_ORIGINS),
  cookieSameSite: sameSite,
  // Cookies are always Secure in production (Render serves HTTPS).
  cookieSecure: isProduction || sameSite === "none",
  adminEmail: process.env.ADMIN_EMAIL?.trim().toLowerCase() || "",
  adminPassword: process.env.ADMIN_PASSWORD || "",
  logLevel: process.env.LOG_LEVEL || (isProduction ? "info" : "debug"),
};
