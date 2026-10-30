import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import {
  CheckCircle2,
  KeyRound,
  Mail,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import { authApi } from "../../lib/api";
import {
  Button,
  Card,
  CardHeader,
  FormField,
  PASSWORD_RULES,
  PasswordInput,
  PasswordStrength,
  inputClass,
} from "../../components/admin/ui";
import { formatDateTime } from "../../utils/certificate";

const SectionIntro = ({ icon: Icon, title, text }) => (
  <div className="lg:pr-8">
    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#0A1172]/[.06] text-[#0A1172]">
      <Icon size={19} />
    </div>
    <h3 className="text-[15px] font-semibold text-slate-900">{title}</h3>
    <p className="mt-1 text-[13px] leading-relaxed text-slate-500">{text}</p>
  </div>
);

const Settings = () => {
  const { admin, setAdmin } = useAuth();
  const { handleApiError } = useOutletContext();

  /* ── Profile ── */
  const [name, setName] = useState(admin?.name || "");
  const [profilePw, setProfilePw] = useState("");
  const [savingProfile, setSavingProfile] = useState(false);

  /* ── Email ── */
  const [newEmail, setNewEmail] = useState("");
  const [emailPw, setEmailPw] = useState("");
  const [savingEmail, setSavingEmail] = useState(false);

  /* ── Password ── */
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [savingPw, setSavingPw] = useState(false);

  const pwValid = PASSWORD_RULES.every((r) => r.test(newPw));
  const pwMatch = newPw && newPw === confirmPw;

  const submit = async (payload, setBusy, onDone, successMsg) => {
    setBusy(true);
    try {
      const { admin: updated } = await authApi.updateCredentials(payload);
      setAdmin(updated);
      toast.success(successMsg);
      onDone();
    } catch (err) {
      handleApiError(err, "Could not update your account");
    } finally {
      setBusy(false);
    }
  };

  const saveProfile = (e) => {
    e.preventDefault();
    submit(
      { currentPassword: profilePw, name: name.trim() },
      setSavingProfile,
      () => setProfilePw(""),
      "Profile updated",
    );
  };

  const saveEmail = (e) => {
    e.preventDefault();
    submit(
      { currentPassword: emailPw, newEmail: newEmail.trim() },
      setSavingEmail,
      () => {
        setNewEmail("");
        setEmailPw("");
      },
      "Login email changed. Other sessions were signed out.",
    );
  };

  const savePassword = (e) => {
    e.preventDefault();
    if (!pwValid || !pwMatch) return;
    submit(
      { currentPassword: currentPw, newPassword: newPw },
      setSavingPw,
      () => {
        setCurrentPw("");
        setNewPw("");
        setConfirmPw("");
      },
      "Password changed. Other sessions were signed out.",
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-[30px] font-semibold leading-tight text-slate-900">
          Account settings
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Manage your admin profile, login email and password.
        </p>
      </div>

      {/* Security overview */}
      <Card className="overflow-hidden">
        <div className="relative flex flex-col gap-5 bg-[#050c2e] p-6 text-white sm:flex-row sm:items-center">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_right,rgba(24,77,229,.4),transparent_60%)]" />
          <div className="relative flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#d8b65c] to-[#a8862f] text-xl font-semibold text-[#050c2e]">
            {(admin?.name || admin?.email || "A")[0].toUpperCase()}
          </div>
          <div className="relative min-w-0 flex-1">
            <p className="truncate text-lg font-semibold">{admin?.name}</p>
            <p className="truncate text-sm text-white/55">{admin?.email}</p>
          </div>
          <div className="relative grid grid-cols-2 gap-6 text-[12.5px]">
            <div>
              <p className="text-white/40">Last sign-in</p>
              <p className="mt-0.5 font-medium">
                {formatDateTime(admin?.lastLoginAt)}
              </p>
            </div>
            <div>
              <p className="text-white/40">Password changed</p>
              <p className="mt-0.5 font-medium">
                {formatDateTime(admin?.passwordChangedAt)}
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Profile */}
      <Card>
        <div className="grid gap-6 p-6 lg:grid-cols-[280px_1fr]">
          <SectionIntro
            icon={UserRound}
            title="Profile"
            text="Your display name appears in the admin panel greeting and menu."
          />
          <form onSubmit={saveProfile} className="grid gap-4 sm:grid-cols-2">
            <FormField label="Display name" required>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={80}
                required
                className={inputClass}
              />
            </FormField>
            <FormField
              label="Current password"
              required
              hint="Required to confirm it's you"
            >
              <PasswordInput
                value={profilePw}
                onChange={(e) => setProfilePw(e.target.value)}
                autoComplete="current-password"
                required
              />
            </FormField>
            <div className="sm:col-span-2 flex justify-end">
              <Button
                type="submit"
                loading={savingProfile}
                disabled={
                  !name.trim() || !profilePw || name.trim() === admin?.name
                }
              >
                Save profile
              </Button>
            </div>
          </form>
        </div>
      </Card>

      {/* Email */}
      <Card>
        <div className="grid gap-6 p-6 lg:grid-cols-[280px_1fr]">
          <SectionIntro
            icon={Mail}
            title="Login email"
            text="The email address you use to sign in. Changing it signs out every other device."
          />
          <form onSubmit={saveEmail} className="grid gap-4 sm:grid-cols-2">
            <FormField label="Current email">
              <input
                value={admin?.email || ""}
                disabled
                className={inputClass}
              />
            </FormField>
            <FormField label="New email" required>
              <input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                maxLength={254}
                autoComplete="email"
                placeholder="new@company.com"
                required
                className={inputClass}
              />
            </FormField>
            <FormField
              label="Current password"
              required
              className="sm:col-span-2 sm:max-w-[calc(50%-.5rem)]"
            >
              <PasswordInput
                value={emailPw}
                onChange={(e) => setEmailPw(e.target.value)}
                autoComplete="current-password"
                required
              />
            </FormField>
            <div className="sm:col-span-2 flex justify-end">
              <Button
                type="submit"
                loading={savingEmail}
                disabled={!newEmail.trim() || !emailPw}
              >
                Change email
              </Button>
            </div>
          </form>
        </div>
      </Card>

      {/* Password */}
      <Card>
        <div className="grid gap-6 p-6 lg:grid-cols-[280px_1fr]">
          <SectionIntro
            icon={KeyRound}
            title="Password"
            text="Use a long, unique password. Changing it signs out every other device."
          />
          <form onSubmit={savePassword} className="grid gap-4 sm:grid-cols-2">
            <FormField
              label="Current password"
              required
              className="sm:col-span-2 sm:max-w-[calc(50%-.5rem)]"
            >
              <PasswordInput
                value={currentPw}
                onChange={(e) => setCurrentPw(e.target.value)}
                autoComplete="current-password"
                required
              />
            </FormField>
            <FormField label="New password" required>
              <PasswordInput
                value={newPw}
                onChange={(e) => setNewPw(e.target.value)}
                autoComplete="new-password"
                maxLength={128}
                required
              />
            </FormField>
            <FormField
              label="Confirm new password"
              required
              error={
                confirmPw && !pwMatch ? "Passwords don't match" : undefined
              }
            >
              <PasswordInput
                value={confirmPw}
                onChange={(e) => setConfirmPw(e.target.value)}
                autoComplete="new-password"
                maxLength={128}
                required
              />
            </FormField>
            <div className="sm:col-span-2">
              <PasswordStrength password={newPw} />
            </div>
            <div className="sm:col-span-2 flex items-center justify-end gap-3">
              {pwValid && pwMatch && (
                <span className="flex items-center gap-1.5 text-xs text-emerald-600">
                  <CheckCircle2 size={14} /> Ready to save
                </span>
              )}
              <Button
                type="submit"
                loading={savingPw}
                disabled={!currentPw || !pwValid || !pwMatch}
              >
                Update password
              </Button>
            </div>
          </form>
        </div>
      </Card>

      <div className="flex items-start gap-3 rounded-2xl bg-emerald-50/60 p-4 ring-1 ring-emerald-100">
        <ShieldCheck
          size={18}
          className="mt-0.5 flex-shrink-0 text-emerald-600"
        />
        <p className="text-[13px] leading-relaxed text-emerald-900/80">
          Your session is stored in a secure, httpOnly cookie and expires
          automatically. After 5 wrong passwords the account is locked for 15
          minutes.
        </p>
      </div>
    </div>
  );
};

export default Settings;
