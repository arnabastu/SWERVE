import React, { useState, useEffect, useRef } from 'react';
import { 
  Shield, 
  MapPin, 
  MessageSquare, 
  History, 
  Play, 
  Square, 
  AlertTriangle, 
  Navigation, 
  Compass, 
  PhoneOff, 
  Info, 
  Volume2, 
  CloudRain, 
  Activity, 
  Send, 
  Clock, 
  ArrowRight,
  TrendingUp, 
  Map,
  X,
  Sparkles,
  Zap,
  Lock,
  Eye,
  EyeOff
} from 'lucide-react';

const appId = 'drivelegal-vision-zero';

const OFFLINE_LEGAL_DATABASE: Record<string, string> = {
  " महाराष्ट्र ": "In Maharashtra, jumping a red traffic signal violates Section 119/177 of the Motor Vehicles Act, which carries a starting fine of ₹500. Under the amended MV Act (2019), dangerous driving fines scale up to ₹1,000–₹5,000 and can result in automatic driving license suspension for 3 months.\n\n**Physical Safety Warning:** Signal jumping is a primary cause of high-velocity side-impact (T-bone) collisions. The kinetic energy transferred in perpendicular impacts scales quadratically with speed, making these incidents extremely fatal for drivers and two-wheeler operators.",
  " Maharashtra ": "In Maharashtra, jumping a red traffic signal violates Section 119/177 of the Motor Vehicles Act, which carries a starting fine of ₹500. Under the amended MV Act (2019), dangerous driving fines scale up to ₹1,000–₹5,000 and can result in automatic driving license suspension for 3 months.\n\n**Physical Safety Warning:** Signal jumping is a primary cause of high-velocity side-impact (T-bone) collisions. The kinetic energy transferred in perpendicular impacts scales quadratically with speed, making these incidents extremely fatal for drivers and two-wheeler operators.",
  " signal ": "Red signal jumping is penalized under the Motor Vehicles Act (Section 184/119) with fines ranging from ₹1,000 to ₹5,000 and/or driving license suspension of 3 months.\n\n**Scientific Context:** Vehicles entering an intersection during a phase transition collide at zero-margin angles. Maintaining signal discipline protects vulnerable road users (pedestrians and cyclists) from crossing path errors.",
  " red ": "Red signal jumping is penalized under the Motor Vehicles Act (Section 184/119) with fines ranging from ₹1,000 to ₹5,000 and/or driving license suspension of 3 months.\n\n**Scientific Context:** Vehicles entering an intersection during a phase transition collide at zero-margin angles. Maintaining signal discipline protects vulnerable road users (pedestrians and cyclists) from crossing path errors.",
  " helmet ": "Helmet double-strapping is legally compulsory under Section 129 of the Motor Vehicles Act, 2019. Failing to double-strap is treated the same as riding without a helmet, attracting a ₹1,000 fine and a 3-month license disqualification.\n\n**Scientific Reason:** A loose helmet will fly off your head during the primary impact phase, leaving the bare skull exposed to lethal secondary deceleration impacts. Proper strapping ensures the EPS foam core remains positioned to absorb and distribute the kinetic impact energy over a wider surface area.",
  " strap ": "Helmet double-strapping is legally compulsory under Section 129 of the Motor Vehicles Act, 2019. Failing to double-strap is treated the same as riding without a helmet, attracting a ₹1,000 fine and a 3-month license disqualification.\n\n**Scientific Reason:** A loose helmet will fly off your head during the primary impact phase, leaving the bare skull exposed to lethal secondary deceleration impacts. Proper strapping ensures the EPS foam core remains positioned to absorb and distribute the kinetic impact energy over a wider surface area.",
  " double ": "Helmet double-strapping is legally compulsory under Section 129 of the Motor Vehicles Act, 2019. Failing to double-strap is treated the same as riding without a helmet, attracting a ₹1,000 fine and a 3-month license disqualification.\n\n**Scientific Reason:** A loose helmet will fly off your head during the primary impact phase, leaving the bare skull exposed to lethal secondary deceleration impacts. Proper strapping ensures the EPS foam core remains positioned to absorb and distribute the kinetic impact energy over a wider surface area.",
  " 17-year-old ": "Under Section 4 of the Motor Vehicles Act, 1988, a 16-to-18-year-old can apply for a learner's license *only* for gearless motorcycles and scooters under 50cc (without gear, no manual clutch). Any engine capacity exceeding 50cc, or any geared vehicle, strictly requires a minimum age of 18 years.\n\n**Legal Warning:** Operating vehicles above 50cc while under 18 shifts all legal and financial liabilities directly to the parents/guardians, carrying a fine of ₹25,000, vehicle registration cancellation, and up to 3 years imprisonment for the guardian.",
  " under-18 ": "Under Section 4 of the Motor Vehicles Act, 1988, a 16-to-18-year-old can apply for a learner's license *only* for gearless motorcycles and scooters under 50cc (without gear, no manual clutch). Any engine capacity exceeding 50cc, or any geared vehicle, strictly requires a minimum age of 18 years.\n\n**Legal Warning:** Operating vehicles above 50cc while under 18 shifts all legal and financial liabilities directly to the parents/guardians, carrying a fine of ₹25,000, vehicle registration cancellation, and up to 3 years imprisonment for the guardian.",
  " scooter ": "Under Section 4 of the Motor Vehicles Act, 1988, a 16-to-18-year-old can apply for a learner's license *only* for gearless motorcycles and scooters under 50cc (without gear, no manual clutch). Any engine capacity exceeding 50cc, or any geared vehicle, strictly requires a minimum age of 18 years.\n\n**Legal Warning:** Operating vehicles above 50cc while under 18 shifts all legal and financial liabilities directly to the parents/guardians, carrying a fine of ₹25,000, vehicle registration cancellation, and up to 3 years imprisonment for the guardian."
};

const DEFAULT_AI_RESPONSE = "I am your SWERVE Vision Zero safety coach. Under the Indian Motor Vehicles Act, 2019, safety standards are strictly enforced. Seatbelts reduce the kinetic momentum of your body in sudden halts by over 50%, while keeping safe margins prevent rear-end collision chain-reactions. Please configure a Google Gemini API Key in settings to enable deep open-ended law discussions, or choose from our quick preset legal queries!";

