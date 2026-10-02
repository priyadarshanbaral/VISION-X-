import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { TouristDestination } from '../data/odishaDestinations';
import { MapPin, Navigation, Compass, ExternalLink, Info, Loader2 } from 'lucide-react';

interface MapProps {
  destinations: TouristDestination[];
  selectedDestination: TouristDestination | null;
  onSelectDestination: (dest: TouristDestination) => void;
  userCoords: { lat: number; lng: number } | null;
  onLocateMe: () => void;
  locating: boolean;
}

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'Temples & Spiritual':
      return { bg: '#f59e0b', border: '#b45309', label: 'Temple' }; // Amber
    case 'Wildlife & Biosphere':
      return { bg: '#10b981', border: '#047857', label: 'Wildlife' }; // Emerald
    case 'Beaches & Lakes':
      return { bg: '#0284c7', border: '#0369a1', label: 'Beach' }; // Sky
    case 'Hill Stations & Waterfalls':
      return { bg: '#8b5cf6', border: '#6d28d9', label: 'Hill' }; // Purple
    case 'Buddhist Circuit':
      return { bg: '#ec4899', border: '#be185d', label: 'Buddhist' }; // Pink
    default:
      return { bg: '#ea580c', border: '#c2410c', label: 'Heritage' }; // Orange
  }
};

