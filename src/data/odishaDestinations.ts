export interface DestinationTransit {
  nearestAirport: {
    name: string;
    code: string;
    distanceKm: number;
    taxiFareInr: number;
    approxTime: string;
  };
  nearestRailway: {
    station: string;
    code: string;
    distanceKm: number;
    fareInr: number;
    mode: string;
  };
  busConnectivity: {
    route: string;
    frequency: string;
    fareInr: number;
    operators: string;
  };
  roadDrive: {
    highway: string;
    popularRoute: string;
    tollInfo: string;
  };
}

export interface DestinationHotel {
  name: string;
  category: 'Luxury Heritage' | 'Eco Resort' | 'Comfort Hotel' | 'OTDC Panthanivas';
  distanceKm: number;
  pricePerNightInr: number;
  rating: number;
  image: string;
  highlights: string[];
}

export interface TouristDestination {
  id: string;
  name: string;
  odiaName: string;
  tagline: string;
  district: string;
  region: 'Coastal Odisha' | 'North & Similipal' | 'Central & Cuttack' | 'Southern Highlands' | 'Western Odisha' | 'Diamond Triangle';
  category: 'Temples & Spiritual' | 'Wildlife & Biosphere' | 'Beaches & Lakes' | 'Hill Stations & Waterfalls' | 'Heritage & Forts' | 'Buddhist Circuit';
  image: string;
  gallery: string[];
  description: string;
  significance: string;
  bestTimeToVisit: string;
  timings: string;
  closedOn: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  googleMapsUrl: string;
  entryFee: {
    indian: string;
    foreigner: string;
    camera: string;
    additionalInfo: string;
  };
  transit: DestinationTransit;
  nearbyHotels: DestinationHotel[];
  travelTips: string[];
}

