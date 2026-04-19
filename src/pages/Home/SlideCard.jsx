// import { useEffect, useState } from "react";
// // BIKE
// import bikeDesktop from "../../assets/image/bike/moto-desktop.webp";
// import bikeTablet from "../../assets/image/bike/moto-tablet.webp";
// import bikeMobile from "../../assets/image/bike/moto-mobile.webp";

// // YACHT
// import yachtDesktop from "../../assets/image/yacht/yacht-desktop.webp";
// import yachtTablet from "../../assets/image/yacht/yacht-tablet.webp";
// import yachtMobile from "../../assets/image/yacht/yacht-mobile.png";

// // AI
// import aiDesktop from "../../assets/image/cube/ai-desktop.webp";
// import aiTablet from "../../assets/image/cube/ai-tablet.webp";
// import aiMobile from "../../assets/image/cube/ai-mobile.webp";

// // PHONE
// import phoneDesktop from "../../assets/image/app-screen/app-screen-tablet.png";
// import catImg from "../../assets/image/blue-cat.png";
// import videoFile from "../../assets/video/blue-cat.mp4";

// // QR code placeholder - replace with your actual QR image import
// import qrImg from "../../assets/image/black-qr.svg";
// import { Link } from "react-router-dom";

// const slides = [
//   {
//     title: "Ready to start?",
//     desc: "Online motor insurance for motorcycles",
//     button: "Calculate",
//     img: {
//       desktop: bikeDesktop,
//       tablet: bikeTablet,
//       mobile: bikeMobile,
//     },
//     bgStyle: {
//       background: "linear-gradient(135deg, #1565C0 0%, #42A5F5 100%)",
//     },
//     textColor: "text-white",
//     showQR: false,
//   },
//   {
//     title: "Yacht\nand boat insurance",
//     desc: "For private vessels of any class",
//     button: "Calculate",
//     img: {
//       desktop: yachtDesktop,
//       tablet: yachtTablet,
//       mobile: yachtMobile,
//     },
//     bgStyle: {
//       background: "linear-gradient(135deg, #0D47A1 0%, #1976D2 100%)",
//     },
//     textColor: "text-white",
//     showQR: false,
//   },
//   {
//     title: "AI health assistant\nis now in the app",
//     desc: "Will recommend a doctor, support\nand inspire you to take care of yourself",
//     button: null,
//     img: {
//       desktop: aiDesktop,
//       tablet: aiTablet,
//       mobile: aiMobile,
//     },
//     bgStyle: {
//       background: "linear-gradient(135deg, #1E88E5 0%, #64B5F6 100%)",
//     },
//     textColor: "text-white",
//     showQR: true,
//     qrLabel: "Point your smartphone camera\nto download the app",
//   },
//   {
//     title: "All policies\nin one place",
//     desc: null,
//     button: null,
//     img: {
//       desktop: phoneDesktop,
//       tablet: phoneDesktop,
//       mobile: phoneDesktop,
//     },
//     bgStyle: { background: "#FFFFFF" },
//     textColor: "text-black",
//     showQR: true,
//     qrLabel: "Point your smartphone camera\nto download the app",
//   },

// ];

// const SlideCard = () => {
//   const [showVideo, setShowVideo] = useState(false);
//   const [current, setCurrent] = useState(0);

//   const [screen, setScreen] = useState("desktop");
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrent((prev) => (prev + 1) % slides.length);
//     }, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth < 640) {
//         setScreen("mobile");
//       } else if (window.innerWidth < 1024) {
//         setScreen("tablet");
//       } else {
//         setScreen("desktop");
//       }
//     };

//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setShowVideo(true);
//     }, 10000);
//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <div className="w-full mt-12">
//       <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
//         {/* ===== LEFT SLIDER CARD ===== */}
//         <div className="relative w-full overflow-hidden rounded-[32px] h-[360px] sm:h-[400px] md:h-[440px] lg:h-[390px] xl:h-[420px]">
//           {slides.map((slide, index) => (
//             <div
//               key={index}
//               className={`absolute inset-0 transition-opacity duration-700 ${
//                 current === index ? "opacity-100 z-10" : "opacity-0 z-0"
//               }`}
//             >
//               <div
//                 className="relative h-full flex items-start justify-between px-5 py-5"
//                 style={slide.bgStyle}
//               >
//                 {/* TEXT CONTENT */}
//                 <div
//                   className={`z-10 pt-4 max-w-[90%] sm:max-w-[70%] md:max-w-[60%] lg:max-w-[420px] ${slide.textColor}`}
//                 >
//                   {/* Title - supports newlines */}
//                   <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight whitespace-pre-line">
//                     {slide.title}
//                   </h1>

