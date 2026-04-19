import { useLanguage } from "../../context/LanguageContext";
import qrImg from "../../assets/image/black-qr.svg";
import { Phone, Eye } from "lucide-react";

// ── Translations ──────────────────────────────────────────────
const tx = {
  en: {
    logoLang: "EN",
    about: {
      title: "About the company",
      links: [
        "SOGAAZ Insurance Group",
        "Press Center",
        "Site map",
        "Contacts",
        "Rules and tariffs",
      ],
    },
    careers: {
      title: "Careers at SOGAAZ",
      links: ["Vacancies", "Submit a resume", "Recommend a specialist"],
    },
    dms: {
      title: "For insured under VHI",
      phones: ["8 800 333 44 19", "8 495 780 78 80", "8 495 956 44 19"],
    },
    qrText: "Point your smartphone camera\nto download the app",
    phone: "8 800 333 08 88",
    phoneLabel: "Single contact center",
    btn1: "Invite SOGAAZ to a tender",
    btn2: "Become a SOGAAZ agent",
    bottomLinks: [
      "For the personal composition of the Ministry of Defense of Russia",
      "For the personal composition of the National Guard",
      "For the personal composition of the Ministry of Emergency Situations of Russia",
      "For the personal composition of the Ministry of Internal Affairs of Russia",
      "For the personal composition of the Federal Penitentiary Service of Russia",
      "For judges",
      "Information on receiving insurance payments in case of transport incidents",
      "Incidents at hazardous facilities",
      "Moscow housing insurance program",
      "Housing insurance program in the Leningrad region",
      "Electronic reception of the Bank of Russia",
      "Information on the financial ombudsman",
      "Checking VHI policy for labor migrants",
      "For clients of SAO YUZHURALGASO",
      "For borrowers of Gazprombank JSC",
      "For VK employees",
      "VHI certificate for tax deduction (FTS)",
      "Rating of medical organizations for outpatient care",
    ],
    copyright:
      "© 2026 Joint-Stock Company 'Insurance Company of the Gas Industry' (JSC 'SOGAAZ'). All rights reserved. The information posted on this website is not a public offer as defined by clause 2 of Article 437 of the Civil Code of the Russian Federation.",
    accessibility: "Accessibility version",
  },

  ru: {
    logoLang: "RU",
    about: {
      title: "О компании",
      links: [
        "Страховая группа СОГААЗ",
        "Пресс-центр",
        "Карта сайта",
        "Контакты",
        "Правила и тарифы",
      ],
    },
    careers: {
      title: "Работа в СОГААЗе",
      links: [
        "Вакансии",
        "Отправить резюме",
        "Рекомендовать специалиста",
      ],
    },
    dms: {
      title: "Для застрахованных по ДМС",
      phones: ["8 800 333 44 19", "8 495 780 78 80", "8 495 956 44 19"],
    },
    qrText: "Наведите камеру смартфона,\nчтобы скачать приложение",
    phone: "8 800 333 08 88",
    phoneLabel: "Единый контактный центр",
    btn1: "Пригласить СОГААЗ на конкурс",
    btn2: "Стать агентом СОГААЗ",
    bottomLinks: [
      "Для личного состава Минобороны России",
      "Для личного состава Росгвардии",
      "Для личного состава МЧС России",
      "Для личного состава МВД России",
      "Для личного состава ФСИН России",
      "Для судей",
      "Информация о порядке получения страховых выплат в случае происшествия на транспорте",
      "Происшествия на опасных объектах",
      "Программа страхования жилья г. Москвы",
      "Программа страхования жилья в Ленинградской области",
      "Электронная приёмная Банка России",
      "Информация о финансовом уполномоченном",
      "Проверка полиса ДМС трудовых мигрантов",
      "Для клиентов САО «ЮЖУРАЛЖАСО»",
      "Для заёмщиков «Газпромбанк» АО",
      "Для сотрудников VK",
      "Справка по ДМС для налогового вычета (ФНС)",
      "Рейтинг медицинских организаций по амбулаторной помощи",
    ],
    copyright:
      "© 2026 Акционерное общество «Страховое общество газовой промышленности» (АО «СОГААЗ»). Все права защищены. Информация, размещённая на настоящем интернет-сайте, не является публичной офертой, установленной в п. 2 ст. 437 ГК РФ.",
    accessibility: "Версия для слабовидящих",
  },
};

