import { useEffect, useState } from 'react';
import { Link } from '../components/Router';
import { 
  Map, ShoppingBag, Settings, LogOut, Heart, Sparkles, 
  User, LogIn, UserCheck, Calendar, Ticket, Compass 
} from 'lucide-react';
import { useAuth } from '../components/FirebaseProvider';
import { db } from '../lib/firebase';
import Image from '../components/Image';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';

interface SavedTrip {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  status: string;
}

export default function DashboardPage() {
  const { user, login, loginAsGuest, logout, isAuthReady } = useAuth();
  const [savedTrips, setSavedTrips] = useState<SavedTrip[]>([]);
  const [loadingTrips, setLoadingTrips] = useState(true);

  useEffect(() => {
    async function fetchTrips() {
      if (!user) {
        setLoadingTrips(false);
        return;
      }
      
      try {
        const q = query(
          collection(db, 'itineraries'),
          where('userId', '==', user.uid),
          orderBy('createdAt', 'desc')
        );
        const querySnapshot = await getDocs(q);
        const trips: SavedTrip[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          
          let status = 'Upcoming';
          if (data.startDate) {
            const start = new Date(data.startDate);
            const now = new Date();
            if (start > now) status = 'Upcoming';
            else status = 'Past';
          }

          trips.push({
            id: doc.id,
            title: data.title || 'Odisha Heritage Tour',
            startDate: data.startDate || '2026-10-15',
            endDate: data.endDate || '2026-10-18',
            status: status
          });
        });
        setSavedTrips(trips);
      } catch (err) {
        console.warn('Trips fetch error, using sample Odisha trip:', err);
        setSavedTrips([
          {
            id: 'sample-odisha-1',
            title: 'Golden Triangle: Bhubaneswar • Konark • Puri',
            startDate: '2026-10-15',
            endDate: '2026-10-18',
            status: 'Upcoming'
          },
          {
            id: 'sample-odisha-2',
            title: 'Chilika Lake & Satapada Dolphin Eco-Safari',
            startDate: '2026-11-05',
            endDate: '2026-11-07',
            status: 'Upcoming'
          }
        ]);
      } finally {
        setLoadingTrips(false);
      }
    }

    fetchTrips();
  }, [user]);

  if (!isAuthReady) {
    return (
      <div className="min-h-screen bg-stone-50 py-12 px-4 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-xs text-stone-500 font-medium">Loading Traveler Dashboard...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-stone-50 py-12 px-4 flex items-center justify-center">
        <div className="bg-white p-10 rounded-3xl shadow-xl border border-stone-200/80 text-center max-w-md w-full">
          <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Compass className="w-10 h-10 text-amber-700" />
          </div>
          <h2 className="font-serif text-3xl font-bold text-stone-900 mb-3">Odisha Traveler Portal</h2>
          <p className="text-stone-600 mb-8 text-sm leading-relaxed">
            Please log in to view your saved temple itineraries, verified craft orders, transit tickets, and personalized AI recommendations.
          </p>
          <div className="space-y-3">
            <button 
              onClick={login} 
              className="w-full bg-gradient-to-b from-amber-500 to-amber-600 text-stone-950 font-black py-4 rounded-xl shadow-md border-b-4 border-amber-700 active:translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <LogIn className="w-5 h-5" /> Log In with Google
            </button>
            <button 
              onClick={loginAsGuest} 
              className="w-full bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 text-sm cursor-pointer"
            >
              <UserCheck className="w-4 h-4 text-stone-500" /> Continue as Guest Traveler
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6 bg-white p-8 rounded-3xl border border-stone-200 shadow-sm">
          <div className="flex items-center gap-6">
            <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-amber-200 to-amber-400 border-4 border-white shadow-md flex items-center justify-center text-amber-900 text-2xl font-black overflow-hidden">
              {user.photoURL ? (
                <Image src={user.photoURL} alt={user.displayName || 'User'} fill className="object-cover" referrerPolicy="no-referrer" />
              ) : (
                <span>{user.displayName?.charAt(0) || user.email?.charAt(0)?.toUpperCase() || 'O'}</span>
              )}
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-900 text-[11px] font-bold uppercase tracking-wider mb-1">
                Vision X Explorer • Odisha
              </div>
              <h1 className="font-serif text-3xl font-bold text-stone-900">{user.displayName || 'Odisha Heritage Traveler'}</h1>
              <p className="text-stone-500 text-sm">{user.email || 'traveler@smarttour.local'}</p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <button 
              onClick={logout} 
              title="Logout"
              className="px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-rose-50 text-stone-700 hover:text-rose-600 transition-all text-xs font-bold flex items-center gap-2 cursor-pointer border border-stone-200"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Trips & Purchases */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Saved Trips */}
            <div className="bg-white rounded-3xl p-8 border border-stone-200 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-serif text-2xl font-bold text-stone-900 flex items-center gap-2.5">
                  <div className="p-2 bg-amber-100 rounded-xl text-amber-700">
                    <Map className="w-5 h-5" />
                  </div>
                  Saved Odisha Itineraries
                </h2>
                <Link href="/plan" className="text-xs font-bold text-amber-700 hover:underline">
                  + Create New Route
                </Link>
              </div>
              
              <div className="space-y-4">
                {loadingTrips ? (
                  <div className="space-y-3">
                    <div className="h-16 bg-stone-100 rounded-2xl animate-pulse"></div>
                    <div className="h-16 bg-stone-100 rounded-2xl animate-pulse"></div>
                  </div>
                ) : savedTrips.length > 0 ? (
                  savedTrips.map((trip) => (
                    <div 
                      key={trip.id} 
                      className="p-5 rounded-2xl border border-stone-200 bg-stone-50 hover:bg-white hover:shadow-md transition-all flex items-center justify-between group"
                    >
                      <div>
                        <h4 className="font-bold text-stone-900 text-base group-hover:text-amber-800 transition-colors">
                          {trip.title}
                        </h4>
                        <div className="flex items-center gap-2 text-xs text-stone-500 mt-1 font-medium">
                          <Calendar className="w-3.5 h-3.5 text-amber-600" />
                          <span>{trip.startDate} &rarr; {trip.endDate}</span>
                        </div>
                      </div>
                      <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                        {trip.status}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-stone-500 text-sm">
                    No itineraries saved yet. <Link href="/plan" className="text-amber-700 font-bold underline">Generate your first Odisha plan</Link>.
                  </div>
                )}
              </div>
            </div>

            {/* Bookings & Artisan Orders */}
            <div className="bg-white rounded-3xl p-8 border border-stone-200 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-serif text-2xl font-bold text-stone-900 flex items-center gap-2.5">
                  <div className="p-2 bg-amber-100 rounded-xl text-amber-700">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  Verified Bookings & Artisan Orders
                </h2>
              </div>
              
              <div className="space-y-3">
                {[
                  { item: 'Raghurajpur Pattachitra "Tree of Life"', date: 'Oct 01, 2026', price: '₹8,500', status: 'Handcrafted & Dispatched' },
                  { item: 'Puri - Howrah Vande Bharat Express (EC)', date: 'Oct 02, 2026', price: '₹1,425', status: 'Confirmed Seat' },
                  { item: 'Master Pattachitra Painting Workshop (Guru Rabindra)', date: 'Oct 03, 2026', price: '₹2,200', status: 'Confirmed Slot' },
                  { item: 'Chilika Eco-Catamaran Dolphin Cruise Ticket', date: 'Oct 04, 2026', price: '₹1,850', status: 'Confirmed' }
                ].map((order, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 rounded-2xl border border-stone-100 bg-stone-50">
                    <div>
                      <h4 className="font-bold text-stone-900 text-sm">{order.item}</h4>
                      <p className="text-xs text-stone-500">{order.date}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-black text-stone-900 text-sm">{order.price}</div>
                      <div className="text-[11px] text-emerald-700 font-semibold">{order.status}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: AI Recommendations & Wishlist */}
          <div className="lg:col-span-1 space-y-8">
            
            {/* AI Odisha Suggestions */}
            <div className="bg-gradient-to-br from-stone-900 to-stone-950 rounded-3xl p-8 text-white shadow-xl">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <h3 className="font-serif text-xl font-bold">AI Odisha Insights</h3>
              </div>
              <p className="text-stone-400 text-xs mb-6 leading-relaxed">
                Tailored according to your exploration of Kalinga temple architecture and coastal marine sanctuaries.
              </p>
              
              <div className="space-y-4">
                <div className="bg-stone-800/70 p-4 rounded-2xl border border-stone-700/60">
                  <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider mb-1">
                    Special Event Alert
                  </div>
                  <h4 className="font-bold text-white text-sm mb-1">Konark Dance Festival</h4>
                  <p className="text-xs text-stone-400">
                    Held annually against the floodlit Konark Sun Temple. Book early to secure oceanfront resorts.
                  </p>
                </div>

                <div className="bg-stone-800/70 p-4 rounded-2xl border border-stone-700/60">
                  <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider mb-1">
                    Hidden Gem
                  </div>
                  <h4 className="font-bold text-white text-sm mb-1">Mangalajodi Bird Sanctuary</h4>
                  <p className="text-xs text-stone-400">
                    Over 160 species of migratory birds from Siberia. Silence is maintained by former poachers who are now eco-guides.
                  </p>
                </div>
              </div>
            </div>

            {/* Wishlist */}
            <div className="bg-white rounded-3xl p-8 border border-stone-200 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
                <h3 className="font-serif text-xl font-bold text-stone-900">Saved Wishlist</h3>
              </div>
              <p className="text-xs text-stone-500 mb-6">Saved master crafts and luxury stays in Odisha</p>

              <div className="space-y-3">
                <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-100 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-stone-900">Cuttack Silver Tarakasi Sun Wheel</div>
                    <div className="text-[11px] text-amber-800 font-semibold">₹12,500 (~$150)</div>
                  </div>
                  <Link href="/marketplace" className="text-xs font-bold text-stone-900 hover:text-amber-700">
                    View &rarr;
                  </Link>
                </div>

                <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-100 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-stone-900">The Belgadia Palace Suite Stay</div>
                    <div className="text-[11px] text-amber-800 font-semibold">₹18,000 / night</div>
                  </div>
                  <Link href="/luxury" className="text-xs font-bold text-stone-900 hover:text-amber-700">
                    View &rarr;
                  </Link>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
