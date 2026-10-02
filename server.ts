import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import { 
  ODISHA_MONUMENTS, 
  ODISHA_HANDICRAFTS, 
  ODISHA_WORKSHOPS, 
  ODISHA_RESORTS, 
  ODISHA_PACKAGES, 
  ODISHA_WEDDINGS, 
  ODISHA_TRANSIT_OPTIONS,
  ODISHA_FESTIVALS,
  ODISHA_CUISINE 
} from './src/data/odishaData.js';
import { ODISHA_ALL_DESTINATIONS } from './src/data/odishaDestinations.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// API route: Vision X health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', app: 'Vision X - Smart Odisha Tourism', timestamp: new Date().toISOString() });
});

// API route: Get all Odisha Tourist Destinations with entry fees, coordinates & transits
app.get('/api/destinations', (req, res) => {
  const { region, category, search } = req.query;
  let results = ODISHA_ALL_DESTINATIONS;

  if (region && typeof region === 'string' && region !== 'All Regions') {
    results = results.filter(d => d.region.toLowerCase() === region.toLowerCase());
  }

  if (category && typeof category === 'string' && category !== 'All Categories') {
    results = results.filter(d => d.category.toLowerCase() === category.toLowerCase());
  }

  if (search && typeof search === 'string') {
    const q = search.toLowerCase();
    results = results.filter(d => 
      d.name.toLowerCase().includes(q) || 
      d.odiaName.includes(q) || 
      d.district.toLowerCase().includes(q) ||
      d.description.toLowerCase().includes(q)
    );
  }

  res.json({ success: true, count: results.length, destinations: results });
});

// API route: Get all Odisha Monuments
app.get('/api/monuments', (_req, res) => {
  res.json({ success: true, monuments: ODISHA_MONUMENTS });
});

// API route: Get all Odisha Handicrafts
app.get('/api/handicrafts', (_req, res) => {
  res.json({ success: true, handicrafts: ODISHA_HANDICRAFTS });
});

// API route: Get all Odisha Artisan Workshops
app.get('/api/workshops', (_req, res) => {
  res.json({ success: true, workshops: ODISHA_WORKSHOPS });
});

// API route: Get all Odisha Luxury Stays & Resorts
app.get('/api/resorts', (_req, res) => {
  res.json({ success: true, resorts: ODISHA_RESORTS });
});

// API route: Get all Odisha Festivals
app.get('/api/festivals', (_req, res) => {
  res.json({ success: true, festivals: ODISHA_FESTIVALS });
});

// API route: Get all Odisha Cuisine & Food Guide
app.get('/api/cuisine', (_req, res) => {
  res.json({ success: true, cuisine: ODISHA_CUISINE });
});

// API route: Get all Odisha Travel Packages & Destination Weddings
app.get('/api/packages', (_req, res) => {
  res.json({ 
    success: true, 
    packages: ODISHA_PACKAGES, 
    weddings: ODISHA_WEDDINGS 
  });
});

// API route: Transit search strictly across Odisha routes
app.get('/api/transit/search', (req, res) => {
  const { mode, from, to } = req.query;
  let results = ODISHA_TRANSIT_OPTIONS;

  if (mode && typeof mode === 'string') {
    results = results.filter(item => item.mode === mode.toLowerCase());
  }

  if (from && typeof from === 'string') {
    const qFrom = from.toLowerCase();
    results = results.filter(item => item.from.toLowerCase().includes(qFrom));
  }

  if (to && typeof to === 'string') {
    const qTo = to.toLowerCase();
    results = results.filter(item => item.to.toLowerCase().includes(qTo));
  }

  res.json({ success: true, results: results.length > 0 ? results : ODISHA_TRANSIT_OPTIONS.slice(0, 3) });
});

