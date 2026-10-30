import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import {
  AlertCircle,
  ArrowRight,
  FileCheck2,
  Lock,
  Mail,
  ShieldCheck,
  Timer,
} from "lucide-react";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import {
  AdminSplash,
  BrandMark,
  PasswordInput,
} from "../../components/admin/ui";

const darkInput =
  "w-full h-12 rounded-xl bg-white/[.04] pl-11 pr-4 text-[14px] text-white placeholder:text-white/25 ring-1 ring-inset ring-white/10 outline-none transition-all hover:ring-white/20 focus:bg-white/[.06] focus:ring-2 focus:ring-[#c9a84c]/70";

const FEATURES = [
  {
    icon: FileCheck2,
    title: "Certificate registry",
    text: "Issue, update and track every vessel certificate in one place.",
  },
  {
    icon: ShieldCheck,
    title: "Bank-grade security",
    text: "Encrypted HTTPS sessions, httpOnly cookies and brute-force lockout.",
  },
  {
    icon: Timer,
    title: "Expiry intelligence",
    text: "See what expires next before it becomes a problem.",
  },
];

const Login = () => {
  const { status, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const redirectTo = location.state?.from?.startsWith("/admin")
    ? location.state.from
    : "/admin/dashboard";

  if (status === "checking") return <AdminSplash />;
  if (status === "authenticated") return <Navigate to={redirectTo} replace />;

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const admin = await login(email.trim(), password);
      toast.success(`Welcome back, ${admin.name || "Administrator"}`);
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err.message);
      setPassword("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-[1.05fr_1fr] bg-[#050c2e] font-body">
      {/* ── Brand panel ── */}
      <aside className="relative hidden lg:flex flex-col justify-between overflow-hidden p-12 xl:p-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,#1a2a9c_0%,#0a1172_35%,#050c2e_75%)]" />
        <div
          className="absolute inset-0 opacity-[.07]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.6) 1px,transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage:
              "radial-gradient(ellipse at 30% 30%,black,transparent 70%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at 30% 30%,black,transparent 70%)",
          }}
        />
        {/* Waves */}
        <svg
          className="absolute bottom-0 left-0 w-full opacity-[.18]"
          viewBox="0 0 1200 320"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0 220 C 200 160 400 280 600 220 S 1000 160 1200 220 V320 H0Z"
            fill="#184de5"
          />
          <path
            d="M0 260 C 250 210 450 310 700 255 S 1050 215 1200 260 V320 H0Z"
            fill="#c9a84c"
            opacity=".55"
          />
        </svg>

        <div className="relative flex items-center gap-3.5">
          <BrandMark size={44} />
          <div>
            <p className="font-display text-2xl font-semibold tracking-[.16em] text-white leading-none">
              СОГАAЗ
            </p>
            <p className="mt-1 text-[10px] uppercase tracking-[.28em] text-[#c9a84c]/80">
              Maritime Insurance
            </p>
          </div>
        </div>

        <div className="relative max-w-lg">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/[.06] px-3 py-1 text-[11px] uppercase tracking-[.2em] text-[#e2c77a] ring-1 ring-white/10">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
            Administration Console
          </p>
          <h1 className="font-display text-5xl xl:text-[3.6rem] font-semibold leading-[1.05] text-white">
            Trusted cover for
            <span className="block bg-gradient-to-r from-[#e8cf86] to-[#c9a84c] bg-clip-text text-transparent">
              every voyage.
            </span>
          </h1>
          <div className="mt-10 space-y-5">
            {FEATURES.map(({ icon: Icon, title, text }) => (
              <div key={title} className="flex gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-white/[.06] ring-1 ring-white/10">
                  <Icon size={18} className="text-[#d8b65c]" />
                </div>
                <div>
                  <p className="text-[14px] font-medium text-white">{title}</p>
                  <p className="mt-0.5 text-[13px] leading-relaxed text-white/45">
                    {text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="relative text-xs text-white/30">
          © {new Date().getFullYear()} СОГАAЗ · Authorised personnel only
        </p>
      </aside>

      {/* ── Form panel ── */}
      <main className="relative flex items-center justify-center px-5 py-12 sm:px-8 lg:bg-[#070f38] lg:border-l lg:border-white/[.06]">
        <div className="absolute inset-0 lg:hidden bg-[radial-gradient(ellipse_at_top,#1a2a9c_0%,#050c2e_60%)]" />

        <div className="admin-fade-up relative w-full max-w-[400px]">
          <div className="mb-10 flex flex-col items-center text-center lg:items-start lg:text-left">
            <div className="mb-6 flex items-center gap-3 lg:hidden">
              <BrandMark size={44} />
              <p className="font-display text-2xl font-semibold tracking-[.16em] text-white">
                СОГАAЗ
              </p>
            </div>
            <h2 className="font-display text-[2.4rem] font-semibold leading-tight text-white">
              Sign in
            </h2>
            <p className="mt-2 text-[14px] text-white/45">
              Access the certificate administration console.
            </p>
          </div>

          {error && (
            <div
              role="alert"
              className="admin-scale-in mb-5 flex items-start gap-2.5 rounded-xl bg-rose-500/10 px-4 py-3 text-[13px] text-rose-200 ring-1 ring-inset ring-rose-400/25"
            >
              <AlertCircle
                size={16}
                className="mt-0.5 flex-shrink-0 text-rose-400"
              />
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5" noValidate={false}>
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-[12.5px] font-medium text-white/70"
              >
                Email address
              </label>
              <div className="relative">
                <Mail
                  size={17}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
                />
                <input
                  id="email"
                  type="email"
                  autoComplete="username"
                  autoFocus
                  required
                  maxLength={254}
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={darkInput}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-[12.5px] font-medium text-white/70"
              >
                Password
              </label>
              <div className="relative [&_button]:text-white/35 [&_button:hover]:text-white/70">
                <Lock
                  size={17}
                  className="pointer-events-none absolute left-4 top-6 -translate-y-1/2 text-white/30 z-10"
                />
                <PasswordInput
                  id="password"
                  autoComplete="current-password"
                  required
                  maxLength={128}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={darkInput}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group relative mt-2 flex h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-b from-[#e2c473] to-[#c09a3c] text-[14px] font-semibold text-[#050c2e] shadow-[0_10px_30px_-10px_rgba(201,168,76,.7)] transition-all hover:brightness-105 active:scale-[.99] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#050c2e]/30 border-t-[#050c2e]" />
                  Verifying…
                </>
              ) : (
                <>
                  Sign in securely
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 flex items-center gap-3 rounded-xl bg-white/[.03] px-4 py-3 ring-1 ring-white/[.06]">
            <ShieldCheck
              size={18}
              className="flex-shrink-0 text-emerald-400/80"
            />
            <p className="text-[12px] leading-relaxed text-white/40">
              Protected connection. Accounts lock for 15 minutes after 5 failed
              attempts.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
