import { useState, useRef } from "react";
import { menuData } from "../../data/menuData";
import { businessMenuData } from "../../data/businessMenuData.js";
import MegaMenu from "./MegaMenu";
import MobileMenu from "./MobileMenu";
import { useLanguage } from "../../context/LanguageContext";
import { Link, useLocation } from "react-router-dom";
import { Zap, Menu, X } from "lucide-react";

const t = {
  en: { insuranceEvent: "Insurance event", logo: "SOGAAZ" },
  ru: { insuranceEvent: "Страховой случай", logo: "СОГАAЗ" },
};

const Navbar = () => {
  const [active, setActive] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const timeoutRef = useRef(null);
  const { lang } = useLanguage();
  const tx = t[lang];
  const location = useLocation();

  const handleEnter = (index) => {
    clearTimeout(timeoutRef.current);
    setActive(index);
  };

  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => setActive(null), 80);
  };

  const isBusiness = location.pathname.includes("business");

const currentMenuData = isBusiness ? businessMenuData : menuData;

  return (
    <>
      {/* ── STICKY NAVBAR ── */}
      <div
        className="sticky top-0 z-40 w-full bg-white border-b border-gray-200"
        onMouseLeave={handleLeave}
      >
        <div className="flex items-center h-[68px] pl-4 lg:pl-10">
          {/* ── LEFT: Toggle icon + Logo ── */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {/* 
              Mobile only: Menu icon OR X icon
              w-10 h-10 fixed size so logo never shifts
            */}
            <button
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl hover:bg-[#F1F2F5] transition-colors"
              onClick={() => setMobileOpen((prev) => !prev)}
            >
              {mobileOpen ? (
                <X size={22} color="#0A1172" />
              ) : (
                <Menu size={22} color="#0A1172" />
              )}
            </button>

            {/* Logo always right beside the icon */}
            <Link to="/" className="flex-shrink-0">
             <svg width="130" height="28" viewBox="0 0 120 36">
                <text
                  x="0"
                  y="28"
                  fontFamily="Arial Black, sans-serif"
                  fontWeight="900"
                  fontSize="30"
                  fill="#0A1172"
                >
                  {tx.logo}
                </text>
              </svg>
            </Link>
          </div>

          {/* ── MIDDLE: Desktop nav items ── */}
          <ul className="hidden lg:flex items-stretch flex-1 h-full ml-4">
            {currentMenuData.map((menu, index) => (
              <li
                key={index}
                className="relative h-full flex items-center"
                onMouseEnter={() => handleEnter(index)}
              >
                <button
                  className={`h-full px-5 text-xl font-normal cursor-pointer transition-colors relative whitespace-nowrap ${
                    active === index
                      ? "text-[#5E5EAA]"
                      : "text-gray-700 hover:text-[#184DE5]"
                  }`}
                >
                  {menu.title[lang] || menu.title.en}
                  {active === index && (
                    <span className="absolute bottom-0 left-2 right-2 h-[2px] bg-[#5E5EAA] rounded-t-sm" />
                  )}
                </button>
              </li>
            ))}
          </ul>

          {/* Spacer pushes right button to edge on mobile */}
          <div className="flex-1 lg:hidden" />

          {/* ── RIGHT: SOS (mobile only) ── */}
          <button className="lg:hidden flex items-center gap-2 px-4 py-2 bg-[#F1F2F5] hover:bg-[#E5E7EB] transition-colors rounded-full text-sm font-bold text-gray-800 flex-shrink-0 cursor-pointer">
            <span className="w-5 h-5 rounded-full bg-gray-900 flex items-center justify-center">
              <Zap size={11} fill="white" strokeWidth={0} />
            </span>
            SOS
          </button>

          {/* ── RIGHT: Insurance event (desktop only) ── */}
          <button className="hidden lg:flex items-center py-4.5 pl-6 pr-10 gap-2 bg-[#F1F2F5] hover:bg-[#09D171] transition cursor-pointer text-black font-semibold text-lg flex-shrink-0 group">
            <div className="w-6 h-6 flex items-center justify-center rounded-full bg-black transition group-hover:bg-white">
              <Zap
                size={14}
                strokeWidth={0}
                fill="white"
                className="group-hover:fill-black"
              />
            </div>

            <span>{tx.insuranceEvent}</span>
          </button>
        </div>

        {/* Mega Menu — desktop only, rendered below navbar */}
        {active !== null && (
          <div
            className="hidden lg:block"
            onMouseEnter={() => handleEnter(active)}
          >
            <MegaMenu data={currentMenuData[active]?.megaMenu} />
          </div>
        )}
      </div>

      {/* Mobile Menu Overlay */}
      {mobileOpen && <MobileMenu onClose={() => setMobileOpen(false)} />}
    </>
  );
};

export default Navbar;