// API route: AI Odisha Travel Planner
app.post('/api/plan', async (req, res) => {
  try {
    const { destination, dateFrom, dateTo, budget, interests, travelStyle, travelMode } = req.body;
    
    // Ensure destination defaults to Odisha location if not specified
    const targetDestination = destination && destination.toLowerCase().includes('odisha') 
      ? destination 
      : `${destination || 'Bhubaneswar, Puri & Konark'}, Odisha, India`;

    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      try {
        const ai = new GoogleGenAI({ apiKey });
        const prompt = `You are Vision X, the premier Odisha Cultural Heritage & Smart Tourism AI Guide.
Plan a bespoke, authentic, high-end travel itinerary for "${targetDestination}" from ${dateFrom} to ${dateTo}.
Budget: ₹${budget || 25000} (or equivalent in USD).
User interests: ${Array.isArray(interests) ? interests.join(', ') : 'Temples, Pattachitra crafts, pristine beaches, and culinary heritage'}.
Travel style: ${travelStyle || 'Moderate'}.
Travel mode: ${travelMode === 'own' ? 'Traveling by personal vehicle / bike. Avoid booking transit.' : 'App transit: suggest Mo Bus, Vande Bharat Express, private heritage cabs, or Chilika catamarans.'}

STRICT ODISHA REQUIREMENT:
All locations MUST be in Odisha, India (e.g. Konark Sun Temple, Puri Jagannath Temple, Lingaraj Temple, Dhauli Stupa, Raghurajpur Craft Village, Chilika Lake Satapada, Pipili, Similipal, Daringbadi, Cuttack Tarakasi).
Food stops MUST feature authentic Odia cuisine: Puri Mahaprasad (Anandabazar), Chhena Poda, Dalma, Pahal Rasagola, Cuttack Dahi Bara Aloo Dum, or Chilika Crab/Prawns.
Craft stops MUST feature verified Odisha artisans: Pattachitra, Pipili Chandua, Sambalpuri Ikat, Cuttack Silver Filigree, or Dhokra bell metal.
Weather: realistic coastal/tropical Odisha weather (e.g. 'Sunny & Coastal Breeze, 28°C').`;

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
            responseSchema: {
              type: 'ARRAY' as any,
              description: 'Daily itineraries strictly for Odisha, India',
              items: {
                type: 'OBJECT' as any,
                properties: {
                  date: { type: 'STRING' as any, description: "Date (e.g., 'Oct 15, 2026')" },
                  dayTheme: { type: 'STRING' as any, description: 'Theme of the day in Odisha' },
                  weather: { type: 'STRING' as any, description: "Weather forecast (e.g., 'Sunny Coastal Breeze, 27°C')" },
                  activities: {
                    type: 'ARRAY' as any,
                    items: {
                      type: 'OBJECT' as any,
                      properties: {
                        time: { type: 'STRING' as any, description: "Time of day (e.g., '08:30 AM')" },
                        title: { type: 'STRING' as any, description: 'Activity title' },
                        description: { type: 'STRING' as any, description: 'Detailed cultural experience and tips' },
                        location: { type: 'STRING' as any, description: 'Exact Odisha location' },
                        type: { type: 'STRING' as any, description: "Must be: 'attraction', 'food', 'craft', 'transport'" },
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
          const data = JSON.parse(response.text);
          return res.json({ success: true, itinerary: data });
        }
      } catch (geminiErr) {
        console.warn('Gemini API call failed, falling back to curated Odisha plan:', geminiErr);
      }
    }

    // High quality curated Odisha Golden Triangle fallback plan
    const curatedOdishaPlan = [
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

    return res.json({ success: true, itinerary: curatedOdishaPlan });
  } catch (err: any) {
    console.error('Server /api/plan error:', err);
    return res.status(500).json({ error: err?.message || 'Server error generating Odisha plan' });
  }
});

// API route: Heritage AI Guide Chat for Odisha
app.post('/api/heritage-chat', async (req, res) => {
  try {
    const { message, history } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey) {
      try {
        const ai = new GoogleGenAI({ apiKey });
        const historyText = Array.isArray(history) 
          ? history.map((m: any) => `${m.role === 'user' ? 'User' : 'Guide'}: ${m.text}`).join('\n')
          : '';

        const prompt = `You are Vision X, a scholarly and devoted Cultural Heritage AI Guide specializing exclusively in the history, architecture, spiritual traditions, and folklore of Odisha, India.
Key domains:
- Konark Sun Temple (Eastern Ganga Dynasty, King Narasimhadeva I, 1250 CE, 24 sundial wheels, 7 horses, Bisu Maharana & Dharmapada, UNESCO site)
- Shree Jagannath Temple Puri (12th century, King Anantavarman Chodaganga Deva, Nilachakra, Patitapabana flag, Mahaprasad, Anandabazar, Rath Yatra, Nabakalebara)
- Lingaraj Temple & Ekamra Kshetra (11th century Somavamsi, Harihara, Bindusagar, Mukteshwar, Rajarani)
- Dhauli Shanti Stupa & Kalinga War (261 BCE, Emperor Ashoka, Daya River, Rock Edicts)
- Udayagiri & Khandagiri Caves (Emperor Kharavela, Hathigumpha inscription, Jain rock-cut architecture)
- Chausathi Yogini Temple Hirapur (64 black chlorite goddesses, roofless tantric shrine)
- Traditional Odisha Arts: Pattachitra (Raghurajpur), Cuttack Tarakasi (Silver Filigree), Pipili Applique, Sambalpuri Ikat, Dhokra

Conversation history:
${historyText}

User query: ${message}

Provide a concise, historically rigorous, and culturally reverent answer in 2-4 sentences:`;

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
        });

        if (response.text) {
          return res.json({ reply: response.text });
        }
      } catch (geminiChatErr) {
        console.warn('Gemini chat error, using expert Odisha knowledge base:', geminiChatErr);
      }
    }

    // Expert Odisha Knowledge-Base Fallback
    const q = (message || '').toLowerCase();
    let reply = 'Namaste! Odisha is the land of Jagannath Sanskriti, breathtaking Kalinga stone temples, and UNESCO heritage sites like the 13th-century Konark Sun Temple.';

    if (q.includes('konark') || q.includes('sun temple') || q.includes('wheel') || q.includes('sundial')) {
      reply = 'The Konark Sun Temple was built in 1250 CE by King Narasimhadeva I of the Eastern Ganga Dynasty. Designed as a colossal stone chariot with 24 carved wheels that function as precision sundials, each wheel has 8 major spokes representing the 8 Praharas of the day, allowing you to tell time to the minute!';
    } else if (q.includes('puri') || q.includes('jagannath') || q.includes('mahaprasad') || q.includes('rath yatra')) {
      reply = 'Shree Jagannath Temple in Puri is one of the revered Char Dham shrines, consecrated in the 12th century by King Chodaganga Deva. It is famous for the annual Rath Yatra chariot festival and the sacred Mahaprasad (56 Bhog) cooked in 7 stacked earthen pots over wood fires in the world largest traditional temple kitchen.';
    } else if (q.includes('lingaraj') || q.includes('bhubaneswar') || q.includes('temple city')) {
      reply = 'Lingaraj Temple, built in the 11th century by the Somavamsi dynasty, stands as the zenith of Kalinga architecture in Bhubaneswar. It worships Harihara, unifying Lord Shiva and Lord Vishnu, adjacent to the sacred Bindusagar Lake.';
    } else if (q.includes('dhauli') || q.includes('ashoka') || q.includes('kalinga war')) {
      reply = 'Dhauli Giri along the Daya River is where the fateful Kalinga War took place in 261 BCE. Seeing the river run red with blood, Emperor Ashoka underwent a profound transformation, renouncing conquest by war and embracing Buddhism and Ahimsa. The rock edicts at Dhauli remain preserved to this day.';
    } else if (q.includes('craft') || q.includes('pattachitra') || q.includes('silver') || q.includes('tarakasi')) {
      reply = 'Odisha boasts ancient GI-tagged handicrafts: Raghurajpur is world-famous for Pattachitra and palm-leaf engravings; Cuttack is celebrated for 500-year-old Tarakasi silver filigree; Pipili creates royal Applique Chandua; and Sambalpur weaves pure silk Bandha sarees.';
    }

    return res.json({ reply });
  } catch (err: any) {
    console.error('Server /api/heritage-chat error:', err);
    return res.status(500).json({ error: err?.message || 'Chat error' });
  }
});

async function startServer() {
  const isDev = process.env.NODE_ENV !== 'production';

  if (isDev) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
