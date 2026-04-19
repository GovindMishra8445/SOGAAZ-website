import React from "react";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

import nuclearImg from "../../assets/businessImage/Industry1.png";
import nuclearImg2 from "../../assets/businessImage/Industry2.png";
import nuclearImg3 from "../../assets/businessImage/Industry3.png";
import nuclearImg4 from "../../assets/businessImage/Industry4.png";
import nuclearImg5 from "../../assets/businessImage/Industry5.png";
import nuclearImg6 from "../../assets/businessImage/Industry6.png";

const industryData = [
  { title: { en: "Nuclear", ru: "Ядерная отрасль" }, img: nuclearImg },
  { title: { en: "Oil", ru: "Нефть" }, img: nuclearImg2 },
  { title: { en: "Gas", ru: "Газ" }, img: nuclearImg3 },
  { title: { en: "Railway", ru: "Железные дороги" }, img: nuclearImg4 },
  {
    title: { en: "Aerospace", ru: "Аэрокосмическая отрасль" },
    img: nuclearImg5,
  },
  { title: { en: "Maritime risks", ru: "Морские риски" }, img: nuclearImg6 },
];

const BusinessIndustrySolutions = () => {
  const { lang } = useLanguage();

  return (
    <div className="w-full bg-white mt-20 py-12">
      <div className="max-w-[1350px] mx-auto px-4">
        <h2 className="text-4xl font-normal text-gray-900 mb-8">
          {lang === "ru" ? "Отраслевые решения" : "Industry solutions"}
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industryData.map((item, i) => (
            <div
              key={i}
              className="group relative bg-[#F4F5F8] rounded-2xl overflow-hidden h-[180px] hover:shadow-md transition"
            >
              <h3 className="absolute top-5 left-5 text-2xl font-bold text-gray-900 z-10 leading-tight">
                {item.title[lang]}
              </h3>
              <button className="absolute left-5 bottom-5 z-10 w-9 h-9 bg-white rounded-lg flex items-center justify-center shadow-sm group-hover:bg-blue-600 transition">
                <ArrowUpRight
                  size={16}
                  className="text-gray-700 group-hover:text-white transition"
                />
              </button>
              <img
                src={item.img}
                alt=""
                className="absolute right-4 bottom-0 h-[140px] w-auto object-contain pointer-events-none transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BusinessIndustrySolutions;
