export interface TimeTravelData {
  pastYear: string;
  pastTitle: string;
  pastImg: string;
  pastDescription: string;
  presentYear: string;
  presentTitle: string;
  presentImg: string;
  presentDescription: string;
}

export interface FolkloreData {
  title: string;
  audioDuration: string;
  narrator: string;
  story: string;
}

export interface Monument {
  id: string;
  name: string;
  odiaName: string;
  location: string;
  district: string;
  era: string;
  builtBy: string;
  dynasty: string;
  significance: string;
  image: string;
  audioScript: string;
  timings: string;
  entryFee: string;
  facts: string[];
  keyHighlights: string[];
  timeTravel: TimeTravelData;
  folklore: FolkloreData;
}

export interface HandicraftItem {
  id: string;
  name: string;
  odiaName: string;
  artisanName: string;
  village: string;
  district: string;
  priceInr: number;
  priceUsd: number;
  image: string;
  rating: number;
  reviewCount: number;
  giTagged: boolean;
  material: string;
  description: string;
  craftTime: string;
}

export interface WorkshopItem {
  id: string;
  title: string;
  odiaTitle: string;
  masterArtisan: string;
  location: string;
  duration: string;
  priceInr: number;
  priceUsd: number;
  image: string;
  maxParticipants: number;
  includes: string[];
  description: string;
}

export interface LuxuryResort {
  id: string;
  name: string;
  location: string;
  district: string;
  priceInr: number;
  priceUsd: number;
  rating: number;
  image: string;
  category: string;
  features: string[];
  description: string;
}

export interface OdishaPackage {
  id: string;
  title: string;
  route: string;
  duration: string;
  priceInr: number;
  priceUsd: number;
  image: string;
  badge: string;
  highlights: string[];
  description: string;
}

export interface WeddingPackage {
  id: string;
  title: string;
  venue: string;
  location: string;
  priceInr: number;
  priceUsd: number;
  image: string;
  capacity: string;
  tag: string;
  inclusions: string[];
  description: string;
}

export interface OdishaRegion {
  id: string;
  name: string;
  odiaName: string;
  color: string;
  districts: string[];
  topDestinations: string[];
  summary: string;
  image: string;
}

export interface ExplorerBadge {
  id: string;
  name: string;
  category: string;
  points: number;
  icon: string;
  description: string;
  unlocked: boolean;
}

export const ODISHA_REGIONS: OdishaRegion[] = [
  {
    id: 'coastal',
    name: 'Coastal Odisha',
    odiaName: 'ଉପକୂଳ ଓଡ଼ିଶା',
    color: 'from-amber-500 to-amber-700',
    districts: ['Puri', 'Khurda', 'Cuttack', 'Jagatsinghpur', 'Kendrapara'],
    topDestinations: ['Puri Jagannath Temple', 'Konark Sun Temple', 'Lingaraj Temple', 'Dhauli Giri', 'Pipili'],
    summary: 'The spiritual heartland of Kalinga with sacred coastal temples, Blue Flag Golden Beach, and living heritage crafts.',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'wetland-south',
    name: 'Chilika & Southern Odisha',
    odiaName: 'ଚିଲିକା ଓ ଦକ୍ଷିଣ ଓଡ଼ିଶା',
    color: 'from-emerald-500 to-teal-700',
    districts: ['Ganjam', 'Gajapati', 'Puri Coastal Zone'],
    topDestinations: ['Chilika Lake Lagoon', 'Satapada Dolphins', 'Gopalpur-on-Sea', 'Tampara Lake', 'Taratarini Hill Shrine'],
    summary: 'Asia largest brackish water wetland, Irrawaddy dolphins, migratory avian paradise, and colonial beachfront retreats.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'western',
    name: 'Western Odisha',
    odiaName: 'ପଶ୍ଚିମ ଓଡ଼ିଶା',
    color: 'from-orange-500 to-red-700',
    districts: ['Sambalpur', 'Bargarh', 'Balangir', 'Sonepur', 'Jharsuguda'],
    topDestinations: ['Hirakud Dam', 'Samaleswari Temple', 'Bargarh Handloom Cluster', 'Harishankar Waterfall', 'Nrusinghanath'],
    summary: 'Home to the world-renowned Sambalpuri Ikat silk weaving guilds, Hirakud (longest earthen dam), and vibrant folk music.',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'northern',
    name: 'Northern & Royal Mayurbhanj',
    odiaName: 'ଉତ୍ତର ଓଡ଼ିଶା',
    color: 'from-purple-500 to-indigo-700',
    districts: ['Mayurbhanj', 'Balasore', 'Keonjhar', 'Sundargarh'],
    topDestinations: ['Similipal Tiger Reserve', 'The Belgadia Palace', 'Barehipani Waterfall', 'Chandipur Beach', 'Khiching Temple'],
    summary: 'Ancient royal kingdoms, living Victorian palaces, UNESCO Biosphere tiger reserves, and martial Chhau dance.',
    image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'eastern-ghats',
    name: 'Eastern Ghats & Daringbadi',
    odiaName: 'ଦାରିଙ୍ଗବାଡ଼ି ଓ କନ୍ଧମାଳ',
    color: 'from-blue-500 to-sky-700',
    districts: ['Kandhamal', 'Koraput', 'Rayagada', 'Malkangiri'],
    topDestinations: ['Daringbadi (Kashmir of Odisha)', 'Deomali Peak (1672m)', 'Coffee Plantations', 'Duduma Falls', 'Tribal Haats'],
    summary: 'Misty pine-clad highlands at 3,000 ft, organic coffee valleys, highest peaks of Odisha, and sacred tribal traditions.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80'
  }
];

