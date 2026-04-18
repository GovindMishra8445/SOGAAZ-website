import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

/* 🔥 IMAGES (set your paths) */
import heartBig from "../../assets/businessImage/Product1-big.png";
import heartSmall from "../../assets/businessImage/Product1-small.png";
import bubble from "../../assets/businessImage/Product1-big-small.png";

const tabData = {
  HEALTH: {
    main: {
      title: "Voluntary health insurance for employees",
      desc: "Services for employee health care for businesses of all sizes",
      btn: "Read more",
      images: [heartBig, heartSmall, bubble],
    },
    right: [
      {
        title: "Compulsory health insurance",
        desc: "State-guaranteed basic free medical care",
      },
      {
        title: "Accidents and illnesses",
        desc: "Insurance of enterprise employees against accidents and illnesses",
      },
    ],
    bottom: [
      {
        title: "Cumulative life insurance",
        desc: "Caring for the future of employees and their families is an effective motivational tool",
      },
      {
        title:
          "Travel insurance for those traveling outside their place of residence",
        desc: "Protecting employees from unexpected situations during business trips",
      },
    ],
  },

  PROPERTY: {
    main: {
      title: "Business assets up to 200 million rubles",
      desc: "Protecting your assets from fires, accidents, natural disasters, theft and other damage",
      btn: "Buy online",
      images: [
        /* property images */
      ],
    },
    right: [
      {
        title: "Property of enterprises",
        desc: "Protecting buildings, equipment, and other assets",
      },
      {
        title: "Construction and installation risks",
        desc: "Protection of construction sites, works and materials",
      },
    ],
    bottom: [
      {
        title: "Collateral and leased assets",
        desc: "Protection of pledged or leased property",
      },
      {
        title: "Art and Values",
        desc: "Protection of art objects and valuables",
      },
      {
        title: "Deposits and their infrastructure",
        desc: "Coverage of drilling risks and accidents",
      },
      {
        title: "Cargo",
        desc: "Cargo insurance during transportation",
      },
      {
        title: "Cargo Express",
        desc: "A turnkey solution for cargo storage worldwide",
      },
    ],
  },

  RESPONSIBILITY: {
    main: {
      title: "OGO tenants",
      desc: "Coverage of third-party claims during operation",
      btn: "Buy online",
    },
    right: [
      { title: "OSOPO", desc: "Compulsory liability insurance" },
      { title: "Responsibility of officials", desc: "Protecting executives" },
    ],
    bottom: [
      { title: "OSGOP for parks", desc: "Mandatory liability coverage" },
      { title: "OSGOP Taxi", desc: "Passenger transport liability" },
      { title: "Responsibility of manufacturers", desc: "Damage coverage" },
      { title: "Liability of shipowners", desc: "Marine liability risks" },
      { title: "Responsibility of SROs", desc: "Insurance against damages" },
      {
        title: "Environmental insurance",
        desc: "Environmental damage coverage",
      },
    ],
  },

  TRANSPORT: {
    main: {
      title: "Water transport",
      desc: "Protection of the ship's hull and equipment",
      btn: "Read more",
    },
    right: [
      { title: "Special equipment", desc: "Protection from risks" },
      { title: "Fleets", desc: "Vehicle and driver protection" },
    ],
    bottom: [
      { title: "Rail transport", desc: "Insurance of rolling stock" },
      { title: "Air transport", desc: "Aircraft insurance" },
      { title: "Cargo", desc: "Cargo insurance" },
      { title: "Cargo Express", desc: "Global cargo solution" },
    ],
  },

  "FOR SMALL AND MEDIUM-SIZED BUSINESSES": {
    main: {
      title: "Plan B",
      desc: "Comprehensive insurance for property, liability, financial and cyber risks",
      btn: "Buy online",
    },
    right: [
      { title: "Voluntary health insurance for employees", desc: "Employee care" },
      { title: "Cyber first aid kit", desc: "Cyber incident support" },
    ],
    bottom: [
      { title: "Business assets", desc: "Material asset protection" },
      { title: "OGO tenants", desc: "Third-party claim protection" },
      { title: "Accidents and illnesses", desc: "Worker protection" },
      { title: "Cargo Express", desc: "Cargo storage worldwide" },
    ],
  },
};
const tabs = [
  "HEALTH",
  "PROPERTY",
  "RESPONSIBILITY",
  "TRANSPORT",
  "FOR SMALL AND MEDIUM-SIZED BUSINESSES",
];

