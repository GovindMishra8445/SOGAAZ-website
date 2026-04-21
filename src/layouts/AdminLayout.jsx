// import { NavLink, Outlet } from "react-router-dom";
// import Breadcrumb from "../pages/admin/Breadcrumb";

// const AdminLayout = () => {
//   const linkClass = ({ isActive }) =>
//     `block px-4 py-2 rounded-lg transition ${
//       isActive
//         ? "bg-white text-[#0A1172] font-semibold"
//         : "text-gray-300 hover:bg-white/10"
//     }`;

//   return (
//     <div className="flex min-h-screen">

//       {/* SIDEBAR */}
//       <div className="w-64 bg-[#0A1172] text-white p-5">
//         <h2 className="text-xl font-bold mb-6">Admin Panel</h2>

//         <nav className="space-y-2">
//           <NavLink to="/admin/dashboard" className={linkClass}>
//             Dashboard
//           </NavLink>

//           <NavLink to="/admin/add-certificate" className={linkClass}>
//             Add Certificate
//           </NavLink>
//         </nav>
//       </div>

//       {/* MAIN CONTENT */}
//       <div className="flex-1 bg-gray-100 p-6">
//       <Breadcrumb /> 
//         <Outlet />
//       </div>
//     </div>
//   );
// };

// export default AdminLayout;

import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard, FilePlus, LogOut, Shield,
  ChevronLeft, ChevronRight, Menu, X, Bell, Plus,
} from "lucide-react";
import { useState } from "react";
import Breadcrumb from "../pages/admin/Breadcrumb";
import { toast } from "react-toastify";

/* ─── Logout Confirmation Modal ─── */
const LogoutModal = ({ onConfirm, onCancel }) => (
  <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
    <div className="absolute inset-0 bg-[#050c2e]/60 backdrop-blur-sm" onClick={onCancel} />
    <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-7 z-10">
      <div className="flex items-center justify-center w-14 h-14 rounded-full bg-red-50 mx-auto mb-5">
        <LogOut className="text-red-500" size={22} />
      </div>
      <h3 className="text-center font-['Cormorant_Garamond'] font-semibold text-[#0A1172] text-xl mb-2 tracking-wide">
        Sign Out?
      </h3>
      <p className="text-center text-sm text-gray-400 mb-7 leading-relaxed font-['DM_Sans']">
        Are you sure you want to sign out of the admin panel?
      </p>
      <div className="flex gap-3">
        <button
          onClick={onCancel}
          className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-500 text-sm font-medium hover:bg-gray-50 transition-colors font-['DM_Sans']"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-medium transition-colors font-['DM_Sans']"
        >
          Sign Out
        </button>
      </div>
    </div>
  </div>
);