export const EXPLORER_BADGES: ExplorerBadge[] = [
  {
    id: 'badge-konark',
    name: 'Konark Sun Charioteer',
    category: 'Monument Mastery',
    points: 250,
    icon: 'Sun',
    description: 'Scanned the 24 astronomical sundial wheels and decoded the 8 praharas of time.',
    unlocked: true
  },
  {
    id: 'badge-puri',
    name: 'Nilachakra Pilgrim',
    category: 'Spiritual Trail',
    points: 300,
    icon: 'Compass',
    description: 'Explored the sacred Simhadwara, Patitapabana flag mysteries, and Anandabazar 56 Bhog.',
    unlocked: true
  },
  {
    id: 'badge-craft',
    name: 'Pattachitra Guild Patron',
    category: 'Artisan Heritage',
    points: 200,
    icon: 'Award',
    description: 'Visited Raghurajpur living heritage craft village and supported master Chitrakaras.',
    unlocked: true
  },
  {
    id: 'badge-chilika',
    name: 'Chilika Dolphin Spotter',
    category: 'Wetland Safari',
    points: 150,
    icon: 'Ship',
    description: 'Navigated the Satapada lagoon estuary and observed endangered Irrawaddy dolphins.',
    unlocked: false
  },
  {
    id: 'badge-time-travel',
    name: 'Vision X Chrono-Explorer',
    category: 'Then vs Now',
    points: 100,
    icon: 'Sparkles',
    description: 'Compared 1250 CE ancient Kalinga temple reconstructions with present-day structures.',
    unlocked: true
  }
];

