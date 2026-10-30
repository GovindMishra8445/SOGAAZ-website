import { ChevronRight, Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const routeLabels = {
  admin: "Admin",
  dashboard: "Dashboard",
  certificates: "Certificates",
  settings: "Settings",
};

const Breadcrumb = () => {
  const { pathname } = useLocation();
  const parts = pathname.split("/").filter(Boolean);

  return (
    <nav
      aria-label="Breadcrumb"
      className="hidden sm:flex items-center gap-1 text-[11.5px] text-slate-400"
    >
      <Link
        to="/admin/dashboard"
        className="transition-colors hover:text-[#0A1172]"
        aria-label="Admin home"
      >
        <Home size={12} />
      </Link>
      {parts.map((name, i) => {
        const to = "/" + parts.slice(0, i + 1).join("/");
        const label = routeLabels[name] || name.replace(/-/g, " ");
        const last = i === parts.length - 1;
        return (
          <span key={to} className="flex items-center gap-1">
            <ChevronRight size={11} className="text-slate-300" />
            {last || name === "admin" ? (
              <span className={last ? "font-medium text-slate-500" : ""}>
                {label}
              </span>
            ) : (
              <Link to={to} className="transition-colors hover:text-[#0A1172]">
                {label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;
