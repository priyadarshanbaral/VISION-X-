import { useState, useMemo, useEffect } from 'react';
import Image from '../components/Image';
import { 
  Search, MapPin, Navigation, Compass, Calendar, Clock, 
  DollarSign, Plane, Train, Bus, Car, Hotel, Star, 
  ArrowRight, X, Sparkles, Filter, ExternalLink, ShieldCheck, 
  CheckCircle2, Info, ChevronRight, ChevronLeft, Award, Camera 
} from 'lucide-react';
import { ODISHA_ALL_DESTINATIONS, TouristDestination } from '../data/odishaDestinations';
import { getDestinationMedia } from '../data/destinationGalleries';
import OdishaInteractiveMap from '../components/OdishaInteractiveMap';
import CheckoutModal from '../components/CheckoutModal';

// Haversine formula to compute distance in km between two lat/lng points
function calculateDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

const REGIONS = [
  'All Regions',
  'Coastal Odisha',
  'Central & Cuttack',
  'North & Similipal',
  'Southern Highlands',
  'Western Odisha',
  'Diamond Triangle'
];

const CATEGORIES = [
  'All Categories',
  'Temples & Spiritual',
  'Wildlife & Biosphere',
  'Beaches & Lakes',
  'Hill Stations & Waterfalls',
  'Heritage & Forts',
  'Buddhist Circuit'
];

