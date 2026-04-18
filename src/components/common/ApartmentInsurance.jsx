import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Info,
  ChevronRight,
  ChevronDown,
  Check,
  ArrowLeft,
  ArrowRight,
  Circle,
} from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import ApartmentInsuranceInfo from "./ApartmentInsuranceInfo";

const tx = {
  en: {
    breadcrumb1: "Real estate",
    breadcrumb2: "Apartment insurance",
    pageTitle: "Apartment insurance",
    steps: ["Program", "Object", "Policyholder", "Payment"],
    plans: [
      {
        name: "Simple +",
        badge: null,
        price: "2,750 ₽",
        priceNum: 2750,
        items: [
          { label: "Damage coverage", value: "up to 410,000 ₽", info: false },
          {
            label:
              "Interior finishing with communication systems and equipment",
            value: "300,000",
            info: true,
          },
          { label: "Civil liability", value: "50,000", info: true },
          { label: "Household property", value: "50,000", info: true },
          {
            label: "Home handyman",
            value: "10,000",
            info: true,
            toggle: true,
            defaultOn: true,
          },
        ],
      },
      {
        name: "Base",
        badge: null,
        price: "6,750 ₽",
        priceNum: 6750,
        items: [
          { label: "Damage coverage", value: "up to 2,110,000 ₽", info: false },
          {
            label:
              "Interior finishing with communication systems and equipment",
            value: "700,000",
            info: true,
          },
          { label: "Civil liability", value: "700,000", info: true },
          { label: "Household property", value: "700,000", info: true },
          {
            label: "Home handyman",
            value: "10,000",
            info: true,
            toggle: true,
            defaultOn: false,
          },
        ],
      },
      {
        name: "Express",
        badge: "CHOOSE MORE OFTEN",
        price: "7,850 ₽",
        priceNum: 7850,
        items: [
          { label: "Damage coverage", value: "up to 7,110,000 ₽", info: false },
          { label: "Structural elements", value: "5,000,000", info: true },
          {
            label:
              "Interior finishing with communication systems and equipment",
            value: "700,000",
            info: true,
          },
          { label: "Civil liability", value: "700,000", info: true },
          { label: "Household property", value: "700,000", info: true },
          {
            label: "Home handyman",
            value: "10,000",
            info: true,
            toggle: true,
            defaultOn: true,
          },
        ],
      },
    ],
    step2Title: "Apartment address and insurance period",
    fillFaster: "Fill faster",
    address: "Address",
    addressPlaceholder: "City, street, house, apartment",
    addressHint: "The address of the apartment you are insuring",
    startDate: "Beginning of the action",
    dateHint: "The policy is valid for 1 year",
    contacts: "Contacts",
    telephone: "Telephone",
    telephoneHint: "To contact you",
    mail: "Mail",
    mailPlaceholder: "hello@sogaz.ru",
    mailHint: "The policy will be sent to this address.",
    program: "Program",
    damageCoverage: "Damage coverage",
    price: "Price",
    next: "Next",
    back: "Back",
    step3Title: "Policyholder information",
    lastName: "Last name",
    firstName: "First name",
    middleName: "Middle name",
    dob: "Date of birth",
    passportSeries: "Passport series",
    passportNumber: "Passport number",
    issuedBy: "Issued by",
    issueDate: "Issue date",
    step4Title: "Payment",
    totalPrice: "Total",
    payBtn: "Pay",
  },
  ru: {
    breadcrumb1: "Недвижимость",
    breadcrumb2: "Страхование квартиры",
    pageTitle: "Страхование квартиры",
    steps: ["Программа", "Объект", "Страхователь", "Оплата"],
    plans: [
      {
        name: "Простой +",
        badge: null,
        price: "2 750 ₽",
        priceNum: 2750,
        items: [
          { label: "Покрытие ущерба", value: "до 410 000 ₽", info: false },
          {
            label: "Внутренняя отделка с коммуникациями и оборудованием",
            value: "300 000",
            info: true,
          },
          { label: "Гражданская ответственность", value: "50 000", info: true },
          { label: "Домашнее имущество", value: "50 000", info: true },
          {
            label: "Домашний мастер",
            value: "10 000",
            info: true,
            toggle: true,
            defaultOn: true,
          },
        ],
      },
      {
        name: "Базовый",
        badge: null,
        price: "6 750 ₽",
        priceNum: 6750,
        items: [
          { label: "Покрытие ущерба", value: "до 2 110 000 ₽", info: false },
          {
            label: "Внутренняя отделка с коммуникациями и оборудованием",
            value: "700 000",
            info: true,
          },
          {
            label: "Гражданская ответственность",
            value: "700 000",
            info: true,
          },
          { label: "Домашнее имущество", value: "700 000", info: true },
          {
            label: "Домашний мастер",
            value: "10 000",
            info: true,
            toggle: true,
            defaultOn: false,
          },
        ],
      },
      {
        name: "Экспресс",
        badge: "ВЫБИРАЮТ ЧАЩЕ",
        price: "7 850 ₽",
        priceNum: 7850,
        items: [
          { label: "Покрытие ущерба", value: "до 7 110 000 ₽", info: false },
          { label: "Конструктивные элементы", value: "5 000 000", info: true },
          {
            label: "Внутренняя отделка с коммуникациями и оборудованием",
            value: "700 000",
            info: true,
          },
          {
            label: "Гражданская ответственность",
            value: "700 000",
            info: true,
          },
          { label: "Домашнее имущество", value: "700 000", info: true },
          {
            label: "Домашний мастер",
            value: "10 000",
            info: true,
            toggle: true,
            defaultOn: true,
          },
        ],
      },
    ],
    step2Title: "Адрес квартиры и период страхования",
    fillFaster: "Заполнить быстрее",
    address: "Адрес",
    addressPlaceholder: "Город, улица, дом, квартира",
    addressHint: "Адрес квартиры, которую вы страхуете",
    startDate: "Начало действия",
    dateHint: "Полис действует 1 год",
    contacts: "Контакты",
    telephone: "Телефон",
    telephoneHint: "Для связи с вами",
    mail: "Почта",
    mailPlaceholder: "hello@sogaz.ru",
    mailHint: "На этот адрес будет отправлен полис.",
    program: "Программа",
    damageCoverage: "Покрытие ущерба",
    price: "Стоимость",
    next: "Далее",
    back: "Назад",
    step3Title: "Данные страхователя",
    lastName: "Фамилия",
    firstName: "Имя",
    middleName: "Отчество",
    dob: "Дата рождения",
    passportSeries: "Серия паспорта",
    passportNumber: "Номер паспорта",
    issuedBy: "Кем выдан",
    issueDate: "Дата выдачи",
    step4Title: "Оплата",
    totalPrice: "Итого",
    payBtn: "Оплатить",
  },
};

