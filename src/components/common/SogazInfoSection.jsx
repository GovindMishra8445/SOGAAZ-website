import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { useState } from "react";
import svo from "../../assets/image/svo-tablet.png";

const SogazInfoSection = () => {
  const { lang } = useLanguage();

  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isImageHovered, setIsImageHovered] = useState(false); // ✅ FIX

  const data = {
    en: [
      {
        id: "01",
        title: "Large network of offices",
        desc: "A developed network of offices throughout the country",
        highlight: false,
      },
      {
        id: "02",
        title: "High reliability",
        desc: "Top ratings from agencies",
        highlight: true,
      },
      {
        id: "03",
        title: "Largest insurer 2024",
        desc: "According to the Bank of Russia",
        highlight: false,
      },
    ],
    ru: [
      {
        id: "01",
        title: "Широкая сеть офисов",
        desc: "Развитая сеть офисов по всей стране",
        highlight: false,
      },
      {
        id: "02",
        title: "Высокая надежность",
        desc: "Высшие рейтинги агентств",
        highlight: true,
      },
      {
        id: "03",
        title: "Крупнейший страховщик 2024",
        desc: "По данным Банка России",
        highlight: false,
      },
    ],
  };

  const dataSecond = {
    en: [
      {
        id: "01",
        title: "November 21, 2025",
        desc: "ACRA upgraded SOGAZ rating",
      },
      {
        id: "02",
        title: "November 17, 2025",
        desc: "SOGAZ compensated 3.2B rubles",
      },
      {
        id: "03",
        title: "November 14, 2025",
        desc: "SOGAZ offers modular programs",
      },
    ],
    ru: [
      {
        id: "01",
        title: "21 ноября 2025",
        desc: "АКРА повысило рейтинг СОГАЗ",
      },
      {
        id: "02",
        title: "17 ноября 2025",
        desc: "СОГАЗ выплатил 3.2 млрд рублей",
      },
      {
        id: "03",
        title: "14 ноября 2025",
        desc: "СОГАЗ предлагает программы",
      },
    ],
  };

  const items = data[lang];
  const itemsSecond = dataSecond[lang];

  return (
    <>
      <div className="mt-20 px-4">
        <div className="mx-auto">
          {/* TITLE */}
          <h2 className="text-2xl md:text-3xl font-semibold mb-10">
            {lang === "ru" ? "СОГАЗ — это" : "SOGAZ is"}
          </h2>

          {/* FIRST GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {items.map((item, i) => (
              <div
                key={i}
                className={`relative rounded-3xl p-8 transition-all duration-300 ${
                  item.highlight
                    ? "bg-gradient-to-br from-blue-700 to-blue-500 text-white scale-105 md:scale-110 min-h-[340px]"
                    : "bg-white hover:shadow-md"
                }`}
              >
                <span className="absolute top-5 right-6 text-gray-400">
                  {item.id}
                </span>

                <h3 className="text-xl font-semibold mb-4">{item.title}</h3>

                <p className="text-sm opacity-80">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* SECOND TITLE */}
          <h2 className="text-2xl md:text-3xl font-semibold mt-24">
            {lang === "ru"
              ? "Следите за жизнью компании"
              : "Follow the company's life"}
          </h2>

          {/* SECOND GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {itemsSecond.map((item, i) => {
              const isHovered = hoveredIndex === i;

              return (
                <div
                  key={i}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="rounded-3xl p-8 bg-white shadow-sm hover:shadow-md transition-all"
                >
                  <h3 className="text-xl font-semibold mb-4">{item.title}</h3>

                  <p className="text-sm text-gray-500">{item.desc}</p>

                  <div className="mt-6">
                    <div
                      className="w-9 h-9 flex items-center justify-center rounded-xl transition-all"
                      style={{
                        background: isHovered ? "#2563EB" : "#F3F4F6",
                        color: isHovered ? "#fff" : "#111",
                      }}
                    >
                      <ArrowUpRight size={17} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* BUTTON */}
          <div className="mt-8">
            <button className="px-8 py-3 rounded-2xl text-sm font-semibold bg-[#E9EDF7] hover:bg-[#184DE5] hover:text-white transition-all">
              All Event
            </button>
          </div>
        </div>
      </div>

      {/* IMAGE CARD */}
      <div
        className="mt-16 rounded-3xl overflow-hidden relative"
        onMouseEnter={() => setIsImageHovered(true)}
        onMouseLeave={() => setIsImageHovered(false)}
      >
        <img
          src={svo}
          alt="svo"
          className={`w-full object-cover transition-all duration-500 ${
            isImageHovered ? "blur-sm scale-105" : ""
          }`}
        />

        <div className="absolute bottom-4 right-4">
          <button
            className={`flex items-center gap-1 bg-[#E9EDF7] rounded-2xl transition-all duration-300 ${
              isImageHovered ? "px-6 py-3" : "px-1 py-1"
            }`}
          >
            <span
              className={`text-sm transition-all ${
                isImageHovered ? "opacity-100" : "opacity-0 w-0"
              }`}
            >
              Go to
            </span>
            <ArrowUpRight size={20} />
          </button>
        </div>
      </div>
    </>
  );
};

export default SogazInfoSection;