export default function DestinationsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All Regions');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [selectedDestination, setSelectedDestination] = useState<TouristDestination | null>(null);
  const [activeModalDest, setActiveModalDest] = useState<TouristDestination | null>(null);
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);

  // User Geolocation State
  const [userCoords, setUserCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [locating, setLocating] = useState(false);
  const [locationError, setLocationError] = useState('');

  // Booking / Checkout Modal
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutItem, setCheckoutItem] = useState({ name: '', price: '' });

  // Handle Geolocation request
  const handleLocateMe = () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser');
      return;
    }

    setLocating(true);
    setLocationError('');

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserCoords({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        });
        setLocating(false);
      },
      (err) => {
        console.warn('Geolocation error:', err);
        // Fallback default: Center on Bhubaneswar (State Capital)
        setUserCoords({ lat: 20.2961, lng: 85.8245 });
        setLocationError('Defaulted to Bhubaneswar (Capital Center) for route estimation.');
        setLocating(false);
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  // Filtered & Sorted Destinations
  const filteredDestinations = useMemo(() => {
    return ODISHA_ALL_DESTINATIONS.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.odiaName.includes(searchQuery) ||
        item.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesRegion =
        selectedRegion === 'All Regions' || item.region === selectedRegion;

      const matchesCategory =
        selectedCategory === 'All Categories' || item.category === selectedCategory;

      return matchesSearch && matchesRegion && matchesCategory;
    });
  }, [searchQuery, selectedRegion, selectedCategory]);

  const handleBookHotel = (hotelName: string, price: number) => {
    setCheckoutItem({
      name: `${hotelName} (Near ${activeModalDest?.name || 'Destination'})`,
      price: `₹${price.toLocaleString('en-IN')}`
    });
    setIsCheckoutOpen(true);
  };

  return (
    <div className="min-h-screen bg-stone-50 py-10 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Hero Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200 text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
            <Compass className="w-3.5 h-3.5 text-amber-700" />
            Vision X • Complete Odisha Tourism Directory & Live Navigation
          </div>
          <h1 className="font-serif text-4xl md:text-6xl font-black text-stone-900 mb-4 tracking-tight">
            Explore All Tourist Wonders of Odisha
          </h1>
          <p className="text-stone-600 text-base md:text-lg max-w-3xl mx-auto font-light leading-relaxed">
            Real entry fees, exact GPS coordinates, nearest airports & railway stations, live distance calculations from your location, and handpicked nearby resorts.
          </p>
        </div>

        {/* Global Live Geolocation Action Strip */}
        <div className="bg-white p-4 md:p-6 rounded-3xl border border-stone-200 shadow-sm mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-amber-500/10 text-amber-700 rounded-2xl">
              <Navigation className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-stone-900 text-sm md:text-base">
                {userCoords
                  ? 'Live GPS Active: Distances calculated from your current location'
                  : 'Know how far each tourist place is from you?'}
              </h3>
              <p className="text-xs text-stone-500">
                {userCoords
                  ? `Coordinates: ${userCoords.lat.toFixed(3)}°N, ${userCoords.lng.toFixed(3)}°E`
                  : 'Enable location access to view exact driving distances and turn-by-turn routes.'}
              </p>
              {locationError && <p className="text-[11px] text-amber-700 mt-0.5">{locationError}</p>}
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={handleLocateMe}
              disabled={locating}
              className="flex-1 md:flex-none px-5 py-2.5 bg-gradient-to-b from-amber-500 to-amber-600 text-stone-950 font-black text-xs rounded-xl shadow-md border-b-2 border-amber-700 hover:from-amber-400 hover:to-amber-500 active:translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Navigation className="w-4 h-4" />
              {locating ? 'Detecting Location...' : userCoords ? 'Refresh Live GPS' : 'Enable Live Distance'}
            </button>
            <div className="flex bg-stone-100 p-1 rounded-xl border border-stone-200 text-xs font-bold">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  viewMode === 'grid' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500'
                }`}
              >
                Cards View
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  viewMode === 'map' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500'
                }`}
              >
                Interactive Map
              </button>
            </div>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="space-y-4 mb-10">
          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by destination name, district (e.g. Puri, Mayurbhanj, Kandhamal), or keyword (waterfall, crocodile, temple)..."
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-stone-200 text-stone-900 placeholder:text-stone-400 shadow-sm focus:ring-2 focus:ring-amber-500 outline-none text-sm transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Region Tabs */}
          <div className="flex overflow-x-auto hide-scrollbar gap-2 pb-1">
            {REGIONS.map((region) => (
              <button
                key={region}
                onClick={() => setSelectedRegion(region)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer border ${
                  selectedRegion === region
                    ? 'bg-stone-900 text-white border-stone-900 shadow-sm'
                    : 'bg-white text-stone-600 hover:bg-stone-100 border-stone-200'
                }`}
              >
                {region}
              </button>
            ))}
          </div>

          {/* Category Chips */}
          <div className="flex overflow-x-auto hide-scrollbar gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border ${
                  selectedCategory === cat
                    ? 'bg-amber-500/20 text-amber-900 border-amber-400 font-bold'
                    : 'bg-white/70 text-stone-500 hover:bg-white border-stone-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* View: Map or Cards */}
        {viewMode === 'map' ? (
          <div className="mb-12">
            <OdishaInteractiveMap
              destinations={filteredDestinations}
              selectedDestination={selectedDestination}
              onSelectDestination={(dest) => {
                setSelectedDestination(dest);
                setActiveModalDest(dest);
              }}
              userCoords={userCoords}
              onLocateMe={handleLocateMe}
              locating={locating}
            />
          </div>
        ) : null}

        {/* Destinations Grid */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-2xl font-bold text-stone-900 flex items-center gap-2">
              <span>Tourist Places in Odisha</span>
              <span className="text-xs font-sans font-bold bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full">
                {filteredDestinations.length} places
              </span>
            </h2>
            {userCoords && (
              <span className="text-xs font-medium text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                Sorted by distance from your location
              </span>
            )}
          </div>

          {filteredDestinations.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-stone-200">
              <Compass className="w-12 h-12 text-amber-500 mx-auto mb-3 opacity-60" />
              <h3 className="font-bold text-lg text-stone-800 mb-1">No destinations found</h3>
              <p className="text-stone-500 text-xs mb-4">Try clearing your search query or switching regions.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedRegion('All Regions');
                  setSelectedCategory('All Categories');
                }}
                className="px-4 py-2 bg-stone-900 text-white rounded-xl text-xs font-bold"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredDestinations.map((dest) => {
                const distanceKm = userCoords
                  ? calculateDistanceKm(
                      userCoords.lat,
                      userCoords.lng,
                      dest.coordinates.lat,
                      dest.coordinates.lng
                    )
                  : null;

                return (
                  <div
                    key={dest.id}
                    className="bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col group"
                  >
                    {/* Image Header with Badges */}
                    <div className="relative h-60 w-full overflow-hidden bg-stone-100">
                      <Image
                        src={dest.image}
                        alt={dest.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                      {/* District & Category Badge */}
                      <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                        <span className="px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md text-amber-400 text-xs font-bold">
                          {dest.district} District
                        </span>
                        <span className="px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-md text-stone-900 text-[11px] font-bold">
                          {dest.category}
                        </span>
                      </div>

                      {/* Distance pill (if geolocation available) */}
                      {distanceKm !== null && (
                        <div className="absolute top-4 right-4 bg-blue-600 text-white text-[11px] font-extrabold px-2.5 py-1 rounded-md shadow-md flex items-center gap-1">
                          <Navigation className="w-3 h-3" />
                          {distanceKm} km away
                        </div>
                      )}

                      {/* Title on Image */}
                      <div className="absolute bottom-3 left-4 right-4">
                        <div className="text-[11px] text-amber-300 font-semibold mb-0.5">
                          {dest.odiaName}
                        </div>
                        <h3 className="font-serif text-xl font-bold text-white leading-snug drop-shadow-md">
                          {dest.name}
                        </h3>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                        {dest.description}
                      </p>

                      {/* Real Pricing & Timing Strip */}
                      <div className="bg-stone-50 p-3.5 rounded-2xl border border-stone-200/80 space-y-2 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-stone-500 font-medium">Entry Ticket:</span>
                          <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            {dest.entryFee.indian}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-stone-500 font-medium">Timings:</span>
                          <span className="font-semibold text-stone-800">{dest.timings}</span>
                        </div>
                      </div>

                      {/* Transit Quick Links */}
                      <div className="border-t border-stone-100 pt-3 space-y-1.5 text-xs text-stone-600">
                        <div className="flex items-center gap-2">
                          <Plane className="w-3.5 h-3.5 text-amber-600" />
                          <span className="truncate">
                            Airport: {dest.transit.nearestAirport.code} ({dest.transit.nearestAirport.distanceKm} km)
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Train className="w-3.5 h-3.5 text-blue-600" />
                          <span className="truncate">
                            Railway: {dest.transit.nearestRailway.station} ({dest.transit.nearestRailway.distanceKm} km)
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Hotel className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="truncate">
                            Stay: {dest.nearbyHotels[0]?.name} (₹{dest.nearbyHotels[0]?.pricePerNightInr}/nt)
                          </span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="pt-2 flex items-center gap-2">
                        <button
                          onClick={() => {
                            setActiveModalDest(dest);
                            setSelectedDestination(dest);
                          }}
                          className="flex-1 py-3 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                        >
                          <span>Full Guide & Transit</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                        <a
                          href={dest.googleMapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Open Google Maps Directions"
                          className="p-3 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 transition-all flex items-center justify-center cursor-pointer"
                        >
                          <Navigation className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>

      {/* Comprehensive Destination Detail Modal */}
      {activeModalDest && (() => {
        const destMedia = getDestinationMedia(activeModalDest.id);
        const galleryList = destMedia?.gallery || (
          activeModalDest.gallery && activeModalDest.gallery.length > 0
            ? activeModalDest.gallery.map((g, i) => ({ url: g, caption: `${activeModalDest.name} - View ${i + 1}` }))
            : [{ url: activeModalDest.image, caption: activeModalDest.name }]
        );
        const safePhotoIdx = Math.min(activePhotoIdx, galleryList.length - 1);
        const activePhoto = galleryList[safePhotoIdx] || galleryList[0];

        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 overflow-y-auto">
            <div className="relative bg-white w-full max-w-4xl max-h-[92vh] rounded-3xl overflow-y-auto shadow-2xl border border-stone-200">
              
              {/* Interactive Multi-Photo Gallery Header (7 to 10 Photos) */}
              <div className="relative h-80 sm:h-96 md:h-[420px] w-full overflow-hidden bg-stone-950 group">
                <Image
                  src={activePhoto.url}
                  alt={activePhoto.caption || activeModalDest.name}
                  fill
                  className="object-cover transition-all duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-transparent" />
                
                {/* Close Button */}
                <button
                  onClick={() => setActiveModalDest(null)}
                  className="absolute top-4 right-4 p-2.5 rounded-full bg-black/70 text-white hover:bg-black/90 transition-all cursor-pointer z-20 shadow-md"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Gallery Slide Controls (Next / Prev) */}
                {galleryList.length > 1 && (
                  <>
                    <button
                      onClick={() => setActivePhotoIdx((prev) => (prev === 0 ? galleryList.length - 1 : prev - 1))}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-amber-600 text-white transition-all cursor-pointer z-20 shadow-lg"
                      title="Previous Photo"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setActivePhotoIdx((prev) => (prev === galleryList.length - 1 ? 0 : prev + 1))}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-amber-600 text-white transition-all cursor-pointer z-20 shadow-lg"
                      title="Next Photo"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                {/* Photo Counter Pill & District Badge */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
                  <span className="px-3 py-1 rounded-md bg-amber-500 text-stone-950 font-black text-xs uppercase tracking-wider shadow-md">
                    {activeModalDest.district} District
                  </span>
                  <span className="px-3 py-1 rounded-md bg-black/75 backdrop-blur-md text-amber-300 font-bold text-xs flex items-center gap-1.5 shadow-md">
                    <Camera className="w-3.5 h-3.5" />
                    Photo {safePhotoIdx + 1} of {galleryList.length}
                  </span>
                </div>

                {/* Bottom Overlay Title & Caption */}
                <div className="absolute bottom-4 left-4 right-4 text-white z-10">
                  <div className="text-xs font-bold text-amber-400 mb-0.5">
                    {activeModalDest.odiaName}
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-black mb-1 drop-shadow-md">
                    {activeModalDest.name}
                  </h2>
                  <div className="inline-block bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg text-xs text-stone-200 border border-white/10 max-w-full truncate">
                    📷 {activePhoto.caption}
                  </div>
                </div>
              </div>

              {/* 7 to 10 Thumbnails Strip */}
              {galleryList.length > 1 && (
                <div className="bg-stone-900 px-4 py-3 border-b border-stone-800">
                  <div className="flex items-center gap-2.5 overflow-x-auto hide-scrollbar pb-1">
                    {galleryList.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActivePhotoIdx(idx)}
                        className={`relative w-16 h-12 rounded-xl overflow-hidden flex-shrink-0 transition-all cursor-pointer border-2 ${
                          safePhotoIdx === idx
                            ? 'border-amber-400 scale-105 shadow-md shadow-amber-500/30'
                            : 'border-transparent opacity-60 hover:opacity-100'
                        }`}
                      >
                        <Image
                          src={item.url}
                          alt={item.caption}
                          fill
                          className="object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Modal Body */}
              <div className="p-6 md:p-8 space-y-8 text-stone-800">
                
                {/* Famous For & Quick Highlights Strip */}
                {destMedia?.famousFor && (
                  <div className="p-4 bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-transparent rounded-2xl border border-amber-300 flex items-start gap-3">
                    <div className="p-2 bg-amber-500 text-stone-950 rounded-xl font-bold">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-black text-amber-900 uppercase tracking-wider mb-0.5">
                        Famous For
                      </div>
                      <p className="text-sm font-semibold text-stone-900 leading-snug">
                        {destMedia.famousFor}
                      </p>
                      {destMedia.bestTime && (
                        <div className="text-xs text-amber-800 font-medium mt-1 flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" /> Best Time: {destMedia.bestTime}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Main Attractions Checklist (from prompt) */}
                {destMedia?.mainAttractions && destMedia.mainAttractions.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="font-serif text-xl font-bold text-stone-900 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      Main Attractions in {activeModalDest.name}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                      {destMedia.mainAttractions.map((attraction, idx) => (
                        <div
                          key={idx}
                          className="p-3 bg-stone-50 rounded-xl border border-stone-200/90 text-xs font-bold text-stone-800 flex items-center gap-2 hover:bg-amber-50 hover:border-amber-300 transition-colors"
                        >
                          <span className="w-2 h-2 rounded-full bg-amber-500 flex-shrink-0" />
                          <span className="truncate">{attraction}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* About & Entry Fees */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2 space-y-4">
                    <h3 className="font-serif text-xl font-bold text-stone-900">About this Destination</h3>
                    <p className="text-sm text-stone-600 leading-relaxed">
                      {activeModalDest.description}
                    </p>
                    <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200">
                      <div className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                        <Award className="w-4 h-4 text-amber-700" /> Cultural & Historical Significance
                      </div>
                      <p className="text-xs text-amber-950/80 leading-relaxed">
                        {activeModalDest.significance}
                      </p>
                    </div>
                  </div>

                  {/* Real Entry Ticket & Timings Box */}
                  <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200 space-y-3.5">
                    <h4 className="font-bold text-sm text-stone-900 border-b border-stone-200 pb-2">
                      Entry Fees & Timings
                    </h4>
                    <div>
                      <span className="text-xs text-stone-500 block">Indian Citizens:</span>
                      <span className="text-sm font-bold text-stone-900">{activeModalDest.entryFee.indian}</span>
                    </div>
                    <div>
                      <span className="text-xs text-stone-500 block">Foreign Visitors:</span>
                      <span className="text-sm font-bold text-stone-900">{activeModalDest.entryFee.foreigner}</span>
                    </div>
                    <div>
                      <span className="text-xs text-stone-500 block">Photography / Camera:</span>
                      <span className="text-xs font-semibold text-stone-700">{activeModalDest.entryFee.camera}</span>
                    </div>
                    <div>
                      <span className="text-xs text-stone-500 block">Open Timings:</span>
                      <span className="text-xs font-semibold text-stone-700">{activeModalDest.timings}</span>
                    </div>
                    <div>
                      <span className="text-xs text-stone-500 block">Best Season:</span>
                      <span className="text-xs font-semibold text-amber-800">{activeModalDest.bestTimeToVisit}</span>
                    </div>
                    {activeModalDest.entryFee.additionalInfo && (
                      <div className="pt-2 border-t border-stone-200 text-[11px] text-stone-500 italic">
                        ℹ️ {activeModalDest.entryFee.additionalInfo}
                      </div>
                    )}
                  </div>
                </div>

                {/* Transit & How to Reach Section */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif text-xl font-bold text-stone-900 flex items-center gap-2">
                      <Navigation className="w-5 h-5 text-amber-600" />
                      How to Travel (Flight, Train, Bus & Road with Exact Fares)
                    </h3>
                    <a
                      href={activeModalDest.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-amber-700 hover:underline flex items-center gap-1"
                    >
                      <span>Navigate via Google Maps</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Flight */}
                    <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex items-start gap-3">
                      <div className="p-2.5 bg-amber-100 text-amber-800 rounded-xl">
                        <Plane className="w-5 h-5" />
                      </div>
                      <div className="flex-1 text-xs">
                        <div className="font-bold text-stone-900 text-sm">Nearest Airport</div>
                        <div className="text-stone-600 mt-0.5">{activeModalDest.transit.nearestAirport.name} ({activeModalDest.transit.nearestAirport.code})</div>
                        <div className="text-stone-500 mt-1 flex items-center gap-3">
                          <span>Distance: <b>{activeModalDest.transit.nearestAirport.distanceKm} km</b></span>
                          <span>Taxi Fare: <b>~₹{activeModalDest.transit.nearestAirport.taxiFareInr}</b></span>
                        </div>
                      </div>
                    </div>

                    {/* Train */}
                    <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex items-start gap-3">
                      <div className="p-2.5 bg-blue-100 text-blue-800 rounded-xl">
                        <Train className="w-5 h-5" />
                      </div>
                      <div className="flex-1 text-xs">
                        <div className="font-bold text-stone-900 text-sm">Nearest Railway Station</div>
                        <div className="text-stone-600 mt-0.5">{activeModalDest.transit.nearestRailway.station} ({activeModalDest.transit.nearestRailway.code})</div>
                        <div className="text-stone-500 mt-1 flex items-center gap-3">
                          <span>Distance: <b>{activeModalDest.transit.nearestRailway.distanceKm} km</b></span>
                          <span>Transfer Fare: <b>~₹{activeModalDest.transit.nearestRailway.fareInr}</b></span>
                        </div>
                      </div>
                    </div>

                    {/* Bus */}
                    <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex items-start gap-3">
                      <div className="p-2.5 bg-emerald-100 text-emerald-800 rounded-xl">
                        <Bus className="w-5 h-5" />
                      </div>
                      <div className="flex-1 text-xs">
                        <div className="font-bold text-stone-900 text-sm">Bus & Roadways</div>
                        <div className="text-stone-600 mt-0.5">{activeModalDest.transit.busConnectivity.route}</div>
                        <div className="text-stone-500 mt-1 flex items-center gap-3">
                          <span>Ticket Fare: <b>~₹{activeModalDest.transit.busConnectivity.fareInr}</b></span>
                          <span>Frequency: <b>{activeModalDest.transit.busConnectivity.frequency}</b></span>
                        </div>
                      </div>
                    </div>

                    {/* Road */}
                    <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex items-start gap-3">
                      <div className="p-2.5 bg-purple-100 text-purple-800 rounded-xl">
                        <Car className="w-5 h-5" />
                      </div>
                      <div className="flex-1 text-xs">
                        <div className="font-bold text-stone-900 text-sm">Highway Driving Route</div>
                        <div className="text-stone-600 mt-0.5">{activeModalDest.transit.roadDrive.highway}</div>
                        <div className="text-stone-500 mt-1">
                          Popular: {activeModalDest.transit.roadDrive.popularRoute}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Nearby Recommended Hotels */}
                <div className="space-y-4">
                  <h3 className="font-serif text-xl font-bold text-stone-900 flex items-center gap-2">
                    <Hotel className="w-5 h-5 text-amber-600" />
                    Nearby Hotels & Eco Resorts
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {activeModalDest.nearbyHotels.map((hotel, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex gap-4 items-center"
                      >
                        <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-stone-200">
                          <Image src={hotel.image} alt={hotel.name} fill className="object-cover" referrerPolicy="no-referrer" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 mb-1">
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-100 text-amber-900">
                              {hotel.category}
                            </span>
                            <span className="text-xs font-bold text-stone-800 flex items-center gap-0.5 ml-auto">
                              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" /> {hotel.rating}
                            </span>
                          </div>
                          <h4 className="font-bold text-xs text-stone-900 truncate">{hotel.name}</h4>
                          <div className="text-[11px] text-stone-500 mb-2">
                            {hotel.distanceKm} km from destination
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-extrabold text-amber-900">
                              ₹{hotel.pricePerNightInr.toLocaleString('en-IN')}{' '}
                              <span className="font-normal text-stone-500 text-[10px]">/ night</span>
                            </span>
                            <button
                              onClick={() => handleBookHotel(hotel.name, hotel.pricePerNightInr)}
                              className="px-3 py-1 bg-stone-900 hover:bg-stone-800 text-white text-[11px] font-bold rounded-lg cursor-pointer transition-all"
                            >
                              Book Stay
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Insider Travel Tips */}
                <div className="p-5 bg-stone-900 text-white rounded-2xl space-y-2">
                  <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" /> Vision X Insider Tips for Visitors
                  </div>
                  <ul className="text-xs text-stone-300 space-y-1.5 list-disc pl-4">
                    {activeModalDest.travelTips.map((tip, idx) => (
                      <li key={idx}>{tip}</li>
                    ))}
                  </ul>
                </div>

              </div>
            </div>
          </div>
        );
      })()}

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        itemName={checkoutItem.name}
        price={checkoutItem.price}
      />
    </div>
  );
}
