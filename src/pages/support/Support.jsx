// import { useState } from "react";
// import { X, ChevronDown } from "lucide-react";

// const insuranceOptions = [
//   "Mortgage",
//   "Under contracts purchased from a bank (except mortgages)",
//   "OSAGO",
//   "CASCO",
//   "Property",
//   "Accident",
//   "For those traveling abroad",
//   "voluntary health insurance",
//   "Other",
// ];

// const topicsMap = {
//   Mortgage: [
//     "Pre-trial claim for settlement of losses",
//     "Buy",
//     "Pay",
//     "Extend the contract",
//     "Make changes to the contract",
//     "Terminate the contract",
//   ],
//   "Under contracts purchased from a bank (except mortgages)": [
//     "Terminate the contract",
//   ],
//   OSAGO: [
//     "Buy",
//     "Claim review status",
//     "Report an insurance claim",
//     "Gratitude",
//     "Quality of service",
//     "Make changes to the contract",
//     "Pre-trial claim for settlement of losses",
//     "Providing a diagnostic card",
//     "Terminate the contract",
//   ],
//   CASCO: [
//     "Buy",
//     "Extend the contract",
//     "Claim review status",
//     "Report an insurance claim",
//     "Quality of service",
//     "Make changes to the contract",
//     "Pre-trial claim for refund of insurance premium",
//     "Pre-trial claim for settlement of losses",
//     "Terminate the contract",
//   ],
//   Property: [
//     "Buy",
//     "Extend the contract",
//     "Claim review status",
//     "Gratitude",
//     "Quality of service",
//     "Make changes to the contract",
//     "Pre-trial claim for refund of insurance premium",
//     "Pre-trial claim for settlement of losses",
//     "Terminate the contract",
//   ],
//   Accident: [
//     "Buy",
//     "Extend the contract",
//     "Claim review status",
//     "Gratitude",
//     "Quality of service",
//     "Make changes to the contract",
//     "Pre-trial claim for refund of insurance premium",
//     "Pre-trial claim for settlement of losses",
//     "Terminate the contract",
//   ],
//   "For those traveling abroad": [
//     "Buy",
//     "Claim review status",
//     "Report an insurance claim",
//     "Gratitude",
//     "Quality of service",
//     "Make changes to the contract",
//     "Pre-trial claim for settlement of losses",
//     "Terminate the contract",
//   ],
//   "voluntary health insurance": [
//     "Buy",
//     "Extend the contract",
//     "Claim review status",
//     "Gratitude",
//     "Quality of service",
//     "Make changes to the contract",
//     "Add a policy/child's policy",
//     "Pre-trial claim for refund of insurance premium",
//     "Pre-trial claim for settlement of losses",
//     "Terminate the contract",
//   ],
//   Other: [
//     "Gratitude",
//     "Quality of service",
//     "Pre-trial claim for settlement of losses",
//     "Compulsory Medical Insurance",
//   ],
// };

// const Support = ({ isOpen, onClose }) => {
// const [selectedOption, setSelectedOption] = useState("");
// const [selectedTopic, setSelectedTopic] = useState("");

// const [openOption, setOpenOption] = useState(false);
// const [openTopic, setOpenTopic] = useState(false);

//   return (
//     <>
//       {/* OVERLAY */}
//       <div
//         onClick={onClose}
//         className={`fixed inset-0 bg-black/40 z-40 ${
//           isOpen ? "block" : "hidden"
//         }`}
//       />

//       {/* DRAWER */}
//       <div
//         className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white z-50 transition-transform duration-300 ${
//           isOpen ? "translate-x-0" : "translate-x-full"
//         }`}
//       >
//         {/* HEADER */}
//         <div className="flex justify-between items-center p-5 border-b">
//           <h2 className="text-lg font-semibold">Support</h2>
//           <button onClick={onClose}>
//             <X size={22} />
//           </button>
//         </div>

//         {/* FORM */}
// <div className="p-5 space-y-4 overflow-y-auto h-[90%]">
//   {/* INSURANCE OPTION */}
//   <div className="relative">
//     <div
//       onClick={() => setOpenOption(!openOption)}
//       className="bg-gray-100 px-4 py-3 rounded-xl flex justify-between cursor-pointer"
//     >
//       <span>{selectedOption || "Select an insurance option *"}</span>
//       <ChevronDown size={18} />
//     </div>

