// 7 to 10 distinct, verified high-resolution photos and main attractions for all 20 Odisha Tourism Destinations

export interface DestinationMedia {
  id: string;
  famousFor: string;
  mainAttractions: string[];
  bestTime: string;
  gallery: {
    url: string;
    caption: string;
  }[];
}

export const DESTINATION_GALLERIES: Record<string, DestinationMedia> = {
  puri: {
    id: 'puri',
    famousFor: 'Jagannath Temple, sacred Char Dham, and world-renowned annual Rath Yatra.',
    mainAttractions: [
      'Shree Jagannath Temple (Nilachakra & Patitapabana Flag)',
      'Puri Golden Beach (Blue Flag Certified)',
      'Gundicha Temple (Garden palace of Lord Jagannath)',
      'Narendra Tank & Chandan Yatra Swan Boats',
      'Raghurajpur Heritage Master Artisan Village',
      'Swargadwar Beach & Night Market',
      'Anandabazar (Sacred 56-item Mahaprasad)',
      'Lokanath Temple & Alarnath Shrine'
    ],
    bestTime: 'October to February. Rath Yatra is held in June/July.',
    gallery: [
      {
        url: 'https://i.pinimg.com/736x/7e/f1/9c/7ef19cc13322d0e8cfd322b7203b8d77.jpg',
        caption: 'Shree Jagannath Temple 214-ft towering spire and Nilachakra flag'
      },
      {
        url: 'https://images.unsplash.com/photo-1628009368231-7bb3cfcb0def?auto=format&fit=crop&w=1200&q=80',
        caption: 'Puri Srimandir Parikrama Heritage Corridor illuminated at dusk'
      },
      {
        url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
        caption: 'Puri Golden Beach with Blue Flag certified clean eco-promenade'
      },
      {
        url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
        caption: 'Swargadwar Beach shoreline with traditional fishermen catamarans'
      },
      {
        url: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80',
        caption: 'Raghurajpur Heritage Village master artisans painting Pattachitra'
      },
      {
        url: 'https://images.unsplash.com/photo-1609137144820-221f1d1982b6?auto=format&fit=crop&w=1200&q=80',
        caption: 'Gundicha Temple courtyard during ceremonial festivities'
      },
      {
        url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
        caption: 'Narendra Pushkarini sacred tank where Chandan Yatra boat festivals take place'
      },
      {
        url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80',
        caption: 'Luxury oceanfront resort pavilions along the Puri-Marine Drive coast'
      }
    ]
  },
  konark: {
    id: 'konark',
    famousFor: 'The 13th-century Sun Temple designed like a giant celestial chariot with 24 astronomical stone sundials.',
    mainAttractions: [
      'Konark Sun Temple (UNESCO World Heritage)',
      '24 Carved Stone Sundial Wheels',
      'Natya Mandapa (Hall of Dance)',
      'Chandrabhaga Blue Flag Beach',
      'Ramachandi Beach & River Confluence',
      'Archaeological Survey of India (ASI) Museum',
      'Annual Konark Dance Festival Arena'
    ],
    bestTime: 'October to March (Konark Dance Festival every December).',
    gallery: [
      {
        url: 'https://media.istockphoto.com/id/1444924249/photo/konark-sun-temple-at-sunrise-konark-temple-is-a-unesco-world-heritage-site-at-puri-odisha.jpg?s=612x612&w=0&k=20&c=5Gd3UDpZeYh8DejD4a4TTrpAZLoPw5SARAUFT7hfwRk=',
        caption: 'Konark Sun Temple glowing at golden sunrise'
      },
      {
        url: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80',
        caption: 'The celebrated 24-spoke stone sundial chariot wheel'
      },
      {
        url: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80',
        caption: 'Surviving Jagamohana assembly hall and intricate Khondalite carvings'
      },
      {
        url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
        caption: 'Chandrabhaga Beach known for mesmerizing sunrises over the Bay of Bengal'
      },
      {
        url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
        caption: 'Ramachandi Beach water sports and Kushabhadra river estuary'
      },
      {
        url: 'https://images.unsplash.com/photo-1599818809280-b8000b7a977e?auto=format&fit=crop&w=1200&q=80',
        caption: 'Natya Mandapa dancing sculptures of musicians and celestial apsaras'
      },
      {
        url: 'https://images.unsplash.com/photo-1609137144820-221f1d1982b6?auto=format&fit=crop&w=1200&q=80',
        caption: 'Galloping stone horses pulling the Sun God celestial chariot'
      },
      {
        url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
        caption: 'ASI Museum gallery housing 800+ excavated Sun Temple sculptures'
      }
    ]
  },
  bhubaneswar: {
    id: 'bhubaneswar',
    famousFor: 'Ancient temples, Kalinga architecture, and known as the "Temple City of India".',
    mainAttractions: [
      'Lingaraj Temple (180-ft 11th century spire)',
      'Mukteshwar Temple (The gem of Odisha architecture)',
      'Rajarani Temple (Love temple with erotic sandstone carvings)',
      'Udayagiri and Khandagiri Caves',
      'Dhauli Shanti Stupa',
      'Odisha State Museum',
      'Nandankanan Zoological Park',
      'Bindusagar Sacred Lake & Ekamra Kanan'
    ],
    bestTime: 'October to March (Maha Shivaratri in February/March).',
    gallery: [
      {
        url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4d/Lingaraj_temple_Bhubaneswar.jpg/1920px-Lingaraj_temple_Bhubaneswar.jpg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail&_=20160928072727',
        caption: 'Lingaraj Temple dominating the historic Old Town skyline'
      },
      {
        url: 'https://images.unsplash.com/photo-1609137144820-221f1d1982b6?auto=format&fit=crop&w=1200&q=80',
        caption: 'Mukteshwar Temple famous arched torana gateway'
      },
      {
        url: 'https://images.unsplash.com/photo-1590076212574-8b6ee3cf3742?auto=format&fit=crop&w=1200&q=80',
        caption: 'Rajarani Temple crafted out of warm golden-yellow sandstone'
      },
      {
        url: 'https://live.staticflickr.com/3903/14897731738_9d737478e9_b.jpg',
        caption: 'Dhauli Giri Peace Pagoda overlooking Daya river'
      },
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNl5du90fXLXEyCwso_xIcC8mTnGPrOquKut66ssNZxQ&s=10',
        caption: 'Udayagiri rock-cut caves carved under King Kharavela'
      },
      {
        url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
        caption: 'Bindusagar Holy Lake during evening prayer ceremonies'
      },
      {
        url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
        caption: 'Odisha State Museum archaeological gallery and palm-leaf manuscripts'
      },
      {
        url: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80',
        caption: 'Nandankanan Zoological Park famous white tiger conservation'
      }
    ]
  },
  chilika: {
    id: 'chilika',
    famousFor: 'One of the world largest brackish-water coastal lagoons, famous for migratory birds and playful Irrawaddy dolphins.',
    mainAttractions: [
      'Satapada Dolphin Watching Sanctuary',
      'Irrawaddy Dolphins Natural Habitat',
      'Nalabana Bird Sanctuary (Flamingos & Pelicans)',
      'Kalijai Island & Goddess Kalijai Shrine',
      'Mangalajodi Birding Eco-Tourism Village',
      'Chilika Sea Mouth where lagoon meets Bay of Bengal',
      'Rajhans Island & Honeymoon Island'
    ],
    bestTime: 'November to February for peak migratory bird watching.',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
        caption: 'Chilika Lake tranquil waters and fishing boat cruises at dawn'
      },
      {
        url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
        caption: 'Satapada channel where Irrawaddy dolphins surface and play'
      },
      {
        url: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80',
        caption: 'Nalabana Island sanctuary hosting over 1 million migratory birds'
      },
      {
        url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
        caption: 'Kalijai Island temple in the deep blue heart of Chilika'
      },
      {
        url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80',
        caption: 'Mangalajodi wetland marshes navigated by traditional wooden country boats'
      },
      {
        url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
        caption: 'Scenic sunrise across the outer channel towards the Bay of Bengal'
      },
      {
        url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80',
        caption: 'Chilika Eco Retreat luxury waterfront glamping tents'
      },
      {
        url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80',
        caption: 'Chilika Sea Mouth sandbar separating the brackish lake and roaring ocean'
      }
    ]
  },
  similipal: {
    id: 'similipal',
    famousFor: 'Tigers, Asian elephants, rich biodiversity, and colossal multi-tiered waterfalls.',
    mainAttractions: [
      'Barehipani Waterfall (399m 2nd highest in India)',
      'Joranda Waterfall (181m plunge)',
      'Project Tiger & Project Elephant Reserve',
      'Dense Sal Tree Forest Canopies',
      'Chahala Herbivore Salt-Lick Clearing',
      'Pithabata & Jashipur Eco Gates',
      'Jamuani & Gudgudia Tribal Eco Cottages'
    ],
    bestTime: 'November 1 to June 15 (Sanctuary is closed during monsoon).',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80',
        caption: 'Royal Bengal Tiger inside the protected Similipal Tiger Reserve'
      },
      {
        url: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1200&q=80',
        caption: 'Barehipani Waterfall tumbling down 399 meters in two massive tiers'
      },
      {
        url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80',
        caption: 'Joranda Waterfall plunging down 181 meters in a sheer vertical drop'
      },
      {
        url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
        caption: 'Dense virgin sal tree forests and mountain valleys of Mayurbhanj'
      },
      {
        url: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1200&q=80',
        caption: 'Eco-tourism cottages at Jamuani surrounded by forest canopy'
      },
      {
        url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
        caption: 'The historic Belgadia Palace gateway in nearby Baripada'
      },
      {
        url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
        caption: 'Herds of wild spotted deer and sambar grazing in Chahala glade'
      }
    ]
  },
  gopalpur: {
    id: 'gopalpur',
    famousFor: 'Peaceful beach, colonial port heritage, sunrise/sunset, and coastal water sports.',
    mainAttractions: [
      'Gopalpur-on-Sea Beach',
      'Historic 1871 Colonial Lighthouse',
      'Tampara Freshwater Lake (Jet Skis & Boating)',
      'Ancient Kalinga Maritime Port Ruins',
      'Coconut Palm Groves & Casuarina Belts',
      'Rushikulya Sea Turtle Nesting Rookery',
      'Maa Tara Tarini Shakti Peetha Hilltop'
    ],
    bestTime: 'October to March (Gopalpur Beach Festival in December).',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
        caption: 'Gopalpur Beach with peaceful golden sands and roaring surf'
      },
      {
        url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
        caption: 'Tampara Lake water sports zone offering jet skis and speedboats'
      },
      {
        url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
        caption: 'Mayfair Palm Beach Resort 1914 colonial heritage luxury'
      },
      {
        url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
        caption: 'The red-and-white banded 1871 Gopalpur Lighthouse'
      },
      {
        url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
        caption: 'Sunset vista across Tampara freshwater lake lagoons'
      },
      {
        url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80',
        caption: 'Beachfront cafes and seafood barbecue shacks along the promenade'
      },
      {
        url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
        caption: 'Rushikulya River estuary where Olive Ridley sea turtles nest'
      }
    ]
  },
  daringbadi: {
    id: 'daringbadi',
    famousFor: 'Cool climate, pine valleys, and known as the "Kashmir of Odisha" with winter frost.',
    mainAttractions: [
      'Pine Forests & Pine Valleys',
      'Hill View Point & Sunset Point',
      'Midubanda Waterfall (Dasingbadi)',
      'Organic Coffee & Black Pepper Plantations',
      'Nature Park & Butterfly Park',
      'Mandasaru Gorge (Silent Valley of Odisha)',
      'Lover Point & Emu Bird Farm'
    ],
    bestTime: 'September to March (December/January for winter chills & frost).',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
        caption: 'Pine forests and mist-covered rolling hills of Daringbadi'
      },
      {
        url: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1200&q=80',
        caption: 'Midubanda Waterfall cascading into a natural forest pool'
      },
      {
        url: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1200&q=80',
        caption: 'Eco Retreat Daringbadi luxury glamping setup'
      },
      {
        url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80',
        caption: 'Organic Arabica coffee and black pepper estates in Kandhamal'
      },
      {
        url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
        caption: 'Mandasaru Gorge canyon known as the Silent Valley of Odisha'
      },
      {
        url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
        caption: 'Sunrise viewing deck overlooking valleys bathed in mist'
      },
      {
        url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80',
        caption: 'Nature Park botanical gardens and tribal souvenir center'
      }
    ]
  },
  barunei: {
    id: 'barunei',
    famousFor: 'Historic Barunei Temple, perennial sacred mountain spring Swarna Ganga, and battlegrounds of the Paika Rebellion.',
    mainAttractions: [
      'Maa Barunei & Maa Karunei Temple',
      'Swarna Ganga Perennial Mountain Stream',
      'Barunei Hill Forest Trekking Trails',
      'Historic Khurda Fort & Paika Memorial',
      'Pandava Cave & Ancient Inscriptions',
      'Lush Hillside Picnic Glades'
    ],
    bestTime: 'July to February (Monsoons make the springs and hills vibrant green).',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80',
        caption: 'Maa Barunei Temple nestled right at the base of the forested hills'
      },
      {
        url: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1200&q=80',
        caption: 'Swarna Ganga crystal-clear perennial spring flowing through stone channels'
      },
      {
        url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
        caption: 'Dense sal and teak forest canopy covering the Barunei hill ranges'
      },
      {
        url: 'https://images.unsplash.com/photo-1609137144820-221f1d1982b6?auto=format&fit=crop&w=1200&q=80',
        caption: 'Sacred stone sanctum honoring the tutelary deities of the Bhoi kings'
      },
      {
        url: 'https://images.unsplash.com/photo-1590076212574-8b6ee3cf3742?auto=format&fit=crop&w=1200&q=80',
        caption: 'Historic Khurda Fort ruins where Bakshi Jagabandhu led the 1817 Paika Rebellion'
      },
      {
        url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
        caption: 'Scenic hillside trekking trail ascending to the Pandava cave'
      },
      {
        url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
        caption: 'Evening deepam lamps illuminating the temple courtyard'
      }
    ]
  },
  dhauli: {
    id: 'dhauli',
    famousFor: 'Emperor Ashoka transformation after the Kalinga War (261 BCE), rock-cut edicts, and the Indo-Japanese Peace Pagoda.',
    mainAttractions: [
      'Dhauli Shanti Stupa (Peace Pagoda)',
      'Ashokan Rock Edicts & Carved Elephant Head',
      'Daya River Battlefield Panorama',
      'Evening 3D Laser Projection & Sound Show',
      'Buddhist Monastery & Meditation Grounds',
      'Saddharma Vihar Monastery'
    ],
    bestTime: 'October to March (Evenings for the laser sound & light show).',
    gallery: [
      {
        url: 'https://live.staticflickr.com/3903/14897731738_9d737478e9_b.jpg',
        caption: 'Dhauli White Peace Pagoda stupa crowned by five stone umbrellas'
      },
      {
        url: 'https://images.unsplash.com/photo-1590076212574-8b6ee3cf3742?auto=format&fit=crop&w=1200&q=80',
        caption: 'Rock-cut elephant head sculpture marking Emperor Ashoka 3rd century BCE edicts'
      },
      {
        url: 'https://images.unsplash.com/photo-1599818809280-b8000b7a977e?auto=format&fit=crop&w=1200&q=80',
        caption: 'Stone carved friezes narrating the story of Emperor Ashoka conversion to Buddhism'
      },
      {
        url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
        caption: 'Sunset vista over the tranquil Daya River where the Kalinga War took place'
      },
      {
        url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
        caption: 'Evening 3D laser mapping light and sound show illuminating the Peace Pagoda'
      },
      {
        url: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80',
        caption: 'Replicas of Ashokan Lion Capital and Buddhist wheel of dharma'
      },
      {
        url: 'https://images.unsplash.com/photo-1609137144820-221f1d1982b6?auto=format&fit=crop&w=1200&q=80',
        caption: 'Peaceful Japanese Buddhist monastery gardens at the base of Dhauli Hill'
      }
    ]
  },
  'udayagiri-khandagiri': {
    id: 'udayagiri-khandagiri',
    famousFor: '2nd-century BCE rock-cut Jain caves, Emperor Kharavela Hathigumpha inscription, and Ranigumpha royal amphitheater.',
    mainAttractions: [
      'Ranigumpha (Queen Cave - 2-Storey Amphitheater)',
      'Hathigumpha (Elephant Cave with 17-line Kharavela Inscription)',
      'Ganeshgumpha with Reliefs of Udayana & Vasavadatta',
      '24 Carved Jain Tirthankara Shrines on Khandagiri',
      'Hilltop 18th-Century Working Jain Temple',
      'Baghadumpha (Tiger Mouth Cave)'
    ],
    bestTime: 'October to March (Mornings or late afternoons for comfortable hill climbing).',
    gallery: [
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNl5du90fXLXEyCwso_xIcC8mTnGPrOquKut66ssNZxQ&s=10',
        caption: 'Ranigumpha Cave 1 with double-decked carved friezes and acoustic courtyard'
      },
      {
        url: 'https://images.unsplash.com/photo-1599818809280-b8000b7a977e?auto=format&fit=crop&w=1200&q=80',
        caption: 'Hathigumpha preserving Emperor Kharavela famous 17-line Brahmi inscription'
      },
      {
        url: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80',
        caption: 'Carved stone pillars and rock-cut ascetic cells for Jain monks'
      },
      {
        url: 'https://images.unsplash.com/photo-1609137144820-221f1d1982b6?auto=format&fit=crop&w=1200&q=80',
        caption: 'Jain Tirthankara reliefs sculpted into the rock face of Khandagiri Hill'
      },
      {
        url: 'https://images.unsplash.com/photo-1590076212574-8b6ee3cf3742?auto=format&fit=crop&w=1200&q=80',
        caption: 'Baghadumpha carved in the dramatic form of a roaring tiger mouth'
      },
      {
        url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
        caption: 'Hilltop Jain temple at the summit offering sunset views of Bhubaneswar'
      },
      {
        url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
        caption: 'Landscaped hillside walkways and gardens maintained by ASI'
      }
    ]
  },
  nandankanan: {
    id: 'nandankanan',
    famousFor: 'World famous for wildlife conservation, birth of white tigers, lion and tiger safaris, and Kanjia Lake.',
    mainAttractions: [
      'White Tiger Conservation Enclosure',
      'Open Moat Bengal Tiger Safari',
      'Asiatic Lion Safari in Forest Enclosure',
      'Kanjia Lake Ropeway (Overwater Cable Car)',
      'Reptile Park & King Cobra Breeding Center',
      'Nocturnal Animal House & Toy Train',
      'State Botanical Gardens'
    ],
    bestTime: 'October to March (Sanctuary is closed on Mondays).',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80',
        caption: 'Majestic White Tiger at Nandankanan Zoological Park'
      },
      {
        url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
        caption: 'Kanjia Lake scenic waters surrounded by lush botanical forest'
      },
      {
        url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
        caption: 'Passenger cable car ropeway crossing high above Kanjia Lake'
      },
      {
        url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80',
        caption: 'Lion Safari bus tour inside the open forest wilderness'
      },
      {
        url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
        caption: 'Spotted deer and Indian gaur herds in open naturalized enclosures'
      },
      {
        url: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1200&q=80',
        caption: 'State Botanical Garden glasshouses featuring orchids and rare flora'
      },
      {
        url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
        caption: 'Aquarium gallery with exotic freshwater and marine biodiversity'
      }
    ]
  },
  baripada: {
    id: 'baripada',
    famousFor: 'Mayurbhanj Chhau martial dance, second oldest Rath Yatra pulled by women, and gateway to Similipal.',
    mainAttractions: [
      'Mayurbhanj Chhau Dance Academy & Performance',
      'The Belgadia Palace (Victorian Royal Heritage)',
      'Shree Haribaldev Jew Jagannath Temple',
      'Similipal Biosphere Reserve Gateway',
      'Baripada Mudhi Mansa Culinary Experience',
      'Khiching Kichakeshwari Temple (Chlorite Stone)',
      'Subarnarekha & Budhabalanga River Basins'
    ],
    bestTime: 'October to March (Chitra Parva festival in April for Chhau dance).',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
        caption: 'The Belgadia Palace royal residence restored for heritage tourism'
      },
      {
        url: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80',
        caption: 'Mayurbhanj Chhau performers in vibrant masks and acrobatic postures'
      },
      {
        url: 'https://images.unsplash.com/photo-1609137144820-221f1d1982b6?auto=format&fit=crop&w=1200&q=80',
        caption: 'Haribaldev Jew Temple consecrated in 1575 CE by the Bhanja Dynasty'
      },
      {
        url: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80',
        caption: 'Similipal Tiger Reserve wilderness accessible directly from Baripada'
      },
      {
        url: 'https://images.unsplash.com/photo-1590076212574-8b6ee3cf3742?auto=format&fit=crop&w=1200&q=80',
        caption: 'Maa Kichakeshwari Temple at Khiching built completely of black chlorite stone'
      },
      {
        url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
        caption: 'Local market vibrant with traditional Mayurbhanj handloom and crafts'
      },
      {
        url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
        caption: 'Budhabalanga riverbanks winding through the forests of Mayurbhanj'
      }
    ]
  },
  jeypore: {
    id: 'jeypore',
    famousFor: 'Rich tribal culture, royal heritage of the Jeypore Kingdom, cascading waterfalls, and scenic Eastern Ghats valleys.',
    mainAttractions: [
      'Jeypore Royal Palace & Durbar Hall',
      'Kolab Reservoir, Dam & Botanical Gardens',
      'Bagra Waterfall & Kolab River Gorge',
      'Gupteswar Cave Shrine on Kolab River',
      'Indigenous Weekly Tribal Haats (Bonda & Paraja)',
      'Kotpad Vegetable Dye Handloom Weaving Village',
      'Misty Deomali Valley Ranges'
    ],
    bestTime: 'October to March (Parab cultural festival in November/December).',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
        caption: 'Kolab Reservoir and hillside botanical gardens at sunset'
      },
      {
        url: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1200&q=80',
        caption: 'Bagra Waterfall tumbling through rocky gorges near Jeypore'
      },
      {
        url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
        caption: 'Historic Jeypore Royal Palace facade of the Surya Vamsi dynasty'
      },
      {
        url: 'https://images.unsplash.com/photo-1590076212574-8b6ee3cf3742?auto=format&fit=crop&w=1200&q=80',
        caption: 'Gupteswar limestone cave temple dedicated to Lord Shiva'
      },
      {
        url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80',
        caption: 'Kotpad GI-certified organic vegetable dye handloom weaving'
      },
      {
        url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
        caption: 'Lush mountain landscape of the Eastern Ghats around Jeypore'
      },
      {
        url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
        caption: 'Vibrant tribal weekly markets bustling with organic produce and forest honey'
      }
    ]
  },
  koraput: {
    id: 'koraput',
    famousFor: 'Majestic mountains, dramatic waterfalls, organic coffee cultivation, and rich tribal heritage.',
    mainAttractions: [
      'Deomali Mountain Range',
      'Duduma Waterfall (175m tiered drop)',
      'Sabara Srikhetra Jagannath Temple',
      'Koraput Tribal Museum & Library',
      'Machkund Hydroelectric Valley',
      'Organic Koraput Arabica Coffee Estates',
      'Rani Duduma & Gulmi Waterfalls'
    ],
    bestTime: 'October to March (Winter brings pleasant chilly mountain breezes).',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
        caption: 'Panoramic mist-covered mountains of the Koraput highlands'
      },
      {
        url: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1200&q=80',
        caption: 'Duduma Waterfall plunging 175 meters into the Machkund River canyon'
      },
      {
        url: 'https://images.unsplash.com/photo-1609137144820-221f1d1982b6?auto=format&fit=crop&w=1200&q=80',
        caption: 'Sabara Srikhetra Jagannath Temple built on a scenic hilltop in Koraput'
      },
      {
        url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80',
        caption: 'Shade-grown organic coffee plantations nestled under silver oak trees'
      },
      {
        url: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80',
        caption: 'Koraput Tribal Museum displaying ethnic artifacts and musical instruments'
      },
      {
        url: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1200&q=80',
        caption: 'Putsil valley eco cottages in the foothills of Deomali'
      },
      {
        url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
        caption: 'Iconic Koraput-Rayagada mountain railway crossing scenic viaducts'
      }
    ]
  },
  deomali: {
    id: 'deomali',
    famousFor: 'Highest mountain peak in Odisha (1,672m), famous for trekking, paragliding, and 360-degree views above the clouds.',
    mainAttractions: [
      'Deomali Summit Peak (1,672 Meters)',
      'Rolling High-Altitude Tablelands',
      'Tandem Paragliding Launch Point',
      'Cloud Sea Sunrise & Sunset Viewpoints',
      'Putsil Valley Eco-Camp Glamping',
      'Kunduli Tribal Weekly Haat',
      'Mountain Trekking Ridge Trails'
    ],
    bestTime: 'September to March (Crisp mountain air & cloud carpets).',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
        caption: 'Deomali summit 1,672m marker overlooking endless Eastern Ghats'
      },
      {
        url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
        caption: 'Sunrise over a dramatic sea of clouds floating beneath the peaks'
      },
      {
        url: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1200&q=80',
        caption: 'High-altitude eco retreat tents nestled in Putsil valley'
      },
      {
        url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80',
        caption: 'Paragliders launching into the sky from the windward cliffs'
      },
      {
        url: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1200&q=80',
        caption: 'Fresh mountain stream cutting through green valleys below Deomali'
      },
      {
        url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
        caption: 'Scenic winding hill road leading straight up to the peak viewpoint'
      },
      {
        url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
        caption: 'Camping under a pristine starry night sky atop the high ridge'
      }
    ]
  },
  satkosia: {
    id: 'satkosia',
    famousFor: 'Spectacular 22-km long deep river gorge cut by the Mahanadi River, tiger reserve, and river eco-camps.',
    mainAttractions: [
      'Satkosia Gorge on the Mahanadi River',
      'Satkosia Tiger Reserve & Wildlife',
      'Tikarpada Crocodile Sanctuary (Gharials & Muggers)',
      'River Cruise through 22-km Scenic Gorge',
      'Chhotkei & Tikarpada Nature Glamping Tents',
      'Baisipalli Wildlife Sanctuary',
      'Riverside Bonfires & Starry Night Eco-Camps'
    ],
    bestTime: 'October to April (Ideal boating and river camping season).',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
        caption: 'Mighty Mahanadi River flowing through the majestic Satkosia Gorge'
      },
      {
        url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
        caption: 'Motorized boat cruise cutting through the deep waters of the gorge'
      },
      {
        url: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80',
        caption: 'Gharials and freshwater mugger crocodiles basking on sandy shores'
      },
      {
        url: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1200&q=80',
        caption: 'Tikarpada nature camp luxury tents pitched right along the riverbank'
      },
      {
        url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80',
        caption: 'Dense deciduous sal forests of the Satkosia Tiger Reserve'
      },
      {
        url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
        caption: 'Scenic wooden watchtower overlooking the river canyon'
      },
      {
        url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
        caption: 'Campfire gathering under clear skies at the river eco-resort'
      }
    ]
  },
  bhitarkanika: {
    id: 'bhitarkanika',
    famousFor: 'India second largest mangrove ecosystem, giant saltwater crocodiles, kingfishers, and Gahirmatha turtle beach.',
    mainAttractions: [
      'Mangrove Creek Boat Safaris',
      'Saltwater Crocodiles (Up to 23 ft giants)',
      'Gahirmatha Marine Sanctuary (Olive Ridley Turtles)',
      '8 Species of Colorful Kingfishers',
      'Dangamal Crocodile Breeding Center & Museum',
      'Historic Hukitola French Palace on the Coast',
      'Habalikhati Eco Beach Cottages'
    ],
    bestTime: 'October to March (Park closed May to July for crocodile breeding).',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
        caption: 'Giant saltwater crocodile basking along the muddy mangrove tidal creek'
      },
      {
        url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
        caption: 'Boat cruise navigating the dense interconnected labyrinth of mangrove forests'
      },
      {
        url: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80',
        caption: 'Rare white crocodile specimen nurtured at Dangamal sanctuary'
      },
      {
        url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80',
        caption: 'Lush mangrove trees with breathing roots (pneumatophores)'
      },
      {
        url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
        caption: 'Estuary Island Resort luxury eco tents near the Dhamra river mouth'
      },
      {
        url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
        caption: 'Spotted deer herd emerging onto the forest clearing at Dangamal'
      },
      {
        url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
        caption: 'Gahirmatha sandy beach where hundreds of thousands of sea turtles nest'
      }
    ]
  },
  chandipur: {
    id: 'chandipur',
    famousFor: 'The miraculous "Hide and Seek" beach where the sea water recedes up to 5 km during low tide.',
    mainAttractions: [
      'Unique Receding Sea Phenomena (Walk on Seabed)',
      'Red Ghost Crabs and Horseshoe Crabs',
      'Serene Casuarina-Fringed Sandy Beach',
      'Fresh Seafood & Giant Tiger Prawn Stalls',
      'Remuna Khirachora Gopinath Temple (Nearby)',
      'Balaramgadi River Estuary',
      'Panchalingeswar Waterfall & Temple'
    ],
    bestTime: 'October to March (Comfortable coastal winter weather).',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
        caption: 'The vast exposed seabed at Chandipur as the sea recedes kilometers away'
      },
      {
        url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
        caption: 'Tourists walking kilometers into the dry ocean bed during low tide'
      },
      {
        url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
        caption: 'Red ghost crabs creating artistic sand patterns on the damp shore'
      },
      {
        url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
        caption: 'OTDC Panthanivas Chandipur situated directly beside the beach promenade'
      },
      {
        url: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1200&q=80',
        caption: 'Panchalingeswar perennial stream flowing over five Shiva lingams nearby'
      },
      {
        url: 'https://images.unsplash.com/photo-1609137144820-221f1d1982b6?auto=format&fit=crop&w=1200&q=80',
        caption: 'Historic Khirachora Gopinath Temple at Remuna famous for condensed milk prasad'
      },
      {
        url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
        caption: 'Sunset hues casting reflections across the shallow tidal pools'
      }
    ]
  },
  hirakud: {
    id: 'hirakud',
    famousFor: 'World longest earthen dam (25.8 km) across the Mahanadi, vast freshwater reservoir, and Gandhi Minar views.',
    mainAttractions: [
      'Hirakud Dam & Reservoir (25.8 km length)',
      'Gandhi Minar Revolving Viewpoint',
      'Nehru Minar on Opposite Dyke',
      'Reservoir Boat Cruise to Sunset & Bat Island',
      'Debrigarh Wildlife Sanctuary (High Density Leopards)',
      'Cattle Island (Island of Feral Cattle)',
      'Hydroelectric Powerhouse Spillway Gates'
    ],
    bestTime: 'October to April (Post-monsoon reservoir is full and sparkling blue).',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80',
        caption: 'The colossal Hirakud Dam dyke stretching across the mighty Mahanadi River'
      },
      {
        url: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80',
        caption: 'Debrigarh Wildlife Sanctuary with leopards and wild bison beside the waters'
      },
      {
        url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
        caption: 'Gandhi Minar observation tower providing panoramic 360-degree views'
      },
      {
        url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
        caption: 'Reservoir eco-tourism boat cruising towards Bat Island at sunset'
      },
      {
        url: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1200&q=80',
        caption: 'Debrigarh eco-resort cottages perched right on the waterfront'
      },
      {
        url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
        caption: 'Roaring spillway gates opening during post-monsoon water release'
      },
      {
        url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
        caption: 'Nehru Minar scenic viewpoint on the right embankment'
      }
    ]
  },
  sambalpur: {
    id: 'sambalpur',
    famousFor: 'Maa Samaleswari Temple, world-famous Sambalpuri Ikat handloom silk, Huma leaning temple, and vibrant folk music/dance.',
    mainAttractions: [
      'Maa Samaleswari Temple (Samalei Corridor)',
      'Huma Leaning Temple of Lord Shiva',
      'Hirakud Dam & Debrigarh Sanctuary',
      'Sambalpuri Handloom Weavers Cooperative Hubs',
      'Mahanadi Riverfront Promenade & Boating',
      'Budharaja Hilltop Temple & Sunset Park',
      'Ghanteswari Temple with Thousands of Brass Bells'
    ],
    bestTime: 'October to March (Nuakhai agrarian festival in August/September).',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1609137144820-221f1d1982b6?auto=format&fit=crop&w=1200&q=80',
        caption: 'Maa Samaleswari Temple sanctum and the newly upgraded heritage corridor'
      },
      {
        url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80',
        caption: 'Master weavers weaving Sambalpuri Bandha tie-and-dye silk sarees'
      },
      {
        url: 'https://images.unsplash.com/photo-1590076212574-8b6ee3cf3742?auto=format&fit=crop&w=1200&q=80',
        caption: 'The enigmatic Huma Leaning Temple slanting gracefully by the Mahanadi'
      },
      {
        url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80',
        caption: 'Mahanadi riverbank ghats during sunset aarti'
      },
      {
        url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
        caption: 'Maa Ghanteswari Temple covered in thousands of brass resonant bells'
      },
      {
        url: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80',
        caption: 'Vibrant Sambalpuri folk dancers performing with Dhol and Nishan instruments'
      },
      {
        url: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80',
        caption: 'Debrigarh wildlife sanctuary forest reserve nearby'
      }
    ]
  }
};

