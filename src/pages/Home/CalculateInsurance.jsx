import { useState, useRef, useEffect } from "react";
import { Calendar, Info, ChevronDown } from "lucide-react";
import apartmentVideo from "../../assets/video/chair-cat.mp4";
import carVideo from "../../assets/video/osas-car.mp4";
import tripVideo from "../../assets/video/airplane.mp4";
import healthVideo from "../../assets/video/flower-gray.mp4";
import { useLanguage } from "../../context/LanguageContext";
import { COUNTRIES } from "../../utils/constants";
import { CountryDropdown } from "../../components/common/CountryDropdown";

// const tabs = [
//   { key: "APARTMENT", label: "APARTMENT" },
//   { key: "OSAGO", label: "COMPULSORY MOTOR THIRD PARTY LIABILITY INSURANCE" },
//   { key: "TRIPS", label: "TRIPS" },
//   { key: "HEALTH", label: "HEALTH" },
// ];

const tabs = [
  { key: "APARTMENT", bg: "bg-gray-100" },
  { key: "OSAGO", bg: "bg-gray-100" },
  { key: "TRIPS", bg: "bg-gray-100" },
  { key: "HEALTH", bg: "bg-gray-100" },
];

const videoBg = {
  APARTMENT: "#F3F4F6",
  OSAGO: "#F3F4F6",
  TRIPS: "#F3F4F6",
  HEALTH: "#F3F4F6",
};

const t = {
  en: {
    calcInsurance: "Calculate insurance",
    apartment: {
      title: "Apartment insurance",
      desc: "Protect yourself from unexpected expenses: insurance against flooding, fire and other risks.",
      placeholder: "Apartment address",
      btn1: "Calculate the cost",
    },
    osago: {
      title: "OSAGO",
      desc: "Your car is reliably protected: calculate the cost of your policy on the website",
      placeholder: "State number",
      btn1: "Calculate the cost",
      btn2: "Calculate without number",
    },
    trips: {
      title: "Trips",
      desc: "Safe Travel Insurance – Your Protection Anywhere in the World",
      placeholder: "Where are you flying to?",
      chips: ["Egypt", "Thailand", "Russia"],
      btn1: "Calculate the cost",
    },
    health: {
      title: "Health",
      desc: "Trust your health to the professionals: get a voluntary health insurance policy quickly and easily",
      regions: [
        "Moscow and Moscow region",
        "Saint Petersburg and Leningrad Region",
        "Regions",
      ],
      dob: "Date of birth",
      man: "Man",
      woman: "Woman",
      franchise: "Franchise",
      btn1: "Calculate the cost",
    },

    tabs: {
      APARTMENT: "Apartment",
      OSAGO: "COMPULSORY MOTOR THIRD PARTY LIABILITY INSURANCE",
      TRIPS: "Trips",
      HEALTH: "Health",
    },
  },
  ru: {
    calcInsurance: "Рассчитать страховку",
    apartment: {
      title: "Страхование квартиры",
      desc: "Защитите себя от непредвиденных расходов: страхование от затопления, пожара и других рисков.",
      placeholder: "Адрес квартиры",
      btn1: "Рассчитать стоимость",
    },
    osago: {
      title: "ОСАГО",
      desc: "Ваш автомобиль надёжно защищён: рассчитайте стоимость полиса на сайте",
      placeholder: "Государственный номер",
      btn1: "Рассчитать стоимость",
      btn2: "Рассчитать без номера",
    },
    trips: {
      title: "Поездки",
      desc: "Страхование для безопасных путешествий – ваша защита в любой точке мира",
      placeholder: "Куда вы летите?",
      chips: ["Египет", "Таиланд", "Россия"],
      btn1: "Рассчитать стоимость",
    },
    health: {
      title: "Здоровье",
      desc: "Доверьте своё здоровье профессионалам: оформите полис ДМС быстро и легко",
      regions: [
        "Москва и Московская область",
        "Санкт-Петербург и Ленобласть",
        "Регионы",
      ],
      dob: "Дата рождения",
      man: "Мужчина",
      woman: "Женщина",
      franchise: "Франшиза",
      btn1: "Рассчитать стоимость",
    },
    tabs: {
      APARTMENT: "Квартира",
      OSAGO: "ОБЯЗАТЕЛЬНОЕ СТРАХОВАНИЕ АВТОГРАЖДАНСКОЙ ОТВЕТСТВЕННОСТИ",
      TRIPS: "Поездки",
      HEALTH: "Здоровье",
    },
  },
};