//     {openOption && (
//       <div className="absolute w-full bg-white shadow-lg mt-2 rounded-xl max-h-60 overflow-auto z-10">
//         {insuranceOptions.map((item) => (
//           <div
//             key={item}
//             onClick={() => {
//               setSelectedOption(item);
//               setSelectedTopic("");
//               setOpenOption(false);
//             }}
//             className="px-4 py-3 hover:bg-blue-50 cursor-pointer"
//           >
//             {item}
//           </div>
//         ))}
//       </div>
//     )}
//   </div>

//   {/* TOPIC */}
//   <div className="relative">
//     <div
//       onClick={() => selectedOption && setOpenTopic(!openTopic)}
//       className={`px-4 py-3 rounded-xl flex justify-between ${
//         selectedOption
//           ? "bg-gray-100 cursor-pointer"
//           : "bg-gray-200 cursor-not-allowed"
//       }`}
//     >
//       <span>{selectedTopic || "Select a topic *"}</span>
//       <ChevronDown size={18} />
//     </div>

//     {openTopic && selectedOption && (
//       <div className="absolute w-full bg-white shadow-lg mt-2 rounded-xl max-h-60 overflow-auto z-10">
//         {topicsMap[selectedOption]?.map((item) => (
//           <div
//             key={item}
//             onClick={() => {
//               setSelectedTopic(item);
//               setOpenTopic(false);
//             }}
//             className="px-4 py-3 hover:bg-blue-50 cursor-pointer"
//           >
//             {item}
//           </div>
//         ))}
//       </div>
//     )}
//   </div>

//           {/* INPUTS */}
//           <input
//             placeholder="Last name First name *"
//             className="w-full bg-gray-100 px-4 py-3 rounded-xl"
//           />

//           <input
//             placeholder="City *"
//             className="w-full bg-gray-100 px-4 py-3 rounded-xl"
//           />

//           <div className="flex gap-3">
//             <input
//               placeholder="Telephone *"
//               className="w-1/2 bg-gray-100 px-4 py-3 rounded-xl"
//             />
//             <input
//               placeholder="Email *"
//               className="w-1/2 bg-gray-100 px-4 py-3 rounded-xl"
//             />
//           </div>

//           <textarea
//             placeholder="Note (optional)"
//             rows={4}
//             className="w-full bg-gray-100 px-4 py-3 rounded-xl"
//           />

//           {/* CHECKBOX */}
//           <div className="flex items-start gap-2 text-sm">
//             <input type="checkbox" />
//             <span>I give agreement to the processing of personal data</span>
//           </div>

//           {/* BUTTON */}
//           <button className="w-full bg-blue-900 text-white py-4 rounded-xl font-semibold">
//             Send
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Support;
import { useState, useEffect, useRef } from "react";
import { X, ChevronDown, RefreshCw } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

