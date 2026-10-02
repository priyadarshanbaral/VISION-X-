import { useState } from "react";
import { Link, useRouter } from "../components/Router";
import { useAuth } from "../components/AuthProvider";
import VisionXLogo from "../components/VisionXLogo";
import { Mail, Lock, User, LogIn, AlertCircle, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const { login } = useAuth();
  const { navigate } = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(identifier.trim(), password);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const fillDemo = () => {
    setIdentifier("demo@visionx.in");
    setPassword("demo1234");
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-16 bg-gradient-to-br from-amber-50 via-stone-50 to-orange-50">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex mb-6">
            <VisionXLogo size="lg" variant="dark" />
          </Link>
          <h1 className="text-3xl font-black text-stone-900 tracking-tight">
            Welcome Back
          </h1>
          <p className="text-stone-600 mt-2">
            Sign in to your Vision X traveler account
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-stone-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="flex items-start gap-2.5 bg-rose-50 border border-rose-200 text-rose-800 text-sm rounded-xl px-4 py-3">
                <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-1.5">
                Email or Username
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="you@email.com or yourname"
                  required
                  autoComplete="username"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-stone-300 bg-stone-50 focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 outline-none transition-all text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  autoComplete="current-password"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-stone-300 bg-stone-50 focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 outline-none transition-all text-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 disabled:opacity-60 text-white font-bold py-3.5 rounded-xl transition-all shadow-[0_8px_20px_rgba(245,158,11,0.35)] active:scale-[0.98] disabled:active:scale-100"
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn className="w-4 h-4" /> Sign In
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-stone-200">
            <button
              onClick={fillDemo}
              className="w-full text-center text-xs font-semibold text-stone-500 hover:text-amber-700 transition-colors"
            >
              Use demo account (demo@visionx.in / demo1234)
            </button>
          </div>
        </div>

        <p className="text-center text-sm text-stone-600 mt-6">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="font-bold text-amber-700 hover:text-amber-800 inline-flex items-center gap-1"
          >
            Create one <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </p>
      </div>
    </div>
  );
}
