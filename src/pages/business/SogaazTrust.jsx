import React from "react";
import { useLanguage } from "../../context/LanguageContext";

const SogaazTrust = () => {
  const { lang } = useLanguage();

  return (
    <div className="mt-20">
      {/* 🔥 TITLE */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-8">
        {lang === "ru"
          ? "СОГАЗ — нам доверяют"
          : "SOGAZ – they trust us"}
      </h2>

      {/* 🔥 GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        
        {/* 🔹 LEFT SMALL CARD */}
        <div className="bg-[#F5F7FB] rounded-2xl p-5 flex flex-col justify-between min-h-[200px]">
          <div className="text-4xl">🏆</div>

          <div>
            <h3 className="font-semibold text-gray-800">
              {lang === "ru" ? "Лидер" : "Leader"}
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              {lang === "ru"
                ? "в корпоративном страховании"
                : "in corporate insurance"}
            </p>
          </div>
        </div>

        {/* 🔵 CENTER BIG CARD */}
        <div className="lg:col-span-2 bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] rounded-2xl p-6 text-white flex flex-col justify-between min-h-[200px]">
          
          {/* TOP LOGOS */}
          <div className="flex gap-3">
            <span className="bg-white text-black text-xs px-3 py-1 rounded-md">
              Expert
            </span>
            <span className="bg-white text-black text-xs px-3 py-1 rounded-md">
              НКР
            </span>
          </div>

          {/* TEXT */}
          <div>
            <h3 className="text-lg font-semibold">
              {lang === "ru" ? "Высокая надежность" : "High reliability"}
            </h3>

            <p className="text-sm text-blue-100 mt-2 leading-relaxed">
              {lang === "ru"
                ? "Высокие национальные рейтинги от ведущих агентств и стабильный прогноз"
                : "The highest national ratings are ruAAA and international BBB+"}
            </p>
          </div>
        </div>

        {/* 🔹 SMALL CARD (CLIENTS) */}
        <div className="bg-[#F5F7FB] rounded-2xl p-5 flex flex-col justify-between min-h-[200px]">
          <div className="text-3xl">💼</div>

          <div>
            <h3 className="font-semibold text-gray-800">
              100 000+
            </h3>
            <p className="text-sm text-gray-500">
              {lang === "ru"
                ? "корпоративных клиентов"
                : "corporate clients"}
            </p>
          </div>
        </div>

        {/* 🔹 RIGHT SIDE (2 STACK CARDS) */}
        <div className="flex flex-col gap-6">
          <div className="bg-[#F5F7FB] rounded-2xl p-5 min-h-[90px]">
            <h3 className="font-semibold text-gray-800">
              {lang === "ru"
                ? "Масштаб и опыт"
                : "Scale and experience"}
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              {lang === "ru"
                ? "30+ лет устойчивой работы"
                : "Over 30 years of operation"}
            </p>
          </div>

          <div className="bg-[#F5F7FB] rounded-2xl p-5 min-h-[90px]">
            <h3 className="font-semibold text-gray-800">
              1,000+ offices
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              {lang === "ru"
                ? "Развитая сеть офисов"
                : "A developed network of offices"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SogaazTrust;