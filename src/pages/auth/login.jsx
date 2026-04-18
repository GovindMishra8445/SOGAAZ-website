import React, { useState } from "react";
import { X, EyeOff, Eye } from "lucide-react";

const Login = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState("mail");
  const [showPassword, setShowPassword] = useState(false);

  if (!isOpen) return null;

  return (
    <>
      {/* 🔥 OVERLAY */}
      <div onClick={onClose} className="fixed inset-0 bg-black/40 z-40" />

      {/* 🔥 MODAL */}
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="bg-white w-full max-w-md rounded-2xl p-6 relative shadow-xl">
          {/* CLOSE BUTTON */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100"
          >
            <X size={18} />
          </button>

          {/* LOGO */}
          <h2 className="text-center text-xl font-bold text-[#0A1172] mb-2">
            СОГАAЗ
          </h2>

          {/* TITLE */}
          <p className="text-center text-gray-600 text-sm mb-5">
            Login to your personal account
          </p>

          {/* 🔥 TABS */}
          <div className="flex bg-gray-100 rounded-full p-1 mb-5">
            <button
              onClick={() => setActiveTab("mail")}
              className={`flex-1 py-2 text-sm rounded-full transition ${
                activeTab === "mail"
                  ? "bg-white shadow text-[#0A1172] font-medium"
                  : "text-gray-500"
              }`}
            >
              Mail
            </button>

            <button
              onClick={() => setActiveTab("phone")}
              className={`flex-1 py-2 text-sm rounded-full transition ${
                activeTab === "phone"
                  ? "bg-white shadow text-[#0A1172] font-medium"
                  : "text-gray-500"
              }`}
            >
              Telephone
            </button>
          </div>

          {/* 🔥 FORM */}
          <div className="space-y-4">
            {/* INPUT 1 (dynamic placeholder) */}
            <input
              type={activeTab === "mail" ? "email" : "tel"}
              placeholder={activeTab === "mail" ? "Mail" : "Telephone"}
              className="w-full bg-gray-100 px-4 py-3 rounded-xl outline-none text-sm"
            />

            {/* PASSWORD */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full bg-gray-100 px-4 py-3 rounded-xl outline-none text-sm"
              />

              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            </div>

            {/* REMEMBER + FORGOT */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-500">
                <input type="checkbox" />
                Remember me
              </label>

              <button className="text-[#184DE5] hover:underline">
                Forgot your password?
              </button>
            </div>

            {/* BUTTON */}
            <button className="w-full bg-[#0A1172] text-white py-3 rounded-xl font-medium hover:bg-[#184DE5] transition">
              Continue
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
