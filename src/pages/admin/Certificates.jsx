import { useEffect, useMemo, useRef, useState } from "react";
import { useOutletContext, useSearchParams } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  CalendarRange,
  ChevronLeft,
  ChevronRight,
  Copy,
  Download,
  ExternalLink,
  FilePlus2,
  FileText,
  Pencil,
  Plus,
  QrCode,
  Search,
  Ship,
  SlidersHorizontal,
  Trash2,
  Users,
  X,
} from "lucide-react";
import { toast } from "react-toastify";
import { certificateApi } from "../../lib/api";
import {
  Button,
  Card,
  ConfirmDialog,
  EmptyState,
  FormField,
  IconButton,
  Modal,
  Portal,
  Skeleton,
  StatusBadge,
  inputClass,
} from "../../components/admin/ui";
import {
  STATUS,
  daysUntil,
  formatDate,
  formatDateTime,
  getStatus,
  toInputDate,
  verifyUrl,
} from "../../utils/certificate";

const EMPTY_FORM = {
  documentNumber: "",
  policyType: "",
  insurerName: "",
  shipName: "",
  imoNumber: "",
  typeOfShip: "",
  shipGRT: "",
  shipNationality: "",
  insuredParty1: "",
  insuredParty2: "",
  securityStartDate: "",
  securityEndDate: "",
  remarks: "",
};

const STATUS_TABS = [
  { key: "", label: "All" },
  { key: "active", label: "Active" },
  { key: "soon", label: "Expiring soon" },
  { key: "expired", label: "Expired" },
  { key: "unknown", label: "No end date" },
];

const SORTS = {
  documentNumber: (c) => c.documentNumber?.toLowerCase() || "",
  shipName: (c) => c.shipName?.toLowerCase() || "",
  securityEndDate: (c) =>
    c.securityEndDate ? new Date(c.securityEndDate).getTime() : Infinity,
  createdAt: (c) => new Date(c.createdAt).getTime(),
};

const PAGE_SIZES = [10, 25, 50, 100];

const unique = (list, key) =>
  [...new Set(list.map((c) => c[key]?.trim()).filter(Boolean))].sort((a, b) =>
    a.localeCompare(b),
  );