// ── Translations ──────────────────────────────────────────────
const translations = {
  en: {
    title: "Support",
    subtitle:
      "SOGAZ strives to make policy issuance and claims settlement as convenient as possible.",
    selectOption: "Select an insurance option *",
    selectTopic: "Select a topic *",
    namePlaceholder: "Last name First name *",
    cityPlaceholder: "City *",
    phonePlaceholder: "Telephone *",
    emailPlaceholder: "E-mail *",
    notePlaceholder: "Note (optional)",
    captchaLabel: "Enter characters from the image *",
    captchaRefresh: "Refresh",
    consentText: "I give",
    consentLink: "agreement",
    consentRest: "to the processing of personal data",
    submit: "Send",
    errors: {
      required: "This field is required",
      captcha: "Incorrect code entered",
      consent: "Please give consent to continue",
      email: "Enter a valid email",
      phone: "Enter a valid phone number",
    },
    insuranceOptions: [
      "Mortgage",
      "Under contracts purchased from a bank (except mortgages)",
      "OSAGO",
      "CASCO",
      "Property",
      "Accident",
      "For those traveling abroad",
      "Voluntary health insurance",
      "Other",
    ],
    topicsMap: {
      Mortgage: [
        "Pre-trial claim for settlement of losses",
        "Buy",
        "Pay",
        "Extend the contract",
        "Make changes to the contract",
        "Terminate the contract",
      ],
      "Under contracts purchased from a bank (except mortgages)": [
        "Terminate the contract",
      ],
      OSAGO: [
        "Buy",
        "Claim review status",
        "Report an insurance claim",
        "Gratitude",
        "Quality of service",
        "Make changes to the contract",
        "Pre-trial claim for settlement of losses",
        "Providing a diagnostic card",
        "Terminate the contract",
      ],
      CASCO: [
        "Buy",
        "Extend the contract",
        "Claim review status",
        "Report an insurance claim",
        "Quality of service",
        "Make changes to the contract",
        "Pre-trial claim for refund of insurance premium",
        "Pre-trial claim for settlement of losses",
        "Terminate the contract",
      ],
      Property: [
        "Buy",
        "Extend the contract",
        "Claim review status",
        "Gratitude",
        "Quality of service",
        "Make changes to the contract",
        "Pre-trial claim for refund of insurance premium",
        "Pre-trial claim for settlement of losses",
        "Terminate the contract",
      ],
      Accident: [
        "Buy",
        "Extend the contract",
        "Claim review status",
        "Gratitude",
        "Quality of service",
        "Make changes to the contract",
        "Pre-trial claim for refund of insurance premium",
        "Pre-trial claim for settlement of losses",
        "Terminate the contract",
      ],
      "For those traveling abroad": [
        "Buy",
        "Claim review status",
        "Report an insurance claim",
        "Gratitude",
        "Quality of service",
        "Make changes to the contract",
        "Pre-trial claim for settlement of losses",
        "Terminate the contract",
      ],
      "Voluntary health insurance": [
        "Buy",
        "Extend the contract",
        "Claim review status",
        "Gratitude",
        "Quality of service",
        "Make changes to the contract",
        "Add a policy/child's policy",
        "Pre-trial claim for refund of insurance premium",
        "Pre-trial claim for settlement of losses",
        "Terminate the contract",
      ],
      Other: [
        "Gratitude",
        "Quality of service",
        "Pre-trial claim for settlement of losses",
        "Compulsory Medical Insurance",
      ],
    },
  },

  ru: {
    title: "Поддержка",
    subtitle:
      "СОГАЗ стремится сделать оформление полисов и урегулирование убытков максимально удобным.",
    selectOption: "Выберите вид страхования *",
    selectTopic: "Выберите тему *",
    namePlaceholder: "Фамилия Имя *",
    cityPlaceholder: "Город *",
    phonePlaceholder: "Телефон *",
    emailPlaceholder: "E-mail *",
    notePlaceholder: "Примечание (необязательно)",
    captchaLabel: "Введите символы с картинки *",
    captchaRefresh: "Обновить",
    consentText: "Я даю",
    consentLink: "согласие",
    consentRest: "на обработку персональных данных",
    submit: "Отправить",
    errors: {
      required: "Это поле обязательно",
      captcha: "Введён неверный код",
      consent: "Необходимо дать согласие",
      email: "Введите корректный email",
      phone: "Введите корректный номер телефона",
    },
    insuranceOptions: [
      "Ипотека",
      "По договорам, приобретённым в банке (кроме ипотеки)",
      "ОСАГО",
      "КАСКО",
      "Имущество",
      "Несчастный случай",
      "Для выезжающих за рубеж",
      "ДМС",
      "Другое",
    ],
    topicsMap: {
      Ипотека: [
        "Досудебная претензия по урегулированию убытков",
        "Купить",
        "Оплатить",
        "Продлить договор",
        "Внести изменения в договор",
        "Расторгнуть договор",
      ],
      "По договорам, приобретённым в банке (кроме ипотеки)": [
        "Расторгнуть договор",
      ],
      ОСАГО: [
        "Купить",
        "Статус рассмотрения претензии",
        "Сообщить о страховом случае",
        "Благодарность",
        "Качество обслуживания",
        "Внести изменения в договор",
        "Досудебная претензия по урегулированию убытков",
        "Предоставление диагностической карты",
        "Расторгнуть договор",
      ],
      КАСКО: [
        "Купить",
        "Продлить договор",
        "Статус рассмотрения претензии",
        "Сообщить о страховом случае",
        "Качество обслуживания",
        "Внести изменения в договор",
        "Досудебная претензия о возврате страховой премии",
        "Досудебная претензия по урегулированию убытков",
        "Расторгнуть договор",
      ],
      Имущество: [
        "Купить",
        "Продлить договор",
        "Статус рассмотрения претензии",
        "Благодарность",
        "Качество обслуживания",
        "Внести изменения в договор",
        "Досудебная претензия о возврате страховой премии",
        "Досудебная претензия по урегулированию убытков",
        "Расторгнуть договор",
      ],
      "Несчастный случай": [
        "Купить",
        "Продлить договор",
        "Статус рассмотрения претензии",
        "Благодарность",
        "Качество обслуживания",
        "Внести изменения в договор",
        "Досудебная претензия о возврате страховой премии",
        "Досудебная претензия по урегулированию убытков",
        "Расторгнуть договор",
      ],
      "Для выезжающих за рубеж": [
        "Купить",
        "Статус рассмотрения претензии",
        "Сообщить о страховом случае",
        "Благодарность",
        "Качество обслуживания",
        "Внести изменения в договор",
        "Досудебная претензия по урегулированию убытков",
        "Расторгнуть договор",
      ],
      ДМС: [
        "Купить",
        "Продлить договор",
        "Статус рассмотрения претензии",
        "Благодарность",
        "Качество обслуживания",
        "Внести изменения в договор",
        "Добавить полис/полис ребёнка",
        "Досудебная претензия о возврате страховой премии",
        "Досудебная претензия по урегулированию убытков",
        "Расторгнуть договор",
      ],
      Другое: [
        "Благодарность",
        "Качество обслуживания",
        "Досудебная претензия по урегулированию убытков",
        "ОМС",
      ],
    },
  },
};