export const ODISHA_MONUMENTS: Monument[] = [
  {
    id: 'konark-sun-temple',
    name: 'Konark Sun Temple (Black Pagoda)',
    odiaName: 'କୋଣାର୍କ ସୂର୍ଯ୍ୟ ମନ୍ଦିର',
    location: 'Konark, Puri District',
    district: 'Puri',
    era: '1250 CE (13th Century)',
    builtBy: 'King Narasimhadeva I',
    dynasty: 'Eastern Ganga Dynasty',
    significance: 'UNESCO World Heritage Site. Conceived as a colossal chariot for the Sun God Surya with 24 carved stone sundial wheels pulled by seven horses.',
    image: 'https://media.istockphoto.com/id/1444924249/photo/konark-sun-temple-at-sunrise-konark-temple-is-a-unesco-world-heritage-site-at-puri-odisha.jpg?s=612x612&w=0&k=20&c=5Gd3UDpZeYh8DejD4a4TTrpAZLoPw5SARAUFT7hfwRk=',
    audioScript: 'Welcome to the magnificent Konark Sun Temple, a UNESCO World Heritage site built in 1250 CE by King Narasimhadeva I. Rising like a mammoth celestial chariot from the shores of the Bay of Bengal, the temple features 24 intricately carved wheels that serve as precision sundials, capable of calculating time accurately down to the minute. The seven horses represent the seven days of the week and seven rays of the sun.',
    timings: '6:00 AM – 8:00 PM (Daily)',
    entryFee: '₹40 (Indians) / ₹600 (Foreigners)',
    facts: [
      'The 24 stone wheels are functional sundials accurate to within minutes.',
      'Constructed by 1,200 master sculptors led by chief architect Bisu Maharana and his son Dharmapada over 12 years.',
      'Hosts the world-renowned Konark Dance Festival every December against the floodlit temple backdrop.',
      'Depicts erotic Mithuna sculptures and military processions carved out of Khondalite stone.'
    ],
    keyHighlights: ['Astronomical Sundial Wheels', 'Natya Mandapa (Hall of Dance)', 'Aruna Stambha History', 'Chariot Horses'],
    timeTravel: {
      pastYear: '1250 CE',
      pastTitle: 'Golden Era: Full 227-Foot Sanctum & Gilded Chariot',
      pastImg: 'https://media.istockphoto.com/id/1444924249/photo/konark-sun-temple-at-sunrise-konark-temple-is-a-unesco-world-heritage-site-at-puri-odisha.jpg?s=612x612&w=0&k=20&c=5Gd3UDpZeYh8DejD4a4TTrpAZLoPw5SARAUFT7hfwRk=',
      pastDescription: 'In 1250 CE, Konark possessed an imposing 227-ft towering main Vimana sanctum tower topped by a massive magnetic pinnacle, with 7 galloping stone stallions leading the Sun God across the sea.',
      presentYear: '2026 CE',
      presentTitle: 'Present Day: Majestic Assembly Hall & Preserved Sundials',
      presentImg: 'https://media.istockphoto.com/id/1444924249/photo/konark-sun-temple-at-sunrise-konark-temple-is-a-unesco-world-heritage-site-at-puri-odisha.jpg?s=612x612&w=0&k=20&c=5Gd3UDpZeYh8DejD4a4TTrpAZLoPw5SARAUFT7hfwRk=',
      presentDescription: 'Today, the surviving 128-ft Jagamohana assembly hall, 24 sundials, and the carved Natya Mandapa stand protected by the Archaeological Survey of India and UNESCO as a wonder of ancient engineering.'
    },
    folklore: {
      title: 'The Legend of Dharmapada: The 12-Year-Old Savior',
      audioDuration: '3 mins 45 secs',
      narrator: 'Guru Jagabandhu (Odisha Heritage Scholar)',
      story: 'For 12 years, 1,200 master sculptors under chief artisan Bisu Maharana struggled to fix the heavy Dadhinauti (crown stone) on the pinnacle of the Sun Temple. King Narasimhadeva I declared that if the work was not completed by dawn, all 1,200 craftsmen would be executed. Dharmapada, the 12-year-old son of Bisu Maharana who had never seen his father, arrived at the site. Possessing divine architectural instinct, he scaled the scaffolding in darkness and placed the crown stone into perfect alignment. Realizing that the King would punish the craftsmen for letting a child complete what they could not, Dharmapada leaped from the temple spire into the ocean, sacrificing his life to save his father and 1,200 families.'
    }
  },
  {
    id: 'puri-jagannath-temple',
    name: 'Shree Jagannath Temple, Puri',
    odiaName: 'ଶ୍ରୀ ଜଗନ୍ନାଥ ମନ୍ଦିର, ପୁରୀ',
    location: 'Bada Danda, Puri',
    district: 'Puri',
    era: '1161 CE (12th Century)',
    builtBy: 'King Anantavarman Chodaganga Deva',
    dynasty: 'Eastern Ganga Dynasty',
    significance: 'One of the Char Dham sacred Hindu pilgrimage sites. Home to Lord Jagannath, Balabhadra, and Devi Subhadra. Host to the legendary annual Rath Yatra.',
    image: 'https://i.pinimg.com/736x/7e/f1/9c/7ef19cc13322d0e8cfd322b7203b8d77.jpg',
    audioScript: 'You are experiencing the spiritual epicenter of Odisha: Shree Jagannath Temple in Puri, consecrated in the 12th century. The temple spire rises 214 feet high, crowned by the Nilachakra (Blue Wheel) and the holy Patitapabana flag that defies natural physics by fluttering against the wind. In the Anandabazar courtyard, the legendary Mahaprasad is cooked over wood fires inside 7 earthen pots stacked vertically atop each other.',
    timings: '5:30 AM (Mangala Alati) – 10:00 PM (Pahuda)',
    entryFee: 'Free entry (Traditional dress code mandatory; leather items strictly prohibited)',
    facts: [
      'The shadow of the main temple gopuram is never visible on the ground at any time of day.',
      'The world-famous Rath Yatra chariot festival draws over 1.5 million devotees annually.',
      'The temple kitchen (Rosaghara) feeds over 50,000 pilgrims daily with the sacred 56-item Mahaprasad.',
      'The wooden Daru Murtis are ceremoniously renewed every 12 to 19 years during the Nabakalebara festival.'
    ],
    keyHighlights: ['Nilachakra & Patitapabana', 'Anandabazar (Mahaprasad)', 'Mukti Mandapa', 'Simhadwara (Lion Gate)'],
    timeTravel: {
      pastYear: '1161 CE',
      pastTitle: '12th Century: Consecration of the Nilachakra by King Chodaganga',
      pastImg: 'https://i.pinimg.com/736x/7e/f1/9c/7ef19cc13322d0e8cfd322b7203b8d77.jpg',
      pastDescription: 'Consecrated by the Eastern Ganga Dynasty over sacred earlier foundations, establishing the 56 daily offerings and the unbroken lineage of Sevayats.',
      presentYear: '2026 CE',
      presentTitle: 'Modern Era: Srimandir Parikrama Heritage Corridor',
      presentImg: 'https://i.pinimg.com/736x/7e/f1/9c/7ef19cc13322d0e8cfd322b7203b8d77.jpg',
      presentDescription: 'The upgraded 75-meter heritage corridor surrounds the temple with sandstone circumambulation plazas, pilgrims amenities, and uninterrupted views of the Patitapabana flag.'
    },
    folklore: {
      title: 'The Miracle of the Floating Daru & Mahaprasad Pots',
      audioDuration: '4 mins 10 secs',
      narrator: 'Pandit Das (Puri Srimandir Scholar)',
      story: 'Legend tells how King Indradyumna was guided in a dream to find the holy Daru log floating at the seashore in Puri. The divine sculptor Vishwakarma arrived in the guise of an old craftsman named Ananta Maharana, agreeing to carve the deities on the condition that he remain undisturbed inside closed doors for 21 days. When Queen Gundicha opened the door on the 14th day out of anxiety, the sculptor vanished, leaving behind the sacred unfinished forms of Jagannath, Balabhadra, and Subhadra with large circular eyes, embodying the formless divine that embraces all humanity without discrimination.'
    }
  },
  {
    id: 'lingaraj-temple',
    name: 'Lingaraj Temple, Bhubaneswar',
    odiaName: 'ଶ୍ରୀ ଲିଙ୍ଗରାଜ ମନ୍ଦିର',
    location: 'Old Town, Ekamra Kshetra, Bhubaneswar',
    district: 'Khurda',
    era: '1090 – 1104 CE (11th Century)',
    builtBy: 'King Jajati Keshari & King Lalatendu Keshari',
    dynasty: 'Somavamsi Dynasty',
    significance: 'The crowning jewel of Kalinga architecture in Bhubaneswar. Dedicated to Harihara, representing the unified form of Lord Shiva and Lord Vishnu.',
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4d/Lingaraj_temple_Bhubaneswar.jpg/1920px-Lingaraj_temple_Bhubaneswar.jpg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail&_=20160928072727',
    audioScript: 'Lingaraj Temple dominates the skyline of Bhubaneswar with its majestic 180-foot deula spire. Built in the Kalinga architectural style, it embodies the harmonious syncretism of Shaivism and Vaishnavism, where the presiding deity Harihara is worshipped with both Bilva leaves and Tulsi leaves. Adjacent lies the sacred Bindusagar Lake, said to contain water droplets from every holy river in India.',
    timings: '6:00 AM – 9:00 PM',
    entryFee: 'Free entry (Viewable by international tourists from designated viewing platform)',
    facts: [
      'Constructed entirely of red sandstone over a vast 250,000 sq ft walled compound with 108 secondary shrines.',
      'The sacred Bindusagar tank holds drops from sacred water bodies across the Indian subcontinent.',
      'Features elaborate sculptures of celestial damsels, musicians, and lions pouncing on elephants.'
    ],
    keyHighlights: ['Deula 55m Spire', 'Bindusagar Holy Lake', 'Bhubaneswar Old Town Heritage Walk', 'Rajarani Temple Proximity'],
    timeTravel: {
      pastYear: '1100 CE',
      pastTitle: 'Somavamsi Empire: Epicenter of Ekamra Kshetra',
      pastImg: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4d/Lingaraj_temple_Bhubaneswar.jpg/1920px-Lingaraj_temple_Bhubaneswar.jpg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail&_=20160928072727',
      pastDescription: 'Surrounded by over 1,000 sacred stone shrines and the shimmering waters of Bindusagar, serving as the cultural and Shaivite capital of ancient Kalinga.',
      presentYear: '2026 CE',
      presentTitle: 'Ekamra Kshetra Heritage Revitalization',
      presentImg: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4d/Lingaraj_temple_Bhubaneswar.jpg/1920px-Lingaraj_temple_Bhubaneswar.jpg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail&_=20160928072727',
      presentDescription: 'Modern restored stone promenades, Bindusagar lakefront beautification, and pedestrian heritage walks linking Lingaraj with Mukteshwar and Rajarani.'
    },
    folklore: {
      title: 'The Harmony of Harihara & the Legend of Bindusagar',
      audioDuration: '3 mins 20 secs',
      narrator: 'Dr. S. Mohanty (Ekamra Historian)',
      story: 'According to Ekamra Purana, Goddess Parvati defeated two formidable demons, Chanda and Munda, in the mango groves of Ekamra Kshetra. To quench her thirst after battle, Lord Shiva struck the earth with his trident, bringing water from all sacred rivers, tanks, and streams of India together to form the sacred Bindusagar Lake.'
    }
  },
  {
    id: 'dhauli-shanti-stupa',
    name: 'Dhauli Giri Shanti Stupa',
    odiaName: 'ଧଉଳି ଶାନ୍ତି ସ୍ତୂପ',
    location: 'Dhauli Hills, Daya River bank',
    district: 'Khurda',
    era: '261 BCE (War) / 1972 CE (Stupa)',
    builtBy: 'Emperor Ashoka Edicts / Indo-Japanese Buddhist Sangha',
    dynasty: 'Maurya Empire / Modern Buddhist Sangha',
    significance: 'Historic battlefield of the Kalinga War (261 BCE), where Emperor Ashoka renounced violence and embraced Buddhism and Ahimsa.',
    image: 'https://live.staticflickr.com/3903/14897731738_9d737478e9_b.jpg',
    audioScript: 'Standing atop Dhauli Giri overlooking the serene Daya River, you stand at one of the greatest turning points in world history. Following the catastrophic Kalinga War in 261 BCE, Emperor Ashoka experienced deep remorse upon seeing the river run red, leading him to adopt Buddhism. The Ashokan rock edicts preserved at the base still proclaim justice and compassion.',
    timings: '6:00 AM – 7:30 PM (Evening Light & Sound Show)',
    entryFee: 'Free (₹25 for Light & Sound Show)',
    facts: [
      'Preserves Ashoka Major Rock Edicts carved in early Brahmi script on a natural rock elephant head.',
      'The modern Peace Pagoda was built jointly by the Kalinga Nippon Buddha Sangha in 1972.',
      'Spectacular evening laser light and sound show narrating the story of Kalinga War and Ashoka.'
    ],
    keyHighlights: ['Ashokan Rock Edicts', 'White Peace Pagoda', 'Daya River Vista', 'Evening Sound & Light Show'],
    timeTravel: {
      pastYear: '261 BCE',
      pastTitle: 'The Kalinga War Battlefield & Rock Edict Proclamations',
      pastImg: 'https://live.staticflickr.com/3903/14897731738_9d737478e9_b.jpg',
      pastDescription: 'The battle that transformed Indian history. Emperor Ashoka carved the Rock Edicts ordering his governors to treat all citizens like his own children.',
      presentYear: '2026 CE',
      presentTitle: 'World Peace Pagoda & Laser Projection Amphitheater',
      presentImg: 'https://live.staticflickr.com/3903/14897731738_9d737478e9_b.jpg',
      presentDescription: 'A dome-shaped white stupa crowned by five stone umbrellas, illuminated by evening sound-and-light laser shows.'
    },
    folklore: {
      title: 'From Chandashoka to Dharmashoka: The Epiphany on River Daya',
      audioDuration: '3 mins 30 secs',
      narrator: 'Prof. P. Tripathy (Buddhist Studies)',
      story: 'Over 100,000 warriors perished in the defense of Kalinga democracy. As Emperor Ashoka walked across the corpse-strewn banks of Daya River, a Buddhist monk named Upagupta challenged him to bring life back to a single fallen soldier. Overcome by grief and the sheer devastation of his ambition, Ashoka threw down his sword, renouncing conquest by violence (Digvijaya) and inaugurating an era of moral conquest through righteousness (Dharmavijaya).'
    }
  },
  {
    id: 'udayagiri-khandagiri-caves',
    name: 'Udayagiri & Khandagiri Twin Caves',
    odiaName: 'ଉଦୟଗିରି ଓ ଖଣ୍ଡଗିରି ଗୁମ୍ଫା',
    location: 'Bhubaneswar, Khurda District',
    district: 'Khurda',
    era: '2nd Century BCE',
    builtBy: 'Emperor Kharavela',
    dynasty: 'Mahameghavahana / Chedi Dynasty',
    significance: 'Historic rock-cut cave dwellings and meditation retreats of Jain monks. Features the famous 17-line Hathigumpha inscription in Brahmi script detailing Kharavela reign.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNl5du90fXLXEyCwso_xIcC8mTnGPrOquKut66ssNZxQ&s=10',
    audioScript: 'Welcome to the Udayagiri and Khandagiri Twin Caves, excavated in the 2nd century BCE under Emperor Kharavela of Kalinga. Udayagiri features 18 caves including the grand double-storeyed Ranigumpha with its acoustic courtyards, and Hathigumpha preserving the invaluable 17-line biographical inscription. Khandagiri houses 15 caves adorned with reliefs of the 24 Jain Tirthankaras.',
    timings: '9:00 AM – 6:00 PM (Daily)',
    entryFee: '₹25 (Indians) / ₹300 (Foreigners)',
    facts: [
      'The 17-line Hathigumpha inscription in Prakrit language is a primary epigraphic source for ancient Indian history.',
      'Ranigumpha (Queen Cave) features two levels of sculpted friezes and served as an ancient open-air amphitheater.',
      'Features elaborate rock carvings of royal processions, winged animals, and Jain Tirthankaras like Rishabhanatha and Parshvanatha.'
    ],
    keyHighlights: ['Hathigumpha 17-Line Inscription', 'Ranigumpha Royal Amphitheater', '24 Jain Tirthankara Sculptures', 'Panoramic Bhubaneswar Vista'],
    timeTravel: {
      pastYear: '150 BCE',
      pastTitle: 'Kharavela Empire: Jain Monastic Hermitage',
      pastImg: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNl5du90fXLXEyCwso_xIcC8mTnGPrOquKut66ssNZxQ&s=10',
      pastDescription: 'Revered Jain monks meditated in stone cells carved with sloping stone pillows, while Emperor Kharavela convened assembly meetings in the Ranigumpha court.',
      presentYear: '2026 CE',
      presentTitle: 'ASI Protected National Monument & Rock Art Preserve',
      presentImg: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNl5du90fXLXEyCwso_xIcC8mTnGPrOquKut66ssNZxQ&s=10',
      presentDescription: 'Protected heritage park with landscaped hillside walkways, interpretive signage, and conservation of ancient Brahmi epigraphs.'
    },
    folklore: {
      title: 'The Triumphant Return of Kalinga Jina',
      audioDuration: '3 mins 15 secs',
      narrator: 'Dr. B. K. Rath (Kalinga Archaeological Council)',
      story: 'Centuries after the Nanda rulers of Magadha seized the sacred Kalinga Jina idol during war, Emperor Kharavela led his armies to Magadha, accepted the surrender of King Bahasatimita, and restored the sacred idol back to Kalinga in triumph, enshrining it in the hills of Udayagiri with elaborate royal honors.'
    }
  }
];

