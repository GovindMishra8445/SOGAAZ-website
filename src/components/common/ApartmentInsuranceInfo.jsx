import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

// ── Translations ──────────────────────────────────────────────
const tx = {
  en: {
    conditions: {
      title: "Apartment insurance conditions",
      intro: "You can insure an apartment, flat or townhouse.",
      items: [
        "The amount of insurance compensation depends on the chosen program;",
        "The policy is valid for 1 year;",
        "The cost of the policy is from 2,000 rubles (the \"Simple+\" program, without the \"Home Master\" package)",
        "Moscow, St. Petersburg, and all regions of the Russian Federation",
      ],
    },
    benefits: {
      title: "Benefits of an insurance policy",
      items: [
        "All common risks are included;",
        "Does not require inspection and inventory of objects;",
        "You can choose a policy to suit any budget;",
        "24/7 support.",
      ],
    },
    risks: {
      title: "Insurance risks",
      sections: [
        {
          heading: "Property insurance",
          items: [
            "Fire, explosion, lightning strike;",
            "Flooding from pipes, neighbouring apartments;",
            "Theft, robbery, vandalism;",
            "Natural disasters.",
          ],
        },
        {
          heading: "Civil liability insurance",
          items: [
            "Damage caused to third parties;",
            "Flooding of neighbours;",
            "Accidental damage to common property.",
          ],
        },
        {
          heading: "Unforeseen expenses arising from accidents/breakdowns",
          items: [
            "Emergency plumber/electrician call-out;",
            "Emergency locksmith services;",
            "Glazing replacement.",
          ],
        },
      ],
    },
    exclusions: {
      title: "Exclusions from insurance coverage",
      subtitle: "SOGAZ does not insure objects",
      items: [
        "In dilapidated and emergency buildings;",
        "In apartments located in buildings subject to demolition;",
        "In buildings built before 1950 and houses with wooden load-bearing walls;",
        "To which collection for obligations has been directed;",
        "Located in areas of natural disasters or military action.",
      ],
      footer:
        "A full list of exclusions from insurance coverage, exemptions from insurance payments, and denials of insurance payments can be found in",
      link: "insurance rules.",
    },
    insuredEvent: {
      title: "What to do if an insured event occurs?",
      steps: [
        "Report the incident to the appropriate authorities: call the rescue or fire department, call the management company's emergency service, contact the administration, etc. Try to minimize further damage to your property.",
        "Notify your insurance company within three business days of the incident. Contact number: 8-800-333-08-88.\nFollow the instructions of your insurance company representatives and do not begin repairs until specialists have inspected the apartment so they can assess the damage. If, for safety reasons, you must change your mind before the insurance representative arrives, take detailed photographs and/or videos of the damage.",
        "Within 5 business days of the event, complete an insurance claim form at the SOGAZ office and attach the following documents:",
        "Complete a damage assessment. A SOGAZ representative will inspect the premises in your presence and record the extent and severity of damage for the damage assessment. If your policy includes \"Damage to Neighbours\" coverage and their property was damaged as a result of the insured event, they will also need to complete this assessment.",
        "Wait for the assessment results. The insurance company will review the information and documents received within 25 business days (from the moment the complete set of documents is received). If the incident is recognized as an insured event, the insurer will draw up a report and make the payment to the bank account you specified.",
      ],
      step3Docs: [
        "policy and receipt of its payment;",
        "a copy of the applicant's and beneficiary's passport, payment details; if the beneficiary's representative is applying, a notarized power of attorney;",
        "documents from competent authorities confirming the circumstances and causes of the event (certificates, reports, decisions on initiating a criminal case or on refusing to initiate a criminal case, conclusions, etc.);",
        "documents confirming the right to own or use housing;",
        "documents confirming the amount of damage (checks, receipts, contracts for the performance of work or the purchase of materials, other payment documents);",
        "technical documentation (technical passport, explication);",
        "other documents at the request of the insurer.",
      ],
    },
    qa: {
      title: "Questions and Answers",
      items: [
        {
          q: "What does apartment insurance cover?",
          a: "The policy covers finishing, engineering systems, household property, civil liability and more depending on the chosen plan.",
        },
        {
          q: "How quickly is compensation paid?",
          a: "Within 25 business days from the receipt of the complete set of documents.",
        },
        {
          q: "Can I insure a rented apartment?",
          a: "Yes, tenants can insure their civil liability and personal property.",
        },
        {
          q: "Is an inspection required before purchasing a policy?",
          a: "No. The policy does not require an inspection or inventory of objects.",
        },
      ],
    },
  },

  ru: {
    conditions: {
      title: "Условия страхования квартиры",
      intro: "Вы можете застраховать квартиру, апартаменты или таунхаус.",
      items: [
        "Размер страхового возмещения зависит от выбранной программы;",
        "Полис действует 1 год;",
        "Стоимость полиса от 2 000 рублей (программа «Простой+», без пакета «Домашний мастер»)",
        "Москва, Санкт-Петербург и все регионы Российской Федерации",
      ],
    },
    benefits: {
      title: "Преимущества страхового полиса",
      items: [
        "Включены все распространённые риски;",
        "Не требует осмотра и инвентаризации объектов;",
        "Полис можно подобрать под любой бюджет;",
        "Поддержка 24/7.",
      ],
    },
    risks: {
      title: "Страховые риски",
      sections: [
        {
          heading: "Страхование имущества",
          items: [
            "Пожар, взрыв, удар молнии;",
            "Залив от трубопроводов, соседей;",
            "Кража, грабёж, вандализм;",
            "Стихийные бедствия.",
          ],
        },
        {
          heading: "Страхование гражданской ответственности",
          items: [
            "Ущерб, причинённый третьим лицам;",
            "Залив соседей;",
            "Случайное повреждение общего имущества.",
          ],
        },
        {
          heading: "Непредвиденные расходы из-за аварий/поломок",
          items: [
            "Вызов аварийного сантехника/электрика;",
            "Аварийные слесарные услуги;",
            "Замена остекления.",
          ],
        },
      ],
    },
    exclusions: {
      title: "Исключения из страхового покрытия",
      subtitle: "СОГАЗ не страхует объекты",
      items: [
        "В ветхих и аварийных зданиях;",
        "В квартирах, расположенных в домах под снос;",
        "В домах постройки до 1950 года и домах с деревянными несущими стенами;",
        "На которые обращено взыскание по обязательствам;",
        "Расположенных в зонах стихийных бедствий или военных действий.",
      ],
      footer:
        "Полный перечень исключений из страхового покрытия, освобождений от страховых выплат и отказов в страховых выплатах можно найти в",
      link: "правилах страхования.",
    },
    insuredEvent: {
      title: "Что делать при наступлении страхового случая?",
      steps: [
        "Сообщите о произошедшем в соответствующие органы: вызовите спасателей или пожарных, позвоните в аварийную службу управляющей компании, обратитесь в администрацию и т.д. Постарайтесь минимизировать дальнейший ущерб вашему имуществу.",
        "Уведомите страховую компанию в течение трёх рабочих дней с момента события. Контактный номер: 8-800-333-08-88.\nСледуйте инструкциям представителей страховой компании и не начинайте ремонт до осмотра квартиры специалистами для оценки ущерба. Если по соображениям безопасности необходимо внести изменения до прибытия представителя, сделайте подробные фото и/или видео повреждений.",
        "В течение 5 рабочих дней с момента события заполните заявление о страховом случае в офисе СОГАЗ и приложите следующие документы:",
        "Проведите оценку ущерба. Представитель СОГАЗ осмотрит помещение в вашем присутствии и зафиксирует объём и характер повреждений. Если полис включает покрытие «Ущерб соседям» и их имущество пострадало в результате страхового случая, им также необходимо пройти эту оценку.",
        "Дождитесь результатов оценки. Страховая компания рассмотрит полученные документы в течение 25 рабочих дней (с момента получения полного пакета документов). Если событие признано страховым случаем, страховщик составит акт и перечислит выплату на указанный вами банковский счёт.",
      ],
      step3Docs: [
        "полис и квитанция об его оплате;",
        "копия паспорта заявителя и выгодоприобретателя, платёжные реквизиты; при обращении представителя выгодоприобретателя — нотариально заверенная доверенность;",
        "документы компетентных органов, подтверждающие обстоятельства и причины события (справки, акты, постановления и т.д.);",
        "документы, подтверждающие право собственности или пользования жильём;",
        "документы, подтверждающие размер ущерба (чеки, квитанции, договоры и т.д.);",
        "техническая документация (технический паспорт, экспликация);",
        "иные документы по требованию страховщика.",
      ],
    },
    qa: {
      title: "Вопросы и ответы",
      items: [
        {
          q: "Что покрывает страхование квартиры?",
          a: "Полис покрывает отделку, инженерные системы, домашнее имущество, гражданскую ответственность и многое другое в зависимости от выбранной программы.",
        },
        {
          q: "Как быстро выплачивается возмещение?",
          a: "В течение 25 рабочих дней с момента получения полного пакета документов.",
        },
        {
          q: "Можно ли застраховать арендованную квартиру?",
          a: "Да, арендаторы могут застраховать свою гражданскую ответственность и личное имущество.",
        },
        {
          q: "Нужен ли осмотр перед покупкой полиса?",
          a: "Нет. Полис не требует осмотра и инвентаризации объектов.",
        },
      ],
    },
  },
};