export default function OdishaInteractiveMap({
  destinations,
  selectedDestination,
  onSelectDestination,
  userCoords,
  onLocateMe,
  locating
}: MapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const userMarkerRef = useRef<L.Marker | null>(null);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      // Centered on Odisha (latitude: ~20.5, longitude: ~84.5)
      const map = L.map(mapContainerRef.current, {
        center: [20.4, 85.0],
        zoom: 7,
        zoomControl: true,
        scrollWheelZoom: true,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18,
      }).addTo(map);

      markersLayerRef.current = L.layerGroup().addTo(map);
      mapInstanceRef.current = map;
    }

    return () => {
      // Cleanup on unmount
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update Markers when destinations or selection changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    const markersLayer = markersLayerRef.current;
    if (!map || !markersLayer) return;

    markersLayer.clearLayers();

    destinations.forEach((dest) => {
      const colors = getCategoryColor(dest.category);
      const isSelected = selectedDestination?.id === dest.id;

      // Custom DivIcon with modern styling
      const customIcon = L.divIcon({
        className: 'custom-map-marker',
        html: `
          <div style="
            background: ${colors.bg};
            border: 3px solid ${isSelected ? '#ffffff' : colors.border};
            width: ${isSelected ? '36px' : '28px'};
            height: ${isSelected ? '36px' : '28px'};
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #ffffff;
            font-weight: 900;
            font-size: ${isSelected ? '12px' : '10px'};
            box-shadow: 0 4px 12px rgba(0,0,0,0.35);
            transition: all 0.2s ease;
            transform: ${isSelected ? 'scale(1.15)' : 'scale(1)'};
            cursor: pointer;
          ">
            <span>●</span>
          </div>
        `,
        iconSize: [isSelected ? 36 : 28, isSelected ? 36 : 28],
        iconAnchor: [isSelected ? 18 : 14, isSelected ? 18 : 14],
        popupAnchor: [0, -18],
      });

      const marker = L.marker([dest.coordinates.lat, dest.coordinates.lng], { icon: customIcon });

      // Rich interactive popup
      const popupContent = `
        <div style="font-family: inherit; width: 240px; padding: 2px;">
          <div style="position: relative; height: 110px; border-radius: 8px; overflow: hidden; margin-bottom: 8px;">
            <img src="${dest.image}" alt="${dest.name}" style="width: 100%; height: 100%; object-fit: cover;" />
            <div style="position: absolute; top: 6px; left: 6px; background: rgba(0,0,0,0.75); color: #fbbf24; font-size: 10px; font-weight: bold; padding: 2px 6px; border-radius: 4px;">
              ${dest.district}
            </div>
          </div>
          <div style="font-size: 13px; font-weight: bold; color: #1c1917; margin-bottom: 2px; line-height: 1.2;">
            ${dest.name}
          </div>
          <div style="font-size: 11px; color: #78716c; margin-bottom: 6px;">
            ${dest.odiaName}
          </div>
          <div style="display: flex; align-items: center; justify-content: space-between; font-size: 11px; margin-bottom: 8px; background: #f5f5f4; padding: 4px 6px; border-radius: 6px;">
            <span style="font-weight: 600; color: #292524;">Entry: ${dest.entryFee.indian}</span>
            <span style="color: #0284c7; font-weight: 600;">${dest.transit.nearestRailway.station.split(' ')[0]} stn</span>
          </div>
          <div style="display: flex; gap: 4px;">
            <a href="${dest.googleMapsUrl}" target="_blank" rel="noopener noreferrer" style="flex: 1; text-align: center; background: #ea580c; color: white; padding: 5px 0; border-radius: 6px; font-size: 11px; font-weight: bold; text-decoration: none; display: flex; align-items: center; justify-content: center; gap: 4px;">
              <span>Directions</span>
            </a>
          </div>
        </div>
      `;

      marker.bindPopup(popupContent);

      marker.on('click', () => {
        onSelectDestination(dest);
      });

      markersLayer.addLayer(marker);
    });

    // Fly to selected destination if set
    if (selectedDestination) {
      map.flyTo([selectedDestination.coordinates.lat, selectedDestination.coordinates.lng], 10, {
        duration: 1.2,
      });
    }
  }, [destinations, selectedDestination, onSelectDestination]);

  // Update User Location Marker
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (userCoords) {
      if (userMarkerRef.current) {
        userMarkerRef.current.setLatLng([userCoords.lat, userCoords.lng]);
      } else {
        const userIcon = L.divIcon({
          className: 'user-location-marker',
          html: `
            <div style="
              background: #2563eb;
              border: 3px solid #ffffff;
              width: 22px;
              height: 22px;
              border-radius: 50%;
              box-shadow: 0 0 0 6px rgba(37,99,235,0.35);
              animation: pulse 2s infinite;
            "></div>
          `,
          iconSize: [22, 22],
          iconAnchor: [11, 11],
        });

        userMarkerRef.current = L.marker([userCoords.lat, userCoords.lng], { icon: userIcon })
          .bindPopup('<b>Your Current Location</b><br />Calculating nearest Odisha tourist wonders!')
          .addTo(map);
      }

      map.flyTo([userCoords.lat, userCoords.lng], 8, { duration: 1.5 });
    }
  }, [userCoords]);

  return (
    <div className="relative w-full h-[520px] rounded-3xl overflow-hidden border border-stone-200 shadow-xl bg-stone-100">
      <div ref={mapContainerRef} className="w-full h-full z-10" />

      {/* Map Floating Controls & Legend */}
      <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
        <button
          onClick={onLocateMe}
          disabled={locating}
          className="flex items-center gap-2 px-3.5 py-2.5 bg-white/95 backdrop-blur-md rounded-2xl shadow-lg border border-stone-200 text-xs font-bold text-stone-800 hover:text-amber-700 hover:bg-white active:scale-95 transition-all cursor-pointer"
        >
          {locating ? (
            <Loader2 className="w-4 h-4 text-amber-600 animate-spin" />
          ) : (
            <Navigation className="w-4 h-4 text-blue-600" />
          )}
          <span>{userCoords ? 'Update My Location' : 'Locate Me (Live Distances)'}</span>
        </button>
      </div>

      {/* Legend Badge Bar */}
      <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-2 p-3 bg-stone-950/85 backdrop-blur-md rounded-2xl border border-white/10 text-white text-[11px]">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-bold text-amber-400 flex items-center gap-1">
            <Compass className="w-3.5 h-3.5" /> Interactive Map:
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" /> Temples
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" /> Wildlife
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-500 inline-block" /> Beaches/Lakes
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500 inline-block" /> Hills/Falls
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-pink-500 inline-block" /> Buddhist
          </span>
        </div>
        <span className="text-[10px] text-stone-400">
          Showing {destinations.length} Verified Destinations
        </span>
      </div>
    </div>
  );
}