export const ODISHA_HANDICRAFTS: HandicraftItem[] = [
  {
    id: 'raghurajpur-pattachitra-tree-of-life',
    name: 'Raghurajpur Pattachitra "Tree of Life"',
    odiaName: 'ରଘୁରାଜପୁର ପଟ୍ଟଚିତ୍ର',
    artisanName: 'Bipin Bihari Mahapatra (State Awardee)',
    village: 'Raghurajpur Heritage Village',
    district: 'Puri',
    priceInr: 8500,
    priceUsd: 105,
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80',
    rating: 5.0,
    reviewCount: 38,
    giTagged: true,
    material: 'Natural pigment on cotton-cloth treated with tamarind seed paste',
    description: '100% handmade traditional scroll painting from Raghurajpur. Painted using minerals, conch-shell white, lamp black, and vegetable dyes with a fine squirrel-hair brush.',
    craftTime: '3 Weeks'
  },
  {
    id: 'cuttack-silver-tarakasi-wheel',
    name: 'Cuttack Tarakasi Silver Filigree Sun Wheel',
    odiaName: 'କଟକ ତାରକସି ରୂପା କାରିଗରୀ',
    artisanName: 'Prabhat Kumar Sahu',
    village: 'Alisha Bazar, Cuttack',
    district: 'Cuttack',
    priceInr: 12500,
    priceUsd: 150,
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    reviewCount: 42,
    giTagged: true,
    material: '92.5% Sterling Silver wire drawn to hair-thin gauge',
    description: 'Iconic GI-tagged Cuttack Tarakasi art. Thin wires of pure silver are twisted, curled, and soldered with pin-point precision to form the celebrated Konark chariot wheel.',
    craftTime: '18 Days'
  },
  {
    id: 'pipili-applique-chandua-hanging',
    name: 'Pipili Applique Royal Wall Tapestry (Chandua)',
    odiaName: 'ପିପିଲି ଚାନ୍ଦୁଆ କାମ',
    artisanName: 'Ayesha & Fakir Charan Guild',
    village: 'Pipili Market',
    district: 'Puri',
    priceInr: 3200,
    priceUsd: 40,
    image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=600&q=80',
    rating: 4.8,
    reviewCount: 65,
    giTagged: true,
    material: 'Layered pure cotton fabric with traditional mirror embroidery',
    description: 'Direct from Pipili, the town that stitches the ceremonial canopies for the Rath Yatra chariots. Features peacock, elephant, and lotus motifs with mirror-work accents.',
    craftTime: '6 Days'
  },
  {
    id: 'sambalpuri-ikat-silk-saree',
    name: 'Sambalpuri Bandhakala Pure Silk Saree',
    odiaName: 'ସମ୍ବଲପୁରୀ ବନ୍ଧ ରେଶମ ଶାଢ଼ୀ',
    artisanName: 'Meher Weavers Cooperative',
    village: 'Bargarh Handloom Cluster',
    district: 'Bargarh',
    priceInr: 18500,
    priceUsd: 225,
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80',
    rating: 5.0,
    reviewCount: 51,
    giTagged: true,
    material: '100% Pure Mulberry Silk with Tie-and-Dye warp and weft',
    description: 'Geographical Indication certified Sambalpuri Bandha. The warp and weft threads are individually tied and dyed before weaving to create the iconic temple border and shankha-chakra motifs.',
    craftTime: '1 Month'
  },
  {
    id: 'dhenkanal-dhokra-bell-metal',
    name: 'Dhenkanal Dhokra Tribal Musician Sculpture',
    odiaName: 'ଢେଙ୍କାନାଳ ଢୋକ୍ରା ପିତ୍ତଳ କଳା',
    artisanName: 'Sadeibarani Artisan Guild',
    village: 'Sadeibarani',
    district: 'Dhenkanal',
    priceInr: 4500,
    priceUsd: 55,
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80',
    rating: 4.8,
    reviewCount: 29,
    giTagged: true,
    material: 'Brass & Bronze non-ferrous metal using lost-wax casting (Cire Perdue)',
    description: 'An ancient lost-wax metal technique dating back 4,000 years to the Indus Valley Dancing Girl. Depicts rural folk musicians playing tribal horns and drums.',
    craftTime: '10 Days'
  }
];