const BusinessAllProducts = () => {
  const [activeTab, setActiveTab] = useState("HEALTH");

  const data = tabData[activeTab];

  const total = data.bottom.length;

  let gridClass = "grid gap-6 mt-6";

  if (total === 6) {
    gridClass += " md:grid-cols-2 lg:grid-cols-3"; // 3/3
  } else if (total === 5) {
    gridClass += " md:grid-cols-2 lg:grid-cols-3"; // auto 3/2
  } else if (total === 4) {
    gridClass += " md:grid-cols-2"; // 2/2
  } else {
    gridClass += " md:grid-cols-2 lg:grid-cols-3";
  }
  return (
    <div className="mt-20">
      {/* 🔥 TITLE */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        All products
      </h2>

      {/* TAB BAR */}
      <div className="w-full bg-white rounded-full p-1 mb-8">
        <div className="flex justify-between gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 text-center cursor-pointer px-3 py-2 text-s whitespace-nowrap rounded-full transition ${
                activeTab === tab
                  ? "border border-blue-500 text-blue-600 bg-white"
                  : "text-gray-600 hover:bg-[#F2F8FF]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* 🔥 MAIN GRID */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* 🔵 BIG CARD */}
        <div className="lg:col-span-2 relative rounded-3xl overflow-hidden p-8 text-white bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] min-h-[460px] flex flex-col justify-between">
          {/* TEXT */}
          <div className="z-10 max-w-[60%]">
            <h3>{data.main.title}</h3>
            <p>{data.main.desc}</p>
          </div>

          {/* BUTTON */}
          <button className="z-10 mt-6 bg-white text-blue-700 px-5 py-2 rounded-lg text-sm flex items-center gap-2 w-fit">
            Read more <ArrowUpRight size={16} />
          </button>

          {/* 🔥 IMAGES RIGHT SIDE */}
          <div className="absolute right-0 bottom-0 w-full h-full pointer-events-none">
            <img
              src={heartBig}
              className="absolute right-10 bottom-0 w-[160px] lg:w-[220px]"
              alt=""
            />
            <img
              src={heartSmall}
              className="absolute right-32 bottom-20 w-[70px] lg:w-[90px]"
              alt=""
            />
            <img
              src={bubble}
              className="absolute right-6 top-10 w-[60px] lg:w-[80px]"
              alt=""
            />
          </div>
        </div>

        {/* 🔥 RIGHT SIDE CARDS */}
        <div className="flex flex-col gap-6 h-full">
          {data.right.map((item, i) => (
            <div
              key={i}
              className="group bg-white rounded-2xl p-6 shadow-sm flex flex-col justify-between flex-1 min-h-0 hover:shadow-md transition"
            >
              <div>
                <h4 className="font-bold text-gray-800 text-[16px]">
                  {item.title}
                </h4>

                <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
              </div>

              <button className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center mt-4 group-hover:bg-blue-600 transition">
                <ArrowUpRight
                  size={16}
                  className="text-gray-700 group-hover:text-white"
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 🔥 BOTTOM CARDS */}
      <div className={gridClass}>
        {data.bottom.map((item, i) => {
          const total = data.bottom.length;

          let extraClass = "";

          if (total === 5) {
            if (i === 3) extraClass = "lg:col-start-1";
            if (i === 3) extraClass = "lg:col-start-1";
          }

          return (
            <div
              key={i}
              className={`group bg-white rounded-2xl p-6 shadow-sm flex flex-col justify-between min-h-[230px] hover:shadow-md hover:-translate-y-1 transition ${extraClass}`}
            >
              <div>
                <h4 className="font-bold text-gray-800 text-[16px]">
                  {item.title}
                </h4>

                <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
              </div>

              <button className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center mt-4 group-hover:bg-blue-600 transition">
                <ArrowUpRight
                  size={16}
                  className="text-gray-700 group-hover:text-white"
                />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BusinessAllProducts;
