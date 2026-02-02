import React, { useState, useEffect, useRef } from 'react';
import {
  Menu, X, Play, Clock, Users, Shield,
  MapPin, ShoppingCart, UserPlus, Phone,
  ChevronDown, ChevronRight, CheckCircle, Info,
  Search, ExternalLink, Settings, Cpu
} from 'lucide-react';
import { DRIVERS, EVENTS, PROGRAM, MARKET_ITEMS, SPONSORS } from './constants';
import { Driver } from './types';

// --- Components ---

// --- Custom "Skew" Button from previous design ---
const Button = ({
  children,
  variant = 'primary',
  className = '',
  onClick
}: {
  children?: React.ReactNode;
  variant?: 'primary' | 'outline' | 'ghost' | 'engine-start';
  className?: string;
  onClick?: () => void;
}) => {
  const isOutline = variant === 'outline';
  const isEngine = variant === 'engine-start';

  // Base classes imitating our .btn .skew-btn from styles.css
  const baseClasses = "relative inline-flex items-center justify-center px-8 py-3 font-tech text-lg font-bold uppercase tracking-wider transform -skew-x-[15deg] transition-all duration-300 cursor-pointer border";

  let variantClasses = "";
  if (isEngine) {
    variantClasses = "bg-red-600 text-white border-red-600 hover:bg-white hover:text-red-600 hover:shadow-[0_0_20px_rgba(220,38,38,0.5)]";
  } else if (isOutline) {
    variantClasses = "bg-transparent text-[#F4CE14] border-[#F4CE14] hover:bg-[#F4CE14]/10 hover:shadow-[0_0_15px_rgba(244,206,20,0.3)]";
  } else {
    // Primary
    variantClasses = "bg-[#F4CE14] text-black border-[#F4CE14] hover:bg-white hover:text-black hover:shadow-[0_0_20px_rgba(255,255,255,0.5)]";
  }

  return (
    <button className={`${baseClasses} ${variantClasses} ${className}`} onClick={onClick}>
      <span className="block transform skew-x-[15deg]">
        {children}
      </span>
    </button>
  );
};

const SectionHeader = ({ title, subtitle }: { title: string, subtitle?: string }) => (
  <div className="mb-12 text-left">
    <h2 className="text-6xl md:text-8xl font-bebas font-semibold text-[#F4CE14] tracking-tight leading-none mb-2 uppercase">
      {title}
    </h2>
    {subtitle && <p className="font-tech text-gray-400 tracking-widest uppercase text-sm md:text-base">{subtitle}</p>}
    <div className="w-24 h-1 bg-[#F4CE14] mt-4 relative">
      <div className="absolute top-0 right-0 w-4 h-full bg-white animate-pulse"></div>
    </div>
  </div>
);

// --- Fixed Header with Grid Layout (1fr auto 1fr) ---
const TechNavBar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b border-white/5 ${scrolled ? 'bg-[#111]/95 py-4 backdrop-blur-md shadow-2xl' : 'bg-transparent py-8'}`}>
      {/* Container with Grid Layout: Left (Logo) | Center (Nav) | Right (CTA) */}
      <div className="w-[95%] mx-auto px-6 grid grid-cols-[1fr_auto_1fr] items-center relative gap-4">

        {/* Left: Logo */}
        <div className="justify-self-start flex items-center gap-3 group cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
          <img src="/video/LOGO-Y.png" alt="VRAKFEST Logo" className="h-16 w-auto hover:grayscale-0 hover:scale-105 transition-all duration-300" />
        </div>

        {/* Center: Navigation */}
        <nav className="hidden lg:flex justify-self-center items-center gap-10">
          {['O AKCI', 'PROGRAM', 'KALENDÁŘ', 'JEZDCI', 'PRAVIDLA', 'APLIKACE'].map(item => (
            <a key={item} href={`#${item.toLowerCase().replace(' ', '')}`} className="font-bebas text-xl text-white hover:text-[#F4CE14] transition-all uppercase tracking-wide">
              {item}
            </a>
          ))}
        </nav>

        {/* Right: Buttons */}
        <div className="justify-self-end flex items-center gap-4">
          {/* Smaller, tighter buttons as requested */}
          <Button variant="outline" className="hidden sm:inline-flex !px-6 !py-2 !text-sm">PŘIHLÁŠENÍ</Button>
          <Button variant="primary" className="inline-flex !px-6 !py-2 !text-sm">KOUPIT VSTUPENKU</Button>

          {/* Mobile Toggle */}
          <div className="lg:hidden text-white cursor-pointer ml-4">
            <Menu size={32} />
          </div>
        </div>

      </div>
    </header>
  );
};

