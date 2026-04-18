import React from "react";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

// 🔥 images tum yaha set kar lena
// import nuclearImg from "...";
// import oilImg from "...";

const industryData = [
  {
    title: { en: "Nuclear", ru: "Ядерная отрасль" },
    img: "/images/nuclear.png",
  },
  {
    title: { en: "Oil", ru: "Нефть" },
    img: "/images/oil.png",
  },
  {
    title: { en: "Gas", ru: "Газ" },
    img: "/images/gas.png",
  },
  {
    title: { en: "Railway", ru: "Железные дороги" },
    img: "/images/railway.png",
  },
  {
    title: { en: "Aerospace", ru: "Аэрокосмическая отрасль" },
    img: "/images/aerospace.png",
  },
  {
    title: { en: "Maritime risks", ru: "Морские риски" },
    img: "/images/maritime.png",
  },
];

const BusinessIndustrySolutions = () => {
  const { lang } = useLanguage();

  return (
    <div className="mt-20 bg-white">
      {/* 🔥 TITLE */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-8">
        {lang === "ru" ? "Отраслевые решения" : "Industry solutions"}
      </h2>

      {/* 🔥 GRID */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {industryData.map((item, i) => (
          <div
            key={i}
            className="group relative bg-[#F4F5F8] rounded-2xl p-6 h-[150px] flex items-center justify-between overflow-hidden hover:shadow-md transition"
          >
            {/* TEXT */}
            <h3 className="text-lg font-semibold text-[#0A1172] z-10">
              {item.title[lang]}
            </h3>

            {/* ICON BUTTON */}
            <button className="absolute left-6 bottom-6 w-9 h-9 bg-white rounded-lg flex items-center justify-center shadow-sm group-hover:bg-blue-600 transition">
              <ArrowUpRight
                size={16}
                className="text-gray-700 group-hover:text-white"
              />
            </button>

            {/* IMAGE RIGHT */}
            <img
              src={item.img}
              alt=""
              className="absolute right-4 bottom-2 w-[90px] object-contain pointer-events-none transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BusinessIndustrySolutions;