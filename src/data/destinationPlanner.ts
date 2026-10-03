import { ODISHA_CUISINE } from './odishaData.js';
import { ODISHA_ALL_DESTINATIONS } from './odishaDestinations.js';
import type { TouristDestination } from './odishaDestinations.js';

export interface DestinationActivity {
  time: string;
  title: string;
  description: string;
  location: string;
  type: 'attraction' | 'food' | 'craft' | 'transport';
  transportBookingAvailable?: boolean;
}

export interface DestinationItineraryDay {
  date: string;
  dayTheme: string;
  weather: string;
  activities: DestinationActivity[];
}

function parseDate(value: string | undefined, fallback: Date): Date {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return fallback;
  const date = new Date(`${value}T12:00:00`);
  return Number.isNaN(date.getTime()) ? fallback : date;
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).format(date);
}

function distanceKm(from: TouristDestination, to: TouristDestination): number {
  const toRadians = (degrees: number) => degrees * Math.PI / 180;
  const latitudeDelta = toRadians(to.coordinates.lat - from.coordinates.lat);
  const longitudeDelta = toRadians(to.coordinates.lng - from.coordinates.lng);
  const haversine = Math.sin(latitudeDelta / 2) ** 2
    + Math.cos(toRadians(from.coordinates.lat))
    * Math.cos(toRadians(to.coordinates.lat))
    * Math.sin(longitudeDelta / 2) ** 2;
  return 6371 * 2 * Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine));
}

function getNearbyDestinations(destination: TouristDestination): TouristDestination[] {
  return ODISHA_ALL_DESTINATIONS
    .filter(item => item.id !== destination.id && distanceKm(destination, item) <= 120)
    .sort((a, b) => distanceKm(destination, a) - distanceKm(destination, b))
    .slice(0, 6);
}

function getLocalFood(destination: TouristDestination): string {
  const district = destination.district.toLowerCase();
  const dish = ODISHA_CUISINE.find(item =>
    `${item.origin} ${item.mustTrySpot}`.toLowerCase().includes(district)
  );
  return dish
    ? `${dish.name}: ${dish.description} Ask locally about current availability and price.`
    : 'Try a local Odia meal such as rice, dalma, and seasonal vegetables; ask your host which regional dishes are in season.';
}

function createDayPlan(
  destination: TouristDestination,
  focalDestination: TouristDestination,
  dayIndex: number,
  travelMode: 'own' | 'app'
): Omit<DestinationItineraryDay, 'date'> {
  const nearestRail = destination.transit.nearestRailway;
  const tip = destination.travelTips[dayIndex % Math.max(destination.travelTips.length, 1)];
  const activities: DestinationActivity[] = [
    {
      time: '07:30 AM',
      title: travelMode === 'own' ? 'Breakfast and start your day by road' : 'Arrange your local transfer',
      description: travelMode === 'own'
        ? `Start from your stay with water and sun protection. Use the listed route as a guide and check current road conditions.`
        : `The listed rail gateway is ${nearestRail.station}. Arrange onward ${nearestRail.mode.toLowerCase()} locally and confirm current services and fares.`,
      location: `${destination.district}, Odisha`,
      type: 'transport',
      transportBookingAvailable: travelMode === 'app'
    },
    {
      time: '09:00 AM',
      title: `Visit ${focalDestination.name}`,
      description: `${focalDestination.description} ${focalDestination.significance} Check local access, ticketing, and opening status before setting out.`,
      location: `${focalDestination.district}, Odisha`,
      type: 'attraction'
    },
    {
      time: '01:00 PM',
      title: `Local Odia lunch near ${focalDestination.name}`,
      description: getLocalFood(focalDestination),
      location: focalDestination.district,
      type: 'food'
    }
  ];

  if (tip) {
    activities.push({
      time: '03:30 PM',
      title: dayIndex === 0 ? 'Use a local travel tip for your afternoon' : 'Explore at an unhurried pace',
      description: `${tip} Confirm access and travel time locally; skip this stop if it makes the route rushed.`,
      location: focalDestination.name,
      type: 'attraction'
    });
  }

  activities.push({
    time: '05:30 PM',
    title: 'Return to your stay and plan the next day',
    description: `Keep time for rest and confirm tomorrow's opening hours, local transport, and weather. Best time to visit ${destination.name}: ${destination.bestTimeToVisit}.`,
    location: destination.district,
    type: 'transport'
  });

  return {
    dayTheme: dayIndex === 0
      ? `${destination.name} • local highlights`
      : `${focalDestination.name} • nearby Odisha discovery`,
    weather: 'Check the local forecast before travel',
    activities
  };
}

export function createDestinationItinerary(
  destinationId: string,
  dateFrom?: string,
  dateTo?: string,
  travelMode: 'own' | 'app' = 'app'
): DestinationItineraryDay[] {
  const destination = ODISHA_ALL_DESTINATIONS.find(item => item.id === destinationId)
    ?? ODISHA_ALL_DESTINATIONS.find(item => item.name === destinationId);

  if (!destination) return [];

  const today = new Date();
  const startDate = parseDate(dateFrom, today);
  const endDate = parseDate(dateTo, startDate);
  const tripDays = Math.min(
    7,
    Math.max(1, Math.floor((endDate.getTime() - startDate.getTime()) / 86_400_000) + 1)
  );
  const nearbyDestinations = getNearbyDestinations(destination);

  return Array.from({ length: tripDays }, (_, index) => {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + index);
    const focalDestination = index === 0 || nearbyDestinations.length === 0
      ? destination
      : nearbyDestinations[(index - 1) % nearbyDestinations.length];

    return {
      ...createDayPlan(destination, focalDestination, index, travelMode),
      date: formatDate(date)
    };
  });
}
