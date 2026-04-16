import { useState, useRef } from "react";
import { menuData } from "../../data/menuData";
import MegaMenu from "./MegaMenu";
import MobileMenu from "./MobileMenu";
import { useLanguage } from "../../context/LanguageContext";
import { Link } from "react-router-dom";
import { Zap, Menu } from "lucide-react";

const t = {
  en: { insuranceEvent: "Insurance event" },
  ru: { insuranceEvent: "Страховой случай" },
};

const Navbar = () => {
  const [active, setActive] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const timeoutRef = useRef(null);
  const { lang } = useLanguage();
  const tx = t[lang];

  const handleEnter = (index) => {
    clearTimeout(timeoutRef.current);
    setActive(index);
  };

  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => setActive(null), 80);
  };

  return (
    <>
      <div
        className="relative w-full border-b border-gray-200 bg-white"
        onMouseLeave={handleLeave}
      >
       <button
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl hover:bg-[#F1F2F5] transition-colors"
            onClick={() => setMobileOpen(true)}
          >
            <Menu size={22} color="#0A1172" />
          </button>
        <div className="mx-auto pl-14 md:pl-8 lg:pl-10  flex items-center gap-4 lg:gap-6 h-[64px]">
          {/* Mobile Hamburger — LEFT side */}
         

          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <svg width="80" height="28" viewBox="0 0 120 36" fill="none">
              <text
                x="0"
                y="28"
                fontFamily="Arial Black, sans-serif"
                fontWeight="900"
                fontSize="30"
                fill="#0A1172"
              >
                СОГАЗ
              </text>
            </svg>
          </Link>

          {/* Desktop Nav Items */}
          <ul className="hidden lg:flex items-stretch flex-1 h-full">
            {menuData.map((menu, index) => (
              <li
                key={index}
                className="relative h-full flex items-center"
                onMouseEnter={() => handleEnter(index)}
              >
                <button
                  className={`h-full px-6 text-lg font-normal cursor-pointer transition-colors relative ${
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

          {/* Spacer mobile */}
          <div className="flex-1 lg:hidden" />

          {/* Insurance Event — green button like screenshot */}
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

        {/* Mega Menu */}
        {active !== null && (
          <div
            className="hidden lg:block"
            onMouseEnter={() => handleEnter(active)}
          >
            <MegaMenu data={menuData[active].megaMenu} />
          </div>
        )}
      </div>

      {mobileOpen && <MobileMenu onClose={() => setMobileOpen(false)} />}
    </>
  );
};

export default Navbar;
