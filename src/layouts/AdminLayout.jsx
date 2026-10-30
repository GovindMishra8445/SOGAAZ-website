import { useCallback, useEffect, useRef, useState } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import {
  ChevronDown,
  ChevronsLeft,
  ChevronsRight,
  ExternalLink,
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  Plus,
  Settings,
  X,
} from "lucide-react";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { certificateApi } from "../lib/api";
import {
  BrandMark,
  Button,
  ConfirmDialog,
  Portal,
} from "../components/admin/ui";
import Breadcrumb from "../pages/admin/Breadcrumb";

const NAV = [
  { to: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/admin/certificates", icon: FileText, label: "Certificates" },
  { to: "/admin/settings", icon: Settings, label: "Settings" },
];

const TITLES = {
  dashboard: "Dashboard",
  certificates: "Certificates",
  settings: "Account settings",
};

const initials = (admin) =>
  (admin?.name && admin.name !== "Administrator"
    ? admin.name
    : admin?.email || "A"
  )
    .split(/[\s@.]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0].toUpperCase())
    .join("");

const Avatar = ({ admin, size = 36 }) => (
  <div
    className="flex flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#d8b65c] to-[#a8862f] font-semibold text-[#050c2e] ring-2 ring-white/10"
    style={{ width: size, height: size, fontSize: size * 0.36 }}
  >
    {initials(admin)}
  </div>
);

const NavItem = ({ to, icon: Icon, label, collapsed, onClick, badge }) => (
  <NavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) =>
      `group relative flex h-10 items-center gap-3 rounded-xl px-3 text-[13.5px] transition-all duration-150
      ${collapsed ? "justify-center" : ""}
      ${isActive ? "bg-white/[.08] text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,.06)]" : "text-white/55 hover:bg-white/[.04] hover:text-white"}`
    }
  >
    {({ isActive }) => (
      <>
        {isActive && (
          <span className="absolute -left-3 top-2 bottom-2 w-[3px] rounded-r-full bg-[#c9a84c]" />
        )}
        <Icon
          size={18}
          className={`flex-shrink-0 ${isActive ? "text-[#d8b65c]" : ""}`}
        />
        {!collapsed && (
          <span className="flex-1 truncate font-medium">{label}</span>
        )}
        {!collapsed && badge > 0 && (
          <span className="rounded-full bg-amber-400/15 px-2 py-0.5 text-[10.5px] font-semibold text-amber-300">
            {badge}
          </span>
        )}
        {collapsed && (
          <span className="pointer-events-none absolute left-full z-50 ml-3 whitespace-nowrap rounded-lg bg-[#050c2e] px-2.5 py-1.5 text-xs text-white opacity-0 shadow-xl ring-1 ring-white/10 transition-opacity group-hover:opacity-100">
            {label}
          </span>
        )}
      </>
    )}
  </NavLink>
);

