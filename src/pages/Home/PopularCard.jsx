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

export const cardsData = {
  BUY: [
    { title: "Apartment", img: chairImg, video: "/video/char.mp4" },
    { title: "Traveling abroad", img: globeImg, video: "/video/airplane.mp4" },
    { title: "Voluntary health insurance", img: flowerImg, video: "/video/flowers.mp4" },
    { title: "OSAGO", img: carImg, video: "/video/osas-car.mp4" },
    { title: "Mortgage", img: keyImg, video: "/video/mortgage.mp4" },
    { title: "CASCO", img: blueCarImg, video: "/video/car-blue.mp4" },
  ],
  ACTIVATE: [
    { title: "Protect your home!", desc: "For clients of VTB PJSC and Zapsibkombank", img: protectHomeImg, video: "/video/protect-home.mp4" },
    { title: "Fidget", desc: "Protect children from accidents", img: fidgetImg, video: "/video/fidget.mp4" },
    { title: "Live confidently", desc: "Oncology treatment program", img: liveImg, video: "/video/live.mp4" },
    { title: "Ask the doctor", desc: "Telemedicine", img: doctorImg, video: "/video/doctor.mp4" },
    { title: "Personnel Advisor", desc: "Financial protection", img: advisorImg, video: "/video/advisor.mp4" },
  ],
};

// Single card component
const InsuranceCard = ({ card, index, hovered, setHovered }) => {
  const isHovered = hovered === index;

  return (
    <div
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      className="relative rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 cursor-pointer bg-white hover:shadow-md overflow-hidden"
      style={{ minHeight: "190px" }}
    >
      {/* TOP: Title + desc */}
      <div className="z-10 relative">
        <h3 className="text-lg font-bold text-gray-900 max-w-[200px] leading-snug">
          {card.title}
        </h3>
        {card.desc && (
          <p className="text-sm mt-1 text-gray-400 max-w-[200px]">{card.desc}</p>
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
      <div
        className="absolute bottom-4 right-4"
        style={{ width: "120px", height: "120px" }}
      >
        {isHovered ? (
          <video
            src={card.video}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-contain"
          />
        ) : (
          <img
            src={card.img}
            alt={card.title}
            className="w-full h-full object-contain"
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

  return (
    <div className="mt-16">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Popular</h2>

        {/* Tab buttons — BUY | ACTIVATE */}
        <div className="flex bg-white rounded-full p-1 gap-1">
          {["BUY", "ACTIVATE"].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setHovered(null);
              }}
              className="px-5 py-2 rounded-full text-sm font-medium transition-all cursor-pointer"
              style={{
                border: activeTab === tab ? "1.5px solid #2563EB" : "1.5px solid transparent",
                color: activeTab === tab ? "#2563EB" : "#6B7280",
                background: "transparent",
              }}
            >
              {tab}
            </button>
          ))}
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
            className="px-10 py-3 rounded-full text-sm font-semibold text-white transition-all"
            style={{ background: "#1D4ED8" }}
          >
            All
          </button>
        </div>
      )}
    </div>
  );
};

export default PopularCard;