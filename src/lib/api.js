// All calls go to "/api" — Vite proxies it to the local backend in dev,
// and vercel.json rewrites it to the Render backend in production
// (same origin → the httpOnly session cookie works in every browser).
const API_BASE = (import.meta.env.VITE_API_URL || "/api").replace(/\/$/, "");

export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

const request = async (path, { method = "GET", body, signal } = {}) => {
  let res;
  try {
    res = await fetch(`${API_BASE}${path}`, {
      method,
      credentials: "include",
      headers:
        body !== undefined ? { "Content-Type": "application/json" } : undefined,
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal,
    });
  } catch (err) {
    if (err.name === "AbortError") throw err;
    throw new ApiError(
      "Cannot reach the server. Please check your connection.",
      0,
    );
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const message =
      data.message ||
      (res.status === 429
        ? "Too many requests. Please wait a moment."
        : "Something went wrong");
    throw new ApiError(message, res.status);
  }
  return data;
};

export const api = {
  get: (path, opts) => request(path, opts),
  post: (path, body, opts) => request(path, { ...opts, method: "POST", body }),
  put: (path, body, opts) => request(path, { ...opts, method: "PUT", body }),
  delete: (path, opts) => request(path, { ...opts, method: "DELETE" }),
};

/* ── Auth ── */
export const authApi = {
  me: () => api.get("/auth/me"),
  login: (email, password) => api.post("/auth/login", { email, password }),
  logout: () => api.post("/auth/logout", {}),
  updateCredentials: (payload) => api.put("/auth/credentials", payload),
};

/* ── Certificates ── */
export const certificateApi = {
  list: () => api.get("/admin/certificates"),
  create: (payload) => api.post("/admin/certificates", payload),
  update: (id, payload) => api.put(`/admin/certificates/${id}`, payload),
  remove: (id) => api.delete(`/admin/certificates/${id}`),
  verify: ({ documentNumber, imo }) => {
    const qs = new URLSearchParams(
      documentNumber ? { documentNumber } : { imo },
    );
    return api.get(`/certificates/verify?${qs}`);
  },
};