//                   {/* Description */}
//                   {slide.desc && (
//                     <p className="text-xs sm:text-sm md:text-base opacity-90 mb-6 whitespace-pre-line">
//                       {slide.desc}
//                     </p>
//                   )}

//                   {/* Calculate / Action Button */}
//                   {slide.button && (
//                     <div className="mt-16">
//                       <button
//                         className="px-8 py-3 rounded-xl text-sm font-medium"
//                         style={{
//                           background: "#FFFFFF",
//                           color: "#111111",
//                         }}
//                       >
//                         {slide.button}
//                       </button>
//                     </div>
//                   )}

//                   {/* QR Code Section (slide 3 & 4) */}
//                   {slide.showQR && (
//                     <div className="mt-6 flex items-center gap-4">
//                       {/* QR Code Box */}
//                       <div
//                         className="w-20 h-20 rounded-xl flex items-center justify-center flex-shrink-0"
//                         style={{ background: "#FFFFFF", padding: "6px" }}
//                       >
//                         {/* Replace the div below with:  */}
//                         <img
//                           src={qrImg}
//                           alt="QR Code"
//                           className="w-full h-full object-contain"
//                         />
//                       </div>
//                       {/* QR Label */}
//                       <p
//                         className="text-xs leading-relaxed whitespace-pre-line"
//                         style={{
//                           color:
//                             slide.textColor === "text-black"
//                               ? "#444"
//                               : "rgba(255,255,255,0.85)",
//                         }}
//                       >
//                         {slide.qrLabel}
//                       </p>
//                     </div>
//                   )}
//                 </div>

//                 {/* SLIDE IMAGE - anchored bottom-right */}
//                 <div className="absolute right-0 bottom-0 h-full w-[55%] md:w-[50%] lg:w-[78%] flex items-end justify-end pointer-events-none">
//                   <img
//                     src={slide.img[screen]}
//                     alt=""
//                     className="h-full w-auto object-contain"
//                   />
//                 </div>
//               </div>
//             </div>
//           ))}

//           {/* DOTS NAVIGATION */}
//           <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-20 lg:left-10 lg:translate-x-0">
//             {slides.map((_, i) => (
//               <span
//                 key={i}
//                 onClick={() => setCurrent(i)}
//                 className="cursor-pointer transition-all rounded-full"
//                 style={{
//                   height: "8px",
//                   width: current === i ? "24px" : "8px",
//                   background:
//                     current === i ? "#FFFFFF" : "rgba(255,255,255,0.45)",
//                   display: "inline-block",
//                 }}
//               />
//             ))}
//           </div>
//         </div>

//         {/* ===== RIGHT SMALL CARD (hidden on mobile) ===== */}
//         <div
//           className="hidden lg:block relative w-[340px] xl:w-[580px] h-[390px] xl:h-[420px] overflow-hidden rounded-[32px] p-6 text-white"
//           style={{
//             background: "linear-gradient(180deg, #0D2B6B 0%, #1A52C4 100%)",
//           }}
//         >
//           {/* TEXT */}
//           <div className="relative z-10 pt-4">
//             <h2 className="text-xl font-semibold mb-3">Apartment insurance</h2>
//             <span
//               className="text-xs font-semibold px-3 py-1 inline-flex items-center gap-1 rounded-sm"
//               style={{ background: "#22C55E", color: "#fff" }}
//             >
//               % NEW FAVORABLE RATES
//             </span>
//           </div>

//           {/* IMAGE or VIDEO - fills bottom of card */}
//           <Link
//             to="/apartment-insurance"
//             className="absolute bottom-0 right-0 w-full h-full flex items-end justify-end"
//           >
//             {!showVideo ? (
//               <img
//                 src={catImg}
//                 alt="apartment insurance visual"
//                 className="h-[90%] object-contain"
//               />
//             ) : (
//               <video
//                 src={videoFile}
//                 autoPlay
//                 muted
//                 loop
//                 playsInlinephoneDesktop
//                 className="h-full w-full object-cover"
//               />
//             )}
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SlideCard;
import { useEffect, useState } from "react";
import { useLanguage } from "../../context/LanguageContext";

// BIKE
import bikeDesktop from "../../assets/image/bike/moto-desktop.webp";
import bikeTablet  from "../../assets/image/bike/moto-tablet.webp";
import bikeMobile  from "../../assets/image/bike/moto-mobile.webp";

// YACHT
import yachtDesktop from "../../assets/image/yacht/yacht-desktop.webp";
import yachtTablet  from "../../assets/image/yacht/yacht-tablet.webp";
import yachtMobile  from "../../assets/image/yacht/yacht-mobile.png";

