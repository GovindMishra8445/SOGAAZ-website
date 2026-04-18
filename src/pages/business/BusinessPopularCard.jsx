import Popular1 from "../../assets/businessVideo/Popular1.mp4";
import Popular2 from "../../assets/businessVideo/Popular2.mp4";
import Popular3 from "../../assets/businessVideo/Popular3.mp4";
import Popular4 from "../../assets/businessVideo/Popular4.mp4";
import Popular5 from "../../assets/businessVideo/Popular5.mp4";
import Popular6 from "../../assets/businessVideo/Popular6.mp4";

// Import your card images below (replace with your actual paths)
// import chairImg from "../../assets/businessImage/chair.png";
// import globeImg from "../../assets/businessImage/globe.png";
// import flowerImg from "../../assets/businessImage/flower.png";
// import keyImg from "../../assets/businessImage/key.png";
// import blueCarImg from "../../assets/businessImage/blueCar.png";
// import cargoImg from "../../assets/businessImage/cargo.png";

import { useState, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

// ─── Translations ────────────────────────────────────────────────────────────
const t = {
  en: { popular: "Popular", heading: "Popular products" },
  ru: { popular: "Популярные", heading: "Популярные продукты" },
};

// ─── Cards Data ───────────────────────────────────────────────────────────────
export const cardsData = [
  {
    title: { en: "SMS", ru: "Квартира" },
    desc: {
      en: "Employee health",
      ru: "Для клиентов ВТБ и Запсибкомбанка",
    },
    video: Popular1,
  },
  {
    title: { en: "Property", ru: "Путешествие" },
    desc: {
      en: "Protection of property of legal entities and entrepreneurs",
      ru: "Для клиентов ВТБ и Запсибкомбанка",
    },
    video: Popular2,
  },
  {
    title: { en: "Plan B", ru: "Медицинское страхование" },
    desc: {
      en: "Protection against various risks in one solution",
      ru: "Для клиентов ВТБ и Запсибкомбанка",
    },
    video: Popular3,
  },
  {
    title: { en: "Cyber first aid kit", ru: "Ипотека" },
    desc: {
      en: "Cyber incident assistance",
      ru: "Для клиентов ВТБ и Запсибкомбанка",
    },
    video: Popular4,
  },
  {
    title: { en: "OGO tenants", ru: "КАСКО" },
    desc: {
      en: "Tenant Liability Protection",
      ru: "Для клиентов ВТБ и Запсибкомбанка",
    },
    video: Popular5,
  },
  {
    title: { en: "Cargo", ru: "КАСКО" },
    desc: {
      en: "Cargo protection during transportation",
      ru: "Для клиентов ВТБ и Запсибкомбанка",
    },
    video: Popular6,
  },
];

// ─── Single Card ──────────────────────────────────────────────────────────────
const InsuranceCard = ({ card, index, hovered, setHovered }) => {
  const isHovered = hovered === index;
  const { lang } = useLanguage();
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    setHovered(index);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    setHovered(null);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 cursor-pointer bg-white overflow-hidden"
      style={{
        minHeight: "190px",
        boxShadow: isHovered
          ? "0 8px 32px rgba(37,99,235,0.13)"
          : "0 1px 4px rgba(0,0,0,0.06)",
        transition: "box-shadow 0.3s ease",
      }}
    >
      {/* TOP: Title + desc */}
      <div className="z-10 relative">
        <h3 className="text-lg font-bold text-gray-900 max-w-[200px] leading-snug">
          {card.title[lang] || card.title.en}
        </h3>
        {card.desc && (
          <p className="text-sm mt-1 text-gray-400 max-w-[200px]">
            {card.desc[lang] || card.desc.en}
          </p>
        )}
      </div>

      {/* BOTTOM: Arrow button */}
      <div className="z-10 relative mt-6">
        <div
          className="w-9 h-9 flex items-center justify-center rounded-xl transition-all duration-300"
          style={{
            background: isHovered ? "#2563EB" : "#F3F4F6",
            color: isHovered ? "#fff" : "#111",
          }}
        >
          <ArrowUpRight size={17} />
        </div>
      </div>

      {/* IMAGE — visible when NOT hovered */}
      <div className="absolute bottom-4 right-4 w-[120px] h-[120px] pointer-events-none">


        {/* VIDEO — plays on hover */}
        <video
          ref={videoRef}
          src={card.video}
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-contain transition-opacity duration-300"
          style={{ opacity: 1 }}
        />
      </div>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const BusinessPopularCard = () => {
  const [hovered, setHovered] = useState(null);
  const { lang } = useLanguage();
  const tx = t[lang] || t.en;

  return (
    <div className="mt-16">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">{tx.heading}</h2>
      </div>

      {/* GRID — 6 cards, 3 columns × 2 rows */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cardsData.map((card, index) => (
          <InsuranceCard
            key={index}
            card={card}
            index={index}
            hovered={hovered}
            setHovered={setHovered}
          />
        ))}
      </div>
    </div>
  );
};

export default BusinessPopularCard;