const Hero = () => (
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
    <div className="absolute inset-0 bg-black/50 z-10"></div>
    <video
      autoPlay loop muted playsInline
      className="absolute inset-0 w-full h-full object-cover"
    >
      <source src="/video/BRANKY%20VF-web.mp4" type="video/mp4" />
    </video>

    <div className="container mx-auto px-6 relative z-20 text-center flex flex-col items-center">
      <div className="mb-6 inline-block font-tech text-[#F4CE14] border border-[#F4CE14] px-10 py-3 bg-black/40 tracking-[0.3em] uppercase text-sm font-bold">
        ESTABLISHED 2012 // LIVE IN 2026
      </div>

      <h1 className="text-7xl md:text-[14rem] font-bebas font-semibold leading-[0.85] mb-12 animate-fadeIn uppercase tracking-tight">
        <span className="text-white">VRAK</span>
        <span className="text-[#F4CE14] drop-shadow-[0_0_40px_rgba(244,206,20,0.6)]">FEST</span>
        <span className="text-white ml-6">2026</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mb-20 px-4">
        {/* Stat Card 1 */}
        <div className="relative bg-black/40 backdrop-blur-md border border-white/10 p-8 flex flex-col items-center justify-center group overflow-hidden hover:-translate-y-2 transition-transform duration-300">
          <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-[#F4CE14] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute bottom-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-[#F4CE14] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          <div className="mb-4 p-3 bg-white/5 rounded-full group-hover:bg-[#F4CE14]/20 transition-colors">
            <Clock size={24} className="text-gray-400 group-hover:text-[#F4CE14] transition-colors" />
          </div>

          <p className="font-bebas text-7xl text-white group-hover:text-[#F4CE14] transition-colors font-semibold tracking-wider leading-none mb-2">
            142
          </p>
          <p className="font-tech text-xs text-gray-500 tracking-[0.4em] uppercase font-bold group-hover:text-white transition-colors">DAYS TO IMPACT</p>
        </div>

        {/* Stat Card 2 */}
        <div className="relative bg-black/40 backdrop-blur-md border border-white/10 p-8 flex flex-col items-center justify-center group overflow-hidden hover:-translate-y-2 transition-transform duration-300">
          <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-[#F4CE14] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute bottom-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-[#F4CE14] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          <div className="mb-4 p-3 bg-white/5 rounded-full group-hover:bg-[#F4CE14]/20 transition-colors">
            <Shield size={24} className="text-gray-400 group-hover:text-[#F4CE14] transition-colors" />
          </div>

          <p className="font-bebas text-7xl text-white group-hover:text-[#F4CE14] transition-colors font-semibold tracking-wider leading-none mb-2">
            4 892
          </p>
          <p className="font-tech text-xs text-gray-500 tracking-[0.4em] uppercase font-bold group-hover:text-white transition-colors">TOTAL WRECKS</p>
        </div>

        {/* Stat Card 3 */}
        <div className="relative bg-black/40 backdrop-blur-md border border-white/10 p-8 flex flex-col items-center justify-center group overflow-hidden hover:-translate-y-2 transition-transform duration-300">
          <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-[#F4CE14] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute bottom-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-[#F4CE14] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          <div className="mb-4 p-3 bg-white/5 rounded-full group-hover:bg-[#F4CE14]/20 transition-colors">
            <Users size={24} className="text-gray-400 group-hover:text-[#F4CE14] transition-colors" />
          </div>

          <p className="font-bebas text-7xl text-white group-hover:text-[#F4CE14] transition-colors font-semibold tracking-wider leading-none mb-2">
            25k+
          </p>
          <p className="font-tech text-xs text-gray-500 tracking-[0.4em] uppercase font-bold group-hover:text-white transition-colors">ATTENDANCE</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-6 w-full max-w-2xl">
        <Button className="flex-1">CHCI ZÁVODIT</Button>
        <Button variant="outline" className="flex-1">KOMPLETNÍ INFO</Button>
      </div>
    </div>

    <div className="absolute bottom-10 left-10 z-20 hidden lg:block text-left">
      <div className="flex flex-col gap-2 font-tech text-[10px] text-gray-500 opacity-50 uppercase tracking-widest">
        <p>LAT: 50.0835° N</p>
        <p>LON: 14.4341° E</p>
        <p>ELEV: 235m</p>
      </div>
    </div>
  </section>
);

const About = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const thumbnails = [
    "https://picsum.photos/seed/yt1/300/200",
    "https://picsum.photos/seed/yt2/300/200",
    "https://picsum.photos/seed/yt3/300/200",
    "https://picsum.photos/seed/yt4/300/200",
    "https://picsum.photos/seed/yt5/300/200",
  ];

  return (
    <section id="theshow" className="py-32 bg-[#0a0a0a] relative overflow-hidden">
      <div className="absolute top-0 right-0 p-12 text-white/5 font-bebas text-[20vw] pointer-events-none select-none leading-none uppercase tracking-tight font-semibold italic">
        DESTRUCTION
      </div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-24 items-start">
          <div className="text-left">
            <SectionHeader title="CO JE TO VRAKFEST" subtitle="INDUSTRIAL ADRENALINE. TOTAL CARNAGE." />
            <p className="text-2xl text-gray-400 leading-relaxed mb-12 font-medium">
              Vrakfest není jen závod. Je to oslava destrukce, technické vynalézavosti a čistého adrenalinu.
              Stovky diváků, desítky upravených vraků a jediný cíl: <span className="text-white border-b-2 border-[#F4CE14]">přežít</span>.
              Žádné slitování, žádné brzdy, jen zvuk skřípějících plechů.
            </p>

            <div className="grid grid-cols-2 gap-8 mb-16">
              <div className="bg-white/5 p-8 border-l-4 border-[#F4CE14] group hover:bg-[#F4CE14]/10 transition-all text-left shadow-lg">
                <p className="font-bebas text-5xl text-[#F4CE14] mb-2 uppercase tracking-tight font-bold">25 000+</p>
                <p className="font-tech text-xs text-gray-500 tracking-widest uppercase">NÁVŠTĚVNÍKŮ</p>
              </div>
              <div className="bg-white/5 p-8 border-l-4 border-[#F4CE14] group hover:bg-[#F4CE14]/10 transition-all text-left shadow-lg">
                <p className="font-bebas text-5xl text-[#F4CE14] mb-2 uppercase tracking-tight font-bold">4 892</p>
                <p className="font-tech text-xs text-gray-500 tracking-widest uppercase">ZNIČENÝCH AUT</p>
              </div>
            </div>

            <div className="space-y-6">
              <p className="font-tech text-xs text-gray-500 mb-4 tracking-[0.4em] uppercase">YOUTUBE RECAPS</p>
              <div ref={scrollRef} className="flex gap-4 overflow-x-auto pb-6 scrollbar-hide cursor-grab active:cursor-grabbing">
                {thumbnails.map((src, i) => (
                  <div key={i} className="min-w-[240px] aspect-video bg-black border border-white/10 relative group overflow-hidden shadow-xl">
                    <img src={src} className="w-full h-full object-cover opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-12 h-12 bg-[#F4CE14] rounded-full flex items-center justify-center shadow-lg">
                        <Play className="text-black fill-black ml-1" size={20} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="sticky top-40">
            <div className="relative group">
              <div className="absolute -top-8 -left-8 font-tech text-[12px] text-[#F4CE14] flex gap-8 uppercase z-20 font-bold tracking-widest">
                <span className="flex items-center gap-2"><div className="w-2.5 h-2.5 bg-red-600 rounded-full animate-pulse shadow-[0_0_10px_red]"></div> REC</span>
                <span>4K ULTRA HD</span>
                <span>ANGLE_01</span>
              </div>
              <div className="absolute -bottom-8 -right-8 font-tech text-[12px] text-[#F4CE14] uppercase z-20 font-bold tracking-widest">
                <span>BUFFER: 99.4%</span>
                <span className="ml-6">LATENCY: 8ms</span>
              </div>
              <div className="relative border-4 border-white/10 group-hover:border-[#F4CE14]/60 transition-all duration-700 overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
                <img src="https://picsum.photos/seed/derby/900/600" alt="Action" className="w-full grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" />
                <div className="absolute inset-0 bg-black/50 group-hover:bg-transparent transition-colors duration-700"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-28 h-28 bg-[#F4CE14] rounded-full flex items-center justify-center cursor-pointer hover:scale-110 active:scale-95 transition-all shadow-[0_0_50px_rgba(244,206,20,0.6)] border-b-8 border-yellow-700">
                    <Play className="text-black ml-1" fill="currentColor" size={40} />
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.15)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.02),rgba(0,0,255,0.03))] z-10 bg-[length:100%_2px,3px_100%]"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const SponsorsTicker = () => (
  <div className="bg-[#F4CE14] py-8 overflow-hidden whitespace-nowrap border-y-8 border-black shadow-[0_0_60px_rgba(244,206,20,0.3)] z-20 relative">
    <div className="inline-block animate-marquee">
      {[...SPONSORS, ...SPONSORS].map((s, i) => (
        <span key={i} className="font-bebas text-6xl text-black mx-20 font-semibold hover:scale-110 inline-block transition-transform cursor-default select-none tracking-tight uppercase">{s}</span>
      ))}
    </div>
    <style>{`
      @keyframes marquee {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
      .animate-marquee {
        animation: marquee 35s linear infinite;
      }
    `}</style>
  </div>
);

const Program = () => (
  <section id="program" className="py-32 bg-black relative">
    <div className="container mx-auto px-6 max-w-5xl">
      <SectionHeader title="HARMONOGRAM" subtitle="NA ČASU ZÁLEŽÍ. KAŽDÁ SEKUNDA SE POČÍTÁ." />

      <div className="relative space-y-4">
        {PROGRAM.map((item, idx) => (
          <div key={idx} className={`flex flex-col md:flex-row gap-8 p-10 border-2 border-white/5 transition-all duration-500 relative group shadow-2xl ${item.isCurrent ? 'bg-white/10 border-[#F4CE14] yellow-glow z-10 scale-[1.03]' : 'hover:bg-white/[0.03] hover:border-white/20'}`}>
            <div className="md:w-56 text-left">
              <span className={`font-tech text-5xl block mb-2 tracking-tighter ${item.isCurrent ? 'text-[#F4CE14]' : 'text-gray-600'}`}>{item.time}</span>
              {item.isCurrent && (
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-red-600 rounded-full animate-ping"></div>
                  <span className="bg-[#F4CE14] text-black px-3 py-1 text-xs font-bold font-tech uppercase tracking-widest">LIVE NOW</span>
                </div>
              )}
            </div>
            <div className="flex-1 text-left">
              <h3 className={`font-bebas text-5xl mb-4 tracking-tight uppercase font-bold ${item.isCurrent ? 'text-white' : 'text-gray-400 group-hover:text-white transition-colors'}`}>{item.title}</h3>
              <p className="text-gray-500 font-tech text-base leading-relaxed max-w-3xl">{item.description}</p>
            </div>
            {!item.isCurrent && (
              <div className="absolute right-10 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-10 transition-all transform scale-75 group-hover:scale-100">
                <Clock className="w-16 h-16 text-white" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  </section>
);

const EventGrid = () => (
  <section className="py-32 bg-[#111] relative">
    <div className="container mx-auto px-6">
      <SectionHeader title="KALENDÁŘ AKCÍ 2026" subtitle="VYZNAČ SI DATUM V KALENDÁŘI." />
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
        {EVENTS.map(event => (
          <div key={event.id} className="group bg-[#0a0a0a] border-2 border-white/5 hover:border-[#F4CE14] transition-all duration-500 overflow-hidden relative flex flex-col hover:-translate-y-3 text-left shadow-2xl">
            <div className="relative aspect-video overflow-hidden">
              <img src={event.image} alt={event.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" />
              <div className="absolute top-0 left-0 bg-[#F4CE14] text-black font-tech px-5 py-3 text-sm font-bold shadow-2xl border-b-4 border-yellow-700">
                {event.date}
              </div>
              <div className="absolute inset-0 bg-black/50 group-hover:bg-transparent transition-colors duration-500"></div>
            </div>
            <div className="p-10 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-bebas text-4xl mb-6 group-hover:text-[#F4CE14] transition-colors leading-none uppercase tracking-tight font-bold">{event.title}</h3>
                <div className="flex items-center gap-3 text-gray-500 text-sm font-tech tracking-widest uppercase">
                  <MapPin size={18} className="text-[#F4CE14]" />
                  {event.location}
                </div>
              </div>
              <div className="mt-10 pt-6">
                <Button variant="outline" className="w-full">VSTUPENKY</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const DriverRoster = () => {
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);

  return (
    <section id="riders" className="py-32 bg-black overflow-hidden relative">
      <div className="container mx-auto px-6 mb-16">
        <SectionHeader title="STARTOVNÍ ROŠT" subtitle="ELITA ČESKÉHO DEMOLIČNÍHO DERBY." />
      </div>

      <div className="flex gap-14 px-6 animate-scroll-x hover:pause">
        {[...DRIVERS, ...DRIVERS].map((driver, i) => (
          <div
            key={`${driver.id}-${i}`}
            className="min-w-[380px] h-[550px] relative group cursor-pointer border-2 border-white/5 hover:border-[#F4CE14] transition-all duration-700 bg-white/5 text-left shadow-2xl"
            onClick={() => setSelectedDriver(driver)}
          >
            <img src={driver.image} alt={driver.name} className="w-full h-full object-cover grayscale opacity-60 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-1000 scale-100 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>

            <div className="absolute bottom-0 left-0 w-full p-10 transition-transform group-hover:-translate-y-3">
              <p className="font-tech text-xs text-[#F4CE14] mb-3 tracking-[0.5em] uppercase font-bold">{driver.category}</p>
              <h3 className="font-bebas text-5xl mb-8 leading-none uppercase tracking-tight font-bold">{driver.name}</h3>

              <div className="grid grid-cols-3 gap-6 border-t border-white/20 pt-8 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                <div className="text-left">
                  <p className="font-tech text-[10px] text-gray-500 uppercase tracking-widest mb-1">WRECKS</p>
                  <p className="font-tech text-xl text-white font-bold">{driver.stats.wrecks}</p>
                </div>
                <div className="text-left">
                  <p className="font-tech text-[10px] text-gray-600 uppercase tracking-widest mb-1">WINS</p>
                  <p className="font-tech text-xl text-[#F4CE14] font-bold">{driver.stats.wins}</p>
                </div>
                <div className="text-left">
                  <p className="font-tech text-[10px] text-gray-600 uppercase tracking-widest mb-1">XP_RANK</p>
                  <p className="font-tech text-xl text-white font-bold">{driver.stats.experience.split(' ')[0]}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedDriver && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-3xl bg-black/90 animate-fadeIn">
          <div className="bg-[#111] border-2 border-[#F4CE14] border-b-[12px] border-b-yellow-700 max-w-6xl w-full relative grid md:grid-cols-2 shadow-[0_0_120px_rgba(244,206,20,0.4)]">
            <button onClick={() => setSelectedDriver(null)} className="absolute -top-16 right-0 text-white hover:text-[#F4CE14] flex items-center gap-3 font-tech text-sm tracking-[0.4em] uppercase font-bold">CLOSE_SYSTEM [ESC] <X size={28} /></button>
            <div className="h-full relative overflow-hidden bg-black">
              <img src={selectedDriver.image} className="w-full h-full object-cover grayscale transition-all duration-1000 hover:grayscale-0 hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#111]"></div>
            </div>
            <div className="p-16 flex flex-col justify-center text-left">
              <div className="mb-12">
                <span className="font-tech text-[#F4CE14] tracking-[0.6em] text-sm mb-4 block uppercase font-bold">{selectedDriver.category}</span>
                <h2 className="text-8xl font-bebas leading-none mb-6 uppercase tracking-tight font-semibold">{selectedDriver.name}</h2>
                <div className="w-32 h-2 bg-[#F4CE14] shadow-[0_0_20px_#F4CE14]"></div>
              </div>

              <div className="space-y-6 mb-16 font-tech">
                <div className="flex justify-between items-end border-b-2 border-white/5 pb-4 group cursor-default">
                  <span className="text-gray-500 text-sm uppercase tracking-widest font-bold">SPEC_VEHICLE_MODEL</span>
                  <span className="text-2xl group-hover:text-[#F4CE14] transition-colors uppercase font-bold tracking-tight">{selectedDriver.car}</span>
                </div>
                <div className="flex justify-between items-end border-b-2 border-white/5 pb-4 group cursor-default">
                  <span className="text-gray-500 text-sm uppercase tracking-widest font-bold">HISTORIC_DESTRUCTION</span>
                  <span className="text-2xl group-hover:text-[#F4CE14] transition-colors uppercase font-bold tracking-tight">{selectedDriver.stats.wrecks} UNITS</span>
                </div>
                <div className="flex justify-between items-end border-b-2 border-white/5 pb-4 group cursor-default">
                  <span className="text-gray-500 text-sm uppercase tracking-widest font-bold">CHAMPION_TIER_STATUS</span>
                  <span className="text-2xl text-[#F4CE14] group-hover:animate-pulse uppercase font-bold tracking-tight">{selectedDriver.stats.wins} VICTORIES</span>
                </div>
              </div>

              <Button className="w-full">PROHLÉDNOUT TÝM</Button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes scrollX {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll-x {
          animation: scrollX 60s linear infinite;
        }
        .pause:hover { animation-play-state: paused; }
      `}</style>
    </section>
  );
};

const Rules = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const items = [
    { title: 'MOTOR & POHON', desc: 'Maximální objem motoru 2.5L pro atmosférické motory. Žádné úpravy turba nad rámec série. Všechny provozní kapaliny musí být zabezpeeny proti úniku při převrácení vozu. Nádrže musí být vnitřní, certifikované.' },
    { title: 'OCHRANNÝ RÁM', desc: 'Povinný vnitřní rám z ocelových trubek min. 40x2mm. Uchycení v 6 bodech k podlaze a karoserii. Dveře řidiče musí být vyztuženy ocelovým plátem o tloušťce min. 5mm pro ochranu při bočním nárazu.' },
    { title: 'KOLA & PNEU', desc: 'Pouze standardní silniční pneu. Žádné hroty nebo řetězy. Disky musí být originální nebo certifikované pro vysokou zátěž. Je zakázáno používat dofukovací systémy během závodu.' },
    { title: 'BEZPEČNOST', desc: 'Hasicí přístroj v dosahu jezdce (min 2kg), 5-bodové závoní pásy, certifikovaná helma s platnou homologací. Odpojovač baterie musí být přístupný zvenčí i zevnitř a jasně označen.' }
  ];

  return (
    <section id="rules" className="py-32 bg-[#0a0a0a] relative">
      <div className="absolute left-0 top-0 h-full w-px bg-white/5"></div>
      <div className="container mx-auto px-6 max-w-5xl text-left">
        <SectionHeader title="TECHNICKÉ SPECIFIKACE" subtitle="PRAVIDLA JSOU OD TOHO, ABY SE DODRŽOVALA." />
        <div className="space-y-6">
          {items.map((item, idx) => (
            <div key={idx} className={`border-2 border-white/5 transition-all duration-300 shadow-xl ${openIndex === idx ? 'bg-white/5 border-[#F4CE14]/40' : 'bg-black/60 hover:bg-white/[0.04]'}`}>
              <button
                onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
                className="w-full p-10 flex items-center justify-between font-bebas text-4xl tracking-tight group text-left uppercase font-bold"
              >
                <div className="flex items-center gap-8">
                  <span className={`font-tech text-base transition-colors font-bold ${openIndex === idx ? 'text-[#F4CE14]' : 'text-gray-600'}`}>[ 0{idx + 1} ]</span>
                  <span className={`group-hover:text-[#F4CE14] transition-colors ${openIndex === idx ? 'text-white' : 'text-gray-400'}`}>{item.title}</span>
                </div>
                <div className={`transition-all duration-500 p-2 border-2 border-white/10 rounded-full ${openIndex === idx ? 'rotate-90 text-[#F4CE14] border-[#F4CE14]/30 bg-[#F4CE14]/10' : 'text-gray-600 group-hover:text-white'}`}>
                  <ChevronRight size={36} />
                </div>
              </button>
              <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openIndex === idx ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-24 pb-12 text-gray-500 font-tech text-lg leading-relaxed border-t border-white/5 pt-10">
                  {item.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const RegistrationForm = () => {
  const [step, setStep] = useState(1);
  return (
    <section className="py-32 bg-white text-black relative">
      <div className="absolute top-0 left-0 w-full h-3 bg-[#F4CE14] shadow-lg"></div>
      <div className="container mx-auto px-6 max-w-3xl text-left">
        <div className="mb-20 text-center">
          <h2 className="text-7xl md:text-9xl font-bebas mb-6 tracking-tight leading-none uppercase font-semibold">REGISTRACE JEZDCE</h2>

          <div className="relative flex items-center justify-between px-16">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 -z-10 -translate-y-1/2"></div>
            <div className="absolute top-1/2 left-0 h-1 bg-[#F4CE14] transition-all duration-700 -z-10 -translate-y-1/2" style={{ width: `${(step - 1) * 50}%` }}></div>

            {[1, 2, 3].map(i => (
              <div key={i} className={`w-14 h-14 rounded-full flex items-center justify-center font-tech font-semibold text-xl transition-all duration-500 ${step >= i ? 'bg-[#F4CE14] scale-110 shadow-[0_0_30px_rgba(244,206,20,0.6)] border-4 border-white' : 'bg-gray-100 text-gray-400'}`}>
                {step > i ? <CheckCircle size={28} /> : i}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-6 font-tech text-xs text-gray-400 tracking-[0.4em] px-4 uppercase font-bold">
            <span>KONTAKT</span>
            <span>VOZIDLO</span>
            <span>FINÁLE</span>
          </div>
        </div>

        <div className="font-tech text-xl">
          {step === 1 && (
            <div className="space-y-8 animate-fadeIn">
              <div className="grid md:grid-cols-2 gap-8 text-left">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-3 tracking-widest uppercase">KŘESTNÍ JMÉNO</label>
                  <input type="text" className="w-full border-b-4 border-black/10 py-4 outline-none focus:border-[#F4CE14] transition-colors bg-transparent placeholder:text-gray-300 uppercase font-bold text-2xl" placeholder="JAN" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-3 tracking-widest uppercase">PŘÍJMENÍ</label>
                  <input type="text" className="w-full border-b-4 border-black/10 py-4 outline-none focus:border-[#F4CE14] transition-colors bg-transparent placeholder:text-gray-300 uppercase font-bold text-2xl" placeholder="NOVÁK" />
                </div>
              </div>
              <div className="text-left">
                <label className="block text-xs font-bold text-gray-400 uppercase mb-3 tracking-widest uppercase">EMAILOVÁ ADRESA</label>
                <input type="email" className="w-full border-b-4 border-black/10 py-4 outline-none focus:border-[#F4CE14] transition-colors bg-transparent placeholder:text-gray-300 uppercase font-bold text-2xl" placeholder="JAN@VRAKFEST.CZ" />
              </div>
              <Button onClick={() => setStep(2)} className="w-full mt-10">
                POKRAČOVAT NA VOZIDLO
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8 animate-fadeIn text-left">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-3 tracking-widest uppercase">MODEL VOZU & ROK VÝROBY</label>
                <input type="text" className="w-full border-b-4 border-black/10 py-4 outline-none focus:border-[#F4CE14] transition-colors bg-transparent placeholder:text-gray-300 uppercase font-bold text-2xl" placeholder="BMW E36 318I (1996)" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-6 tracking-widest uppercase font-bold">VÝBĚR KATEGORIE</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {['PRO SERIES', 'STREET FIGHT', 'VETERAN CLASH'].map(cat => (
                    <div key={cat} className="border-4 border-gray-100 p-6 cursor-pointer hover:border-[#F4CE14] hover:bg-[#F4CE14]/5 transition-all text-center shadow-md">
                      <p className="text-base font-semibold uppercase tracking-tight">{cat}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-6 mt-10">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1">ZPĚT</Button>
                <Button onClick={() => setStep(3)} className="flex-1">PŘIPRAVIT START</Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="text-center animate-fadeIn py-10">
              <h3 className="text-6xl font-bebas mb-10 tracking-tight uppercase font-semibold">POSLEDNÍ KONTROLA SYSTÉMŮ</h3>
              <p className="text-gray-600 mb-14 max-w-lg mx-auto leading-relaxed text-xl">
                Stisknutím tlačítka START potvrzuješ, že tvůj vrak splňuje technické specifikace.
              </p>

              <div className="flex justify-center">
                <Button variant="engine-start" className="w-64" onClick={() => setStep(4)}>START</Button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="text-center animate-fadeIn py-16">
              <div className="w-32 h-32 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-10 shadow-[0_0_50px_rgba(34,197,94,0.5)] border-4 border-white">
                <CheckCircle size={64} className="text-white" />
              </div>
              <h3 className="text-7xl font-bebas mb-6 uppercase tracking-tight font-semibold">PŘIJATO</h3>
              <p className="text-gray-400 mb-12 font-tech text-lg tracking-[0.3em] uppercase">ID: VRKF-2026-X9482</p>
              <Button onClick={() => setStep(1)} className="mx-auto w-64 uppercase font-semibold">STÁHNOUT</Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

const MarketplaceTeaser = () => (
  <section className="py-32 bg-[#111] text-left">
    <div className="container mx-auto px-6">
      <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-6">
        <SectionHeader title="BAZAR & MARKET" subtitle="VYBAV SVŮJ VRAK TÍM NEJLEPŠÍM." />
        <Button variant="outline">
          MARKETPLACE
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {MARKET_ITEMS.map(item => (
          <div key={item.id} className="bg-black border-2 border-white/5 hover:border-[#F4CE14] transition-all p-3 group shadow-2xl text-left hover:-translate-y-2 duration-500">
            <div className="relative aspect-square bg-[#0a0a0a] border border-white/10 overflow-hidden">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-100 group-hover:scale-110" />
              <div className="absolute top-0 right-0 w-10 h-10 border-t-4 border-r-4 border-[#F4CE14] opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <div className="p-6 bg-[#0a0a0a] mt-3 border border-white/5 shadow-inner">
              <h4 className="font-bebas text-3xl mb-2 group-hover:text-[#F4CE14] transition-colors uppercase tracking-tight font-bold">{item.name}</h4>
              <div className="flex items-center justify-between">
                <p className="font-tech text-2xl text-[#F4CE14] tracking-tighter uppercase font-bold">{item.price}</p>
                <div className="p-3 rounded-full bg-white/5 group-hover:bg-[#F4CE14] group-hover:text-black transition-all">
                  <ShoppingCart size={22} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const MobileApp = () => (
  <section className="py-32 bg-black overflow-hidden relative text-left">
    <div className="absolute inset-0 bg-[linear-gradient(rgba(244,206,20,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(244,206,20,0.03)_1px,transparent_1px)] bg-[length:50px_50px] pointer-events-none"></div>

    <div className="container mx-auto px-6 relative z-10 text-left">
      <div className="grid lg:grid-cols-2 gap-24 items-center">
        <div className="order-2 lg:order-1 flex justify-center relative scale-90 md:scale-100">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-[#F4CE14]/10 blur-[140px] rounded-full animate-pulse"></div>

          <div className="relative w-[340px] h-[680px] bg-black border-[16px] border-[#222] rounded-[60px] shadow-[0_0_100px_rgba(0,0,0,1)] z-10 p-2 overflow-hidden border-b-[24px]">
            <div className="h-full rounded-[44px] overflow-hidden bg-[#0d0d0d] p-8 pt-14 flex flex-col font-tech text-left">
              <div className="flex items-center gap-4 mb-12 border-b-2 border-white/5 pb-8">
                <Shield size={32} className="text-[#F4CE14]" />
                <span className="font-bebas text-4xl tracking-tight uppercase font-bold">VRAK<span className="text-[#F4CE14]">APP</span></span>
              </div>

              <div className="space-y-8 flex-1">
                <div className="h-5 w-40 bg-white/5 rounded"></div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="aspect-square bg-[#F4CE14]/15 border-2 border-[#F4CE14]/30 rounded-3xl flex flex-col items-center justify-center gap-3 group">
                    <Clock size={28} className="text-[#F4CE14]" />
                    <span className="text-[12px] text-[#F4CE14] font-semibold uppercase tracking-widest">TIMING</span>
                  </div>
                  <div className="aspect-square bg-white/5 border-2 border-white/10 rounded-3xl flex flex-col items-center justify-center gap-3">
                    <ShoppingCart size={28} className="text-gray-500" />
                    <span className="text-[12px] text-gray-500 font-semibold uppercase tracking-widest uppercase">BAZAR</span>
                  </div>
                </div>
              </div>

              <div className="mt-auto flex justify-between gap-4 pb-4">
                <div className="h-14 flex-1 bg-white/5 rounded-2xl border-2 border-white/10 flex items-center justify-center"><Users size={24} className="text-gray-400" /></div>
                <div className="h-14 flex-1 bg-[#F4CE14] rounded-2xl flex items-center justify-center shadow-lg"><Play size={24} className="text-black fill-black" /></div>
                <div className="h-14 flex-1 bg-white/5 rounded-2xl border-2 border-white/10 flex items-center justify-center"><Settings size={24} className="text-gray-400" /></div>
              </div>
            </div>
          </div>
        </div>

        <div className="order-1 lg:order-2 text-left">
          <SectionHeader title="VRAKFEST APP" subtitle="VŠE POTŘEBNÉ PŘÍMO V KAPSE." />
          <ul className="space-y-10 mb-20">
            {[
              { icon: <Clock size={32} />, text: 'LIVE TIMING Z KAŽDÉ JÍZDY', desc: 'Sleduj časy všech závodníků v reálném čase se zpožděním pod 1 sekundu.' },
              { icon: <ShoppingCart size={32} />, text: 'EXCLUSIVE MARKETPLACE', desc: 'Přístup k limitovaným nabídkám náhradních dílů přímo od jezdců.' },
              { icon: <Users size={32} />, text: 'HLASOVÁNÍ DIVÁKŮ', desc: 'Rozhoduj o nejlepším vraku dne a vyhrávej ceny od sponzorů.' }
            ].map((item, i) => (
              <li key={i} className="flex gap-8 group">
                <div className="flex-shrink-0 w-20 h-20 bg-white/5 border-2 border-white/10 flex items-center justify-center text-[#F4CE14] group-hover:bg-[#F4CE14] group-hover:text-black transition-all duration-700 group-hover:rotate-6 border-b-8 border-black shadow-2xl">
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-bebas text-4xl tracking-tight group-hover:text-[#F4CE14] transition-colors mb-2 uppercase font-bold">{item.text}</h4>
                  <p className="text-gray-500 font-tech text-base leading-relaxed max-w-md">{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex flex-col sm:flex-row gap-6">
            <button className="flex-1 bg-white/5 hover:bg-white/10 border-2 border-white/10 border-b-8 border-black p-6 flex items-center gap-5 transition-all group shadow-2xl">
              <div className="text-[#F4CE14] group-hover:scale-110 transition-transform"><Shield size={40} /></div>
              <div className="text-left">
                <p className="text-[10px] font-tech text-gray-500 uppercase tracking-widest leading-none mb-1 font-semibold">DOWNLOAD ON THE</p>
                <p className="font-bebas text-3xl leading-none uppercase tracking-tight font-bold">APP STORE</p>
              </div>
            </button>
            <button className="flex-1 bg-white/5 hover:bg-white/10 border-2 border-white/10 border-b-8 border-black p-6 flex items-center gap-5 transition-all group shadow-2xl">
              <div className="text-[#F4CE14] group-hover:scale-110 transition-transform"><Cpu size={40} /></div>
              <div className="text-left">
                <p className="text-[10px] font-tech text-gray-500 uppercase tracking-widest leading-none mb-1 font-semibold">GET IT ON</p>
                <p className="font-bebas text-3xl leading-none uppercase tracking-tight font-bold">GOOGLE PLAY</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-black border-t-8 border-[#F4CE14] pt-32 pb-16 overflow-hidden relative">
    <div className="container mx-auto px-6 grid md:grid-cols-4 gap-20 mb-32 relative z-10 text-left">
      <div className="col-span-2">
        <div className="flex items-center gap-4 mb-10">
          <div className="bg-[#F4CE14] p-2 shadow-[4px_4px_0_black]">
            <Shield className="text-black w-10 h-10" />
          </div>
          <span className="font-bebas text-6xl tracking-tight uppercase font-bold">VRAK<span className="text-[#F4CE14]">FEST</span></span>
        </div>

        <div className="font-tech text-sm bg-[#050505] border-2 border-white/10 p-8 space-y-4 mb-12 max-w-lg shadow-2xl">
          <p className="text-[#F4CE14] flex items-center gap-4"><span className="opacity-40 font-semibold">&gt;</span> SYSTEM_BUILD_ID: <span className="text-white font-bold">VRKF_PROD_2026_V2.1</span></p>
          <p className="text-[#F4CE14] flex items-center gap-4"><span className="opacity-40 font-semibold">&gt;</span> CORE_OPERATIONS: <span className="text-green-500 font-bold uppercase tracking-widest">ACTIVE_READY</span></p>
        </div>

        <p className="text-gray-500 font-tech text-base leading-relaxed max-w-md">
          Největší středoevropský festival destrukce a motorismu.
        </p>
      </div>

      <div>
        <h4 className="font-bebas text-4xl text-white mb-10 uppercase tracking-tight italic font-bold">DATA_NODES</h4>
        <ul className="space-y-6 font-tech text-gray-500 text-base tracking-[0.2em] uppercase font-bold">
          <li><a href="#" className="hover:text-[#F4CE14] transition-all flex items-center gap-3 group"><div className="w-2 h-2 bg-[#F4CE14]"></div> PROGRAM</a></li>
          <li><a href="#" className="hover:text-[#F4CE14] transition-all flex items-center gap-3 group"><div className="w-2 h-2 bg-[#F4CE14]"></div> PRAVIDLA</a></li>
          <li><a href="#" className="hover:text-[#F4CE14] transition-all flex items-center gap-3 group"><div className="w-2 h-2 bg-[#F4CE14]"></div> MARKET</a></li>
        </ul>
      </div>

      <div>
        <h4 className="font-bebas text-4xl text-white mb-10 uppercase tracking-tight italic font-bold">COMMS_LINK</h4>
        <div className="space-y-8 font-tech text-left">
          <div className="group cursor-pointer">
            <p className="text-xs text-gray-600 mb-2 uppercase tracking-[0.4em] font-black">MAIL_RELAY</p>
            <p className="text-2xl text-white group-hover:text-[#F4CE14] transition-colors italic font-black uppercase tracking-tight">INFO@VRAKFEST.CZ</p>
          </div>
          <div className="flex gap-6 pt-6">
            {[Phone, UserPlus, Info].map((Icon, i) => (
              <div key={i} className="w-16 h-16 bg-white/5 border-2 border-white/10 flex items-center justify-center hover:bg-[#F4CE14] hover:text-black transition-all cursor-pointer group shadow-2xl border-b-4 border-black active:translate-y-1">
                <Icon size={28} className="group-hover:scale-110 transition-transform" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

    <div className="container mx-auto px-6 pt-16 border-t border-white/5 text-center font-tech text-xs text-gray-600 tracking-[0.5em] uppercase font-black">
      <p>© 2026 VRAKFEST_SYSTEMS. ALL_SYSTEMS_SECURED.</p>
    </div>

    <div className="absolute -bottom-32 -right-32 text-[30rem] font-bebas italic text-white/[0.015] pointer-events-none select-none leading-none z-0">
      2026
    </div>
  </footer>
);

export default function App() {
  useEffect(() => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        if (href && href !== '#') {
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({
              behavior: 'smooth'
            });
          }
        }
      });
    });
  }, []);

  return (
    <div className="min-h-screen text-white bg-[#111] selection:bg-[#F4CE14] selection:text-black">
      <TechNavBar />
      <main>
        <Hero />
        <About />
        <SponsorsTicker />
        <Program />
        <EventGrid />
        <DriverRoster />
        <Rules />
        <RegistrationForm />
        <MobileApp />
        <MarketplaceTeaser />
      </main>
      <Footer />

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
}