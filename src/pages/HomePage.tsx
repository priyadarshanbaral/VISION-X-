import Image from '../components/Image';
import { Link } from '../components/Router';
import { 
  MapPin, Map, Compass, ShoppingBag, Sparkles, ArrowRight, 
  Plane, ShieldCheck, Sun, Utensils, Award, Heart, CheckCircle2, Navigation 
} from 'lucide-react';

export default function HomePage() {
  return (
    <main className="flex flex-col items-center w-full bg-stone-50">
      {/* Hero Section */}
      <section className="relative w-full h-[90vh] min-h-[720px] flex items-center justify-center overflow-hidden perspective-1000">
        <Image
          src="https://media.istockphoto.com/id/1444924249/photo/konark-sun-temple-at-sunrise-konark-temple-is-a-unesco-world-heritage-site-at-puri-odisha.jpg?s=612x612&w=0&k=20&c=5Gd3UDpZeYh8DejD4a4TTrpAZLoPw5SARAUFT7hfwRk="
          alt="Konark Sun Temple Odisha"
          fill
          className="object-cover brightness-[0.38] scale-105"
          priority
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-stone-50" />
        
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 text-amber-200 backdrop-blur-md border border-amber-500/40 mb-6 shadow-[0_8px_32px_rgba(245,158,11,0.25)]">
            <Sun className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-bold tracking-widest uppercase">Vision X • Odisha Smart Tourism AI</span>
          </div>

          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-tight tracking-tight drop-shadow-2xl">
            Vision <span className="text-amber-400 font-serif">X</span> Odisha. <br />
            <span className="text-amber-400 italic font-light drop-shadow-[0_0_35px_rgba(245,158,11,0.5)]">
              India&apos;s Best Kept Secret.
            </span>
          </h1>

          <p className="text-lg md:text-2xl text-stone-200 mb-10 max-w-3xl font-light drop-shadow-md leading-relaxed">
            Sacred Kalinga architecture, the divine mysteries of Puri Jagannath, 24 sundial wheels of Konark, Asia&apos;s largest lagoon at Chilika, and GI-certified master handicrafts — reimagined with Vision X AI.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/destinations" 
              className="px-8 py-4 rounded-full bg-white hover:bg-stone-100 text-stone-950 font-black transition-all shadow-[0_10px_30px_rgba(0,0,0,0.3)] text-base md:text-lg flex items-center gap-2 cursor-pointer group"
            >
              <MapPin className="w-5 h-5 text-amber-600 group-hover:scale-110 transition-transform" />
              Places to Visit & Live Map
            </Link>
            <Link 
              href="/plan" 
              className="px-8 py-4 rounded-full bg-gradient-to-b from-amber-400 to-amber-600 text-stone-950 font-black hover:from-amber-300 hover:to-amber-500 transition-all shadow-[0_10px_40px_rgba(245,158,11,0.4),inset_0_2px_4px_rgba(255,255,255,0.5)] border-b-4 border-amber-700 active:border-b-0 active:translate-y-1 text-base md:text-lg flex items-center gap-2 group cursor-pointer"
            >
              AI Travel Planner <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
            </Link>
            <Link 
              href="/heritage" 
              className="px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold backdrop-blur-md border border-white/25 transition-all text-base md:text-lg flex items-center gap-2"
            >
              <Compass className="w-5 h-5 text-amber-300" />
              Heritage Guide
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Odisha Snapshot Strip */}
      <section className="w-full max-w-7xl mx-auto px-4 relative z-20 -mt-16 mb-16">
        <div className="bg-stone-900 text-white rounded-3xl p-6 md:p-8 shadow-2xl border border-stone-800 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-4 border-r border-stone-800 last:border-none">
            <span className="block font-serif text-3xl md:text-4xl font-black text-amber-400">1250 CE</span>
            <span className="text-xs uppercase tracking-wider text-stone-400 font-medium">Konark Sun Temple</span>
          </div>
          <div className="p-4 border-r border-stone-800 last:border-none">
            <span className="block font-serif text-3xl md:text-4xl font-black text-amber-400">56 Bhog</span>
            <span className="text-xs uppercase tracking-wider text-stone-400 font-medium">Puri Mahaprasad</span>
          </div>
          <div className="p-4 border-r border-stone-800 last:border-none">
            <span className="block font-serif text-3xl md:text-4xl font-black text-amber-400">1,100 km²</span>
            <span className="text-xs uppercase tracking-wider text-stone-400 font-medium">Chilika Lagoon Biosphere</span>
          </div>
          <div className="p-4">
            <span className="block font-serif text-3xl md:text-4xl font-black text-amber-400">10+ GI</span>
            <span className="text-xs uppercase tracking-wider text-stone-400 font-medium">Protected Odia Crafts</span>
          </div>
        </div>
      </section>

      {/* Core Ecosystem Features */}
      <section className="w-full max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-amber-700 font-bold bg-amber-100 px-3 py-1 rounded-full mb-3">
            <Sparkles className="w-3.5 h-3.5" /> Comprehensive Smart Tourism Ecosystem
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-stone-900 mb-4">
            Everything Odisha, Authenticated
          </h2>
          <p className="text-stone-600 text-lg max-w-3xl mx-auto">
            From the sacred sanctum of Shree Jagannath Temple to Raghurajpur living master painters and luxury beach retreats on the Puri-Konark Marine Drive.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Feature 1: AI Planner */}
          <Link href="/plan" className="group bg-white rounded-3xl p-8 shadow-sm border border-stone-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between">
            <div>
              <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Map className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-stone-900 mb-3 group-hover:text-amber-700 transition-colors">
                AI Smart Itinerary
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed mb-4">
                Personalized routes across Bhubaneswar, Puri, Konark, Chilika, and Similipal with real travel times, temple darshan timings, crowd predictions, and live weather.
              </p>
            </div>
            <span className="text-sm font-bold text-amber-700 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Plan My Odisha Route &rarr;
            </span>
          </Link>

          {/* Feature 2: Heritage AI Guide */}
          <Link href="/heritage" className="group bg-white rounded-3xl p-8 shadow-sm border border-stone-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between">
            <div>
              <div className="w-16 h-16 rounded-2xl bg-stone-900 text-amber-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Compass className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-stone-900 mb-3 group-hover:text-amber-700 transition-colors">
                Odisha Heritage AI Guide
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed mb-4">
                Scan monuments to unlock 3D visual models, authentic historical timelines, astronomical sundial calculations, and spoken voice narration about the Kalinga Empire.
              </p>
            </div>
            <span className="text-sm font-bold text-amber-700 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Listen & Discover Monuments &rarr;
            </span>
          </Link>

          {/* Feature 3: Marketplace */}
          <Link href="/marketplace" className="group bg-white rounded-3xl p-8 shadow-sm border border-stone-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between">
            <div>
              <div className="w-16 h-16 rounded-2xl bg-orange-100 text-orange-700 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-stone-900 mb-3 group-hover:text-orange-700 transition-colors">
                Handicrafts & Workshops
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed mb-4">
                Direct procurement from Raghurajpur Pattachitra painters, Cuttack Tarakasi silversmiths, Pipili applique tailors, and Sambalpuri silk handloom weavers.
              </p>
            </div>
            <span className="text-sm font-bold text-orange-700 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Shop Authentic Odia Crafts &rarr;
            </span>
          </Link>
        </div>

        {/* Odisha Signature Cultural Highlights */}
        <div className="bg-gradient-to-br from-stone-900 to-stone-950 text-white rounded-3xl p-8 md:p-12 mb-16 shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="max-w-3xl mb-10">
            <span className="text-xs uppercase font-bold tracking-widest text-amber-400 mb-2 block">Cuisine & Traditions</span>
            <h3 className="font-serif text-3xl md:text-4xl font-bold mb-4">
              Taste The Divine Heritage of Odisha
            </h3>
            <p className="text-stone-300 text-base leading-relaxed">
              Odisha culinary traditions are deeply intertwined with temple rituals. Savor 500-year-old culinary lineages preserved to this day.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-stone-800/60 p-5 rounded-2xl border border-stone-700/60 backdrop-blur-sm">
              <div className="text-amber-400 font-bold text-lg mb-1">Puri Mahaprasad</div>
              <p className="text-xs text-stone-400 mb-2">56 Bhog cooked in 7 earthen pots stacked over wood fires in the temple kitchen.</p>
              <span className="text-xs font-semibold text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/40">Anandabazar Daily</span>
            </div>

            <div className="bg-stone-800/60 p-5 rounded-2xl border border-stone-700/60 backdrop-blur-sm">
              <div className="text-amber-400 font-bold text-lg mb-1">Chhena Poda</div>
              <p className="text-xs text-stone-400 mb-2">Odisha indigenous baked cottage cheese cake caramelized with sugar and cardamom.</p>
              <span className="text-xs font-semibold text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/40">Nayagarh Origin</span>
            </div>

            <div className="bg-stone-800/60 p-5 rounded-2xl border border-stone-700/60 backdrop-blur-sm">
              <div className="text-amber-400 font-bold text-lg mb-1">Cuttack Dahi Bara</div>
              <p className="text-xs text-stone-400 mb-2">Lentil fritters soaked in spiced curd water, served with hot aloo dum and sev.</p>
              <span className="text-xs font-semibold text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/40">Iconic Street Food</span>
            </div>

            <div className="bg-stone-800/60 p-5 rounded-2xl border border-stone-700/60 backdrop-blur-sm">
              <div className="text-amber-400 font-bold text-lg mb-1">Pahal Rasagola (GI)</div>
              <p className="text-xs text-stone-400 mb-2">Soft, melt-in-the-mouth cottage cheese balls steeped in warm cardamom syrup.</p>
              <span className="text-xs font-semibold text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/40">Odisha GI Certified</span>
            </div>
          </div>
        </div>

        {/* Luxury Retreats Showcase */}
        <div className="flex flex-col md:flex-row items-center justify-between p-8 md:p-12 rounded-3xl bg-amber-500/10 border border-amber-200">
          <div className="max-w-2xl mb-6 md:mb-0">
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-stone-900 mb-2">
              Stay in 18th-Century Palaces & Eco-Resorts
            </h3>
            <p className="text-stone-600 text-sm md:text-base">
              Explore Mayfair Waves on Puri Golden Beach, Swosti Chilika on the lagoon, and The Belgadia Palace in Mayurbhanj.
            </p>
          </div>
          <Link 
            href="/luxury" 
            className="px-8 py-3.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-sm shadow-md transition-all whitespace-nowrap"
          >
            Explore Luxury Stays & Transit &rarr;
          </Link>
        </div>
      </section>
    </main>
  );
}
