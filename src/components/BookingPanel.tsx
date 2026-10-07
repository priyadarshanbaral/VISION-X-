import { useState } from 'react';
import { 
  Plane, Train, Bus, Ship, PlaneTakeoff, Car, 
  MapPin, Calendar, Users, Search, Loader2, CheckCircle2, Ticket 
} from 'lucide-react';
import { ODISHA_TRANSIT_OPTIONS } from '../data/odishaData';
import CheckoutModal from './CheckoutModal';

const TABS = [
  { id: 'trains', label: 'Vande Bharat & Trains', icon: Train },
  { id: 'flights', label: 'BBI Flights', icon: Plane },
  { id: 'buses', label: 'Mo Bus & OSRTC', icon: Bus },
  { id: 'cruises', label: 'Chilika Cruises', icon: Ship },
  { id: 'cars', label: 'Marine Drive Cabs', icon: Car },
  { id: 'private-jets', label: 'Helicopter Charters', icon: PlaneTakeoff },
];

const getFieldConfig = (tabId: string) => {
  switch (tabId) {
    case 'trains':
      return { 
        fromLabel: 'From Station', fromDefault: 'Puri (PURI) / Bhubaneswar (BBI)', 
        toLabel: 'To Station', toDefault: 'Howrah (HWH) / Cuttack (CTC)', 
        dateLabel: 'Journey Date', passLabel: 'Coach Class', 
        passOptions: ['Executive Chair Car (EC)', 'AC Chair Car (CC)', 'First AC (1A)', 'AC 2-Tier (2A)'] 
      };
    case 'flights':
      return { 
        fromLabel: 'Departure City', fromDefault: 'New Delhi (DEL) / Mumbai (BOM)', 
        toLabel: 'Arrival Airport', toDefault: 'Bhubaneswar BBI (Biju Patnaik Int.)', 
        dateLabel: 'Departure Date', passLabel: 'Passengers', 
        passOptions: ['1 Adult', '2 Adults', 'Family (2+2)', 'Executive Class'] 
      };
    case 'buses':
      return { 
        fromLabel: 'Boarding Point', fromDefault: 'Master Canteen, Bhubaneswar', 
        toLabel: 'Destination', toDefault: 'Puri Bada Danda / Konark Stand', 
        dateLabel: 'Travel Date', passLabel: 'Coach Type', 
        passOptions: ['Mo Bus Electric AC Express', 'OSRTC Airavat Multi-Axle Volvo', 'Night Sleeper AC'] 
      };
    case 'cruises':
      return { 
        fromLabel: 'Jetty Point', fromDefault: 'Satapada Jetty (Chilika Lake)', 
        toLabel: 'Destination Islands', toDefault: 'Sea Mouth, Rajhans & Kalijai', 
        dateLabel: 'Cruise Date', passLabel: 'Vessel Type', 
        passOptions: ['Glass-Bottom Eco Catamaran', 'Private Motorized Boat', 'Luxury Wetland Houseboat'] 
      };
    case 'cars':
      return { 
        fromLabel: 'Pickup Location', fromDefault: 'Bhubaneswar Airport (BBI)', 
        toLabel: 'Sightseeing Circuit', toDefault: 'Puri - Konark Marine Drive Expressway', 
        dateLabel: 'Pickup Date', passLabel: 'Vehicle Fleet', 
        passOptions: ['Innova Hycross (6 Seater)', 'Luxury Executive Sedan', 'Heritage Force Urbania (12 Seater)'] 
      };
    case 'private-jets':
      return { 
        fromLabel: 'Helipad', fromDefault: 'Bhubaneswar BBI Helipad', 
        toLabel: 'Destination Helipad', toDefault: 'Puri Beachside / Similipal Baripada', 
        dateLabel: 'Charter Date', passLabel: 'Charter Aircraft', 
        passOptions: ['Bell 407 6-Seater Twin Engine', 'Eurocopter EC135 Executive', 'Augusta 109 Royal'] 
      };
    default:
      return { 
        fromLabel: 'From', fromDefault: 'Bhubaneswar', 
        toLabel: 'To', toDefault: 'Puri', 
        dateLabel: 'Date', passLabel: 'Option', 
        passOptions: ['Standard', 'Premium'] 
      };
  }
};

