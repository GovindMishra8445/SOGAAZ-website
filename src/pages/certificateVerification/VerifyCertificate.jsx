import { useState, useEffect, useRef } from "react";
import { db } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useParams } from "react-router-dom";
import {
  Shield,
  Search,
  RefreshCw,
  Download,
  CheckCircle2,
  AlertCircle,
  Info,
} from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { toast } from "react-toastify";
import { QRCodeCanvas } from "qrcode.react";

const VerifyCertificate = () => {
  const [doc, setDoc] = useState("");
  const [imo, setImo] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);
  const { docId } = useParams();
  const certRef = useRef(null);

  /* ── Copy / Screenshot Protection ── */
  useEffect(() => {
    const blockCopy = (e) => {
      e.preventDefault();
      toast.warning("Copying content is not permitted.");
    };
    const blockKey = (e) => {
      if (
        (e.ctrlKey || e.metaKey) &&
        ["c", "a", "s", "p", "u"].includes(e.key.toLowerCase())
      ) {
        e.preventDefault();
        toast.warning("This action is restricted.");
      }
      if (e.key === "PrintScreen") {
        e.preventDefault();
        toast.warning("Screenshots are restricted.");
      }
    };
    const blockCtx = (e) => e.preventDefault();

    document.addEventListener("copy", blockCopy);
    document.addEventListener("keydown", blockKey);
    document.addEventListener("contextmenu", blockCtx);
    return () => {
      document.removeEventListener("copy", blockCopy);
      document.removeEventListener("keydown", blockKey);
      document.removeEventListener("contextmenu", blockCtx);
    };
  }, []);

  const parseResult = (data) => ({
    certificate: data.documentNumber,
    imo: data.imoNumber,
    vessel: data.shipName,
    grt: data.shipGRT,
    type: data.typeOfShip,
    insured1: data.insuredParty1,
    insured2: data.insuredParty2,
    insurer: data.insurerName,
    policy: data.policyType,
    nationality: data.shipNationality,
    start: data.securityStartDate?.toDate()?.toLocaleDateString() || "—",
    expiry: data.securityEndDate?.toDate()?.toLocaleDateString() || "—",
    remarks: data.remarks,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cleanDoc = doc.trim().toUpperCase();
    const cleanImo = imo.trim();

    // ❌ both empty
    if (!cleanDoc && !cleanImo) {
      toast.error("Please enter Document Number or IMO");
      return;
    }

    // ❌ both filled
    if (cleanDoc && cleanImo) {
      toast.error("Enter only one field (Document OR IMO)");
      return;
    }

    setLoading(true);

    try {
      let q;

      if (cleanDoc) {
        q = query(
          collection(db, "certificates"),
          where("documentNumber", "==", cleanDoc),
        );
      } else {
        q = query(
          collection(db, "certificates"),
          where("imoNumber", "==", cleanImo),
        );
      }

      const snap = await getDocs(q);

      if (!snap.empty) {
        const data = snap.docs[0].data();
        setResult(parseResult(data));
        toast.success("Certificate verified");
      } else {
        toast.error("No matching certificate");
        setResult(null);
      }
    } catch (err) {
      console.error(err);
      toast.error("Error");
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = async () => {
    if (!certRef.current) return;
    setPdfLoading(true);
    try {
      const canvas = await html2canvas(certRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#fff",
      });
      const pdf = new jsPDF("p", "mm", "a4");
      const w = pdf.internal.pageSize.getWidth();
      pdf.addImage(
        canvas.toDataURL("image/png"),
        "PNG",
        0,
        0,
        w,
        (canvas.height * w) / canvas.width,
      );
      pdf.save(`${result.certificate}.pdf`);
      toast.success("PDF downloaded!");
    } catch {
      toast.error("Failed to generate PDF.");
    } finally {
      setPdfLoading(false);
    }
  };

  useEffect(() => {
    if (docId) fetchByDoc(docId);
  }, [docId]);

  const fetchByDoc = async (num) => {
    setLoading(true);
    try {
      const q = query(
        collection(db, "certificates"),
        where("documentNumber", "==", num),
      );
      const snap = await getDocs(q);
      if (!snap.empty) setResult(parseResult(snap.docs[0].data()));
      else toast.error("Certificate not found.");
    } catch {
      toast.error("Error fetching certificate.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setDoc("");
    setImo("");
  };

  const Field = ({ label, value }) => (
    <div className="bg-[#0A1172]/[.025] border border-[#0A1172]/[.06] rounded-xl p-3.5">
      <p className="text-[10px] font-['DM_Sans'] font-semibold text-[#0A1172]/45 tracking-widest uppercase mb-1">
        {label}
      </p>
      <p className="text-sm font-['DM_Sans'] font-medium text-slate-800 select-none">
        {value || "—"}
      </p>
    </div>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=DM+Sans:wght@300;400;500&display=swap');
        * { user-select:none; -webkit-user-select:none; }
        @keyframes spin { to{transform:rotate(360deg)} }
        .spin { animation:spin .8s linear infinite; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        .fade-up { animation:fadeUp .35s ease forwards; }
      `}</style>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/40 py-14 px-4 relative">
        {/* Subtle background pattern */}
        <div
          className="absolute inset-0 opacity-[.025] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(#0A1172 1px,transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className="max-w-[620px] mx-auto relative z-10">
          {/* ── SEARCH FORM ── */}
          {!result && (
            <div className="fade-up">
              {/* Hero */}
              <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#0A1172]/8 border border-[#0A1172]/10 mb-5">
                  <Shield size={28} className="text-[#0A1172]" />
                </div>
                <h1 className="text-[2.1rem] font-['Cormorant_Garamond'] font-semibold text-[#0A1172] tracking-tight mb-2">
                  Certificate Verification
                </h1>
                <p className="text-sm font-['DM_Sans'] text-slate-500 leading-relaxed">
                  Verify the authenticity of СОГАAЗ maritime insurance
                  certificates
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden relative">
                <div className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="block text-[10.5px] font-['DM_Sans'] font-semibold text-[#0A1172]/50 tracking-widest uppercase mb-1.5">
                        Document Number
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. RU-2024-0089"
                        value={doc}
                        onChange={(e) => setDoc(e.target.value)}
                        disabled={imo.length > 0}
                        className="w-full bg-slate-50 border border-slate-200 focus:border-[#0A1172]/35
                          focus:bg-white focus:ring-2 focus:ring-[#0A1172]/6 text-slate-800
                          placeholder-slate-300 text-sm font-['DM_Sans'] px-4 py-3 rounded-xl outline-none transition-all"
                      />
                    </div>

                    {/* OR divider */}
                    <div className="flex items-center gap-3 text-xs font-['DM_Sans'] text-slate-400">
                      <div className="flex-1 h-px bg-slate-100" />
                      OR
                      <div className="flex-1 h-px bg-slate-100" />
                    </div>

                    <div>
                      <label className="block text-[10.5px] font-['DM_Sans'] font-semibold text-[#0A1172]/50 tracking-widest uppercase mb-1.5">
                        IMO Number
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. IMO9876543"
                        value={imo}
                        onChange={(e) => setImo(e.target.value)}
                        disabled={doc.length > 0}
                        className="w-full bg-slate-50 border border-slate-200 focus:border-[#0A1172]/35
                          focus:bg-white focus:ring-2 focus:ring-[#0A1172]/6 text-slate-800
                          placeholder-slate-300 text-sm font-['DM_Sans'] px-4 py-3 rounded-xl outline-none transition-all"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-2 bg-[#0A1172] hover:bg-[#184DE5]
                        disabled:opacity-60 disabled:cursor-not-allowed text-white py-3.5 rounded-xl
                        text-sm font-['DM_Sans'] font-medium transition-all
                        hover:shadow-[0_4px_16px_rgba(10,17,114,.3)] mt-2"
                    >
                      {loading ? (
                        <>
                          <RefreshCw size={16} className="spin" /> Verifying…
                        </>
                      ) : (
                        <>
                          <Search size={16} /> Verify Certificate
                        </>
                      )}
                    </button>
                  </form>
                </div>

                <div className="bg-slate-50 border-t border-slate-100 px-7 py-3.5 flex items-center gap-2">
                  <Info size={13} className="text-[#0A1172]/30 flex-shrink-0" />
                  <p className="text-[12px] font-['DM_Sans'] text-slate-400">
                    Official inquiries:{" "}
                    <strong className="font-medium">verify@sogaaz.ru</strong>
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ── RESULT ── */}
          {result && (
            <div className="fade-up space-y-4">
              {/* Action bar */}
              <div className="flex items-center justify-between">
                <button
                  onClick={handleReset}
                  className="flex items-center gap-2 text-sm font-['DM_Sans'] font-medium text-[#0A1172]
                    border border-[#0A1172]/20 px-4 py-2 rounded-xl hover:bg-[#0A1172]/4 transition-colors"
                >
                  <RefreshCw size={14} /> Verify Another
                </button>
                <button
                  onClick={downloadPDF}
                  disabled={pdfLoading}
                  className="flex items-center gap-2 text-sm font-['DM_Sans'] font-medium
                    bg-[#0A1172] hover:bg-[#184DE5] disabled:opacity-60 text-white px-4 py-2 rounded-xl transition-colors"
                >
                  <Download size={14} />
                  {pdfLoading ? "Generating…" : "Download PDF"}
                </button>
              </div>

              {/* Certificate card */}
              <div
                ref={certRef}
                className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden relative"
              >
                {/* Diagonal watermark */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
                  <span
                    className="font-['Cormorant_Garamond'] font-semibold text-[#0A1172] select-none pointer-events-none"
                    style={{
                      fontSize: "88px",
                      opacity: 0.035,
                      transform: "rotate(-35deg)",
                      whiteSpace: "nowrap",
                      letterSpacing: ".15em",
                    }}
                  >
                    СОГАAЗ
                  </span>
                </div>

                {/* Above watermark */}
                <div className="relative z-10">
                  {/* Certificate header */}
                  <div className="bg-gradient-to-r from-[#0A1172] to-[#184DE5] px-7 py-6 relative">
                    {/* SOGAAZ Logo row */}
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-10 h-10 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center">
                        <Shield size={20} className="text-white" />
                      </div>
                      <div>
                        <p className="text-white font-['Cormorant_Garamond'] font-bold text-xl tracking-[.14em] leading-none">
                          СОГАAЗ
                        </p>
                        <p className="text-white/50 text-[9px] font-['DM_Sans'] tracking-[.2em] uppercase mt-0.5">
                          Maritime Insurance
                        </p>
                      </div>
                    </div>

                    {/* <div className="flex items-end justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1.5">
                          <CheckCircle2
                            size={16}
                            className="text-green-400 flex-shrink-0"
                          />
                          <span className="text-green-400 text-[11px] font-['DM_Sans'] font-medium tracking-wide">
                            Verified Certificate
                          </span>
                        </div>
                        <h2 className="text-white font-['Cormorant_Garamond'] text-2xl font-semibold tracking-wide">
                          {result.certificate}
                        </h2>
                      </div>
                      {result?.certificate && (
                        <div className="absolute top-4 right-4 bg-white p-2 rounded-lg shadow">
                          <QRCodeCanvas
                            value={`https://www.sogaaz.ru/verify/${result.certificate}`}
                            size={90}
                          />
                        </div>
                      )}
                      <div className="bg-white/10 border border-white/15 rounded-xl px-4 py-2.5 text-right flex-shrink-0">
                        <p className="text-white/50 text-[9px] font-['DM_Sans'] tracking-widest uppercase mb-0.5">
                          Expires
                        </p>
                        <p className="text-white text-sm font-['DM_Sans'] font-medium">
                          {result.expiry}
                        </p>
                      </div>
                    </div> */}
                    <div className="flex items-end justify-between gap-4 relative">
                      <div>
                        <div className="flex items-center gap-2 mb-1.5">
                          <CheckCircle2
                            size={16}
                            className="text-green-400 flex-shrink-0"
                          />
                          <span className="text-green-400 text-[11px] font-['DM_Sans'] font-medium tracking-wide">
                            Verified Certificate
                          </span>
                        </div>

                        <h2 className="text-white font-['Cormorant_Garamond'] text-2xl font-semibold tracking-wide">
                          {result.certificate}
                        </h2>
                        <div className="bg-white/10 border border-white/15 rounded-xl px-2 py-2.5">
                          <p className="text-white/50 text-[9px] font-['DM_Sans'] tracking-widest uppercase mb-5">
                            Expires
                          </p>
                          <p className="text-white text-sm font-['DM_Sans'] font-medium">
                            {result.expiry}
                          </p>
                        </div>
                      </div>

                      {/* QR TOP RIGHT */}
                      {result?.certificate && (
                        <div className=" absolute  right-3 bg-white p-2 rounded-xl shadow-xl border border-gray-200">
                          <QRCodeCanvas
                            value={`https://www.sogaaz.ru/verify/${encodeURIComponent(result.certificate)}`}
                            size={80}
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Fields */}
                  <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Field label="Vessel Name" value={result.vessel} />
                    <Field label="IMO Number" value={result.imo} />
                    <Field label="Type of Ship" value={result.type} />
                    <Field label="Ship GRT" value={result.grt} />
                    <Field label="Nationality" value={result.nationality} />
                    <Field label="Policy Type" value={result.policy} />
                    <Field label="Insurer" value={result.insurer} />
                    <Field label="Start Date" value={result.start} />
                    {result.insured1 && (
                      <Field
                        label="1st Insured Party"
                        value={result.insured1}
                      />
                    )}
                    {result.insured2 && (
                      <Field
                        label="2nd Insured Party"
                        value={result.insured2}
                      />
                    )}
                    {result.remarks && (
                      <div className="sm:col-span-2">
                        <Field label="Remarks" value={result.remarks} />
                      </div>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="bg-slate-50 border-t border-slate-100 px-6 py-3 flex items-center justify-between">
                    <p className="text-[11px] font-['DM_Sans'] text-slate-400">
                      Verified · СОГАAЗ Registry ·{" "}
                      {new Date().toLocaleDateString()}
                    </p>
                    <span className="text-[10px] font-['DM_Sans'] font-semibold bg-indigo-50 text-[#0A1172] px-2.5 py-1 rounded-full tracking-widest">
                      AUTHENTIC
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default VerifyCertificate;