// ── Captcha generator — canvas-based ─────────────────────────
const CAPTCHA_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

const generateCaptchaText = () =>
  Array.from(
    { length: 5 },
    () => CAPTCHA_CHARS[Math.floor(Math.random() * CAPTCHA_CHARS.length)],
  ).join("");

const CaptchaCanvas = ({ text }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width;
    const H = canvas.height;

    // Background gradient
    const grad = ctx.createLinearGradient(0, 0, W, H);
    grad.addColorStop(0, "#EEF2FF");
    grad.addColorStop(1, "#E0E7FF");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    // Noise lines
    for (let i = 0; i < 6; i++) {
      ctx.beginPath();
      ctx.moveTo(Math.random() * W, Math.random() * H);
      ctx.lineTo(Math.random() * W, Math.random() * H);
      ctx.strokeStyle = `rgba(100,120,200,${0.15 + Math.random() * 0.15})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    // Noise dots
    for (let i = 0; i < 40; i++) {
      ctx.beginPath();
      ctx.arc(Math.random() * W, Math.random() * H, 1.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(80,100,200,${0.2 + Math.random() * 0.3})`;
      ctx.fill();
    }

    // Characters
    const charW = W / (text.length + 1);
    text.split("").forEach((char, i) => {
      ctx.save();
      const x = charW * (i + 0.9);
      const y = H / 2 + 8;
      const angle = (Math.random() - 0.5) * 0.4;
      ctx.translate(x, y);
      ctx.rotate(angle);

      // Random font size 24–30
      const size = 24 + Math.floor(Math.random() * 6);
      ctx.font = `bold ${size}px 'Arial Black', monospace`;

      // Shadow
      ctx.shadowColor = "rgba(0,0,100,0.15)";
      ctx.shadowBlur = 3;

      // Color alternating
      const colors = ["#0A1172", "#184DE5", "#5E5EAA", "#1e3a8a"];
      ctx.fillStyle = colors[i % colors.length];
      ctx.fillText(char, 0, 0);
      ctx.restore();
    });
  }, [text]);

  return (
    <canvas
      ref={canvasRef}
      width={180}
      height={60}
      className="rounded-xl border border-[#E0E7FF] select-none"
      style={{ userSelect: "none", pointerEvents: "none" }}
    />
  );
};

