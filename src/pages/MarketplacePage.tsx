import { useEffect, useState } from 'react';
import Image from '../components/Image';
import { 
  ShoppingBag, Star, ShieldCheck, MapPin, Calendar, 
  Sparkles, Award, Clock, DollarSign 
} from 'lucide-react';
import CheckoutModal from '../components/CheckoutModal';
import { db } from '../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { ODISHA_HANDICRAFTS, ODISHA_WORKSHOPS, HandicraftItem, WorkshopItem } from '../data/odishaData';

export default function MarketplacePage() {
  const [handicrafts, setHandicrafts] = useState<HandicraftItem[]>(ODISHA_HANDICRAFTS);
  const [workshops, setWorkshops] = useState<WorkshopItem[]>(ODISHA_WORKSHOPS);
  const [loading, setLoading] = useState(false);
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutItem, setCheckoutItem] = useState({ name: '', price: '' });

  useEffect(() => {
    async function fetchData() {
      try {
        const craftsSnap = await getDocs(collection(db, 'handicrafts'));
        const workshopsSnap = await getDocs(collection(db, 'workshops'));

        const craftsData = craftsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })) as any;
        const workshopsData = workshopsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })) as any;

        if (craftsData.length > 0) {
          setHandicrafts(craftsData);
        }
        if (workshopsData.length > 0) {
          setWorkshops(workshopsData);
        }
      } catch (err) {
        console.warn('Firestore marketplace fallback to curated Odisha data:', err);
      }
    }
    fetchData();
  }, []);

  const handleBuy = (item: HandicraftItem | { name: string; priceInr: number; priceUsd: number }) => {
    const formattedPrice = currency === 'INR' 
      ? `₹${item.priceInr.toLocaleString('en-IN')}` 
      : `$${item.priceUsd}`;
    setCheckoutItem({ name: item.name, price: formattedPrice });
    setIsCheckoutOpen(true);
  };

  const handleBookWorkshop = (ws: WorkshopItem) => {
    const formattedPrice = currency === 'INR' 
      ? `₹${ws.priceInr.toLocaleString('en-IN')}` 
      : `$${ws.priceUsd}`;
    setCheckoutItem({ name: ws.title, price: formattedPrice });
    setIsCheckoutOpen(true);
  };

  return (
    <div className="min-h-screen bg-stone-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Banner */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-100 to-amber-200 text-amber-900 text-xs font-bold uppercase tracking-wider mb-4 border border-amber-300/60 shadow-sm">
              <ShieldCheck className="w-4 h-4 text-amber-800" />
              <span>Vision X • 100% Certified Odisha GI Handicrafts</span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-black text-stone-900 mb-3 tracking-tight">
              Vision <span className="text-amber-600 font-serif">X</span> Artisan Bazaar
            </h1>
            <p className="text-stone-600 text-base md:text-lg">
              Direct fair-trade procurement from Raghurajpur master Pattachitra Chitrakaras, Cuttack Tarakasi silversmiths, Pipili applique tailors, and Sambalpuri Ikat weavers.
            </p>
          </div>

          {/* Currency Switcher */}
          <div className="flex items-center bg-white border border-stone-200 rounded-2xl p-1.5 shadow-sm">
            <button
              onClick={() => setCurrency('INR')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                currency === 'INR' ? 'bg-amber-500 text-stone-950 shadow-sm' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              ₹ INR (India)
            </button>
            <button
              onClick={() => setCurrency('USD')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                currency === 'USD' ? 'bg-amber-500 text-stone-950 shadow-sm' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              $ USD (Global)
            </button>
          </div>
        </div>

        {/* Handicrafts Grid */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-stone-900 flex items-center gap-2.5">
                <Award className="w-6 h-6 text-amber-600" />
                GI-Tagged & Masterpieces Catalog
              </h2>
              <p className="text-stone-500 text-sm">Individually authenticated works of art with artisan provenance certificates</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {handicrafts.map((item) => (
              <div 
                key={item.id} 
                className="bg-white rounded-3xl overflow-hidden shadow-sm border border-stone-200/80 hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col group"
              >
                <div className="relative h-64 w-full overflow-hidden bg-stone-100">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  {item.giTagged && (
                    <div className="absolute top-4 left-4 bg-amber-500 text-stone-950 text-[11px] font-black uppercase px-2.5 py-1 rounded-lg shadow-md border border-amber-300">
                      GI Tag Certified
                    </div>
                  )}

                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-xl flex items-center gap-1 text-xs font-bold text-stone-900 shadow-md">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    {item.rating} ({item.reviewCount})
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-1 text-xs font-bold text-amber-700 uppercase tracking-wider mb-2">
                    <MapPin className="w-3.5 h-3.5" /> {item.village}, {item.district}
                  </div>
                  
                  <h3 className="font-serif text-xl font-bold text-stone-900 mb-1 group-hover:text-amber-800 transition-colors">
                    {item.name}
                  </h3>
                  <div className="text-xs font-medium text-amber-800/80 mb-2">{item.odiaName}</div>

                  <p className="text-xs text-stone-500 mb-3">
                    Crafted by <span className="font-semibold text-stone-800">{item.artisanName}</span>
                  </p>

                  <p className="text-stone-600 text-xs leading-relaxed mb-4 flex-grow line-clamp-3">
                    {item.description}
                  </p>

                  <div className="text-[11px] text-stone-500 bg-stone-50 p-2.5 rounded-xl border border-stone-200/60 mb-4 flex items-center justify-between">
                    <span><span className="font-semibold text-stone-700">Creation Time:</span> {item.craftTime}</span>
                    <span className="text-emerald-700 font-semibold">100% Eco-Friendly</span>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-stone-100">
                    <div>
                      <div className="text-2xl font-black text-stone-900">
                        {currency === 'INR' ? `₹${item.priceInr.toLocaleString('en-IN')}` : `$${item.priceUsd}`}
                      </div>
                      <div className="text-[11px] text-stone-400 font-medium">Free domestic shipping</div>
                    </div>

                    <button 
                      onClick={() => handleBuy(item)} 
                      className="bg-stone-900 hover:bg-stone-800 text-white px-5 py-2.5 rounded-xl font-bold text-xs transition-all shadow-md flex items-center gap-1.5 active:scale-95 cursor-pointer"
                    >
                      <ShoppingBag className="w-4 h-4 text-amber-400" />
                      Acquire Artwork
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Master Artisan Workshops Section */}
        <div className="mb-12">
          <div className="mb-8">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-stone-900 mb-2">
              Book Hands-On Artisan Immersion Workshops
            </h2>
            <p className="text-stone-600 text-sm">
              Spend a morning with National Awardee Chitrakaras and master silversmiths learning ancient Kalinga techniques.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {workshops.map((ws) => (
              <div 
                key={ws.id} 
                className="bg-white rounded-3xl overflow-hidden shadow-sm border border-stone-200 flex flex-col hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 group"
              >
                <div className="relative w-full h-52 overflow-hidden">
                  <Image 
                    src={ws.image} 
                    alt={ws.title} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-105" 
                    referrerPolicy="no-referrer" 
                  />
                  <div className="absolute top-4 left-4 bg-black/75 backdrop-blur-md px-3 py-1 rounded-xl text-xs font-semibold text-white">
                    Max {ws.maxParticipants} Participants
                  </div>
                </div>

                <div className="p-6 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-stone-900 mb-1 group-hover:text-amber-800 transition-colors">
                      {ws.title}
                    </h3>
                    <p className="text-xs font-semibold text-amber-700 mb-3">Taught by {ws.masterArtisan}</p>
                    
                    <p className="text-stone-600 text-xs leading-relaxed mb-4">
                      {ws.description}
                    </p>

                    <div className="flex items-center gap-3 mb-4 text-xs font-medium text-stone-600">
                      <span className="flex items-center gap-1 bg-stone-100 px-2.5 py-1 rounded-lg">
                        <Clock className="w-3.5 h-3.5 text-amber-600" /> {ws.duration}
                      </span>
                      <span className="flex items-center gap-1 bg-stone-100 px-2.5 py-1 rounded-lg">
                        <MapPin className="w-3.5 h-3.5 text-amber-600" /> {ws.location.split(',')[0]}
                      </span>
                    </div>

                    <div className="space-y-1.5 mb-6 text-[11px] text-stone-600">
                      <div className="font-semibold text-stone-800 mb-1">Includes:</div>
                      {ws.includes.slice(0, 3).map((inc, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 text-stone-600">
                          <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                          <span>{inc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                    <div>
                      <span className="text-xl font-black text-amber-800">
                        {currency === 'INR' ? `₹${ws.priceInr.toLocaleString('en-IN')}` : `$${ws.priceUsd}`}
                      </span>
                      <span className="text-xs text-stone-500 block">per person</span>
                    </div>
                    
                    <button 
                      onClick={() => handleBookWorkshop(ws)} 
                      className="bg-gradient-to-b from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 font-bold px-4 py-2.5 rounded-xl text-xs transition-all shadow-sm active:scale-95 cursor-pointer"
                    >
                      Book Workshop Slot
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <CheckoutModal 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)} 
        itemName={checkoutItem.name} 
        price={checkoutItem.price} 
      />
    </div>
  );
}