// AI
import aiDesktop from "../../assets/image/cube/ai-desktop.webp";
import aiTablet  from "../../assets/image/cube/ai-tablet.webp";
import aiMobile  from "../../assets/image/cube/ai-mobile.webp";

// PHONE
import phoneDesktop from "../../assets/image/app-screen/app-screen-tablet.png";

// APARTMENT
import catImg   from "../../assets/image/blue-cat.png";
import videoFile from "../../assets/video/blue-cat.mp4";
import qrImg    from "../../assets/image/black-qr.svg";

import { Link } from "react-router-dom";

// ─── Translations ─────────────────────────────────────────────────────────────
const t = {
  en: {
    slides: [
      {
        title:  "Ready to start?",
        desc:   "Online motor insurance for motorcycles",
        button: "Calculate",
      },
      {
        title:  "Yacht\nand boat insurance",
        desc:   "For private vessels of any class",
        button: "Calculate",
      },
      {
        title:   "AI health assistant\nis now in the app",
        desc:    "Will recommend a doctor, support\nand inspire you to take care of yourself",
        qrLabel: "Point your smartphone camera\nto download the app",
      },
      {
        title:   "All policies\nin one place",
        qrLabel: "Point your smartphone camera\nto download the app",
      },
    ],
    apartment: {
      title: "Apartment insurance",
      badge: "% NEW FAVORABLE RATES",
    },
  },

  ru: {
    slides: [
      {
        title:  "Готовы начать?",
        desc:   "Онлайн-страхование мотоциклов",
        button: "Рассчитать",
      },
      {
        title:  "Страхование\nяхт и лодок",
        desc:   "Для частных судов любого класса",
        button: "Рассчитать",
      },
      {
        title:   "ИИ-помощник\nтеперь в приложении",
        desc:    "Порекомендует врача, поддержит\nи вдохновит заботиться о себе",
        qrLabel: "Наведите камеру смартфона,\nчтобы скачать приложение",
      },
      {
        title:   "Все полисы\nв одном месте",
        qrLabel: "Наведите камеру смартфона,\nчтобы скачать приложение",
      },
    ],
    apartment: {
      title: "Страхование квартиры",
      badge: "% НОВЫЕ ВЫГОДНЫЕ ТАРИФЫ",
    },
  },
};

// ─── Static slide config (no text — images + styles only) ────────────────────
const slideConfig = [
  {
    img:      { desktop: bikeDesktop, tablet: bikeTablet, mobile: bikeMobile },
    bgStyle:  { background: "linear-gradient(135deg, #1565C0 0%, #42A5F5 100%)" },
    textColor: "text-white",
    showQR:   false,
    hasButton: true,
  },
  {
    img:      { desktop: yachtDesktop, tablet: yachtTablet, mobile: yachtMobile },
    bgStyle:  { background: "linear-gradient(135deg, #0D47A1 0%, #1976D2 100%)" },
    textColor: "text-white",
    showQR:   false,
    hasButton: true,
  },
  {
    img:      { desktop: aiDesktop, tablet: aiTablet, mobile: aiMobile },
    bgStyle:  { background: "linear-gradient(135deg, #1E88E5 0%, #64B5F6 100%)" },
    textColor: "text-white",
    showQR:   true,
    hasButton: false,
  },
  {
    img:      { desktop: phoneDesktop, tablet: phoneDesktop, mobile: phoneDesktop },
    bgStyle:  { background: "#FFFFFF" },
    textColor: "text-black",
    showQR:   true,
    hasButton: false,
  },
];

