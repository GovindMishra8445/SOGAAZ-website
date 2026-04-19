import React from "react";
import { useLanguage } from "../../context/LanguageContext";

// 🔥 Replace with your actual image imports
import trophyImg from "../../assets/businessImage/Sogaz1.png";
import briefcaseImg from "../../assets/businessImage/Sogaz3.png";
import sogaazLogo from "../../assets/businessImage/Sogaz3.png";

const SogaazTrust = () => {
  const { lang } = useLanguage();
  const isRu = lang === "ru";

  return (
    <div className="mt-20">
      {/* Title */}
      <h2 className="text-2xl font-normal text-gray-800 mb-8">
        {isRu ? "СОГААЗ — нам доверяют" : "SOGAAZ – they trust us"}
      </h2>

      {/*
        Grid layout (matches screenshot):
        [Leader] [High reliability — blue, col-span-2] [100 000+] [Scale + Offices stacked]
        = 4 columns total on desktop, middle card spans 2
      */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* ── 1. Leader card (white) ── */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col justify-between shadow-sm">
          {/* Trophy image top */}
          <div className="w-16 h-16">
            <img
              src={trophyImg}
              alt="trophy"
              className="w-full h-full object-contain"
            />
          </div>
          {/* Text bottom */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900">
              {isRu ? "Лидер" : "Leader"}
            </h3>
            <p className="text-sm text-gray-400 mt-1">
              {isRu ? "в корпоративном страховании" : "in corporate insurance"}
            </p>
          </div>
        </div>

        {/* ── 2. High reliability card (blue, col-span-2) ── */}
        <div className="lg:col-span-2 bg-gradient-to-br from-[#1a3ec7] to-[#2563EB] rounded-2xl p-6 text-white flex flex-col justify-between min-h-[260px]">
          {/* Top logos */}
          <div className="flex gap-2">
            <span className="bg-white text-gray-900 text-xs font-semibold px-4 py-1.5 rounded-lg">
              ✦ Expert
            </span>
            <span className="bg-white text-gray-900 text-xs font-semibold px-4 py-1.5 rounded-lg flex items-center gap-1">
              <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                <rect width="20" height="20" rx="3" fill="#003087" />
                <path d="M3 10h14M10 3v14" stroke="white" strokeWidth="2" />
              </svg>
              НКР
            </span>
          </div>
          {/* Bottom text */}
          <div>
            <h3 className="text-xl font-semibold mb-2">
              {isRu ? "Высокая надёжность" : "High reliability"}
            </h3>
            <p className="text-sm text-blue-100 leading-relaxed">
              {isRu
                ? "Высшие национальные рейтинги ruAAA (Эксперт РА), ААА.ru (НКР) и ААА(RU) (АКРА) и международные BBB+ (Эксперт РА) и A–"
                : "The highest national ratings are ruAAA (Expert RA), AAA.ru (NCR) and AAA(RU) (ACRA) and international BBB+ (Expert RA) and A–"}
            </p>
          </div>
        </div>

        {/* ── 3. Corporate clients card (white) ── */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col justify-between min-h-[260px] shadow-sm">
          {/* Briefcase image top */}
          <div className="w-16 h-16">
            <img
              src={briefcaseImg}
              alt="briefcase"
              className="w-full h-full object-contain"
            />
          </div>
          {/* Text bottom */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900">100 000+</h3>
            <p className="text-sm text-gray-400 mt-1">
              {isRu ? "корпоративных клиентов" : "corporate clients"}
            </p>
          </div>
        </div>

        {/* ── 4. Right column — 2 stacked white cards ── */}
        <div className="flex flex-col gap-5">
          {/* Scale and experience */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 flex-1 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-base font-semibold text-gray-900">
                {isRu ? "Масштаб и опыт" : "Scale and experience"}
              </h3>
              {/* СОГААЗ logo inline */}
              <span className="text-[#1a3ec7] font-black text-base tracking-tight">
                СОГААЗ
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              {isRu
                ? "Более 30 лет устойчивой работы и надёжности"
                : "Over 30 years of sustainable operation and commitment"}
            </p>
          </div>

          {/* 1000+ offices */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 flex-1 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              1 000+ офисов
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              {isRu
                ? "Развитая сеть офисов по всей России и оперативное обслуживание"
                : "A developed network of offices throughout Russia and prompt service"}
            </p>
          </div>
        </div>
      </div> 
    </div>
  );
};

export default SogaazTrust;