/* ─── Nav Item ─── */
const NavItem = ({ to, icon: Icon, label, collapsed, mobile, onClick }) => (
  <NavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) =>
      `relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-150 group
      ${collapsed && !mobile ? "justify-center" : ""}
      ${isActive
        ? "bg-white/10 text-white font-medium"
        : "text-white/50 hover:text-white hover:bg-white/5"}`
    }
  >
    {({ isActive }) => (
      <>
        {isActive && (
          <span className="absolute left-0 top-[20%] bottom-[20%] w-0.5 bg-amber-400 rounded-r-full" />
        )}
        <Icon size={17} className={isActive ? "text-amber-400 flex-shrink-0" : "flex-shrink-0"} />
        {(!collapsed || mobile) && (
          <span className="font-['DM_Sans'] truncate">{label}</span>
        )}
        {collapsed && !mobile && (
          <div className="absolute left-full ml-2.5 px-2.5 py-1.5 bg-[#050c2e] text-white text-xs rounded-lg
            opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 shadow-xl
            border border-white/10 transition-opacity">
            {label}
          </div>
        )}
      </>
    )}
  </NavLink>
);

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("admin");
    toast.success("Signed out successfully");
    navigate("/admin/login");
  };

  const pageTitle = () => {
    if (location.pathname.includes("dashboard")) return "Dashboard";
    if (location.pathname.includes("add-certificate")) return "Certificates";
    return "Admin";
  };

  const navItems = [
    { to: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/admin/add-certificate", icon: FilePlus, label: "Certificates" },
  ];

  const SidebarInner = ({ mobile = false }) => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className={`flex items-center gap-3 px-4 py-5 border-b border-white/10
        ${collapsed && !mobile ? "justify-center px-2" : ""}`}>
        <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
          <Shield size={18} className="text-amber-400" />
        </div>
        {(!collapsed || mobile) && (
          <div>
            <p className="text-white font-bold tracking-[0.12em] text-base leading-none font-['Cormorant_Garamond']">
              СОГАAЗ
            </p>
            <p className="text-white/40 text-[9px] tracking-[0.18em] uppercase mt-0.5 font-['DM_Sans']">
              Admin Panel
            </p>
          </div>
        )}
      </div>

      {/* Nav links */}
      <nav className="flex-1 px-2 py-4 space-y-0.5">
        {(!collapsed || mobile) && (
          <p className="text-white/30 text-[9px] tracking-[0.18em] uppercase px-3 pb-2 font-['DM_Sans']">
            Navigation
          </p>
        )}
        {navItems.map((item) => (
          <NavItem
            key={item.to}
            {...item}
            collapsed={collapsed}
            mobile={mobile}
            onClick={() => mobile && setMobileOpen(false)}
          />
        ))}
      </nav>

      {/* Sign out */}
      <div className="px-2 pb-5 pt-3 border-t border-white/10">
        <button
          onClick={() => setShowLogout(true)}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl
            text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-all text-sm group relative
            ${collapsed && !mobile ? "justify-center" : ""}`}
        >
          <LogOut size={16} className="flex-shrink-0" />
          {(!collapsed || mobile) && (
            <span className="font-['DM_Sans']">Sign Out</span>
          )}
          {collapsed && !mobile && (
            <div className="absolute left-full ml-2.5 px-2.5 py-1.5 bg-[#050c2e] text-white text-xs rounded-lg
              opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 shadow-xl border border-white/10">
              Sign Out
            </div>
          )}
        </button>
      </div>
    </div>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600&family=DM+Sans:wght@300;400;500&display=swap');
      `}</style>

      <div className="flex h-screen overflow-hidden bg-slate-50">

        {/* ── DESKTOP SIDEBAR ── */}
        <aside className={`hidden lg:flex flex-col bg-gradient-to-b from-[#050c2e] to-[#0d1880]
          transition-all duration-300 ease-in-out flex-shrink-0 relative shadow-xl
          ${collapsed ? "w-[68px]" : "w-60"}`}>
          <SidebarInner />
          {/* Collapse button */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="absolute -right-3 top-[76px] w-6 h-6 bg-white border border-slate-200
              rounded-full flex items-center justify-center shadow-md hover:bg-slate-50 transition-colors z-20"
          >
            {collapsed
              ? <ChevronRight size={12} className="text-[#0A1172]" />
              : <ChevronLeft size={12} className="text-[#0A1172]" />
            }
          </button>
        </aside>

        {/* ── MOBILE SIDEBAR ── */}
        {mobileOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <aside className="fixed left-0 top-0 bottom-0 w-64 bg-gradient-to-b from-[#050c2e] to-[#0d1880]
              z-50 lg:hidden shadow-2xl">
              <button
                onClick={() => setMobileOpen(false)}
                className="absolute right-3 top-3 w-8 h-8 flex items-center justify-center
                  rounded-full bg-white/10 text-white/60 hover:text-white transition-colors"
              >
                <X size={15} />
              </button>
              <SidebarInner mobile />
            </aside>
          </>
        )}

        {/* ── MAIN CONTENT AREA ── */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

          {/* TOP NAVBAR */}
          <header className="bg-white border-b border-slate-200 px-4 lg:px-6 py-3
            flex items-center justify-between flex-shrink-0 shadow-sm z-30">
            <div className="flex items-center gap-3 min-w-0">
              <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors flex-shrink-0"
              >
                <Menu size={20} />
              </button>
              <div className="min-w-0">
                <h1 className="text-[#0A1172] font-semibold text-base font-['Cormorant_Garamond'] tracking-wide leading-none">
                  {pageTitle()}
                </h1>
                <Breadcrumb inline />
              </div>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <button className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-600
                transition-colors relative">
                <Bell size={18} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-400 rounded-full" />
              </button>
              <NavLink
                to="/admin/add-certificate"
                className="hidden sm:flex items-center gap-1.5 bg-[#0A1172] hover:bg-[#184DE5]
                  text-white text-xs font-['DM_Sans'] font-medium px-3.5 py-2 rounded-xl transition-colors"
              >
                <Plus size={14} />
                Add Certificate
              </NavLink>
            </div>
          </header>

          {/* PAGE CONTENT */}
          <main className="flex-1 overflow-y-auto p-4 lg:p-6">
            <Outlet />
          </main>
        </div>
      </div>

      {/* LOGOUT MODAL */}
      {showLogout && (
        <LogoutModal
          onConfirm={handleLogout}
          onCancel={() => setShowLogout(false)}
        />
      )}
    </>
  );
};

export default AdminLayout;