const AdminLayout = () => {
  const { admin, logout, sessionExpired } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(() => {
    try {
      return localStorage.getItem("admin.sidebar") === "collapsed";
    } catch {
      return false;
    }
  });
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const menuRef = useRef(null);
  const mainRef = useRef(null);

  /* ── Certificates are loaded once here and shared with every admin page ── */
  const [certificates, setCertificates] = useState([]);
  const [loadingCerts, setLoadingCerts] = useState(true);
  const [loadError, setLoadError] = useState("");

  // Any 401 from a protected call → back to login.
  const handleApiError = useCallback(
    (err, fallback = "Something went wrong") => {
      if (err?.status === 401) {
        sessionExpired();
        toast.info("Your session has expired. Please sign in again.");
        return;
      }
      toast.error(err?.message || fallback);
    },
    [sessionExpired],
  );

  const reloadCertificates = useCallback(async () => {
    setLoadingCerts(true);
    setLoadError("");
    try {
      const { certificates } = await certificateApi.list();
      setCertificates(certificates);
    } catch (err) {
      setLoadError(err.message);
      handleApiError(err, "Could not load certificates");
    } finally {
      setLoadingCerts(false);
    }
  }, [handleApiError]);

  useEffect(() => {
    reloadCertificates();
  }, [reloadCertificates]);

  useEffect(() => {
    try {
      localStorage.setItem(
        "admin.sidebar",
        collapsed ? "collapsed" : "expanded",
      );
    } catch {
      /* storage unavailable */
    }
  }, [collapsed]);

  useEffect(() => {
    const close = (e) =>
      menuRef.current &&
      !menuRef.current.contains(e.target) &&
      setMenuOpen(false);
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMenuOpen(false);
    mainRef.current?.scrollTo({ top: 0 });
  }, [location.pathname]);

  const expiringCount = certificates.filter((c) => {
    if (!c.securityEndDate) return false;
    const days = (new Date(c.securityEndDate) - Date.now()) / 86400000;
    return days >= -1 && days <= 30;
  }).length;

  const handleLogout = async () => {
    setLoggingOut(true);
    await logout();
    toast.success("Signed out securely");
    navigate("/admin/login", { replace: true });
  };

  const section = location.pathname.split("/")[2] || "dashboard";

  const sidebar = (isMobile) => {
    const isCollapsed = collapsed && !isMobile;
    return (
      <div className="flex h-full flex-col">
        <div
          className={`flex h-[68px] items-center gap-3 border-b border-white/[.06] ${isCollapsed ? "justify-center px-2" : "px-5"}`}
        >
          <BrandMark size={36} />
          {!isCollapsed && (
            <div className="min-w-0">
              <p className="font-display text-[19px] font-semibold leading-none tracking-[.14em] text-white">
                СОГАAЗ
              </p>
              <p className="mt-1 text-[9.5px] uppercase tracking-[.24em] text-[#c9a84c]/70">
                Admin Console
              </p>
            </div>
          )}
        </div>

        <nav className="flex-1 space-y-1 px-3 py-5">
          {!isCollapsed && (
            <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[.2em] text-white/25">
              Workspace
            </p>
          )}
          {NAV.map((item) => (
            <NavItem
              key={item.to}
              {...item}
              collapsed={isCollapsed}
              badge={item.to.endsWith("certificates") ? expiringCount : 0}
            />
          ))}

          {!isCollapsed && (
            <p className="px-3 pb-2 pt-6 text-[10px] font-semibold uppercase tracking-[.2em] text-white/25">
              Public
            </p>
          )}
          {isCollapsed && <div className="my-4 border-t border-white/[.06]" />}
          <a
            href="/verify-certificate"
            target="_blank"
            rel="noreferrer"
            className={`group relative flex h-10 items-center gap-3 rounded-xl px-3 text-[13.5px] text-white/55 transition-all hover:bg-white/[.04] hover:text-white ${isCollapsed ? "justify-center" : ""}`}
          >
            <ExternalLink size={18} className="flex-shrink-0" />
            {!isCollapsed && (
              <span className="font-medium">Verification page</span>
            )}
          </a>
        </nav>

        <div className="border-t border-white/[.06] p-3">
          <div
            className={`flex items-center gap-3 rounded-xl p-2 ${isCollapsed ? "justify-center" : "bg-white/[.03]"}`}
          >
            <Avatar admin={admin} size={34} />
            {!isCollapsed && (
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-medium text-white">
                  {admin?.name || "Administrator"}
                </p>
                <p className="truncate text-[11.5px] text-white/40">
                  {admin?.email}
                </p>
              </div>
            )}
            {!isCollapsed && (
              <button
                onClick={() => setShowLogout(true)}
                title="Sign out"
                aria-label="Sign out"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-white/40 transition-colors hover:bg-rose-500/15 hover:text-rose-300"
              >
                <LogOut size={16} />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#f6f7fb] font-body text-slate-800">
      {/* Desktop sidebar */}
      <aside
        className={`relative hidden flex-shrink-0 bg-[#050c2e] transition-[width] duration-300 ease-out lg:block ${collapsed ? "w-[76px]" : "w-[264px]"}`}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(24,77,229,.25),transparent_60%)]" />
        <div className="relative h-full">{sidebar(false)}</div>
        <button
          onClick={() => setCollapsed((c) => !c)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="absolute -right-3 top-[22px] z-20 flex h-6 w-6 items-center justify-center rounded-full bg-white text-[#0A1172] shadow-md ring-1 ring-slate-200 transition-colors hover:bg-slate-50"
        >
          {collapsed ? <ChevronsRight size={13} /> : <ChevronsLeft size={13} />}
        </button>
      </aside>

      {/* Mobile sidebar */}
      {mobileOpen && (
        <Portal>
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="absolute inset-0 bg-[#050c2e]/60 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <aside className="admin-fade-up absolute inset-y-0 left-0 w-[280px] bg-[#050c2e] shadow-2xl">
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="absolute right-3 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-lg text-white/50 hover:bg-white/10 hover:text-white"
              >
                <X size={18} />
              </button>
              {sidebar(true)}
            </aside>
          </div>
        </Portal>
      )}

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="z-30 flex h-[68px] flex-shrink-0 items-center justify-between gap-4 border-b border-slate-200/70 bg-white/80 px-4 backdrop-blur-xl lg:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 lg:hidden"
            >
              <Menu size={20} />
            </button>
            <div className="min-w-0">
              <Breadcrumb />
              <h1 className="truncate font-display text-[22px] font-semibold leading-tight text-[#0A1172]">
                {TITLES[section] || "Admin"}
              </h1>
            </div>
          </div>

          <div className="flex flex-shrink-0 items-center gap-2">
            <Link to="/admin/certificates?new=1" className="hidden sm:block">
              <Button size="sm" icon={Plus}>
                New certificate
              </Button>
            </Link>

            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setMenuOpen((o) => !o)}
                className="flex items-center gap-2 rounded-full p-1 pr-2 transition-colors hover:bg-slate-100"
                aria-haspopup="menu"
                aria-expanded={menuOpen}
              >
                <Avatar admin={admin} size={32} />
                <ChevronDown
                  size={14}
                  className={`hidden text-slate-400 transition-transform sm:block ${menuOpen ? "rotate-180" : ""}`}
                />
              </button>
              {menuOpen && (
                <div
                  role="menu"
                  className="admin-scale-in absolute right-0 mt-2 w-64 overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-slate-200/80"
                >
                  <div className="border-b border-slate-100 px-4 py-3.5">
                    <p className="truncate text-sm font-medium text-slate-900">
                      {admin?.name || "Administrator"}
                    </p>
                    <p className="truncate text-xs text-slate-500">
                      {admin?.email}
                    </p>
                  </div>
                  <div className="p-1.5">
                    <Link
                      to="/admin/settings"
                      className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    >
                      <Settings size={15} /> Account settings
                    </Link>
                    <button
                      onClick={() => setShowLogout(true)}
                      className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] text-rose-600 hover:bg-rose-50"
                    >
                      <LogOut size={15} /> Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        <main ref={mainRef} className="admin-scroll flex-1 overflow-y-auto">
          <div
            key={location.pathname}
            className="admin-fade-up mx-auto w-full max-w-[1400px] p-4 sm:p-6 lg:p-8"
          >
            <Outlet
              context={{
                certificates,
                setCertificates,
                loadingCerts,
                loadError,
                reloadCertificates,
                handleApiError,
              }}
            />
          </div>
        </main>
      </div>

      <ConfirmDialog
        open={showLogout}
        onClose={() => setShowLogout(false)}
        onConfirm={handleLogout}
        loading={loggingOut}
        icon={LogOut}
        title="Sign out?"
        description="You will need your email and password to sign back in."
        confirmLabel="Sign out"
      />
    </div>
  );
};

export default AdminLayout;
