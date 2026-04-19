import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

const faqData = {
  en: [
    {
      question: "Is it possible to file an insurance claim online?",
      answer:
        "Currently, this is only possible for certain products. A full list of these products and how to apply is available here.",
    },
    {
      question: "How to register in your SOGAZ personal account?",
      answer:
        "To register, provide your email and phone number. Detailed instructions are available here.",
    },
    {
      question: "How do I log in to my personal account for legal entities?",
      answer:
        "The personal account is designed for legal entities with insurance contracts. Instructions are available in the User's Manual.",
    },
    {
      question: "How to choose the right insurance product?",
      answer:
        "You can explore products, compare terms, and calculate costs. Contact specialists at 8 800 333 08 88 for help.",
    },
    {
      question: "Where can I find the nearest SOGAZ office?",
      answer:
        "Office addresses are listed in the Contacts section. You can also check hours and book appointments.",
    },
    {
      question: "How to contact SOGAZ customer support?",
      answer:
        "Call 8 800 333 08 88, use personal account, mobile app, chat, or feedback form.",
    },
    {
      question: "How can I restore access to my SOGAZ personal account?",
      answer:
        'Use "Forgot your password?" on login page. Instructions will be sent to your email.',
    },
    {
      question: "How do I delete my account?",
      answer: 'Go to "Personal Information" → "Delete Account" and confirm.',
    },
  ],

  // ✅ RUSSIAN VERSION
  ru: [
    {
      question: "Можно ли подать страховое заявление онлайн?",
      answer:
        "В настоящее время это возможно только для некоторых продуктов. Полный список и инструкции доступны здесь.",
    },
    {
      question: "Как зарегистрироваться в личном кабинете СОГАЗ?",
      answer:
        "Для регистрации укажите email и номер телефона. Подробная инструкция доступна здесь.",
    },
    {
      question: "Как войти в личный кабинет для юридических лиц?",
      answer:
        "Личный кабинет предназначен для юридических лиц с договорами страхования. Инструкция доступна в руководстве пользователя.",
    },
    {
      question: "Как выбрать подходящий страховой продукт?",
      answer:
        "Вы можете изучить продукты, сравнить условия и рассчитать стоимость. Свяжитесь со специалистами по телефону 8 800 333 08 88.",
    },
    {
      question: "Где найти ближайший офис СОГАЗ?",
      answer:
        "Адреса офисов указаны в разделе Контакты. Также можно узнать график работы и записаться.",
    },
    {
      question: "Как связаться со службой поддержки СОГАЗ?",
      answer:
        "Позвоните по номеру 8 800 333 08 88 или используйте личный кабинет, мобильное приложение, чат.",
    },
    {
      question: "Как восстановить доступ к личному кабинету СОГАЗ?",
      answer:
        'Используйте "Забыли пароль?" на странице входа. Инструкции придут на email.',
    },
    {
      question: "Как удалить аккаунт?",
      answer:
        'Перейдите в "Личная информация" → "Удалить аккаунт" и подтвердите.',
    },
  ],
};

const FAQ = () => {
  const { lang } = useLanguage();
  const [openIndex, setOpenIndex] = useState(null);

  const data = faqData[lang];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl px-4 py-16 ">
      {/* TITLE */}
      <h2 className="text-2xl md:text-3xl  font-semibold mb-8">
        {lang === "ru"
          ? "Часто задаваемые вопросы"
          : "Frequently Asked Questions"}
      </h2>

      {/* FAQ LIST */}
      <div className="flex flex-col gap-4">
        {data.map((item, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
            >
              {/* QUESTION */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between px-5 py-6 text-left"
              >
                <span className="text-2xl md:text-base font-bold text-gray-800">
                  {item.question}
                </span>

                <ChevronDown
                  size={18}
                  className={`transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* ANSWER */}
              <div
                className={`px-5 transition-all duration-300 ${
                  isOpen
                    ? "max-h-[200px] py-4 opacity-100"
                    : "max-h-0 opacity-0"
                } overflow-hidden`}
              >
                <p className="text-sm text-gray-500 leading-relaxed">
                  {item.answer}
                </p>

                {isOpen && (
                  <span className="text-blue-600 text-sm cursor-pointer hover:underline">
                    {lang === "ru" ? "Здесь" : "Here"}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* BUTTON */}
      <div className="mt-6">
        <button className="px-4 py-2 rounded-xl bg-gray-100 text-sm hover:bg-gray-200 transition">
          {lang === "ru" ? "Больше вопросов" : "More questions"}
        </button>
      </div>
    </div>
  );
};

export default FAQ;
