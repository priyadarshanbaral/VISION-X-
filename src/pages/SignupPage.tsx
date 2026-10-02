import { useState } from "react";
import { Link, useRouter } from "../components/Router";
import { useAuth } from "../components/AuthProvider";
import VisionXLogo from "../components/VisionXLogo";
import {
  Mail,
  Lock,
  User,
  Phone,
  UserPlus,
  AlertCircle,
  ArrowLeft,
  Check,
} from "lucide-react";

const fieldClass =
  "w-full pl-10 pr-4 py-3 rounded-xl border border-stone-300 bg-stone-50 focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 outline-none transition-all text-sm";

export default function SignupPage() {
  const { signup } = useAuth();
  const { navigate } = useRouter();
  const [form, setForm] = useState({
    username: "",
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const update = (key: string, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const rules = [
    { label: "At least 3 characters", ok: form.username.trim().length >= 3 },
    {
      label: "Valid email address",
      ok: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email),
    },
    { label: "Valid phone number", ok: /^[0-9+\-\s]{10,15}$/.test(form.phone) },
    {
      label: "8+ chars with letters & numbers",
      ok:
        form.password.length >= 8 &&
        /[A-Za-z]/.test(form.password) &&
        /[0-9]/.test(form.password),
    },
    {
      label: "Passwords match",
      ok: form.password.length > 0 && form.password === form.confirmPassword,
    },
  ];
  const allValid = rules.every((r) => r.ok) && form.name.trim().length >= 2;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!allValid) {
      setError(
        "Please complete all fields and satisfy the requirements below.",
      );
      return;
    }
    setLoading(true);
    try {
      await signup({
        username: form.username.trim(),
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        password: form.password,
      });
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message || "Could not create your account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-16 bg-gradient-to-br from-amber-50 via-stone-50 to-orange-50">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex mb-6">
            <VisionXLogo size="lg" variant="dark" />
          </Link>
          <h1 className="text-3xl font-black text-stone-900 tracking-tight">
            Create Your Account
          </h1>
          <p className="text-stone-600 mt-2">
            Join Vision X to plan, book and save Odisha journeys
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-stone-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="flex items-start gap-2.5 bg-rose-50 border border-rose-200 text-rose-800 text-sm rounded-xl px-4 py-3">
                <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-1.5">
                  Username
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                  <input
                    value={form.username}
                    onChange={(e) => update("username", e.target.value)}
                    placeholder="tourist2026"
                    required
                    className={fieldClass}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                  <input
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    placeholder="Your Name"
                    required
                    className={fieldClass}
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="you@email.com"
                  required
                  className={fieldClass}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-1.5">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <input
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  placeholder="+91 98765 43210"
                  required
                  className={fieldClass}
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                  <input
                    type="password"
                    value={form.password}
                    onChange={(e) => update("password", e.target.value)}
                    placeholder="Create password"
                    required
                    className={fieldClass}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-1.5">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                  <input
                    type="password"
                    value={form.confirmPassword}
                    onChange={(e) => update("confirmPassword", e.target.value)}
                    placeholder="Repeat password"
                    required
                    className={fieldClass}
                  />
                </div>
              </div>
            </div>

            <div className="bg-stone-50 rounded-xl border border-stone-200 p-4 space-y-1.5">
              {rules.map((rule) => (
                <div
                  key={rule.label}
                  className="flex items-center gap-2 text-xs"
                >
                  <span
                    className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                      rule.ok ? "bg-emerald-500 text-white" : "bg-stone-300"
                    }`}
                  >
                    {rule.ok && (
                      <Check className="w-2.5 h-2.5" strokeWidth={4} />
                    )}
                  </span>
                  <span
                    className={
                      rule.ok
                        ? "text-emerald-700 font-semibold"
                        : "text-stone-500"
                    }
                  >
                    {rule.label}
                  </span>
                </div>
              ))}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 disabled:opacity-60 text-white font-bold py-3.5 rounded-xl transition-all shadow-[0_8px_20px_rgba(245,158,11,0.35)] active:scale-[0.98]"
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <UserPlus className="w-4 h-4" /> Create Account
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-stone-600 mt-6">
          Already registered?{" "}
          <Link
            href="/login"
            className="font-bold text-amber-700 hover:text-amber-800 inline-flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
