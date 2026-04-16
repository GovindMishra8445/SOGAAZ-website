import { useLanguage } from "../../context/LanguageContext";
import { footerData } from "../../data/footerData";

const Footer = () => {
  const { lang } = useLanguage();
  const data = footerData[lang];

  return (
    <footer className="bg-[#0A1172] text-white mt-20">
      <div className="max-w-[1200px] mx-auto px-6 py-12">

        {/* 🔥 TOP */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* LOGO */}
          <div>
            <h2 className="text-2xl font-bold mb-4">СОГАЗ</h2>
            <p className="text-sm text-gray-300">
              Reliable insurance partner for individuals and businesses.
            </p>
          </div>

          {/* COLUMNS */}
          {data.columns.map((col, i) => (
            <div key={i}>
              <h3 className="font-semibold mb-4">{col.title}</h3>
              <ul className="space-y-2">
                {col.links.map((link, j) => (
                  <li key={j}>
                    <a className="text-sm text-gray-300 hover:text-white cursor-pointer">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* CONTACT */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <p className="text-sm text-gray-300 mb-2">{data.contact.phone}</p>
            <p className="text-sm text-gray-300">{data.contact.email}</p>
          </div>

        </div>

        {/* 🔥 BOTTOM */}
        <div className="border-t border-gray-700 mt-10 pt-6 text-sm text-gray-400 flex flex-col md:flex-row justify-between">
          <p>© 2026 SOGAZ. All rights reserved.</p>
          <div className="flex gap-4 mt-3 md:mt-0">
            <span className="cursor-pointer hover:text-white">Privacy</span>
            <span className="cursor-pointer hover:text-white">Terms</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;