import { Home, ChevronRight } from "lucide-react";
import { useLocation, Link } from "react-router-dom";

const routeLabels = {
  admin: "Admin",
  dashboard: "Dashboard",
  "add-certificate": "Certificates",
  "verify-certificate": "Verify Certificate",
};

const Breadcrumb = ({ inline = false }) => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  if (inline) {
    // Compact version shown inside the top navbar
    return (
      <div className="flex items-center gap-1 mt-0.5 font-['DM_Sans']">
        <Link to="/admin/dashboard" className="text-slate-400 hover:text-[#0A1172] transition-colors">
          <Home size={11} />
        </Link>
        {pathnames.map((name, index) => {
          const routeTo = "/" + pathnames.slice(0, index + 1).join("/");
          const isLast = index === pathnames.length - 1;
          const label = routeLabels[name] || name.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
          return (
            <span key={routeTo} className="flex items-center gap-1">
              <ChevronRight size={10} className="text-slate-300" />
              {isLast
                ? <span className="text-[10px] text-[#0A1172]/60 font-medium">{label}</span>
                : <Link to={routeTo} className="text-[10px] text-slate-400 hover:text-[#0A1172] transition-colors">{label}</Link>
              }
            </span>
          );
        })}
      </div>
    );
  }

  // Full breadcrumb for standalone use
  return (
    <div className="flex items-center gap-1.5 mb-5 font-['DM_Sans'] text-xs">
      <Link to="/admin/dashboard" className="flex items-center gap-1 text-slate-400 hover:text-[#0A1172] transition-colors">
        <Home size={13} />
        <span>Home</span>
      </Link>
      {pathnames.map((name, index) => {
        const routeTo = "/" + pathnames.slice(0, index + 1).join("/");
        const isLast = index === pathnames.length - 1;
        const label = routeLabels[name] || name.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
        return (
          <span key={routeTo} className="flex items-center gap-1.5">
            <ChevronRight size={11} className="text-slate-300" />
            {isLast
              ? <span className="text-[#0A1172] font-medium">{label}</span>
              : <Link to={routeTo} className="text-slate-400 hover:text-[#0A1172] transition-colors">{label}</Link>
            }
          </span>
        );
      })}
    </div>
  );
};

export default Breadcrumb;