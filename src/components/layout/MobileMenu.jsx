import { useState } from "react";
import { menuData } from "../../data/menuData";
import { businessMenuData } from "../../data/businessMenuData.js";
import { useLanguage } from "../../context/LanguageContext";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Zap } from "lucide-react";

const t = {
  en: {
    privateClients: "For private clients",
    business: "For business",
    login: "Login",
    policy: "Policy activation",
    support: "Support",
    contactCenter: "Single contact center",
    phone: "8 800 333 08 88",
  },
  ru: {
    privateClients: "Частным клиентам",
    business: "Бизнесу",
    login: "Войти",
    policy: "Активация полиса",
    support: "Поддержка",
    contactCenter: "Единый контакт-центр",
    phone: "8 800 333 08 88",
  },
};

const tagStyles = {
  ONLINE: "text-green-600 font-bold text-[11px]",
  BID: "text-[#184DE5] font-bold text-[11px]",
};

// const businessMenuData = [
//   { title: { en: "Responsibility", ru: "Ответственность" }, megaMenu: null },
//   { title: { en: "Property", ru: "Имущество" }, megaMenu: null },
//   { title: { en: "Transport", ru: "Транспорт" }, megaMenu: null },
//   { title: { en: "Staff", ru: "Персонал" }, megaMenu: null },
//   { title: { en: "Industries", ru: "Отрасли" }, megaMenu: null },
//   { title: { en: "Reinsurance", ru: "Перестрахование" }, megaMenu: null },
// ];

const MobileMenu = ({ onClose }) => {
  const [openMenu, setOpenMenu] = useState(null);
  const [activeTab, setActiveTab] = useState("private");
  const { lang, toggleLang } = useLanguage();
  const tx = t[lang];
//   const location = useLocation();
// const isBusiness = location.pathname.includes("business");

  const currentMenuData =
  activeTab === "business" ? businessMenuData : menuData;

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col overflow-y-auto">

      {/* 
        Header — exactly matches Navbar height (64px)
        X icon is in SAME w-10 h-10 box as Menu icon was
        Logo is right beside it
        SOS is on the right
      */}
      <div className="flex items-center justify-between h-[64px] px-4 border-b border-gray-100 flex-shrink-0">

        {/* LEFT: X + Logo (same positions as Navbar) */}
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-[#F1F2F5] transition-colors flex-shrink-0"
          >
            {/* X icon — same size/position as Menu icon in Navbar */}
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M4 4l14 14M18 4L4 18" stroke="#0A1172" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>

          <Link to="/" onClick={onClose} className="flex-shrink-0">
            <svg width="80" height="28" viewBox="0 0 120 36">
              <text
                x="0" y="28"
                fontFamily="Arial Black, sans-serif"
                fontWeight="900"
                fontSize="30"
                fill="#0A1172"
              >
                СОГАЗ
              </text>
            </svg>
          </Link>
        </div>

        {/* RIGHT: SOS */}
        <button className="flex items-center gap-2 px-4 py-2 bg-[#F1F2F5] rounded-full text-sm font-bold text-gray-800 flex-shrink-0">
          <span className="w-5 h-5 rounded-full bg-gray-900 flex items-center justify-center">
            <Zap size={11} fill="white" strokeWidth={0} />
          </span>
          SOS
        </button>
      </div>

      {/* Tab switcher */}
      <div className="flex px-5 pt-4 border-b border-gray-100">
        <button
          onClick={() => { setActiveTab("private"); setOpenMenu(null); }}
          className={`text-sm font-semibold pb-3 border-b-2 transition-colors mr-6 ${
            activeTab === "private"
              ? "border-[#5E5EAA] text-[#5E5EAA]"
              : "border-transparent text-gray-400 hover:text-[#184DE5]"
          }`}
        >
          {tx.privateClients}
        </button>
        <button
          onClick={() => { setActiveTab("business"); setOpenMenu(null); }}
          className={`text-sm font-semibold pb-3 border-b-2 transition-colors ${
            activeTab === "business"
              ? "border-[#5E5EAA] text-[#5E5EAA]"
              : "border-transparent text-gray-400 hover:text-[#184DE5]"
          }`}
        >
          {tx.business}
        </button>
      </div>

      {/* Accordion Menu */}
      <div className="px-4 pt-3 space-y-2 flex-1">
        {currentMenuData.map((menu, i) => (
          <div
            key={i}
            className="border border-gray-100 rounded-2xl overflow-hidden bg-white"
          >
            <button
              className="w-full flex justify-between items-center px-5 py-4 font-bold text-[#0A1172] text-base cursor-pointer"
              onClick={() => setOpenMenu(openMenu === i ? null : i)}
            >
              <span>{menu.title[lang] || menu.title.en}</span>
              <ChevronDown
                size={20}
                color="#5E5EAA"
                className={`transition-transform duration-200 flex-shrink-0 ${openMenu === i ? "rotate-180" : ""}`}
              />
            </button>

            {openMenu === i && menu.megaMenu && (
              <div className="px-5 pb-4 space-y-4 border-t border-gray-50">
                {menu.megaMenu.map((section, j) => (
                  <div key={j} className="pt-3">
                    {section.category &&
                      (section.category[lang] || section.category.en) && (
                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">
                          {section.category[lang] || section.category.en}
                        </p>
                      )}
                    <ul className="space-y-1">
                      {section.items.map((item, k) => (
                        <li
                          key={k}
                          className="flex items-center justify-between px-2 py-2.5 rounded-xl cursor-pointer hover:bg-[#EEF2FF] transition-colors"
                        >
                          <span className="text-sm font-medium text-gray-800">
                            {item.title[lang] || item.title.en}
                          </span>
                          {item.tag && (
                            <span className={tagStyles[item.tag]}>{item.tag}</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Bottom Section */}
      <div className="px-4 py-6 space-y-3">
        <button className="w-full py-4 rounded-2xl font-bold bg-[#0A1172] text-white text-base hover:bg-[#184DE5] transition-colors cursor-pointer">
          {tx.login}
        </button>
        <button className="w-full py-4 rounded-2xl font-semibold border border-gray-200 text-gray-700 text-base hover:bg-[#F1F2F5] transition-colors cursor-pointer">
          {tx.policy}
        </button>
        <div className="pt-1">
          <p className="text-xs text-gray-400 mb-1">{tx.contactCenter}</p>
          <a href="tel:88003330888" className="font-bold text-lg text-[#0A1172]">
            {tx.phone}
          </a>
        </div>
        <button className="w-full py-4 rounded-2xl font-semibold border border-gray-200 text-gray-700 text-base hover:bg-[#F1F2F5] transition-colors cursor-pointer">
          {tx.support}
        </button>

        {/* Language toggle */}
        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={() => toggleLang("en")}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
              lang === "en" ? "bg-[#5E5EAA] text-white" : "text-gray-500 hover:text-[#184DE5]"
            }`}
          >
            English
          </button>
          <button
            onClick={() => toggleLang("ru")}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
              lang === "ru" ? "bg-[#5E5EAA] text-white" : "text-gray-500 hover:text-[#184DE5]"
            }`}
          >
            Русский
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;