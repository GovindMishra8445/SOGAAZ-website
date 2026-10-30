/* eslint-disable react-refresh/only-export-components */
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  AlertTriangle,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  ShieldCheck,
  X,
} from "lucide-react";
import { STATUS } from "../../utils/certificate";

/* ─── Brand mark ─── */
export const BrandMark = ({ size = 40, className = "" }) => (
  <div
    className={`relative flex items-center justify-center rounded-xl bg-gradient-to-br from-[#d8b65c] via-[#c9a84c] to-[#9c7c2c] shadow-[0_6px_20px_-6px_rgba(201,168,76,.6)] ${className}`}
    style={{ width: size, height: size }}
  >
    <ShieldCheck
      size={size * 0.5}
      className="text-[#050c2e]"
      strokeWidth={2.2}
    />
  </div>
);

/* ─── Full-screen loader while the session is checked ─── */
export const AdminSplash = () => (
  <div className="min-h-screen flex flex-col items-center justify-center gap-5 bg-[#050c2e] font-body">
    <BrandMark size={52} />
    <div className="flex items-center gap-2.5 text-sm text-white/50">
      <Loader2 size={16} className="animate-spin text-[#c9a84c]" />
      Securing your session…
    </div>
  </div>
);

/* ─── Buttons ─── */
const BTN = {
  primary:
    "bg-[#0A1172] text-white hover:bg-[#121c8f] shadow-[0_1px_2px_rgba(10,17,114,.25),inset_0_1px_0_rgba(255,255,255,.08)]",
  gold: "bg-gradient-to-b from-[#d8b65c] to-[#c09a3c] text-[#050c2e] hover:brightness-105 shadow-[0_6px_18px_-6px_rgba(201,168,76,.7)]",
  secondary:
    "bg-white text-slate-700 ring-1 ring-inset ring-slate-200 hover:bg-slate-50 hover:ring-slate-300",
  ghost: "text-slate-600 hover:bg-slate-100",
  danger:
    "bg-rose-600 text-white hover:bg-rose-700 shadow-[0_1px_2px_rgba(225,29,72,.3)]",
};

export const Button = ({
  variant = "primary",
  size = "md",
  loading = false,
  icon: Icon,
  children,
  className = "",
  ...props
}) => (
  <button
    {...props}
    disabled={loading || props.disabled}
    className={`inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-150
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c]/60 focus-visible:ring-offset-2
      disabled:opacity-55 disabled:cursor-not-allowed active:scale-[.98]
      ${size === "sm" ? "h-9 px-3.5 text-[13px]" : size === "lg" ? "h-12 px-6 text-[15px]" : "h-10 px-4 text-sm"}
      ${BTN[variant]} ${className}`}
  >
    {loading ? (
      <Loader2 size={16} className="animate-spin" />
    ) : (
      Icon && <Icon size={16} />
    )}
    {children}
  </button>
);

export const IconButton = ({
  label,
  icon: Icon,
  tone = "slate",
  className = "",
  ...props
}) => {
  const tones = {
    slate: "text-slate-500 hover:text-[#0A1172] hover:bg-slate-100",
    blue: "text-slate-500 hover:text-blue-600 hover:bg-blue-50",
    red: "text-slate-500 hover:text-rose-600 hover:bg-rose-50",
  };
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      {...props}
      className={`inline-flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${tones[tone]} ${className}`}
    >
      <Icon size={16} />
    </button>
  );
};

/* ─── Form controls ─── */
export const inputClass =
  "w-full h-10 rounded-xl bg-white px-3.5 text-[13.5px] text-slate-800 placeholder:text-slate-400 ring-1 ring-inset ring-slate-200 outline-none transition-all hover:ring-slate-300 focus:ring-2 focus:ring-[#0A1172]/70 disabled:bg-slate-50 disabled:text-slate-500";

