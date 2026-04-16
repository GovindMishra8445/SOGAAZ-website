import { NavLink } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { MapPin, User } from "lucide-react";

const t = {
  en: {
    privateClients: "For private clients",
    business: "For business",
    support: "Support",
    policy: "Policy activation",
    phone: "8 800 333 08 88",
    offices: "Offices",
    login: "Login",
  },
  ru: {
    privateClients: "Частным клиентам",
    business: "Бизнесу",
    support: "Поддержка",
    policy: "Активация полиса",
    phone: "8 800 333 08 88",
    offices: "Офисы",
    login: "Войти",
  },
};

const TopNavbar = () => {
  const { lang, toggleLang } = useLanguage();
  const tx = t[lang];

  return (
    // hidden on mobile, visible on lg+
    <div className="hidden lg:block w-full border-b border-gray-200 bg-white">
      <div className="mx-auto px-16 py-3 flex justify-between items-center text-[15px]">
        {/* Left Links */}
        <div className="flex gap-7">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `top-nav-link font-normal ${isActive ? "active" : ""}`
            }
          >
            {tx.privateClients}
          </NavLink>
          <NavLink
            to="/business"
            className={({ isActive }) =>
              `top-nav-link font-normal  ${isActive ? "active" : ""}`
            }
          >
            {tx.business}
          </NavLink>
          <NavLink
            to="/support"
            className={({ isActive }) =>
              `top-nav-link font-normal  ${isActive ? "active" : ""}`
            }
          >
            {tx.support}
          </NavLink>
          <NavLink
            to="/policy"
            className={({ isActive }) =>
              `top-nav-link font-normal  ${isActive ? "active" : ""}`
            }
          >
            {tx.policy}
          </NavLink>
        </div>

        {/* Right */}
        <div className="flex items-center gap-5">
          {/* Phone */}
          <div className="text-right leading-tight">
            <a
              href="tel:88003330888"
              className="block font-bold text-[#184DE5] hover:text-[#5E5EAA] transition-colors text-sm"
            >
              {tx.phone}
            </a>
            <span className="text-xs text-gray-400">24/7</span>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleLang("en")}
              className={`px-3 py-1.5 text-xs font-semibold transition-colors ${
                lang === "en"
                  ? "bg-[#5E5EAA] text-white"
                  : "text-gray-500 hover:text-[#184DE5]"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => toggleLang("ru")}
              className={`px-3 py-1.5 text-xs font-semibold transition-colors ${
                lang === "ru"
                  ? "bg-[#5E5EAA] text-white"
                  : "text-gray-500 hover:text-[#184DE5]"
              }`}
            >
              RU
            </button>
          </div>

          {/* Offices */}
          <button className="top-nav-btn flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium text-gray-600">
            <MapPin size={15} strokeWidth={1.8} />
            {tx.offices}
          </button>

          {/* Login */}
          <button className="top-nav-btn flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium text-gray-600">
            <User size={15} strokeWidth={1.8} />
            {tx.login}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;