export interface ChilikaActivity {
  time: string;
  title: string;
  description: string;
  location: string;
  type: 'attraction' | 'food' | 'craft' | 'transport';
  transportBookingAvailable?: boolean;
}

export interface ChilikaItineraryDay {
  date: string;
  dayTheme: string;
  weather: string;
  activities: ChilikaActivity[];
}

const DAY_PLANS: Omit<ChilikaItineraryDay, 'date'>[] = [
  {
    dayTheme: 'Satapada • Irrawaddy dolphins and the sea mouth',
    weather: 'Coastal conditions vary; check the local forecast',
    activities: [
      {
        time: '06:30 AM',
        title: 'Reach Satapada and confirm your boat',
        description: 'Stay near Satapada the night before for an easy start. Confirm the boat, permitted route, fare, life jackets, and weather status with an authorized local operator; departures and trip length vary.',
        location: 'Satapada Jetty, Puri district',
        type: 'transport'
      },
      {
        time: '07:00 AM',
        title: 'Morning lagoon boat trip for dolphin watching',
        description: 'Early trips are a good choice for calmer water, but dolphin sightings are never guaranteed. Keep distance, do not feed or chase wildlife, and follow the boat operator and forest staff.',
        location: 'Satapada Dolphin Sanctuary, Chilika Lake',
        type: 'attraction'
      },
      {
        time: '10:30 AM',
        title: 'Sea Mouth and Rajhans Island (if open and included)',
        description: 'Ask whether sea conditions and your approved boat route allow this stop. Do not cross sandbars or enter the Bay of Bengal unless your operator confirms it is safe.',
        location: 'Chilika Sea Mouth / Rajhans Island',
        type: 'attraction'
      },
      {
        time: '01:00 PM',
        title: 'Fresh lagoon lunch',
        description: 'Try a seasonal Chilika fish, prawn, or crab preparation, or ask for a vegetarian Odia meal. Confirm the catch, price, and preparation before ordering.',
        location: 'Satapada waterfront',
        type: 'food'
      },
      {
        time: '04:00 PM',
        title: 'Unhurried lakeside evening',
        description: 'Keep the late afternoon flexible for rest, a short village walk, or a sunset view from shore. Avoid booking a second boat trip if the first runs late.',
        location: 'Satapada lakeshore',
        type: 'attraction'
      }
    ]
  },
  {
    dayTheme: 'Barkul • Kalijai Island and the eastern lagoon',
    weather: 'Check local lake and boat conditions before departure',
    activities: [
      {
        time: '07:30 AM',
        title: 'Transfer to Barkul and check in',
        description: 'Satapada and Barkul are on different shores: plan this leg by road and allow several hours. Do not assume there is a direct public ferry between the two bases.',
        location: 'Satapada to Barkul, Chilika Lake',
        type: 'transport'
      },
      {
        time: '12:00 PM',
        title: 'Odia lunch with a lake-side view',
        description: 'Choose a local fish or prawn meal, or ask for dalma, rice, and seasonal vegetables. Check restaurant opening hours outside peak season.',
        location: 'Barkul / Rambha lakeshore',
        type: 'food'
      },
      {
        time: '02:00 PM',
        title: 'Boat excursion to Kalijai Island',
        description: 'Use an authorized boat from the local jetty and confirm island access, return time, life jackets, and weather before departure. The shrine is an active place of worship; dress respectfully.',
        location: 'Barkul Jetty and Kalijai Island',
        type: 'attraction'
      },
      {
        time: '04:30 PM',
        title: 'Lagoon viewpoints and sunset',
        description: 'Return to shore before the operator’s last departure. Enjoy the changing light from a lakeside viewpoint rather than extending a boat trip into poor visibility.',
        location: 'Barkul lakeshore',
        type: 'attraction'
      }
    ]
  },
  {
    dayTheme: 'Mangalajodi • community-guided birding',
    weather: 'Birding is best in the cool season; conditions vary',
    activities: [
      {
        time: '06:00 AM',
        title: 'Early birding with a local guide',
        description: 'Plan this as a separate road excursion from your chosen base. November to February is generally the strongest migratory-bird season; sightings vary, and access is subject to local rules.',
        location: 'Mangalajodi Wetlands, Khordha district',
        type: 'attraction'
      },
      {
        time: '09:30 AM',
        title: 'Breakfast and a break after the boat ride',
        description: 'Return to shore for breakfast and warm up after the early start. Keep noise low around wetland habitat and follow your guide’s instructions.',
        location: 'Mangalajodi village',
        type: 'food'
      },
      {
        time: '11:00 AM',
        title: 'Explore the wetland edge at a gentle pace',
        description: 'Ask a community guide about seasonal wildlife and local conservation. Avoid approaching nests, handling wildlife, or using flash photography.',
        location: 'Mangalajodi wetland trails',
        type: 'attraction'
      },
      {
        time: '01:00 PM',
        title: 'Local lunch and return to your base',
        description: 'Have a simple local meal, then allow a relaxed road transfer back to your hotel. Birding access and boat availability should be confirmed locally.',
        location: 'Mangalajodi village / your lake-side base',
        type: 'food'
      }
    ]
  },
  {
    dayTheme: 'Flexible lake morning • local stop and departure',
    weather: 'Check the forecast before setting out',
    activities: [
      {
        time: '07:30 AM',
        title: 'Choose a relaxed shore-side morning',
        description: 'Use this extra day to revisit the shore closest to your hotel, rest, or arrange a short local outing. Avoid repeating a long boat route without checking conditions.',
        location: 'Your chosen Chilika base',
        type: 'attraction'
      },
      {
        time: '10:00 AM',
        title: 'Breakfast and pack for the road',
        description: 'Ask your hotel to confirm the onward transfer time. Keep water, sun protection, and any medicines accessible during the drive.',
        location: 'Your hotel',
        type: 'food'
      },
      {
        time: '12:00 PM',
        title: 'Depart with a road-transfer buffer',
        description: 'Allow extra time for the return drive to Puri or Bhubaneswar. Recheck road and weather conditions on the day.',
        location: 'Chilika to your onward destination',
        type: 'transport'
      }
    ]
  }
];

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

export function createChilikaItinerary(
  dateFrom?: string,
  dateTo?: string
): ChilikaItineraryDay[] {
  const today = new Date();
  const startDate = parseDate(dateFrom, today);
  const endDate = parseDate(dateTo, startDate);
  const tripDays = Math.min(
    7,
    Math.max(1, Math.floor((endDate.getTime() - startDate.getTime()) / 86_400_000) + 1)
  );

  return Array.from({ length: tripDays }, (_, index) => {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + index);
    const plan = DAY_PLANS[Math.min(index, DAY_PLANS.length - 1)];
    return { ...plan, date: formatDate(date) };
  });
}
