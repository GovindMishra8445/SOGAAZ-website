import chairImg from "../../assets/image/chair.png";
import globeImg from "../../assets/image/travel.png";
import flowerImg from "../../assets/image/folwer.png";
import carImg from "../../assets/image/osago-car.png";
import keyImg from "../../assets/image/mortgage.png";
import blueCarImg from "../../assets/image/kasko.png";

import protectHomeImg from "../../assets/image/chair.png";
import fidgetImg from "../../assets/image/toy-car.png";
import liveImg from "../../assets/image/ribbon.png";
import doctorImg from "../../assets/image/message.png";
import advisorImg from "../../assets/image/advisor.png";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

import charVideo from "../../assets/video/char.mp4";
import airplaneVideo from "../../assets/video/airplane.mp4";
import flowersVideo from "../../assets/video/flowers.mp4";
import carVideo from "../../assets/video/osas-car.mp4";
import mortgageVideo from "../../assets/video/mortgage.mp4";
import blueCarVideo from "../../assets/video/car-blue.mp4";
import { useLanguage } from "../../context/LanguageContext";

export const cardsData = {
  BUY: [
    {
      title: { en: "Apartment", ru: "Квартира" },
      img: chairImg,
      video: charVideo,
    },
    {
      title: { en: "Traveling abroad", ru: "Путешествие" },
      img: globeImg,
      video: airplaneVideo,
    },
    {
      title: { en: "Health insurance", ru: "Медицинское страхование" },
      img: flowerImg,
      video: flowersVideo,
    },
    { title: { en: "OSAGO", ru: "ОСАГО" }, img: carImg, video: carVideo },
    {
      title: { en: "Mortgage", ru: "Ипотека" },
      img: keyImg,
      video: mortgageVideo,
    },
    {
      title: { en: "CASCO", ru: "КАСКО" },
      img: blueCarImg,
      video: blueCarVideo,
    },
  ],
  ACTIVATE: [
    {
      title: {
        en: "Protect your home!",
        ru: "Защитите свой дом!",
      },
      desc: {
        en: "For clients of VTB PJSC and Zapsibkombank",
        ru: "Для клиентов ВТБ и Запсибкомбанка",
      },
      img: protectHomeImg,
    },
    {
      title: {
        en: "Fidget",
        ru: "Непоседа",
      },
      desc: {
        en: "Protect children from accidents",
        ru: "Защита детей от несчастных случаев",
      },
      img: fidgetImg,
    },
    {
      title: {
        en: "Live confidently",
        ru: "Живите уверенно",
      },
      desc: {
        en: "Oncology treatment program",
        ru: "Программа лечения онкологических заболеваний",
      },
      img: liveImg,
    },
    {
      title: {
        en: "Ask the doctor",
        ru: "Спросить врача",
      },
      desc: {
        en: "Telemedicine",
        ru: "Телемедицина",
      },
      img: doctorImg,
    },
    {
      title: {
        en: "Personnel Advisor",
        ru: "Персональный советник",
      },
      desc: {
        en: "Financial protection",
        ru: "Финансовая защита",
      },
      img: advisorImg,
    },
  ],
};

const t = {
  en: {
    popular: "Popular",
    buy: "Buy",
    activate: "Activate",
  },
  ru: {
    popular: "Популярное",
    buy: "Купить",
    activate: "Активировать",
  },
};

// Single card component
const InsuranceCard = ({ card, index, hovered, setHovered }) => {
  const isHovered = hovered === index;
  const { lang } = useLanguage();

  return (
    <div
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      className="relative rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 cursor-pointer bg-white hover:shadow-md overflow-hidden"
      style={{ minHeight: "220px" }}
    >
      {/* TOP: Title + desc */}
      <div className="z-10 relative">
        <h1 className="text-3xl font-bold text-gray-900 max-w-[250px] leading-snug">
          {card.title[lang] || card.title.en}
        </h1>
        {card.desc && (
          <p className="text-sm mt-1 text-gray-400 max-w-[250px]">
            {card.desc?.[lang] || card.desc?.en}
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

      {/* IMAGE / VIDEO — bottom-right, same position always */}
      <div className="absolute bottom-4 right-4 w-[120px] h-[120px]">
        {/* IMAGE */}
        <img
          src={card.img}
          alt=""
          className={`w-full h-full object-contain transition-opacity ${
            isHovered && card.video ? "opacity-0" : "opacity-100"
          }`}
        />

        {/* VIDEO (only if exists) */}
        {card.video && (
          <video
            src={card.video}
            autoPlay
            muted
            loop
            playsInline
            className={`absolute top-0 left-0 w-full h-full object-contain transition-opacity ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          />
        )}
      </div>
    </div>
  );
};

const PopularCard = () => {
  const [activeTab, setActiveTab] = useState("BUY");
  const [hovered, setHovered] = useState(null);

  const cards = cardsData[activeTab];
  const isBuy = activeTab === "BUY";
  const { lang } = useLanguage();
  const tx = t[lang];

  return (
    <div className="mt-16">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-4xl font-normal text-gray-900">{tx.popular}</h2>

        {/* Tab buttons — BUY | ACTIVATE */}

        <div className="flex bg-white rounded-xl p-1 gap-1">
          {[
            { key: "BUY", label: tx.buy },
            { key: "ACTIVATE", label: tx.activate },
          ].map((tab) => {
            const isActive = activeTab === tab.key;

            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`
          px-5 py-1.5 rounded-xl text-sm font-medium transition-all cursor-pointer border

          ${
            isActive
              ? "border-blue-500 text-blue-600 bg-white"
              : "border-transparent text-gray-600 hover:bg-[#F2F8FF]"
          }
        `}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* GRID */}
      {isBuy ? (
        /* BUY: 6 cards — 3 columns × 2 rows */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <InsuranceCard
              key={index}
              card={card}
              index={index}
              hovered={hovered}
              setHovered={setHovered}
            />
          ))}
        </div>
      ) : (
        /* ACTIVATE: 5 cards — row1: 3 cols, row2: 2 cols centered */
        <div className="flex flex-col gap-6">
          {/* Row 1 — 3 cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.slice(0, 3).map((card, index) => (
              <InsuranceCard
                key={index}
                card={card}
                index={index}
                hovered={hovered}
                setHovered={setHovered}
              />
            ))}
          </div>

          {/* Row 2 — 2 cards, centered */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:w-2/3 lg:mx-auto">
            {cards.slice(3).map((card, index) => (
              <InsuranceCard
                key={index + 3}
                card={card}
                index={index + 3}
                hovered={hovered}
                setHovered={setHovered}
              />
            ))}
          </div>
        </div>
      )}

      {/* ALL BUTTON — shown only on ACTIVATE tab */}
      {!isBuy && (
        <div className="flex justify-center mt-8">
          <button
            className="px-8 py-3 rounded-2xl text-s font-semibold text-white transition-all hover:bg-[#184DE5]"
            style={{ background: "#000078" }}
          >
            All
          </button>
        </div>
      )}
    </div>
  );
};

export default PopularCard;
