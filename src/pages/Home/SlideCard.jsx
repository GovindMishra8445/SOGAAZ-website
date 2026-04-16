import { useEffect, useState } from "react";
import bikeImg from "../../assets/image/bike.png";
import yachtImg from "../../assets/image/yacht-mobile.png";
import cubeDesign from "../../assets/image/cube-design.png";
import phoneImg from "../../assets/image/app-screen-tablet.png";
import catImg from "../../assets/image/blue-cat.png";
import videoFile from "../../assets/video/blue-cat.mp4";

// QR code placeholder - replace with your actual QR image import
import qrImg from "../../assets/image/black-qr.svg";

const slides = [
  {
    title: "Ready to start?",
    desc: "Online motor insurance for motorcycles",
    button: "Calculate",
    img: bikeImg,
    bgStyle: {
      background: "linear-gradient(135deg, #1565C0 0%, #42A5F5 100%)",
    },
    textColor: "text-white",
    showQR: false,
  },
  {
    title: "Yacht\nand boat insurance",
    desc: "For private vessels of any class",
    button: "Calculate",
    img: yachtImg,
    bgStyle: {
      background: "linear-gradient(135deg, #0D47A1 0%, #1976D2 100%)",
    },
    textColor: "text-white",
    showQR: false,
  },
  {
    title: "AI health assistant\nis now in the app",
    desc: "Will recommend a doctor, support\nand inspire you to take care of yourself",
    button: null,
    img: cubeDesign,
    bgStyle: {
      background: "linear-gradient(135deg, #1E88E5 0%, #64B5F6 100%)",
    },
    textColor: "text-white",
    showQR: true,
    qrLabel: "Point your smartphone camera\nto download the app",
  },
  {
    title: "All policies\nin one place",
    desc: null,
    button: null,
    img: phoneImg,
    bgStyle: { background: "#FFFFFF" },
    textColor: "text-black",
    showQR: true,
    qrLabel: "Point your smartphone camera\nto download the app",
  },
];

const SlideCard = () => {
  const [showVideo, setShowVideo] = useState(false);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowVideo(true);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full mt-12">
      <div className="flex gap-6">
        {/* ===== LEFT SLIDER CARD ===== */}
        <div className="relative flex-1 overflow-hidden rounded-3xl min-h-[340px]">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-700 ${
                current === index ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <div
                className="relative h-full flex items-start justify-between px-10 py-12"
                style={slide.bgStyle}
              >
                {/* TEXT CONTENT */}
                <div className={`z-10 pt-4 max-w-[420px] ${slide.textColor}`}>
                  {/* Title - supports newlines */}
                  <h1 className="text-3xl font-semibold mb-3 leading-tight whitespace-pre-line">
                    {slide.title}
                  </h1>

                  {/* Description */}
                  {slide.desc && (
                    <p className="text-sm opacity-90 mb-6 whitespace-pre-line">
                      {slide.desc}
                    </p>
                  )}

                  {/* Calculate / Action Button */}
                  {slide.button && (
                    <div className="mt-16">
                      <button
                        className="px-8 py-3 rounded-xl text-sm font-medium"
                        style={{
                          background: "#FFFFFF",
                          color: "#111111",
                        }}
                      >
                        {slide.button}
                      </button>
                    </div>
                  )}

                  {/* QR Code Section (slide 3 & 4) */}
                  {slide.showQR && (
                    <div className="mt-6 flex items-center gap-4">
                      {/* QR Code Box */}
                      <div
                        className="w-20 h-20 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: "#FFFFFF", padding: "6px" }}
                      >
                        {/* Replace the div below with:  */}
                        <img src={qrImg} alt="QR Code" className="w-full h-full object-contain" />
                       
                      </div>
                      {/* QR Label */}
                      <p
                        className="text-xs leading-relaxed whitespace-pre-line"
                        style={{
                          color:
                            slide.textColor === "text-black"
                              ? "#444"
                              : "rgba(255,255,255,0.85)",
                        }}
                      >
                        {slide.qrLabel}
                      </p>
                    </div>
                  )}
                </div>

                {/* SLIDE IMAGE - anchored bottom-right */}
                <div className="absolute right-0 bottom-0 h-full flex items-end pointer-events-none">
                  <img
                    src={slide.img}
                    alt=""
                    className="h-[100%] object-contain"
                  />
                </div>
              </div>
            </div>
          ))}

          {/* DOTS NAVIGATION */}
          <div className="absolute bottom-4 left-10 flex gap-2 z-20">
            {slides.map((_, i) => (
              <span
                key={i}
                onClick={() => setCurrent(i)}
                className="cursor-pointer transition-all rounded-full"
                style={{
                  height: "8px",
                  width: current === i ? "24px" : "8px",
                  background:
                    current === i ? "#FFFFFF" : "rgba(255,255,255,0.45)",
                  display: "inline-block",
                }}
              />
            ))}
          </div>
        </div>

        {/* ===== RIGHT SMALL CARD (hidden on mobile) ===== */}
        <div
          className="hidden lg:block relative w-[380px] overflow-hidden rounded-3xl p-6 text-white"
          style={{
            background: "linear-gradient(180deg, #0D2B6B 0%, #1A52C4 100%)",
          }}
        >
          {/* TEXT */}
          <div className="relative z-10 pt-4">
            <h2 className="text-xl font-semibold mb-3">Apartment insurance</h2>
            <span
              className="text-xs font-semibold px-3 py-1 inline-flex items-center gap-1 rounded-sm"
              style={{ background: "#22C55E", color: "#fff" }}
            >
              % NEW FAVORABLE RATES
            </span>
          </div>

          {/* IMAGE or VIDEO - fills bottom of card */}
          <div className="absolute bottom-0 right-0 w-full h-full flex items-end justify-end">
            {!showVideo ? (
              <img
                src={catImg}
                alt="apartment insurance visual"
                className="h-[90%] object-contain"
              />
            ) : (
              <video
                src={videoFile}
                autoPlay
                muted
                loop
                playsInline
                className="h-full w-full object-cover"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlideCard;
