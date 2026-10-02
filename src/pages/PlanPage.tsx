import { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { 
  MapPin, Loader2, Navigation, Clock, Map, Utensils, 
  ShoppingBag, Train, Plane, Save, CheckCircle2, CloudSun, LogIn, Sparkles, UserCheck, Compass 
} from 'lucide-react';
import Image from '../components/Image';
import CheckoutModal from '../components/CheckoutModal';
import { useAuth } from '../components/AuthProvider';
import { Link } from '../components/Router';

const ODISHA_DESTINATIONS = [
  'Bhubaneswar, Puri & Konark (Golden Triangle)',
  'Chilika Lake & Satapada Dolphin Lagoon',
  'Similipal National Park & Mayurbhanj Royal Heritage',
  'Daringbadi & Eastern Ghats Coffee Valleys',
  'Raghurajpur Crafts Village & Pipili Applique Trail',
  'Gopalpur-on-Sea & Tampara Lake'
];

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
  const [destination, setDestination] = useState(ODISHA_DESTINATIONS[0]);
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

      // If backend didn't return data, try client direct GenAI if key available
      if (!generatedData) {
        const apiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY || (window as any).__GEMINI_API_KEY__;
        if (apiKey) {
          const ai = new GoogleGenAI({ apiKey });
          const prompt = `You are an expert Odisha Tourism AI Planner.
Generate a detailed travel itinerary for ${destination}, Odisha, India from ${dateFrom} to ${dateTo}.
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
          title: `Odisha Heritage Trip: ${destination}`,
          destination,
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

  if (!user) {
    return (
      <div className="min-h-screen bg-stone-50 py-12 px-4 flex items-center justify-center">
        <div className="bg-white p-10 rounded-3xl shadow-xl border border-stone-200/80 text-center max-w-md w-full">
          <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
            <Compass className="w-10 h-10 text-amber-700" />
          </div>
          <h2 className="font-serif text-3xl font-bold text-stone-900 mb-3">Sign in to Plan Odisha Tour</h2>
          <p className="text-stone-600 mb-8 leading-relaxed text-sm">
            Log in to unlock custom AI itinerary generation tailored to Odisha spiritual shrines, craft villages, and pristine coasts.
          </p>
          <div className="space-y-3">
            <Link
              href="/login"
              className="w-full bg-gradient-to-b from-amber-500 to-amber-600 text-stone-950 font-black py-4 rounded-xl shadow-md border-b-4 border-amber-700 active:translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <LogIn className="w-5 h-5" />
              Sign In to Continue
            </Link>
            <Link
              href="/signup"
              className="w-full bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 text-sm cursor-pointer"
            >
              <UserCheck className="w-4 h-4 text-stone-500" />
              Create a Free Account
            </Link>
          </div>
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
            Vision X intelligent routing across Puri Jagannath Darshan, Konark Marine Drive, Raghurajpur crafts, Chilika dolphins, and Similipal tiger reserves.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Form Settings */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-stone-200 sticky top-24">
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

                {/* Odisha Circuit Destination */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">Odisha Circuit</label>
                  <select
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full px-3.5 py-3 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none text-xs font-semibold text-stone-800"
                  >
                    {ODISHA_DESTINATIONS.map((dest, idx) => (
                      <option key={idx} value={dest}>{dest}</option>
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
              <div className="h-full min-h-[500px] bg-white rounded-3xl border-2 border-stone-200 border-dashed flex flex-col items-center justify-center text-stone-400 p-8 text-center">
                <div className="p-6 bg-amber-50 rounded-full mb-4">
                  <Compass className="w-16 h-16 text-amber-600" />
                </div>
                <h3 className="text-xl font-bold text-stone-700 mb-2">Explore the Soul of Kalinga</h3>
                <p className="font-medium text-stone-500 text-sm max-w-md">
                  Select your Odisha circuit and preferences on the left to receive an AI-curated itinerary with temple timings, food stops, and artisan encounters.
                </p>
              </div>
            )}

            {loading && (
              <div className="space-y-6">
                <div className="w-full h-56 bg-stone-200 rounded-3xl animate-pulse flex items-center justify-center flex-col">
                  <Loader2 className="w-8 h-8 text-amber-600 animate-spin mb-3" />
                  <span className="text-sm font-semibold text-stone-600">Structuring Temple Timings & Artisan Stops...</span>
                </div>
              </div>
            )}

            {itinerary && (
              <div className="space-y-8">
                {/* Visual Banner */}
                <div className="w-full h-56 rounded-3xl overflow-hidden relative shadow-md">
                  <Image 
                    src={
                      destination.toLowerCase().includes('puri') || destination.toLowerCase().includes('golden')
                        ? 'https://i.pinimg.com/736x/7e/f1/9c/7ef19cc13322d0e8cfd322b7203b8d77.jpg'
                        : destination.toLowerCase().includes('konark')
                        ? 'https://media.istockphoto.com/id/1444924249/photo/konark-sun-temple-at-sunrise-konark-temple-is-a-unesco-world-heritage-site-at-puri-odisha.jpg?s=612x612&w=0&k=20&c=5Gd3UDpZeYh8DejD4a4TTrpAZLoPw5SARAUFT7hfwRk='
                        : destination.toLowerCase().includes('bhubaneswar')
                        ? 'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4d/Lingaraj_temple_Bhubaneswar.jpg/1920px-Lingaraj_temple_Bhubaneswar.jpg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail&_=20160928072727'
                        : 'https://media.istockphoto.com/id/1444924249/photo/konark-sun-temple-at-sunrise-konark-temple-is-a-unesco-world-heritage-site-at-puri-odisha.jpg?s=612x612&w=0&k=20&c=5Gd3UDpZeYh8DejD4a4TTrpAZLoPw5SARAUFT7hfwRk='
                    } 
                    alt="Odisha Circuit" 
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
                        {destination}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Save Itinerary Action */}
                <div className="flex justify-end">
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