export const ODISHA_WORKSHOPS: WorkshopItem[] = [
  {
    id: 'ws-raghurajpur-pattachitra',
    title: 'Master Pattachitra Painting with Heritage Chitrakaras',
    odiaTitle: 'ପଟ୍ଟଚିତ୍ର ପ୍ରଶିକ୍ଷଣ ଶିବିର',
    masterArtisan: 'Guru Rabindra Maharana (National Awardee)',
    location: 'Raghurajpur Heritage Craft Village, Puri',
    duration: '3.5 Hours',
    priceInr: 2200,
    priceUsd: 28,
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80',
    maxParticipants: 8,
    includes: ['Treated canvas scroll', 'Natural stone pigments', 'Handmade bamboo brushes', 'Take-home painted artwork', 'Odisha herbal tea & Chhena Poda'],
    description: 'Immerse yourself inside an authentic artisan home in Raghurajpur. Grind mineral stones with water and learn the line-work secrets of temple murals.'
  },
  {
    id: 'ws-cuttack-silver-filigree',
    title: 'Cuttack Tarakasi (Silver Filigree) Wire-Twisting Workshop',
    odiaTitle: 'କଟକ ତାରକସି ରୂପା କାରିଗରୀ କର୍ମଶାଳା',
    masterArtisan: 'Master Sahu & Apprentices',
    location: 'Chandi Chowk Artisan Studio, Cuttack',
    duration: '3 Hours',
    priceInr: 3500,
    priceUsd: 42,
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80',
    maxParticipants: 6,
    includes: ['Silver wire crafting kit', 'Precision tweezers and soldering demo', 'Custom silver pendant to take home', 'Cuttack Dahi Bara refreshment'],
    description: 'Discover the 500-year-old art of drawing silver into thread-thin wires and forming delicate floral jali patterns with generational silversmiths.'
  },
  {
    id: 'ws-pipili-applique-chandua',
    title: 'Pipili Applique & Mirror Embroidery Masterclass',
    odiaTitle: 'ପିପିଲି ଚାନ୍ଦୁଆ ଶିକ୍ଷା',
    masterArtisan: 'Ustad Abdul & Sunita Mohanty',
    location: 'Main Bazar, Pipili',
    duration: '2.5 Hours',
    priceInr: 1800,
    priceUsd: 22,
    image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=600&q=80',
    maxParticipants: 10,
    includes: ['Colorful cotton fabric patches', 'Handcrafted mirrors & needle kit', 'Personal decorative tote bag created by you', 'Pipili traditional sweets'],
    description: 'Learn the geometric cutting and stitch techniques that embellish the majestic chariots of Taladhwaja, Darpadalana, and Nandighosa.'
  }
];