// ── Icon box ──────────────────────────────────────────────────
const IconBox = ({ children }) => (
  <div className="w-12 h-12 rounded-2xl bg-[#EEF2FF] flex items-center justify-center flex-shrink-0">
    {children}
  </div>
);

// ── Accordion item ────────────────────────────────────────────
const AccordionItem = ({ heading, items }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        className="w-full flex items-center justify-between py-4 text-left cursor-pointer hover:text-[#184DE5] transition-colors group"
        onClick={() => setOpen((p) => !p)}
      >
        <span className="text-sm font-semibold text-[#0A1172] group-hover:text-[#184DE5]">
          {heading}
        </span>
        {open
          ? <ChevronUp size={18} className="text-[#184DE5] flex-shrink-0" />
          : <ChevronDown size={18} className="text-gray-400 flex-shrink-0" />
        }
      </button>
      {open && (
        <ul className="pb-4 pl-2 space-y-1.5">
          {items.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#184DE5] flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// ── Q&A accordion ─────────────────────────────────────────────
const QAItem = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        className="w-full flex items-center justify-between py-4 text-left cursor-pointer group"
        onClick={() => setOpen((p) => !p)}
      >
        <span className="text-sm font-semibold text-[#0A1172] group-hover:text-[#184DE5] transition-colors">
          {q}
        </span>
        {open
          ? <ChevronUp size={18} className="text-[#184DE5] flex-shrink-0" />
          : <ChevronDown size={18} className="text-gray-400 flex-shrink-0" />
        }
      </button>
      {open && (
        <p className="pb-4 text-sm text-gray-600 leading-relaxed">{a}</p>
      )}
    </div>
  );
};

// ── Main component ────────────────────────────────────────────
const ApartmentInsuranceInfo = () => {
  const { lang } = useLanguage();
  const t = tx[lang];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-10 space-y-6">

      {/* Row 1: Conditions + Benefits */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {/* Conditions */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <IconBox>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke="#184DE5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M9 22V12h6v10" stroke="#184DE5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </IconBox>
            <h2 className="text-base font-bold text-[#0A1172]">{t.conditions.title}</h2>
          </div>
          <p className="text-sm text-gray-600 mb-3">{t.conditions.intro}</p>
          <ul className="space-y-2">
            {t.conditions.items.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#184DE5] flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Benefits */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <IconBox>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#184DE5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </IconBox>
            <h2 className="text-base font-bold text-[#0A1172]">{t.benefits.title}</h2>
          </div>
          <ul className="space-y-3">
            {t.benefits.items.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#184DE5] flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Row 2: Risks + Exclusions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {/* Insurance risks — accordion */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-4 mb-2">
            <IconBox>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="#184DE5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="#184DE5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </IconBox>
            <h2 className="text-base font-bold text-[#0A1172]">{t.risks.title}</h2>
          </div>
          <div>
            {t.risks.sections.map((s, i) => (
              <AccordionItem key={i} heading={s.heading} items={s.items} />
            ))}
          </div>
        </div>

        {/* Exclusions */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <IconBox>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="#184DE5" strokeWidth="2" />
                <path d="M15 9l-6 6M9 9l6 6" stroke="#184DE5" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </IconBox>
            <h2 className="text-base font-bold text-[#0A1172]">{t.exclusions.title}</h2>
          </div>
          <p className="text-sm font-semibold text-gray-700 mb-3">{t.exclusions.subtitle}</p>
          <ul className="space-y-2 mb-4">
            {t.exclusions.items.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#184DE5] flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
          <p className="text-sm text-gray-500 leading-relaxed">
            {t.exclusions.footer}{" "}
            <a href="#" className="text-[#184DE5] hover:text-[#5E5EAA] underline">
              {t.exclusions.link}
            </a>
          </p>
        </div>
      </div>

      {/* Insured event steps */}
      <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
        <h2 className="text-2xl font-bold text-[#5E5EAA] text-center mb-8">
          {t.insuredEvent.title}
        </h2>
        <div className="space-y-6">
          {t.insuredEvent.steps.map((step, i) => (
            <div key={i} className="flex gap-5">
              {/* Step number circle */}
              <div className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center text-sm font-bold text-gray-500 flex-shrink-0 mt-0.5">
                {i + 1}
              </div>
              <div className="text-sm text-gray-700 leading-relaxed flex-1">
                {step.split("\n").map((line, li) => (
                  <p key={li} className={li > 0 ? "mt-2" : ""}>{line}</p>
                ))}
                {/* Step 3 document list */}
                {i === 2 && (
                  <ul className="mt-3 space-y-2">
                    {t.insuredEvent.step3Docs.map((doc, di) => (
                      <li key={di} className="flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0" />
                        {doc}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Q&A */}
      <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
        <h2 className="text-2xl font-bold text-[#5E5EAA] text-center mb-6">
          {t.qa.title}
        </h2>
        <div className="max-w-3xl mx-auto">
          {t.qa.items.map((item, i) => (
            <QAItem key={i} q={item.q} a={item.a} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ApartmentInsuranceInfo;