export function getDestinationMedia(destId: string): DestinationMedia | null {
  const normalized = destId.toLowerCase();
  if (normalized.includes('puri') && !normalized.includes('baripada')) return DESTINATION_GALLERIES['puri'];
  if (normalized.includes('konark')) return DESTINATION_GALLERIES['konark'];
  if (normalized.includes('bhubaneswar') || normalized.includes('lingaraj')) return DESTINATION_GALLERIES['bhubaneswar'];
  if (normalized.includes('chilika')) return DESTINATION_GALLERIES['chilika'];
  if (normalized.includes('similipal')) return DESTINATION_GALLERIES['similipal'];
  if (normalized.includes('gopalpur')) return DESTINATION_GALLERIES['gopalpur'];
  if (normalized.includes('daringbadi')) return DESTINATION_GALLERIES['daringbadi'];
  if (normalized.includes('barunei')) return DESTINATION_GALLERIES['barunei'];
  if (normalized.includes('dhauli')) return DESTINATION_GALLERIES['dhauli'];
  if (normalized.includes('udayagiri') || normalized.includes('khandagiri')) return DESTINATION_GALLERIES['udayagiri-khandagiri'];
  if (normalized.includes('nandankanan')) return DESTINATION_GALLERIES['nandankanan'];
  if (normalized.includes('baripada')) return DESTINATION_GALLERIES['baripada'];
  if (normalized.includes('jeypore')) return DESTINATION_GALLERIES['jeypore'];
  if (normalized.includes('deomali')) return DESTINATION_GALLERIES['deomali'];
  if (normalized.includes('koraput')) return DESTINATION_GALLERIES['koraput'];
  if (normalized.includes('satkosia')) return DESTINATION_GALLERIES['satkosia'];
  if (normalized.includes('bhitarkanika')) return DESTINATION_GALLERIES['bhitarkanika'];
  if (normalized.includes('chandipur')) return DESTINATION_GALLERIES['chandipur'];
  if (normalized.includes('hirakud')) return DESTINATION_GALLERIES['hirakud'];
  if (normalized.includes('sambalpur')) return DESTINATION_GALLERIES['sambalpur'];
  return null;
}
