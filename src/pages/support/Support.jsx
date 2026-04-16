import { X } from "lucide-react";

const Support = ({ isOpen, onClose }) => {
  return (
    <>
      {/* 🔥 OVERLAY */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* 🔥 DRAWER */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white z-50 shadow-xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* HEADER */}
        <div className="flex justify-between items-center p-5 border-b">
          <h2 className="text-lg font-semibold">Support</h2>

          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* FORM */}
        <div className="p-5 space-y-4">
          <input
            type="text"
            placeholder="Your name"
            className="w-full border rounded-lg px-4 py-3 outline-none"
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full border rounded-lg px-4 py-3 outline-none"
          />

          <textarea
            placeholder="Your message"
            rows={4}
            className="w-full border rounded-lg px-4 py-3 outline-none"
          />

          <button className="w-full bg-[#184DE5] text-white py-3 rounded-lg font-semibold hover:bg-[#0A1172]">
            Send message
          </button>
        </div>
      </div>
    </>
  );
};

export default Support;