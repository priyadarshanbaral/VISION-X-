import { useState } from 'react';
import Image from '../components/Image';
import { Link } from '../components/Router';
import BookingPanel from '../components/BookingPanel';
import CheckoutModal from '../components/CheckoutModal';
import { 
  Sparkles, Heart, Map, Star, MapPin, Check, 
  Crown, ShieldCheck, Compass, ArrowRight 
} from 'lucide-react';
import { 
  ODISHA_RESORTS, 
  ODISHA_PACKAGES, 
  ODISHA_WEDDINGS, 
  LuxuryResort, 
  OdishaPackage, 
  WeddingPackage 
} from '../data/odishaData';

export default function LuxuryPage() {
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutItem, setCheckoutItem] = useState({ name: '', price: '' });

  const handleBook = (name: string, priceInr: number, priceUsd: number) => {
    const formattedPrice = currency === 'INR' 
      ? `₹${priceInr.toLocaleString('en-IN')}` 
      : `$${priceUsd.toLocaleString('en-US')}`;
    setCheckoutItem({ name, price: formattedPrice });
    setIsCheckoutOpen(true);
  };

  return (
    <main className="flex flex-col items-center w-full bg-stone-50">
      {/* Hero Section */}
      <section className="relative w-full h-[85vh] min-h-[680px] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1920&q=80"
          alt="Luxury Resorts Odisha"
          fill
          className="object-cover brightness-[0.38] scale-105"
          priority
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-stone-50" />
        
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center mt-[-60px]">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 text-amber-200 border border-amber-500/30 mb-6 backdrop-blur-md">
            <Crown className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-bold tracking-widest uppercase">Vision X • Royal Odisha & Luxury Escapes</span>
          </div>

          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-tight tracking-tight drop-shadow-2xl">
            Vision <span className="text-amber-400 font-serif">X</span> Luxury Odisha <br />
            <span className="text-amber-400 italic font-light drop-shadow-[0_0_20px_rgba(245,158,11,0.5)]">
              Beyond Ordinary
            </span>
          </h1>

          <p className="text-lg md:text-2xl text-stone-200 mb-8 max-w-3xl font-light drop-shadow-md">
            Royal suites in 200-year-old Victorian palaces, private ocean villas on Puri Golden Beach, Eco Retreat glamping, and serene lagoon retreats in Chilika.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button 
              onClick={() => handleBook('VIP All-Odisha Luxury Concierge Pass', 25000, 300)}
              className="px-8 py-3.5 rounded-full bg-gradient-to-b from-amber-400 to-amber-600 text-stone-950 font-black hover:from-amber-300 hover:to-amber-500 transition-all shadow-lg active:scale-95 cursor-pointer text-base"
            >
              Book Luxury Experience
            </button>
            <Link 
              href="/plan"
              className="px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold backdrop-blur-md transition-all border border-white/20 text-base"
            >
              AI Custom Itinerary &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Booking Panel Overlapping Hero */}
      <section className="w-full px-4 relative z-20 -mt-24 mb-20">
        <BookingPanel />
      </section>

      {/* Main Luxury Content Container */}
      <section className="w-full max-w-7xl mx-auto px-4 mb-24">
        {/* Currency Switcher */}
        <div className="flex justify-end mb-8">
          <div className="flex items-center bg-white border border-stone-200 rounded-2xl p-1.5 shadow-sm">
            <button
              onClick={() => setCurrency('INR')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                currency === 'INR' ? 'bg-amber-500 text-stone-950 shadow-sm' : 'text-stone-600'
              }`}
            >
              ₹ INR (India)
            </button>
            <button
              onClick={() => setCurrency('USD')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                currency === 'USD' ? 'bg-amber-500 text-stone-950 shadow-sm' : 'text-stone-600'
              }`}
            >
              $ USD (Global)
            </button>
          </div>
        </div>

        {/* 5-Star Luxury Resorts in Odisha */}
        <div className="mb-20">
          <div className="mb-8">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded-full mb-2">
              <Crown className="w-3.5 h-3.5" /> Iconic Odisha Hospitality
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-stone-900">
              Luxury Resorts & Heritage Palaces in Odisha
            </h2>
            <p className="text-stone-600 text-sm md:text-base">
              Handpicked properties where ancient Kalinga grandeur harmonizes with 5-star oceanfront and lakeside amenities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ODISHA_RESORTS.map((resort) => (
              <div 
                key={resort.id} 
                className="bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col group"
              >
                <div className="relative h-56 w-full overflow-hidden shrink-0 bg-stone-100">
                  <Image 
                    src={resort.image} 
                    alt={resort.name} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-700" 
                    referrerPolicy="no-referrer" 
                  />
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-lg flex items-center gap-1 text-xs font-bold text-stone-900 shadow">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" /> {resort.rating}
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow justify-between">
                  <div>
                    <div className="text-[11px] font-bold text-amber-700 uppercase tracking-wider mb-1 flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {resort.district}
                    </div>
                    <h3 className="font-serif font-bold text-stone-900 text-lg mb-1 group-hover:text-amber-800 transition-colors">
                      {resort.name}
                    </h3>
                    <p className="text-xs text-stone-500 mb-3">{resort.category}</p>
                    <p className="text-xs text-stone-600 leading-relaxed mb-4 line-clamp-3">
                      {resort.description}
                    </p>

                    <div className="space-y-1 mb-4 text-[11px] text-stone-600">
                      {resort.features.slice(0, 2).map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 text-stone-600">
                          <Check className="w-3 h-3 text-emerald-600 shrink-0" />
                          <span className="line-clamp-1">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                    <div>
                      <span className="text-xl font-black text-amber-800">
                        {currency === 'INR' ? `₹${resort.priceInr.toLocaleString('en-IN')}` : `$${resort.priceUsd}`}
                      </span>
                      <span className="text-[11px] text-stone-400 block">per night</span>
                    </div>
                    <button 
                      onClick={() => handleBook(resort.name, resort.priceInr, resort.priceUsd)}
                      className="bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-sm active:scale-95 cursor-pointer"
                    >
                      Book Suite
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Curated Odisha Holiday Packages */}
        <div className="mb-20">
          <div className="mb-8">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-stone-900 mb-2">
              Curated All-Inclusive Odisha Packages
            </h2>
            <p className="text-stone-600 text-sm md:text-base">
              Comprehensive private tours with luxury transport, dedicated historian guides, and all entrance tickets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ODISHA_PACKAGES.map((pkg) => (
              <div 
                key={pkg.id} 
                className="bg-white rounded-3xl overflow-hidden shadow-sm border border-stone-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col group"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <Image 
                    src={pkg.image} 
                    alt={pkg.title} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-700" 
                    referrerPolicy="no-referrer" 
                  />
                  <div className="absolute top-3 left-3 bg-amber-500 text-stone-950 text-[11px] font-black uppercase px-2.5 py-1 rounded-lg shadow">
                    {pkg.badge}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/75 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-md">
                    {pkg.duration}
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow justify-between">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-stone-900 mb-1 group-hover:text-amber-800 transition-colors">
                      {pkg.title}
                    </h3>
                    <p className="text-xs text-amber-700 font-semibold mb-2">{pkg.route}</p>
                    <p className="text-stone-600 text-xs leading-relaxed mb-4 line-clamp-2">{pkg.description}</p>
                    
                    <div className="space-y-1 mb-4 text-[11px] text-stone-500">
                      {pkg.highlights.slice(0, 2).map((hl, idx) => (
                        <div key={idx} className="flex items-center gap-1.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                          <span className="line-clamp-1">{hl}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                    <div>
                      <span className="text-xl font-black text-amber-800">
                        {currency === 'INR' ? `₹${pkg.priceInr.toLocaleString('en-IN')}` : `$${pkg.priceUsd}`}
                      </span>
                      <span className="text-[11px] text-stone-400 block">complete tour</span>
                    </div>
                    <button 
                      onClick={() => handleBook(pkg.title, pkg.priceInr, pkg.priceUsd)}
                      className="bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-sm active:scale-95 cursor-pointer"
                    >
                      Book Tour
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Royal & Coastal Destination Weddings in Odisha */}
        <div>
          <div className="mb-8">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-3 py-1 rounded-full mb-2">
              <Heart className="w-3.5 h-3.5 fill-rose-600 text-rose-600" /> Odisha Destination Weddings
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-stone-900">
              Celebrate Nuptials in Royal & Coastal Odisha
            </h2>
            <p className="text-stone-600 text-sm md:text-base">
              Say &quot;I do&quot; amid coastal ocean winds on Puri beach, inside a 200-year-old royal palace in Mayurbhanj, or overlooking Chilika lagoon.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {ODISHA_WEDDINGS.map((wed) => (
              <div 
                key={wed.id} 
                className="bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col group"
              >
                <div className="relative h-60 w-full overflow-hidden">
                  <Image 
                    src={wed.image} 
                    alt={wed.title} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-700" 
                    referrerPolicy="no-referrer" 
                  />
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-xl text-xs font-bold text-rose-700 shadow flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 fill-rose-600 text-rose-600" /> {wed.tag}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/75 backdrop-blur-md text-white text-xs px-2.5 py-0.5 rounded-md">
                    {wed.capacity}
                  </div>
                </div>

                <div className="p-6 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-stone-900 mb-1 group-hover:text-rose-700 transition-colors">
                      {wed.title}
                    </h3>
                    <div className="text-xs text-amber-700 font-semibold mb-3 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" /> {wed.venue}, {wed.location}
                    </div>
                    <p className="text-xs text-stone-600 leading-relaxed mb-4">{wed.description}</p>

                    <div className="space-y-1.5 mb-6 text-[11px] text-stone-600">
                      <div className="font-bold text-stone-800">Wedding Package Includes:</div>
                      {wed.inclusions.slice(0, 3).map((inc, idx) => (
                        <div key={idx} className="flex items-center gap-1.5">
                          <Check className="w-3 h-3 text-rose-600 shrink-0" />
                          <span className="line-clamp-1">{inc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                    <div>
                      <span className="text-xl font-black text-rose-700">
                        {currency === 'INR' ? `₹${wed.priceInr.toLocaleString('en-IN')}` : `$${wed.priceUsd.toLocaleString('en-US')}`}
                      </span>
                      <span className="text-[11px] text-stone-400 block">complete celebration</span>
                    </div>

                    <button 
                      onClick={() => handleBook(wed.title, wed.priceInr, wed.priceUsd)}
                      className="bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-sm active:scale-95 cursor-pointer"
                    >
                      Inquire & Reserve
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </section>

      <CheckoutModal 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)} 
        itemName={checkoutItem.name} 
        price={checkoutItem.price} 
      />
    </main>
  );
}
