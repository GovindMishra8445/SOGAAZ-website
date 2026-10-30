const DATE_ONLY = /^\d{4}-\d{2}-\d{2}$/;

/**
 * "" / null / undefined → null (no date)
 * "YYYY-MM-DD"          → Date at 00:00 UTC (calendar date, timezone-proof)
 * full ISO string       → Date
 * anything unparsable   → undefined (caller should reject)
 */
export const parseDate = (value) => {
  if (value === null || value === undefined || value === "") return null;
  if (typeof value !== "string") return undefined;
  const d = DATE_ONLY.test(value) ? new Date(`${value}T00:00:00.000Z`) : new Date(value);
  return Number.isNaN(d.getTime()) ? undefined : d;
};