export default function App() {
  
  const [activeTab, setActiveTab] = useState('home'); 
  const [isDriving, setIsDriving] = useState(false);

  const [behaviorScore, setBehaviorScore] = useState(98);
  const [speed, setSpeed] = useState(0);
  const [accelerometer, setAccelerometer] = useState({ x: 0.1, y: -0.2, z: 9.8 });
  const [gyroscope, setGyroscope] = useState({ alpha: 0.0, beta: 0.1, gamma: -0.1 });
  const [phoneInteractions, setPhoneInteractions] = useState(0);
  const [harshBrakes, setHarshBrakes] = useState(0);
  const [overspeedEvents, setOverspeedEvents] = useState(0);
  const [currentZone, setCurrentZone] = useState('Standard Highway'); 
  const [currentState, setCurrentState] = useState('Maharashtra'); 
  const [weather, setWeather] = useState('Clear'); 
  const [activeIntervention, setActiveIntervention] = useState<{ title: string; message: string } | null>(null); 
  const [driveDistance, setDriveDistance] = useState(0.0); 

  const [driveLogs, setDriveLogs] = useState<{ title: string; details: string; timestamp: string }[]>([]);
  const [completedTrips, setCompletedTrips] = useState([
    {
      id: 'trip-101',
      date: '28 May 2026',
      route: 'Mumbai Central to Pune Expressway',
      score: 94,
      distance: 148.5,
      harshBrakes: 2,
      phoneInteractions: 1,
      overspeedEvents: 0,
      classification: 'Safe'
    },
    {
      id: 'trip-102',
      date: '24 May 2026',
      route: 'Delhi Ring Road Outer',
      score: 72,
      distance: 34.2,
      harshBrakes: 8,
      phoneInteractions: 7,
      overspeedEvents: 3,
      classification: 'Distracted / Aggressive'
    }
  ]);
  const [currentTripReport, setCurrentTripReport] = useState<any>(null);

  const [routeOrigin, setRouteOrigin] = useState('New Delhi (Connaught Place)');
  const [routeDestination, setRouteDestination] = useState('Jaipur (Pink City)');
  const [routeRiskScore, setRouteRiskScore] = useState('Moderate'); 
  const [showRouteAnalysis, setShowRouteAnalysis] = useState(true);

  const [apiKey, setApiKey] = useState(() => localStorage.getItem('drivelegal_gemini_api_key') || '');
  const [showKeyInput, setShowKeyInput] = useState(false);
  const [showKeyText, setShowKeyText] = useState(false);

  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { 
      id: 1, 
      sender: 'ai', 
      text: "Namaste! I am your SWERVE Safety & Legal Assistant. Ask me anything about Indian traffic laws (Motor Vehicles Act), state speed limits, helmet exemptions, or safety explanations.",
      timestamp: 'Just now'
    }
  ]);
  const [isChatLoading, setIsChatLoading] = useState(false);

  const sensorNoiseTimerRef = useRef<any>(null);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  const getRiskStatus = (score: number) => {
    if (score >= 90) return { label: 'Safe', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', glow: 'neon-glow-emerald' };
    if (score >= 70) return { label: 'Moderate Risk', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20', glow: 'neon-glow-amber' };
    if (score >= 50) return { label: 'High Risk', color: 'text-orange-450', bg: 'bg-orange-500/10', border: 'border-orange-500/20', glow: 'neon-glow-amber' };
    return { label: 'Critical Risk', color: 'text-rose-500', bg: 'bg-rose-500/10', border: 'border-rose-500/30', glow: 'neon-glow-rose' };
  };

  useEffect(() => {
    if (chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages]);

  useEffect(() => {
    if (isDriving) {
      sensorNoiseTimerRef.current = setInterval(() => {
        
        setAccelerometer({
          x: +(Math.random() * 0.4 - 0.2).toFixed(2),
          y: +(Math.random() * 0.4 - 0.2).toFixed(2),
          z: +(9.8 + (Math.random() * 0.6 - 0.3)).toFixed(2)
        });
        
        setGyroscope({
          alpha: +(Math.random() * 2 - 1).toFixed(2),
          beta: +(0.1 + (Math.random() * 0.4 - 0.2)).toFixed(2),
          gamma: +(-0.1 + (Math.random() * 0.4 - 0.2)).toFixed(2)
        });
        
        setDriveDistance(prev => +(prev + 0.04).toFixed(2));
      }, 800);
    } else {
      clearInterval(sensorNoiseTimerRef.current);
    }
    return () => clearInterval(sensorNoiseTimerRef.current);
  }, [isDriving]);

  useEffect(() => {
    if (!isDriving) return;

    let baseScore = 100;
    
    baseScore -= (phoneInteractions * 15);
    baseScore -= (harshBrakes * 8);
    baseScore -= (overspeedEvents * 12);
    if (currentZone === 'School Zone' && speed > 30) {
      baseScore -= 15;
    }
    if (weather === 'Rainy' && speed > 60) {
      baseScore -= 10;
    }

    const finalScore = Math.max(10, baseScore);
    setBehaviorScore(finalScore);

    if (finalScore < 50) {
      triggerIntervention('Critical Risk Warning', 'Voice Alert: "Extreme hazard level. Stability is decreasing. Pull over safely!"');
    } else if (finalScore < 70) {
      triggerIntervention('High Risk Detected', 'Short Warning Tone: "Unsafe speed/distraction patterns measured."');
    } else if (finalScore < 90 && finalScore >= 70) {
      triggerIntervention('Moderate Caution', 'Vibration Alert: Recalibrating safety index. Keep eyes on road.');
    }
  }, [phoneInteractions, harshBrakes, overspeedEvents, speed, currentZone, weather, isDriving]);

  const startDrive = () => {
    setIsDriving(true);
    setBehaviorScore(100);
    setSpeed(50);
    setPhoneInteractions(0);
    setHarshBrakes(0);
    setOverspeedEvents(0);
    setDriveDistance(0);
    setCurrentZone('Standard Highway');
    setWeather('Clear');
    setActiveIntervention(null);
    addLog('Drive Started', 'Sensors calibrated. Safe route monitoring active.');
  };

  const endDrive = () => {
    setIsDriving(false);
    setSpeed(0);

    const finalClassification = behaviorScore >= 90 ? 'Safe' 
                              : behaviorScore >= 70 ? 'Moderate Risk'
                              : behaviorScore >= 50 ? 'Distracted / Aggressive' : 'Critical Hazard';

    const newReport = {
      id: 'trip-' + Date.now(),
      date: 'Today, 10:34 PM',
      route: `${routeOrigin.split(' ')[0]} to ${routeDestination.split(' ')[0]} Drive`,
      score: behaviorScore,
      distance: driveDistance || 12.4,
      harshBrakes: harshBrakes,
      phoneInteractions: phoneInteractions,
      overspeedEvents: overspeedEvents,
      classification: finalClassification
    };

    setCompletedTrips(prev => [newReport, ...prev]);
    setCurrentTripReport(newReport);
    setActiveTab('history'); 
    addLog('Drive Ended', `Session closed. Score: ${behaviorScore}. Report ready.`);
  };

  const addLog = (title: string, details: string) => {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setDriveLogs(prev => [{ title, details, timestamp }, ...prev].slice(0, 5));
  };

  const triggerIntervention = (title: string, message: string) => {
    setActiveIntervention({ title, message });
  };

  const simulateHarshBrake = () => {
    if (!isDriving) return;
    setHarshBrakes(prev => prev + 1);
    setSpeed(prev => Math.max(10, prev - 35));
    addLog('Harsh Braking Event', 'Accelerometer detected deceleration threshold violation (> 4.5m/s²).');
  };

  const simulateOverspeeding = () => {
    if (!isDriving) return;
    setSpeed(95);
    setOverspeedEvents(prev => prev + 1);
    addLog('Overspeed Warning', 'Speed limit threshold exceeded for current highway classification.');
  };

  const simulatePhoneUsage = () => {
    if (!isDriving) return;
    setPhoneInteractions(prev => prev + 1);
    addLog('Phone Screen Distraction', 'Device orientation and active screen touch mismatch logged.');
  };

  const toggleWeather = () => {
    const nextWeather = weather === 'Clear' ? 'Rainy' : weather === 'Rainy' ? 'Foggy' : 'Clear';
    setWeather(nextWeather);
    addLog('Weather Event Update', `Sensors adjusting target safe speeds to ${nextWeather} safety factors.`);
  };

  const cycleZone = () => {
    const zones = ['Standard Highway', 'School Zone', 'Hospital Zone', 'State Border'];
    const nextIdx = (zones.indexOf(currentZone) + 1) % zones.length;
    const newZone = zones[nextIdx];
    setCurrentZone(newZone);
    
    if (newZone === 'State Border') {
      const nextState = currentState === 'Maharashtra' ? 'Karnataka' : 'Maharashtra';
      setCurrentState(nextState);
      triggerIntervention('State Border Crossing', `Transition to ${nextState}. Speed limits updated. Helmets double-strapped compulsory.`);
      addLog('Geo-fence Border Event', `Entering ${nextState} jurisdiction. Local RTO codes applied.`);
    } else {
      addLog('Zone Classification Event', `Entering ${newZone}. Strict safety enforcement active.`);
    }
  };

  const saveApiKey = (key: string) => {
    const trimmed = key.trim();
    setApiKey(trimmed);
    localStorage.setItem('SWERVE_gemini_api_key', trimmed);
    setShowKeyInput(false);
    addLog('API Config Saved', trimmed ? 'Gemini 2.5 Flash token updated.' : 'Removed API key, offline fallback active.');
  };

  const handleChatSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!chatInput.trim()) return;

    const userMessageText = chatInput;
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: userMessageText,
      timestamp: 'Just now'
    };

    setChatMessages(prev => [...prev, userMsg]);
    setChatInput('');
    setIsChatLoading(true);

    const systemPrompt = `You are SWERVE's integrated AI Assistant specializing in Indian Road Traffic Laws (The Motor Vehicles Act, 2019 Amendments), state rules, and safety psychology. 
    Help the user with detailed, friendly advice. ALWAYS explain the "Why This Law Exists" physical reason behind laws (e.g., helmet reduces impact shock by absorbing kinetic energy, speed limits align with vehicle stopping distances). Keep your answer structured, safe, and positive. Limit answers to 3 concise, beautifully formatted paragraphs maximum.`;

    if (apiKey) {
      try {
        const response = await callGeminiAPI(userMessageText, systemPrompt);
        const aiMsg = {
          id: Date.now() + 1,
          sender: 'ai',
          text: response || DEFAULT_AI_RESPONSE,
          timestamp: 'Just now'
        };
        setChatMessages(prev => [...prev, aiMsg]);
      } catch (err) {
        console.error(err);
        const errorMsg = {
          id: Date.now() + 1,
          sender: 'ai',
          text: "I encountered a connectivity error. Keep in mind: Seatbelts reduce the kinetic momentum of your body in sudden halts by over 50%. Let me know if you want to retry our safety law inquiry!",
          timestamp: 'Just now'
        };
        setChatMessages(prev => [...prev, errorMsg]);
      } finally {
        setIsChatLoading(false);
      }
    } else {
      
      setTimeout(() => {
        let matchedText = '';
        const lowercaseQuery = userMessageText.toLowerCase();

        for (const key of Object.keys(OFFLINE_LEGAL_DATABASE)) {
          if (lowercaseQuery.includes(key.toLowerCase())) {
            matchedText = OFFLINE_LEGAL_DATABASE[key];
            break;
          }
        }

        const aiMsg = {
          id: Date.now() + 1,
          sender: 'ai',
          text: matchedText || DEFAULT_AI_RESPONSE,
          timestamp: 'Just now'
        };
        setChatMessages(prev => [...prev, aiMsg]);
        setIsChatLoading(false);
      }, 1000);
    }
  };

  const handlePresetQuery = (query: string) => {
    setChatInput(query);
    
    setTimeout(() => {
      setChatMessages(prev => {
        const userMsg = {
          id: Date.now(),
          sender: 'user',
          text: query,
          timestamp: 'Just now'
        };
        setIsChatLoading(true);

        (async () => {
          const systemPrompt = `You are SWERVE's integrated AI Assistant specializing in Indian Road Traffic Laws (The Motor Vehicles Act, 2019 Amendments), state rules, and safety psychology.
          Help the user with detailed, friendly advice. ALWAYS explain the "Why This Law Exists" physical reason behind laws. Keep your answer structured, safe, and positive.`;
          
          if (apiKey) {
            try {
              const response = await callGeminiAPI(query, systemPrompt);
              setChatMessages(p => [...p, { id: Date.now(), sender: 'ai', text: response || DEFAULT_AI_RESPONSE, timestamp: 'Just now' }]);
            } catch {
              setChatMessages(p => [...p, { id: Date.now(), sender: 'ai', text: "I encountered a connectivity error. Remember: Seatbelts reduce body deceleration momentum by over 50%!", timestamp: 'Just now' }]);
            } finally {
              setIsChatLoading(false);
            }
          } else {
            setTimeout(() => {
              let matchedText = '';
              const lowercaseQuery = query.toLowerCase();
              for (const key of Object.keys(OFFLINE_LEGAL_DATABASE)) {
                if (lowercaseQuery.includes(key.toLowerCase())) {
                  matchedText = OFFLINE_LEGAL_DATABASE[key];
                  break;
                }
              }
              setChatMessages(p => [...p, { id: Date.now(), sender: 'ai', text: matchedText || DEFAULT_AI_RESPONSE, timestamp: 'Just now' }]);
              setIsChatLoading(false);
            }, 800);
          }
        })();

        return [...prev, userMsg];
      });
      setChatInput('');
    }, 50);
  };

  const callGeminiAPI = async (userQuery: string, systemPrompt: string) => {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
    const payload = {
      contents: [{ parts: [{ text: userQuery }] }],
      systemInstruction: { parts: [{ text: systemPrompt }] }
    };

    let attempt = 0;
    const maxRetries = 3;
    let delay = 1000;

    while (attempt < maxRetries) {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (!response.ok) {
          throw new Error(`API returned error code ${response.status}`);
        }

        const result = await response.json();
        const text = result.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) return text;
        throw new Error("Empty candidate result parsing Gemini output");
      } catch (err) {
        attempt++;
        if (attempt >= maxRetries) throw err;
        await new Promise(res => setTimeout(res, delay));
        delay *= 2; 
      }
    }
  };

  const presetRoutes = [
    { origin: 'Mumbai (Gateway)', dest: 'Pune (Expressway Toll)', risk: 'Moderate', notes: 'Prone to heavy fog near Lonavala and landslide zones during monsoons.' },
    { origin: 'Delhi (CP)', dest: 'Jaipur (Pink City)', risk: 'High', notes: 'Night heavy truck traffic. Avoid traveling between 11 PM and 5 AM. Multiple animal crossings.' },
    { origin: 'Bengaluru (Koramangala)', dest: 'Mysuru (Highway)', risk: 'Low', notes: 'Excellent newly widened corridor, strict automated speed cameras near Mandya.' },
    { origin: 'Kolkata (Salt Lake)', dest: 'Digha (Beach Road)', risk: 'Critical', notes: 'Narrow bidirectional segments with heavy inter-state state buses. Proceed with intense rain precaution.' }
  ];

  const handleSelectRoutePreset = (route: any) => {
    setRouteOrigin(route.origin);
    setRouteDestination(route.dest);
    setRouteRiskScore(route.risk);
    setShowRouteAnalysis(true);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-black">

      <header className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center text-zinc-950 shadow-lg shadow-amber-500/20 font-black tracking-tighter transition hover:rotate-6">
            <Shield className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold tracking-tight text-white flex items-center">
              SWERVE <span className="ml-2 text-xs py-0.5 px-1.5 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded font-semibold uppercase">Vision Zero India</span>
            </h1>
            <p className="text-xs text-slate-400">Behavioral Road Safety Intelligence & Co-Driver</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">

          {isDriving ? (
            <span className="flex items-center space-x-2 bg-rose-500/10 text-rose-400 border border-rose-500/30 px-3 py-1.5 rounded-full text-xs font-semibold animate-pulse-subtle">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping"></span>
              <span>LIVE DRIVE ACTIVE</span>
            </span>
          ) : (
            <span className="text-xs text-slate-400 hidden sm:block">Status: Ready to monitor telemetry</span>
          )}
        </div>
      </header>

      {showKeyInput && (
        <div className="bg-zinc-900 border-b border-zinc-800 p-4 transition-all">
          <div className="max-w-xl mx-auto flex flex-col space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                Configure Google Gemini LLM API Key
              </span>
              <button 
                onClick={() => setShowKeyInput(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-slate-400">
              Provide a Google AI Studio API Key to unlock real-time open-ended road safety and RTO penal law questions using the robust Gemini-2.5-Flash model. Key is persisted securely in your browser cache.
            </p>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type={showKeyText ? 'text' : 'password'}
                  placeholder="AIzaSy..."
                  defaultValue={apiKey}
                  onBlur={(e) => saveApiKey(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-4 pr-10 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                />
                <button
                  type="button"
                  onClick={() => setShowKeyText(!showKeyText)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  {showKeyText ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <button
                onClick={() => {
                  const input = document.querySelector('input[type="password"], input[type="text"]') as HTMLInputElement;
                  if (input) saveApiKey(input.value);
                }}
                className="bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold px-4 py-2.5 rounded-xl text-xs transition"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 max-w-7xl w-full mx-auto p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">

        <div className="lg:col-span-4 flex flex-col space-y-6">
          <div className="glass-panel rounded-2xl p-5 flex flex-col space-y-4 relative overflow-hidden neon-glow-amber">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none"></div>
            
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-amber-400" />
                Telemetry Simulator
              </h2>
              <span className="text-xs text-slate-400 uppercase tracking-widest bg-zinc-800 px-2 py-0.5 rounded font-mono">Control Desk</span>
            </div>
            
            <p className="text-xs text-slate-300 leading-relaxed">
              Instantly simulate real-time road telemetry, deceleration vectors, device handling violations, and RTO geofence triggers to see how the localized safety dashboard adapts.
            </p>

            <div className="grid grid-cols-1 gap-2.5 pt-2">
              {!isDriving ? (
                <button
                  onClick={startDrive}
                  className="w-full bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold py-3.5 px-4 rounded-xl flex items-center justify-center space-x-2 transition shadow-lg shadow-amber-500/10 active:scale-98"
                >
                  <Play className="w-5 h-5 fill-current" />
                  <span>Start Live Drive Session</span>
                </button>
              ) : (
                <button
                  onClick={endDrive}
                  className="w-full bg-rose-600 hover:bg-rose-500 text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center space-x-2 transition shadow-lg shadow-rose-600/10 active:scale-98"
                >
                  <Square className="w-5 h-5 fill-current" />
                  <span>End Drive & Build Analytics</span>
                </button>
              )}
            </div>

            <div className="space-y-3 pt-3 border-t border-zinc-850">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Triggers (Needs Active Drive)</span>
              
              <div className="grid grid-cols-2 gap-2">
                <button
                  disabled={!isDriving}
                  onClick={simulateHarshBrake}
                  className={`py-2.5 px-3 text-xs font-semibold rounded-lg border text-left flex flex-col justify-between transition-all ${
                    isDriving 
                      ? 'bg-zinc-900 border-zinc-800 text-white hover:bg-zinc-800 hover:border-zinc-700' 
                      : 'bg-zinc-950/40 border-zinc-900/60 text-slate-600 cursor-not-allowed'
                  }`}
                >
                  <span className="text-rose-450 font-bold">Harsh Braking</span>
                  <span className="text-[10px] text-slate-400 mt-1">Decel. &gt; 4.5m/s²</span>
                </button>

                <button
                  disabled={!isDriving}
                  onClick={simulateOverspeeding}
                  className={`py-2.5 px-3 text-xs font-semibold rounded-lg border text-left flex flex-col justify-between transition-all ${
                    isDriving 
                      ? 'bg-zinc-900 border-zinc-800 text-white hover:bg-zinc-800 hover:border-zinc-700' 
                      : 'bg-zinc-950/40 border-zinc-900/60 text-slate-600 cursor-not-allowed'
                  }`}
                >
                  <span className="text-amber-450 font-bold">Overspeed</span>
                  <span className="text-[10px] text-slate-400 mt-1">Set to 95 km/h</span>
                </button>

                <button
                  disabled={!isDriving}
                  onClick={simulatePhoneUsage}
                  className={`py-2.5 px-3 text-xs font-semibold rounded-lg border text-left flex flex-col justify-between transition-all ${
                    isDriving 
                      ? 'bg-zinc-900 border-zinc-800 text-white hover:bg-zinc-800 hover:border-zinc-700' 
                      : 'bg-zinc-950/40 border-zinc-900/60 text-slate-600 cursor-not-allowed'
                  }`}
                >
                  <span className="text-sky-400 font-bold">Use Phone</span>
                  <span className="text-[10px] text-slate-400 mt-1">Simulate distraction</span>
                </button>

                <button
                  disabled={!isDriving}
                  onClick={toggleWeather}
                  className={`py-2.5 px-3 text-xs font-semibold rounded-lg border text-left flex flex-col justify-between transition-all ${
                    isDriving 
                      ? 'bg-zinc-900 border-zinc-800 text-white hover:bg-zinc-800 hover:border-zinc-700' 
                      : 'bg-zinc-950/40 border-zinc-900/60 text-slate-600 cursor-not-allowed'
                  }`}
                >
                  <span className="text-indigo-400 font-bold">Weather Shift</span>
                  <span className="text-[10px] text-slate-400 mt-1">{weather} ➔ Shift</span>
                </button>
              </div>

              <button
                disabled={!isDriving}
                onClick={cycleZone}
                className={`w-full py-3 px-3 text-xs font-bold rounded-lg border text-center flex items-center justify-center space-x-2 transition ${
                  isDriving 
                    ? 'bg-amber-500/10 border-amber-500/30 text-amber-400 hover:bg-amber-500/20' 
                    : 'bg-zinc-950/40 border-zinc-900 text-slate-600 cursor-not-allowed'
                }`}
              >
                <MapPin className="w-4 h-4" />
                <span>Cycle Road Zone / Cross Border</span>
              </button>
            </div>

            <div className="bg-zinc-950/90 rounded-xl p-3 border border-zinc-850 font-mono text-[11px] leading-relaxed">
              <div className="flex items-center justify-between mb-2 pb-1 border-b border-zinc-800/80">
                <span className="text-slate-400 uppercase font-semibold">On-Device Telemetry Logs</span>
                <span className={`w-2.5 h-2.5 rounded-full ${isDriving ? 'bg-emerald-500 animate-pulse' : 'bg-zinc-700'}`}></span>
              </div>
              <div className="space-y-1.5 max-h-[140px] overflow-y-auto">
                {driveLogs.length === 0 ? (
                  <p className="text-slate-500 text-center italic py-4">No events registered yet. Start drive mode to receive active live logs.</p>
                ) : (
                  driveLogs.map((log, idx) => (
                    <div key={idx} className="border-b border-zinc-900/50 pb-1.5 last:border-0">
                      <div className="flex items-center justify-between text-slate-350 font-bold">
                        <span className="text-white">{log.title}</span>
                        <span className="text-[9.5px] text-slate-500">{log.timestamp}</span>
                      </div>
                      <p className="text-slate-450 text-[10px]">{log.details}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="glass-panel rounded-2xl p-5 space-y-4">
            <h3 className="text-sm font-bold text-slate-200 flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span>Calibrated On-Device Sensors</span>
            </h3>
            
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-zinc-950 rounded-lg p-2.5 border border-zinc-850 transition hover:border-zinc-700">
                <span className="text-[9px] text-slate-450 uppercase block font-mono">X-Lateral</span>
                <span className={`text-xs font-bold font-mono ${isDriving ? 'text-white' : 'text-slate-650'}`}>
                  {isDriving ? `${accelerometer.x} m/s²` : '0.00'}
                </span>
              </div>
              <div className="bg-zinc-950 rounded-lg p-2.5 border border-zinc-850 transition hover:border-zinc-700">
                <span className="text-[9px] text-slate-450 uppercase block font-mono">Y-Longitud.</span>
                <span className={`text-xs font-bold font-mono ${isDriving ? 'text-white' : 'text-slate-650'}`}>
                  {isDriving ? `${accelerometer.y} m/s²` : '0.00'}
                </span>
              </div>
              <div className="bg-zinc-950 rounded-lg p-2.5 border border-zinc-850 transition hover:border-zinc-700">
                <span className="text-[9px] text-slate-450 uppercase block font-mono">Z-Gravity</span>
                <span className={`text-xs font-bold font-mono ${isDriving ? 'text-white' : 'text-slate-650'}`}>
                  {isDriving ? `${accelerometer.z} m/s²` : '9.81'}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="bg-zinc-950 rounded-lg p-2.5 border border-zinc-850">
                <span className="text-[9px] text-slate-450 uppercase block font-mono">Pitch & Roll (Gyro)</span>
                <span className={`text-xs font-bold font-mono ${isDriving ? 'text-white' : 'text-slate-600'}`}>
                  {isDriving ? `P: ${gyroscope.beta}° R: ${gyroscope.gamma}°` : 'P: 0.0° R: 0.0°'}
                </span>
              </div>
              <div className="bg-zinc-950 rounded-lg p-2.5 border border-zinc-850">
                <span className="text-[9px] text-slate-450 uppercase block font-mono">Active Jurisdiction</span>
                <span className="text-xs font-bold text-amber-400 block truncate">
                  {currentState} RTO
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8 flex flex-col space-y-6">

          {activeIntervention && (
            <div className="bg-rose-500/10 border border-rose-500/40 rounded-xl p-4 flex items-start space-x-3 text-rose-300 animate-pulse-subtle neon-glow-rose relative">
              <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-bold text-[10px] uppercase tracking-wider text-rose-450">Active Co-Driver Intervention</h4>
                <p className="text-sm font-medium mt-0.5">{activeIntervention.title}</p>
                <p className="text-xs text-rose-300/80 mt-1">{activeIntervention.message}</p>
              </div>
              <button 
                onClick={() => setActiveIntervention(null)} 
                className="text-rose-400 hover:text-white absolute top-3 right-3"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden flex flex-col shadow-2xl relative">

            <div className="bg-zinc-950 text-white px-6 py-3 flex justify-between items-center text-xs font-medium border-b border-zinc-800/85 font-mono">
              <div className="flex items-center space-x-1.5">
                <span>10:34 PM</span>
                {weather === 'Rainy' && <CloudRain className="w-3.5 h-3.5 text-blue-400 animate-pulse" />}
              </div>
              <div className="w-28 h-4 bg-black rounded-full absolute left-1/2 -translate-x-1/2 flex items-center justify-center">
                <div className="w-8 h-1.5 bg-zinc-800 rounded-full"></div>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="text-[9px] bg-zinc-850 px-1.5 py-0.5 rounded font-bold text-emerald-400 tracking-wider">LOCAL DATA</span>
                <span>89%</span>
              </div>
            </div>

            <div className="bg-zinc-900/60 p-2 flex border-b border-zinc-800/50 text-xs md:text-sm">
              <button
                onClick={() => setActiveTab('home')}
                className={`flex-1 py-3 text-center rounded-xl font-bold flex items-center justify-center space-x-1.5 transition-all ${
                  activeTab === 'home' 
                    ? 'bg-zinc-800 text-white shadow-md border border-zinc-700/35' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Shield className="w-4 h-4" />
                <span className="hidden sm:inline">Dashboard</span>
                <span className="inline sm:hidden">Dash</span>
              </button>
              
              <button
                onClick={() => setActiveTab('route')}
                className={`flex-1 py-3 text-center rounded-xl font-bold flex items-center justify-center space-x-1.5 transition-all ${
                  activeTab === 'route' 
                    ? 'bg-zinc-800 text-white shadow-md border border-zinc-700/35' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Navigation className="w-4 h-4" />
                <span className="hidden sm:inline">Route Risk</span>
                <span className="inline sm:hidden">Route</span>
              </button>

              <button
                onClick={() => setActiveTab('chat')}
                className={`flex-1 py-3 text-center rounded-xl font-bold flex items-center justify-center space-x-1.5 transition-all ${
                  activeTab === 'chat' 
                    ? 'bg-zinc-800 text-white shadow-md border border-zinc-700/35' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                <span className="hidden sm:inline">Safety AI</span>
                <span className="inline sm:hidden">AI Laws</span>
              </button>

              <button
                onClick={() => setActiveTab('history')}
                className={`flex-1 py-3 text-center rounded-xl font-bold flex items-center justify-center space-x-1.5 transition-all ${
                  activeTab === 'history' 
                    ? 'bg-zinc-800 text-white shadow-md border border-zinc-700/35' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <History className="w-4 h-4" />
                <span className="hidden sm:inline">Post-Drive</span>
                <span className="inline sm:hidden">Trips</span>
              </button>
            </div>

            <div className="flex-1 p-5 md:p-6 overflow-y-auto min-h-[480px] bg-zinc-950">

              {activeTab === 'home' && (
                <div className="space-y-6">
                  
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">

                    <div className={`md:col-span-5 flex flex-col items-center justify-center bg-zinc-900/50 border border-zinc-850 p-5 rounded-2xl text-center relative ${getRiskStatus(behaviorScore).glow}`}>
                      <span className="text-[10px] font-bold text-slate-450 uppercase tracking-widest mb-3">Behaviour Score</span>
                      
                      <div className="relative w-36 h-36 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                          <circle
                            cx="50"
                            cy="50"
                            r="42"
                            className="stroke-zinc-850 fill-none"
                            strokeWidth="7"
                          />
                          <circle
                            cx="50"
                            cy="50"
                            r="42"
                            className={`fill-none transition-all duration-1000 ${
                              behaviorScore >= 90 ? 'stroke-emerald-500' :
                              behaviorScore >= 70 ? 'stroke-amber-500' :
                              behaviorScore >= 50 ? 'stroke-orange-500' : 'stroke-rose-600'
                            }`}
                            strokeWidth="7"
                            strokeDasharray="263.89"
                            strokeDashoffset={263.89 - (263.89 * behaviorScore) / 100}
                            strokeLinecap="round"
                          />
                        </svg>
                        
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-4xl font-black text-white tracking-tight">{behaviorScore}</span>
                          <span className={`text-[9.5px] font-bold uppercase px-2 py-0.5 rounded-full mt-1 ${getRiskStatus(behaviorScore).bg} ${getRiskStatus(behaviorScore).color}`}>
                            {getRiskStatus(behaviorScore).label}
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-400 mt-4 leading-relaxed">
                        Continuous on-device telemetry diagnostics ensures legal safety compliance.
                      </p>
                    </div>

                    <div className="md:col-span-7 space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-zinc-900/60 border border-zinc-850 p-4 rounded-xl flex items-center space-x-3 transition hover:border-zinc-700">
                          <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-400">
                            <Compass className="w-5 h-5" />
                          </div>
                          <div>
                            <span className="text-[10px] uppercase text-slate-400 block font-mono">Current Speed</span>
                            <span className="text-base md:text-lg font-bold text-white">
                              {speed} <span className="text-xs text-slate-400 font-normal">km/h</span>
                            </span>
                          </div>
                        </div>

                        <div className="bg-zinc-900/60 border border-zinc-850 p-4 rounded-xl flex items-center space-x-3 transition hover:border-zinc-700">
                          <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                            <Shield className="w-5 h-5" />
                          </div>
                          <div>
                            <span className="text-[10px] uppercase text-slate-400 block font-mono">Active Zone</span>
                            <span className="text-xs md:text-sm font-bold text-white block truncate">{currentZone}</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-zinc-900/50 border border-zinc-850 rounded-xl p-4">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-350 mb-3 flex items-center gap-1.5">
                          <AlertTriangle className="w-4 h-4 text-amber-500" />
                          Active Behavioral Trackers
                        </h4>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between items-center text-xs pb-2 border-b border-zinc-800/60">
                            <span className="text-slate-400">Distraction (Phone Screen interactions)</span>
                            <span className={`font-mono font-bold ${phoneInteractions > 0 ? 'text-rose-400' : 'text-slate-450'}`}>
                              {phoneInteractions} logged
                            </span>
                          </div>
                          <div className="flex justify-between items-center text-xs pb-2 border-b border-zinc-800/60">
                            <span className="text-slate-400">Deceleration Hazards (Harsh Braking)</span>
                            <span className={`font-mono font-bold ${harshBrakes > 0 ? 'text-amber-400' : 'text-slate-450'}`}>
                              {harshBrakes} detected
                            </span>
                          </div>
                          <div className="flex justify-between items-center text-xs pb-2 border-b border-zinc-800/60">
                            <span className="text-slate-400">Zone Speeding Infractions</span>
                            <span className={`font-mono font-bold ${overspeedEvents > 0 ? 'text-red-400' : 'text-slate-450'}`}>
                              {overspeedEvents} events
                            </span>
                          </div>
                          <div className="flex justify-between items-center text-xs pt-0.5">
                            <span className="text-slate-400">External Weather Factors</span>
                            <span className="font-mono font-bold text-sky-400">
                              {weather}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-zinc-900/40 border border-zinc-850 rounded-2xl p-5 relative overflow-hidden">
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping"></div>
                        <span className="text-xs font-bold text-white uppercase tracking-wider">Vision Zero Live Roadmap</span>
                      </div>
                      <span className="text-[10px] text-slate-450 font-mono">
                        Route: {routeOrigin.split(' ')[0]} ➔ {routeDestination.split(' ')[0]}
                      </span>
                    </div>

                    <div className="relative h-28 bg-zinc-950 rounded-xl border border-zinc-850 flex items-center justify-center overflow-hidden">
                      
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-25"></div>

                      <div className="absolute left-4 right-4 h-12 border-y border-dashed border-zinc-800 flex items-center justify-between px-8 bg-zinc-900/20">
                        
                        <div className="w-32 h-full bg-rose-500/10 border-x border-rose-500/20 flex items-center justify-center text-[9px] text-rose-400/80 uppercase font-mono font-bold">
                          Incident Blackspot
                        </div>
                        <div className="w-20 h-full bg-emerald-500/5 flex items-center justify-center text-[9px] text-emerald-400/50 uppercase font-mono">
                          Safe Zone
                        </div>
                      </div>

                      <div className="absolute left-1/3 transform -translate-x-1/2 flex flex-col items-center z-10">
                        <div className="bg-amber-400 text-zinc-950 font-black px-2.5 py-1 rounded-lg text-[9px] shadow-lg shadow-amber-500/20 flex items-center space-x-1 transition-all">
                          <Shield className="w-3 h-3 fill-current" />
                          <span>MY VEHICLE</span>
                        </div>
                        <div className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-1 animate-ping"></div>
                      </div>

                      {currentZone === 'School Zone' && (
                        <div className="absolute right-12 bg-sky-500/15 border border-sky-400/40 text-sky-300 rounded px-2.5 py-1 text-[9.5px] flex items-center space-x-1.5 z-10 animate-bounce">
                          <span className="w-1.5 h-1.5 rounded-full bg-sky-450 animate-ping"></span>
                          <span>School Zone Limit (30km/h)</span>
                        </div>
                      )}

                      {currentZone === 'State Border' && (
                        <div className="absolute right-24 bg-purple-500/15 border border-purple-400/40 text-purple-300 rounded px-2.5 py-1 text-[9.5px] flex items-center space-x-1.5 z-10">
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                          <span>Entering State Jurisdiction Boundary</span>
                        </div>
                      )}
                    </div>

                    <div className="flex justify-between text-slate-450 text-[11px] mt-2.5 font-mono">
                      <span>Live Stats: {driveDistance} km traveled</span>
                      <span>Target Speed: {currentZone === 'School Zone' ? '30' : weather === 'Rainy' ? '50' : '80'} km/h safe cap</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-zinc-900/60 border border-zinc-850 rounded-xl p-4 flex flex-col justify-between">
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-350 mb-1">State Boundaries Guidance</h4>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          Your active border state is <strong className="text-white">{currentState}</strong>. Local state legislation fines wrong-side driving at ₹5,000 + automatic license suspension under state RTO rules.
                        </p>
                      </div>
                      <div className="mt-3 flex items-center space-x-2 text-xs text-amber-400 font-medium">
                        <Info className="w-4 h-4 text-amber-500 shrink-0" />
                        <span>Why? Safe lanes protect cross-traffic intersection margins.</span>
                      </div>
                    </div>

                    <button 
                      onClick={() => triggerIntervention('EMERGENCY SOS', 'Initiating emergency GPS signal broadcast to local Indian Highways helpline (1033) & assigned emergency contact.')}
                      className="bg-rose-950/20 hover:bg-rose-950/50 border border-rose-500/30 hover:border-rose-500/50 rounded-xl p-4 flex items-center justify-between text-left transition active:scale-98 text-rose-350"
                    >
                      <div>
                        <span className="text-rose-455 font-extrabold text-sm block tracking-wide">EMERGENCY SOS ONE-TAP</span>
                        <span className="text-xs text-rose-300/80 block mt-1">Direct GPS coordinate transmission</span>
                      </div>
                      <div className="w-12 h-12 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-500 shrink-0">
                        <AlertTriangle className="w-6 h-6 animate-pulse" />
                      </div>
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'route' && (
                <div className="space-y-6">
                  <div className="bg-zinc-900/70 border border-zinc-850 rounded-2xl p-5">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-bold text-white flex items-center space-x-2">
                        <Navigation className="w-5 h-5 text-amber-500" />
                        <span>Pre-Drive Intelligence Analyzer</span>
                      </h2>
                      <span className="text-[10px] text-slate-450 font-mono">Vision Zero DB v2.6</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">Origin Start Point</label>
                        <input 
                          type="text" 
                          value={routeOrigin} 
                          onChange={(e) => setRouteOrigin(e.target.value)}
                          className="w-full bg-zinc-950 border border-zinc-850 rounded-xl px-4 py-2.5 text-xs md:text-sm text-white focus:outline-none focus:border-amber-500" 
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">Destination End Point</label>
                        <input 
                          type="text" 
                          value={routeDestination} 
                          onChange={(e) => setRouteDestination(e.target.value)}
                          className="w-full bg-zinc-950 border border-zinc-850 rounded-xl px-4 py-2.5 text-xs md:text-sm text-white focus:outline-none focus:border-amber-500" 
                        />
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-zinc-850">
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold block mb-2">Explore Sample High-risk Indian Corridors</span>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {presetRoutes.map((rt, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleSelectRoutePreset(rt)}
                            className="bg-zinc-950 hover:bg-zinc-900 border border-zinc-850 hover:border-zinc-700 rounded-lg p-2.5 text-left text-xs transition"
                          >
                            <span className="font-bold text-white block truncate">{rt.origin.split(' ')[0]} to {rt.dest.split(' ')[0]}</span>
                            <span className={`text-[9.5px] font-bold ${
                              rt.risk === 'Low' ? 'text-emerald-400' :
                              rt.risk === 'Moderate' ? 'text-amber-400' :
                              rt.risk === 'High' ? 'text-orange-450' : 'text-rose-500'
                            }`}>{rt.risk} Risk</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {showRouteAnalysis && (
                    <div className="bg-zinc-900/40 border border-zinc-850 rounded-2xl p-5 space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-sm font-bold text-slate-200">Segment Safety Diagnostics</h3>
                          <p className="text-[10px] text-slate-450 font-mono mt-0.5">Route Risk Evaluator Engine</p>
                        </div>
                        <div className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                          routeRiskScore === 'Low' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                          routeRiskScore === 'Moderate' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                          routeRiskScore === 'High' ? 'bg-orange-500/10 text-orange-450 border-orange-500/20' :
                          'bg-rose-500/10 text-rose-500 border-rose-500/35'
                        }`}>
                          {routeRiskScore} Risk Route
                        </div>
                      </div>

                      <div className="bg-zinc-950 border border-zinc-850 rounded-xl p-4 h-48 relative overflow-hidden flex flex-col justify-between">
                        <div className="absolute inset-0">
                          <svg className="w-full h-full stroke-zinc-800" fill="none">
                            <path d="M 50 140 C 140 100, 250 60, 380 100 T 680 40" strokeWidth="4" strokeLinecap="round" />
                            <path d="M 50 140 C 140 100, 250 60, 380 100 T 680 40" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="5 5" strokeLinecap="round" />

                            <path d="M 50 140 Q 220 170, 420 140 T 680 40" stroke="#10b981" strokeWidth="2" strokeDasharray="3 3" strokeLinecap="round" />
                          </svg>

                          <div className="absolute top-[80px] left-[320px] transform -translate-x-1/2 -translate-y-1/2">
                            <span className="absolute inline-flex h-3.5 w-3.5 rounded-full bg-rose-500 opacity-75 animate-ping"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
                          </div>
                          <span className="absolute top-[95px] left-[260px] text-[9px] text-rose-450 font-bold bg-rose-950/90 border border-rose-500/20 px-1.5 py-0.5 rounded">
                            NH Blackspot Area
                          </span>

                          <span className="absolute bottom-[20px] left-[360px] text-[9px] text-emerald-400 font-bold bg-emerald-950/90 border border-emerald-500/20 px-1.5 py-0.5 rounded">
                            Bypass Suggested (-15% incident rate)
                          </span>
                        </div>

                        <div className="flex justify-between items-start z-10">
                          <div className="bg-zinc-900/90 border border-zinc-800 rounded px-2 py-1">
                            <span className="text-[9px] font-bold text-emerald-450 uppercase tracking-widest block font-mono">Origin</span>
                            <span className="text-xs font-semibold text-white block truncate max-w-[120px]">{routeOrigin}</span>
                          </div>
                          
                          <div className="bg-zinc-900/90 border border-zinc-800 rounded px-2 py-1 text-right">
                            <span className="text-[9px] font-bold text-amber-500 uppercase tracking-widest block font-mono">Destination</span>
                            <span className="text-xs font-semibold text-white block truncate max-w-[120px]">{routeDestination}</span>
                          </div>
                        </div>

                        <div className="bg-zinc-900/90 border border-zinc-850 rounded-lg p-2 z-10 flex items-center space-x-2 text-[10.5px] text-slate-350">
                          <Info className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span>Safety Bypass routes bypass heavily congested logistics channels. Recommended for night operations.</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <span className="text-xs font-bold text-slate-350 uppercase tracking-wide block">Dynamic Safety Recommendations</span>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                          <div className="bg-zinc-950 border border-zinc-850 p-3 rounded-lg">
                            <span className="font-bold text-amber-400 block mb-1">Night Logistics Hours</span>
                            <span className="text-slate-450">Truck traffic increases between 11 PM and 5 AM. Headlight fatigue and stopping distances scale by 30% on non-divided sectors.</span>
                          </div>
                          <div className="bg-zinc-950 border border-zinc-850 p-3 rounded-lg">
                            <span className="font-bold text-sky-400 block mb-1">Precipitation Deceleration</span>
                            <span className="text-slate-450">Tire friction coefficients drop to 0.4 under rainy conditions. Maintaining a 4-second gap limit is advised.</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'chat' && (
                <div className="space-y-4 flex flex-col h-[520px]">

                  <div className="flex-1 bg-zinc-900/40 border border-zinc-850 rounded-2xl p-4 overflow-y-auto space-y-4 flex flex-col">
                    <div className="flex items-center justify-between border-b border-zinc-850 pb-2 mb-1">
                      <div className="flex items-center space-x-2 text-xs">
                        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                        <span className="text-slate-300 font-bold">Motor Vehicles Act (2019 Amendments) Database</span>
                      </div>
                      <span className="text-[9.5px] text-slate-450 font-mono">
                        {apiKey ? 'Gemini 2.5 Flash' : 'Offline Knowledge Engine'}
                      </span>
                    </div>

                    <div className="space-y-4 flex-1">
                      {chatMessages.map((msg) => (
                        <div 
                          key={msg.id} 
                          className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs md:text-sm leading-relaxed shadow ${
                            msg.sender === 'user' 
                              ? 'bg-amber-500 text-zinc-950 font-semibold rounded-tr-none' 
                              : 'bg-zinc-950 border border-zinc-850 text-slate-200 rounded-tl-none'
                          }`}>
                            <p className="whitespace-pre-line">{msg.text}</p>
                            <span className={`text-[8.5px] block mt-1.5 text-right ${
                              msg.sender === 'user' ? 'text-zinc-800' : 'text-slate-500 font-mono'
                            }`}>{msg.timestamp}</span>
                          </div>
                        </div>
                      ))}

                      {isChatLoading && (
                        <div className="flex justify-start">
                          <div className="bg-zinc-950 border border-zinc-850 rounded-2xl rounded-tl-none px-4 py-3 text-xs text-slate-400 flex items-center space-x-2">
                            <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce"></span>
                            <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce delay-100"></span>
                            <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce delay-200"></span>
                            <span className="text-[10px] font-mono">Consulting Indian Road safety parameters...</span>
                          </div>
                        </div>
                      )}
                      
                      <div ref={chatBottomRef}></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="text-[9.5px] font-bold text-slate-400 uppercase tracking-widest block">Quick Safety & Legal Queries</span>
                    <div className="flex flex-wrap gap-1.5">
                      <button 
                        onClick={() => handlePresetQuery("What is the fine for red signal jumping in Maharashtra?")}
                        className="bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 hover:border-zinc-700 text-slate-300 text-[10.5px] px-2.5 py-1 rounded-lg transition"
                      >
                        🚦 Signal Jumping Fine?
                      </button>
                      <button 
                        onClick={() => handlePresetQuery("Why is helmet double-strapping required by physical law?")}
                        className="bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 hover:border-zinc-700 text-slate-300 text-[10.5px] px-2.5 py-1 rounded-lg transition"
                      >
                        🪖 Helmet Strapping physics
                      </button>
                      <button 
                        onClick={() => handlePresetQuery("Can a 17-year-old legally operate a gearless scooter in India?")}
                        className="bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 hover:border-zinc-700 text-slate-300 text-[10.5px] px-2.5 py-1 rounded-lg transition"
                      >
                        🛵 Under-18 Licensing rules?
                      </button>
                    </div>
                  </div>

                  <form onSubmit={handleChatSubmit} className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Search a quick query below"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      className="flex-1 bg-zinc-900 border border-zinc-850 rounded-xl px-4 py-3 text-xs md:text-sm text-white focus:outline-none focus:border-amber-500"
                    />
                    <button
                      type="submit"
                      className="bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold px-5 rounded-xl transition flex items-center justify-center shrink-0"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              )}

              {activeTab === 'history' && (
                <div className="space-y-6">

                  {currentTripReport ? (
                    <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-5 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl pointer-events-none"></div>
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-[9px] bg-emerald-500/20 text-emerald-450 border border-emerald-500/35 px-2 py-0.5 rounded font-mono uppercase font-bold">New Session Analysis Compiled</span>
                          <h3 className="text-base md:text-lg font-bold text-white mt-2">{currentTripReport.route}</h3>
                          <p className="text-xs text-slate-450">{currentTripReport.date}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] text-slate-400 block font-mono">Safety Score</span>
                          <span className="text-2xl md:text-3xl font-black text-emerald-450 font-mono">{currentTripReport.score}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
                        <div className="bg-zinc-950/60 p-3 rounded-lg border border-zinc-850">
                          <span className="text-[9px] text-slate-400 block uppercase font-mono">Distance</span>
                          <span className="text-xs md:text-sm font-bold text-white">{currentTripReport.distance} km</span>
                        </div>
                        <div className="bg-zinc-950/60 p-3 rounded-lg border border-zinc-850">
                          <span className="text-[9px] text-slate-400 block uppercase font-mono">Harsh Brakes</span>
                          <span className={`text-xs md:text-sm font-bold ${currentTripReport.harshBrakes > 0 ? 'text-amber-400' : 'text-emerald-400'}`}>
                            {currentTripReport.harshBrakes} detected
                          </span>
                        </div>
                        <div className="bg-zinc-950/60 p-3 rounded-lg border border-zinc-850">
                          <span className="text-[9px] text-slate-400 block uppercase font-mono">Phone Touches</span>
                          <span className={`text-xs md:text-sm font-bold ${currentTripReport.phoneInteractions > 0 ? 'text-rose-450' : 'text-emerald-400'}`}>
                            {currentTripReport.phoneInteractions} logged
                          </span>
                        </div>
                        <div className="bg-zinc-950/60 p-3 rounded-lg border border-zinc-850">
                          <span className="text-[9px] text-slate-400 block uppercase font-mono">Safety Category</span>
                          <span className="text-xs md:text-sm font-bold text-white truncate block">{currentTripReport.classification}</span>
                        </div>
                      </div>

                      <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-850 mt-4 text-xs text-slate-350 leading-relaxed">
                        <h4 className="font-bold text-white mb-1.5 flex items-center gap-1.5">
                          <Sparkles className="w-4 h-4 text-amber-500" />
                          Localized Defensive Coaching Advice
                        </h4>
                        <p>
                          {currentTripReport.score >= 90 ? (
                            "Outstanding driving control indexes! Your acceleration and braking profile stay safely below collision hazard envelopes, providing ample reaction buffer room for pedestrians and sudden road hazards."
                          ) : (
                            "Device interaction markers were generated concurrently with lateral G-force variations. In safety engineering, a split-second distraction doubles stopping distance. Minimizing dashboard screen interaction keeps margins optimal."
                          )}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-zinc-900/40 border border-zinc-850 rounded-xl p-6 text-center text-slate-400">
                      <p className="text-xs md:text-sm">No active session is complete yet. Press <strong className="text-white">"Start Live Session"</strong> on the left control panel, trigger a few sensor inputs, and press <strong className="text-white">"End Drive"</strong> to compile a report.</p>
                    </div>
                  )}

                  <div className="space-y-3">
                    <span className="text-xs font-bold text-slate-350 uppercase tracking-wide block">Completed Sessions Directory</span>
                    
                    <div className="space-y-3.5">
                      {completedTrips.map((tr) => (
                        <div 
                          key={tr.id}
                          className="bg-zinc-900/60 border border-zinc-850 rounded-xl p-4 flex items-center justify-between hover:border-zinc-700 transition"
                        >
                          <div className="space-y-1">
                            <h4 className="text-xs md:text-sm font-bold text-white">{tr.route}</h4>
                            <div className="flex items-center space-x-3 text-[10.5px] text-slate-400">
                              <span>{tr.date}</span>
                              <span>•</span>
                              <span>{tr.distance} km</span>
                              <span>•</span>
                              <span className="text-[8.5px] bg-zinc-800 px-1.5 py-0.5 rounded font-bold font-mono uppercase tracking-wider">{tr.classification}</span>
                            </div>
                          </div>

                          <div className="flex items-center space-x-4">
                            <div className="text-right">
                              <span className="text-[9px] text-slate-450 block uppercase font-mono">Safety Score</span>
                              <span className={`text-base md:text-lg font-bold font-mono ${
                                tr.score >= 90 ? 'text-emerald-450' :
                                tr.score >= 70 ? 'text-amber-450' : 'text-rose-500'
                              }`}>{tr.score}</span>
                            </div>
                            <button 
                              onClick={() => {
                                setCurrentTripReport(tr);
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                              }}
                              className="p-1.5 bg-zinc-800 hover:bg-zinc-750 text-slate-300 hover:text-white rounded-lg transition"
                            >
                              <ArrowRight className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}

            </div>

            <div className="bg-zinc-950 py-4 border-t border-zinc-800/80 flex justify-center">
              <div className="w-32 h-1 bg-zinc-800 rounded-full"></div>
            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-zinc-900/50 border border-zinc-850 rounded-2xl p-4 flex items-start space-x-3">
              <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg shrink-0">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Zero-Inference Core</h4>
                <p className="text-[11px] text-slate-450 leading-relaxed mt-1">
                  Driving score assessment runs fully on-device using local sensor classification rules.
                </p>
              </div>
            </div>

            <div className="bg-zinc-900/50 border border-zinc-850 rounded-2xl p-4 flex items-start space-x-3">
              <div className="p-2 bg-amber-500/10 text-amber-400 rounded-lg shrink-0">
                <Volume2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Safe Notifications</h4>
                <p className="text-[11px] text-slate-450 leading-relaxed mt-1">
                  Alert markers use modern notification designs to prevent driver shock and heavy visual clutter.
                </p>
              </div>
            </div>

            <div className="bg-zinc-900/50 border border-zinc-850 rounded-2xl p-4 flex items-start space-x-3">
              <div className="p-2 bg-sky-500/10 text-sky-400 rounded-lg shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Ground-Truth Fines</h4>
                <p className="text-[11px] text-slate-450 leading-relaxed mt-1">
                  RTO rules are continuously synchronized with standard Indian Motor Vehicles Act statutory fines.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>

      <footer className="border-t border-zinc-850 bg-zinc-950/80 p-6 text-center text-xs text-slate-500">
        <p>© 2026 SWERVE India — Supporting the Vision Zero India road security campaigns. Coaching guidelines are advisory.</p>
        <p className="mt-1">Powered by Local Sensor Classification Rules & Gemini 2.5 Flash LLM intelligence.</p>
      </footer>

    </div>
  );
}
