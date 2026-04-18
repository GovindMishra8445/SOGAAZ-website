import { useEffect, useState } from "react";

// =============================================
// IMPORT YOUR IMAGES LIKE THIS:
// Desktop (big) images
import bikeImgBig from "../../assets/businessImage/Banner1-big.png";
import yachtImgBig from "../../assets/businessImage/Banner2-big.png";
import cubeDesignBig from "../../assets/businessImage/Banner3-big.png";
import phoneImgBig from "../../assets/businessImage/Banner4-big.png";
import catImgBig from "../../assets/businessImage/Banner5-big.png";

// Mobile (small) images
import bikeImgSmall from "../../assets/businessImage/Banner1-small.png";
import yachtImgSmall from "../../assets/businessImage/Banner2.png";
import cubeDesignSmall from "../../assets/businessImage/Banner3-small.png";
import phoneImgSmall from "../../assets/businessImage/Banner4-small.png";
import videoFileSmall from "../../assets/businessImage/Banner5-small.png";

import qrImg from "../../assets/image/black-qr.svg";
// =============================================

const slides = [
  {
    title: "Cyber first aid kit",
    desc: "Assistance in localizing and investigating a cyber incident",
    button: "Submit a request",
    buttonStyle: "outline", // white outline button
    imgBig: bikeImgBig,
    imgSmall: bikeImgSmall,
    bgStyle: {
      background:
        "linear-gradient(135deg, #1a3ec7 0%, #3a6ee8 60%, #4d8ef5 100%)",
    },
    textColor: "white",
    showQR: false,
  },
  {
    title: "Plan B",
    desc: "Comprehensive insurance for property, liability, financial and cyber risks",
    button: "Buy online",
    buttonStyle: "filled", // dark filled button
    imgBig: yachtImgBig,
    imgSmall: yachtImgSmall,
    bgStyle: { background: "#FFFFFF" },
    textColor: "dark",
    showQR: false,
  },
  {
    title: "Voluntary health insurance\nfor employees",
    desc: "A solution to increase employee engagement, retention, and reduce sick leave",
    button: "Submit a request",
    buttonStyle: "outline",
    imgBig: cubeDesignBig,
    imgSmall: cubeDesignSmall,
    bgStyle: {
      background:
        "linear-gradient(135deg, #1a3ec7 0%, #3a6ee8 60%, #4d8ef5 100%)",
    },
    textColor: "white",
    showQR: false,
  },
  {
    title: "Business assets up to 200 million rubles",
    desc: "Protecting your assets from fires, accidents, natural disasters, theft and other damage",
    button: "Buy online",
    buttonStyle: "filled",
    imgBig: phoneImgBig,
    imgSmall: phoneImgSmall,
    bgStyle: { background: "#FFFFFF" },
    textColor: "dark",
    showQR: false,
  },
  {
    title: "OGO tenants",
    desc: "Protecting your business from third-party claims related to damage caused during the operation of premises",
    button: "Submit a request",
    buttonStyle: "outline",
    imgBig: catImgBig,
    imgSmall: videoFileSmall,
    bgStyle: {
      background:
        "linear-gradient(135deg, #1a3ec7 0%, #3a6ee8 60%, #4d8ef5 100%)",
    },
    textColor: "white",
    showQR: false,
  },
];