export const FormField = ({
  label,
  hint,
  error,
  required,
  children,
  className = "",
}) => (
  <label className={`block ${className}`}>
    <span className="mb-1.5 flex items-center gap-1 text-[12.5px] font-medium text-slate-700">
      {label}
      {required && <span className="text-rose-500">*</span>}
    </span>
    {children}
    {error ? (
      <span className="mt-1.5 block text-xs text-rose-600">{error}</span>
    ) : (
      hint && (
        <span className="mt-1.5 block text-xs text-slate-400">{hint}</span>
      )
    )}
  </label>
);

export const PasswordInput = ({ className = inputClass, ...props }) => {
  const [show, setShow] = useState(false);
  const [caps, setCaps] = useState(false);
  return (
    <div>
      <div className="relative">
        <input
          {...props}
          type={show ? "text" : "password"}
          onKeyUp={(e) => setCaps(e.getModifierState?.("CapsLock"))}
          className={`${className} pr-11`}
        />
        <button
          type="button"
          tabIndex={-1}
          onClick={() => setShow((s) => !s)}
          aria-label={show ? "Hide password" : "Show password"}
          className="absolute right-1.5 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:text-slate-600"
        >
          {show ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
      {caps && (
        <p className="mt-1.5 flex items-center gap-1 text-xs text-amber-600">
          <AlertTriangle size={12} /> Caps Lock is on
        </p>
      )}
    </div>
  );
};

// Mirrors validatePasswordStrength() on the backend.
export const PASSWORD_RULES = [
  { label: "At least 10 characters", test: (p) => p.length >= 10 },
  {
    label: "Upper & lower case letters",
    test: (p) => /[a-z]/.test(p) && /[A-Z]/.test(p),
  },
  { label: "At least one number", test: (p) => /\d/.test(p) },
  { label: "At least one symbol", test: (p) => /[^A-Za-z0-9]/.test(p) },
];

export const PasswordStrength = ({ password }) => {
  const passed = PASSWORD_RULES.filter((r) => r.test(password)).length;
  const levels = [
    { label: "Too weak", color: "bg-rose-500", text: "text-rose-600" },
    { label: "Weak", color: "bg-rose-500", text: "text-rose-600" },
    { label: "Fair", color: "bg-amber-500", text: "text-amber-600" },
    { label: "Good", color: "bg-lime-500", text: "text-lime-700" },
    { label: "Strong", color: "bg-emerald-500", text: "text-emerald-600" },
  ];
  const level = levels[passed];
  return (
    <div className="mt-3 space-y-2.5">
      <div className="flex items-center gap-3">
        <div className="flex flex-1 gap-1">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-colors ${i < passed ? level.color : "bg-slate-200"}`}
            />
          ))}
        </div>
        {password && (
          <span className={`text-xs font-medium ${level.text}`}>
            {level.label}
          </span>
        )}
      </div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
        {PASSWORD_RULES.map((r) => {
          const ok = r.test(password);
          return (
            <li
              key={r.label}
              className={`flex items-center gap-1.5 text-xs ${ok ? "text-emerald-600" : "text-slate-400"}`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${ok ? "bg-emerald-500" : "bg-slate-300"}`}
              />
              {r.label}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

/* ─── Status badge ─── */
export const StatusBadge = ({ status = STATUS.unknown, className = "" }) => (
  <span
    className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-0.5 text-[11.5px] font-medium ring-1 ring-inset ${status.badge} ${className}`}
  >
    <span className={`h-1.5 w-1.5 rounded-full ${status.dot}`} />
    {status.label}
  </span>
);

/* ─── Card ─── */
export const Card = ({ className = "", children }) => (
  <div
    className={`rounded-2xl bg-white ring-1 ring-slate-200/70 shadow-[0_1px_2px_rgba(15,23,42,.04),0_8px_24px_-12px_rgba(15,23,42,.08)] ${className}`}
  >
    {children}
  </div>
);

export const CardHeader = ({ title, subtitle, action }) => (
  <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-5 py-4">
    <div className="min-w-0">
      <h3 className="text-[15px] font-semibold text-slate-900">{title}</h3>
      {subtitle && <p className="mt-0.5 text-xs text-slate-500">{subtitle}</p>}
    </div>
    {action}
  </div>
);

// Overlays render into <body> so page transitions (transform) can't clip them.
export const Portal = ({ children }) => createPortal(children, document.body);

/* ─── Modal ─── */
export const Modal = ({
  open,
  onClose,
  title,
  subtitle,
  icon: Icon,
  size = "md",
  children,
  footer,
}) => {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose?.();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;
  const widths = { sm: "max-w-md", md: "max-w-2xl", lg: "max-w-4xl" };

  return (
    <Portal>
      <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-4 font-body">
        <div
          className="absolute inset-0 bg-[#050c2e]/50 backdrop-blur-[3px]"
          onClick={onClose}
        />
        <div
          role="dialog"
          aria-modal="true"
          className={`admin-scale-in relative flex max-h-[94vh] w-full ${widths[size]} flex-col overflow-hidden rounded-t-2xl sm:rounded-2xl bg-white shadow-2xl ring-1 ring-black/5`}
        >
          <div className="flex items-start gap-3.5 border-b border-slate-100 px-6 py-5">
            {Icon && (
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#0A1172]/[.06] text-[#0A1172]">
                <Icon size={19} />
              </div>
            )}
            <div className="min-w-0 flex-1">
              <h2 className="font-display text-[22px] font-semibold leading-tight text-[#0A1172]">
                {title}
              </h2>
              {subtitle && (
                <p className="mt-0.5 text-[13px] text-slate-500">{subtitle}</p>
              )}
            </div>
            <IconButton label="Close" icon={X} onClick={onClose} />
          </div>
          <div className="admin-scroll flex-1 overflow-y-auto">{children}</div>
          {footer && (
            <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2.5 border-t border-slate-100 bg-slate-50/70 px-6 py-4">
              {footer}
            </div>
          )}
        </div>
      </div>
    </Portal>
  );
};

/* ─── Confirm dialog ─── */
export const ConfirmDialog = ({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = "Confirm",
  tone = "danger",
  loading,
  icon: Icon = AlertTriangle,
}) => {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose?.();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <Portal>
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 font-body">
        <div
          className="absolute inset-0 bg-[#050c2e]/50 backdrop-blur-[3px]"
          onClick={onClose}
        />
        <div
          role="alertdialog"
          className="admin-scale-in relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl ring-1 ring-black/5"
        >
          <div
            className={`mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full ${
              tone === "danger"
                ? "bg-rose-50 text-rose-600 ring-8 ring-rose-50/50"
                : "bg-[#0A1172]/[.06] text-[#0A1172] ring-8 ring-[#0A1172]/[.03]"
            }`}
          >
            <Icon size={20} />
          </div>
          <h3 className="text-center font-display text-[22px] font-semibold text-slate-900">
            {title}
          </h3>
          <div className="mt-1.5 text-center text-[13.5px] leading-relaxed text-slate-500">
            {description}
          </div>
          <div className="mt-6 grid grid-cols-2 gap-2.5">
            <Button variant="secondary" onClick={onClose} disabled={loading}>
              Cancel
            </Button>
            <Button
              variant={tone === "danger" ? "danger" : "primary"}
              onClick={onConfirm}
              loading={loading}
            >
              {confirmLabel}
            </Button>
          </div>
        </div>
      </div>
    </Portal>
  );
};

/* ─── Empty state ─── */
export const EmptyState = ({
  icon: Icon = Lock,
  title,
  description,
  action,
}) => (
  <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 ring-1 ring-slate-100">
      <Icon size={24} className="text-slate-300" />
    </div>
    <p className="text-sm font-medium text-slate-700">{title}</p>
    {description && (
      <p className="mt-1 max-w-xs text-[13px] text-slate-400">{description}</p>
    )}
    {action && <div className="mt-4">{action}</div>}
  </div>
);

export const Skeleton = ({ className = "" }) => (
  <div className={`animate-pulse rounded-lg bg-slate-100 ${className}`} />
);