export const ODISHA_ALL_DESTINATIONS: TouristDestination[] = [
  {
    id: 'konark-sun-temple',
    name: 'Konark Sun Temple (Black Pagoda)',
    odiaName: 'କୋଣାର୍କ ସୂର୍ଯ୍ୟ ମନ୍ଦିର',
    tagline: '13th-Century UNESCO World Heritage Chariot of Surya',
    district: 'Puri',
    region: 'Coastal Odisha',
    category: 'Temples & Spiritual',
    image: 'https://media.istockphoto.com/id/1444924249/photo/konark-sun-temple-at-sunrise-konark-temple-is-a-unesco-world-heritage-site-at-puri-odisha.jpg?s=612x612&w=0&k=20&c=5Gd3UDpZeYh8DejD4a4TTrpAZLoPw5SARAUFT7hfwRk=',
    gallery: [
      'https://media.istockphoto.com/id/1444924249/photo/konark-sun-temple-at-sunrise-konark-temple-is-a-unesco-world-heritage-site-at-puri-odisha.jpg?s=612x612&w=0&k=20&c=5Gd3UDpZeYh8DejD4a4TTrpAZLoPw5SARAUFT7hfwRk=',
      'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'A monument of monumental scale, conceived as the celestial chariot of Sun God Surya with 24 carved stone wheels serving as astronomical sundials, pulled by 7 stone stallions. Constructed in 1250 CE by King Narasimhadeva I.',
    significance: 'UNESCO World Heritage Site; pinnacle of Kalinga architectural grandeur and astronomical engineering.',
    bestTimeToVisit: 'October to March (Konark Dance Festival in December)',
    timings: '6:00 AM – 8:00 PM (Daily)',
    closedOn: 'Open 365 Days',
    coordinates: { lat: 19.8876, lng: 86.0945 },
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Konark+Sun+Temple+Odisha',
    entryFee: {
      indian: '₹40 per person',
      foreigner: '₹600 per person (SAARC/BIMSTEC ₹40)',
      camera: 'Still Camera Free; Video/Professional ₹25',
      additionalInfo: 'Free entry for children below 15 years. Light & Sound show: ₹50.'
    },
    transit: {
      nearestAirport: {
        name: 'Biju Patnaik International Airport (Bhubaneswar)',
        code: 'BBI',
        distanceKm: 65,
        taxiFareInr: 1600,
        approxTime: '1 hr 30 mins'
      },
      nearestRailway: {
        station: 'Puri Railway Station',
        code: 'PURI',
        distanceKm: 35,
        fareInr: 150,
        mode: 'Auto / Bus / Taxi'
      },
      busConnectivity: {
        route: 'Bhubaneswar Baramunda to Konark via Pipili or Puri',
        frequency: 'Every 20 minutes',
        fareInr: 75,
        operators: 'Mo Bus Route 70 & OSRTC Superfast'
      },
      roadDrive: {
        highway: 'NH-316 & Puri-Konark Marine Drive Expressway',
        popularRoute: 'Bhubaneswar -> Pipli -> Konark (65 km scenic coastal drive)',
        tollInfo: 'No major toll on Marine Drive'
      }
    },
    nearbyHotels: [
      {
        name: 'Lotus Resort Konark (Ramachandi Beach)',
        category: 'Eco Resort',
        distanceKm: 4.5,
        pricePerNightInr: 5800,
        rating: 4.6,
        image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80',
        highlights: ['Waterfront Cottages', 'Water Sports', 'Ayurvedic Spa']
      },
      {
        name: 'OTDC Panthanivas Konark',
        category: 'OTDC Panthanivas',
        distanceKm: 0.8,
        pricePerNightInr: 2200,
        rating: 4.2,
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80',
        highlights: ['Walking distance to Sun Temple', 'Odia Restaurant', 'Spacious Lawns']
      }
    ],
    travelTips: [
      'Arrive early around 6:30 AM for magical sunrise lighting without tourist crowds.',
      'Hire a licensed ASI guide to explain the 8 Praharas sundial calculations on the wheels.',
      'Pair your visit with Chandrabhaga Blue Flag Beach 3 km away.'
    ]
  },
  {
    id: 'puri-jagannath-temple',
    name: 'Shree Jagannath Temple, Puri',
    odiaName: 'ଶ୍ରୀ ଜଗନ୍ନାଥ ମନ୍ଦିର, ପୁରୀ',
    tagline: 'Holy Char Dham Pilgrimage & Lord of the Universe',
    district: 'Puri',
    region: 'Coastal Odisha',
    category: 'Temples & Spiritual',
    image: 'https://i.pinimg.com/736x/7e/f1/9c/7ef19cc13322d0e8cfd322b7203b8d77.jpg',
    gallery: [
      'https://i.pinimg.com/736x/7e/f1/9c/7ef19cc13322d0e8cfd322b7203b8d77.jpg',
      'https://images.unsplash.com/photo-1628009368231-7bb3cfcb0def?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'One of the four sacred Char Dham Hindu pilgrimage shrines. Consecrated in the 12th century by King Anantavarman Chodaganga Deva, it stands 214 feet high on Grand Road (Bada Danda). Home to Lord Jagannath, Balabhadra, and Devi Subhadra.',
    significance: 'Spiritual heart of Odisha, world-renowned Rath Yatra, and home of the divine 56-item Mahaprasad.',
    bestTimeToVisit: 'October to March (or June/July for Rath Yatra)',
    timings: '5:30 AM (Mangala Alati) – 10:00 PM (Pahuda)',
    closedOn: 'Open 365 Days',
    coordinates: { lat: 19.8049, lng: 85.8179 },
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Shree+Jagannath+Temple+Puri',
    entryFee: {
      indian: 'Free Darshan for all devotees',
      foreigner: 'Only practicing Hindus permitted inside sanctum; others view from Raghunandan Library roof or Srimandir Parikrama',
      camera: 'Mobile phones & Cameras strictly prohibited inside (free lockers outside)',
      additionalInfo: 'Leather belts, wallets, and bags must be deposited at police cloakrooms.'
    },
    transit: {
      nearestAirport: {
        name: 'Biju Patnaik International Airport (Bhubaneswar)',
        code: 'BBI',
        distanceKm: 60,
        taxiFareInr: 1400,
        approxTime: '1 hr 15 mins'
      },
      nearestRailway: {
        station: 'Puri Railway Station (Direct Terminus)',
        code: 'PURI',
        distanceKm: 2.5,
        fareInr: 60,
        mode: 'Auto-rickshaw / E-Rickshaw'
      },
      busConnectivity: {
        route: 'Bhubaneswar Master Canteen to Puri Bada Danda',
        frequency: 'Every 10 minutes',
        fareInr: 80,
        operators: 'Mo Bus Electric AC Route 50 & OSRTC'
      },
      roadDrive: {
        highway: 'NH-316 Four-lane Expressway',
        popularRoute: 'Bhubaneswar -> Sakhigopal -> Puri (60 km smooth highway)',
        tollInfo: 'Toll plaza at Pipili (~₹95)'
      }
    },
    nearbyHotels: [
      {
        name: 'Mayfair Heritage & Waves Puri',
        category: 'Luxury Heritage',
        distanceKm: 2.8,
        pricePerNightInr: 9500,
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=600&q=80',
        highlights: ['Private Beach Access', 'Oceanfront Dining', 'Temple Darshan Assistance']
      },
      {
        name: 'Toshali Sands Ethnic Village Resort',
        category: 'Eco Resort',
        distanceKm: 6.0,
        pricePerNightInr: 4500,
        rating: 4.4,
        image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=600&q=80',
        highlights: ['Ethnic Cottages', 'Balukhand Forest Vicinity', 'Ayurvedic Wellness']
      }
    ],
    travelTips: [
      'Head to Anandabazar at 1:00 PM to partake in the freshly prepared wood-fired Mahaprasad.',
      'Walk along the new 75m wide Srimandir Heritage Corridor for breathtaking views of the Nilachakra.',
      'Witness the evening changing of the Patitapabana flag by agile Sevayats climbing the 214-ft spire.'
    ]
  },
  {
    id: 'lingaraj-temple',
    name: 'Lingaraj Temple, Bhubaneswar',
    odiaName: 'ଶ୍ରୀ ଲିଙ୍ଗରାଜ ମନ୍ଦିର',
    tagline: '11th-Century Architectural Apex of the Temple City',
    district: 'Khurda',
    region: 'Central & Cuttack',
    category: 'Temples & Spiritual',
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4d/Lingaraj_temple_Bhubaneswar.jpg/1920px-Lingaraj_temple_Bhubaneswar.jpg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail&_=20160928072727',
    gallery: [
      'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4d/Lingaraj_temple_Bhubaneswar.jpg/1920px-Lingaraj_temple_Bhubaneswar.jpg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail&_=20160928072727',
      'https://images.unsplash.com/photo-1609137144820-221f1d1982b6?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'The largest temple in Bhubaneswar, dedicated to Harihara (unification of Shiva and Vishnu). Its massive 180-foot deula tower dominates the Old Town landscape beside sacred Bindusagar Lake with 108 subsidiary stone shrines.',
    significance: 'Crown jewel of Kalinga temple architecture built by Somavamsi dynasty kings in the 11th century.',
    bestTimeToVisit: 'October to March (Maha Shivaratri draws tens of thousands of pilgrims)',
    timings: '6:00 AM – 9:00 PM (Daily)',
    closedOn: 'Open 365 Days',
    coordinates: { lat: 20.2382, lng: 85.8338 },
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Lingaraj+Temple+Bhubaneswar',
    entryFee: {
      indian: 'Free Entry',
      foreigner: 'Viewing platform available outside temple perimeter for international visitors',
      camera: 'No cameras or mobile phones allowed inside sanctum compound',
      additionalInfo: 'Shoe stalls and mobile lockers available at Simhadwara.'
    },
    transit: {
      nearestAirport: {
        name: 'Biju Patnaik International Airport',
        code: 'BBI',
        distanceKm: 4.5,
        taxiFareInr: 250,
        approxTime: '15 mins'
      },
      nearestRailway: {
        station: 'Bhubaneswar Main Railway Station',
        code: 'BBS',
        distanceKm: 5.5,
        fareInr: 120,
        mode: 'Auto-rickshaw / Mo Bus'
      },
      busConnectivity: {
        route: 'Mo Bus Route 10 & 20 connecting Airport, Master Canteen to Lingaraj',
        frequency: 'Every 15 minutes',
        fareInr: 20,
        operators: 'Mo Bus (CRUT)'
      },
      roadDrive: {
        highway: 'Old Town Heritage Road',
        popularRoute: 'Via Airport Square -> Gangua -> Bindusagar lakefront',
        tollInfo: 'No toll'
      }
    },
    nearbyHotels: [
      {
        name: 'Welcomhotel by ITC Hotels Bhubaneswar',
        category: 'Luxury Heritage',
        distanceKm: 6.5,
        pricePerNightInr: 7200,
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80',
        highlights: ['5-Star Luxury', 'Odia Thali Restaurant', 'Spa & Pool']
      },
      {
        name: 'OTDC Panthanivas Bhubaneswar',
        category: 'OTDC Panthanivas',
        distanceKm: 3.2,
        pricePerNightInr: 2400,
        rating: 4.1,
        image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=600&q=80',
        highlights: ['Near State Museum', 'Heritage Tour Booking Desk', 'AC Deluxe Rooms']
      }
    ],
    travelTips: [
      'Take a stroll around holy Bindusagar Lake during evening aarti.',
      'Explore nearby Mukteshwar Temple (10th-century gem with arched torana) and Rajarani Temple.',
      'Try the sacred Kora Khai sweet prasad sold right outside the temple gates.'
    ]
  },
  {
    id: 'dhauli-shanti-stupa',
    name: 'Dhauli Giri Shanti Stupa & Ashokan Edicts',
    odiaName: 'ଧଉଳି ଶାନ୍ତି ସ୍ତୂପ',
    tagline: 'Historic Epicenter of the Kalinga War & Emperor Ashoka Epiphany',
    district: 'Khurda',
    region: 'Central & Cuttack',
    category: 'Buddhist Circuit',
    image: 'https://live.staticflickr.com/3903/14897731738_9d737478e9_b.jpg',
    gallery: [
      'https://live.staticflickr.com/3903/14897731738_9d737478e9_b.jpg',
      'https://images.unsplash.com/photo-1590076212574-8b6ee3cf3742?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Perched on Dhauli Hill on the banks of River Daya, this is the battlefield where the fateful Kalinga War (261 BCE) took place. Here Emperor Ashoka had his change of heart from conquest through war to moral conquest through peace (Ahimsa). Features rock-cut Ashokan Edicts and the Peace Pagoda built in 1972.',
    significance: 'Historic pivot of world Buddhism; 3rd century BCE Ashokan rock inscriptions in Brahmi script.',
    bestTimeToVisit: 'October to March (Evenings for Sound & Light Show)',
    timings: '6:00 AM – 7:30 PM (Evening Light & Sound at 6:30 PM & 7:15 PM)',
    closedOn: 'Mondays for Light & Sound Show; Hilltop open daily',
    coordinates: { lat: 20.1923, lng: 85.8394 },
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Dhauli+Shanti+Stupa+Bhubaneswar',
    entryFee: {
      indian: 'Hilltop & Stupa Free',
      foreigner: 'Free',
      camera: 'Free',
      additionalInfo: 'Light & Sound laser show: Adults ₹25, Students ₹10.'
    },
    transit: {
      nearestAirport: {
        name: 'Biju Patnaik International Airport (Bhubaneswar)',
        code: 'BBI',
        distanceKm: 11,
        taxiFareInr: 350,
        approxTime: '25 mins'
      },
      nearestRailway: {
        station: 'Bhubaneswar Station (BBS)',
        code: 'BBS',
        distanceKm: 9.5,
        fareInr: 200,
        mode: 'Cab / Auto'
      },
      busConnectivity: {
        route: 'Mo Bus Route 23 to Dhauli Square + 1.5 km e-rickshaw',
        frequency: 'Every 30 minutes',
        fareInr: 30,
        operators: 'Mo Bus (CRUT)'
      },
      roadDrive: {
        highway: 'NH-316 (Puri Highway) -> Dhauli Link Road',
        popularRoute: 'Bhubaneswar -> Samantarapur -> Dhauli Giri (10 km)',
        tollInfo: 'No toll'
      }
    },
    nearbyHotels: [
      {
        name: 'Mayfair Lagoon Bhubaneswar',
        category: 'Luxury Heritage',
        distanceKm: 12.0,
        pricePerNightInr: 10500,
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80',
        highlights: ['Lagoon Villas', 'Multiple Fine Dining Venues', 'Lush Botanical Grounds']
      },
      {
        name: 'Vamoose Dhauli Heights',
        category: 'Comfort Hotel',
        distanceKm: 1.2,
        pricePerNightInr: 1800,
        rating: 4.1,
        image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=600&q=80',
        highlights: ['Hillside Views', 'Homestyle Odia Food', 'Peaceful Atmosphere']
      }
    ],
    travelTips: [
      'Inspect the rock elephant sculpture at the base, the earliest rock sculpture in Odisha dating to 3rd century BCE.',
      'Stay for the 3D laser mapping show recounting Emperor Ashoka transformation.',
      'Daya River banks offer scenic sunset vistas.'
    ]
  },
  {
    id: 'udayagiri-khandagiri-caves',
    name: 'Udayagiri & Khandagiri Twin Caves',
    odiaName: 'ଉଦୟଗିରି ଓ ଖଣ୍ଡଗିରି ଗୁମ୍ଫା',
    tagline: '2nd-Century BCE Rock-Cut Jain Monasteries of Emperor Kharavela',
    district: 'Khurda',
    region: 'Central & Cuttack',
    category: 'Heritage & Forts',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNl5du90fXLXEyCwso_xIcC8mTnGPrOquKut66ssNZxQ&s=10',
    gallery: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNl5du90fXLXEyCwso_xIcC8mTnGPrOquKut66ssNZxQ&s=10',
      'https://images.unsplash.com/photo-1599818809280-b8000b7a977e?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Partly natural and partly rock-carved caves carved into two adjacent hills, Udayagiri (18 caves) and Khandagiri (15 caves). Commissioned by the Chedi king Emperor Kharavela during the 2nd century BCE to serve as residential retreats for austere Jain ascetics.',
    significance: 'Features the world-renowned 17-line Hathigumpha inscription in Brahmi script, recording Kharavela military and architectural conquests.',
    bestTimeToVisit: 'October to March (Early mornings or late afternoons)',
    timings: '9:00 AM – 6:00 PM (Daily)',
    closedOn: 'Open 365 Days',
    coordinates: { lat: 20.2618, lng: 85.7865 },
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Udayagiri+and+Khandagiri+Caves+Bhubaneswar',
    entryFee: {
      indian: '₹25 per person (ASI Ticket)',
      foreigner: '₹300 per person',
      camera: 'Mobile free; Video Camera ₹25',
      additionalInfo: 'Free entry for children below 15. Khandagiri hill caves have free access.'
    },
    transit: {
      nearestAirport: {
        name: 'Biju Patnaik International Airport (Bhubaneswar)',
        code: 'BBI',
        distanceKm: 6.0,
        taxiFareInr: 250,
        approxTime: '15 mins'
      },
      nearestRailway: {
        station: 'Bhubaneswar Railway Station',
        code: 'BBS',
        distanceKm: 8.5,
        fareInr: 150,
        mode: 'Auto / Taxi'
      },
      busConnectivity: {
        route: 'Mo Bus Route 16 connecting Master Canteen to Khandagiri Square',
        frequency: 'Every 15 minutes',
        fareInr: 25,
        operators: 'Mo Bus (CRUT)'
      },
      roadDrive: {
        highway: 'NH-16 -> Khandagiri Square',
        popularRoute: 'Directly on Kolkata-Chennai Highway within Bhubaneswar city limits',
        tollInfo: 'No toll'
      }
    },
    nearbyHotels: [
      {
        name: 'Trident Bhubaneswar',
        category: 'Luxury Heritage',
        distanceKm: 7.0,
        pricePerNightInr: 8500,
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80',
        highlights: ['14 Acres of Landscaped Gardens', '5-Star Hospitality', 'Pool & Tennis Courts']
      },
      {
        name: 'Ginger Hotel Bhubaneswar',
        category: 'Comfort Hotel',
        distanceKm: 8.5,
        pricePerNightInr: 3200,
        rating: 4.3,
        image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=600&q=80',
        highlights: ['Modern Business Rooms', 'High-Speed WiFi', 'All-Day Dining']
      }
    ],
    travelTips: [
      'Do not miss Cave 1 (Ranigumpha) with its magnificent double-storey acoustic amphitheater.',
      'Climb to the top of Khandagiri for a functioning 18th-century Jain temple and sunset view of the capital.',
      'Watch out for the curious resident monkeys on the stairs.'
    ]
  },
  {
    id: 'chilika-lake-satapada',
    name: 'Chilika Lake & Satapada Dolphin Sanctuary',
    odiaName: 'ଚିଲିକା ହ୍ରଦ ଓ ସାତପଡ଼ା',
    tagline: 'Asia Largest Brackish Water Lagoon & Irrawaddy Dolphin Haven',
    district: 'Puri',
    region: 'Coastal Odisha',
    category: 'Beaches & Lakes',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Chilika is a designated Ramsar Wetland of International Importance spanning over 1,100 sq km. Satapada, on the south-eastern tip of Chilika, is famous for spotting rare endangered Irrawaddy dolphins and visiting the scenic Sea Mouth where the lagoon meets the Bay of Bengal.',
    significance: 'Asia largest wintering ground for over 1 million migratory birds; home to 150+ playful Irrawaddy dolphins.',
    bestTimeToVisit: 'November to February (Peak bird migration and playful dolphin sightings)',
    timings: '6:00 AM – 5:30 PM (Boat services operate till sunset)',
    closedOn: 'Open 365 Days (Subject to rough weather during monsoons)',
    coordinates: { lat: 19.6756, lng: 85.4378 },
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Satapada+Chilika+Lake+Odisha',
    entryFee: {
      indian: 'Lagoon Entry Free',
      foreigner: 'Free',
      camera: 'Free',
      additionalInfo: 'OTDC Motorized Boat (3 hours): ₹1,800 to ₹2,500 per boat (seats up to 6-8 persons). Dolphin spotting + Sea Mouth package.'
    },
    transit: {
      nearestAirport: {
        name: 'Biju Patnaik International Airport (Bhubaneswar)',
        code: 'BBI',
        distanceKm: 110,
        taxiFareInr: 2500,
        approxTime: '2 hrs 45 mins'
      },
      nearestRailway: {
        station: 'Puri Railway Station',
        code: 'PURI',
        distanceKm: 50,
        fareInr: 1200,
        mode: 'Direct Taxi / Regular OSRTC Bus'
      },
      busConnectivity: {
        route: 'Puri Bus Stand to Satapada Jetty',
        frequency: 'Every 30 minutes',
        fareInr: 65,
        operators: 'OSRTC & Private Express'
      },
      roadDrive: {
        highway: 'Puri-Satapada Marine State Highway (SH-60)',
        popularRoute: 'Puri -> Brahmagiri (Alarnath Temple) -> Satapada (50 km)',
        tollInfo: 'No toll'
      }
    },
    nearbyHotels: [
      {
        name: 'OTDC Yatri Nivas Satapada',
        category: 'OTDC Panthanivas',
        distanceKm: 0.2,
        pricePerNightInr: 2600,
        rating: 4.3,
        image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80',
        highlights: ['Waterfront Balconies', 'Direct Jetty Access', 'Fresh Lagoon Crab & Prawn Dining']
      },
      {
        name: 'Eco Retreat Chilika (Seasonal Glamping)',
        category: 'Luxury Heritage',
        distanceKm: 1.5,
        pricePerNightInr: 8500,
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=600&q=80',
        highlights: ['Luxury Glamping Tents', 'Private Speedboat Tours', 'Cultural Evenings']
      }
    ],
    travelTips: [
      'Take the morning 7:00 AM boat from Satapada jetty for maximum chance of watching dolphins leap.',
      'Stop at Rajhans Island and walk 50 meters to cross the sandbar into the roaring Bay of Bengal.',
      'Savor fresh Chilika tiger prawns and crab fry prepared by fishermen at Sea Mouth shacks.'
    ]
  },
  {
    id: 'similipal-national-park',
    name: 'Similipal National Park & Barehipani Falls',
    odiaName: 'ଶିମିଳିପାଳ ଜାତୀୟ ଉଦ୍ୟାନ',
    tagline: 'UNESCO Biosphere Reserve, Royal Bengal Tigers & Majestic Waterfalls',
    district: 'Mayurbhanj',
    region: 'North & Similipal',
    category: 'Wildlife & Biosphere',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Encompassing 2,750 sq km of dense sal forests, cloud-capped hills, and roaring cascades, Similipal is a Project Tiger and Project Elephant reserve. Barehipani Falls (399m) is the second highest waterfall in India, tumbling down in two tiers.',
    significance: 'UNESCO World Network of Biosphere Reserves; home to rare melanistic (black) tigers found nowhere else on earth.',
    bestTimeToVisit: 'November 1 to June 15 (Park closes during monsoons)',
    timings: 'Entry from Pithabata & Jashipur gates: 6:00 AM – 9:00 AM',
    closedOn: 'Monsoon Season (Mid-June to October 31)',
    coordinates: { lat: 21.9317, lng: 86.3475 },
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Similipal+National+Park+Odisha',
    entryFee: {
      indian: '₹100 per person entry permit',
      foreigner: '₹1,000 per person',
      camera: 'Still Camera ₹100, Video Camera ₹500',
      additionalInfo: 'Mandatory Forest Safari Vehicle (4x4 Bolero/Gypsy): ₹3,500 – ₹4,500 for full day + ₹300 Eco-guide fee.'
    },
    transit: {
      nearestAirport: {
        name: 'Biju Patnaik Airport (Bhubaneswar) or Netaji Subhash (Kolkata)',
        code: 'BBI / CCU',
        distanceKm: 270,
        taxiFareInr: 5500,
        approxTime: '5 hrs 30 mins'
      },
      nearestRailway: {
        station: 'Balasore Railway Station (BLS) or Baripada (BPO)',
        code: 'BLS',
        distanceKm: 75,
        fareInr: 1800,
        mode: 'Prepaid Taxi / Forest 4WD Pickup'
      },
      busConnectivity: {
        route: 'Bhubaneswar / Cuttack to Baripada / Jashipur',
        frequency: 'Hourly',
        fareInr: 280,
        operators: 'OSRTC AC Deluxe'
      },
      roadDrive: {
        highway: 'NH-18 (Balasore - Baripada Highway)',
        popularRoute: 'Bhubaneswar -> Balasore -> Baripada -> Pithabata gate',
        tollInfo: 'Toll plazas at Panikoili and Sergarh (~₹180)'
      }
    },
    nearbyHotels: [
      {
        name: 'The Belgadia Palace (Baripada)',
        category: 'Luxury Heritage',
        distanceKm: 28.0,
        pricePerNightInr: 14000,
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80',
        highlights: ['Victorian Royal Palace Stays', 'Chhau Dance Recitals', 'Curated Jungle Safaris']
      },
      {
        name: 'Similipal Eco Cottages (Gudgudia & Jamuani)',
        category: 'Eco Resort',
        distanceKm: 1.0,
        pricePerNightInr: 3500,
        rating: 4.6,
        image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=600&q=80',
        highlights: ['Inside Tiger Reserve', 'Tribal Hospitality', 'Includes All Meals']
      }
    ],
    travelTips: [
      'Book your eco-cottage permits through the official Odisha Forest Department portal in advance.',
      'Carry warm clothing as night temperatures drop below 8°C in winter.',
      'Savor Baripada famous Mudhi Mansa (puffed rice with mutton gravy) upon returning to town.'
    ]
  },
  {
    id: 'daringbadi-kashmir-of-odisha',
    name: 'Daringbadi "Kashmir of Odisha"',
    odiaName: 'ଦାରିଙ୍ଗବାଡ଼ି (ଓଡ଼ିଶାର କାଶ୍ମୀର)',
    tagline: 'Pine Forests, Coffee Plantations & Winter Frost in the Eastern Ghats',
    district: 'Kandhamal',
    region: 'Southern Highlands',
    category: 'Hill Stations & Waterfalls',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Situated at 3,000 feet above sea level in Kandhamal district, Daringbadi is the only hill station in Odisha where temperatures occasionally drop to freezing, creating morning winter frost. Ringed by pine valleys, black pepper creepers, organic coffee estates, and waterfalls like Midubanda.',
    significance: 'Unique high-altitude hill resort in Odisha with lush pine forests and indigenous Kutia Kondh tribal culture.',
    bestTimeToVisit: 'September to March (December - January for winter chills)',
    timings: 'Scenic open viewpoints accessible dawn to dusk',
    closedOn: 'Open 365 Days',
    coordinates: { lat: 19.9056, lng: 84.1333 },
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Daringbadi+Kandhamal+Odisha',
    entryFee: {
      indian: 'Nature Viewpoints Free',
      foreigner: 'Free',
      camera: 'Free',
      additionalInfo: 'Nature Park & Emu Farm: ₹20 per person. Midubanda Falls parking: ₹30.'
    },
    transit: {
      nearestAirport: {
        name: 'Biju Patnaik International Airport (Bhubaneswar)',
        code: 'BBI',
        distanceKm: 250,
        taxiFareInr: 4500,
        approxTime: '5 hrs 30 mins'
      },
      nearestRailway: {
        station: 'Berhampur Railway Station (BAM)',
        code: 'BAM',
        distanceKm: 120,
        fareInr: 2400,
        mode: 'Direct Taxi / Regular Bus'
      },
      busConnectivity: {
        route: 'Bhubaneswar or Berhampur to Daringbadi direct',
        frequency: '4 buses daily',
        fareInr: 220,
        operators: 'OSRTC AC & Express'
      },
      roadDrive: {
        highway: 'SH-5 via Bhanjanagar and Kalinga Ghati',
        popularRoute: 'Bhubaneswar -> Nayagarh -> Aska -> Bhanjanagar -> Daringbadi',
        tollInfo: 'Scenic winding ghat roads through Kalinga Ghati'
      }
    },
    nearbyHotels: [
      {
        name: 'Eco Retreat Daringbadi (OTDC Luxury Glamping)',
        category: 'Luxury Heritage',
        distanceKm: 2.0,
        pricePerNightInr: 7500,
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=600&q=80',
        highlights: ['Luxury Heated Swiss Tents', 'Coffee Plantation Walks', 'Folk Dance Evenings']
      },
      {
        name: 'Hotel Utopia Daringbadi',
        category: 'Comfort Hotel',
        distanceKm: 0.5,
        pricePerNightInr: 2200,
        rating: 4.2,
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80',
        highlights: ['Pine Forest View Balconies', 'Bonfire Arrangements', 'Odia Homestyle Food']
      }
    ],
    travelTips: [
      'Visit Hill View Point early morning to witness the sunrise over the blanket of clouds.',
      'Purchase organic Kandhamal turmeric (GI-tagged) and locally grown Arabica coffee directly from tribal cooperatives.',
      'Explore Mandasaru Gorge (known as the Silent Valley of Odisha) located 32 km from Daringbadi.'
    ]
  },
  {
    id: 'bhitarkanika-national-park',
    name: 'Bhitarkanika Mangroves & Crocodile Sanctuary',
    odiaName: 'ଭିତରକନିକା ଜାତୀୟ ଉଦ୍ୟାନ',
    tagline: 'India Second Largest Mangrove Ecosystem & Saltwater Crocodile Sanctuary',
    district: 'Kendrapara',
    region: 'Coastal Odisha',
    category: 'Wildlife & Biosphere',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'A verdant labyrinth of tidal rivers, creeks, and mudflats covering 672 sq km. Home to over 1,700 gigantic saltwater crocodiles (including the Guinness World Record 23-ft crocodile), 8 species of kingfishers, and adjacent to Gahirmatha, the world largest nesting ground for endangered Olive Ridley sea turtles.',
    significance: 'Ramsar Wetland Site; second largest mangrove ecosystem in mainland India after the Sundarbans.',
    bestTimeToVisit: 'October to March (Turtle nesting at Gahirmatha in February - March)',
    timings: 'Entry from Khola & Gupti gates: 7:00 AM – 4:00 PM',
    closedOn: 'May 1 to July 31 for crocodile breeding season',
    coordinates: { lat: 20.7233, lng: 86.8686 },
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Bhitarkanika+National+Park+Khola+Gate',
    entryFee: {
      indian: '₹40 per person',
      foreigner: '₹1,000 per person',
      camera: 'Still Camera ₹50, Video Camera ₹500',
      additionalInfo: 'Forest Department Boat Safari (seats up to 8): ₹2,500 – ₹3,200 for 3.5-hour cruise.'
    },
    transit: {
      nearestAirport: {
        name: 'Biju Patnaik International Airport (Bhubaneswar)',
        code: 'BBI',
        distanceKm: 145,
        taxiFareInr: 3200,
        approxTime: '3 hrs 30 mins'
      },
      nearestRailway: {
        station: 'Bhadrak Railway Station (BHK) or Cuttack (CTC)',
        code: 'BHK',
        distanceKm: 70,
        fareInr: 1600,
        mode: 'Direct Taxi / Bus'
      },
      busConnectivity: {
        route: 'Cuttack or Bhadrak to Chandbali / Rajnagar',
        frequency: 'Every 45 minutes',
        fareInr: 120,
        operators: 'OSRTC & Local Express'
      },
      roadDrive: {
        highway: 'SH-9A via Pattamundai and Rajnagar',
        popularRoute: 'Bhubaneswar -> Cuttack -> Kendrapara -> Rajnagar -> Khola Gate (145 km)',
        tollInfo: 'Toll at Manguli (~₹75)'
      }
    },
    nearbyHotels: [
      {
        name: 'Estuary Island Resort (Dhamra)',
        category: 'Eco Resort',
        distanceKm: 8.0,
        pricePerNightInr: 4200,
        rating: 4.5,
        image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80',
        highlights: ['Creek-facing Luxury Tents', 'Night River Safaris', 'Angling & Crabbing Tours']
      },
      {
        name: 'OTDC Aranya Nivas Dangamal',
        category: 'OTDC Panthanivas',
        distanceKm: 1.2,
        pricePerNightInr: 2800,
        rating: 4.2,
        image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=600&q=80',
        highlights: ['Inside Sanctuary Boundary', 'Crocodile Breeding Center Walk', 'Local Seafood']
      }
    ],
    travelTips: [
      'Take the morning boat cruise through the creeks when giant crocodiles bask along the muddy banks in the sunshine.',
      'Climb the watchtower at Dangamal to spot wild boars, spotted deer, and water monitor lizards.',
      'Wear neutral green or khaki attire and carry binoculars for birdwatching.'
    ]
  },
  {
    id: 'gopalpur-on-sea-tampara',
    name: 'Gopalpur-on-Sea & Tampara Freshwater Lake',
    odiaName: 'ଗୋପାଳପୁର ବେଳାଭୂମି ଓ ତାମ୍ପରା ହ୍ରଦ',
    tagline: 'Colonial Maritime Port, Golden Sands & Inland Water Sports Lagoon',
    district: 'Ganjam',
    region: 'Southern Highlands',
    category: 'Beaches & Lakes',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'An ancient port town from where Kalinga mariners sailed to Burma and Java. Known for its quiet, serene beach lined with coconut groves, colonial-era lighthouse (1871), and nearby Tampara Lake, a 300-hectare freshwater lake offering jet skis, speedboats, and houseboats.',
    significance: 'Historic trade hub of the Kalinga Empire; tranquil alternative to commercial beaches.',
    bestTimeToVisit: 'October to March (Gopalpur Beach Festival in December)',
    timings: 'Beach open all hours; Lighthouse view: 3:30 PM – 5:30 PM daily',
    closedOn: 'Open 365 Days',
    coordinates: { lat: 19.2608, lng: 84.9083 },
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Gopalpur+on+Sea+Beach+Odisha',
    entryFee: {
      indian: 'Beach Free Entry',
      foreigner: 'Free',
      camera: 'Free (Lighthouse ticket ₹20)',
      additionalInfo: 'Tampara Lake Jet Ski: ₹400; Speedboat: ₹250; Kayaking: ₹150 per person.'
    },
    transit: {
      nearestAirport: {
        name: 'Biju Patnaik Airport (Bhubaneswar)',
        code: 'BBI',
        distanceKm: 170,
        taxiFareInr: 3500,
        approxTime: '3 hrs'
      },
      nearestRailway: {
        station: 'Berhampur Railway Station (BAM)',
        code: 'BAM',
        distanceKm: 16,
        fareInr: 300,
        mode: 'Auto / Taxi / City Bus'
      },
      busConnectivity: {
        route: 'Berhampur Old Bus Stand to Gopalpur Beach',
        frequency: 'Every 15 minutes',
        fareInr: 25,
        operators: 'City Bus & OSRTC'
      },
      roadDrive: {
        highway: 'NH-16 (Bhubaneswar - Chennai Expressway)',
        popularRoute: 'Bhubaneswar -> Khurda -> Chatrapur -> Gopalpur (170 km 4-lane highway)',
        tollInfo: 'Toll plazas at Gangapada and Sunakhala (~₹145)'
      }
    },
    nearbyHotels: [
      {
        name: 'Mayfair Palm Beach Resort Gopalpur',
        category: 'Luxury Heritage',
        distanceKm: 0.1,
        pricePerNightInr: 11000,
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80',
        highlights: ['1914 Heritage Coastal Resort', 'Infinity Pool on Beach', 'Private Cabanas']
      },
      {
        name: 'OTDC Panthanivas Gopalpur',
        category: 'OTDC Panthanivas',
        distanceKm: 0.5,
        pricePerNightInr: 2400,
        rating: 4.1,
        image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=600&q=80',
        highlights: ['Direct Sea Breeze', 'Panthanivas Seafood Specialities', 'Spacious Parking']
      }
    ],
    travelTips: [
      'Climb the 1871 Gopalpur Lighthouse between 3:30 PM and 5:30 PM for a 360-degree panoramic vista of the coastline.',
      'Spend an afternoon at Tampara Lake (8 km away) enjoying water sports and sunset boat rides.',
      'Relish fresh coastal pomfret and tiger prawn fry at beachfront stalls.'
    ]
  },
  {
    id: 'hirakud-dam-debrigarh',
    name: 'Hirakud Dam & Debrigarh Wildlife Sanctuary',
    odiaName: 'ହୀରାକୁଦ ବନ୍ଧ ଓ ଦେବ୍ରୀଗଡ଼ ଅଭୟାରଣ୍ୟ',
    tagline: 'World Longest Earthen Dam (25.8 km) & Leopard Sanctuary on Reservoir Waters',
    district: 'Sambalpur',
    region: 'Western Odisha',
    category: 'Wildlife & Biosphere',
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Built across the mighty Mahanadi River in 1957, Hirakud is one of the world longest earthen dams. Along its massive reservoir lies Debrigarh Wildlife Sanctuary, home to Indian leopards, gaur (Indian bison), sambar, and 30,000+ migratory waterfowls.',
    significance: 'Marvel of independent India engineering and a high-density leopard eco-tourism sanctuary.',
    bestTimeToVisit: 'October to April',
    timings: 'Gandhi Minar & Nehru Minar: 8:00 AM – 6:00 PM; Debrigarh Safari: 6:00 AM – 5:00 PM',
    closedOn: 'Open 365 Days',
    coordinates: { lat: 21.5700, lng: 83.8700 },
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Hirakud+Dam+Sambalpur+Odisha',
    entryFee: {
      indian: 'Gandhi Minar Entry ₹10',
      foreigner: '₹50',
      camera: 'Free',
      additionalInfo: 'Debrigarh Safari Vehicle: ₹2,500 – ₹3,500 per gypsy (up to 6 persons). Reservoir Boat Cruise: ₹200 per head.'
    },
    transit: {
      nearestAirport: {
        name: 'Veer Surendra Sai Airport, Jharsuguda',
        code: 'JRG',
        distanceKm: 62,
        taxiFareInr: 1500,
        approxTime: '1 hr 15 mins'
      },
      nearestRailway: {
        station: 'Sambalpur Junction (SBP) / Hirakud Station (HKG)',
        code: 'SBP',
        distanceKm: 15,
        fareInr: 250,
        mode: 'Auto / Taxi'
      },
      busConnectivity: {
        route: 'Sambalpur Ainthapali Bus Stand to Burla / Hirakud',
        frequency: 'Every 15 minutes',
        fareInr: 25,
        operators: 'City Bus & OSRTC'
      },
      roadDrive: {
        highway: 'Biju Expressway & NH-53',
        popularRoute: 'Sambalpur -> Burla -> Hirakud Dam Dyke (15 km)',
        tollInfo: 'No toll within dam road'
      }
    },
    nearbyHotels: [
      {
        name: 'Debrigarh Eco-Tourism Cottages (Barkhandia)',
        category: 'Eco Resort',
        distanceKm: 2.0,
        pricePerNightInr: 4500,
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=600&q=80',
        highlights: ['Waterfront Cottages on Reservoir', 'Included Jungle Safari', 'Wildlife Viewing from Balcony']
      },
      {
        name: 'Hotel Sheela Towers Sambalpur',
        category: 'Comfort Hotel',
        distanceKm: 16.0,
        pricePerNightInr: 3000,
        rating: 4.3,
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80',
        highlights: ['City Center Sambalpur', 'Multi-Cuisine Restaurant', 'Spacious AC Deluxe Rooms']
      }
    ],
    travelTips: [
      'Climb the revolving Gandhi Minar on the north side for an endless view of the reservoir.',
      'Take the Hirakud reservoir cruise to Bat Island and Sunset point.',
      'Visit nearby Maa Samaleswari Temple in Sambalpur, the revered shrine of Western Odisha.'
    ]
  },
  {
    id: 'deomali-peak-koraput',
    name: 'Deomali Peak, Koraput',
    odiaName: 'ଦେଓମାଳୀ ପର୍ବତ, କୋରାପୁଟ',
    tagline: 'Highest Mountain Peak of Odisha (1,672 meters) & Paragliding Valley',
    district: 'Koraput',
    region: 'Southern Highlands',
    category: 'Hill Stations & Waterfalls',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Towering at 1,672 meters (5,486 ft) in the Chandragiri-Pottangi subrange of the Eastern Ghats, Deomali is the highest mountain peak in Odisha. Known for its breathtaking rolling green tablelands, mist-covered cliffs, paragliding adventures, and vibrant tribal cultures.',
    significance: 'Highest altitude peak in Odisha; panoramic 360-degree viewpoint above the clouds.',
    bestTimeToVisit: 'September to March (Crisp mountain air & cloud meadows)',
    timings: 'Open 24 Hours (Best visited between 5:30 AM and 5:30 PM)',
    closedOn: 'Open 365 Days',
    coordinates: { lat: 18.6667, lng: 82.9833 },
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Deomali+Peak+Koraput+Odisha',
    entryFee: {
      indian: 'Free Entry',
      foreigner: 'Free Entry',
      camera: 'Free',
      additionalInfo: 'Paragliding sessions (seasonal): ₹2,500 – ₹3,500 per tandem flight.'
    },
    transit: {
      nearestAirport: {
        name: 'Jeypore Airport (PYB) or Visakhapatnam Airport (VTZ)',
        code: 'VTZ',
        distanceKm: 140,
        taxiFareInr: 3500,
        approxTime: '3 hrs 45 mins'
      },
      nearestRailway: {
        station: 'Koraput Railway Station (KPR) or Damanjodi (DMNJ)',
        code: 'DMNJ',
        distanceKm: 42,
        fareInr: 1200,
        mode: 'Hired SUV / Taxi'
      },
      busConnectivity: {
        route: 'Visakhapatnam or Jeypore to Semiliguda + local taxi to summit',
        frequency: 'Regular daytime buses',
        fareInr: 180,
        operators: 'OSRTC & APSRTC'
      },
      roadDrive: {
        highway: 'NH-26 -> Semiliguda -> Pottangi -> Deomali Ghat Road',
        popularRoute: 'Koraput -> Sunabeda -> Semiliguda -> Kunduli -> Deomali Hilltop (60 km)',
        tollInfo: 'Smooth newly paved hill road right up to the summit'
      }
    },
    nearbyHotels: [
      {
        name: 'Eco Retreat Putsil / Deomali',
        category: 'Eco Resort',
        distanceKm: 4.5,
        pricePerNightInr: 6500,
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=600&q=80',
        highlights: ['High Altitude Luxury Tents', 'Campfires & Stargazing', 'Organic Tribal Meals']
      },
      {
        name: 'Hotel Dhiman Heritage Koraput',
        category: 'Comfort Hotel',
        distanceKm: 45.0,
        pricePerNightInr: 2400,
        rating: 4.2,
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80',
        highlights: ['Koraput Town Center', 'Near Tribal Museum', 'Travel Desk for Waterfalls']
      }
    ],
    travelTips: [
      'Reach the summit by 5:30 AM to witness sunrise through a sea of floating clouds below.',
      'Stop at the Friday tribal market at Kunduli (Asia largest tribal market) on your route.',
      'Pair with Duduma Waterfall (Machkund) 75 km away.'
    ]
  },
  {
    id: 'ratnagiri-buddhist-circuit',
    name: 'Ratnagiri Buddhist Monasteries (Diamond Triangle)',
    odiaName: 'ରତ୍ନଗିରି ବୌଦ୍ଧ କୀର୍ତ୍ତିରାଜି',
    tagline: '5th-Century Mahavihara with World Famous Carved Green Chlorite Doorways',
    district: 'Jajpur',
    region: 'Diamond Triangle',
    category: 'Buddhist Circuit',
    image: 'https://images.unsplash.com/photo-1599818809280-b8000b7a977e?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1599818809280-b8000b7a977e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'The crowning site of the "Diamond Triangle" Buddhist complex (Ratnagiri, Lalitgiri, Udayagiri). Excelling from the 5th to the 12th century CE as a premier university of Tantric Buddhism (Vajrayana). Features a colossal seated Buddha, hundreds of votive stupas, and an intricately carved green chlorite monastic portal.',
    significance: 'One of the most important Buddhist monastic discoveries in India rivaling Nalanda.',
    bestTimeToVisit: 'October to March',
    timings: '9:00 AM – 5:00 PM (Daily)',
    closedOn: 'Fridays for Archaeological Museum; Monasteries open daily',
    coordinates: { lat: 20.6406, lng: 86.3353 },
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Ratnagiri+Buddhist+Monastery+Jajpur+Odisha',
    entryFee: {
      indian: '₹25 per person (ASI Ticket)',
      foreigner: '₹300 per person',
      camera: 'Mobile free; Video Camera ₹25',
      additionalInfo: 'Museum entry ₹5 (Children below 15 free).'
    },
    transit: {
      nearestAirport: {
        name: 'Biju Patnaik International Airport (Bhubaneswar)',
        code: 'BBI',
        distanceKm: 100,
        taxiFareInr: 2400,
        approxTime: '2 hrs 15 mins'
      },
      nearestRailway: {
        station: 'Jajpur Keonjhar Road (JJKR) or Cuttack (CTC)',
        code: 'JJKR',
        distanceKm: 45,
        fareInr: 900,
        mode: 'Direct Cab / Auto'
      },
      busConnectivity: {
        route: 'Cuttack to Chandikhole + Local connecting bus to Ratnagiri',
        frequency: 'Every 30 minutes',
        fareInr: 75,
        operators: 'OSRTC & Private'
      },
      roadDrive: {
        highway: 'NH-16 -> Chandikhole -> State Highway 70',
        popularRoute: 'Bhubaneswar -> Cuttack -> Chandikhole -> Ratnagiri (100 km 4-lane & scenic country road)',
        tollInfo: 'Toll at Manguli (~₹75)'
      }
    },
    nearbyHotels: [
      {
        name: 'Toshali Ratnagiri Resort',
        category: 'Eco Resort',
        distanceKm: 0.8,
        pricePerNightInr: 3800,
        rating: 4.5,
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80',
        highlights: ['Walking distance to Monasteries', 'Ayurvedic Wellness Spa', 'Buddhist Architecture Decor']
      },
      {
        name: 'OTDC Panthanivas Chandikhole',
        category: 'OTDC Panthanivas',
        distanceKm: 25.0,
        pricePerNightInr: 1800,
        rating: 4.0,
        image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=600&q=80',
        highlights: ['Highway Hub Location', 'Good Odia Kitchen', 'Base for Lalitgiri & Udayagiri']
      }
    ],
    travelTips: [
      'Admire the chlorite stone doorway of Monastery 1, considered the most masterfully carved Buddhist doorway in India.',
      'Explore nearby Lalitgiri (where gold casket tooth relics of Buddha were unearthed) and Udayagiri.',
      'Visit the ASI Archaeological Museum on site holding over 3,000 Buddhist sculptures.'
    ]
  },
  {
    id: 'barunei-hill-temple',
    name: 'Barunei Hill & Temple',
    odiaName: 'ବାରୁଣେଇ ପାହାଡ଼ ଓ ମନ୍ଦିର',
    tagline: 'Sacred Hill Spring Swarna Ganga & Legendary Paika Rebellion Epicenter',
    district: 'Khurda',
    region: 'Central & Cuttack',
    category: 'Temples & Spiritual',
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Nestled at the foot of Barunei Hill near Khurda, this historic temple honors Goddess Barunei and Karunei. A perennial mountain stream named Swarna Ganga flows continuously down the stone cliffs. It is revered as the citadel of the 1817 Paika Rebellion.',
    significance: 'Historic capital of the Bhoi kings and sanctuary of the Paika freedom fighters led by Bakshi Jagabandhu.',
    bestTimeToVisit: 'July to February (Monsoon stream is in full flow)',
    timings: '6:00 AM – 7:00 PM (Daily)',
    closedOn: 'Open 365 Days',
    coordinates: { lat: 20.1833, lng: 85.6167 },
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Barunei+Temple+Khurda+Odisha',
    entryFee: {
      indian: 'Free Entry',
      foreigner: 'Free Entry',
      camera: 'Free',
      additionalInfo: 'Vehicle parking: ₹30.'
    },
    transit: {
      nearestAirport: {
        name: 'Biju Patnaik Airport (Bhubaneswar)',
        code: 'BBI',
        distanceKm: 28,
        taxiFareInr: 700,
        approxTime: '45 mins'
      },
      nearestRailway: {
        station: 'Khurda Road Junction (KUR)',
        code: 'KUR',
        distanceKm: 9,
        fareInr: 150,
        mode: 'Auto / Taxi'
      },
      busConnectivity: {
        route: 'Bhubaneswar Baramunda to Khurda Town + Auto to Barunei',
        frequency: 'Every 15 minutes',
        fareInr: 40,
        operators: 'Mo Bus Route 24 & Local Buses'
      },
      roadDrive: {
        highway: 'NH-16 -> Khurda Bypass -> Barunei Temple Road',
        popularRoute: 'Bhubaneswar -> Khurda Town -> Barunei Hills (28 km)',
        tollInfo: 'Toll at Gangapada (~₹90)'
      }
    },
    nearbyHotels: [
      {
        name: 'Hotel The S Regency Khurda',
        category: 'Comfort Hotel',
        distanceKm: 4.5,
        pricePerNightInr: 2100,
        rating: 4.2,
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80',
        highlights: ['Near Khurda Junction', 'AC Rooms', 'Odia Restaurant']
      }
    ],
    travelTips: [
      'Bathe feet in the sacred Swarna Ganga spring water cascading beside the temple steps.',
      'Trek up the hill to visit Pandava Gumpha ancient rock shelters.'
    ]
  },
  {
    id: 'nandankanan-zoo',
    name: 'Nandankanan Zoological Park',
    odiaName: 'ନନ୍ଦନକାନନ ପ୍ରାଣୀ ଉଦ୍ୟାନ',
    tagline: 'World Renowned White Tiger Sanctuary & Overwater Kanjia Lake Ropeway',
    district: 'Khurda',
    region: 'Central & Cuttack',
    category: 'Wildlife & Biosphere',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Literally meaning "Garden of Gods", Nandankanan spans 437 hectares including Kanjia Lake. It was the first zoo in the world to breed white tigers and melanistic tigers. Features open-moat safari buses, a passenger ropeway, and reptile park.',
    significance: 'Global pioneer in white tiger breeding; certified member of World Association of Zoos and Aquariums (WAZA).',
    bestTimeToVisit: 'October to March',
    timings: '7:30 AM – 5:30 PM (Summer: 8:00 AM – 5:00 PM)',
    closedOn: 'Mondays Closed',
    coordinates: { lat: 20.3956, lng: 85.8247 },
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Nandankanan+Zoological+Park+Bhubaneswar',
    entryFee: {
      indian: '₹50 (Adults) / ₹10 (Children)',
      foreigner: '₹100 per person',
      camera: 'Still Camera ₹50, Video Camera ₹500',
      additionalInfo: 'Combined Tiger & Lion Safari Bus: ₹60; Ropeway Ticket: ₹85; Toy Train: ₹30.'
    },
    transit: {
      nearestAirport: {
        name: 'Biju Patnaik Airport (Bhubaneswar)',
        code: 'BBI',
        distanceKm: 18,
        taxiFareInr: 450,
        approxTime: '35 mins'
      },
      nearestRailway: {
        station: 'Bhubaneswar Station (BBS) or Mancheswar (MCS)',
        code: 'BBS',
        distanceKm: 15,
        fareInr: 250,
        mode: 'Mo Bus / Cab'
      },
      busConnectivity: {
        route: 'Mo Bus Route 18 connecting Master Canteen to Nandankanan Gate',
        frequency: 'Every 15 minutes',
        fareInr: 30,
        operators: 'Mo Bus (CRUT)'
      },
      roadDrive: {
        highway: 'Nandankanan Road via Patia and KIIT Square',
        popularRoute: 'Bhubaneswar city -> Jayadev Vihar -> Patia -> Nandankanan (15 km)',
        tollInfo: 'No toll'
      }
    },
    nearbyHotels: [
      {
        name: 'Mayfair Lagoon Resort',
        category: 'Luxury Heritage',
        distanceKm: 10.0,
        pricePerNightInr: 9800,
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80',
        highlights: ['5-Star Luxury', 'Lagoon Cabanas', 'Fine Dining']
      }
    ],
    travelTips: [
      'Take the morning Lion & Tiger Safari right when the zoo opens at 8:00 AM.',
      'Ride the scenic cable ropeway over Kanjia Lake to the Botanical Garden.'
    ]
  },
  {
    id: 'baripada-mayurbhanj',
    name: 'Baripada Heritage & Chhau Culture',
    odiaName: 'ବାରିପଦା ଐତିହ୍ୟ ଓ ଛଉ ନୃତ୍ୟ',
    tagline: 'Capital of the Royal Bhanja Kings & Origin of Mayurbhanj Chhau Dance',
    district: 'Mayurbhanj',
    region: 'North & Similipal',
    category: 'Heritage & Forts',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Historical capital of the princely state of Mayurbhanj. Famous for the 1804 Victorian Belgadia Palace, Haribaldev Jew temple, the vibrant Chhau martial dance tradition, and the second oldest Rath Yatra where women pull the chariot of Devi Subhadra.',
    significance: 'Cultural heart of North Odisha and home to UNESCO-recognized Chhau dance heritage.',
    bestTimeToVisit: 'October to March (Chaitra Parva Chhau festival in April)',
    timings: 'Palace visits: 9:00 AM – 5:00 PM',
    closedOn: 'Open 365 Days',
    coordinates: { lat: 21.9333, lng: 86.7333 },
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Baripada+Mayurbhanj+Odisha',
    entryFee: {
      indian: 'Town & Temples Free',
      foreigner: 'Free',
      camera: 'Free',
      additionalInfo: 'Belgadia Palace heritage tour: ₹500 (Includes royal high tea).'
    },
    transit: {
      nearestAirport: {
        name: 'Kolkata Netaji Subhash Airport (CCU) or Bhubaneswar (BBI)',
        code: 'CCU / BBI',
        distanceKm: 220,
        taxiFareInr: 4500,
        approxTime: '4 hrs 30 mins'
      },
      nearestRailway: {
        station: 'Baripada Railway Station (BPO) / Balasore (BLS)',
        code: 'BPO',
        distanceKm: 2,
        fareInr: 50,
        mode: 'Rickshaw / Auto'
      },
      busConnectivity: {
        route: 'Bhubaneswar / Cuttack to Baripada Bus Stand',
        frequency: 'Every 30 minutes',
        fareInr: 250,
        operators: 'OSRTC AC & Deluxe'
      },
      roadDrive: {
        highway: 'NH-18 (Balasore - Baripada Highway)',
        popularRoute: 'Bhubaneswar -> Balasore -> Baripada (250 km 4-lane expressway)',
        tollInfo: 'Toll at Panikoili and Sergarh'
      }
    },
    nearbyHotels: [
      {
        name: 'The Belgadia Palace',
        category: 'Luxury Heritage',
        distanceKm: 1.5,
        pricePerNightInr: 13500,
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80',
        highlights: ['Victorian Royal Palace', 'Curated Chhau Evenings', 'Gourmet Mayurbhanj Feasts']
      }
    ],
    travelTips: [
      'Experience authentic Baripada Mudhi Mansa (puffed rice with mutton curry) at Baghra Road.',
      'Watch a live Mayurbhanj Chhau martial dance training session at the local academy.'
    ]
  },
  {
    id: 'jeypore-valley',
    name: 'Jeypore Heritage & Valleys',
    odiaName: 'ଜୟପୁର ଐତିହ୍ୟ ଓ ଉପତ୍ୟକା',
    tagline: 'Historic Sun Dynasty Royal Seat & Southern Tribal Highlands',
    district: 'Koraput',
    region: 'Southern Highlands',
    category: 'Heritage & Forts',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'The historic capital of the Surya Vamsi kings of Jeypore. Surrounded by mountain streams, the Kolab reservoir, Bagra falls, and the limestone cave temple of Gupteswar. Serves as the premier trading hub for southern Odisha tribal produce.',
    significance: 'Historic fortified seat of southern Kalinga kingdom and gateway to Bonda and Paraja tribal cultures.',
    bestTimeToVisit: 'October to March',
    timings: 'Town & viewpoints open all day',
    closedOn: 'Open 365 Days',
    coordinates: { lat: 18.8500, lng: 82.5833 },
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Jeypore+Koraput+Odisha',
    entryFee: {
      indian: 'Free Entry',
      foreigner: 'Free Entry',
      camera: 'Free',
      additionalInfo: 'Kolab botanical gardens entry: ₹20.'
    },
    transit: {
      nearestAirport: {
        name: 'Jeypore Airport (PYB) or Visakhapatnam (VTZ)',
        code: 'PYB / VTZ',
        distanceKm: 5,
        taxiFareInr: 200,
        approxTime: '15 mins'
      },
      nearestRailway: {
        station: 'Jeypore Railway Station (JYP)',
        code: 'JYP',
        distanceKm: 4,
        fareInr: 100,
        mode: 'Auto / Taxi'
      },
      busConnectivity: {
        route: 'Visakhapatnam or Berhampur to Jeypore direct',
        frequency: 'Hourly',
        fareInr: 280,
        operators: 'OSRTC & Private Superfast'
      },
      roadDrive: {
        highway: 'NH-26 via Salur Ghats',
        popularRoute: 'Visakhapatnam -> Vizianagaram -> Salur -> Jeypore (210 km scenic mountain highway)',
        tollInfo: 'Toll at Sunabeda'
      }
    },
    nearbyHotels: [
      {
        name: 'Hotel Hello Jeypore',
        category: 'Comfort Hotel',
        distanceKm: 1.0,
        pricePerNightInr: 2800,
        rating: 4.4,
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80',
        highlights: ['Town Center', 'Travel Desk for Waterfalls', 'Multi-Cuisine Restaurant']
      }
    ],
    travelTips: [
      'Spend sunset at the Kolab Reservoir botanical gardens overlooking the vast water body.',
      'Sample the famous local sweets like Chhena Poda and Jeypore Manda.'
    ]
  },
  {
    id: 'koraput-highlands',
    name: 'Koraput Mountains & Tribal Highlands',
    odiaName: 'କୋରାପୁଟ ପାର୍ବତ୍ୟ ଅଞ୍ଚଳ',
    tagline: 'High-Altitude Coffee Estates, Duduma Waterfalls & Sabara Srikhetra',
    district: 'Koraput',
    region: 'Southern Highlands',
    category: 'Hill Stations & Waterfalls',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Perched high in the Eastern Ghats at 2,900 feet, Koraput is known for its cool mountain climate, rolling hills, organic Arabica coffee, Duduma waterfall (175m), and the revered Sabara Srikhetra Jagannath temple where tribal rituals are preserved.',
    significance: 'Global Agriculture Heritage Site recognized by FAO for indigenous agricultural biodiversity.',
    bestTimeToVisit: 'October to March (Pleasant chilly winter breezes)',
    timings: 'Open All Day',
    closedOn: 'Open 365 Days',
    coordinates: { lat: 18.8167, lng: 82.7167 },
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Koraput+Town+Odisha',
    entryFee: {
      indian: 'Free Entry',
      foreigner: 'Free Entry',
      camera: 'Free',
      additionalInfo: 'Tribal Museum entry ₹20.'
    },
    transit: {
      nearestAirport: {
        name: 'Visakhapatnam International Airport (VTZ)',
        code: 'VTZ',
        distanceKm: 195,
        taxiFareInr: 3800,
        approxTime: '4 hrs 30 mins'
      },
      nearestRailway: {
        station: 'Koraput Junction (KRPU)',
        code: 'KRPU',
        distanceKm: 2,
        fareInr: 80,
        mode: 'Auto-rickshaw'
      },
      busConnectivity: {
        route: 'Bhubaneswar / Visakhapatnam to Koraput Main Bus Stand',
        frequency: 'Regular daytime and night deluxe buses',
        fareInr: 320,
        operators: 'OSRTC'
      },
      roadDrive: {
        highway: 'NH-26 (Bhubaneswar-Visakhapatnam Corridor)',
        popularRoute: 'Bhubaneswar -> Rayagada -> Koraput (480 km scenic mountain highway)',
        tollInfo: 'Tolls along NH-26'
      }
    },
    nearbyHotels: [
      {
        name: 'OTDC Panthanivas Koraput',
        category: 'OTDC Panthanivas',
        distanceKm: 1.2,
        pricePerNightInr: 2200,
        rating: 4.2,
        image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=600&q=80',
        highlights: ['Hillside Location', 'Direct Booking for Duduma Tours', 'Traditional Odia Meals']
      }
    ],
    travelTips: [
      'Visit the Koraput Coffee Experience Center to taste locally grown organic Arabica brews.',
      'Do not miss the breathtaking 175-meter Duduma Waterfall on the Machkund River.'
    ]
  },
  {
    id: 'satkosia-gorge',
    name: 'Satkosia Gorge & Tiger Reserve',
    odiaName: 'ସାତକୋଶିଆ ଗଣ୍ଡ ଓ ବ୍ୟାଘ୍ର ଅଭୟାରଣ୍ୟ',
    tagline: 'Spectacular 22-Kilometer Mahanadi River Canyon & Crocodile Sanctuary',
    district: 'Angul',
    region: 'Central & Cuttack',
    category: 'Wildlife & Biosphere',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Formed where the Mahanadi River carves a dramatic 22-km long deep gorge through the Eastern Ghats. Satkosia is a designated Tiger Reserve harboring gharials, freshwater mugger crocodiles, leopards, and over 300 avian species.',
    significance: 'One of the most scenic river canyons in Asia and a sanctuary for endangered gharial conservation.',
    bestTimeToVisit: 'October to April',
    timings: 'Sanctuary gates open: 6:00 AM – 5:00 PM',
    closedOn: 'Monsoon months (July to September for river safety)',
    coordinates: { lat: 20.5833, lng: 84.8333 },
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Satkosia+Gorge+Tikarpada+Odisha',
    entryFee: {
      indian: '₹40 per person',
      foreigner: '₹1,000 per person',
      camera: 'Still Camera ₹50, Video Camera ₹500',
      additionalInfo: 'Mahanadi River Gorge Boat Cruise: ₹2,000 per boat (seats up to 6).'
    },
    transit: {
      nearestAirport: {
        name: 'Biju Patnaik Airport (Bhubaneswar)',
        code: 'BBI',
        distanceKm: 130,
        taxiFareInr: 2800,
        approxTime: '3 hrs'
      },
      nearestRailway: {
        station: 'Angul Railway Station (ANGL)',
        code: 'ANGL',
        distanceKm: 60,
        fareInr: 1200,
        mode: 'Direct Taxi / Jeep'
      },
      busConnectivity: {
        route: 'Bhubaneswar or Cuttack to Angul + connecting bus to Tikarpada',
        frequency: 'Every 30 minutes to Angul',
        fareInr: 150,
        operators: 'OSRTC'
      },
      roadDrive: {
        highway: 'NH-55 -> Angul -> Tikarpada Road',
        popularRoute: 'Bhubaneswar -> Dhenkanal -> Angul -> Tikarpada (130 km)',
        tollInfo: 'Toll at Dhenkanal'
      }
    },
    nearbyHotels: [
      {
        name: 'Tikarpada Eco-Camp & Tented Resort',
        category: 'Eco Resort',
        distanceKm: 0.5,
        pricePerNightInr: 4500,
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=600&q=80',
        highlights: ['Riverside Swiss Tents', 'Includes River Cruise', 'Campfire Dinners']
      }
    ],
    travelTips: [
      'Book a luxury glamping tent at Tikarpada or Chhotkei well in advance through the Eco-Tourism portal.',
      'Take the morning boat cruise through the gorge when gharials bask on the sandbars.'
    ]
  },
  {
    id: 'chandipur-beach',
    name: 'Chandipur "Hide & Seek" Beach',
    odiaName: 'ଚାନ୍ଦିପୁର ବେଳାଭୂମି',
    tagline: 'Miraculous Coastline Where the Sea Recedes up to 5 Kilometers at Low Tide',
    district: 'Balasore',
    region: 'Coastal Odisha',
    category: 'Beaches & Lakes',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'A beach with a rare, fascinating geographical phenomenon: the sea water recedes up to 5 kilometers during ebb tide and returns during high tide twice every day. Visitors can literally walk onto the seabed among sea shells and red ghost crabs.',
    significance: 'Unique marine phenomenon found in very few places across the globe.',
    bestTimeToVisit: 'October to March',
    timings: 'Open 24 Hours (Low tide timings change daily with lunar cycle)',
    closedOn: 'Open 365 Days',
    coordinates: { lat: 21.4667, lng: 87.0167 },
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Chandipur+Beach+Balasore+Odisha',
    entryFee: {
      indian: 'Free Entry',
      foreigner: 'Free Entry',
      camera: 'Free',
      additionalInfo: 'Beachside parking: ₹20.'
    },
    transit: {
      nearestAirport: {
        name: 'Kolkata Netaji Subhash Airport (CCU) or Bhubaneswar (BBI)',
        code: 'CCU / BBI',
        distanceKm: 210,
        taxiFareInr: 4200,
        approxTime: '4 hrs'
      },
      nearestRailway: {
        station: 'Balasore Railway Station (BLS)',
        code: 'BLS',
        distanceKm: 16,
        fareInr: 250,
        mode: 'Auto / Taxi'
      },
      busConnectivity: {
        route: 'Balasore Bus Stand to Chandipur Beach',
        frequency: 'Every 20 minutes',
        fareInr: 25,
        operators: 'City Bus & Auto'
      },
      roadDrive: {
        highway: 'NH-16 -> Balasore -> Chandipur Road',
        popularRoute: 'Bhubaneswar -> Cuttack -> Bhadrak -> Balasore -> Chandipur (210 km)',
        tollInfo: 'Toll at Panikoili'
      }
    },
    nearbyHotels: [
      {
        name: 'OTDC Panthanivas Chandipur',
        category: 'OTDC Panthanivas',
        distanceKm: 0.1,
        pricePerNightInr: 2200,
        rating: 4.3,
        image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80',
        highlights: ['Direct Beachfront Access', 'Fresh Fried Tiger Prawns', 'Casuarina Garden Lawns']
      }
    ],
    travelTips: [
      'Check tide timing tables at your hotel reception before stepping out onto the seabed.',
      'Savor fresh pomfret and giant tiger prawns cooked fresh by coastal fishermen.'
    ]
  },
  {
    id: 'sambalpur-heritage',
    name: 'Sambalpur Heritage & Samaleswari Temple',
    odiaName: 'ସମ୍ବଲପୁର ଐତିହ୍ୟ ଓ ମା’ ସମଲେଶ୍ୱରୀ',
    tagline: 'Sacred Seat of Maa Samaleswari, Handloom Ikat Weavers & Huma Leaning Temple',
    district: 'Sambalpur',
    region: 'Western Odisha',
    category: 'Temples & Spiritual',
    image: 'https://images.unsplash.com/photo-1609137144820-221f1d1982b6?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1609137144820-221f1d1982b6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Western Odisha cultural capital, situated on the bank of River Mahanadi. Home to the 16th-century Maa Samaleswari Temple (with its new grand heritage corridor), the Huma Leaning Temple (one of only two leaning temples in the world), and the GI-tagged Sambalpuri Ikat handloom textile guild.',
    significance: 'Spiritual epicenter of Western Odisha and global capital of tie-and-dye Ikat handlooms.',
    bestTimeToVisit: 'October to March (Nuakhai agrarian festival in August/September)',
    timings: 'Samaleswari Temple: 6:00 AM – 1:00 PM & 3:00 PM – 9:00 PM',
    closedOn: 'Open 365 Days',
    coordinates: { lat: 21.4667, lng: 83.9833 },
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Maa+Samaleswari+Temple+Sambalpur',
    entryFee: {
      indian: 'Free Darshan',
      foreigner: 'Free Entry',
      camera: 'Free outside sanctum',
      additionalInfo: 'Shoe cloakroom: Free.'
    },
    transit: {
      nearestAirport: {
        name: 'Jharsuguda Veer Surendra Sai Airport (JRG)',
        code: 'JRG',
        distanceKm: 55,
        taxiFareInr: 1400,
        approxTime: '1 hr'
      },
      nearestRailway: {
        station: 'Sambalpur Junction (SBP)',
        code: 'SBP',
        distanceKm: 3,
        fareInr: 60,
        mode: 'Auto / E-Rickshaw'
      },
      busConnectivity: {
        route: 'Bhubaneswar / Raipur to Sambalpur Ainthapali Bus Stand',
        frequency: 'Every 20 minutes',
        fareInr: 280,
        operators: 'OSRTC AC Deluxe'
      },
      roadDrive: {
        highway: 'NH-53 (Kolkata - Mumbai Highway) & Biju Expressway',
        popularRoute: 'Bhubaneswar -> Angul -> Sambalpur (280 km 4-lane highway)',
        tollInfo: 'Tolls along NH-55/53'
      }
    },
    nearbyHotels: [
      {
        name: 'The Grand Siba Sambalpur',
        category: 'Comfort Hotel',
        distanceKm: 2.0,
        pricePerNightInr: 3200,
        rating: 4.4,
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80',
        highlights: ['City Center', 'Near Samaleswari Corridor', 'Fine Dining Restaurant']
      }
    ],
    travelTips: [
      'Visit the newly upgraded Samaleswari Heritage Corridor in the evening during the illuminated Maha Aarti.',
      'Purchase certified GI-tagged Sambalpuri Ikat silk and cotton sarees directly from Boyanika and Sambalpuri Bastralaya showrooms.'
    ]
  }
];
