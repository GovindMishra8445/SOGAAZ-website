/**
 * One-time copy of every Firestore `certificates` document into MongoDB Atlas.
 *
 *   npm run migrate:firebase            → copy (safe to run again: upserts by Firestore id)
 *   npm run migrate:firebase -- --dry   → only show what would be copied
 *
 * Needs MONGODB_URI in backend/.env. If Firestore rules require login, also set
 * FIREBASE_EMAIL / FIREBASE_PASSWORD (the old Firebase admin login).
 */
import "../src/config/dns.js";
import mongoose from "mongoose";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { Certificate } from "../src/models/Certificate.js";

const DRY_RUN = process.argv.includes("--dry");

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY || "AIzaSyBwSBzJMwZOlgkfb3g1ljet2X6lWO7vYkM",
  authDomain: "sogaaz-918ca.firebaseapp.com",
  projectId: process.env.FIREBASE_PROJECT_ID || "sogaaz-918ca",
};

const toDate = (v) => (v && typeof v.toDate === "function" ? v.toDate() : v ? new Date(v) : null);
const toStr = (v) => (v === undefined || v === null ? "" : String(v).trim());

const fbApp = initializeApp(firebaseConfig);
if (process.env.FIREBASE_EMAIL && process.env.FIREBASE_PASSWORD) {
  await signInWithEmailAndPassword(getAuth(fbApp), process.env.FIREBASE_EMAIL, process.env.FIREBASE_PASSWORD);
  console.log("🔑 Signed in to Firebase");
}

const snap = await getDocs(collection(getFirestore(fbApp), "certificates"));
console.log(`📦 Found ${snap.size} certificates in Firestore`);

const docs = snap.docs.map((d) => {
  const x = d.data();
  const createdAt = toDate(x.createdAt) || new Date();
  return {
    firebaseId: d.id,
    documentNumber: toStr(x.documentNumber),
    shipName: toStr(x.shipName),
    imoNumber: toStr(x.imoNumber),
    shipGRT: toStr(x.shipGRT),
    typeOfShip: toStr(x.typeOfShip),
    insuredParty1: toStr(x.insuredParty1),
    insuredParty2: toStr(x.insuredParty2),
    insurerName: toStr(x.insurerName),
    policyType: toStr(x.policyType),
    shipNationality: toStr(x.shipNationality),
    securityStartDate: toDate(x.securityStartDate),
    securityEndDate: toDate(x.securityEndDate),
    remarks: toStr(x.remarks),
    createdAt,
    updatedAt: createdAt,
  };
});

const seen = new Map();
for (const d of docs) {
  const key = d.documentNumber.toLowerCase();
  if (seen.has(key)) console.warn(`⚠️  Duplicate document number "${d.documentNumber}" (${seen.get(key)} & ${d.firebaseId}) — both kept`);
  else seen.set(key, d.firebaseId);
  if (!d.documentNumber) console.warn(`⚠️  ${d.firebaseId} has no document number`);
}

if (DRY_RUN) {
  console.table(docs.map((d) => ({ id: d.firebaseId, doc: d.documentNumber, ship: d.shipName, imo: d.imoNumber })));
  console.log("Dry run — nothing written.");
  process.exit(0);
}

if (!process.env.MONGODB_URI) {
  console.error("❌ MONGODB_URI is not set (add it to backend/.env)");
  process.exit(1);
}
await mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 15000 });
await Certificate.syncIndexes();

const result = await Certificate.bulkWrite(
  docs.map((d) => ({
    updateOne: { filter: { firebaseId: d.firebaseId }, update: { $set: d }, upsert: true },
  })),
  { timestamps: false },
);

console.log(`✅ Done — inserted ${result.upsertedCount}, updated ${result.modifiedCount}, unchanged ${result.matchedCount - result.modifiedCount}`);
console.log(`📊 MongoDB now holds ${await Certificate.countDocuments()} certificates`);
await mongoose.disconnect();
process.exit(0);