export const ODISHA_RESORTS: LuxuryResort[] = [
  {
    id: 'mayfair-waves-puri',
    name: 'Mayfair Waves Seafront Luxury Resort',
    location: 'Chakratirtha Road, Puri Beach',
    district: 'Puri',
    priceInr: 16500,
    priceUsd: 198,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    category: '5-Star Oceanfront Heritage Resort',
    features: ['Private beach access to Blue Flag Golden Sands', 'Samudra ocean-view dining with temple delicacies', 'Luxury Ayurvedic Spa', 'Infinity ocean pool', 'VIP Jagannath Temple Darshan Assistance'],
    description: 'Puri premier 5-star beachfront retreat where the sound of the Bay of Bengal waves meets royal Odia hospitality and world-class luxury.'
  },
  {
    id: 'swosti-chilika-resort',
    name: 'Swosti Chilika Eco-Luxury Resort',
    location: 'Odisha Eco-Zone, Chilika Lake, Ganjam',
    district: 'Ganjam / Puri border',
    priceInr: 14000,
    priceUsd: 168,
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80',
    category: 'Eco-Luxury Lakefront Sanctuary',
    features: ['Over-lagoon villas with private sundecks', 'Private boat cruises to Nalabana bird sanctuary', 'Irrawaddy Dolphin sightings at sunrise', 'Ekaya Organic Spa', 'Authentic fresh Chilika Crab & Prawn dining'],
    description: 'Set along the tranquil shores of Asia largest brackish water lagoon, this world-class eco-resort offers ultra-luxury amid flamingos and serene wetlands.'
  },
  {
    id: 'belgadia-palace-mayurbhanj',
    name: 'The Belgadia Palace (18th Century Royal Residence)',
    location: 'Baripada, Mayurbhanj',
    district: 'Mayurbhanj',
    priceInr: 18000,
    priceUsd: 215,
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
    category: 'Living Victorian Royal Palace',
    features: ['Private suites hosted by the Bhanja Deo Royal Family', 'Exclusive Mayurbhanj Chhau martial dance performance', 'Private safari access to Similipal Tiger Reserve', 'Royal heirloom collection & library', 'Baripada Mudhi Mansa royal dining'],
    description: 'A 200-year-old Victorian-era royal residence set in Mayurbhanj. Sleep in authentic palace suites adorned with chandeliers and antique royal heirlooms.'
  },
  {
    id: 'mayfair-palm-beach-gopalpur',
    name: 'Mayfair Palm Beach Resort, Gopalpur-on-Sea',
    location: 'Gopalpur Beachfront',
    district: 'Ganjam',
    priceInr: 13500,
    priceUsd: 160,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80',
    category: 'Colonial Beachfront Luxury Resort',
    features: ['Direct beach access with lighthouse view', 'Colonial heritage architecture', 'Fresh coastal seafood barbecue', 'Chilika and Tampara Lake day expeditions'],
    description: 'Originally built in 1914 by an Italian signor, this heritage property sits on the golden shores of Gopalpur, surrounded by casuarina groves.'
  }
];