const Toggle = ({ on, onToggle }) => (
  <button
    onClick={onToggle}
    className={`relative w-10 h-6 rounded-full transition-colors flex-shrink-0 cursor-pointer ${on ? "bg-[#184DE5]" : "bg-gray-300"}`}
  >
    <span
      className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${on ? "left-5" : "left-1"}`}
    />
  </button>
);

const StepBar = ({ current, steps }) => (
  <div className="flex items-center flex-wrap gap-y-3 mb-8">
    {steps.map((s, i) => {
      const done = i < current,
        active = i === current;
      return (
        <div key={i} className="flex items-center">
          <div className="flex items-center gap-2">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${done ? "bg-[#184DE5] text-white" : active ? "bg-[#0A1172] text-white" : "bg-white border-2 border-gray-300 text-gray-400"}`}
            >
              {done ? <Check size={13} /> : i + 1}
            </div>
            <span
              className={`text-sm font-medium whitespace-nowrap ${active ? "text-[#0A1172]" : done ? "text-[#184DE5]" : "text-gray-400"}`}
            >
              {s}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div
              className={`mx-3 h-px w-5 ${done ? "bg-[#184DE5]" : "bg-gray-200"}`}
            />
          )}
        </div>
      );
    })}
  </div>
);

const PlanCard = ({ plan, onChoose, lang }) => {
  const [toggles, setToggles] = useState(
    plan.items.map((i) => (i.toggle ? i.defaultOn : null)),
  );
  return (
    <div className="bg-white rounded-2xl p-6 flex flex-col border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-bold text-[#0A1172]">{plan.name}</h3>
        <div className="w-10 h-10 rounded-xl bg-[#EEF2FF] flex items-center justify-center flex-shrink-0">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"
              stroke="#184DE5"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9 22V12h6v10"
              stroke="#184DE5"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      <div className="flex-1 divide-y divide-gray-100">
        {plan.items.map((item, j) => (
          <div key={j} className="flex items-center justify-between py-3 gap-2">
            <span
              className={`text-sm leading-tight flex-1 ${j === 0 ? "text-gray-500" : "text-gray-700"}`}
            >
              {item.label}
            </span>
            <div className="flex items-center gap-1.5 flex-shrink-0">
              {item.toggle ? (
                <>
                  <Toggle
                    on={toggles[j]}
                    onToggle={() =>
                      setToggles((p) => p.map((v, k) => (k === j ? !v : v)))
                    }
                  />
                  <span className="text-sm font-semibold text-gray-800 w-14 text-right">
                    {item.value}
                  </span>
                </>
              ) : (
                <span
                  className={`text-sm font-semibold text-right ${j === 0 ? "text-[#0A1172]" : "text-gray-800"}`}
                >
                  {item.value}
                </span>
              )}
              {item.info && (
                <Info
                  size={13}
                  className="text-gray-400 cursor-help flex-shrink-0"
                />
              )}
            </div>
          </div>
        ))}
      </div>
      {plan.badge && (
        <div className="mt-4 bg-green-500 text-white text-xs font-bold text-center py-2 rounded-xl tracking-wide">
          ⊕ {plan.badge}
        </div>
      )}
      <div className="mt-6">
        <p className="text-3xl font-bold text-[#0A1172] mb-3">{plan.price}</p>
        <button
          onClick={() => onChoose(plan)}
          className="w-full flex items-center justify-center gap-2 bg-[#0A1172] hover:bg-[#184DE5] transition-colors text-white py-3.5 rounded-xl font-semibold text-sm cursor-pointer"
        >
          <Circle size={15} strokeWidth={2} />
          {lang === "en" ? "Choose" : "Выбрать"}
        </button>
      </div>
    </div>
  );
};