/* ─── CSV export (with formula-injection protection) ─── */
const exportCsv = (rows) => {
  const cols = [
    ["Document number", "documentNumber"],
    ["Policy type", "policyType"],
    ["Insurer", "insurerName"],
    ["Ship name", "shipName"],
    ["IMO", "imoNumber"],
    ["Type of ship", "typeOfShip"],
    ["GRT", "shipGRT"],
    ["Nationality", "shipNationality"],
    ["1st insured party", "insuredParty1"],
    ["2nd insured party", "insuredParty2"],
    ["Start date", "securityStartDate"],
    ["End date", "securityEndDate"],
    ["Status", "status"],
    ["Remarks", "remarks"],
    ["Created", "createdAt"],
  ];
  const cell = (v) => {
    let s = v == null ? "" : String(v);
    if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`;
    return `"${s.replace(/"/g, '""')}"`;
  };
  const lines = [cols.map(([h]) => cell(h)).join(",")];
  for (const r of rows) {
    lines.push(
      cols
        .map(([, k]) => {
          if (k === "status") return cell(getStatus(r).label);
          if (
            k === "securityStartDate" ||
            k === "securityEndDate" ||
            k === "createdAt"
          )
            return cell(toInputDate(r[k]));
          return cell(r[k]);
        })
        .join(","),
    );
  }
  const blob = new Blob(["﻿" + lines.join("\r\n")], {
    type: "text/csv;charset=utf-8",
  });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `sogaaz-certificates-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(a.href);
};

/* ─── Small pieces ─── */
const SortHeader = ({ label, field, sort, onSort, className = "" }) => {
  const active = sort.field === field;
  const Icon = !active ? ArrowUpDown : sort.dir === "asc" ? ArrowUp : ArrowDown;
  return (
    <th className={`px-4 py-3 text-left ${className}`}>
      <button
        onClick={() => onSort(field)}
        className={`inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider transition-colors ${active ? "text-[#0A1172]" : "text-slate-500 hover:text-slate-700"}`}
      >
        {label}
        <Icon size={12} className={active ? "" : "opacity-40"} />
      </button>
    </th>
  );
};

const DaysLeft = ({ value }) => {
  const days = daysUntil(value);
  if (days === null) return null;
  if (days < 0)
    return (
      <span className="text-[11.5px] text-rose-500">{Math.abs(days)}d ago</span>
    );
  return (
    <span
      className={`text-[11.5px] ${days <= 30 ? "text-amber-600 font-medium" : "text-slate-400"}`}
    >
      {days === 0 ? "ends today" : `${days}d left`}
    </span>
  );
};

const FormSection = ({ icon: Icon, title, children }) => (
  <section className="px-6 py-5">
    <div className="mb-4 flex items-center gap-2">
      <Icon size={15} className="text-[#c9a84c]" />
      <h3 className="text-[11.5px] font-semibold uppercase tracking-[.14em] text-slate-500">
        {title}
      </h3>
    </div>
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">{children}</div>
  </section>
);

/* ─── Detail slide-over ─── */
const DetailDrawer = ({ cert, onClose, onEdit, onDelete }) => {
  const qrRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const url = verifyUrl(cert.documentNumber);
  const status = getStatus(cert);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Verification link copied");
    } catch {
      toast.error("Could not copy the link");
    }
  };

  const downloadQr = () => {
    const canvas = qrRef.current;
    if (!canvas) return;
    const a = document.createElement("a");
    a.href = canvas.toDataURL("image/png");
    a.download = `QR-${cert.documentNumber.replace(/[^\w-]+/g, "_")}.png`;
    a.click();
  };

  const rows = [
    ["Policy type", cert.policyType],
    ["Insurer", cert.insurerName],
    ["Vessel name", cert.shipName],
    ["IMO number", cert.imoNumber],
    ["Type of ship", cert.typeOfShip],
    ["Gross tonnage (GRT)", cert.shipGRT],
    ["Nationality / flag", cert.shipNationality],
    ["1st insured party", cert.insuredParty1],
    ["2nd insured party", cert.insuredParty2],
    ["Cover starts", formatDate(cert.securityStartDate)],
    ["Cover ends", formatDate(cert.securityEndDate)],
  ];

  return (
    <Portal>
      <div className="fixed inset-0 z-[90] font-body">
        <div
          className="absolute inset-0 bg-[#050c2e]/40 backdrop-blur-[2px]"
          onClick={onClose}
        />
        <aside className="admin-slide-in absolute inset-y-0 right-0 flex w-full max-w-[480px] flex-col bg-white shadow-2xl">
          <div className="relative overflow-hidden bg-[#050c2e] px-6 pb-6 pt-5 text-white">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(24,77,229,.45),transparent_65%)]" />
            <div className="relative flex items-center justify-between">
              <p className="text-[11px] uppercase tracking-[.2em] text-[#c9a84c]">
                Certificate
              </p>
              <button
                onClick={onClose}
                aria-label="Close"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-white/60 hover:bg-white/10 hover:text-white"
              >
                <X size={17} />
              </button>
            </div>
            <h2 className="relative mt-2 break-words font-display text-[28px] font-semibold leading-tight">
              {cert.documentNumber}
            </h2>
            <div className="relative mt-3 flex flex-wrap items-center gap-2">
              <StatusBadge status={status} className="!ring-0" />
              <DaysLeft value={cert.securityEndDate} />
            </div>
          </div>

          <div className="admin-scroll flex-1 overflow-y-auto">
            <div className="m-6 flex items-center gap-4 rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100">
              <div className="rounded-xl bg-white p-2 shadow-sm ring-1 ring-slate-100">
                <QRCodeCanvas
                  ref={qrRef}
                  value={url}
                  size={180}
                  level="M"
                  marginSize={2}
                  style={{ width: 92, height: 92 }}
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-medium text-slate-900">
                  Verification QR code
                </p>
                <p
                  className="mt-0.5 truncate text-xs text-slate-500"
                  title={url}
                >
                  {url}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  <Button
                    size="sm"
                    variant="secondary"
                    icon={Download}
                    onClick={downloadQr}
                  >
                    PNG
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    icon={Copy}
                    onClick={copyLink}
                  >
                    Copy link
                  </Button>
                </div>
              </div>
            </div>

            <dl className="mx-6 divide-y divide-slate-100 rounded-2xl ring-1 ring-slate-100">
              {rows.map(([k, v]) => (
                <div
                  key={k}
                  className="grid grid-cols-[150px_1fr] gap-3 px-4 py-3"
                >
                  <dt className="text-[12.5px] text-slate-500">{k}</dt>
                  <dd className="break-words text-[13px] font-medium text-slate-900">
                    {v || "—"}
                  </dd>
                </div>
              ))}
            </dl>

            {cert.remarks && (
              <div className="mx-6 mt-4 rounded-2xl bg-amber-50/50 p-4 ring-1 ring-amber-100">
                <p className="text-[11.5px] font-semibold uppercase tracking-wider text-amber-700/70">
                  Remarks
                </p>
                <p className="mt-1 whitespace-pre-wrap text-[13px] text-slate-700">
                  {cert.remarks}
                </p>
              </div>
            )}

            <p className="mx-6 my-5 text-[11.5px] text-slate-400">
              Created {formatDateTime(cert.createdAt)} · Updated{" "}
              {formatDateTime(cert.updatedAt)}
            </p>
          </div>

          <div className="flex gap-2 border-t border-slate-100 bg-slate-50/70 px-6 py-4">
            <Button
              variant="secondary"
              icon={Trash2}
              onClick={onDelete}
              className="!text-rose-600"
            >
              Delete
            </Button>
            <a
              href={`/verify/${encodeURIComponent(cert.documentNumber)}`}
              target="_blank"
              rel="noreferrer"
              className="ml-auto"
            >
              <Button variant="secondary" icon={ExternalLink}>
                Preview
              </Button>
            </a>
            <Button icon={Pencil} onClick={onEdit}>
              Edit
            </Button>
          </div>
        </aside>
      </div>
    </Portal>
  );
};

/* ═════════════════════════════════════════════════════════════ */
const Certificates = () => {
  const {
    certificates,
    setCertificates,
    loadingCerts: loading,
    handleApiError,
  } = useOutletContext();
  const [params, setParams] = useSearchParams();

  const [search, setSearch] = useState(params.get("q") || "");
  const [statusTab, setStatusTab] = useState(params.get("status") || "");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filters, setFilters] = useState({
    policyType: "",
    shipNationality: "",
    typeOfShip: "",
  });
  const [sort, setSort] = useState({ field: "createdAt", dir: "desc" });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});

  const [viewing, setViewing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [deleteBusy, setDeleteBusy] = useState(false);

  /* Open "new" form from header button (?new=1) */
  useEffect(() => {
    if (params.get("new") === "1") {
      openCreate();
      params.delete("new");
      setParams(params, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  const options = useMemo(
    () => ({
      policyType: unique(certificates, "policyType"),
      shipNationality: unique(certificates, "shipNationality"),
      typeOfShip: unique(certificates, "typeOfShip"),
    }),
    [certificates],
  );

  const statusCounts = useMemo(() => {
    const c = {
      "": certificates.length,
      active: 0,
      soon: 0,
      expired: 0,
      unknown: 0,
    };
    for (const cert of certificates) c[getStatus(cert).key] += 1;
    return c;
  }, [certificates]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const list = certificates.filter((c) => {
      if (statusTab && getStatus(c).key !== statusTab) return false;
      for (const [k, v] of Object.entries(filters))
        if (v && c[k] !== v) return false;
      if (!q) return true;
      return [
        c.documentNumber,
        c.shipName,
        c.imoNumber,
        c.insurerName,
        c.policyType,
        c.shipNationality,
        c.insuredParty1,
        c.insuredParty2,
        c.typeOfShip,
      ].some((v) => v?.toLowerCase().includes(q));
    });
    const key = SORTS[sort.field];
    const dir = sort.dir === "asc" ? 1 : -1;
    return list.sort((a, b) =>
      key(a) > key(b) ? dir : key(a) < key(b) ? -dir : 0,
    );
  }, [certificates, search, statusTab, filters, sort]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const pageRows = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );
  const activeFilters = Object.values(filters).filter(Boolean).length;

  useEffect(() => setPage(1), [search, statusTab, filters, pageSize]);

  const onSort = (field) =>
    setSort((s) =>
      s.field === field
        ? { field, dir: s.dir === "asc" ? "desc" : "asc" }
        : { field, dir: field === "createdAt" ? "desc" : "asc" },
    );

  const clearAll = () => {
    setSearch("");
    setStatusTab("");
    setFilters({ policyType: "", shipNationality: "", typeOfShip: "" });
  };

  /* ── Form ── */
  function openCreate() {
    setForm(EMPTY_FORM);
    setEditingId(null);
    setErrors({});
    setFormOpen(true);
  }

  const openEdit = (cert) => {
    const next = { ...EMPTY_FORM };
    for (const k of Object.keys(EMPTY_FORM)) next[k] = cert[k] ?? "";
    next.securityStartDate = toInputDate(cert.securityStartDate);
    next.securityEndDate = toInputDate(cert.securityEndDate);
    setForm(next);
    setEditingId(cert.id);
    setErrors({});
    setViewing(null);
    setFormOpen(true);
  };

  const closeForm = () => !saving && setFormOpen(false);

  const onChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    if (errors[e.target.name])
      setErrors((er) => ({ ...er, [e.target.name]: undefined }));
  };

  const validate = () => {
    const er = {};
    const doc = form.documentNumber.trim();
    if (!doc) er.documentNumber = "Document number is required";
    else if (
      certificates.some(
        (c) =>
          c.id !== editingId &&
          c.documentNumber.trim().toLowerCase() === doc.toLowerCase(),
      )
    )
      er.documentNumber = "A certificate with this number already exists";
    if (
      form.securityStartDate &&
      form.securityEndDate &&
      form.securityEndDate < form.securityStartDate
    )
      er.securityEndDate = "End date must be on or after the start date";
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSaving(true);
    const payload = Object.fromEntries(
      Object.entries(form).map(([k, v]) => [
        k,
        typeof v === "string" ? v.trim() : v,
      ]),
    );
    payload.securityStartDate = payload.securityStartDate || null;
    payload.securityEndDate = payload.securityEndDate || null;
    try {
      if (editingId) {
        const { certificate } = await certificateApi.update(editingId, payload);
        setCertificates((list) =>
          list.map((c) => (c.id === editingId ? certificate : c)),
        );
        toast.success("Certificate updated");
      } else {
        const { certificate } = await certificateApi.create(payload);
        setCertificates((list) => [certificate, ...list]);
        toast.success("Certificate created");
      }
      setFormOpen(false);
    } catch (err) {
      if (err.status === 409) setErrors({ documentNumber: err.message });
      handleApiError(err, "Could not save the certificate");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setDeleteBusy(true);
    try {
      await certificateApi.remove(deleting.id);
      setCertificates((list) => list.filter((c) => c.id !== deleting.id));
      toast.success("Certificate deleted");
      setDeleting(null);
      setViewing(null);
    } catch (err) {
      handleApiError(err, "Could not delete the certificate");
    } finally {
      setDeleteBusy(false);
    }
  };

  const field = (name, label, props = {}) => (
    <FormField
      label={label}
      required={props.required}
      error={errors[name]}
      hint={props.hint}
      className={props.wide ? "sm:col-span-2" : ""}
    >
      {props.textarea ? (
        <textarea
          name={name}
          value={form[name]}
          onChange={onChange}
          rows={3}
          maxLength={props.maxLength}
          placeholder={props.placeholder}
          className={`${inputClass} h-auto py-2.5 resize-y`}
        />
      ) : (
        <input
          name={name}
          value={form[name]}
          onChange={onChange}
          type={props.type || "text"}
          maxLength={props.maxLength}
          placeholder={props.placeholder}
          list={props.list}
          autoFocus={props.autoFocus}
          className={`${inputClass} ${errors[name] ? "!ring-rose-400" : ""}`}
        />
      )}
    </FormField>
  );

  /* ── Render ── */
  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-display text-[30px] font-semibold leading-tight text-slate-900">
            Certificate registry
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Create, update and manage every insurance certificate.{" "}
            {certificates.length} on record.
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            size="sm"
            icon={Download}
            onClick={() => exportCsv(filtered)}
            disabled={!filtered.length}
          >
            Export CSV
          </Button>
          <Button size="sm" icon={Plus} onClick={openCreate}>
            New certificate
          </Button>
        </div>
      </div>

      <Card className="overflow-hidden">
        {/* Status tabs */}
        <div className="admin-scroll flex gap-1 overflow-x-auto border-b border-slate-100 px-3 pt-3">
          {STATUS_TABS.map((t) => {
            const active = statusTab === t.key;
            return (
              <button
                key={t.key || "all"}
                onClick={() => setStatusTab(t.key)}
                className={`relative flex flex-shrink-0 items-center gap-2 rounded-t-lg px-3.5 pb-3 pt-1.5 text-[13px] font-medium transition-colors ${active ? "text-[#0A1172]" : "text-slate-500 hover:text-slate-800"}`}
              >
                {t.key && (
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${STATUS[t.key].dot}`}
                  />
                )}
                {t.label}
                <span
                  className={`rounded-full px-1.5 py-px text-[11px] ${active ? "bg-[#0A1172] text-white" : "bg-slate-100 text-slate-500"}`}
                >
                  {statusCounts[t.key]}
                </span>
                {active && (
                  <span className="absolute inset-x-2 bottom-0 h-[2px] rounded-full bg-[#0A1172]" />
                )}
              </button>
            );
          })}
        </div>

        {/* Toolbar */}
        <div className="flex flex-col gap-2.5 p-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search
              size={16}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by document no., vessel, IMO, insured party…"
              className={`${inputClass} pl-10 pr-9`}
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                aria-label="Clear search"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X size={15} />
              </button>
            )}
          </div>
          <div className="flex gap-2">
            <Button
              variant="secondary"
              size="sm"
              icon={SlidersHorizontal}
              onClick={() => setFiltersOpen((o) => !o)}
              className={`!h-10 ${filtersOpen || activeFilters ? "!ring-[#0A1172]/30 !text-[#0A1172]" : ""}`}
            >
              Filters
              {activeFilters > 0 && (
                <span className="rounded-full bg-[#0A1172] px-1.5 text-[11px] text-white">
                  {activeFilters}
                </span>
              )}
            </Button>
            {(search || statusTab || activeFilters > 0) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAll}
                className="!h-10 !text-rose-600 hover:!bg-rose-50"
              >
                Reset
              </Button>
            )}
          </div>
        </div>

        {filtersOpen && (
          <div className="admin-fade-up grid grid-cols-1 gap-3 border-t border-slate-100 bg-slate-50/60 px-4 py-4 sm:grid-cols-3">
            {[
              ["policyType", "Policy type"],
              ["typeOfShip", "Type of ship"],
              ["shipNationality", "Nationality"],
            ].map(([key, label]) => (
              <FormField key={key} label={label}>
                <select
                  value={filters[key]}
                  onChange={(e) =>
                    setFilters((f) => ({ ...f, [key]: e.target.value }))
                  }
                  className={inputClass}
                >
                  <option value="">All</option>
                  {options[key].map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </FormField>
            ))}
          </div>
        )}

        {/* Desktop table */}
        <div className="admin-scroll hidden overflow-x-auto md:block">
          <table className="w-full min-w-[860px] text-left">
            <thead className="border-y border-slate-100 bg-slate-50/70">
              <tr>
                <SortHeader
                  label="Document"
                  field="documentNumber"
                  sort={sort}
                  onSort={onSort}
                  className="pl-5"
                />
                <SortHeader
                  label="Vessel"
                  field="shipName"
                  sort={sort}
                  onSort={onSort}
                />
                <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                  Insured party
                </th>
                <SortHeader
                  label="Cover period"
                  field="securityEndDate"
                  sort={sort}
                  onSort={onSort}
                />
                <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                  Status
                </th>
                <SortHeader
                  label="Added"
                  field="createdAt"
                  sort={sort}
                  onSort={onSort}
                  className="hidden 2xl:table-cell"
                />
                <th className="px-4 py-3 pr-5 text-right text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading &&
                [...Array(6)].map((_, i) => (
                  <tr key={i}>
                    <td colSpan={7} className="px-5 py-3">
                      <Skeleton className="h-10" />
                    </td>
                  </tr>
                ))}
              {!loading &&
                pageRows.map((c) => (
                  <tr
                    key={c.id}
                    className="group cursor-pointer transition-colors hover:bg-[#0A1172]/[.015]"
                    onClick={() => setViewing(c)}
                  >
                    <td className="py-3 pl-5 pr-4">
                      <p
                        className="max-w-[220px] truncate text-[13.5px] font-semibold text-[#0A1172]"
                        title={c.documentNumber}
                      >
                        {c.documentNumber}
                      </p>
                      <p className="mt-0.5 text-xs text-slate-500">
                        {c.policyType || "—"}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="max-w-[180px] truncate text-[13.5px] font-medium text-slate-900">
                        {c.shipName || "—"}
                      </p>
                      <p className="mt-0.5 max-w-[200px] truncate text-xs text-slate-500">
                        {c.imoNumber ? `IMO ${c.imoNumber}` : "—"}
                        {c.typeOfShip && (
                          <span className="text-slate-400">
                            {" "}
                            · {c.typeOfShip}
                          </span>
                        )}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <p
                        className="max-w-[180px] truncate text-[13px] text-slate-700"
                        title={c.insuredParty1}
                      >
                        {c.insuredParty1 || "—"}
                      </p>
                      {c.insuredParty2 && (
                        <p
                          className="mt-0.5 max-w-[180px] truncate text-xs text-slate-400"
                          title={c.insuredParty2}
                        >
                          {c.insuredParty2}
                        </p>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <p className="whitespace-nowrap text-[13px] text-slate-700">
                        {formatDate(c.securityStartDate)}{" "}
                        <span className="text-slate-300">→</span>{" "}
                        {formatDate(c.securityEndDate)}
                      </p>
                      <DaysLeft value={c.securityEndDate} />
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={getStatus(c)} />
                    </td>
                    <td className="hidden whitespace-nowrap px-4 py-3 text-[12.5px] text-slate-500 2xl:table-cell">
                      {formatDate(c.createdAt)}
                    </td>
                    <td
                      className="py-3 pl-4 pr-5"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex justify-end gap-0.5 opacity-70 transition-opacity group-hover:opacity-100">
                        <IconButton
                          label="View & QR"
                          icon={QrCode}
                          onClick={() => setViewing(c)}
                        />
                        <IconButton
                          label="Edit"
                          icon={Pencil}
                          tone="blue"
                          onClick={() => openEdit(c)}
                        />
                        <IconButton
                          label="Delete"
                          icon={Trash2}
                          tone="red"
                          onClick={() => setDeleting(c)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="divide-y divide-slate-100 border-t border-slate-100 md:hidden">
          {loading &&
            [...Array(4)].map((_, i) => (
              <div key={i} className="p-4">
                <Skeleton className="h-16" />
              </div>
            ))}
          {!loading &&
            pageRows.map((c) => (
              <button
                key={c.id}
                onClick={() => setViewing(c)}
                className="flex w-full items-start gap-3 p-4 text-left active:bg-slate-50"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#0A1172]/[.05] text-[#0A1172]">
                  <Ship size={17} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className="truncate text-[13.5px] font-semibold text-[#0A1172]">
                      {c.documentNumber}
                    </p>
                    <StatusBadge status={getStatus(c)} />
                  </div>
                  <p className="truncate text-[13px] text-slate-700">
                    {c.shipName || "—"}
                    {c.imoNumber && ` · IMO ${c.imoNumber}`}
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    {formatDate(c.securityStartDate)} →{" "}
                    {formatDate(c.securityEndDate)}
                  </p>
                </div>
              </button>
            ))}
        </div>

        {!loading && filtered.length === 0 && (
          <EmptyState
            icon={FileText}
            title={
              certificates.length
                ? "No certificates match"
                : "No certificates yet"
            }
            description={
              certificates.length
                ? "Try a different search or clear the filters."
                : "Create the first certificate for the registry."
            }
            action={
              certificates.length ? (
                <Button variant="secondary" size="sm" onClick={clearAll}>
                  Clear filters
                </Button>
              ) : (
                <Button size="sm" icon={Plus} onClick={openCreate}>
                  New certificate
                </Button>
              )
            }
          />
        )}

        {/* Pagination */}
        {!loading && filtered.length > 0 && (
          <div className="flex flex-col gap-3 border-t border-slate-100 px-5 py-3.5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3 text-[12.5px] text-slate-500">
              <span>
                Showing{" "}
                <b className="font-semibold text-slate-700">
                  {(currentPage - 1) * pageSize + 1}
                </b>
                –
                <b className="font-semibold text-slate-700">
                  {Math.min(currentPage * pageSize, filtered.length)}
                </b>{" "}
                of{" "}
                <b className="font-semibold text-slate-700">
                  {filtered.length}
                </b>
              </span>
              <select
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
                className="h-8 rounded-lg bg-white px-2 text-xs ring-1 ring-slate-200 outline-none"
              >
                {PAGE_SIZES.map((s) => (
                  <option key={s} value={s}>
                    {s} / page
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-1">
              <IconButton
                label="Previous page"
                icon={ChevronLeft}
                onClick={() => setPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="disabled:opacity-30"
              />
              <span className="px-2 text-[12.5px] text-slate-600">
                Page {currentPage} of {pageCount}
              </span>
              <IconButton
                label="Next page"
                icon={ChevronRight}
                onClick={() => setPage(currentPage + 1)}
                disabled={currentPage === pageCount}
                className="disabled:opacity-30"
              />
            </div>
          </div>
        )}
      </Card>

      {/* Create / edit */}
      <Modal
        open={formOpen}
        onClose={closeForm}
        icon={editingId ? Pencil : FilePlus2}
        title={editingId ? "Edit certificate" : "New certificate"}
        subtitle={
          editingId
            ? "Changes are visible on the public verification page immediately."
            : "Register a certificate in the official registry."
        }
        footer={
          <>
            <Button variant="secondary" onClick={closeForm} disabled={saving}>
              Cancel
            </Button>
            <Button type="submit" form="certificate-form" loading={saving}>
              {editingId ? "Save changes" : "Create certificate"}
            </Button>
          </>
        }
      >
        <form
          id="certificate-form"
          onSubmit={handleSubmit}
          noValidate
          className="divide-y divide-slate-100"
        >
          <FormSection icon={FileText} title="Document">
            {field("documentNumber", "Document number", {
              required: true,
              maxLength: 100,
              placeholder: "e.g. 260012E / 26 / BC",
              autoFocus: !editingId,
            })}
            {field("policyType", "Policy type", {
              maxLength: 120,
              placeholder: "e.g. P&I, H&M",
              list: "dl-policy",
            })}
            {field("insurerName", "Insurer", {
              maxLength: 200,
              placeholder: "СОГАAЗ",
              wide: true,
            })}
          </FormSection>

          <FormSection icon={Ship} title="Vessel">
            {field("shipName", "Vessel name", {
              maxLength: 200,
              placeholder: "e.g. MV Northern Star",
            })}
            {field("imoNumber", "IMO number", {
              maxLength: 50,
              placeholder: "e.g. 9275892",
            })}
            {field("typeOfShip", "Type of ship", {
              maxLength: 120,
              placeholder: "e.g. Oil Tanker",
              list: "dl-type",
            })}
            {field("shipGRT", "Gross tonnage (GRT)", {
              maxLength: 50,
              placeholder: "e.g. 45,000",
            })}
            {field("shipNationality", "Nationality / flag", {
              maxLength: 120,
              placeholder: "e.g. Panama",
              list: "dl-nat",
              wide: true,
            })}
          </FormSection>

          <FormSection icon={Users} title="Insured parties">
            {field("insuredParty1", "1st insured party", {
              maxLength: 300,
              placeholder: "Company name",
              wide: true,
            })}
            {field("insuredParty2", "2nd insured party", {
              maxLength: 300,
              placeholder: "Company name (optional)",
              wide: true,
            })}
          </FormSection>

          <FormSection icon={CalendarRange} title="Cover period">
            {field("securityStartDate", "Start date", { type: "date" })}
            {field("securityEndDate", "End date", { type: "date" })}
            {field("remarks", "Remarks", {
              textarea: true,
              maxLength: 2000,
              placeholder: "Optional notes shown on the certificate…",
              wide: true,
            })}
          </FormSection>

          {form.documentNumber.trim() && (
            <div className="flex items-center gap-4 bg-slate-50/70 px-6 py-5">
              <div className="rounded-xl bg-white p-2 shadow-sm ring-1 ring-slate-100">
                <QRCodeCanvas
                  value={verifyUrl(form.documentNumber.trim())}
                  size={72}
                  level="M"
                />
              </div>
              <div className="min-w-0">
                <p className="text-[13px] font-medium text-slate-900">
                  QR code preview
                </p>
                <p className="mt-0.5 truncate text-xs text-slate-500">
                  {verifyUrl(form.documentNumber.trim())}
                </p>
              </div>
            </div>
          )}

          <datalist id="dl-policy">
            {options.policyType.map((o) => (
              <option key={o} value={o} />
            ))}
          </datalist>
          <datalist id="dl-type">
            {options.typeOfShip.map((o) => (
              <option key={o} value={o} />
            ))}
          </datalist>
          <datalist id="dl-nat">
            {options.shipNationality.map((o) => (
              <option key={o} value={o} />
            ))}
          </datalist>
        </form>
      </Modal>

      {viewing && (
        <DetailDrawer
          cert={viewing}
          onClose={() => setViewing(null)}
          onEdit={() => openEdit(viewing)}
          onDelete={() => setDeleting(viewing)}
        />
      )}

      <ConfirmDialog
        open={Boolean(deleting)}
        onClose={() => !deleteBusy && setDeleting(null)}
        onConfirm={handleDelete}
        loading={deleteBusy}
        icon={Trash2}
        title="Delete certificate?"
        description={
          <>
            <b className="font-semibold text-slate-700">
              {deleting?.documentNumber}
            </b>{" "}
            will be removed permanently and its QR code will stop verifying.
          </>
        }
        confirmLabel="Delete"
      />
    </div>
  );
};

export default Certificates;
