import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

const tabs = ["insurance", "medical", "customer"];

const data = {
  en: {
    insurance: [
      {
        title: "Online store",
        phone: "+7 (800) 333 08-88",
        link: "shop.sogaaz.ru",
      },
      { title: "EOSAGO", phone: "+7 (800) 333 08 88", link: "direct.sogaaz.ru" },
      {
        title: "Life insurance",
        phone: "+7 (800) 600-04-40",
        link: "sogaaz-life.ru",
      },
      {
        title: "Compulsory Medical Insurance",
        phone: "+7 (800) 100 07 02",
        link: "sogaaz-med.ru",
      },
      {
        title: "Scientific Complex",
        phone: "+7 (495) 587 80-19",
        link: "npk-ins.ru",
      },
    ],
    medical: [
      {
        title: "Polyclinic",
        phone: "+7 (495) 134 11-22",
        link: "sogaaz-polyclinic.ru",
      },
      {
        title: "MedService",
        phone: "+7 (495) 146 95-55",
        link: "sogaaz-medservice.ru",
      },
      {
        title: "Electronic registration",
        phone: "+7 (800) 333 08-88",
        link: "medonline.sogaaz.ru",
      },
      {
        title: "Compulsory Medical Insurance",
        phone: "+7 (800) 100 07-02",
        link: "sogaaz-med.ru",
      },
    ],
    customer: [
      {
        title: "Corporate website",
        phone: "+7 (800) 333 08 88",
        link: "sogaaz.ru",
      },
      {
        title: "Settlement of losses",
        phone: "+7 (800) 333 08 88",
        link: "claim.sogaaz.ru",
      },
      {
        title: "Custom solutions service",
        phone: "+7 (800) 333 08 88",
        link: "my.sogaaz.ru",
      },
    ],
  },

  ru: {
    insurance: [
      {
        title: "Интернет-магазин",
        phone: "+7 (800) 333 08-88",
        link: "shop.sogaaz.ru",
      },
      { title: "ЕОСАГО", phone: "+7 (800) 333 08 88", link: "direct.sogaaz.ru" },
      {
        title: "Страхование жизни",
        phone: "+7 (800) 600-04-40",
        link: "sogaaz-life.ru",
      },
      { title: "ОМС", phone: "+7 (800) 100 07 02", link: "sogaaz-med.ru" },
      {
        title: "Научный комплекс",
        phone: "+7 (495) 587 80-19",
        link: "npk-ins.ru",
      },
    ],
    medical: [
      {
        title: "Поликлиника",
        phone: "+7 (495) 134 11-22",
        link: "sogaaz-polyclinic.ru",
      },
      {
        title: "МедСервис",
        phone: "+7 (495) 146 95-55",
        link: "sogaaz-medservice.ru",
      },
      {
        title: "Электронная запись",
        phone: "+7 (800) 333 08-88",
        link: "medonline.sogaaz.ru",
      },
      { title: "ОМС", phone: "+7 (800) 100 07-02", link: "sogaz-med.ru" },
    ],
    customer: [
      {
        title: "Корпоративный сайт",
        phone: "+7 (800) 333 08 88",
        link: "sogaaz.ru",
      },
      {
        title: "Урегулирование убытков",
        phone: "+7 (800) 333 08 88",
        link: "claim.sogaaz.ru",
      },
      {
        title: "Индивидуальные решения",
        phone: "+7 (800) 333 08 88",
        link: "my.sogaaz.ru",
      },
    ],
  },
};

const GroupSites = () => {
  const { lang } = useLanguage();
  const [activeTab, setActiveTab] = useState("insurance");

  const cards = data[lang][activeTab];

  // 🔥 GRID LOGIC
  const getGrid = () => {
    if (cards.length === 4) return "grid-cols-1 md:grid-cols-2";
    if (cards.length === 5) return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
    return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
  };

  return (
    <div className="px-4 mt-16">
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row justify-between items-center mb-10 gap-4">
        <h2 className="text-3xl md:text-4xl">
          {lang === "ru" ? "Групповые сайты" : "Group sites"}
        </h2>

        {/* TABS */}
        <div className="flex gap-1 p-1.5 bg-white rounded-2xl shadow-sm">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm rounded-xl transition ${
                activeTab === tab
                  ? "border border-blue-500 text-blue-600 bg-[#F2F8FF]"
                  : "text-gray-600 hover:bg-[#F2F8FF]"
              }`}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* CARDS */}
      <div className={`grid ${getGrid()} gap-6`}>
        {cards.map((item, i) => (
          <div
            key={i}
            className="group relative bg-white rounded-3xl p-6 min-h-[220px] hover:shadow-md transition-all"
          >
            {/* TITLE */}
            <div className="flex gap-2 mb-16">
              <span className="font-bold text-blue-700">SOGAAZ</span>
              <span className="text-gray-700 text-sm">{item.title}</span>
            </div>

            {/* CONTENT */}
            <p className="text-gray-500 text-sm">{item.phone}</p>
            <p className="text-gray-500 text-sm">{item.link}</p>

            {/* ARROW */}
            <div className="absolute bottom-4 right-4">
              <div className="w-9 h-9 flex items-center justify-center rounded-xl bg-[#F5F7FB] group-hover:bg-blue-600 group-hover:text-white transition">
                <ArrowUpRight size={16} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupSites;
