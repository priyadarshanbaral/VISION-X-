import { useState, useRef, useEffect } from 'react';
import Image from '../components/Image';
import { 
  Headphones, MapPin, Scan, Info, Play, Pause, 
  MessageSquare, Send, Camera, Loader2, Sparkles, Volume2, 
  BookOpen, Clock, Calendar, Check, ExternalLink 
} from 'lucide-react';
import { ODISHA_MONUMENTS, Monument } from '../data/odishaData';
import { GoogleGenAI } from '@google/genai';

export default function HeritagePage() {
  const [selectedMonument, setSelectedMonument] = useState<Monument>(ODISHA_MONUMENTS[0]);
  const [scanned, setScanned] = useState(true);
  const [scanning, setScanning] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'ai'; text: string }[]>([
    { 
      role: 'ai', 
      text: 'Namaste & Jay Jagannath! I am your Vision X Kalinga Heritage AI Guide. You are inspecting the 13th-century Konark Sun Temple (UNESCO). Inquire about its 24 astronomical sundial wheels, architectural marvels, or sacred folklore.' 
    }
  ]);

  // Speech synthesis ref for real voice narration
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraActive(true);
      }
    } catch (err) {
      console.warn('Camera access unavailable, using simulated scan:', err);
      setScanning(true);
      setTimeout(() => {
        setScanning(false);
        setScanned(true);
      }, 1800);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      setCameraActive(false);
    }
  };

  const handleScan = () => {
    if (!cameraActive) {
      startCamera();
      return;
    }
    
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      stopCamera();
      setScanned(true);
    }, 1800);
  };

  const toggleVoiceNarration = () => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      setIsPlaying(!isPlaying);
      return;
    }

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(selectedMonument.audioScript);
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      
      // Try to choose an Indian English voice if available
      const voices = window.speechSynthesis.getVoices();
      const inVoice = voices.find(v => v.lang.includes('en-IN') || v.name.includes('India'));
      if (inVoice) {
        utterance.voice = inVoice;
      }

      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);

      speechRef.current = utterance;
      window.speechSynthesis.speak(utterance);
      setIsPlaying(true);
    }
  };

  const handleSelectMonument = (monument: Monument) => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    }
    setSelectedMonument(monument);
    setChatHistory([
      { 
        role: 'ai', 
        text: `Namaste! You have selected ${monument.name} (${monument.odiaName}). Located in ${monument.location}, built during the ${monument.era} by ${monument.builtBy}. Ask me anything about its architecture, rituals, or legends!` 
      }
    ]);
  };

  // Cleanup audio & camera on unmount
  useEffect(() => {
    return () => {
      stopCamera();
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    
    const userMessage = chatInput.trim();
    const newHistory = [...chatHistory, { role: 'user' as const, text: userMessage }];
    setChatHistory(newHistory);
    setChatInput('');
    setIsAiTyping(true);
    
    try {
      let reply = '';
      
      // Try backend proxy
      try {
        const res = await fetch('/api/heritage-chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            message: `${userMessage} (Context: currently viewing ${selectedMonument.name})`, 
            history: newHistory 
          }),
        });
        if (res.ok) {
          const resJson = await res.json();
          if (resJson.reply) reply = resJson.reply;
        }
      } catch (e) {
        console.warn('Backend heritage chat unavailable, trying client fallback:', e);
      }

      // Try client GenAI if key available
      if (!reply) {
        const apiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY || (window as any).__GEMINI_API_KEY__;
        if (apiKey) {
          const ai = new GoogleGenAI({ apiKey });
          const prompt = `You are a scholarly and devoted Odisha Cultural Heritage AI Guide. The user is currently inspecting: ${selectedMonument.name} in ${selectedMonument.location}.
Historical context: Built in ${selectedMonument.era} by ${selectedMonument.builtBy} (${selectedMonument.dynasty}). Significance: ${selectedMonument.significance}.
Conversation history:
${newHistory.map(m => `${m.role === 'user' ? 'User' : 'Guide'}: ${m.text}`).join('\n')}

User question: ${userMessage}
Provide a culturally accurate and insightful answer in 2-3 sentences:`;

          const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
          });
          if (response.text) reply = response.text;
        }
      }

      // Grounded contextual fallback if offline
      if (!reply) {
        const lower = userMessage.toLowerCase();
        if (lower.includes('built') || lower.includes('who') || lower.includes('when')) {
          reply = `${selectedMonument.name} was built in ${selectedMonument.era} under the patronage of ${selectedMonument.builtBy} of the ${selectedMonument.dynasty}.`;
        } else if (lower.includes('timing') || lower.includes('open') || lower.includes('fee')) {
          reply = `Visiting timings are ${selectedMonument.timings}. Entry fee is ${selectedMonument.entryFee}.`;
        } else {
          reply = `${selectedMonument.name} is one of the crowning achievements of Kalinga temple architecture. ${selectedMonument.facts[0]}`;
        }
      }

      setChatHistory([...newHistory, { role: 'ai', text: reply }]);
    } catch (error) {
      console.error('Error fetching AI response:', error);
      setChatHistory([...newHistory, { 
        role: 'ai', 
        text: `${selectedMonument.name} is a cornerstone of Odisha sacred heritage, built in ${selectedMonument.era}.` 
      }]);
    } finally {
      setIsAiTyping(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-900 text-stone-50 py-10 px-4 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[45%] h-[45%] bg-amber-900/25 rounded-full blur-[130px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-stone-800/60 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 mb-4 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-xs uppercase font-bold tracking-widest">Vision X • Cultural Heritage AI Guide</span>
          </div>
          <h1 className="font-serif text-3xl md:text-5xl font-black text-white mb-3">
            Sacred Monuments of Kalinga
          </h1>
          <p className="text-stone-300 text-sm md:text-base max-w-2xl mx-auto font-light">
            Scan or select any protected monument to unlock 3D architectural models, real-time voice narration, historical timelines, and Vision X conversational guidance.
          </p>
        </div>

        {/* Monument Selector Carousel */}
        <div className="flex overflow-x-auto hide-scrollbar gap-3 pb-4 mb-8">
          {ODISHA_MONUMENTS.map((monument) => {
            const isSelected = selectedMonument.id === monument.id;
            return (
              <button
                key={monument.id}
                onClick={() => handleSelectMonument(monument)}
                className={`flex-shrink-0 px-5 py-3 rounded-2xl border text-left transition-all cursor-pointer ${
                  isSelected 
                    ? 'bg-amber-500 text-stone-950 font-bold border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.4)] scale-102' 
                    : 'bg-stone-800/80 hover:bg-stone-800 text-stone-300 border-stone-700/60 hover:border-amber-500/50'
                }`}
              >
                <div className="text-xs tracking-wider uppercase opacity-80">{monument.district} District</div>
                <div className="text-sm font-serif font-bold whitespace-nowrap">{monument.name.split('(')[0]}</div>
                <div className="text-[11px] opacity-75">{monument.odiaName}</div>
              </button>
            );
          })}
        </div>

        {/* Main Guide Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Visuals & Audio */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Monument 3D Viewer */}
            <div className="bg-gradient-to-b from-stone-800 to-stone-900 rounded-3xl overflow-hidden border border-stone-700/60 relative shadow-2xl group">
              <div className="absolute top-4 left-4 z-10 bg-black/70 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 border border-white/10">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
                <span className="text-xs font-bold uppercase tracking-wider text-white">
                  3D Kalinga Architecture Active
                </span>
              </div>

              <div className="absolute top-4 right-4 z-10 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-xs font-semibold text-amber-300">
                {selectedMonument.era}
              </div>

              <div className="relative h-[420px] w-full overflow-hidden">
                <Image
                  src={selectedMonument.image}
                  alt={selectedMonument.name}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  priority
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/30 to-transparent opacity-85" />
                
                {/* 3D overlay perspective grid */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(245,158,11,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(245,158,11,0.08)_1px,transparent_1px)] bg-[size:40px_40px] [transform:perspective(500px)_rotateX(60deg)] origin-bottom opacity-60" />

                {/* Information Overlay on bottom of image */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="text-amber-400 text-xs font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" /> {selectedMonument.location}
                  </div>
                  <h3 className="font-serif text-2xl md:text-3xl font-bold text-white drop-shadow-md">
                    {selectedMonument.name}
                  </h3>
                  <p className="text-xs text-stone-300 mt-1 line-clamp-2">
                    {selectedMonument.significance}
                  </p>
                </div>
              </div>
            </div>

            {/* AI Voice Narration Player */}
            <div className="bg-gradient-to-b from-stone-800 to-stone-900 rounded-3xl p-6 border border-stone-700/60 shadow-xl flex items-center gap-6">
              <button 
                onClick={toggleVoiceNarration}
                className={`w-16 h-16 rounded-full flex items-center justify-center transition-all shrink-0 shadow-lg cursor-pointer ${
                  isPlaying 
                    ? 'bg-amber-500 text-stone-950 scale-105' 
                    : 'bg-gradient-to-br from-amber-500 to-amber-600 text-white hover:from-amber-400 hover:to-amber-500 active:scale-95'
                }`}
              >
                {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
              </button>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <Volume2 className={`w-4 h-4 ${isPlaying ? 'text-amber-400 animate-pulse' : 'text-stone-400'}`} />
                    <h4 className="font-bold text-white text-sm md:text-base">
                      AI Voice Narration: {selectedMonument.name.split('(')[0]}
                    </h4>
                  </div>
                  <span className="text-xs text-amber-400 font-semibold">
                    {isPlaying ? 'Speaking aloud...' : 'Click to Listen'}
                  </span>
                </div>
                <p className="text-stone-400 text-xs mb-3 font-medium">
                  Spoken history, royal patronage, and sacred Kalinga architecture
                </p>

                {/* Animated Audio Waveform */}
                <div className="flex items-center gap-1 h-8 bg-stone-950/60 p-2 rounded-xl shadow-inner border border-stone-800/80">
                  {[...Array(34)].map((_, i) => (
                    <div 
                      key={i} 
                      className={`w-1.5 rounded-full transition-all duration-150 ${
                        isPlaying 
                          ? 'bg-gradient-to-t from-amber-600 to-amber-400 shadow-[0_0_6px_rgba(245,158,11,0.6)]' 
                          : 'bg-stone-700'
                      }`} 
                      style={{ 
                        height: isPlaying ? `${Math.sin(i * 0.45 + Date.now() / 250) * 35 + 45}%` : '20%' 
                      }} 
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Practical Info */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-stone-800/60 border border-stone-700/60">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
                  <Clock className="w-3.5 h-3.5" /> Darshan & Entry Timings
                </div>
                <div className="text-sm font-semibold text-white">{selectedMonument.timings}</div>
              </div>

              <div className="p-4 rounded-2xl bg-stone-800/60 border border-stone-700/60">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
                  <Info className="w-3.5 h-3.5" /> Entry Ticket & Guidelines
                </div>
                <div className="text-sm font-semibold text-white">{selectedMonument.entryFee}</div>
              </div>
            </div>

          </div>

          {/* Right Column: Historical Timeline & Chat */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Monument Details & Historical Highlights */}
            <div className="bg-gradient-to-b from-stone-800 to-stone-900 rounded-3xl p-6 md:p-8 border border-stone-700/60 shadow-xl">
              <div className="flex items-center justify-between mb-4 border-b border-stone-700/60 pb-3">
                <h4 className="font-serif text-lg font-bold text-white flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-amber-400" /> Historical Timeline & Facts
                </h4>
                <span className="text-xs text-stone-400">{selectedMonument.dynasty}</span>
              </div>

              <div className="space-y-3 mb-6">
                {selectedMonument.facts.map((fact, idx) => (
                  <div key={idx} className="flex gap-3 text-xs bg-stone-950/40 p-3 rounded-xl border border-stone-800/60">
                    <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span className="text-stone-300 leading-relaxed">{fact}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                {selectedMonument.keyHighlights.map((hl, idx) => (
                  <span key={idx} className="text-xs font-semibold bg-stone-800 text-amber-300 px-3 py-1 rounded-full border border-stone-700">
                    #{hl}
                  </span>
                ))}
              </div>
            </div>

            {/* Ask AI Cultural Guide Chat */}
            <div className="bg-gradient-to-b from-stone-800 to-stone-900 rounded-3xl border border-stone-700/60 flex flex-col h-[380px] shadow-xl overflow-hidden">
              <div className="p-4 border-b border-stone-700/60 flex items-center justify-between bg-stone-900/80">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 bg-amber-500/20 rounded-lg border border-amber-500/30">
                    <MessageSquare className="w-4 h-4 text-amber-400" />
                  </div>
                  <h4 className="font-bold text-white text-sm">Ask Vision X AI Heritage Guide</h4>
                </div>
                <span className="text-[11px] text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-800/50">
                  {selectedMonument.name.split('(')[0]}
                </span>
              </div>
              
              <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-stone-950/30 text-xs">
                {chatHistory.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] rounded-2xl p-3 shadow-sm ${
                      msg.role === 'user' 
                        ? 'bg-amber-600 text-white rounded-tr-none' 
                        : 'bg-stone-800 text-stone-200 rounded-tl-none border border-stone-700'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isAiTyping && (
                  <div className="flex justify-start">
                    <div className="max-w-[85%] rounded-2xl p-3 bg-stone-800 text-stone-300 rounded-tl-none border border-stone-700 flex items-center gap-2">
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-400" />
                      Consulting Kalinga epigraphs & temple records...
                    </div>
                  </div>
                )}
              </div>

              <form onSubmit={handleSendMessage} className="p-3 border-t border-stone-700/60 flex gap-2 bg-stone-900/80">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="e.g. Tell me about the sundial wheels..."
                  className="flex-1 bg-stone-950 border border-stone-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 transition-all"
                />
                <button 
                  type="submit"
                  disabled={isAiTyping || !chatInput.trim()}
                  className="bg-amber-500 hover:bg-amber-400 text-stone-950 px-3.5 py-2.5 rounded-xl transition-all font-bold disabled:opacity-50 cursor-pointer flex items-center justify-center"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
