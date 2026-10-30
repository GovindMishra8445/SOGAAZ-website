import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const BCRYPT_ROUNDS = 12;
export const MAX_FAILED_LOGINS = 5;
export const LOCK_TIME_MS = 15 * 60 * 1000;

const adminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      maxlength: 254,
    },
    name: { type: String, trim: true, maxlength: 80, default: "Administrator" },
    passwordHash: { type: String, required: true, select: false },
    // Bumped on password change / logout-everywhere → invalidates old JWTs.
    tokenVersion: { type: Number, default: 0 },
    failedLogins: { type: Number, default: 0 },
    lockUntil: { type: Date, default: null },
    lastLoginAt: { type: Date, default: null },
    passwordChangedAt: { type: Date, default: null },
  },
  { timestamps: true },
);

adminSchema.methods.setPassword = async function (plain) {
  this.passwordHash = await bcrypt.hash(plain, BCRYPT_ROUNDS);
  this.passwordChangedAt = new Date();
};

adminSchema.methods.checkPassword = function (plain) {
  return bcrypt.compare(plain, this.passwordHash);
};

adminSchema.methods.isLocked = function () {
  return Boolean(this.lockUntil && this.lockUntil > new Date());
};

adminSchema.methods.toPublic = function () {
  return {
    id: this._id.toString(),
    email: this.email,
    name: this.name,
    lastLoginAt: this.lastLoginAt,
    passwordChangedAt: this.passwordChangedAt,
  };
};

export const Admin = mongoose.model("Admin", adminSchema);

// Same rules on the API and in the CLI script.
export const validatePasswordStrength = (password) => {
  if (typeof password !== "string" || password.length < 10)
    return "Password must be at least 10 characters long";
  if (password.length > 128) return "Password must be at most 128 characters long";
  if (!/[a-z]/.test(password) || !/[A-Z]/.test(password))
    return "Password must contain both upper and lower case letters";
  if (!/\d/.test(password)) return "Password must contain at least one number";
  if (!/[^A-Za-z0-9]/.test(password))
    return "Password must contain at least one special character";
  return null;
};
