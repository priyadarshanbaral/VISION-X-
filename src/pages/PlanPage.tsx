import { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { 
  MapPin, Loader2, Navigation, Clock, Map, Utensils, 
  ShoppingBag, Train, Plane, Save, CheckCircle2, CloudSun, LogIn, Sparkles, UserCheck, Compass,
  Waves, Bird, Hotel, ExternalLink, Leaf, ShieldCheck
} from 'lucide-react';
import Image from '../components/Image';
import CheckoutModal from '../components/CheckoutModal';
import { useAuth } from '../components/AuthProvider';
import { Link } from '../components/Router';
import { ODISHA_ALL_DESTINATIONS } from '../data/odishaDestinations';
import { ODISHA_CUISINE, ODISHA_RESORTS } from '../data/odishaData';
import { createChilikaItinerary } from '../data/chilikaPlanner';
import { createDestinationItinerary } from '../data/destinationPlanner';

const ODISHA_INTERESTS = [
  'Ancient Temples',
  'Odia Cuisine & Mahaprasad',
  'Pattachitra & Handloom Crafts',
  'Chilika Wildlife & Nature',
  'Beaches & Coastal Drives',
  'Royal Palaces'
];

const TRAVEL_STYLES = ['Relaxed', 'Moderate', 'Intensive Heritage'];

interface Activity {
  time: string;
  title: string;
  description: string;
  location: string;
  type: 'attraction' | 'food' | 'craft' | 'transport';
  transportBookingAvailable?: boolean;
}

interface ItineraryDay {
  date: string;
  dayTheme: string;
  weather: string;
  activities: Activity[];
}

export default function PlanPage() {
  const { user, isAuthReady, api } = useAuth();
  const [destination, setDestination] = useState(ODISHA_ALL_DESTINATIONS[0]?.id ?? '');
  const [dateFrom, setDateFrom] = useState(() => new Date().toISOString().split('T')[0]);
  const [dateTo, setDateTo] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 3);
    return d.toISOString().split('T')[0];
  });
  const [budgetInr, setBudgetInr] = useState(25000);
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');
  const [selectedInterests, setSelectedInterests] = useState<string[]>(['Ancient Temples', 'Odia Cuisine & Mahaprasad']);
  const [travelStyle, setTravelStyle] = useState('Moderate');
  const [travelMode, setTravelMode] = useState<'own' | 'app'>('app');

  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState<ItineraryDay[] | null>(null);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);
  const selectedDestination = ODISHA_ALL_DESTINATIONS.find(item => item.id === destination);
  const destinationTitle = selectedDestination?.name ?? destination;
  const isChilika = selectedDestination?.id === 'chilika-lake-satapada';
  const destinationHotels = selectedDestination?.nearbyHotels ?? [];
  const chilikaDestination = ODISHA_ALL_DESTINATIONS.find(item => item.id === 'chilika-lake-satapada');
  const chilikaStays = [
    ...(chilikaDestination?.nearbyHotels ?? []).map(hotel => ({
      name: hotel.name,
      area: 'Satapada',
      category: hotel.category,
      price: hotel.pricePerNightInr,
      rating: hotel.rating,
      highlights: hotel.highlights
    })),
    ...ODISHA_RESORTS.filter(resort => resort.id === 'swosti-chilika-resort').map(resort => ({
      name: resort.name,
      area: resort.location,
      category: resort.category,
      price: resort.priceInr,
      rating: resort.rating,
      highlights: resort.features
    }))
  ];
  const chilikaSeafood = ODISHA_CUISINE.filter(dish => dish.origin.toLowerCase().includes('chilika'));
  const destinationDishes = selectedDestination
    ? ODISHA_CUISINE.filter(dish =>
      `${dish.origin} ${dish.mustTrySpot}`.toLowerCase().includes(selectedDestination.district.toLowerCase())
      || selectedDestination.name.toLowerCase().includes(dish.id.split('-')[0])
    )
    : [];
  const recommendedDishes = destinationDishes.length > 0
    ? destinationDishes
    : ODISHA_CUISINE.slice(0, 2);

  // Checkout Modal State
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutItem, setCheckoutItem] = useState({ name: '', price: '' });

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev =>
      prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]
    );
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination || !dateFrom || !dateTo) return;

    setLoading(true);
    setError('');
    setItinerary(null);
    setSaved(false);

    try {
      // First try the backend /api/plan
      let generatedData: ItineraryDay[] | null = null;

      try {
        const res = await fetch('/api/plan', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            destination,
            destinationName: destinationTitle,
            dateFrom,
            dateTo,
            budget: budgetInr,
            interests: selectedInterests,
            travelStyle,
            travelMode,
          }),
        });

        if (res.ok) {
          const resJson = await res.json();
          if (Array.isArray(resJson.itinerary)) {
            generatedData = resJson.itinerary;
          }
        }
      } catch (backendErr) {
        console.warn('Backend API plan attempt failed, using fallback plan:', backendErr);
      }

      if (!generatedData && isChilika) {
        generatedData = createChilikaItinerary(dateFrom, dateTo);
      }
      if (!generatedData) {
        generatedData = createDestinationItinerary(destination, dateFrom, dateTo, travelMode);
      }

      // If backend didn't return data, try client direct GenAI if key available
      if (!generatedData) {
        const apiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY || (window as any).__GEMINI_API_KEY__;
        if (apiKey) {
          const ai = new GoogleGenAI({ apiKey });
          const prompt = `You are an expert Odisha Tourism AI Planner.
Generate a detailed travel itinerary for ${destinationTitle}, Odisha, India from ${dateFrom} to ${dateTo}.
Budget: ₹${budgetInr}.
User interests: ${selectedInterests.join(', ') || 'Temples and crafts'}.
Travel style: ${travelStyle}.
Travel mode: ${travelMode === 'own' ? 'Traveling with own personal vehicle. Do not suggest booking transit.' : 'App transport: suggest Vande Bharat Express, Mo Bus AC, or Marine Drive cabs.'}

STRICT RULE: All locations must be in Odisha, India. Include authentic Odia cuisine stops (Abhada, Chhena Poda, Dahi Bara) and artisan stops (Raghurajpur, Pipili, Cuttack Tarakasi).
Provide realistic coastal weather.`;

          const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
              responseMimeType: 'application/json',
              responseSchema: {
                type: 'ARRAY' as any,
                description: 'An array of daily itineraries in Odisha',
                items: {
                  type: 'OBJECT' as any,
                  properties: {
                    date: { type: 'STRING' as any, description: "Date (e.g., 'Oct 15, 2026')" },
                    dayTheme: { type: 'STRING' as any, description: 'Theme of the day' },
                    weather: { type: 'STRING' as any, description: "Simulated weather forecast (e.g., 'Sunny Coastal Breeze, 27°C')" },
                    activities: {
                      type: 'ARRAY' as any,
                      items: {
                        type: 'OBJECT' as any,
                        properties: {
                          time: { type: 'STRING' as any, description: "Time of day (e.g., '08:30 AM')" },
                          title: { type: 'STRING' as any, description: 'Activity title' },
                          description: { type: 'STRING' as any, description: 'Description with tips and crowd level' },
                          location: { type: 'STRING' as any, description: 'Location in Odisha' },
                          type: { type: 'STRING' as any, description: "Must be one of: 'attraction', 'food', 'craft', 'transport'" },
                          transportBookingAvailable: { type: 'BOOLEAN' as any, description: 'True if bookable via app' }
                        },
                        required: ['time', 'title', 'description', 'location', 'type']
                      }
                    }
                  },
                  required: ['date', 'dayTheme', 'weather', 'activities']
                }
              }
            }
          });

          if (response.text) {
            generatedData = JSON.parse(response.text);
          }
        }
      }

      // If still not generated, use high-fidelity curated Odisha Golden Triangle itinerary
      if (!generatedData) {
        generatedData = [
          {
            date: dateFrom,
            dayTheme: 'Sacred Temples & Ekamra Kshetra Heritage (Bhubaneswar to Puri)',
            weather: 'Sunny & Pleasant, 28°C',
            activities: [
              {
                time: '08:00 AM',
                title: 'Morning Darshan at 11th-century Lingaraj Temple',
                description: 'Experience the 180-foot Kalinga spire honoring Harihara. Stroll around holy Bindusagar Lake and taste sacred temple offerings.',
                location: 'Old Town, Ekamra Kshetra, Bhubaneswar',
                type: 'attraction'
              },
              {
                time: '11:30 AM',
                title: 'Peace Meditation at Dhauli Giri Shanti Stupa',
                description: 'Visit the historic Ashokan rock edicts dating back to 261 BCE overlooking the peaceful Daya River.',
                location: 'Dhauli Hills, Khurda',
                type: 'attraction'
              },
              {
                time: '01:30 PM',
                title: 'Authentic Odia Thali Lunch: Dalma, Pakhala & Chhena Poda',
                description: 'Savor traditional slow-cooked lentils with vegetables (Dalma), Kanika sweet rice, and freshly baked Chhena Poda.',
                location: 'Nimantran Heritage Restaurant (OTDC), Bhubaneswar',
                type: 'food'
              },
              {
                time: '03:30 PM',
                title: 'Pipili Applique & Royal Chandua Artisan Village',
                description: 'Meet generational artisans hand-stitching colorful canopies and tapestries for the Lord Jagannath Rath Yatra.',
                location: 'Pipili Applique Bazaar, Puri Highway',
                type: 'craft'
              },
              {
                time: '06:00 PM',
                title: travelMode === 'own' ? 'Sunset Drive to Puri Golden Beach' : 'Scenic AC Mo Bus / Private Chauffeur to Puri',
                description: 'Smooth drive along NH-316 to the Blue Flag certified Golden Beach in Puri.',
                location: 'Puri Sea Beach Road',
                type: 'transport',
                transportBookingAvailable: travelMode === 'app'
              }
            ]
          },
          {
            date: dateTo,
            dayTheme: 'Lord Jagannath Darshan, Raghurajpur Crafts & Konark Marine Drive',
            weather: 'Clear Skies & Ocean Breeze, 26°C',
            activities: [
              {
                time: '06:30 AM',
                title: 'VIP Darshan at Shree Jagannath Temple & Anandabazar',
                description: 'Witness the morning Mangala Alati, gaze upon the holy Nilachakra, and taste Mahaprasad prepared in the world largest earthen kitchen.',
                location: 'Bada Danda, Puri',
                type: 'attraction'
              },
              {
                time: '10:30 AM',
                title: 'Raghurajpur Heritage Craft Village & Pattachitra Immersion',
                description: 'Walk through the living art village where every household is a studio of Pattachitra painters and Gotipua dancers.',
                location: 'Raghurajpur Crafts Village, Puri',
                type: 'craft'
              },
              {
                time: '01:00 PM',
                title: 'Traditional Temple Feast & Mahaprasad Abhada Tasting',
                description: 'Sacred clay-pot culinary feast of Khechudi, Dalma, Besara, and crispy Puri Khaja.',
                location: 'Anandabazar Courtyard, Puri',
                type: 'food'
              },
              {
                time: '03:30 PM',
                title: 'Scenic Marine Drive to Konark Sun Temple (UNESCO)',
                description: 'Breathtaking coastal highway drive flanked by casuarina groves and the Bay of Bengal.',
                location: 'Puri - Konark Marine Drive Highway',
                type: 'transport',
                transportBookingAvailable: travelMode === 'app'
              },
              {
                time: '04:45 PM',
                title: 'Golden Hour at the Konark Sun Temple & Chandrabhaga Beach',
                description: 'Explore the 24 astronomical sundial wheels and intricate Natya Mandapa sculptures as the sun sets over the ocean.',
                location: 'Konark Sun Temple Complex & Chandrabhaga',
                type: 'attraction'
              }
            ]
          }
        ];
      }

      setItinerary(generatedData);
    } catch (err: any) {
      console.error('Itinerary generation error:', err);
      setError(err?.message || 'An error occurred while generating the itinerary.');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveItinerary = async () => {
    if (!user || !itinerary) return;
    try {
      await api('/api/me/itineraries', {
        method: 'POST',
        body: JSON.stringify({
          title: `Odisha Heritage Trip: ${destinationTitle}`,
          destination: destinationTitle,
          startDate: dateFrom,
          endDate: dateTo,
          budget: budgetInr,
          days: itinerary,
        }),
      });
      setSaved(true);
    } catch (err: any) {
      console.error('Error saving itinerary:', err);
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'food': return <Utensils className="w-5 h-5 drop-shadow-sm" />;
      case 'craft': return <ShoppingBag className="w-5 h-5 drop-shadow-sm" />;
      case 'transport': return <Train className="w-5 h-5 drop-shadow-sm" />;
      default: return <MapPin className="w-5 h-5 drop-shadow-sm" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'food': return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'craft': return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'transport': return 'bg-sky-100 text-sky-800 border-sky-300';
      default: return 'bg-emerald-100 text-emerald-800 border-emerald-300';
    }
  };

  if (!isAuthReady) {
    return (
      <div className="min-h-screen bg-stone-50 py-12 px-4 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 text-amber-500 animate-spin" />
          <p className="text-stone-600 font-medium">Initializing Odisha AI Travel Planner...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-3 shadow-sm border border-amber-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            Vision X AI Planner • Exclusively Odisha, India
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-black text-stone-900 mb-3">
            Plan Your Odisha Heritage Journey
          </h1>
          <p className="text-stone-600 text-base md:text-lg max-w-2xl mx-auto font-light">
            Explore all {ODISHA_ALL_DESTINATIONS.length} featured destinations, then build a dated trip with local highlights, stays, food, and travel tips.
          </p>
          {!user && (
            <p className="mt-3 text-xs font-medium text-stone-500">
              Browse and plan for free. <Link href="/login" className="font-bold text-amber-800 underline">Sign in</Link> only if you want to save your itinerary.
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Form Settings */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-stone-200 lg:sticky lg:top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-serif text-2xl font-bold text-stone-900">Tour Preferences</h2>
                <div className="flex items-center bg-stone-100 p-1 rounded-xl text-xs font-bold">
                  <button 
                    type="button"
                    onClick={() => setCurrency('INR')} 
                    className={`px-2.5 py-1 rounded-lg ${currency === 'INR' ? 'bg-white text-stone-950 shadow-sm' : 'text-stone-500'}`}
                  >
                    ₹ INR
                  </button>
                  <button 
                    type="button"
                    onClick={() => setCurrency('USD')} 
                    className={`px-2.5 py-1 rounded-lg ${currency === 'USD' ? 'bg-white text-stone-950 shadow-sm' : 'text-stone-500'}`}
                  >
                    $ USD
                  </button>
                </div>
              </div>

              <form onSubmit={handleGenerate} className="space-y-6">
                {/* Travel Mode */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">How are you traveling?</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setTravelMode('own')}
                      className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                        travelMode === 'own' 
                          ? 'border-amber-500 bg-amber-50/70 text-amber-950 font-bold' 
                          : 'border-stone-200 bg-stone-50 text-stone-600'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 mb-1 text-xs">
                        <MapPin className="w-3.5 h-3.5 text-amber-700" /> Own Vehicle
                      </div>
                      <div className="text-[11px] text-stone-500">Personal Car/Bike</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setTravelMode('app')}
                      className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                        travelMode === 'app' 
                          ? 'border-amber-500 bg-amber-50/70 text-amber-950 font-bold' 
                          : 'border-stone-200 bg-stone-50 text-stone-600'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 mb-1 text-xs">
                        <Plane className="w-3.5 h-3.5 text-amber-700" /> Book via App
                      </div>
                      <div className="text-[11px] text-stone-500">Mo Bus, Vande Bharat, Cab</div>
                    </button>
                  </div>
                </div>

                {/* Odisha destinations */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                    Choose a destination ({ODISHA_ALL_DESTINATIONS.length} places)
                  </label>
                  <select
                    value={destination}
                    onChange={(e) => {
                      setDestination(e.target.value);
                      setItinerary(null);
                      setSaved(false);
                    }}
                    className="w-full px-3.5 py-3 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none text-xs font-semibold text-stone-800"
                  >
                    {ODISHA_ALL_DESTINATIONS.map((place) => (
                      <option key={place.id} value={place.id}>{place.name} · {place.district}</option>
                    ))}
                  </select>
                </div>

                {/* Dates */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">From Date</label>
                    <input
                      type="date"
                      required
                      value={dateFrom}
                      onChange={(e) => setDateFrom(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-stone-200 bg-stone-50 text-xs font-medium text-stone-700"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">To Date</label>
                    <input
                      type="date"
                      required
                      value={dateTo}
                      onChange={(e) => setDateTo(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-stone-200 bg-stone-50 text-xs font-medium text-stone-700"
                    />
                  </div>
                </div>

                {/* Interests */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">Heritage Interests</label>
                  <div className="flex flex-wrap gap-2">
                    {ODISHA_INTERESTS.map(interest => (
                      <button
                        key={interest}
                        type="button"
                        onClick={() => toggleInterest(interest)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                          selectedInterests.includes(interest)
                            ? 'bg-amber-500 text-stone-950 font-bold shadow-sm'
                            : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                        }`}
                      >
                        {interest}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Budget */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">Estimated Budget</label>
                    <span className="text-sm font-black text-amber-700">
                      {currency === 'INR' ? `₹${budgetInr.toLocaleString('en-IN')}` : `$${Math.round(budgetInr / 83)}`}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="5000"
                    max="100000"
                    step="5000"
                    value={budgetInr}
                    onChange={(e) => setBudgetInr(Number(e.target.value))}
                    className="w-full accent-amber-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] font-bold text-stone-400 mt-1">
                    <span>₹5,000</span>
                    <span>₹1,00,000+</span>
                  </div>
                </div>

                {/* Travel Style */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">Pace</label>
                  <div className="grid grid-cols-3 gap-2">
                    {TRAVEL_STYLES.map(style => (
                      <button
                        key={style}
                        type="button"
                        onClick={() => setTravelStyle(style)}
                        className={`py-2 text-xs font-medium rounded-xl border transition-all cursor-pointer ${
                          travelStyle === style
                            ? 'bg-stone-900 border-stone-900 text-white font-bold'
                            : 'bg-stone-50 border-stone-200 text-stone-600'
                        }`}
                      >
                        {style}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl bg-gradient-to-b from-amber-400 to-amber-500 text-stone-950 font-black hover:from-amber-300 hover:to-amber-400 transition-all shadow-md active:scale-95 disabled:opacity-70 flex items-center justify-center gap-2 cursor-pointer text-sm"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Crafting Odisha Itinerary...
                    </>
                  ) : (
                    <>
                      <Compass className="w-4 h-4" />
                      Generate Odisha Route
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Results Display */}
          <div className="lg:col-span-8">
            {error && (
              <div className="bg-red-50 text-red-700 p-6 rounded-2xl border border-red-200 mb-8">
                <p className="font-bold text-sm">{error}</p>
              </div>
            )}

            {!itinerary && !loading && !error && (
              <div className="rounded-3xl border border-stone-200 bg-white p-5 shadow-sm md:p-7">
                <div className="mb-6 flex items-center gap-4">
                  <div className="rounded-2xl bg-amber-50 p-3">
                    <Compass className="h-8 w-8 text-amber-700" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-stone-900">Choose from all Odisha destinations</h3>
                    <p className="mt-1 text-sm text-stone-500">Select a place here or from the destination menu, then generate your trip.</p>
                  </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  {ODISHA_ALL_DESTINATIONS.map(place => (
                    <button
                      key={place.id}
                      type="button"
                      onClick={() => {
                        setDestination(place.id);
                        setItinerary(null);
                        setSaved(false);
                      }}
                      className={`rounded-2xl border p-4 text-left transition ${
                        destination === place.id
                          ? 'border-amber-500 bg-amber-50 shadow-sm'
                          : 'border-stone-200 bg-stone-50 hover:border-amber-300 hover:bg-white'
                      }`}
                    >
                      <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800">{place.category} · {place.district}</span>
                      <span className="mt-2 block text-sm font-bold leading-snug text-stone-900">{place.name}</span>
                      <span className="mt-1 block text-xs leading-relaxed text-stone-500">{place.tagline}</span>
                      <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-amber-800">
                        {destination === place.id ? 'Selected' : 'Select this place'} <Navigation className="h-3.5 w-3.5" />
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {loading && (
              <div className="space-y-6">
                <div className="w-full h-56 bg-stone-200 rounded-3xl animate-pulse flex items-center justify-center flex-col">
                  <Loader2 className="w-8 h-8 text-amber-600 animate-spin mb-3" />
                  <span className="text-sm font-semibold text-stone-600">Building your destination-specific Odisha guide...</span>
                </div>
              </div>
            )}

            {itinerary && (
              <div className="space-y-8">
                {/* Visual Banner */}
                <div className="w-full h-56 rounded-3xl overflow-hidden relative shadow-md">
                  <Image 
                    src={selectedDestination?.image || ''}
                    alt={destinationTitle}
                    fill 
                    className="object-cover" 
                    referrerPolicy="no-referrer" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-6">
                    <div>
                      <div className="text-amber-400 text-xs font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5">
                        <Navigation className="w-3.5 h-3.5" /> AI Route Active
                      </div>
                      <h3 className="font-serif text-2xl font-bold text-white">
                        {destinationTitle}
                      </h3>
                    </div>
                  </div>
                </div>

                {selectedDestination && (
                  <section className="space-y-6" aria-label={`${destinationTitle} destination guide`}>
                    <div className="rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-950 via-teal-900 to-cyan-900 p-6 text-white shadow-md md:p-8">
                      <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-emerald-200">
                        {selectedDestination.category} · {selectedDestination.region}
                      </p>
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div className="max-w-3xl">
                          <h3 className="font-serif text-2xl font-bold md:text-3xl">{selectedDestination.name}</h3>
                          <p className="mt-2 text-sm leading-relaxed text-emerald-50/90">{selectedDestination.tagline}</p>
                          <p className="mt-4 text-sm leading-relaxed text-emerald-50/80">{selectedDestination.description}</p>
                        </div>
                        <a
                          href={selectedDestination.googleMapsUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-emerald-950 transition hover:bg-emerald-50"
                        >
                          Open map <ExternalLink className="h-4 w-4" />
                        </a>
                      </div>
                      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                        {[
                          { title: 'Best time to visit', value: selectedDestination.bestTimeToVisit },
                          { title: 'Usual visiting hours', value: selectedDestination.timings },
                          { title: 'Weekly closure', value: selectedDestination.closedOn },
                          { title: 'Entry information', value: selectedDestination.entryFee.indian }
                        ].map(item => (
                          <div key={item.title} className="rounded-2xl border border-white/15 bg-white/10 p-4">
                            <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-200">{item.title}</p>
                            <p className="mt-2 text-sm font-semibold leading-relaxed text-white">{item.value}</p>
                          </div>
                        ))}
                      </div>
                      <p className="mt-4 text-xs leading-relaxed text-emerald-50/70">
                        Timings, prices, access, and seasonal operations can change. Confirm with the official site or local operator before you travel.
                      </p>
                    </div>

                    <div className="grid gap-6 xl:grid-cols-2">
                      <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm md:p-7">
                        <h3 className="mb-4 flex items-center gap-2 font-serif text-xl font-bold text-stone-900">
                          <Navigation className="h-5 w-5 text-teal-700" /> Getting there
                        </h3>
                        <div className="space-y-3 text-xs leading-relaxed text-stone-600">
                          <p><strong className="text-stone-900">Airport:</strong> {selectedDestination.transit.nearestAirport.name} ({selectedDestination.transit.nearestAirport.code}), about {selectedDestination.transit.nearestAirport.distanceKm} km away; listed transfer time {selectedDestination.transit.nearestAirport.approxTime}.</p>
                          <p><strong className="text-stone-900">Rail:</strong> {selectedDestination.transit.nearestRailway.station} ({selectedDestination.transit.nearestRailway.code}), about {selectedDestination.transit.nearestRailway.distanceKm} km away; onward mode: {selectedDestination.transit.nearestRailway.mode}.</p>
                          <p><strong className="text-stone-900">Bus:</strong> {selectedDestination.transit.busConnectivity.route}. {selectedDestination.transit.busConnectivity.operators}; listed frequency: {selectedDestination.transit.busConnectivity.frequency}.</p>
                          <p><strong className="text-stone-900">By road:</strong> {selectedDestination.transit.roadDrive.popularRoute} via {selectedDestination.transit.roadDrive.highway}.</p>
                          <p className="rounded-xl bg-amber-50 p-3 text-amber-950"><strong>Before leaving:</strong> schedules, fares, and road conditions can change; verify current details locally. {selectedDestination.transit.roadDrive.tollInfo}</p>
                        </div>
                        <div className="mt-4 grid gap-3 sm:grid-cols-2">
                          <div className="rounded-xl bg-stone-50 p-3 text-xs">
                            <p className="font-bold text-stone-900">Camera / entry notes</p>
                            <p className="mt-1 leading-relaxed text-stone-600">{selectedDestination.entryFee.camera} {selectedDestination.entryFee.additionalInfo}</p>
                          </div>
                          <div className="rounded-xl bg-stone-50 p-3 text-xs">
                            <p className="font-bold text-stone-900">International visitors</p>
                            <p className="mt-1 leading-relaxed text-stone-600">{selectedDestination.entryFee.foreigner}</p>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm md:p-7">
                        <h3 className="mb-4 flex items-center gap-2 font-serif text-xl font-bold text-stone-900">
                          <Hotel className="h-5 w-5 text-amber-700" /> Stay nearby
                        </h3>
                        {destinationHotels.length > 0 ? (
                          <div className="space-y-3">
                            {destinationHotels.slice(0, 3).map(hotel => (
                              <div key={hotel.name} className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
                                <div className="flex flex-wrap items-start justify-between gap-2">
                                  <div>
                                    <p className="text-sm font-bold text-stone-900">{hotel.name}</p>
                                    <p className="mt-1 text-xs text-stone-500">{hotel.category} · about {hotel.distanceKm} km away</p>
                                  </div>
                                  <span className="rounded-lg bg-white px-2.5 py-1 text-xs font-bold text-amber-800">
                                    ~₹{hotel.pricePerNightInr.toLocaleString('en-IN')} / night
                                  </span>
                                </div>
                                <p className="mt-2 text-xs leading-relaxed text-stone-600">{hotel.highlights.join(' · ')}</p>
                                <div className="mt-3 flex items-center justify-between">
                                  <span className="text-xs font-semibold text-stone-500">Listed rating: {hotel.rating}/5 · confirm current rate</span>
                                  <a
                                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${hotel.name} ${selectedDestination.district} Odisha`)}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-1 text-xs font-bold text-teal-800 hover:text-teal-950"
                                  >
                                    Map <ExternalLink className="h-3.5 w-3.5" />
                                  </a>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="rounded-xl bg-stone-50 p-4 text-xs leading-relaxed text-stone-600">
                            No stay listing is available for this place yet. Search for licensed stays in {selectedDestination.district} and confirm the exact distance and current price before booking.
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid gap-6 xl:grid-cols-2">
                      <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm md:p-7">
                        <h3 className="mb-4 flex items-center gap-2 font-serif text-xl font-bold text-stone-900">
                          <Utensils className="h-5 w-5 text-emerald-700" /> Local food to look for
                        </h3>
                        <div className="space-y-3">
                          {recommendedDishes.map(dish => (
                            <div key={dish.id} className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4">
                              <p className="text-sm font-bold text-stone-900">{dish.name}</p>
                              <p className="mt-1 text-xs leading-relaxed text-stone-600">{dish.description}</p>
                              <p className="mt-2 text-xs font-semibold text-emerald-900">Known for: {dish.origin} · Try around: {dish.mustTrySpot}</p>
                            </div>
                          ))}
                        </div>
                        <p className="mt-3 text-xs leading-relaxed text-stone-500">
                          Restaurant availability and menu vary by season. Ask for local specialties and mention dietary needs before ordering.
                        </p>
                      </div>
                      <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm md:p-7">
                        <h3 className="mb-4 flex items-center gap-2 font-serif text-xl font-bold text-stone-900">
                          <ShieldCheck className="h-5 w-5 text-teal-700" /> Helpful local tips
                        </h3>
                        <ul className="space-y-3">
                          {selectedDestination.travelTips.map((tip, index) => (
                            <li key={`${selectedDestination.id}-tip-${index}`} className="flex gap-3 rounded-xl bg-stone-50 p-3 text-xs leading-relaxed text-stone-600">
                              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-700" /> {tip}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </section>
                )}

                {isChilika && (
                  <section className="space-y-6" aria-label="Chilika travel guide">
                    <div className="rounded-3xl border border-teal-200 bg-gradient-to-br from-teal-950 via-teal-900 to-emerald-900 p-6 text-white shadow-md md:p-8">
                      <div className="flex items-start gap-4">
                        <div className="rounded-2xl bg-white/10 p-3">
                          <Waves className="h-7 w-7 text-teal-200" />
                        </div>
                        <div>
                          <p className="mb-1 text-xs font-bold uppercase tracking-[0.18em] text-teal-200">Your Chilika field guide</p>
                          <h3 className="font-serif text-2xl font-bold md:text-3xl">Choose the right shore for your trip</h3>
                          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-teal-50/90">
                            Chilika is a large lagoon, not one walkable town. Satapada is the practical base for dolphin trips; Barkul is a separate east-shore base for Kalijai; Mangalajodi is a seasonal birding area. Plan road transfers between shores and confirm boat routes locally.
                          </p>
                        </div>
                      </div>
                      <div className="mt-6 grid gap-3 md:grid-cols-3">
                        {[
                          { title: 'Satapada', focus: 'Dolphin trips and the sea mouth', icon: <Waves className="h-5 w-5" />, query: 'Satapada Jetty Chilika Odisha' },
                          { title: 'Barkul / Rambha', focus: 'Kalijai Island and east-shore cruises', icon: <Map className="h-5 w-5" />, query: 'Barkul Chilika Lake Odisha' },
                          { title: 'Mangalajodi', focus: 'Community-guided birding, best in winter', icon: <Bird className="h-5 w-5" />, query: 'Mangalajodi Wetland Odisha' }
                        ].map(zone => (
                          <a
                            key={zone.title}
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(zone.query)}`}
                            target="_blank"
                            rel="noreferrer"
                            className="rounded-2xl border border-white/15 bg-white/10 p-4 transition hover:bg-white/15"
                          >
                            <span className="mb-2 flex items-center gap-2 text-sm font-bold text-white">{zone.icon}{zone.title}<ExternalLink className="ml-auto h-3.5 w-3.5 text-teal-200" /></span>
                            <span className="block text-xs leading-relaxed text-teal-50/80">{zone.focus}</span>
                          </a>
                        ))}
                      </div>
                      <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 border-t border-white/15 pt-4 text-xs text-teal-50/90">
                        <span><strong className="text-white">Best all-round window:</strong> November–February</span>
                        <span><strong className="text-white">Boat access:</strong> daylight and weather dependent</span>
                        <span><strong className="text-white">Bird sanctuary:</strong> access restrictions may apply</span>
                      </div>
                    </div>

                    <div className="grid gap-3 md:grid-cols-3">
                      {[
                        {
                          title: 'By air',
                          detail: chilikaDestination
                            ? `${chilikaDestination.transit.nearestAirport.name} · about ${chilikaDestination.transit.nearestAirport.distanceKm} km · ${chilikaDestination.transit.nearestAirport.approxTime} by road`
                            : 'Bhubaneswar airport is the main air gateway; confirm your transfer.',
                          icon: <Plane className="h-5 w-5" />
                        },
                        {
                          title: 'By rail / road',
                          detail: chilikaDestination
                            ? `${chilikaDestination.transit.nearestRailway.station} · about ${chilikaDestination.transit.nearestRailway.distanceKm} km from Satapada. ${chilikaDestination.transit.roadDrive.popularRoute}.`
                            : 'Puri is a practical rail gateway for Satapada; confirm local road transfers.',
                          icon: <Train className="h-5 w-5" />
                        },
                        {
                          title: 'Boat budget',
                          detail: chilikaDestination?.entryFee.additionalInfo || 'Confirm boat prices, route, and trip length with an authorized local operator.',
                          icon: <Waves className="h-5 w-5" />
                        }
                      ].map(item => (
                        <div key={item.title} className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm">
                          <h3 className="mb-2 flex items-center gap-2 text-sm font-bold text-stone-900">{item.icon}{item.title}</h3>
                          <p className="text-xs leading-relaxed text-stone-600">{item.detail}</p>
                          <p className="mt-2 text-[11px] font-semibold text-amber-800">Indicative only — reconfirm fares and travel time before departure.</p>
                        </div>
                      ))}
                    </div>

                    <div className="grid gap-6 xl:grid-cols-2">
                      <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm md:p-7">
                        <div className="mb-5 flex items-center gap-3">
                          <div className="rounded-xl bg-amber-100 p-2.5 text-amber-800"><Hotel className="h-5 w-5" /></div>
                          <div>
                            <h3 className="font-serif text-xl font-bold text-stone-900">Where to stay</h3>
                            <p className="text-xs text-stone-500">Pick your base by the jetty you want to use</p>
                          </div>
                        </div>
                        <div className="space-y-3">
                          {chilikaStays.map(stay => (
                            <div key={stay.name} className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
                              <div className="flex flex-wrap items-start justify-between gap-2">
                                <div>
                                  <h4 className="text-sm font-bold text-stone-900">{stay.name}</h4>
                                  <p className="mt-1 text-xs text-stone-500">{stay.area} · {stay.category}</p>
                                </div>
                                <span className="rounded-lg bg-white px-2.5 py-1 text-xs font-bold text-amber-800">
                                  ~₹{stay.price.toLocaleString('en-IN')} / night
                                </span>
                              </div>
                              <p className="mt-2 text-xs leading-relaxed text-stone-600">{stay.highlights.slice(0, 3).join(' · ')}</p>
                              <div className="mt-3 flex items-center justify-between">
                                <span className="text-xs font-semibold text-stone-500">Listed rating: {stay.rating}/5 · guide price; confirm current rates</span>
                                <a
                                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${stay.name} ${stay.area} Odisha`)}`}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="inline-flex items-center gap-1 text-xs font-bold text-teal-800 hover:text-teal-950"
                                >
                                  Map <ExternalLink className="h-3.5 w-3.5" />
                                </a>
                              </div>
                            </div>
                          ))}
                        </div>
                        <p className="mt-4 rounded-xl bg-amber-50 p-3 text-xs leading-relaxed text-amber-950">
                          <strong>Best fit:</strong> Stay in Satapada the night before an early dolphin trip. For Kalijai or Mangalajodi, check the property’s exact location and transfer time before booking; the shores are not interchangeable.
                        </p>
                      </div>

                      <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm md:p-7">
                        <div className="mb-5 flex items-center gap-3">
                          <div className="rounded-xl bg-emerald-100 p-2.5 text-emerald-800"><Utensils className="h-5 w-5" /></div>
                          <div>
                            <h3 className="font-serif text-xl font-bold text-stone-900">What to eat</h3>
                            <p className="text-xs text-stone-500">Local lagoon catch and Odia comfort food</p>
                          </div>
                        </div>
                        <div className="space-y-3">
                          {chilikaSeafood.map(dish => (
                            <div key={dish.id} className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4">
                              <h4 className="text-sm font-bold text-stone-900">{dish.name}</h4>
                              <p className="mt-1 text-xs leading-relaxed text-stone-600">{dish.description}</p>
                              <p className="mt-2 text-xs font-semibold text-emerald-900">Try around: {dish.mustTrySpot}</p>
                            </div>
                          ))}
                          <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
                            <h4 className="text-sm font-bold text-stone-900">Also ask for</h4>
                            <p className="mt-1 text-xs leading-relaxed text-stone-600">Fresh lake fish fry, seasonal prawns, rice with dalma, and pakhala when available. Ask what is freshly landed; request a vegetarian meal if preferred.</p>
                          </div>
                        </div>
                        <div className="mt-4 flex gap-2 rounded-xl bg-sky-50 p-3 text-xs leading-relaxed text-sky-950">
                          <Leaf className="mt-0.5 h-4 w-4 shrink-0 text-sky-700" />
                          Choose legal, in-season catch and avoid buying protected wildlife or undersized catch.
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-4 rounded-3xl border border-stone-200 bg-white p-6 shadow-sm md:grid-cols-2 md:p-7">
                      <div>
                        <h3 className="mb-3 flex items-center gap-2 font-serif text-xl font-bold text-stone-900">
                          <ShieldCheck className="h-5 w-5 text-teal-700" /> Boat and wildlife checklist
                        </h3>
                        <ul className="space-y-2 text-xs leading-relaxed text-stone-600">
                          <li>• Confirm authorized operator, fare, route, return time, life jackets, and weather before paying.</li>
                          <li>• Do not feed, touch, crowd, or chase dolphins; sightings are not guaranteed.</li>
                          <li>• Nalabana access is regulated; do not land or enter restricted sanctuary areas.</li>
                          <li>• Carry water, sun protection, cash, and any medicine; mobile coverage can vary on the water.</li>
                        </ul>
                      </div>
                      <div className="rounded-2xl bg-teal-50 p-5">
                        <h4 className="mb-2 text-sm font-bold text-teal-950">How to use your timetable</h4>
                        <p className="text-xs leading-relaxed text-teal-950/80">
                          The dated schedule below follows your selected trip dates. It is a planning guide, not a live boat or wildlife schedule: verify departure times, sanctuary access, hotel rates, and local weather before travel.
                        </p>
                        <p className="mt-3 flex items-start gap-2 text-xs font-semibold leading-relaxed text-teal-900">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                          If your trip is short, prioritize one shore rather than trying to cover Satapada, Barkul, and Mangalajodi in a single day.
                        </p>
                      </div>
                    </div>
                  </section>
                )}

                {/* Save Itinerary Action */}
                <div className="flex justify-end">
                  {user ? (
                    <button 
                      onClick={handleSaveItinerary}
                      disabled={saved}
                      className={`px-6 py-3 rounded-xl font-bold text-xs transition-all flex items-center gap-2 shadow-md cursor-pointer ${
                        saved 
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                          : 'bg-stone-900 text-white hover:bg-stone-800 active:scale-95'
                      }`}
                    >
                      {saved ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Save className="w-4 h-4 text-amber-400" />}
                      {saved ? 'Saved to Your Odisha Dashboard' : 'Save Itinerary to Dashboard'}
                    </button>
                  ) : (
                    <Link href="/login" className="inline-flex items-center gap-2 rounded-xl bg-stone-900 px-6 py-3 text-xs font-bold text-white shadow-md transition hover:bg-stone-800">
                      <LogIn className="h-4 w-4 text-amber-400" /> Sign in to save itinerary
                    </Link>
                  )}
                </div>

                {/* Daily Timeline */}
                {itinerary.map((day, dayIdx) => (
                  <div key={dayIdx} className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-stone-200">
                    <div className="flex items-center gap-4 mb-8 border-b border-stone-100 pb-6">
                      <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-900 flex flex-col items-center justify-center shrink-0 border border-amber-200">
                        <span className="text-[10px] font-black uppercase tracking-wider">Day</span>
                        <span className="text-2xl font-black leading-none">{dayIdx + 1}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold text-stone-400">{day.date}</span>
                          <span className="flex items-center gap-1 text-xs font-bold text-sky-800 bg-sky-50 px-2.5 py-1 rounded-md border border-sky-200">
                            <CloudSun className="w-3.5 h-3.5 text-sky-600" /> {day.weather}
                          </span>
                        </div>
                        <h3 className="font-serif text-xl font-bold text-stone-900">{day.dayTheme}</h3>
                      </div>
                    </div>

                    <div className="space-y-6">
                      {day.activities.map((act, idx) => (
                        <div key={idx} className="flex gap-4 group">
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border ${getActivityColor(act.type)}`}>
                            {getActivityIcon(act.type)}
                          </div>
                          
                          <div className="flex-1 p-5 rounded-2xl bg-stone-50 border border-stone-200/80 group-hover:bg-white group-hover:shadow-md transition-all">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded border border-amber-200/50 flex items-center gap-1">
                                <Clock className="w-3 h-3" /> {act.time}
                              </span>
                              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 bg-stone-100 px-2 py-0.5 rounded">
                                {act.type}
                              </span>
                            </div>

                            <h4 className="font-bold text-stone-900 text-base mb-1 group-hover:text-amber-800 transition-colors">
                              {act.title}
                            </h4>
                            <p className="text-stone-600 text-xs leading-relaxed mb-3 font-medium">
                              {act.description}
                            </p>

                            <div className="flex items-center justify-between pt-2 border-t border-stone-200/50">
                              <div className="flex items-center gap-1 text-xs text-stone-500 font-semibold">
                                <MapPin className="w-3.5 h-3.5 text-amber-600" />
                                {act.location}
                              </div>

                              {act.transportBookingAvailable && (
                                <button
                                  onClick={() => {
                                    setCheckoutItem({ name: act.title, price: '₹150' });
                                    setIsCheckoutOpen(true);
                                  }}
                                  className="text-xs font-bold bg-amber-500 hover:bg-amber-400 text-stone-950 px-3.5 py-1.5 rounded-lg shadow-sm transition-all cursor-pointer"
                                >
                                  Book Transit Ticket
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
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
