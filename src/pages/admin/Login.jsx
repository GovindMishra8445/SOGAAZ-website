import { EyeOff, Eye, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useState } from "react";
import { toast } from "react-toastify";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("admin", "true");
      toast.success("Welcome back!");
      navigate("/admin/dashboard");
    } catch {
      toast.error("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=DM+Sans:wght@300;400;500&display=swap');
        @keyframes fadeUp { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse { 0%,100%{transform:scale(1);opacity:.5} 50%{transform:scale(1.08);opacity:.9} }
        .login-anim { animation: fadeUp .55s ease forwards; }
        .glow-1 { animation: pulse 7s ease-in-out infinite; }
        .glow-2 { animation: pulse 9s ease-in-out infinite reverse; }
        .gold-shimmer {
          background: linear-gradient(135deg,#c9a84c 0%,#e8c96a 50%,#c9a84c 100%);
          background-size:200% auto;
          transition: background-position .4s ease, box-shadow .3s ease;
        }
        .gold-shimmer:hover { background-position:right center; }
        .gold-shimmer:disabled { opacity:.55; cursor:not-allowed; }
      `}</style>

      <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#050c2e] px-4">
        {/* Glows */}
        <div
          className="glow-1 absolute w-[500px] h-[500px] rounded-full -top-24 -right-24 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle,rgba(24,77,229,.18) 0%,transparent 70%)",
          }}
        />
        <div
          className="glow-2 absolute w-[360px] h-[360px] rounded-full -bottom-12 -left-12 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle,rgba(10,17,114,.35) 0%,transparent 70%)",
          }}
        />

        {/* Grid overlay */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="g"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M60 0L0 0 0 60"
                fill="none"
                stroke="#4a6fa5"
                strokeWidth=".5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#g)" />
        </svg>

        {/* Card */}
        <div className="login-anim relative z-10 w-full max-w-md">
          <div
            className="rounded-2xl p-10 border border-amber-300/10 shadow-[0_25px_60px_rgba(0,0,0,.5)]"
            style={{
              background:
                "linear-gradient(145deg,rgba(8,16,60,.97),rgba(5,12,46,.99))",
            }}
          >
            {/* Logo */}
            <div className="flex flex-col items-center mb-8">
              <div className="w-14 h-14 rounded-2xl bg-amber-400/10 border border-amber-400/25 flex items-center justify-center mb-4">
                <Shield size={26} className="text-amber-400" />
              </div>
              <h1 className="text-3xl font-['Cormorant_Garamond'] font-semibold text-stone-100 tracking-[.15em]">
                СОГАAЗ
              </h1>
              <p className="text-[10px] font-['DM_Sans'] text-amber-400/60 tracking-[.22em] uppercase mt-1">
                Maritime Insurance Portal
              </p>
            </div>

            {/* Divider */}
            <div
              className="h-px mb-7"
              style={{
                background:
                  "linear-gradient(90deg,transparent,rgba(201,168,76,.25),transparent)",
              }}
            />

            <p className="text-center text-[13px] font-['DM_Sans'] text-stone-300/45 mb-7 tracking-wide">
              Secure Administrator Access
            </p>

            <form onSubmit={handleLogin} className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-[10.5px] font-['DM_Sans'] font-semibold tracking-[.16em] uppercase text-amber-400/60 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="admin@sogaaz.ru"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-white/[.04] border border-amber-300/15 focus:border-amber-400/50
                    focus:bg-white/[.07] text-stone-100 placeholder-stone-300/30 text-sm font-['DM_Sans']
                    px-4 py-3 rounded-xl outline-none transition-all
                    focus:ring-2 focus:ring-amber-400/8"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-[10.5px] font-['DM_Sans'] font-semibold tracking-[.16em] uppercase text-amber-400/60 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full bg-white/[.04] border border-amber-300/15 focus:border-amber-400/50
                      focus:bg-white/[.07] text-stone-100 placeholder-stone-300/30 text-sm font-['DM_Sans']
                      px-4 py-3 pr-11 rounded-xl outline-none transition-all
                      focus:ring-2 focus:ring-amber-400/8"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-amber-400/40 hover:text-amber-400/70 transition-colors"
                  >
                    {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="gold-shimmer w-full py-3.5 rounded-xl text-[#050c2e] text-sm font-['DM_Sans']
                    font-semibold tracking-[.06em] uppercase shadow-[0_4px_20px_rgba(201,168,76,.0)]
                    hover:shadow-[0_4px_20px_rgba(201,168,76,.4)] transition-shadow"
                >
                  {loading ? "Authenticating…" : "Sign In"}
                </button>
              </div>
            </form>

            {/* Footer */}
            <div
              className="h-px mt-8 mb-4"
              style={{
                background:
                  "linear-gradient(90deg,transparent,rgba(201,168,76,.15),transparent)",
              }}
            />
            <p className="text-center text-[11px] font-['DM_Sans'] text-stone-300/20">
              © 2025 СОГАAЗ · All rights reserved
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
