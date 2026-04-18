import { useLanguage } from "../../context/LanguageContext";

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
      desc: "The highest ratings from leading rating agencies - Expert RA, ACRA and NKR. The highest international credit rating for Russia is A- with a stable outlook from ACRA.",
      highlight: true,
    },
    {
      id: "03",
      title: "Largest insurer 2024",
      desc: "According to the Bank of Russia, collections and payments for types of insurance other than life insurance",
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
      desc: "Высшие рейтинги от ведущих агентств — Эксперт РА, АКРА и НКР. Международный кредитный рейтинг A- со стабильным прогнозом.",
      highlight: true,
    },
    {
      id: "03",
      title: "Крупнейший страховщик 2024",
      desc: "По данным Банка России по сборам и выплатам по видам страхования, кроме страхования жизни",
      highlight: false,
    },
  ],
};

const SogazInfoSection = () => {
  const { lang } = useLanguage();
  const items = data[lang];

  return (
    <div className="mt-20 px-4">
      <div className="mx-auto">
        {/* 🔥 TITLE */}
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-10">
          SOGAAZ is
        </h2>

        {/* 🔥 CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, index) => (
            <div
              key={index}
              className={`relative rounded-3xl gap-6 p-8 transition-all duration-300 ${
                item.highlight
                  ? "bg-gradient-to-br from-blue-700 to-blue-500 text-white shadow-lg scale-105 md:scale-110 min-h-[280px]"
                  : "bg-white text-gray-800 hover:shadow-md"
              }`}
            >
              {/* NUMBER */}
              <span
                className={`absolute top-5 right-6 text-lg font-medium ${
                  item.highlight ? "text-white/70" : "text-gray-400"
                }`}
              >
                {item.id}
              </span>

              {/* CONTENT */}
              <h3 className="text-xl font-semibold mb-4">{item.title}</h3>

              <p
                className={`text-sm leading-relaxed ${
                  item.highlight ? "text-white/80" : "text-gray-500"
                }`}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SogazInfoSection;
