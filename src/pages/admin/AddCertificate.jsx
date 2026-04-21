import { db } from "../../firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  Timestamp,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import {
  Plus,
  X,
  Search,
  FileText,
  Filter,
  ChevronDown,
  ChevronUp,
  SlidersHorizontal,
  XCircle,
} from "lucide-react";
import { toast } from "react-toastify";

const INITIAL_FORM = {
  documentNumber: "",
  shipName: "",
  imoNumber: "",
  shipGRT: "",
  typeOfShip: "",
  insured1: "",
  insured2: "",
  insurerName: "",
  policyType: "",
  nationality: "",
  startDate: "",
  endDate: "",
  remarks: "",
};

/* ─── Reusable field wrapper ─── */
const Field = ({ label, children, span2 = false }) => (
  <div className={span2 ? "col-span-2" : ""}>
    <label className="block text-[10.5px] font-['DM_Sans'] font-semibold text-[#0A1172]/50 tracking-widest uppercase mb-1.5">
      {label}
    </label>
    {children}
  </div>
);

const inputCls =
  "w-full bg-slate-50 border border-slate-200 focus:border-[#0A1172]/40 focus:bg-white focus:ring-2 focus:ring-[#0A1172]/6 text-slate-800 placeholder-slate-300 text-[13.5px] font-['DM_Sans'] px-3.5 py-2.5 rounded-lg outline-none transition-all";

/* ─── Status helper ─── */
const getStatus = (cert) => {
  const exp = cert.securityEndDate?.toDate?.();
  const today = new Date();
  const in30 = new Date();
  in30.setDate(today.getDate() + 30);
  if (!exp) return { label: "Unknown", cls: "bg-slate-100 text-slate-500" };
  if (exp < today) return { label: "Expired", cls: "bg-red-50 text-red-600" };
  if (exp <= in30) return { label: "Soon", cls: "bg-amber-50 text-amber-600" };
  return { label: "Active", cls: "bg-green-50 text-green-600" };
};