export default function BookingPanel() {
  const [activeTab, setActiveTab] = useState('trains');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any[] | null>(ODISHA_TRANSIT_OPTIONS.filter(t => t.mode === 'trains'));
  
  // Checkout modal
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutItem, setCheckoutItem] = useState({ name: '', price: '' });

  const config = getFieldConfig(activeTab);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    const filtered = ODISHA_TRANSIT_OPTIONS.filter(item => item.mode === tabId);
    setSearchResults(filtered.length > 0 ? filtered : [ODISHA_TRANSIT_OPTIONS[0]]);
  };

  const handleSearch = () => {
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      const filtered = ODISHA_TRANSIT_OPTIONS.filter(item => item.mode === activeTab);
      setSearchResults(filtered.length > 0 ? filtered : ODISHA_TRANSIT_OPTIONS.slice(0, 2));
    }, 600);
  };

  const handleBook = (title: string, priceInr: number) => {
    setCheckoutItem({ name: title, price: `₹${priceInr.toLocaleString('en-IN')}` });
    setIsCheckoutOpen(true);
  };

  return (
    <div className="w-full max-w-6xl mx-auto bg-white rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.1),inset_0_2px_4px_rgba(255,255,255,0.8)] overflow-hidden border border-stone-200/50">
      {/* Tabs */}
      <div className="flex overflow-x-auto hide-scrollbar bg-stone-900 border-b border-stone-800">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`flex items-center gap-2 px-6 py-5 text-sm font-bold uppercase tracking-wider whitespace-nowrap transition-all relative cursor-pointer ${
              activeTab === tab.id
                ? 'bg-white text-amber-700 shadow-lg z-10'
                : 'text-stone-400 hover:text-white hover:bg-stone-800'
            }`}
          >
            <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-amber-600' : ''}`} />
            <span>{tab.label}</span>
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-amber-700" />
            )}
          </button>
        ))}
      </div>

      {/* Form */}
      <div className="p-6 md:p-8 bg-white relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="lg:col-span-1 group">
            <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-2">{config.fromLabel}</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-600" />
              <input 
                type="text" 
                defaultValue={config.fromDefault}
                className="w-full pl-9 pr-3 py-3 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none text-xs font-medium text-stone-800 shadow-inner" 
              />
            </div>
          </div>

          <div className="lg:col-span-1 group">
            <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-2">{config.toLabel}</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-600" />
              <input 
                type="text" 
                defaultValue={config.toDefault}
                className="w-full pl-9 pr-3 py-3 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none text-xs font-medium text-stone-800 shadow-inner" 
              />
            </div>
          </div>

          <div className="lg:col-span-1 group">
            <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-2">{config.dateLabel}</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input 
                type="date" 
                defaultValue={new Date().toISOString().split('T')[0]}
                className="w-full pl-9 pr-3 py-3 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none text-xs font-medium text-stone-700 shadow-inner" 
              />
            </div>
          </div>

          <div className="lg:col-span-1 group">
            <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-2">{config.passLabel}</label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <select className="w-full pl-9 pr-3 py-3 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none appearance-none text-xs font-medium text-stone-700 shadow-inner">
                {config.passOptions.map((opt, idx) => (
                  <option key={idx}>{opt}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="lg:col-span-1 flex items-end">
            <button 
              onClick={handleSearch} 
              disabled={isSearching} 
              className="w-full py-3 rounded-xl bg-gradient-to-b from-amber-500 to-amber-600 text-stone-950 font-bold hover:from-amber-400 hover:to-amber-500 transition-all flex items-center justify-center gap-2 h-[46px] shadow-md border-b-2 border-amber-700 active:translate-y-0.5 cursor-pointer"
            >
              {isSearching ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Searching...</span>
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  <span>Find Odisha Transit</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Live Search Results */}
        {searchResults && (
          <div className="mt-6 pt-6 border-t border-stone-100 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Verified Odisha Transit Schedules & Direct Booking
              </h4>
              <span className="text-xs text-stone-500 font-medium">Official Odisha Tourism & Indian Railways Route</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {searchResults.map((item) => (
                <div 
                  key={item.id} 
                  className="p-5 rounded-2xl bg-gradient-to-br from-stone-50 to-amber-50/40 border border-amber-200/70 flex flex-col justify-between hover:shadow-md transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full border border-amber-200">
                        {item.class}
                      </span>
                      <span className="text-xs font-semibold text-stone-500">{item.duration}</span>
                    </div>
                    <h5 className="font-bold text-stone-900 text-base mb-1">{item.name}</h5>
                    <p className="text-xs text-stone-600 mb-1">
                      <span className="font-semibold text-stone-800">Route:</span> {item.from} &rarr; {item.to}
                    </p>
                    <p className="text-xs text-stone-500">
                      <span className="font-semibold text-stone-700">Schedule:</span> Departs {item.departure} • {item.frequency}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-stone-200/60">
                    <div>
                      <span className="text-xl font-black text-amber-700">₹{item.priceInr.toLocaleString('en-IN')}</span>
                      <span className="text-xs text-stone-500 ml-1.5 font-medium">(~${item.priceUsd})</span>
                    </div>
                    <button 
                      onClick={() => handleBook(item.name, item.priceInr)}
                      className="bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-sm flex items-center gap-1.5 active:scale-95 cursor-pointer"
                    >
                      <Ticket className="w-3.5 h-3.5 text-amber-400" />
                      Instant Ticket Booking
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <CheckoutModal 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)} 
        itemName={checkoutItem.name} 
        price={checkoutItem.price} 
        bookingType="transit"
      />
    </div>
  );
}
