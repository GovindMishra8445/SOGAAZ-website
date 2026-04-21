import { useState, useEffect } from "react";
import { db } from "../../firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { FileText, CheckCircle, XCircle, Clock, TrendingUp, AlertTriangle } from "lucide-react";

const StatCard = ({ label, value, icon: Icon, colorClass, bgClass, sub, loading }) => (
  <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-default">
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0">
        <p className="text-[11px] font-['DM_Sans'] font-medium text-slate-400 uppercase tracking-widest mb-2.5">
          {label}
        </p>
        {loading
          ? <div className="h-9 w-16 bg-slate-100 rounded-lg animate-pulse" />
          : <p className={`text-4xl font-['Cormorant_Garamond'] font-semibold leading-none tracking-tight ${colorClass}`}>
              {value}
            </p>
        }
        {sub && (
          <div className="flex items-center gap-1 mt-2">
            <TrendingUp size={11} className="text-slate-300" />
            <span className="text-[11px] font-['DM_Sans'] text-slate-400">{sub}</span>
          </div>
        )}
      </div>
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${bgClass}`}>
        <Icon size={20} className={colorClass} />
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  const [certs, setCerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "certificates"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setCerts(list);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const today = new Date();
  const in30 = new Date();
  in30.setDate(today.getDate() + 30);

  const total = certs.length;
  const active = certs.filter((c) => {
    const exp = c.securityEndDate?.toDate?.();
    return exp && exp >= today;
  }).length;
  const expired = certs.filter((c) => {
    const exp = c.securityEndDate?.toDate?.();
    return exp && exp < today;
  }).length;
  const expiringSoon = certs.filter((c) => {
    const exp = c.securityEndDate?.toDate?.();
    return exp && exp >= today && exp <= in30;
  }).length;

  const recent = certs.slice(0, 6);

  const statusBadge = (cert) => {
    const exp = cert.securityEndDate?.toDate?.();
    if (!exp) return { label: "Unknown", cls: "bg-slate-100 text-slate-500" };
    if (exp < today) return { label: "Expired", cls: "bg-red-50 text-red-600" };
    if (exp <= in30) return { label: "Expiring", cls: "bg-amber-50 text-amber-600" };
    return { label: "Active", cls: "bg-green-50 text-green-600" };
  };

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600&family=DM+Sans:wght@300;400;500&display=swap');`}</style>

      <div className="space-y-6">
        {/* Page header */}
        <div>
          <h2 className="text-2xl font-['Cormorant_Garamond'] font-semibold text-[#0A1172] tracking-tight">
            Overview
          </h2>
          <p className="text-sm font-['DM_Sans'] text-slate-400 mt-0.5">
            Live certificate registry summary
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          <StatCard label="Total" value={total} icon={FileText} colorClass="text-[#0A1172]" bgClass="bg-indigo-50" sub="All records" loading={loading} />
          <StatCard label="Active" value={active} icon={CheckCircle} colorClass="text-green-600" bgClass="bg-green-50" sub={total ? `${Math.round(active/total*100)}% of total` : "—"} loading={loading} />
          <StatCard label="Expired" value={expired} icon={XCircle} colorClass="text-red-500" bgClass="bg-red-50" sub={total ? `${Math.round(expired/total*100)}% of total` : "—"} loading={loading} />
          <StatCard label="Expiring Soon" value={expiringSoon} icon={Clock} colorClass="text-amber-600" bgClass="bg-amber-50" sub="Next 30 days" loading={loading} />
        </div>

        {/* Recent certificates */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-base font-['Cormorant_Garamond'] font-semibold text-[#0A1172]">
              Recent Certificates
            </h3>
            <span className="text-xs font-['DM_Sans'] text-slate-400">Last {recent.length} records</span>
          </div>

          {loading ? (
            <div className="p-5 space-y-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-12 bg-slate-50 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : recent.length === 0 ? (
            <div className="py-16 text-center">
              <FileText size={36} className="text-slate-200 mx-auto mb-3" />
              <p className="text-sm font-['DM_Sans'] text-slate-400">No certificates yet</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-50">
              {recent.map((item) => {
                const badge = statusBadge(item);
                return (
                  <div key={item.id} className="flex items-center gap-4 px-5 py-3.5 hover:bg-slate-50/70 transition-colors">
                    <div className="w-2 h-2 rounded-full flex-shrink-0 bg-current"
                      style={{ color: badge.label === "Active" ? "#16a34a" : badge.label === "Expired" ? "#dc2626" : "#d97706" }} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-['DM_Sans'] font-medium text-[#0A1172] truncate">
                        {item.documentNumber}
                      </p>
                      <p className="text-xs font-['DM_Sans'] text-slate-400 truncate">
                        {item.shipName} {item.imoNumber ? `· ${item.imoNumber}` : ""}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className={`inline-block text-[10px] font-['DM_Sans'] font-medium px-2 py-0.5 rounded-full ${badge.cls}`}>
                        {badge.label}
                      </span>
                      <p className="text-[11px] font-['DM_Sans'] text-slate-300 mt-0.5">
                        {item.securityEndDate?.toDate?.()?.toLocaleDateString() || "—"}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Expiring soon alert */}
        {!loading && expiringSoon > 0 && (
          <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 flex items-start gap-3">
            <AlertTriangle size={18} className="text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-['DM_Sans'] font-medium text-amber-800">
                {expiringSoon} certificate{expiringSoon > 1 ? "s" : ""} expiring within 30 days
              </p>
              <p className="text-xs font-['DM_Sans'] text-amber-600 mt-0.5">
                Review the Certificates page and renew them promptly.
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;