// ── Custom Dropdown ───────────────────────────────────────────
const Dropdown = ({ value, onChange, options, placeholder, error }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <div
        onClick={() => setOpen((p) => !p)}
        className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl cursor-pointer transition-colors text-sm ${
          error
            ? "border border-red-400 bg-red-50"
            : "bg-[#F3F5FA] hover:bg-[#EEF2FF] border border-transparent"
        }`}
      >
        <span className={value ? "text-gray-800" : "text-gray-400"}>
          {value || placeholder}
        </span>
        <ChevronDown
          size={16}
          className={`text-gray-400 transition-transform flex-shrink-0 ml-2 ${open ? "rotate-180" : ""}`}
        />
      </div>

      {open && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-xl z-50 max-h-56 overflow-y-auto">
          {options.map((item) => (
            <div
              key={item}
              onClick={() => {
                onChange(item);
                setOpen(false);
              }}
              className={`px-4 py-3 text-sm cursor-pointer transition-colors hover:bg-[#EEF2FF] hover:text-[#184DE5] ${
                value === item
                  ? "bg-[#EEF2FF] text-[#184DE5] font-semibold"
                  : "text-gray-700"
              }`}
            >
              {item}
            </div>
          ))}
        </div>
      )}

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

// ── Input field ───────────────────────────────────────────────
const Field = ({ placeholder, value, onChange, error, type = "text" }) => (
  <div>
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full px-4 py-3.5 rounded-xl text-sm outline-none transition-colors ${
        error
          ? "border border-red-400 bg-red-50 placeholder-red-300"
          : "bg-[#F3F5FA] border border-transparent focus:border-[#184DE5] placeholder-gray-400"
      }`}
    />
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