// ─── Component ────────────────────────────────────────────────────────────────
const SlideCard = () => {
  const { lang } = useLanguage();           // "en" | "ru"
  const texts = t[lang];                    // active language texts

  const [showVideo, setShowVideo] = useState(false);
  const [current,  setCurrent]   = useState(0);
  const [screen,   setScreen]    = useState("desktop");

  // On tablet: append apartment as an extra slide
  const totalSlides =
    screen === "tablet" ? slideConfig.length + 1 : slideConfig.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % totalSlides);
    }, 5000);
    return () => clearInterval(interval);
  }, [totalSlides]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640)       setScreen("mobile");
      else if (window.innerWidth < 1024) setScreen("tablet");
      else                                setScreen("desktop");
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowVideo(true), 10000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full mt-12">
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">

        {/* ── LEFT SLIDER ── */}
        <div className="relative w-full overflow-hidden rounded-[32px] h-[360px] sm:h-[400px] md:h-[440px] lg:h-[390px] xl:h-[420px]">

          {/* Normal slides */}
          {slideConfig.map((cfg, index) => {
            const tx = texts.slides[index];
            return (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-700 ${
                  current === index ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
              >
                <div
                  className="relative h-full flex items-start justify-between px-5 py-5"
                  style={cfg.bgStyle}
                >
                  {/* Text */}
                  <div className={`z-10 pt-4 max-w-[90%] sm:max-w-[70%] md:max-w-[60%] lg:max-w-[420px] ${cfg.textColor}`}>
                    <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight whitespace-pre-line">
                      {tx.title}
                    </h1>
                    {tx.desc && (
                      <p className="text-xs sm:text-sm md:text-base opacity-90 mb-6 whitespace-pre-line">
                        {tx.desc}
                      </p>
                    )}
                    {cfg.hasButton && (
                      <div className="mt-16">
                        <button
                          className="px-8 py-3 rounded-xl text-sm font-medium"
                          style={{ background: "#FFFFFF", color: "#111111" }}
                        >
                          {tx.button}
                        </button>
                      </div>
                    )}
                    {cfg.showQR && (
                      <div className="mt-6 flex items-center gap-4">
                        <div
                          className="w-20 h-20 rounded-xl flex-shrink-0 flex items-center justify-center"
                          style={{ background: "#FFFFFF", padding: "6px" }}
                        >
                          <img src={qrImg} alt="QR" className="w-full h-full object-contain" />
                        </div>
                        <p
                          className="text-xs leading-relaxed whitespace-pre-line"
                          style={{
                            color: cfg.textColor === "text-black"
                              ? "#444"
                              : "rgba(255,255,255,0.85)",
                          }}
                        >
                          {tx.qrLabel}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Responsive image */}
                  <div className="absolute right-0 bottom-0 h-full w-[55%] md:w-[50%] lg:w-[78%] flex items-end justify-end pointer-events-none">
                    <img
                      src={cfg.img[screen]}
                      alt=""
                      className="h-full w-auto object-contain"
                    />
                  </div>
                </div>
              </div>
            );
          })}

          {/* Apartment slide — tablet only, last position */}
          {screen === "tablet" && (
            <div
              className={`absolute inset-0 transition-opacity duration-700 ${
                current === slideConfig.length ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <Link
                to="/apartment-insurance"
                className="relative h-full flex items-start px-5 py-5 overflow-hidden"
                style={{ background: "linear-gradient(180deg, #0D2B6B 0%, #1A52C4 100%)" }}
              >
                <div className="relative z-10 pt-4 text-white">
                  <h2 className="text-2xl sm:text-3xl font-semibold leading-tight whitespace-pre-line mb-3">
                    {texts.apartment.title}
                  </h2>
                  <span
                    className="text-xs font-semibold px-3 py-1 inline-flex items-center gap-1 rounded-sm"
                    style={{ background: "#22C55E", color: "#fff" }}
                  >
                    {texts.apartment.badge}
                  </span>
                </div>
                <div className="absolute bottom-0 right-0 h-[90%] flex items-end justify-end">
                  {!showVideo ? (
                    <img src={catImg} alt="" className="h-full object-contain" />
                  ) : (
                    <video src={videoFile} autoPlay muted loop playsInline
                      className="h-full w-full object-cover" />
                  )}
                </div>
              </Link>
            </div>
          )}

          {/* Dots */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-20 lg:left-10 lg:translate-x-0">
            {Array.from({ length: totalSlides }).map((_, i) => (
              <span
                key={i}
                onClick={() => setCurrent(i)}
                className="cursor-pointer transition-all rounded-full"
                style={{
                  height: "8px",
                  width: current === i ? "24px" : "8px",
                  background: current === i ? "#FFFFFF" : "rgba(255,255,255,0.45)",
                  display: "inline-block",
                }}
              />
            ))}
          </div>
        </div>

        {/* ── RIGHT CARD (desktop only) ── */}
        <div
          className="hidden lg:block relative w-[340px] xl:w-[580px] h-[390px] xl:h-[420px] overflow-hidden rounded-[32px] p-6 text-white"
          style={{ background: "linear-gradient(180deg, #0D2B6B 0%, #1A52C4 100%)" }}
        >
          <div className="relative z-10 pt-4">
            <h2 className="text-xl font-semibold mb-3">{texts.apartment.title}</h2>
            <span
              className="text-xs font-semibold px-3 py-1 inline-flex items-center gap-1 rounded-sm"
              style={{ background: "#22C55E", color: "#fff" }}
            >
              {texts.apartment.badge}
            </span>
          </div>
          <Link
            to="/apartment-insurance"
            className="absolute bottom-0 right-0 w-full h-full flex items-end justify-end"
          >
            {!showVideo ? (
              <img src={catImg} alt="" className="h-[90%] object-contain" />
            ) : (
              <video src={videoFile} autoPlay muted loop playsInline
                className="h-full w-full object-cover" />
            )}
          </Link>
        </div>

      </div>
    </div>
  );
};

export default SlideCard;