const AddCertificate = () => {
  const [open, setOpen] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [form, setForm] = useState(INITIAL_FORM);
  const [editData, setEditData] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [showDelete, setShowDelete] = useState(false);

  /* filters */
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    documentNumber: "",
    imoNumber: "",
    shipName: "",
    policyType: "",
    nationality: "",
    status: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  const handleFilter = (e) =>
    setFilters({ ...filters, [e.target.name]: e.target.value });

  const clearFilters = () => {
    setFilters({
      documentNumber: "",
      imoNumber: "",
      shipName: "",
      policyType: "",
      nationality: "",
      status: "",
    });
    setSearch("");
  };

  const activeFilterCount =
    Object.values(filters).filter(Boolean).length + (search ? 1 : 0);

  useEffect(() => {
    const q = query(
      collection(db, "certificates"),
      orderBy("createdAt", "desc"),
    );
    const unsub = onSnapshot(q, (snap) => {
      setDataList(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    return () => unsub();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        documentNumber: form.documentNumber.trim(),
        shipName: form.shipName,
        imoNumber: form.imoNumber,
        shipGRT: form.shipGRT,
        typeOfShip: form.typeOfShip,
        insuredParty1: form.insured1,
        insuredParty2: form.insured2,
        insurerName: form.insurerName,
        policyType: form.policyType,
        shipNationality: form.nationality,
        securityStartDate: form.startDate
          ? Timestamp.fromDate(new Date(form.startDate))
          : null,
        securityEndDate: form.endDate
          ? Timestamp.fromDate(new Date(form.endDate))
          : null,
        remarks: form.remarks,
      };

      // ✅ UPDATE MODE
      if (editData) {
        await updateDoc(doc(db, "certificates", editData), payload);
        toast.success("Certificate updated successfully ✏️");
      }
      // ✅ CREATE MODE
      else {
        await addDoc(collection(db, "certificates"), {
          ...payload,
          createdAt: serverTimestamp(),
        });
        toast.success("Certificate created successfully ✅");
      }

      // ✅ RESET
      setForm(INITIAL_FORM);
      setEditData(null);
      setOpen(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to save. Please try again ❌");
    } finally {
      setLoading(false);
    }
  };

  /* Apply all filters */
  const filtered = dataList.filter((item) => {
    const today = new Date();
    const in30 = new Date();
    in30.setDate(today.getDate() + 30);
    const exp = item.securityEndDate?.toDate?.();
    const statusLabel = !exp
      ? "unknown"
      : exp < today
        ? "expired"
        : exp <= in30
          ? "soon"
          : "active";

    const q = search.toLowerCase();
    const globalMatch =
      !search ||
      [
        item.documentNumber,
        item.shipName,
        item.imoNumber,
        item.insurerName,
        item.policyType,
        item.shipNationality,
      ].some((v) => v?.toLowerCase().includes(q));

    return (
      globalMatch &&
      (!filters.documentNumber ||
        item.documentNumber
          ?.toLowerCase()
          .includes(filters.documentNumber.toLowerCase())) &&
      (!filters.imoNumber ||
        item.imoNumber
          ?.toLowerCase()
          .includes(filters.imoNumber.toLowerCase())) &&
      (!filters.shipName ||
        item.shipName
          ?.toLowerCase()
          .includes(filters.shipName.toLowerCase())) &&
      (!filters.policyType ||
        item.policyType
          ?.toLowerCase()
          .includes(filters.policyType.toLowerCase())) &&
      (!filters.nationality ||
        item.shipNationality
          ?.toLowerCase()
          .includes(filters.nationality.toLowerCase())) &&
      (!filters.status || statusLabel === filters.status)
    );
  });

  const handleEdit = (item) => {
    setForm({
      documentNumber: item.documentNumber || "",
      shipName: item.shipName || "",
      imoNumber: item.imoNumber || "",
      shipGRT: item.shipGRT || "",
      typeOfShip: item.typeOfShip || "",
      insured1: item.insuredParty1 || "",
      insured2: item.insuredParty2 || "",
      insurerName: item.insurerName || "",
      policyType: item.policyType || "",
      nationality: item.shipNationality || "",
      startDate:
        item.securityStartDate?.toDate()?.toISOString().split("T")[0] || "",
      endDate:
        item.securityEndDate?.toDate()?.toISOString().split("T")[0] || "",
      remarks: item.remarks || "",
    });

    setEditData(item.id);
    setOpen(true);
  };

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, "certificates", deleteId));
      toast.success("Certificate deleted ✅");
      setShowDelete(false);
    } catch (err) {
      console.error(err);
      toast.error("Delete failed ❌");
    }
  };
  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600&family=DM+Sans:wght@300;400;500&display=swap');`}</style>

      <div className="space-y-5">
        {/* ── HEADER ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-['Cormorant_Garamond'] font-semibold text-[#0A1172] tracking-tight">
              Certificates
            </h2>
            <p className="text-sm font-['DM_Sans'] text-slate-400 mt-0.5">
              {dataList.length} total · {filtered.length} shown
            </p>
          </div>
          <button
            onClick={() => setOpen(true)}
            className="flex items-center gap-2 bg-[#0A1172] hover:bg-[#184DE5] text-white
              text-sm font-['DM_Sans'] font-medium px-4 py-2.5 rounded-xl transition-colors shadow-sm self-start sm:self-auto"
          >
            <Plus size={16} />
            Add Certificate
          </button>
        </div>

        {/* ── SEARCH + FILTER BAR ── */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 p-3">
            {/* Global search */}
            <div className="relative flex-1">
              <Search
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              />
              <input
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg
                  text-sm font-['DM_Sans'] text-slate-700 placeholder-slate-400 outline-none
                  focus:border-[#0A1172]/30 focus:ring-2 focus:ring-[#0A1172]/5 transition-all"
                placeholder="Search certificates…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <XCircle size={15} />
                </button>
              )}
            </div>

            {/* Filter toggle */}
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg border text-sm font-['DM_Sans'] font-medium transition-all
                ${
                  filterOpen || activeFilterCount > 0
                    ? "bg-[#0A1172]/6 border-[#0A1172]/20 text-[#0A1172]"
                    : "bg-slate-50 border-slate-200 text-slate-500 hover:border-slate-300"
                }`}
            >
              <SlidersHorizontal size={15} />
              Filters
              {activeFilterCount > 0 && (
                <span className="bg-[#0A1172] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center leading-none">
                  {activeFilterCount}
                </span>
              )}
              {filterOpen ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
            </button>

            {activeFilterCount > 0 && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-['DM_Sans'] text-red-500 hover:bg-red-50 transition-colors"
              >
                <X size={13} />
                Clear
              </button>
            )}
          </div>

          {/* Advanced filters panel */}
          {filterOpen && (
            <div className="border-t border-slate-100 p-4 bg-slate-50/60">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {[
                  { name: "documentNumber", placeholder: "Document No." },
                  { name: "imoNumber", placeholder: "IMO Number" },
                  { name: "shipName", placeholder: "Ship Name" },
                  { name: "policyType", placeholder: "Policy Type" },
                  { name: "nationality", placeholder: "Nationality" },
                ].map((f) => (
                  <div key={f.name} className="relative">
                    <input
                      name={f.name}
                      value={filters[f.name]}
                      onChange={handleFilter}
                      placeholder={f.placeholder}
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs
                        font-['DM_Sans'] text-slate-700 placeholder-slate-400 outline-none
                        focus:border-[#0A1172]/30 focus:ring-1 focus:ring-[#0A1172]/5 transition-all"
                    />
                    {filters[f.name] && (
                      <button
                        onClick={() => setFilters({ ...filters, [f.name]: "" })}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        <X size={11} />
                      </button>
                    )}
                  </div>
                ))}
                <select
                  name="status"
                  value={filters.status}
                  onChange={handleFilter}
                  className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs
                    font-['DM_Sans'] text-slate-700 outline-none focus:border-[#0A1172]/30 transition-all"
                >
                  <option value="">All Statuses</option>
                  <option value="active">Active</option>
                  <option value="expired">Expired</option>
                  <option value="soon">Expiring Soon</option>
                  <option value="unknown">Unknown</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* ── TABLE ── */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[900px]">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  {[
                    "Document",
                    "IMO",
                    "Ship",
                    "GRT",
                    "Type",
                    "Insured 1",
                    "Insured 2",
                    "Insurer",
                    "Policy",
                    "Nationality",
                    "Start",
                    "End",
                    "Status",
                    "Remarks",
                    "Actions",
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-3.5 py-3 text-left text-[10.5px] font-['DM_Sans'] font-semibold text-slate-400 tracking-widest uppercase whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={14} className="py-16 text-center">
                      <FileText
                        size={32}
                        className="text-slate-200 mx-auto mb-3"
                      />
                      <p className="text-sm font-['DM_Sans'] text-slate-400">
                        No certificates match your filters
                      </p>
                      {activeFilterCount > 0 && (
                        <button
                          onClick={clearFilters}
                          className="mt-2 text-xs font-['DM_Sans'] text-[#0A1172] underline"
                        >
                          Clear filters
                        </button>
                      )}
                    </td>
                  </tr>
                ) : (
                  filtered.map((item) => {
                    const { label, cls } = getStatus(item);
                    return (
                      <tr
                        key={item.id}
                        className="hover:bg-slate-50/60 transition-colors"
                      >
                        <td className="px-3.5 py-3 whitespace-nowrap">
                          <span className="inline-flex items-center gap-1.5 bg-indigo-50 text-[#0A1172] text-xs font-['DM_Sans'] font-medium px-2.5 py-1 rounded-full">
                            {item.documentNumber}
                          </span>
                        </td>
                        <td className="px-3.5 py-3 text-slate-600 font-['DM_Sans'] text-xs whitespace-nowrap">
                          {item.imoNumber || "—"}
                        </td>
                        <td className="px-3.5 py-3 font-['DM_Sans'] font-medium text-slate-800 whitespace-nowrap max-w-[140px] truncate">
                          {item.shipName || "—"}
                        </td>
                        <td className="px-3.5 py-3 text-slate-500 font-['DM_Sans'] text-xs whitespace-nowrap">
                          {item.shipGRT || "—"}
                        </td>
                        <td className="px-3.5 py-3 text-slate-500 font-['DM_Sans'] text-xs whitespace-nowrap">
                          {item.typeOfShip || "—"}
                        </td>
                        <td className="px-3.5 py-3 text-slate-500 font-['DM_Sans'] text-xs max-w-[120px] truncate">
                          {item.insuredParty1 || "—"}
                        </td>
                        <td className="px-3.5 py-3 text-slate-500 font-['DM_Sans'] text-xs max-w-[120px] truncate">
                          {item.insuredParty2 || "—"}
                        </td>
                        <td className="px-3.5 py-3 text-slate-600 font-['DM_Sans'] text-xs whitespace-nowrap max-w-[120px] truncate">
                          {item.insurerName || "—"}
                        </td>
                        <td className="px-3.5 py-3 whitespace-nowrap">
                          {item.policyType ? (
                            <span className="text-xs font-['DM_Sans'] bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                              {item.policyType}
                            </span>
                          ) : (
                            <span className="text-slate-300 font-['DM_Sans'] text-xs">
                              —
                            </span>
                          )}
                        </td>
                        <td className="px-3.5 py-3 text-slate-500 font-['DM_Sans'] text-xs whitespace-nowrap">
                          {item.shipNationality || "—"}
                        </td>
                        <td className="px-3.5 py-3 text-slate-400 font-['DM_Sans'] text-xs whitespace-nowrap">
                          {item.securityStartDate
                            ?.toDate?.()
                            ?.toLocaleDateString() || "—"}
                        </td>
                        <td className="px-3.5 py-3 text-slate-400 font-['DM_Sans'] text-xs whitespace-nowrap">
                          {item.securityEndDate
                            ?.toDate?.()
                            ?.toLocaleDateString() || "—"}
                        </td>
                        <td className="px-3.5 py-3 whitespace-nowrap">
                          <span
                            className={`text-[10px] font-['DM_Sans'] font-medium px-2 py-0.5 rounded-full ${cls}`}
                          >
                            {label}
                          </span>
                        </td>
                        <td className="px-3.5 py-3 text-slate-400 font-['DM_Sans'] text-xs max-w-[140px] truncate">
                          {item.remarks || "—"}
                        </td>

                        <td className="px-3.5 py-3 flex gap-2">
                          <button
                            onClick={() => handleEdit(item)}
                            className="text-blue-500 hover:text-blue-700 text-xs"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => {
                              setDeleteId(item.id);
                              setShowDelete(true);
                            }}
                            className="text-red-500 hover:text-red-700 text-xs"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Table footer */}
          {filtered.length > 0 && (
            <div className="border-t border-slate-100 px-4 py-2.5 flex items-center justify-between">
              <p className="text-xs font-['DM_Sans'] text-slate-400">
                Showing {filtered.length} of {dataList.length} records
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ── ADD MODAL ── */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050c2e]/55 backdrop-blur-sm"
          onClick={(e) => e.target === e.currentTarget && setOpen(false)}
        >
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl max-h-[90vh] flex flex-col">
            {/* Modal header */}
            <div className="flex items-start justify-between px-6 pt-5 pb-4 border-b border-slate-100 flex-shrink-0">
              <div>
                <h2 className="text-xl font-['Cormorant_Garamond'] font-semibold text-[#0A1172]">
                  New Certificate
                </h2>
                <p className="text-xs font-['DM_Sans'] text-slate-400 mt-0.5">
                  Fill in details to register a new certificate
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X size={15} />
              </button>
            </div>

            {/* Form */}
            <div className="overflow-y-auto flex-1">
              <form onSubmit={handleSubmit} id="cert-form">
                <div className="grid grid-cols-2 gap-4 p-6">
                  <Field label="Document Number *">
                    <input
                      name="documentNumber"
                      value={form.documentNumber}
                      onChange={handleChange}
                      required
                      placeholder="RU-2024-0001"
                      className={inputCls}
                    />
                  </Field>
                  <Field label="IMO Number">
                    <input
                      name="imoNumber"
                      value={form.imoNumber}
                      onChange={handleChange}
                      placeholder="IMO9876543"
                      className={inputCls}
                    />
                  </Field>
                  <Field label="Ship Name">
                    <input
                      name="shipName"
                      value={form.shipName}
                      onChange={handleChange}
                      placeholder="MV Northern Star"
                      className={inputCls}
                    />
                  </Field>
                  <Field label="Ship GRT">
                    <input
                      name="shipGRT"
                      value={form.shipGRT}
                      onChange={handleChange}
                      placeholder="45,000"
                      className={inputCls}
                    />
                  </Field>
                  <Field label="Type of Ship">
                    <input
                      name="typeOfShip"
                      value={form.typeOfShip}
                      onChange={handleChange}
                      placeholder="Bulk Carrier"
                      className={inputCls}
                    />
                  </Field>
                  <Field label="Policy Type">
                    <input
                      name="policyType"
                      value={form.policyType}
                      onChange={handleChange}
                      placeholder="P&I"
                      className={inputCls}
                    />
                  </Field>
                  <Field label="1st Insured Party" span2>
                    <input
                      name="insured1"
                      value={form.insured1}
                      onChange={handleChange}
                      placeholder="Company name"
                      className={inputCls}
                    />
                  </Field>
                  <Field label="2nd Insured Party" span2>
                    <input
                      name="insured2"
                      value={form.insured2}
                      onChange={handleChange}
                      placeholder="Company name (optional)"
                      className={inputCls}
                    />
                  </Field>
                  <Field label="Insurer Name">
                    <input
                      name="insurerName"
                      value={form.insurerName}
                      onChange={handleChange}
                      placeholder="СОГАAЗ"
                      className={inputCls}
                    />
                  </Field>
                  <Field label="Ship Nationality">
                    <input
                      name="nationality"
                      value={form.nationality}
                      onChange={handleChange}
                      placeholder="Russian"
                      className={inputCls}
                    />
                  </Field>
                  <Field label="Security Start Date">
                    <input
                      type="date"
                      name="startDate"
                      value={form.startDate}
                      onChange={handleChange}
                      className={inputCls}
                    />
                  </Field>
                  <Field label="Security End Date">
                    <input
                      type="date"
                      name="endDate"
                      value={form.endDate}
                      onChange={handleChange}
                      className={inputCls}
                    />
                  </Field>
                  <Field label="Remarks" span2>
                    <textarea
                      name="remarks"
                      value={form.remarks}
                      onChange={handleChange}
                      rows={2}
                      placeholder="Optional notes…"
                      className={`${inputCls} resize-none`}
                    />
                  </Field>

                  {/* QR Preview */}
                  {form.documentNumber && (
                    <div className="col-span-2 flex items-center gap-4 bg-slate-50 rounded-xl p-4 border border-slate-100">
                      <QRCodeCanvas
                        value={`https://www.sogaaz.ru/verify/${form.documentNumber}`}
                        size={64}
                        level="M"
                      />
                      <div>
                        <p className="text-xs font-['DM_Sans'] font-medium text-[#0A1172] mb-0.5">
                          QR Code Preview
                        </p>
                        <p className="text-[11px] font-['DM_Sans'] text-slate-400">
                          sogaaz.ru/verify/{form.documentNumber}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </form>
            </div>

            {/* Modal footer */}
            <div className="flex justify-end gap-3 px-6 py-4 border-t border-slate-100 flex-shrink-0">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-500 text-sm font-['DM_Sans'] hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                form="cert-form"
                disabled={loading}
                className="px-5 py-2.5 rounded-xl bg-[#0A1172] hover:bg-[#184DE5] disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-['DM_Sans'] font-medium transition-colors"
              >
                {loading ? "Saving…" : "Save Certificate"}
              </button>
            </div>
          </div>
        </div>
      )}

      {showDelete && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[999]">
          <div className="bg-white p-6 rounded-xl shadow-xl w-[320px] text-center">
            <h3 className="text-lg font-semibold mb-2">Delete Certificate?</h3>

            <p className="text-sm text-gray-500 mb-5">
              Are you sure you want to delete this certificate?
            </p>

            <div className="flex justify-center gap-3">
              <button
                onClick={() => setShowDelete(false)}
                className="px-4 py-2 border rounded-lg text-gray-500"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddCertificate;
