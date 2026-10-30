import { useMemo, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import {
  AlertTriangle,
  ArrowUpRight,
  CalendarClock,
  CheckCircle2,
  FileText,
  Plus,
  RefreshCw,
  Ship,
  XCircle,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import {
  Button,
  Card,
  CardHeader,
  EmptyState,
  Skeleton,
  StatusBadge,
} from "../../components/admin/ui";
import {
  STATUS,
  daysUntil,
  formatDate,
  getStatus,
} from "../../utils/certificate";

const greeting = () => {
  const h = new Date().getHours();
  return h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening";
};

/* ─── KPI card ─── */
const StatCard = ({
  label,
  value,
  icon: Icon,
  accent,
  share,
  hint,
  loading,
  to,
}) => (
  <Link to={to} className="group block">
    <Card className="relative h-full overflow-hidden p-5 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:shadow-[0_12px_32px_-12px_rgba(15,23,42,.18)]">
      <div
        className={`absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-[.07] ${accent.bg}`}
      />
      <div className="flex items-start justify-between">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${accent.soft}`}
        >
          <Icon size={19} className={accent.text} />
        </div>
        <ArrowUpRight
          size={16}
          className="text-slate-300 transition-colors group-hover:text-slate-500"
        />
      </div>
      <p className="mt-4 text-[12.5px] font-medium text-slate-500">{label}</p>
      {loading ? (
        <Skeleton className="mt-2 h-9 w-20" />
      ) : (
        <p className="mt-1 font-display text-[40px] font-semibold leading-none tracking-tight text-slate-900">
          {value}
        </p>
      )}
      <div className="mt-4">
        <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
          <div
            className={`h-full rounded-full ${accent.bg} transition-[width] duration-700`}
            style={{ width: `${loading ? 0 : share}%` }}
          />
        </div>
        <p className="mt-2 text-[11.5px] text-slate-400">{hint}</p>
      </div>
    </Card>
  </Link>
);

/* ─── Monthly issuance bar chart (last 12 months, by createdAt) ─── */
const IssuanceChart = ({ certificates, loading }) => {
  const [hover, setHover] = useState(null);
  const months = useMemo(() => {
    const now = new Date();
    const list = Array.from({ length: 12 }, (_, i) => {
      const d = new Date(now.getFullYear(), now.getMonth() - 11 + i, 1);
      return {
        key: `${d.getFullYear()}-${d.getMonth()}`,
        label: d.toLocaleString("en-GB", { month: "short" }),
        year: d.getFullYear(),
        count: 0,
      };
    });
    const idx = Object.fromEntries(list.map((m, i) => [m.key, i]));
    for (const c of certificates) {
      const d = new Date(c.createdAt);
      const i = idx[`${d.getFullYear()}-${d.getMonth()}`];
      if (i !== undefined) list[i].count += 1;
    }
    return list;
  }, [certificates]);

  const max = Math.max(4, ...months.map((m) => m.count));
  const total = months.reduce((s, m) => s + m.count, 0);

  return (
    <Card className="lg:col-span-2">
      <CardHeader
        title="Certificates issued"
        subtitle="New registrations over the last 12 months"
        action={
          <div className="text-right">
            <p className="font-display text-2xl font-semibold leading-none text-slate-900">
              {total}
            </p>
            <p className="mt-1 text-[11px] text-slate-400">this period</p>
          </div>
        }
      />
      <div className="px-5 pb-5 pt-6">
        {loading ? (
          <Skeleton className="h-52 w-full" />
        ) : (
          <div className="relative h-52">
            {[0, 0.25, 0.5, 0.75, 1].map((t) => (
              <div
                key={t}
                className="absolute inset-x-0 border-t border-dashed border-slate-100"
                style={{ bottom: `${t * 100}%` }}
              >
                <span className="absolute -top-2 left-0 bg-white pr-2 text-[10px] text-slate-300">
                  {Math.round(max * t)}
                </span>
              </div>
            ))}
            <div className="absolute inset-0 left-7 flex items-end gap-1.5 sm:gap-3">
              {months.map((m, i) => (
                <div
                  key={m.key}
                  className="relative flex h-full flex-1 flex-col items-center justify-end"
                  onMouseEnter={() => setHover(i)}
                  onMouseLeave={() => setHover(null)}
                >
                  {hover === i && (
                    <div
                      className="absolute z-10 -translate-y-2 whitespace-nowrap rounded-lg bg-[#050c2e] px-2.5 py-1.5 text-[11px] text-white shadow-lg"
                      style={{ bottom: `${(m.count / max) * 100}%` }}
                    >
                      <span className="font-semibold">{m.count}</span> ·{" "}
                      {m.label} {m.year}
                    </div>
                  )}
                  <div
                    className={`w-full max-w-[34px] rounded-t-md transition-all duration-500 ${
                      i === months.length - 1
                        ? "bg-gradient-to-t from-[#c09a3c] to-[#e2c473]"
                        : hover === i
                          ? "bg-[#184de5]"
                          : "bg-gradient-to-t from-[#0A1172] to-[#2b3bbd]"
                    }`}
                    style={{
                      height: `${Math.max(m.count ? 4 : 1.5, (m.count / max) * 100)}%`,
                      opacity: m.count ? 1 : 0.25,
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="ml-7 mt-2.5 flex gap-1.5 sm:gap-3">
          {months.map((m) => (
            <span
              key={m.key}
              className="flex-1 text-center text-[10.5px] text-slate-400"
            >
              {m.label}
            </span>
          ))}
        </div>
      </div>
    </Card>
  );
};

/* ─── Portfolio health donut ─── */
const HealthDonut = ({ counts, total, loading }) => {
  const segments = [
    { ...STATUS.active, value: counts.active, color: "#10b981" },
    { ...STATUS.soon, value: counts.soon, color: "#f59e0b" },
    { ...STATUS.expired, value: counts.expired, color: "#f43f5e" },
    { ...STATUS.unknown, value: counts.unknown, color: "#94a3b8" },
  ];
  const R = 52;
  const C = 2 * Math.PI * R;
  let offset = 0;
  const healthy = total
    ? Math.round(((counts.active + counts.soon) / total) * 100)
    : 0;

  return (
    <Card>
      <CardHeader
        title="Portfolio health"
        subtitle="Validity of all certificates"
      />
      <div className="p-5">
        {loading ? (
          <Skeleton className="mx-auto h-40 w-40 rounded-full" />
        ) : (
          <div className="relative mx-auto h-40 w-40">
            <svg viewBox="0 0 140 140" className="h-full w-full -rotate-90">
              <circle
                cx="70"
                cy="70"
                r={R}
                fill="none"
                stroke="#f1f5f9"
                strokeWidth="14"
              />
              {total > 0 &&
                segments.map((s) => {
                  const len = (s.value / total) * C;
                  const el = (
                    <circle
                      key={s.key}
                      cx="70"
                      cy="70"
                      r={R}
                      fill="none"
                      stroke={s.color}
                      strokeWidth="14"
                      strokeDasharray={`${Math.max(0, len - (s.value && len > 3 ? 2 : 0))} ${C}`}
                      strokeDashoffset={-offset}
                      strokeLinecap="butt"
                    />
                  );
                  offset += len;
                  return el;
                })}
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="font-display text-[34px] font-semibold leading-none text-slate-900">
                {healthy}%
              </p>
              <p className="mt-1 text-[11px] text-slate-400">in force</p>
            </div>
          </div>
        )}
        <ul className="mt-5 space-y-2.5">
          {segments.map((s) => (
            <li key={s.key} className="flex items-center gap-2.5 text-[13px]">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ background: s.color }}
              />
              <span className="flex-1 text-slate-600">{s.label}</span>
              <span className="font-semibold text-slate-900">{s.value}</span>
              <span className="w-10 text-right text-xs text-slate-400">
                {total ? Math.round((s.value / total) * 100) : 0}%
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
};

const CertRow = ({ cert, right }) => (
  <Link
    to={`/admin/certificates?q=${encodeURIComponent(cert.documentNumber)}`}
    className="flex items-center gap-3.5 px-5 py-3 transition-colors hover:bg-slate-50/80"
  >
    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-[#0A1172]/[.05] text-[#0A1172]">
      <Ship size={16} />
    </div>
    <div className="min-w-0 flex-1">
      <p className="truncate text-[13.5px] font-medium text-slate-900">
        {cert.documentNumber}
      </p>
      <p className="truncate text-xs text-slate-500">
        {cert.shipName || "—"}
        {cert.imoNumber && (
          <span className="text-slate-400"> · IMO {cert.imoNumber}</span>
        )}
      </p>
    </div>
    <div className="flex-shrink-0 text-right">{right}</div>
  </Link>
);

const Dashboard = () => {
  const { admin } = useAuth();
  const {
    certificates,
    loadingCerts: loading,
    reloadCertificates,
  } = useOutletContext();

  const stats = useMemo(() => {
    const counts = { active: 0, soon: 0, expired: 0, unknown: 0 };
    for (const c of certificates) counts[getStatus(c).key] += 1;
    const vessels = new Set(
      certificates
        .map((c) => (c.imoNumber || c.shipName || "").trim().toLowerCase())
        .filter(Boolean),
    );
    const upcoming = certificates
      .map((c) => ({ ...c, days: daysUntil(c.securityEndDate) }))
      .filter((c) => c.days !== null && c.days >= 0 && c.days <= 60)
      .sort((a, b) => a.days - b.days);
    const recent = [...certificates]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 6);
    return { counts, vessels: vessels.size, upcoming, recent };
  }, [certificates]);

  const total = certificates.length;
  const pct = (n) => (total ? Math.round((n / total) * 100) : 0);
  const { counts } = stats;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[13px] text-slate-500">
            {new Date().toLocaleDateString("en-GB", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
          <h2 className="mt-1 font-display text-[32px] font-semibold leading-tight text-slate-900">
            {greeting()},{" "}
            <span className="text-[#0A1172]">
              {admin?.name || "Administrator"}
            </span>
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            {loading
              ? "Loading your registry…"
              : `${total} certificates across ${stats.vessels} vessels in the registry.`}
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            size="sm"
            icon={RefreshCw}
            onClick={reloadCertificates}
            loading={loading}
          >
            Refresh
          </Button>
          <Link to="/admin/certificates?new=1">
            <Button size="sm" icon={Plus}>
              New certificate
            </Button>
          </Link>
        </div>
      </div>

      {/* Expiry alert */}
      {!loading && counts.soon > 0 && (
        <div className="flex flex-col gap-3 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50/40 p-4 ring-1 ring-amber-200/60 sm:flex-row sm:items-center">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
            <AlertTriangle size={18} />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-amber-900">
              {counts.soon} certificate{counts.soon > 1 ? "s" : ""} expire
              within 30 days
            </p>
            <p className="text-[13px] text-amber-700/80">
              Review and renew them before cover lapses.
            </p>
          </div>
          <Link to="/admin/certificates?status=soon">
            <Button variant="secondary" size="sm">
              Review now
            </Button>
          </Link>
        </div>
      )}

      {/* KPIs */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total certificates"
          value={total}
          icon={FileText}
          loading={loading}
          share={100}
          hint={`${stats.vessels} unique vessels`}
          to="/admin/certificates"
          accent={{
            bg: "bg-[#0A1172]",
            soft: "bg-[#0A1172]/[.06]",
            text: "text-[#0A1172]",
          }}
        />
        <StatCard
          label="Active"
          value={counts.active}
          icon={CheckCircle2}
          loading={loading}
          share={pct(counts.active)}
          hint={`${pct(counts.active)}% of the registry`}
          to="/admin/certificates?status=active"
          accent={{
            bg: "bg-emerald-500",
            soft: "bg-emerald-50",
            text: "text-emerald-600",
          }}
        />
        <StatCard
          label="Expiring in 30 days"
          value={counts.soon}
          icon={CalendarClock}
          loading={loading}
          share={pct(counts.soon)}
          hint="Needs renewal soon"
          to="/admin/certificates?status=soon"
          accent={{
            bg: "bg-amber-500",
            soft: "bg-amber-50",
            text: "text-amber-600",
          }}
        />
        <StatCard
          label="Expired"
          value={counts.expired}
          icon={XCircle}
          loading={loading}
          share={pct(counts.expired)}
          hint={`${pct(counts.expired)}% of the registry`}
          to="/admin/certificates?status=expired"
          accent={{
            bg: "bg-rose-500",
            soft: "bg-rose-50",
            text: "text-rose-600",
          }}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <IssuanceChart certificates={certificates} loading={loading} />
        <HealthDonut counts={counts} total={total} loading={loading} />
      </div>

      {/* Lists */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="overflow-hidden">
          <CardHeader
            title="Upcoming expiries"
            subtitle="Certificates ending in the next 60 days"
          />
          {loading ? (
            <div className="space-y-3 p-5">
              {[0, 1, 2].map((i) => (
                <Skeleton key={i} className="h-11" />
              ))}
            </div>
          ) : stats.upcoming.length === 0 ? (
            <EmptyState
              icon={CheckCircle2}
              title="Nothing expiring soon"
              description="No certificate ends in the next 60 days."
            />
          ) : (
            <div className="divide-y divide-slate-100">
              {stats.upcoming.slice(0, 6).map((c) => (
                <CertRow
                  key={c.id}
                  cert={c}
                  right={
                    <>
                      <p
                        className={`text-[13px] font-semibold ${c.days <= 7 ? "text-rose-600" : c.days <= 30 ? "text-amber-600" : "text-slate-700"}`}
                      >
                        {c.days === 0
                          ? "Today"
                          : `${c.days} day${c.days > 1 ? "s" : ""}`}
                      </p>
                      <p className="text-[11.5px] text-slate-400">
                        {formatDate(c.securityEndDate)}
                      </p>
                    </>
                  }
                />
              ))}
            </div>
          )}
        </Card>

        <Card className="overflow-hidden">
          <CardHeader
            title="Recently added"
            subtitle="Latest certificates in the registry"
            action={
              <Link
                to="/admin/certificates"
                className="text-[12.5px] font-medium text-[#184de5] hover:underline"
              >
                View all
              </Link>
            }
          />
          {loading ? (
            <div className="space-y-3 p-5">
              {[0, 1, 2].map((i) => (
                <Skeleton key={i} className="h-11" />
              ))}
            </div>
          ) : stats.recent.length === 0 ? (
            <EmptyState
              icon={FileText}
              title="No certificates yet"
              description="Create your first certificate to get started."
            />
          ) : (
            <div className="divide-y divide-slate-100">
              {stats.recent.map((c) => (
                <CertRow
                  key={c.id}
                  cert={c}
                  right={
                    <>
                      <StatusBadge status={getStatus(c)} />
                      <p className="mt-1 text-[11.5px] text-slate-400">
                        {formatDate(c.createdAt)}
                      </p>
                    </>
                  }
                />
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