/* ── Main Component ── */
const CalculateInsurance = () => {
  const [activeTab, setActiveTab] = useState("APARTMENT");
  const [activeRegion, setActiveRegion] = useState(0);
  const [gender, setGender] = useState("man");
  const [franchise, setFranchise] = useState("25%");
  const { lang } = useLanguage();
  const tx = t[lang];

  const videoMap = {
    APARTMENT: apartmentVideo,
    OSAGO: carVideo,
    TRIPS: tripVideo,
    HEALTH: healthVideo,
  };
  const currentVideo = videoMap[activeTab];

  return (
    <div className="mt-16 px-4 md:px-8 lg:px-0">
      {/* Header row */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          {tx.calcInsurance}
        </h2>

        {/* Tabs */}
        <div className="flex gap-1 bg-white p-1 rounded-full overflow-x-auto flex-shrink-0 shadow-sm">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-3 py-1.5 text-[11px] font-semibold rounded-full ${
                activeTab === tab.key
                  ? "border border-[#184DE5] text-[#184DE5]"
                  : "text-gray-500"
              }`}
            >
              {tx.tabs[tab.key]}
            </button>
          ))}
        </div>
      </div>

      {/* Main card */}
      <div className="bg-white rounded-3xl p-6 flex flex-col lg:flex-row gap-6 items-center">
        <div className="flex flex-col lg:flex-row">
          {/* LEFT — Video with bg color */}
          <div className="w-full lg:w-1/2 rounded-2xl flex items-center justify-center p-6">
            <div className="max-w-[620px] rounded-2xl overflow-hidden">
              <video
                key={activeTab}
                src={currentVideo}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          {/* RIGHT — Text + Form */}
          <div className="w-full lg:w-1/2 p-8 flex flex-col justify-between min-h-[420px]">
            {/* TOP: Title + desc */}
            <div>
              {activeTab === "APARTMENT" && (
                <>
                  <h3 className="text-xl font-bold text-[#0A1172] mb-2">
                    {tx.apartment.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {tx.apartment.desc}
                  </p>
                </>
              )}
              {activeTab === "OSAGO" && (
                <>
                  <h3 className="text-xl font-bold text-[#0A1172] mb-2">
                    {tx.osago.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {tx.osago.desc}
                  </p>
                </>
              )}
              {activeTab === "TRIPS" && (
                <>
                  <h3 className="text-xl font-bold text-[#0A1172] mb-2">
                    {tx.trips.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {tx.trips.desc}
                  </p>
                </>
              )}
              {activeTab === "HEALTH" && (
                <>
                  <h3 className="text-xl font-bold text-[#0A1172] mb-2">
                    {tx.health.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {tx.health.desc}
                  </p>
                </>
              )}
            </div>

            {/* BOTTOM: Inputs + Buttons */}
            <div className="mt-8">
              {/* APARTMENT */}
              {activeTab === "APARTMENT" && (
                <>
                  <input
                    type="text"
                    placeholder={tx.apartment.placeholder}
                    className="w-full rounded-2xl px-4 py-3.5 text-sm text-gray-700 outline-none border border-transparent focus:border-[#184DE5] transition-colors placeholder-gray-400 mb-5"
                  />
                  <button className="bg-[#0A1172] hover:bg-[#184DE5] transition-colors text-white px-8 py-3.5 rounded-2xl font-semibold text-sm cursor-pointer">
                    {tx.apartment.btn1}
                  </button>
                </>
              )}

              {/* OSAGO */}
              {activeTab === "OSAGO" && (
                <>
                  <input
                    type="text"
                    placeholder={tx.osago.placeholder}
                    className="w-full bg-[#F3F5FA] rounded-2xl px-4 py-3.5 text-sm text-gray-700 outline-none border border-transparent focus:border-[#184DE5] transition-colors placeholder-gray-400 mb-5"
                  />
                  <div className="flex gap-3 flex-wrap">
                    <button className="bg-[#0A1172] hover:bg-[#184DE5] transition-colors text-white px-8 py-3.5 rounded-2xl font-semibold text-sm cursor-pointer">
                      {tx.osago.btn1}
                    </button>
                    <button className=" hover:bg-[#EEF2FF] transition-colors text-gray-700 px-6 py-3.5 rounded-2xl font-semibold text-sm cursor-pointer">
                      {tx.osago.btn2}
                    </button>
                  </div>
                </>
              )}

              {/* TRIPS */}
              {activeTab === "TRIPS" && (
                <>
                  <CountryDropdown placeholder={tx.trips.placeholder} />
                  <div className="flex gap-2 mt-3 mb-5 flex-wrap">
                    {tx.trips.chips.map((chip) => (
                      <button
                        key={chip}
                        className="border border-gray-200 px-3.5 py-1.5 rounded-full text-sm text-gray-600 hover:border-[#184DE5] hover:text-[#184DE5] transition-colors cursor-pointer"
                      >
                        {chip}
                      </button>
                    ))}
                  </div>
                  <button className="bg-[#0A1172] hover:bg-[#184DE5] transition-colors text-white px-8 py-3.5 rounded-2xl font-semibold text-sm cursor-pointer">
                    {tx.trips.btn1}
                  </button>
                </>
              )}

              {/* HEALTH */}
              {activeTab === "HEALTH" && (
                <>
                  {/* Region pills */}
                  <div className="flex gap-2 mb-4 flex-wrap">
                    {tx.health.regions.map((r, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveRegion(i)}
                        className={`px-4 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                          activeRegion === i
                            ? "bg-[#0A1172] text-white"
                            : "bg-[#F3F5FA] text-gray-600 hover:bg-[#EEF2FF] hover:text-[#184DE5]"
                        }`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>

                  {/* DOB + Gender row */}
                  <div className="flex gap-3 mb-4">
                    <div className="flex-1 relative">
                      <input
                        type="date"
                        placeholder={tx.health.dob}
                        className="w-full bg-[#F3F5FA] rounded-2xl px-4 py-3.5 text-sm text-gray-600 outline-none border border-transparent focus:border-[#184DE5] transition-colors"
                      />
                    </div>
                    <div className="flex rounded-2xl overflow-hidden border border-gray-200">
                      <button
                        onClick={() => setGender("man")}
                        className={`px-5 py-3.5 text-sm font-semibold transition-colors cursor-pointer ${
                          gender === "man"
                            ? "bg-white text-[#0A1172]"
                            : "bg-[#F3F5FA] text-gray-400"
                        }`}
                      >
                        {tx.health.man}
                      </button>
                      <button
                        onClick={() => setGender("woman")}
                        className={`px-5 py-3.5 text-sm font-semibold transition-colors cursor-pointer ${
                          gender === "woman"
                            ? "bg-white text-[#0A1172]"
                            : "bg-[#F3F5FA] text-gray-400"
                        }`}
                      >
                        {tx.health.woman}
                      </button>
                    </div>
                  </div>

                  {/* Franchise */}
                  <div className="mb-5">
                    <div className="flex items-center gap-1.5 mb-2">
                      <span className="text-sm font-semibold text-gray-800">
                        {tx.health.franchise}
                      </span>
                      <Info size={14} className="text-gray-400 cursor-help" />
                    </div>
                    <div className="flex rounded-2xl overflow-hidden border border-gray-200">
                      {["25%", "50%"].map((f) => (
                        <button
                          key={f}
                          onClick={() => setFranchise(f)}
                          className={`flex-1 py-3.5 text-sm font-semibold transition-colors cursor-pointer ${
                            franchise === f
                              ? "bg-white text-[#0A1172]"
                              : "bg-[#F3F5FA] text-gray-400"
                          }`}
                        >
                          {f}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button className="bg-[#0A1172] hover:bg-[#184DE5] transition-colors text-white px-8 py-3.5 rounded-2xl font-semibold text-sm cursor-pointer">
                    {tx.health.btn1}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculateInsurance;