const SummaryCard = ({ t, selectedPlan, onNext }) => (
  <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm sticky top-24">
    <div className="flex justify-between mb-1">
      <span className="text-sm text-gray-400">{t.program}</span>
      <span className="font-bold text-[#0A1172]">{selectedPlan?.name}</span>
    </div>
    <div className="flex justify-between mb-4">
      <span className="text-sm text-gray-400">{t.damageCoverage}</span>
      <button className="flex items-center gap-1 text-sm text-gray-600">
        {selectedPlan?.items[0]?.value}
        <ChevronDown size={13} />
      </button>
    </div>
    <div className="border-t border-gray-100 pt-4">
      <p className="text-sm text-gray-400 mb-1">{t.price}</p>
      <p className="text-3xl font-bold text-[#0A1172]">{selectedPlan?.price}</p>
    </div>
    <button
      onClick={onNext}
      className="mt-5 w-full flex items-center justify-center gap-2 bg-[#0A1172] hover:bg-[#184DE5] transition-colors text-white py-3.5 rounded-xl font-semibold text-sm cursor-pointer"
    >
      {t.next} <ArrowRight size={14} />
    </button>
  </div>
);

const BackBtn = ({ onClick, label }) => (
  <button
    onClick={onClick}
    className="mt-4 flex items-center gap-2 border border-gray-200 px-5 py-3 rounded-xl text-sm font-semibold text-gray-600 hover:bg-[#F1F2F5] transition-colors cursor-pointer"
  >
    <ArrowLeft size={14} /> {label}
  </button>
);

const inputCls =
  "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#184DE5] transition-colors";

