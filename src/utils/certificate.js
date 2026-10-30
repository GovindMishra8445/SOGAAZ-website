// Where printed QR codes point to. Override with VITE_SITE_URL if the domain changes.
export const SITE_URL = (
  import.meta.env.VITE_SITE_URL || "https://www.sogaaz.ru"
).replace(/\/$/, "");

export const verifyUrl = (documentNumber) =>
  `${SITE_URL}/verify/${encodeURIComponent(documentNumber)}`;

const toDate = (value) => {
  if (!value) return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
};

// Certificate dates are calendar dates stored at 00:00 UTC — format in UTC so
// nobody sees "the day before" because of their timezone.
export const formatDate = (value, opts = {}) => {
  const d = toDate(value);
  if (!d) return "—";
  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
    ...opts,
  });
};

export const formatDateTime = (value) => {
  const d = toDate(value);
  if (!d) return "—";
  return d.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// "2026-03-15T00:00:00.000Z" → "2026-03-15" for <input type="date">
export const toInputDate = (value) => {
  const d = toDate(value);
  return d ? d.toISOString().slice(0, 10) : "";
};

export const daysUntil = (value) => {
  const d = toDate(value);
  if (!d) return null;
  const now = new Date();
  const todayUtc = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.round((d.getTime() - todayUtc) / 86400000);
};

export const STATUS = {
  active: {
    key: "active",
    label: "Active",
    dot: "bg-emerald-500",
    badge: "bg-emerald-50 text-emerald-700 ring-emerald-600/15",
  },
  soon: {
    key: "soon",
    label: "Expiring soon",
    dot: "bg-amber-500",
    badge: "bg-amber-50 text-amber-700 ring-amber-600/20",
  },
  expired: {
    key: "expired",
    label: "Expired",
    dot: "bg-rose-500",
    badge: "bg-rose-50 text-rose-700 ring-rose-600/15",
  },
  unknown: {
    key: "unknown",
    label: "No end date",
    dot: "bg-slate-400",
    badge: "bg-slate-100 text-slate-600 ring-slate-500/15",
  },
};

export const getStatus = (cert) => {
  const days = daysUntil(cert.securityEndDate);
  if (days === null) return STATUS.unknown;
  if (days < 0) return STATUS.expired;
  if (days <= 30) return STATUS.soon;
  return STATUS.active;
};