const BusinessSlideCard = () => {
  const [current, setCurrent] = useState(0);
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);

  useEffect(() => {
    const checkSize = () => {
      setIsMobileOrTablet(window.innerWidth < 1024);
    };
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full mt-12">
      <style>{`
        /* ===== SLIDE CARD ===== */
        .slide-card {
          position: relative;
          width: 100%;
          overflow: hidden;
          border-radius: 24px;
          min-height: 200px;
        }

        /* ===== SLIDE ITEM ===== */
        .slide-item {
          position: absolute;
          inset: 0;
          transition: opacity 0.7s ease;
        }
        .slide-item.active { opacity: 1; z-index: 10; }
        .slide-item.inactive { opacity: 0; z-index: 0; }

        /* ===== INNER LAYOUT ===== */
        .slide-inner {
          position: relative;
          height: 100%;
          display: flex;
          align-items: flex-start;
          overflow: hidden;
        }

        /* ===== TEXT SIDE ===== */
        .slide-text {
          position: relative;
          z-index: 20;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100%;
        }

        /* ===== IMAGE ===== */
        .slide-img {
          position: absolute;
          right: 0;
          bottom: 0;
          pointer-events: none;
          object-fit: contain;
        }

        /* ===== DOTS ===== */
        .dots-wrapper {
          display: flex;
          gap: 6px;
          align-items: center;
        }
        .dot {
          height: 8px;
          border-radius: 9999px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: inline-block;
        }

        /* ===== BUTTON ===== */
        .slide-btn-outline {
          display: inline-block;
          padding: 12px 28px;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          background: #FFFFFF;
          color: #111111;
          border: none;
          white-space: nowrap;
        }
        .slide-btn-filled {
          display: inline-block;
          padding: 12px 28px;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          background: #1a3ec7;
          color: #FFFFFF;
          border: none;
          white-space: nowrap;
        }

        /* ====================== */
        /* DESKTOP (≥1024px)      */
        /* ====================== */
        @media (min-width: 1024px) {
          .slide-card { min-height: 340px; }

          .slide-inner {
            align-items: flex-start;
            padding: 48px 40px;
          }

          .slide-text {
            max-width: 420px;
            padding-top: 0;
          }

          .slide-title {
            font-size: 28px;
            font-weight: 600;
            line-height: 1.3;
            margin-bottom: 12px;
            white-space: pre-line;
          }

          .slide-desc {
            font-size: 14px;
            opacity: 0.9;
            margin-bottom: 0;
            white-space: pre-line;
          }

          .slide-btn-wrap {
            margin-top: 48px;
          }

          /* dots: bottom-left of card on desktop */
          .dots-wrapper {
            position: absolute;
            bottom: 16px;
            left: 40px;
            z-index: 20;
          }

          .slide-img {
            height: 100%;
            max-height: 340px;
          }
        }

        /* ====================== */
        /* TABLET (768–1023px)    */
        /* ====================== */
        @media (min-width: 768px) and (max-width: 1023px) {
          .slide-card { min-height: 260px; }

          .slide-inner {
            padding: 32px 28px 28px 28px;
            align-items: flex-start;
          }

          .slide-text {
            max-width: 55%;
          }

          .slide-title {
            font-size: 22px;
            font-weight: 600;
            line-height: 1.3;
            margin-bottom: 10px;
            white-space: pre-line;
          }

          .slide-desc {
            font-size: 13px;
            opacity: 0.9;
          }

          /* Button: bottom of card on tablet */
          .slide-btn-wrap {
            position: absolute;
            bottom: 44px; /* above dots */
            left: 28px;
            z-index: 20;
          }

          /* dots: just inside bottom of card */
          .dots-wrapper {
            position: absolute;
            bottom: 16px;
            left: 28px;
            z-index: 20;
          }

          .slide-img {
            height: 90%;
            max-height: 260px;
          }
        }

        /* ====================== */
        /* MOBILE (<768px)        */
        /* ====================== */
        @media (max-width: 767px) {
          .slide-card { min-height: 220px; }

          .slide-inner {
            padding: 24px 20px 20px 20px;
            align-items: flex-start;
          }

          .slide-text {
            max-width: 58%;
          }

          .slide-title {
            font-size: 16px;
            font-weight: 600;
            line-height: 1.3;
            margin-bottom: 8px;
            white-space: pre-line;
          }

          .slide-desc {
            font-size: 12px;
            opacity: 0.9;
          }

          /* Button: bottom of card on mobile */
          .slide-btn-wrap {
            position: absolute;
            bottom: 40px; /* above dots */
            left: 20px;
            z-index: 20;
          }

          .slide-btn-outline,
          .slide-btn-filled {
            padding: 9px 18px;
            font-size: 12px;
            border-radius: 10px;
          }

          /* dots: just inside bottom of card on mobile */
          .dots-wrapper {
            position: absolute;
            bottom: 14px;
            left: 20px;
            z-index: 20;
          }

          .slide-img {
            height: 85%;
            max-height: 220px;
          }
        }
      `}</style>

      <div className="flex gap-6">
        <div className="slide-card flex-1" style={{ position: "relative" }}>
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`slide-item ${current === index ? "active" : "inactive"}`}
              style={{ position: "absolute", inset: 0 }}
            >
              <div className="slide-inner" style={slide.bgStyle}>
                {/* ===== TEXT CONTENT ===== */}
                <div className="slide-text">
                  <div>
                    <h1
                      className="slide-title"
                      style={{
                        color:
                          slide.textColor === "dark" ? "#0d1f6e" : "#FFFFFF",
                      }}
                    >
                      {slide.title}
                    </h1>
                    {slide.desc && (
                      <p
                        className="slide-desc"
                        style={{
                          color:
                            slide.textColor === "dark"
                              ? "#333"
                              : "rgba(255,255,255,0.9)",
                        }}
                      >
                        {slide.desc}
                      </p>
                    )}
                  </div>

                  {/* QR Section */}
                  {slide.showQR && (
                    <div
                      style={{
                        marginTop: "20px",
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                      }}
                    >
                      <div
                        style={{
                          width: 72,
                          height: 72,
                          background: "#fff",
                          borderRadius: 12,
                          padding: 6,
                          flexShrink: 0,
                        }}
                      >
                        <img
                          src={qrImg}
                          alt="QR"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                          }}
                        />
                      </div>
                      <p
                        style={{
                          fontSize: 11,
                          lineHeight: 1.5,
                          color:
                            slide.textColor === "dark"
                              ? "#444"
                              : "rgba(255,255,255,0.85)",
                        }}
                      >
                        {slide.qrLabel}
                      </p>
                    </div>
                  )}
                </div>

                {/* ===== BUTTON (desktop: inline in text flow | mobile/tablet: absolute bottom) ===== */}
                {slide.button && (
                  <>
                    {/* Desktop button - rendered inside text flow via CSS margin-top */}
                    <div
                      className="slide-btn-wrap"
                      style={
                        isMobileOrTablet
                          ? undefined
                          : {
                              marginTop: "auto",
                              paddingTop: 48,
                              position: "relative",
                            }
                      }
                    >
                      {/* 
                        On desktop: slide-btn-wrap has no absolute positioning (overridden above).
                        On tablet/mobile: CSS sets it absolute bottom.
                        But we need it in the DOM for desktop as part of text column,
                        so we use a single element and let CSS handle it.
                      */}
                      <button
                        className={
                          slide.buttonStyle === "filled"
                            ? "slide-btn-filled"
                            : "slide-btn-outline"
                        }
                      >
                        {slide.button}
                      </button>
                    </div>
                  </>
                )}

                {/* ===== IMAGE ===== */}
                <img
                  src={isMobileOrTablet ? slide.imgSmall : slide.imgBig}
                  alt=""
                  className="slide-img"
                />
              </div>
            </div>
          ))}

          {/* ===== DOTS ===== */}
          <div className="dots-wrapper">
            {slides.map((_, i) => (
              <span
                key={i}
                onClick={() => setCurrent(i)}
                className="dot"
                style={{
                  width: current === i ? "24px" : "8px",
                  background:
                    slides[current].textColor === "dark"
                      ? current === i
                        ? "#1a3ec7"
                        : "rgba(26,62,199,0.3)"
                      : current === i
                        ? "#FFFFFF"
                        : "rgba(255,255,255,0.45)",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessSlideCard;
