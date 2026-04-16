import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { COUNTRIES } from "../../utils/constants";
import { ChevronDown } from "lucide-react";

/* ── Country Dropdown ── */
export const CountryDropdown = ({ placeholder }) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState([]);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filtered = COUNTRIES.filter((c) =>
    c.toLowerCase().includes(search.toLowerCase()),
  );

  const toggle = (country) => {
    setSelected((prev) =>
      prev.includes(country)
        ? prev.filter((c) => c !== country)
        : [...prev, country],
    );
  };

  return (
    <div className="relative w-full" ref={ref}>
      <div
        className="w-full flex items-center justify-between bg-[#F3F5FA] rounded-2xl px-4 py-3.5 cursor-pointer border border-transparent focus-within:border-[#184DE5] transition-colors"
        onClick={() => setOpen(!open)}
      >
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setOpen(true);
          }}
          placeholder={selected.length ? selected.join(", ") : placeholder}
          className="bg-transparent text-sm text-gray-600 outline-none flex-1 placeholder-gray-400 cursor-pointer"
          onFocus={() => setOpen(true)}
        />
        <ChevronDown
          size={16}
          className={`text-gray-400 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </div>

      {open && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-2xl shadow-xl z-50 max-h-[260px] overflow-y-auto">
          {filtered.map((country) => (
            <label
              key={country}
              className={`flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-[#EEF2FF] transition-colors ${
                selected.includes(country) ? "bg-[#EEF2FF]" : ""
              }`}
            >
              <input
                type="checkbox"
                checked={selected.includes(country)}
                onChange={() => toggle(country)}
                className="w-4 h-4 accent-[#184DE5]"
              />
              <span className="text-sm font-medium text-gray-800">
                {country}
              </span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};