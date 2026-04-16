import { useLanguage } from "../../context/LanguageContext";
import qrImg from "../../assets/image/black-qr.svg"; // 👉 apna QR image
import phoneImg from "../../assets/image/app-screen-tablet.png"; // 👉 app mobile image
import SogazInfoSection from "./SogazInfoSection";

const t = {
  en: {
    title: "Download the app",
    desc: "Insurance policies are always with you",
    qrText: "Point your smartphone camera to download the app",
  },
  ru: {
    title: "Скачайте приложение",
    desc: "Страховые полисы всегда с вами",
    qrText: "Наведите камеру смартфона для скачивания приложения",
  },
};

const DownloadAppDesign = () => {
  const { lang } = useLanguage();
  const tx = t[lang];

  return (
    <div className="mt-20 px-4">
      <div className=" mx-auto bg-white rounded-3xl p-6 md:p-10 flex flex-col lg:flex-row items-center justify-between gap-10 relative overflow-hidden">
        {/* 🔵 GLOW EFFECT CENTER */}
        <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
          <div className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] bg-blue-500 opacity-30 blur-[120px] rounded-full"></div>
        </div>

        {/* 🔥 LEFT TEXT */}
        <div className="z-10 text-center lg:text-left max-w-[300px]">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">
            {tx.title}
          </h2>
          <p className="text-sm text-gray-500">{tx.desc}</p>
        </div>

        {/* 🔥 CENTER IMAGE */}
        <div className="z-10 flex justify-center">
          <img
            src={phoneImg}
            alt="app"
            className="h-[120px] md:h-[300px] object-contain"
          />
        </div>

        {/* 🔥 RIGHT QR */}
        <div className="z-10 flex flex-col items-center text-center">
          <img src={qrImg} alt="qr" className="w-[120px] h-[120px] mb-3" />
          <p className="text-xs text-gray-500 max-w-[160px]">{tx.qrText}</p>
        </div>
      </div>
      <SogazInfoSection />
    </div>
  );
};

export default DownloadAppDesign;