// ── Main Support Component ────────────────────────────────────
const Support = ({ isOpen, onClose }) => {
  const { lang } = useLanguage();
  const tx = translations[lang];

  const emptyForm = {
    option: "",
    topic: "",
    name: "",
    city: "",
    phone: "",
    email: "",
    note: "",
    captchaInput: "",
    consent: false,
  };

  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [captchaText, setCaptchaText] = useState(generateCaptchaText);
  const [submitted, setSubmitted] = useState(false);

  // Reset topic when language changes (option keys change)
  useEffect(() => {
    setForm((prev) => ({ ...prev, option: "", topic: "" }));
    setErrors({});
  }, [lang]);

  const set = (key) => (val) => setForm((prev) => ({ ...prev, [key]: val }));

  const validate = () => {
    const e = {};
    const {
      required,
      captcha: captchaErr,
      consent: consentErr,
      email: emailErr,
      phone: phoneErr,
    } = tx.errors;

    if (!form.option) e.option = required;
    if (!form.topic) e.topic = required;
    if (!form.name.trim()) e.name = required;
    if (!form.city.trim()) e.city = required;
    if (!form.phone.trim()) e.phone = required;
    else if (!/^\+?[\d\s\-()]{7,}$/.test(form.phone)) e.phone = phoneErr;
    if (!form.email.trim()) e.email = required;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = emailErr;
    if (form.captchaInput.toUpperCase() !== captchaText) e.captcha = captchaErr;
    if (!form.consent) e.consent = consentErr;

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setForm(emptyForm);
        setCaptchaText(generateCaptchaText());
        onClose();
      }, 2000);
    }
  };

  const refreshCaptcha = () => {
    setCaptchaText(generateCaptchaText());
    setForm((prev) => ({ ...prev, captchaInput: "" }));
    setErrors((prev) => ({ ...prev, captcha: undefined }));
  };

  const currentTopics = form.option ? tx.topicsMap[form.option] || [] : [];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/40 z-40 transition-opacity"
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[520px] bg-white z-50 flex flex-col transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100 flex-shrink-0">
          <h2 className="text-lg font-bold text-[#0A1172]">{tx.title}</h2>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-[#F1F2F5] transition-colors"
          >
            <X size={20} color="#0A1172" />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
          <p className="text-sm text-gray-500 leading-relaxed">{tx.subtitle}</p>

          {/* Insurance option */}
          <Dropdown
            value={form.option}
            onChange={(val) =>
              setForm((prev) => ({ ...prev, option: val, topic: "" }))
            }
            options={tx.insuranceOptions}
            placeholder={tx.selectOption}
            error={errors.option}
          />

          {/* Topic */}
          <Dropdown
            value={form.topic}
            onChange={set("topic")}
            options={currentTopics}
            placeholder={tx.selectTopic}
            error={errors.topic}
          />

          {/* Name */}
          <Field
            placeholder={tx.namePlaceholder}
            value={form.name}
            onChange={set("name")}
            error={errors.name}
          />

          {/* City */}
          <Field
            placeholder={tx.cityPlaceholder}
            value={form.city}
            onChange={set("city")}
            error={errors.city}
          />

          {/* Phone + Email */}
          <div className="flex gap-3">
            <div className="flex-1">
              <Field
                placeholder={tx.phonePlaceholder}
                value={form.phone}
                onChange={set("phone")}
                error={errors.phone}
                type="tel"
              />
            </div>
            <div className="flex-1">
              <Field
                placeholder={tx.emailPlaceholder}
                value={form.email}
                onChange={set("email")}
                error={errors.email}
                type="email"
              />
            </div>
          </div>

          {/* Note */}
          <textarea
            placeholder={tx.notePlaceholder}
            value={form.note}
            onChange={(e) => set("note")(e.target.value)}
            rows={3}
            className="w-full px-4 py-3.5 rounded-xl text-sm bg-[#F3F5FA] border border-transparent focus:border-[#184DE5] outline-none placeholder-gray-400 resize-none transition-colors"
          />

          {/* ── CAPTCHA ── */}
          <div className="bg-[#F3F5FA] rounded-2xl p-4 space-y-3">
            <div className="flex items-center gap-4">
              <CaptchaCanvas text={captchaText} />
              <button
                onClick={refreshCaptcha}
                className="flex items-center gap-1.5 text-[#184DE5] text-sm font-medium hover:text-[#5E5EAA] transition-colors"
              >
                <RefreshCw size={15} />
                {tx.captchaRefresh}
              </button>
            </div>

            <input
              type="text"
              placeholder={tx.captchaLabel}
              value={form.captchaInput}
              onChange={(e) => set("captchaInput")(e.target.value)}
              maxLength={5}
              className={`w-full px-4 py-3.5 rounded-xl text-sm outline-none transition-colors tracking-[0.2em] font-mono uppercase ${
                errors.captcha
                  ? "border border-red-400 bg-red-50 placeholder-red-300"
                  : "bg-white border border-gray-200 focus:border-[#184DE5] placeholder-gray-400"
              }`}
            />
            {errors.captcha && (
              <p className="text-red-500 text-xs">{errors.captcha}</p>
            )}
          </div>

          {/* Consent */}
          <div>
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.consent}
                onChange={(e) => set("consent")(e.target.checked)}
                className="mt-0.5 w-4 h-4 accent-[#184DE5] cursor-pointer flex-shrink-0"
              />
              <p className="text-sm text-gray-600 leading-relaxed">
                {tx.consentText}{" "}
                <a
                  href="/assets/pdf/agreement.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#184DE5] hover:text-[#5E5EAA] underline"
                >
                  {tx.consentLink}
                </a>{" "}
                {tx.consentRest}
              </p>
            </label>
            {errors.consent && (
              <p className="text-red-500 text-xs mt-1">{errors.consent}</p>
            )}
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={submitted}
            className={`w-full py-4 rounded-2xl font-bold text-sm transition-colors cursor-pointer ${
              submitted
                ? "bg-green-500 text-white"
                : "bg-[#0A1172] hover:bg-[#184DE5] text-white"
            }`}
          >
            {submitted ? "✓ Sent!" : tx.submit}
          </button>

          {/* Bottom spacing */}
          <div className="h-4" />
        </div>
      </div>
    </>
  );
};

export default Support;
