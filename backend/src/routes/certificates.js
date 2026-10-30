import mongoose from "mongoose";
import { Certificate, CI_COLLATION } from "../models/Certificate.js";
import { parseDate } from "../utils/dates.js";

const text = (max) => ({ type: "string", maxLength: max });
const dateField = { type: ["string", "null"], maxLength: 40 };

const certificateBody = {
  type: "object",
  required: ["documentNumber"],
  additionalProperties: false,
  properties: {
    documentNumber: { type: "string", minLength: 1, maxLength: 100, pattern: "\\S" },
    shipName: text(200),
    imoNumber: text(50),
    shipGRT: text(50),
    typeOfShip: text(120),
    insuredParty1: text(300),
    insuredParty2: text(300),
    insurerName: text(200),
    policyType: text(120),
    shipNationality: text(120),
    securityStartDate: dateField,
    securityEndDate: dateField,
    remarks: text(2000),
  },
};

const idParams = {
  type: "object",
  required: ["id"],
  properties: { id: { type: "string", pattern: "^[a-fA-F0-9]{24}$" } },
};

const toDoc = (body) => {
  const doc = {};
  for (const [key, value] of Object.entries(body)) {
    if (key === "securityStartDate" || key === "securityEndDate") continue;
    doc[key] = typeof value === "string" ? value.trim() : value;
  }
  const start = parseDate(body.securityStartDate);
  const end = parseDate(body.securityEndDate);
  if (start === undefined || end === undefined) {
    const err = new Error("Invalid date. Use the format YYYY-MM-DD.");
    err.statusCode = 400;
    throw err;
  }
  if (start && end && end < start) {
    const err = new Error("Security end date cannot be before the start date");
    err.statusCode = 400;
    throw err;
  }
  doc.securityStartDate = start;
  doc.securityEndDate = end;
  return doc;
};

const duplicateExists = (documentNumber, excludeId) =>
  Certificate.findOne({
    documentNumber,
    // trusted(): our own operator, not user input (sanitizeFilter would strip it).
    ...(excludeId && { _id: mongoose.trusted({ $ne: new mongoose.Types.ObjectId(excludeId) }) }),
  })
    .collation(CI_COLLATION)
    .select("_id")
    .lean();

/* ─────────────── Admin (protected) ─────────────── */
export async function adminCertificateRoutes(app) {
  app.addHook("preHandler", app.authenticate);

  app.get("/", async () => {
    const certs = await Certificate.find().sort({ createdAt: -1 }).limit(10000);
    return { certificates: certs.map((c) => c.toAdmin()) };
  });

  app.post("/", { schema: { body: certificateBody } }, async (request, reply) => {
    const doc = toDoc(request.body);
    if (await duplicateExists(doc.documentNumber)) {
      return reply.code(409).send({ message: `Document number "${doc.documentNumber}" already exists` });
    }
    const cert = await Certificate.create({
      ...doc,
      createdBy: request.admin._id,
      updatedBy: request.admin._id,
    });
    request.log.info({ certId: cert.id, adminId: request.admin.id }, "Certificate created");
    return reply.code(201).send({ certificate: cert.toAdmin() });
  });

  app.put(
    "/:id",
    { schema: { params: idParams, body: certificateBody } },
    async (request, reply) => {
      const { id } = request.params;
      const doc = toDoc(request.body);
      if (await duplicateExists(doc.documentNumber, id)) {
        return reply.code(409).send({ message: `Document number "${doc.documentNumber}" already exists` });
      }
      const cert = await Certificate.findByIdAndUpdate(
        id,
        { ...doc, updatedBy: request.admin._id },
        { new: true, runValidators: true },
      );
      if (!cert) return reply.code(404).send({ message: "Certificate not found" });
      request.log.info({ certId: id, adminId: request.admin.id }, "Certificate updated");
      return { certificate: cert.toAdmin() };
    },
  );

  app.delete("/:id", { schema: { params: idParams } }, async (request, reply) => {
    const cert = await Certificate.findByIdAndDelete(request.params.id);
    if (!cert) return reply.code(404).send({ message: "Certificate not found" });
    request.log.info(
      { certId: request.params.id, documentNumber: cert.documentNumber, adminId: request.admin.id },
      "Certificate deleted",
    );
    return { ok: true };
  });
}

/* ─────────────── Public verification ─────────────── */
export async function publicCertificateRoutes(app) {
  app.get(
    "/verify",
    {
      config: { rateLimit: { max: 30, timeWindow: "1 minute" } },
      schema: {
        querystring: {
          type: "object",
          additionalProperties: false,
          properties: {
            documentNumber: { type: "string", minLength: 1, maxLength: 100 },
            imo: { type: "string", minLength: 1, maxLength: 50 },
          },
        },
      },
    },
    async (request, reply) => {
      const documentNumber = request.query.documentNumber?.trim();
      const imo = request.query.imo?.trim();

      if (!documentNumber === !imo) {
        return reply.code(400).send({ message: "Provide either a document number or an IMO number" });
      }

      // One vessel (IMO) usually holds several certificates (P&I, H&M, MLC, …) — return them all.
      const filter = documentNumber ? { documentNumber } : { imoNumber: imo };
      const certs = await Certificate.find(filter)
        .collation(CI_COLLATION)
        .sort({ securityEndDate: -1, createdAt: -1 })
        .limit(50);

      if (!certs.length) return reply.code(404).send({ message: "No matching certificate found" });
      return { certificates: certs.map((c) => c.toPublic()) };
    },
  );
}