export const ODISHA_PACKAGES: OdishaPackage[] = [
  {
    id: 'odisha-golden-triangle-luxury',
    title: 'The Golden Triangle Heritage Odyssey',
    route: 'Bhubaneswar • Konark • Puri • Raghurajpur',
    duration: '4 Days / 3 Nights',
    priceInr: 32000,
    priceUsd: 385,
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80',
    badge: 'Most Popular',
    highlights: ['Ekamra Kshetra Temples (Lingaraj, Mukteshwar)', 'Konark Sun Temple with Master Historian', 'VIP Darshan at Puri Jagannath Temple', 'Raghurajpur Crafts Village Private Tour', 'Marine Drive Sunset Coastal Drive'],
    description: 'The definitive journey through Odisha spiritual core, UNESCO monuments, and generational craft sanctuaries.'
  },
  {
    id: 'chilika-wildlife-lagoon-safari',
    title: 'Chilika Lagoon & Wildlife Eco-Safari',
    route: 'Bhubaneswar • Satapada • Nalabana • Kalijai',
    duration: '3 Days / 2 Nights',
    priceInr: 26000,
    priceUsd: 315,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    badge: 'Eco Safari',
    highlights: ['Irrawaddy Dolphin Catamaran Cruise', 'Birdwatching with Wetland Naturalist', 'Overnight luxury stay at Swosti Chilika', 'Kalijai Island Fishermen Shrine', 'Fresh coastal lagoon prawns & crab banquet'],
    description: 'Breathe in the unspoiled wilderness of Asia largest lagoon, home to over 160 migratory avian species from Siberia and the Caspian Sea.'
  },
  {
    id: 'royal-mayurbhanj-similipal',
    title: 'Royal Mayurbhanj & Similipal Tiger Trail',
    route: 'Baripada • Similipal National Park • Barehipani',
    duration: '4 Days / 3 Nights',
    priceInr: 42000,
    priceUsd: 505,
    image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
    badge: 'Royal Heritage',
    highlights: ['Stay at 200-year-old Belgadia Palace', 'Similipal Tiger Reserve Guided Safari', 'Barehipani (399m) & Joranda Waterfalls', 'Live Mayurbhanj Chhau Martial Dance', 'Dokra & Sabai grass tribal villages'],
    description: 'An exclusive heritage expedition into the kingdom of Mayurbhanj, combining royal palatial living with the raw wilderness of UNESCO Similipal.'
  }
];

export const ODISHA_WEDDINGS: WeddingPackage[] = [
  {
    id: 'puri-marine-drive-beach-wedding',
    title: 'Puri-Konark Marine Drive Coastal Beach Wedding',
    venue: 'Mayfair Waves & Golden Beach Private Sands',
    location: 'Puri, Odisha',
    priceInr: 850000,
    priceUsd: 10200,
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    capacity: 'Up to 350 Guests',
    tag: 'Coastal Royalty',
    inclusions: [
      'Mandap overlooking the sacred Bay of Bengal sunset',
      'Puri Jagannath Temple blessings & Mahaprasad wedding feast counters',
      'Live Odissi classical musicians and Gotipua welcome dance',
      'Luxury ocean suites for family and guests',
      'Drone cinematography across the Golden Sands'
    ],
    description: 'Exchange sacred vows as ocean breezes whisper blessings, with temple culinary traditions and grand Odia royal hospitality.'
  },
  {
    id: 'belgadia-palace-royal-wedding',
    title: 'The Belgadia Palace Grand Royal Wedding',
    venue: 'The Belgadia Palace Courtyard & Royal Lawns',
    location: 'Baripada, Mayurbhanj',
    priceInr: 1250000,
    priceUsd: 15000,
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
    capacity: 'Up to 250 Guests',
    tag: 'Palatial Splendor',
    inclusions: [
      'Complete palace buyout for 3 days of ceremonies',
      'Imperial elephant & horse procession with royal buglers',
      'Mayurbhanj Chhau martial performers for Sangeet night',
      'Bespoke royal feast prepared by the Bhanja Deo palace cooks',
      'Royal suites accommodation with personalized butler service'
    ],
    description: 'Live like maharajas for your nuptials in an authentic 18th-century royal palace surrounded by manicured grounds and Victorian architecture.'
  }
];

export const ODISHA_TRANSIT_OPTIONS = [
  {
    id: 'train-vande-bharat',
    mode: 'trains',
    name: 'Puri - Howrah Vande Bharat Express (22896)',
    from: 'Puri Railway Station (PURI)',
    to: 'Howrah Junction (HWH) via Bhubaneswar (BBI) & Cuttack (CTC)',
    departure: '01:50 PM',
    arrival: '08:30 PM',
    duration: '6 hrs 40 mins',
    priceInr: 1425,
    priceUsd: 18,
    class: 'AC Chair Car & Executive Class',
    frequency: '6 Days a week'
  },
  {
    id: 'flight-air-india-del-bbi',
    mode: 'flights',
    name: 'Air India / IndiGo Non-Stop',
    from: 'New Delhi (DEL)',
    to: 'Bhubaneswar Biju Patnaik International (BBI)',
    departure: '07:15 AM',
    arrival: '09:25 AM',
    duration: '2 hrs 10 mins',
    priceInr: 6800,
    priceUsd: 82,
    class: 'Economy & Business Class',
    frequency: 'Daily 8+ Flights'
  },
  {
    id: 'bus-mo-bus-ac-e-bus',
    mode: 'buses',
    name: 'Mo Bus / OSRTC Super Deluxe AC Air-Conditioned Coach',
    from: 'Bhubaneswar Master Canteen / Baramunda ISBT',
    to: 'Puri Bada Danda / Sea Beach',
    departure: 'Every 20 Minutes (06:00 AM – 10:30 PM)',
    arrival: 'Within 1h 20m via NH-316',
    duration: '1 hr 20 mins',
    priceInr: 110,
    priceUsd: 1.5,
    class: 'Green AC Electric Mo Bus',
    frequency: 'High Frequency'
  },
  {
    id: 'cruise-chilika-catamaran',
    mode: 'cruises',
    name: 'Odisha Tourism Chilika Lagoon Catamaran Cruise',
    from: 'Satapada Jetty (Puri side)',
    to: 'Sea Mouth, Rajhans Island & Kalijai Island',
    departure: '08:30 AM / 11:30 AM / 02:30 PM',
    arrival: 'Return Cruise',
    duration: '3 hrs 30 mins',
    priceInr: 1850,
    priceUsd: 22,
    class: 'Glass-Bottom Eco-Catamaran with Dolphin Spotting',
    frequency: 'Daily'
  },
  {
    id: 'car-marine-drive-chauffeur',
    mode: 'cars',
    name: 'Private Heritage Chauffeur: Bhubaneswar - Puri - Konark Marine Drive',
    from: 'Doorstep Pickup (Airport / Hotel)',
    to: 'Complete Golden Triangle Sightseeing with Chauffeur',
    departure: 'Flexible on-demand',
    arrival: 'Full Day Dedicated Service',
    duration: 'Full Day (10 Hours)',
    priceInr: 3800,
    priceUsd: 46,
    class: 'Innova Hycross / Luxury Sedan with English/Odia Guide',
    frequency: 'Instant Booking'
  }
];

