import { useLanguage } from "../../context/LanguageContext";

const tagStyles = {
  ONLINE: "text-green-600 font-bold text-[11px] tracking-wide",
  BID: "text-[#184DE5] font-bold text-[11px] tracking-wide",
};

const MegaMenu = ({ data }) => {
  const { lang } = useLanguage();

  // Trips case: 1 section, no category → split into 2 visual columns
  const isFlat =
    data.length === 1 && (!data[0].category?.en || data[0].category.en === "");

  if (isFlat) {
    const items = data[0].items;
    const mid = Math.ceil(items.length / 2);
    const col1 = items.slice(0, mid);
    const col2 = items.slice(mid);

    return (
      <div className="absolute left-0 top-full w-full bg-white shadow-lg border-t border-gray-100 z-50">
        <div className="flex">
          <div className="min-w-[200px] border-r border-gray-200">
            <ul className="space-y-4">
              {col1.map((item, j) => (
               <li
                    key={j}
                    className="flex justify-between items-center gap-28 px-4 py-5 cursor-pointer hover:bg-[#EEF2FF] transition-colors group"
                  >
                  <span className="text-sm font-medium text-gray-800 group-hover:text-[#184DE5] whitespace-nowrap">
                    {item.title[lang] || item.title.en}
                  </span>
                  {item.tag && (
                    <span className={tagStyles[item.tag]}>{item.tag}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className="min-w-[200px]">
            <ul className="space-y-4">
              {col2.map((item, j) => (
                <li
                    key={j}
                    className="flex justify-between items-center gap-28 px-4 py-5 cursor-pointer hover:bg-[#EEF2FF] transition-colors group"
                  >
                 <span className="text-sm font-medium text-gray-800 group-hover:text-[#184DE5] whitespace-nowrap">
                    {item.title[lang] || item.title.en}
                  </span>
                  {item.tag && (
                    <span className={tagStyles[item.tag]}>{item.tag}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute left-0 top-full w-full bg-white shadow-lg border-t border-gray-100 z-50">
      <div className="py-6">
        <div className="flex">
          {data.map((section, i) => (
            <div
              key={i}
              className={`min-w-[200px] ${
                i < data.length - 1 ? " border-r border-gray-200" : ""
              }`}
            >
              {section.category &&
                (section.category[lang] || section.category.en) && (
                  <h3 className="text-[14px] text-indigo-950 font-bold capitalize  mb-3 px-4">
                    {section.category[lang] || section.category.en}
                  </h3>
                )}

              <ul className="space-y-4 ">
                {section.items.map((item, j) => (
                  <li
                    key={j}
                    className="flex justify-between items-center gap-28 px-4 py-5 cursor-pointer hover:bg-[#EEF2FF] transition-colors group"
                  >
                    <span className="text-sm font-medium text-gray-800 group-hover:text-[#184DE5] whitespace-nowrap">
                      {item.title[lang] || item.title.en}
                    </span>
                    {item.tag && (
                      <span className={tagStyles[item.tag]}>{item.tag}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MegaMenu;
