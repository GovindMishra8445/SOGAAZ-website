import mongoose from "mongoose";
import { env } from "./env.js";

mongoose.set("strictQuery", true);
// Never let user input turn into query operators like { $gt: "" }.
mongoose.set("sanitizeFilter", true);

export const connectDB = async (logger = console) => {
  mongoose.connection.on("disconnected", () => logger.warn("MongoDB disconnected"));
  mongoose.connection.on("reconnected", () => logger.info("MongoDB reconnected"));

  await mongoose.connect(env.mongoUri, {
    serverSelectionTimeoutMS: 15000,
    maxPoolSize: 10,
  });
  logger.info(`MongoDB connected (db: ${mongoose.connection.name})`);
};

export const disconnectDB = () => mongoose.disconnect();
