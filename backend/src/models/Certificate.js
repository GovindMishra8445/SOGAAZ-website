import mongoose from "mongoose";

// Case-insensitive matching for document / IMO numbers.
export const CI_COLLATION = { locale: "en", strength: 2 };

const str = (max) => ({ type: String, trim: true, maxlength: max, default: "" });

const certificateSchema = new mongoose.Schema(
  {
    documentNumber: { type: String, required: true, trim: true, maxlength: 100 },
    shipName: str(200),
    imoNumber: str(50),
    shipGRT: str(50),
    typeOfShip: str(120),
    insuredParty1: str(300),
    insuredParty2: str(300),
    insurerName: str(200),
    policyType: str(120),
    shipNationality: str(120),
    securityStartDate: { type: Date, default: null },
    securityEndDate: { type: Date, default: null },
    remarks: str(2000),
    // Original Firestore document id (set by the migration script).
    firebaseId: { type: String, default: undefined },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin", default: null },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin", default: null },
  },
  { timestamps: true },
);

certificateSchema.index({ documentNumber: 1 }, { collation: CI_COLLATION });
certificateSchema.index({ imoNumber: 1 }, { collation: CI_COLLATION });
certificateSchema.index({ createdAt: -1 });
certificateSchema.index({ firebaseId: 1 }, { unique: true, sparse: true });

const ADMIN_FIELDS = [
  "documentNumber", "shipName", "imoNumber", "shipGRT", "typeOfShip",
  "insuredParty1", "insuredParty2", "insurerName", "policyType",
  "shipNationality", "securityStartDate", "securityEndDate", "remarks",
];

certificateSchema.methods.toAdmin = function () {
  const out = { id: this._id.toString() };
  for (const f of ADMIN_FIELDS) out[f] = this[f];
  out.createdAt = this.createdAt;
  out.updatedAt = this.updatedAt;
  return out;
};

// What the public verification page is allowed to see.
certificateSchema.methods.toPublic = function () {
  const out = {};
  for (const f of ADMIN_FIELDS) out[f] = this[f];
  return out;
};

export const Certificate = mongoose.model("Certificate", certificateSchema);