export interface OdishaFestival {
  id: string;
  name: string;
  odiaName: string;
  location: string;
  season: string;
  significance: string;
  highlight: string;
  image: string;
}

export const ODISHA_FESTIVALS: OdishaFestival[] = [
  {
    id: 'rath-yatra',
    name: 'Shree Jagannath Rath Yatra',
    odiaName: 'ରଥଯାତ୍ରା',
    location: 'Puri Bada Danda',
    season: 'June - July (Ashadha Shukla Dwitiya)',
    significance: 'World famous Grand Chariot Festival where Lord Jagannath, Balabhadra & Subhadra journey on Nandighosa to Gundicha Temple.',
    highlight: 'Over 1 million devotees pulling gigantic wooden chariots; Chhera Pahanra ritual by Gajapati King of Puri.',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'konark-dance-festival',
    name: 'Konark Dance & International Sand Art Festival',
    odiaName: 'କୋଣାର୍କ ନୃତ୍ୟ ଉତ୍ସବ',
    location: 'Konark Sun Temple & Chandrabhaga Beach',
    season: 'December 1 to 5 annually',
    significance: 'Celebration of Odissi, Bharatanatyam, Kathak, Manipuri against the illuminated backdrop of the Sun Temple.',
    highlight: 'World-renowned sand sculptors led by Sudarsan Pattnaik creating masterpieces on Chandrabhaga Beach.',
    image: 'https://images.unsplash.com/photo-1561361066-61386762e845?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'bali-jatra',
    name: 'Cuttack Historic Bali Jatra',
    odiaName: 'ବାଲିଯାତ୍ରା',
    location: 'Barabati Fort Ground, Mahanadi River Banks, Cuttack',
    season: 'November (Kartika Purnima)',
    significance: 'Commemorates ancient maritime merchants (Sadhabas) who sailed overseas in Boitas to Bali, Java, and Sumatra for trade.',
    highlight: 'Asia largest open-air trade and cultural fair with over 1,500 cultural pavilions and food stalls.',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'dhanu-jatra',
    name: 'Bargarh Dhanu Jatra',
    odiaName: 'ଧନୁଯାତ୍ରା',
    location: 'Bargarh, Western Odisha',
    season: 'December - January',
    significance: 'Recognized as the world largest open-air theater spanning an entire 8-kilometer township.',
    highlight: 'King Kansa rules the city during the festival; ministers and district magistrates follow his mock royal edicts.',
    image: 'https://images.unsplash.com/photo-1609743522653-52354461eb27?auto=format&fit=crop&w=800&q=80'
  }
];

export interface OdishaDish {
  id: string;
  name: string;
  odiaName: string;
  category: 'Sweet' | 'Savory' | 'Temple' | 'Seafood';
  origin: string;
  description: string;
  mustTrySpot: string;
}

export const ODISHA_CUISINE: OdishaDish[] = [
  {
    id: 'chhena-poda',
    name: 'Chhena Poda (Roasted Sweet Cheese Cake)',
    odiaName: 'ଛେନାପୋଡ଼',
    category: 'Sweet',
    origin: 'Nayagarh District',
    description: 'Fresh cow milk cottage cheese kneaded with sugar, cardamom, and cashews, then slow-baked wrapped in Sal leaves for hours until the crust caramelizes into golden perfection.',
    mustTrySpot: 'Nayagarh Heritage Sweet Stalls & Nimapada'
  },
  {
    id: 'puri-mahaprasad',
    name: 'Puri Mahaprasad (56 Bhog Abhada)',
    odiaName: 'ମହାପ୍ରସାଦ',
    category: 'Temple',
    origin: 'Shree Jagannath Temple, Puri',
    description: 'Sacred offerings cooked in seven clay pots placed one on top of the other over a wood fire. The top pot cooks first without garlic or onions.',
    mustTrySpot: 'Anandabazar, Puri Jagannath Temple'
  },
  {
    id: 'dahi-bara-aloo-dum',
    name: 'Cuttack Dahi Bara Aloo Dum',
    odiaName: 'ଦହିବରା ଆଳୁଦମ',
    category: 'Savory',
    origin: 'Bidanasi & Buxi Bazaar, Cuttack',
    description: 'Soft urad dal fritters soaked in light, spiced, tempered curd water, topped with slow-simmered spicy potato curry (Aloo Dum), yellow peas (Ghooguni), sev, and fresh coriander.',
    mustTrySpot: 'Raghu Dahi Bara (Cuttack) & Master Canteen'
  },
  {
    id: 'pahal-rasagola',
    name: 'Pahal GI Rasagola',
    odiaName: 'ପହଳ ରସଗୋଲା',
    category: 'Sweet',
    origin: 'Pahal Village, NH-16 (Bhubaneswar - Cuttack)',
    description: 'Odisha GI-certified traditional melt-in-the-mouth cottage cheese dumplings cooked in mild warm cardamom syrup. Velvety texture distinctive to Odia temple history.',
    mustTrySpot: 'National Highway 16 Sweet Corridor, Pahal'
  },
  {
    id: 'chilika-crab-curry',
    name: 'Chilika Giant Mud Crab Kalia',
    odiaName: 'ଚିଲିକା କଙ୍କଡ଼ା କାଳିଆ',
    category: 'Seafood',
    origin: 'Satapada, Chilika Lake',
    description: 'Freshly harvested brackish water mud crabs prepared with freshly ground mustard paste, ginger, garlic, and slow-fried aromatic Odia spices.',
    mustTrySpot: 'Chilika Dhaba (Barkul) & OTDC Panthanivas'
  }
];