const StepObject = ({ t, selectedPlan, onNext, onBack }) => (
  <div className="flex flex-col lg:flex-row gap-6">
    <div className="flex-1 space-y-4">
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-bold text-[#0A1172]">{t.step2Title}</h3>
          <button className="flex items-center gap-1 text-[#184DE5] text-sm">
            {t.fillFaster} <Info size={13} />
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-600 mb-1.5 block">
              {t.address} <span className="text-red-500">*</span>
            </label>
            <input placeholder={t.addressPlaceholder} className={inputCls} />
            <p className="text-xs text-gray-400 mt-1">{t.addressHint}</p>
          </div>
          <div>
            <label className="text-sm text-gray-600 mb-1.5 block">
              {t.startDate} <span className="text-red-500">*</span>
            </label>
            <div className="inline-flex items-center border border-gray-200 rounded-xl px-4 py-3 gap-2 text-sm text-gray-700">
              23.04.2026
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#9ca3af"
                strokeWidth="2"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <path d="M16 2v4M8 2v4M3 10h18" />
              </svg>
            </div>
            <p className="text-xs text-gray-400 mt-1">{t.dateHint}</p>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <h3 className="font-bold text-[#0A1172] mb-5">{t.contacts}</h3>
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-600 mb-1.5 block">
              {t.telephone} <span className="text-red-500">*</span>
            </label>
            <input placeholder="+7 (000) 000-00-00" className={inputCls} />
            <p className="text-xs text-gray-400 mt-1">{t.telephoneHint}</p>
          </div>
          <div>
            <label className="text-sm text-gray-600 mb-1.5 block">
              {t.mail} <span className="text-red-500">*</span>
            </label>
            <input placeholder={t.mailPlaceholder} className={inputCls} />
            <p className="text-xs text-gray-400 mt-1">{t.mailHint}</p>
          </div>
        </div>
      </div>
      <BackBtn onClick={onBack} label={t.back} />
    </div>
    <div className="w-full lg:w-[280px] flex-shrink-0">
      <SummaryCard t={t} selectedPlan={selectedPlan} onNext={onNext} />
    </div>
  </div>
);

const StepPolicyholder = ({ t, selectedPlan, onNext, onBack }) => (
  <div className="flex flex-col lg:flex-row gap-6">
    <div className="flex-1">
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-4">
        <h3 className="font-bold text-[#0A1172]">{t.step3Title}</h3>
        {[t.lastName, t.firstName, t.middleName].map((l) => (
          <div key={l}>
            <label className="text-sm text-gray-600 mb-1.5 block">
              {l} <span className="text-red-500">*</span>
            </label>
            <input className={inputCls} />
          </div>
        ))}
        <div className="grid grid-cols-2 gap-4">
          {[t.dob, t.passportSeries, t.passportNumber, t.issueDate].map((l) => (
            <div key={l}>
              <label className="text-sm text-gray-600 mb-1.5 block">
                {l} <span className="text-red-500">*</span>
              </label>
              <input className={inputCls} />
            </div>
          ))}
        </div>
        <div>
          <label className="text-sm text-gray-600 mb-1.5 block">
            {t.issuedBy} <span className="text-red-500">*</span>
          </label>
          <input className={inputCls} />
        </div>
      </div>
      <BackBtn onClick={onBack} label={t.back} />
    </div>
    <div className="w-full lg:w-[280px] flex-shrink-0">
      <SummaryCard t={t} selectedPlan={selectedPlan} onNext={onNext} />
    </div>
  </div>
);

const StepPayment = ({ t, selectedPlan, onBack }) => (
  <div className="flex flex-col lg:flex-row gap-6">
    <div className="flex-1">
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <h3 className="font-bold text-[#0A1172] mb-4">{t.step4Title}</h3>
        <div className="flex justify-between py-3 border-b border-gray-100">
          <span className="text-sm text-gray-600">{t.program}</span>
          <span className="font-semibold text-[#0A1172]">
            {selectedPlan?.name}
          </span>
        </div>
        <div className="flex justify-between py-3 border-b border-gray-100">
          <span className="text-sm text-gray-600">{t.damageCoverage}</span>
          <span className="font-semibold text-gray-800">
            {selectedPlan?.items[0]?.value}
          </span>
        </div>
        <div className="flex justify-between pt-4 mt-2">
          <span className="font-bold text-[#0A1172]">{t.totalPrice}</span>
          <span className="text-2xl font-bold text-[#0A1172]">
            {selectedPlan?.price}
          </span>
        </div>
        <button className="mt-6 w-full bg-[#0A1172] hover:bg-[#184DE5] transition-colors text-white py-3.5 rounded-xl font-bold text-sm cursor-pointer">
          {t.payBtn}
        </button>
      </div>
      <BackBtn onClick={onBack} label={t.back} />
    </div>
    <div className="w-full lg:w-[280px] flex-shrink-0" />
  </div>
);

const ApartmentInsurance = () => {
  const { lang } = useLanguage();
  const t = tx[lang];
  const [step, setStep] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState(null);

  return (
    <div className="min-h-screen bg-[#F5F7FB]">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-5">
          <Link to="/" className="hover:text-[#184DE5] transition-colors">
            {t.breadcrumb1}
          </Link>
          <ChevronRight size={13} />
          <span className="text-gray-600">{t.breadcrumb2}</span>
        </div>
        <h1 className="text-2xl font-bold text-[#0A1172] mb-6">
          {t.pageTitle}
        </h1>
        <StepBar current={step} steps={t.steps} />

        {step === 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {t.plans.map((plan, i) => (
              <PlanCard
                key={i}
                plan={plan}
                lang={lang}
                onChoose={(p) => {
                  setSelectedPlan(p);
                  setStep(1);
                }}
              />
            ))}
          </div>
        )}
        {step === 1 && (
          <StepObject
            t={t}
            selectedPlan={selectedPlan}
            onNext={() => setStep(2)}
            onBack={() => setStep(0)}
          />
        )}
        {step === 2 && (
          <StepPolicyholder
            t={t}
            selectedPlan={selectedPlan}
            onNext={() => setStep(3)}
            onBack={() => setStep(1)}
          />
        )}
        {step === 3 && (
          <StepPayment
            t={t}
            selectedPlan={selectedPlan}
            onBack={() => setStep(2)}
          />
        )}
      </div>

      {/* Info sections — always visible below stepper on step 0 */}
      {step === 0 && <ApartmentInsuranceInfo />}
    </div>
  );
};

export default ApartmentInsurance;