// ── Social Button ─────────────────────────────────────────────
const SocialBtn = ({ children }) => (
  <button className="w-10 h-10 rounded-full bg-[#1a2580] hover:bg-[#184DE5] transition-colors flex items-center justify-center flex-shrink-0 cursor-pointer">
    {children}
  </button>
);

// ── Main Footer ───────────────────────────────────────────────
const Footer = () => {
  const { lang } = useLanguage();
  const t = tx[lang];

  return (
    <footer className="bg-[#0A1172] text-white mt-16">

      {/* ═══════════════════════════════════════════════════════
          TOP SECTION
          LEFT   : Logo + flag/lang
          MIDDLE : About + Careers + VHI (3 sub-sections)
          RIGHT  : QR image + label
      ═══════════════════════════════════════════════════════ */}
      <div className="mx-auto px-4 md:px-8 lg:px-16 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-10 lg:gap-16">

          {/* ── LEFT : Logo ── */}
          <div className="flex flex-col gap-3 pt-1">
            <span className="text-3xl font-black tracking-tight leading-none">
              СОГААЗ
            </span>
            <div className="flex items-center gap-1.5">
              <span className="text-base">🇷🇺</span>
              <span className="text-sm font-semibold text-white/70">
                {t.logoLang}
              </span>
            </div>
          </div>

          {/* ── MIDDLE : 3 sub-sections in a row ── */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">

            {/* About the company */}
            <div>
              <h3 className="text-sm font-semibold text-white mb-4">
                {t.about.title}
              </h3>
              <ul className="space-y-2.5">
                {t.about.links.map((link, i) => (
                  <li key={i}>
                    <a className="text-sm text-white/60 hover:text-white transition-colors cursor-pointer">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Careers */}
            <div>
              <h3 className="text-sm font-semibold text-white mb-4">
                {t.careers.title}
              </h3>
              <ul className="space-y-2.5">
                {t.careers.links.map((link, i) => (
                  <li key={i}>
                    <a className="text-sm text-white/60 hover:text-white transition-colors cursor-pointer">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* VHI Phones */}
            <div>
              <h3 className="text-sm font-semibold text-white mb-4">
                {t.dms.title}
              </h3>
              <ul className="space-y-3">
                {t.dms.phones.map((phone, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Phone size={13} className="text-white/40 flex-shrink-0" />
                    <a
                      href={`tel:${phone.replace(/\s/g, "")}`}
                      className="text-sm font-bold text-white hover:text-white/80 transition-colors"
                    >
                      {phone}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* ── RIGHT : QR ── */}
          <div className="flex flex-col items-start md:items-end gap-3">
            <div className="w-[110px] h-[110px] bg-white rounded-xl flex items-center justify-center flex-shrink-0 p-1.5">
              <img
                src={qrImg}
                alt="QR Code"
                className="w-full h-full object-contain"
              />
            </div>
            <p className="text-xs text-white/50 max-w-[130px] text-left md:text-right leading-relaxed whitespace-pre-line">
              {t.qrText}
            </p>
          </div>

        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          MIDDLE DIVIDER  —  phone + buttons + socials
      ═══════════════════════════════════════════════════════ */}
      <div className="border-t border-white/10">
        <div className="mx-auto px-4 md:px-8 lg:px-16 py-6">
          <div className="flex flex-wrap items-center gap-4">

            {/* Phone */}
            <div className="mr-auto">
              <a
                href="tel:88003330888"
                className="text-2xl font-bold text-white hover:text-white/80 transition-colors block"
              >
                {t.phone}
              </a>
              <p className="text-xs text-white/50 mt-0.5">{t.phoneLabel}</p>
            </div>

            {/* Action buttons */}
            <button className="px-5 py-2.5 border border-white/30 hover:border-white/60 rounded-xl text-sm font-medium text-white transition-colors cursor-pointer whitespace-nowrap">
              {t.btn1}
            </button>
            <button className="px-5 py-2.5 border border-white/30 hover:border-white/60 rounded-xl text-sm font-medium text-white transition-colors cursor-pointer whitespace-nowrap">
              {t.btn2}
            </button>

            {/* Socials */}
            <div className="flex items-center gap-2">
              <SocialBtn>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M21.547 7h-3.29a.743.743 0 00-.655.392s-1.312 2.416-1.734 3.23C14.734 12.813 14 12.126 14 11.11V7.603A1.104 1.104 0 0012.896 6.5h-2.474a1.982 1.982 0 00-1.75.813s1.255-.204 1.255 1.49c0 .42.022 1.626.04 2.64a.73.73 0 01-1.272.503 21.54 21.54 0 01-2.498-4.543.693.693 0 00-.63-.403h-2.99a.508.508 0 00-.48.685C3.005 10.175 6.918 18 11.38 18h1.878a.742.742 0 00.742-.742v-1.135a.73.73 0 011.23-.53l2.247 2.112a1.09 1.09 0 00.746.295h2.953c1.424 0 1.424-.988.647-1.753-.546-.538-2.518-2.617-2.518-2.617a1.02 1.02 0 01-.078-1.323c.637-.84 1.68-2.212 2.122-2.8.603-.804 1.697-2.507.197-2.507z"/></svg>
              </SocialBtn>
              <SocialBtn>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M12 1C9.239 1 7 3.239 7 6s2.239 5 5 5 5-2.239 5-5-2.239-5-5-5zm0 8c-1.654 0-3-1.346-3-3s1.346-3 3-3 3 1.346 3 3-1.346 3-3 3zm5.207 4.793a1 1 0 00-1.414 0L14 15.586l-.793-.793a1 1 0 00-1.414 1.414l.793.793-2.793 2.793a1 1 0 001.414 1.414L14 18.414l2.793 2.793a1 1 0 001.414-1.414L15.414 17l.793-.793a1 1 0 000-1.414z"/></svg>
              </SocialBtn>
              <SocialBtn>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.941z"/></svg>
              </SocialBtn>
              <SocialBtn>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="white" stroke="none"/></svg>
              </SocialBtn>
              <SocialBtn>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="M22 6l-10 7L2 6"/></svg>
              </SocialBtn>
            </div>

          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          BOTTOM  —  links + copyright
      ═══════════════════════════════════════════════════════ */}

      {/* Bottom links */}
      <div className="border-t border-white/10">
        <div className="mx-auto px-4 md:px-8 lg:px-16 py-5">
          <p className="text-xs text-white/40 leading-relaxed">
            {t.bottomLinks.map((link, i) => (
              <span key={i}>
                <a className="hover:text-white/70 transition-colors cursor-pointer">
                  {link}
                </a>
                {i < t.bottomLinks.length - 1 && (
                  <span className="text-white/20 mx-1">|</span>
                )}
              </span>
            ))}
          </p>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10">
        <div className="mx-auto px-4 md:px-8 lg:px-16 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs text-white/30 leading-relaxed max-w-3xl">
            {t.copyright}
          </p>
          <button className="flex items-center gap-2 border border-white/20 hover:border-white/40 px-4 py-2 rounded-xl text-xs text-white/60 hover:text-white transition-colors cursor-pointer flex-shrink-0 whitespace-nowrap">
            <Eye size={14} />
            {t.accessibility}
          </button>
        </div>
      </div>

    </footer>
  );
};

export default Footer;