import { useEffect, useState } from "react";
import { Link } from "../components/Router";
import { useAuth } from "../components/AuthProvider";
import {
  Calendar,
  MapPin,
  Wallet,
  Heart,
  LogOut,
  Settings,
  KeyRound,
  Check,
  X,
  Clock,
  User as UserIcon,
  Phone,
  Mail,
  Ticket,
} from "lucide-react";

export default function DashboardPage() {
  const { user, logout, api, refreshUser } = useAuth();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [tab, setTab] = useState<
    "overview" | "bookings" | "wishlist" | "profile"
  >("overview");

  const [editName, setEditName] = useState(user?.name || "");
  const [editPhone, setEditPhone] = useState(user?.phone || "");
  const [editBio, setEditBio] = useState(user?.bio || "");
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileMsg, setProfileMsg] = useState<{
    ok: boolean;
    text: string;
  } | null>(null);

  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [pwMsg, setPwMsg] = useState<{ ok: boolean; text: string } | null>(
    null,
  );
  const [savingPw, setSavingPw] = useState(false);

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const result = await api("/api/me/dashboard");
      setData(result);
    } catch (err: any) {
      setError(err.message || "Could not load your dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      setEditName(user.name || "");
      setEditPhone(user.phone || "");
      setEditBio(user.bio || "");
      load();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  const saveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingProfile(true);
    setProfileMsg(null);
    try {
      await api("/api/auth/me", {
        method: "PUT",
        body: JSON.stringify({
          name: editName,
          phone: editPhone,
          bio: editBio,
        }),
      });
      await refreshUser();
      setProfileMsg({ ok: true, text: "Profile updated successfully" });
    } catch (err: any) {
      setProfileMsg({ ok: false, text: err.message });
    } finally {
      setSavingProfile(false);
    }
  };

  const changePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingPw(true);
    setPwMsg(null);
    try {
      const res = await api("/api/auth/change-password", {
        method: "POST",
        body: JSON.stringify({
          currentPassword: currentPw,
          newPassword: newPw,
        }),
      });
      setPwMsg({ ok: true, text: res.message });
      setCurrentPw("");
      setNewPw("");
    } catch (err: any) {
      setPwMsg({ ok: false, text: err.message });
    } finally {
      setSavingPw(false);
    }
  };

  const cancelBooking = async (id: string) => {
    try {
      await api(`/api/me/bookings/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ status: "cancelled" }),
      });
      load();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const removeWishlist = async (itemId: string) => {
    try {
      await api("/api/me/wishlist", {
        method: "POST",
        body: JSON.stringify({ itemId }),
      });
      load();
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (!user) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
        <UserIcon className="w-14 h-14 text-amber-500 mb-4" />
        <h1 className="text-2xl font-black text-stone-900 mb-2">
          Please sign in to continue
        </h1>
        <p className="text-stone-600 mb-6">
          Your traveler dashboard is only available to signed-in members.
        </p>
        <div className="flex gap-3">
          <Link
            href="/login"
            className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            className="px-6 py-3 rounded-xl border border-stone-300 text-stone-700 font-bold hover:bg-stone-100 transition-colors"
          >
            Create Account
          </Link>
        </div>
      </div>
    );
  }

  const stats = data?.stats;
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const tabs = [
    { id: "overview", label: "Overview", icon: Wallet },
    { id: "bookings", label: "My Bookings", icon: Ticket },
    { id: "wishlist", label: "Wishlist", icon: Heart },
    { id: "profile", label: "Profile & Security", icon: Settings },
  ] as const;

  return (
    <div className="min-h-screen bg-[#f6f5f2]">
      <div className="px-4 pt-6 sm:px-6 lg:px-8 lg:pt-8">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#182523] via-[#263a34] to-[#384b3c] text-white shadow-[0_24px_70px_-32px_rgba(15,23,42,0.65)]">
          <div className="pointer-events-none absolute -right-24 -top-40 h-96 w-96 rounded-full bg-amber-300/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-40 right-1/4 h-72 w-72 rounded-full bg-emerald-300/10 blur-3xl" />
          <div className="relative flex flex-col gap-8 px-6 py-8 sm:px-9 sm:py-10 lg:flex-row lg:items-center lg:px-12">
            <div
              className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full text-2xl font-black ring-4 ring-white/15 shadow-xl"
              style={{ backgroundColor: user.avatarColor || "#b45309" }}
            >
              {initials}
            </div>
            <div className="min-w-0 flex-grow">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-amber-300">
                Your traveler hub
              </p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
                Welcome back, {user.name.split(" ")[0]}
              </h1>
              <p className="mt-2 max-w-xl text-sm leading-6 text-stone-300 sm:text-base">
                Your next great escape starts here. Pick up where you left off
                and make your next journey unforgettable.
              </p>
              <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium text-stone-300 sm:text-sm">
                <span className="inline-flex items-center gap-1.5">
                  <UserIcon className="h-3.5 w-3.5 text-amber-300" /> @{user.username}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5 text-amber-300" /> {user.email}
                </span>
                {user.phone && (
                  <span className="inline-flex items-center gap-1.5">
                    <Phone className="h-3.5 w-3.5 text-amber-300" /> {user.phone}
                  </span>
                )}
              </div>
            </div>
            <button
              onClick={logout}
              className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-xl border border-white/15 bg-white/[0.07] px-5 py-3 text-sm font-semibold text-white/90 backdrop-blur transition hover:border-rose-300/40 hover:bg-rose-400/15 hover:text-white lg:self-center"
            >
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          </div>
        </div>
      </div>

      <div className="sticky top-16 z-40 mt-6 border-b border-stone-200/80 bg-[#f6f5f2]/90 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-1 overflow-x-auto">
          {tabs.map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex items-center gap-2 px-4 py-3.5 text-sm font-bold whitespace-nowrap border-b-2 transition-colors ${
                  tab === t.id
                    ? "border-amber-600 text-stone-900"
                      : "border-transparent text-stone-500 hover:text-stone-900"
                }`}
              >
                <Icon className="w-4 h-4" /> {t.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {error && (
          <div className="mb-6 bg-rose-50 border border-rose-200 text-rose-800 text-sm rounded-xl px-4 py-3">
            {error}
          </div>
        )}

        {loading ? (
          <div className="py-20 text-center text-stone-500">
            Loading your dashboard…
          </div>
        ) : (
          <>
            {tab === "overview" && (
              <div className="space-y-6">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700">
                      At a glance
                    </p>
                    <h2 className="mt-1 text-2xl font-semibold tracking-tight text-stone-900">
                      Your travel snapshot
                    </h2>
                  </div>
                  <p className="text-sm text-stone-500">
                    A little inspiration for your next adventure.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
                  {[
                    {
                      label: "Total Bookings",
                      value: stats?.totalBookings ?? 0,
                      icon: Calendar,
                      color: "text-amber-600",
                      iconBg: "bg-amber-50",
                    },
                    {
                      label: "Upcoming Trips",
                      value: stats?.upcomingTrips ?? 0,
                      icon: MapPin,
                      color: "text-teal-600",
                      iconBg: "bg-teal-50",
                    },
                    {
                      label: "Wishlist Items",
                      value: stats?.wishlistCount ?? 0,
                      icon: Heart,
                      color: "text-rose-500",
                      iconBg: "bg-rose-50",
                    },
                    {
                      label: "Total Spent",
                      value: `₹${(stats?.totalSpent ?? 0).toLocaleString("en-IN")}`,
                      icon: Wallet,
                      color: "text-indigo-600",
                      iconBg: "bg-indigo-50",
                    },
                  ].map((card) => {
                    const Icon = card.icon;
                    return (
                      <div
                        key={card.label}
                        className="group rounded-2xl border border-stone-200/80 bg-white p-4 shadow-[0_8px_28px_-20px_rgba(28,25,23,0.45)] transition duration-200 hover:-translate-y-0.5 hover:border-stone-300 hover:shadow-[0_16px_36px_-22px_rgba(28,25,23,0.4)] sm:p-5"
                      >
                        <div className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl ${card.iconBg}`}>
                          <Icon className={`h-5 w-5 ${card.color}`} />
                        </div>
                        <p className="text-xl font-bold tracking-tight text-stone-900 sm:text-2xl">
                          {card.value}
                        </p>
                        <p className="mt-1.5 text-xs font-medium text-stone-500 sm:text-sm">
                          {card.label}
                        </p>
                      </div>
                    );
                  })}
                </div>

                <div className="grid gap-5 lg:grid-cols-2">
                  <div className="rounded-2xl border border-stone-200/80 bg-white p-5 shadow-[0_12px_40px_-30px_rgba(28,25,23,0.4)] sm:p-6">
                    <div className="mb-5 flex items-center justify-between gap-3">
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-stone-400">
                          Keep exploring
                        </p>
                        <h2 className="mt-1 font-semibold text-stone-900">
                          Recent bookings
                        </h2>
                      </div>
                      <button
                        onClick={() => setTab("bookings")}
                        className="rounded-lg px-2.5 py-2 text-xs font-semibold text-amber-800 transition hover:bg-amber-50"
                      >
                        View all
                      </button>
                    </div>
                    {data?.bookings?.length ? (
                      <ul className="space-y-0">
                        {data.bookings.slice(0, 5).map((b: any) => (
                          <li
                            key={b._id}
                            className="flex items-center justify-between gap-3 border-b border-stone-100 py-3 first:pt-0 last:border-0 last:pb-0"
                          >
                            <div className="min-w-0">
                              <p className="truncate text-sm font-semibold text-stone-800">
                                {b.title}
                              </p>
                              <p className="mt-1 text-xs text-stone-500">
                                {new Date(b.date).toLocaleDateString("en-IN")} ·{" "}
                                {b.guests} guest(s)
                              </p>
                            </div>
                            <span
                              className={`text-xs font-bold px-2.5 py-1 rounded-full capitalize ${
                                b.status === "confirmed"
                                  ? "bg-emerald-100 text-emerald-700"
                                  : b.status === "cancelled"
                                    ? "bg-rose-100 text-rose-700"
                                    : "bg-amber-100 text-amber-700"
                              }`}
                            >
                              {b.status}
                            </span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="rounded-xl bg-stone-50 px-4 py-5 text-sm leading-6 text-stone-500">
                        No bookings yet. Explore our packages to get started.
                      </p>
                    )}
                  </div>

                  <div className="rounded-2xl border border-stone-200/80 bg-white p-5 shadow-[0_12px_40px_-30px_rgba(28,25,23,0.4)] sm:p-6">
                    <div className="mb-5 flex items-center justify-between gap-3">
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-stone-400">
                          Your journey
                        </p>
                        <h2 className="mt-1 font-semibold text-stone-900">
                          Account activity
                        </h2>
                      </div>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-stone-50 px-3 py-1.5 text-[11px] font-medium text-stone-500">
                        <Clock className="h-3.5 w-3.5" />
                        Since{" "}
                        {stats?.memberSince
                          ? new Date(stats.memberSince).toLocaleDateString(
                              "en-IN",
                              { month: "short", year: "numeric" },
                            )
                          : "—"}
                      </span>
                    </div>
                    {data?.activity?.length ? (
                      <ul className="space-y-3">
                        {data.activity.map((a: any, i: number) => (
                          <li
                            key={i}
                            className="flex items-start gap-2.5 text-sm text-stone-600"
                          >
                            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50">
                              <Check className="h-3 w-3 text-emerald-600" />
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block font-medium capitalize text-stone-700">
                                {String(a.action).replace(/_/g, " ")}
                              </span>
                              {a.detail && (
                                <span className="mt-0.5 block truncate text-xs text-stone-400">
                                  {a.detail}
                                </span>
                              )}
                            </span>
                            <span className="shrink-0 pt-0.5 text-[11px] text-stone-400">
                              {new Date(a.at).toLocaleDateString("en-IN")}
                            </span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="rounded-xl bg-stone-50 px-4 py-5 text-sm text-stone-500">
                        No recent activity.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {tab === "bookings" && (
              <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm">
                <h2 className="font-black text-stone-900 mb-5">My Bookings</h2>
                {data?.bookings?.length ? (
                  <div className="space-y-3">
                    {data.bookings.map((b: any) => (
                      <div
                        key={b._id}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-stone-200 rounded-xl p-4"
                      >
                        <div>
                          <p className="font-bold text-stone-900">{b.title}</p>
                          <p className="text-sm text-stone-500 mt-0.5">
                            {new Date(b.date).toLocaleDateString("en-IN")} ·{" "}
                            {b.guests} guest(s) · ₹
                            {Number(b.amount).toLocaleString("en-IN")}
                          </p>
                          {b.notes && (
                            <p className="text-xs text-stone-400 mt-1">
                              {b.notes}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center gap-3">
                          <span
                            className={`text-xs font-bold px-2.5 py-1 rounded-full capitalize ${
                              b.status === "confirmed"
                                ? "bg-emerald-100 text-emerald-700"
                                : b.status === "cancelled"
                                  ? "bg-rose-100 text-rose-700"
                                  : "bg-amber-100 text-amber-700"
                            }`}
                          >
                            {b.status}
                          </span>
                          {b.status !== "cancelled" && (
                            <button
                              onClick={() => cancelBooking(b._id)}
                              className="text-xs font-bold text-rose-600 hover:text-rose-800 inline-flex items-center gap-1"
                            >
                              <X className="w-3.5 h-3.5" /> Cancel
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-stone-500">
                    You have no bookings yet.
                  </p>
                )}
              </div>
            )}

            {tab === "wishlist" && (
              <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm">
                <h2 className="font-black text-stone-900 mb-5">My Wishlist</h2>
                {data?.wishlist?.length ? (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {data.wishlist.map((w: any) => (
                      <div
                        key={w._id}
                        className="border border-stone-200 rounded-xl overflow-hidden"
                      >
                        {w.image && (
                          <img
                            src={w.image}
                            alt={w.name}
                            className="w-full h-32 object-cover"
                          />
                        )}
                        <div className="p-4 flex items-center justify-between gap-2">
                          <p className="font-bold text-sm text-stone-800 line-clamp-2">
                            {w.name}
                          </p>
                          <button
                            onClick={() => removeWishlist(w.itemId)}
                            title="Remove"
                            className="shrink-0 p-1.5 rounded-lg hover:bg-rose-50 text-rose-500"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-stone-500">
                    Your wishlist is empty.
                  </p>
                )}
              </div>
            )}

            {tab === "profile" && (
              <div className="grid lg:grid-cols-2 gap-6">
                <form
                  onSubmit={saveProfile}
                  className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-4"
                >
                  <h2 className="font-black text-stone-900">Profile Details</h2>
                  {profileMsg && (
                    <div
                      className={`text-sm rounded-xl px-4 py-2.5 ${
                        profileMsg.ok
                          ? "bg-emerald-50 text-emerald-800"
                          : "bg-rose-50 text-rose-800"
                      }`}
                    >
                      {profileMsg.text}
                    </div>
                  )}
                  <div>
                    <label className="block text-sm font-semibold text-stone-700 mb-1.5">
                      Username
                    </label>
                    <input
                      value={user.username}
                      disabled
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-100 text-stone-500 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-stone-700 mb-1.5">
                      Email
                    </label>
                    <input
                      value={user.email}
                      disabled
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-100 text-stone-500 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-stone-700 mb-1.5">
                      Full Name
                    </label>
                    <input
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-stone-700 mb-1.5">
                      Phone
                    </label>
                    <input
                      value={editPhone}
                      onChange={(e) => setEditPhone(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-stone-700 mb-1.5">
                      Bio
                    </label>
                    <textarea
                      value={editBio}
                      onChange={(e) => setEditBio(e.target.value)}
                      rows={3}
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 outline-none resize-none"
                    />
                  </div>
                  <button
                    disabled={savingProfile}
                    className="w-full bg-amber-500 hover:bg-amber-600 disabled:opacity-60 text-white font-bold py-3 rounded-xl transition-colors"
                  >
                    {savingProfile ? "Saving…" : "Save Changes"}
                  </button>
                </form>

                <form
                  onSubmit={changePassword}
                  className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm space-y-4 h-fit"
                >
                  <h2 className="font-black text-stone-900 flex items-center gap-2">
                    <KeyRound className="w-4 h-4 text-amber-600" /> Change
                    Password
                  </h2>
                  {pwMsg && (
                    <div
                      className={`text-sm rounded-xl px-4 py-2.5 ${
                        pwMsg.ok
                          ? "bg-emerald-50 text-emerald-800"
                          : "bg-rose-50 text-rose-800"
                      }`}
                    >
                      {pwMsg.text}
                    </div>
                  )}
                  <div>
                    <label className="block text-sm font-semibold text-stone-700 mb-1.5">
                      Current Password
                    </label>
                    <input
                      type="password"
                      value={currentPw}
                      onChange={(e) => setCurrentPw(e.target.value)}
                      required
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-stone-700 mb-1.5">
                      New Password
                    </label>
                    <input
                      type="password"
                      value={newPw}
                      onChange={(e) => setNewPw(e.target.value)}
                      required
                      placeholder="8+ characters with letters & numbers"
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 outline-none"
                    />
                  </div>
                  <button
                    disabled={savingPw}
                    className="w-full bg-stone-900 hover:bg-stone-800 disabled:opacity-60 text-white font-bold py-3 rounded-xl transition-colors"
                  >
                    {savingPw ? "Updating…" : "Update Password"}
                  </button>
                </form>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
