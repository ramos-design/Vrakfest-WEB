import React, { useState, useEffect, useRef } from 'react';
import {
  Menu, X, Play, Clock, Users, Shield,
  MapPin, ShoppingCart, UserPlus, Phone,
  ChevronDown, ChevronRight, CheckCircle, Info,
  Search, ExternalLink, Settings, Cpu, ArrowRight
} from 'lucide-react';
import { DRIVERS, EVENTS, PROGRAM, MARKET_ITEMS, SPONSORS, STANDINGS } from './constants';
import { Driver } from './types';

// --- Components ---

// --- Custom "Skew" Button from previous design ---
const Button = ({
  children,
  variant = 'primary',
  size = 'default',
  className = '',
  onClick
}: {
  children?: React.ReactNode;
  variant?: 'primary' | 'outline' | 'ghost' | 'engine-start';
  size?: 'default' | 'small';
  className?: string;
  onClick?: () => void;
}) => {
  const isOutline = variant === 'outline';
  const isEngine = variant === 'engine-start';

  // Base classes imitating our .btn .skew-btn from styles.css
  const baseClasses = "relative inline-flex items-center justify-center font-tech font-bold uppercase tracking-wider transform -skew-x-[15deg] transition-all duration-300 cursor-pointer border";

  const sizeClasses = size === 'small'
    ? "px-6 py-2 text-base" // Zmenšeno z px-8 py-3 text-lg
    : "px-10 py-4 text-xl";

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
    <button className={`${baseClasses} ${sizeClasses} ${variantClasses} ${className}`} onClick={onClick}>
      <span className="block transform skew-x-[15deg]">
        {children}
      </span>
    </button>
  );
};

const SectionHeader = ({ title, subtitle, align = 'left' }: { title: string, subtitle?: string, align?: 'left' | 'center' | 'right' }) => (
  <div className={`mb-12 ${align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left'}`}>
    <h2 className="text-6xl md:text-8xl font-bebas font-semibold text-[#F4CE14] tracking-tight leading-none mb-2 uppercase">
      {title}
    </h2>
    {subtitle && <p className="font-tech text-gray-400 tracking-widest uppercase text-sm md:text-base">{subtitle}</p>}
    <div className={`w-24 h-1 bg-[#F4CE14] mt-4 relative ${align === 'center' ? 'mx-auto' : align === 'right' ? 'ml-auto' : ''}`}>
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
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b border-white/5 ${scrolled ? 'bg-[#111]/95 py-3 backdrop-blur-md shadow-2xl' : 'bg-transparent py-6'}`}>
      {/* Container with Grid Layout: Left (Logo) | Center (Nav) | Right (CTA) */}
      <div className="w-[95%] mx-auto px-6 grid grid-cols-[1fr_auto_1fr] items-center relative gap-4">

        {/* Left: Navigation */}
        <nav className="hidden lg:flex justify-self-start items-center gap-6">
          {['O VRAKFESTU', 'KALENDÁŘ', 'JEZDCI', 'PRAVIDLA', 'APLIKACE'].map(item => (
            <a key={item} href={`#${item.toLowerCase().replace(' ', '')}`} className="font-bebas text-lg text-white hover:text-[#F4CE14] transition-all uppercase tracking-wide">
              {item}
            </a>
          ))}
        </nav>

        {/* Center: Logo */}
        <div className="justify-self-center flex items-center gap-3 group cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
          <img
            src="/video/LOGO-Y.png"
            alt="VRAKFEST Logo"
            className={`w-auto transition-all duration-300 hover:grayscale-0 hover:scale-105 ${scrolled ? 'h-14' : 'h-20'}`}
          />
        </div>

        {/* Right: Buttons */}
        <div className="justify-self-end flex items-center gap-4">
          <Button variant="outline" size="small" className="hidden sm:inline-flex">PŘIHLÁŠENÍ</Button>
          <Button variant="primary" size="small" className="inline-flex group relative overflow-hidden">
            <span className="block transition-transform duration-300 group-hover:-translate-y-[150%]">KOUPIT VSTUPENKU</span>
            <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 translate-y-[150%] group-hover:translate-y-0">JIŽ BRZY</span>
          </Button>

          {/* Mobile Toggle */}
          <div className="lg:hidden text-white cursor-pointer ml-4">
            <Menu size={32} />
          </div>
        </div>

      </div>
    </header>
  );
};

const Hero = () => {
  const targetDate = new Date('2026-04-04');
  const daysToStart = Math.ceil((targetDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 bg-black/50 z-10"></div>
      <video
        autoPlay loop muted playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/video/BRANKY%20VF-web.mp4" type="video/mp4" />
      </video>

      <div className="container mx-auto px-6 relative z-20 text-center flex flex-col items-center">
        <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-[9rem] font-bebas font-semibold leading-[0.9] mb-6 md:mb-10 animate-fadeIn uppercase tracking-tight flex flex-col items-center gap-2 md:gap-4 lg:gap-6 text-center">
          <span className="text-white">ZÁVODY VRAKŮ</span>
          <span className="text-[#F4CE14] drop-shadow-[0_0_40px_rgba(244,206,20,0.6)]">A DEMOLIČNÍ DERBY</span>
        </h1>

        <div className="w-full max-w-6xl mb-8">
          <div className="flex flex-col md:flex-row bg-gradient-to-r from-transparent via-black/60 to-transparent backdrop-blur-md border-y border-white/10 divide-y md:divide-y-0 md:divide-x divide-[#F4CE14]/30">
            {/* Stat Card 1 - Upcoming Event */}
            <div className="flex-auto px-4 md:px-8 py-4 md:py-6 flex flex-col items-center group relative hover:bg-white/5 transition-colors duration-300">
              <p className="font-tech text-gray-500 uppercase tracking-widest font-bold mb-2 md:mb-4 text-[10px] md:text-xs group-hover:text-[#F4CE14] transition-colors whitespace-nowrap">
                NADCHÁZEJÍCÍ UDÁLOST
              </p>

              <p className="font-bebas text-3xl md:text-4xl lg:text-6xl text-white group-hover:text-[#F4CE14] transition-colors font-semibold tracking-wider leading-none mb-2 text-center uppercase whitespace-nowrap">
                {EVENTS[0].title}
              </p>
              <p className="font-tech text-[10px] text-gray-500 tracking-[0.2em] uppercase font-bold group-hover:text-white transition-colors text-center whitespace-nowrap">
                {EVENTS[0].date} // {EVENTS[0].location}
              </p>
            </div>

            {/* Stat Card New - Days to Start */}
            <div className="flex-auto px-4 md:px-8 py-4 md:py-6 flex flex-col items-center group relative hover:bg-white/5 transition-colors duration-300">
              <p className="font-tech text-gray-500 uppercase tracking-widest font-bold mb-2 md:mb-4 text-[10px] md:text-xs group-hover:text-[#F4CE14] transition-colors whitespace-nowrap">
                POČET DNÍ
              </p>

              <p className="font-bebas text-4xl md:text-5xl lg:text-6xl text-white group-hover:text-[#F4CE14] transition-colors font-semibold tracking-wider leading-none mb-2 whitespace-nowrap">
                {Math.max(0, daysToStart)}
              </p>
              <p className="font-tech text-[10px] text-gray-500 tracking-[0.2em] uppercase font-bold group-hover:text-white transition-colors text-center whitespace-nowrap">DO STARTU</p>
            </div>

            {/* Stat Card 2 - Registered Racers */}
            <div className="flex-auto px-4 md:px-8 py-4 md:py-6 flex flex-col items-center group relative hover:bg-white/5 transition-colors duration-300">
              <p className="font-tech text-gray-500 uppercase tracking-widest font-bold mb-2 md:mb-4 text-[10px] md:text-xs group-hover:text-[#F4CE14] transition-colors whitespace-nowrap">
                PŘIHLÁŠENÝCH
              </p>

              <p className="font-bebas text-4xl md:text-5xl lg:text-6xl text-white group-hover:text-[#F4CE14] transition-colors font-semibold tracking-wider leading-none mb-2 whitespace-nowrap">
                87<span className="text-white/30 text-3xl md:text-5xl ml-2">/ 90</span>
              </p>
              <p className="font-tech text-[10px] text-gray-500 tracking-[0.2em] uppercase font-bold group-hover:text-white transition-colors text-center whitespace-nowrap">JEZDCŮ</p>
            </div>

            {/* Stat Card 3 - Deadline */}
            <div className="flex-auto px-4 md:px-8 py-4 md:py-6 flex flex-col items-center group relative hover:bg-white/5 transition-colors duration-300">
              <p className="font-tech text-gray-500 uppercase tracking-widest font-bold mb-2 md:mb-4 text-[10px] md:text-xs group-hover:text-[#F4CE14] transition-colors whitespace-nowrap">
                UZÁVĚRKA
              </p>

              <p className="font-bebas text-4xl md:text-5xl lg:text-6xl text-white group-hover:text-[#F4CE14] transition-colors font-semibold tracking-wider leading-none mb-2 whitespace-nowrap">
                30.3.
              </p>
              <p className="font-tech text-[10px] text-gray-500 tracking-[0.2em] uppercase font-bold group-hover:text-white transition-colors text-center whitespace-nowrap">PŘIHLÁŠEK</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6 w-full mt-6 scale-90 2xl:scale-100 origin-top">
          <Button className="w-full sm:w-auto">CHCI ZÁVODIT</Button>
          <Button variant="outline" className="w-full sm:w-auto">KOMPLETNÍ INFO</Button>
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
};

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
    <section id="ovrakfestu" className="py-32 bg-[#0a0a0a] relative overflow-hidden">
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

            <div className="flex flex-col sm:flex-row gap-6 mt-12">
              <Button className="bg-[#F4CE14] text-black hover:bg-white border-0 text-lg px-8 py-4 h-auto uppercase font-bold font-tech tracking-wider group relative overflow-hidden flex-1 sm:flex-none justify-center">
                <span className="block transition-transform duration-300 group-hover:-translate-y-[150%]">Koupit vstupenku</span>
                <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 translate-y-[150%] group-hover:translate-y-0 text-black">JIŽ BRZY</span>
              </Button>
              <Button variant="outline" className="text-lg px-8 py-4 h-auto uppercase font-tech tracking-wider border-white/20 hover:bg-white hover:text-black flex-1 sm:flex-none justify-center">
                Chci závodit
              </Button>
            </div>
          </div>

          <div className="sticky top-40 space-y-12">
            <div className="relative group">
              <div className="relative border-4 border-white/10 group-hover:border-[#F4CE14]/60 transition-all duration-700 overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
                <img src="https://picsum.photos/seed/derby/900/600" alt="Action" className="w-full grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" />
                <div className="absolute inset-0 bg-black/50 group-hover:bg-transparent transition-colors duration-700"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-28 h-28 bg-[#F4CE14] rounded-full flex items-center justify-center cursor-pointer hover:scale-110 active:scale-95 transition-all shadow-[0_0_50px_rgba(244,206,20,0.6)] border-b-8 border-yellow-700">
                    <Play className="text-black ml-1" fill="currentColor" size={40} />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6 pt-4">
              <p className="font-tech text-xs text-gray-500 mb-4 tracking-[0.4em] uppercase">YOUTUBE RECAPS</p>
              <div ref={scrollRef} className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar cursor-grab active:cursor-grabbing items-center">
                {thumbnails.map((src, i) => (
                  <div key={i} className="min-w-[200px] aspect-video bg-black border border-white/10 relative group overflow-hidden shadow-xl flex-shrink-0">
                    <img src={src} className="w-full h-full object-cover opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-10 h-10 bg-[#F4CE14] rounded-full flex items-center justify-center shadow-lg">
                        <Play className="text-black fill-black ml-1" size={16} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const GalleryGrid = () => (
  <section className="pb-32 bg-[#0a0a0a] relative">
    <div className="container mx-auto px-6">
      <div className="grid md:grid-cols-3 gap-8">
        {/* Box 1 */}
        <div className="flex flex-col gap-6 group">
          <div className="aspect-[4/3] overflow-hidden border-2 border-white/5 group-hover:border-[#F4CE14] transition-all duration-500 relative shadow-2xl">
            <img src="https://picsum.photos/seed/family/600/400" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" alt="Rodina" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
          </div>
          <div className="text-left">
            <h3 className="font-bebas text-5xl text-white uppercase leading-tight tracking-tight group-hover:text-[#F4CE14] transition-colors font-bold mb-4">Den plný adrenalinu pro celou rodinu!</h3>
            <p className="font-tech text-gray-500 text-lg leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
            </p>
          </div>
        </div>

        {/* Box 2 */}
        <div className="flex flex-col gap-6 group">
          <div className="aspect-[4/3] overflow-hidden border-2 border-white/5 group-hover:border-[#F4CE14] transition-all duration-500 relative shadow-2xl">
            <img src="https://picsum.photos/seed/race/600/400" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" alt="Závod" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
          </div>
          <div className="text-left">
            <h3 className="font-bebas text-5xl text-white uppercase leading-tight tracking-tight group-hover:text-[#F4CE14] transition-colors font-bold mb-4">Přijď si zazávodit, zabourat a vyhrát 10000 Kč! a víc!</h3>
            <p className="font-tech text-gray-500 text-lg leading-relaxed">
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.
            </p>
          </div>
        </div>

        {/* Box 3 */}
        <div className="flex flex-col gap-6 group">
          <div className="aspect-[4/3] overflow-hidden border-2 border-white/5 group-hover:border-[#F4CE14] transition-all duration-500 relative shadow-2xl">
            <img src="https://picsum.photos/seed/fun/600/400" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" alt="Zábava" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
          </div>
          <div className="text-left">
            <h3 className="font-bebas text-5xl text-white uppercase leading-tight tracking-tight group-hover:text-[#F4CE14] transition-colors font-bold mb-4">Užijte si srandu se starými vraky.</h3>
            <p className="font-tech text-gray-500 text-lg leading-relaxed">
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const SponsorsTicker = () => {
  const [selectedSponsor, setSelectedSponsor] = useState<typeof SPONSORS[0] | null>(null);
  const [displayedSponsor, setDisplayedSponsor] = useState<typeof SPONSORS[0] | null>(null);

  useEffect(() => {
    if (selectedSponsor) {
      setDisplayedSponsor(selectedSponsor);
    }
  }, [selectedSponsor]);

  return (
    <section className="py-24 bg-black relative overflow-hidden">
      <div className="container mx-auto px-6 mb-16 text-center">
        <h2 className="text-6xl md:text-8xl font-bebas font-semibold text-white tracking-tight leading-none uppercase mb-2">
          PARTNEŘI AKCE
        </h2>
        <div className="w-24 h-1 bg-[#F4CE14] mx-auto mt-4 relative">
          <div className="absolute top-0 right-0 w-4 h-full bg-white animate-pulse"></div>
        </div>
      </div>

      <div className="bg-[#F4CE14] py-8 overflow-hidden whitespace-nowrap shadow-[0_0_60px_rgba(244,206,20,0.3)] z-20 relative transform -skew-y-2 mb-8 group">
        <div className={`inline-block animate-marquee ${selectedSponsor ? 'pause-animation' : ''}`}>
          {[...SPONSORS, ...SPONSORS].map((s, i) => (
            <span
              key={i}
              onClick={() => setSelectedSponsor(s)}
              className="font-bebas text-6xl text-black mx-20 font-semibold hover:scale-110 inline-block transition-transform cursor-pointer select-none tracking-tight uppercase hover:text-white"
            >
              {s.name}
            </span>
          ))}
        </div>
      </div>

      {/* Sponsor Details Expansion */}
      <div className={`transition-[max-height] duration-700 ease-in-out overflow-hidden ${selectedSponsor ? 'max-h-[800px]' : 'max-h-0'}`}>
        <div className={`transition-opacity duration-300 ease-out ${selectedSponsor ? 'opacity-100' : 'opacity-0'}`}>
          <div className="container mx-auto px-6 pt-12">
            <div className="bg-[#111] border border-white/10 p-8 md:p-12 grid md:grid-cols-2 gap-12 items-center relative shadow-2xl">
              <button
                onClick={() => setSelectedSponsor(null)}
                className="absolute top-0 right-0 bg-[#F4CE14] text-black w-12 h-12 flex items-center justify-center hover:bg-red-600 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>

              <div className="text-left space-y-6">
                <h3 className="font-bebas text-5xl md:text-7xl text-[#F4CE14] uppercase leading-none tracking-tight">
                  {displayedSponsor?.name}
                </h3>
                <div className="w-16 h-1 bg-white/20"></div>
                <p className="font-tech text-xl text-gray-300 leading-relaxed max-w-lg">
                  {displayedSponsor?.description}
                </p>
                <div className="pt-4">
                  <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black hover:border-white">
                    NAVŠTÍVIT WEBOVÉ STRÁNKY
                  </Button>
                </div>
              </div>

              <div className="relative group">
                <div className="relative border-2 border-white/10 overflow-hidden shadow-2xl">
                  {displayedSponsor && <img src={displayedSponsor.image} alt={displayedSponsor.name} className="w-full h-[300px] object-cover" />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 35s linear infinite;
        }
        .pause-animation:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

const Program = () => (
  <section id="program" className="py-32 bg-black relative">
    <div className="container mx-auto px-6">
      <SectionHeader title="PROGRAM" subtitle="ČASOVÝ HARMONOGRAM AKCE" />

      <div className="grid lg:grid-cols-2 gap-16 items-start">
        {/* Left Column: Fees & Info */}
        <div className="text-left space-y-12 animate-fadeIn">

          {/* Vstupné */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              <h3 className="font-bebas text-6xl text-white uppercase tracking-tight font-bold leading-none">VSTUPNÉ</h3>
            </div>

            <div className="bg-white/5 border border-white/10 p-8 relative hover:border-[#F4CE14]/30 transition-colors shadow-2xl">
              <div className="flex flex-col gap-6">
                <div className="border-b border-white/10 pb-6">
                  <span className="block font-tech text-gray-400 text-sm uppercase tracking-widest mb-1 font-bold">JEDNODENNÍ VSTUP</span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-bebas text-6xl text-[#F4CE14] font-bold">200 <span className="text-3xl">KČ</span></span>
                    <span className="font-tech text-white text-xl uppercase font-bold ml-2">DOSPĚLÍ</span>
                  </div>
                </div>

                <div>
                  <span className="block font-tech text-gray-400 text-sm uppercase tracking-widest mb-2 font-bold">DĚTI (6 - 15 LET)</span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-bebas text-4xl text-white font-bold">100 <span className="text-2xl">KČ</span></span>
                  </div>
                  <p className="font-tech text-[#F4CE14] text-xs uppercase tracking-widest font-bold mt-4 border-l-2 border-[#F4CE14] pl-3">
                    Děti do 6 let mají vstup zdarma
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Startovné */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              <h3 className="font-bebas text-6xl text-white uppercase tracking-tight font-bold leading-none">STARTOVNÉ</h3>
            </div>

            <div className="bg-white/5 border border-white/10 p-8 hover:border-[#F4CE14]/30 transition-colors shadow-2xl">
              <span className="block font-tech text-gray-400 text-sm uppercase tracking-widest mb-1 font-bold">REGISTRAČNÍ POPLATEK</span>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="font-bebas text-6xl text-[#F4CE14] font-bold">2000 <span className="text-3xl">KČ</span></span>
                <span className="font-tech text-white text-xl uppercase font-bold ml-2">ZA ZÁVODNÍKA</span>
              </div>
              <p className="font-tech text-gray-400 text-sm italic border-t border-white/10 pt-4">
                Platba možná <span className="text-white font-bold not-italic decoration-[#F4CE14] underline decoration-2 underline-offset-4">pouze předem na účet</span>.
              </p>
            </div>
          </div>

          {/* Upozornění */}
          <div className="border-l-4 border-[#F4CE14] bg-[#F4CE14]/5 p-6 font-tech text-gray-400 text-sm leading-relaxed">
            <div className="flex items-center gap-3 mb-3 text-[#F4CE14] font-bold uppercase tracking-widest">
              <Info size={18} />
              <span>Důležité upozornění</span>
            </div>
            <p className="mb-2">Pořadatel si vyhrazuje právo na změnu programu.</p>
            <p>V den závodu se můžou časy posunout. <span className="text-white font-bold">Děkujeme za pochopení.</span></p>
          </div>

        </div>

        {/* Right Column: Harmonogram (Original Timeline Reverted) */}
        <div className="relative space-y-4">
          <div className="flex items-center gap-4 mb-6">
            <h3 className="font-bebas text-6xl text-white uppercase tracking-tight font-bold leading-none">HARMONOGRAM</h3>
          </div>
          {PROGRAM.map((item, idx) => (
            <div key={idx} className={`flex flex-col md:flex-row gap-6 p-8 border-2 border-white/5 transition-all duration-500 relative group shadow-2xl ${item.isCurrent ? 'bg-white/10 border-[#F4CE14] yellow-glow z-10 scale-[1.03]' : 'hover:bg-white/[0.03] hover:border-white/20'}`}>
              <div className="md:w-32 text-left shrink-0">
                <span className={`font-tech text-3xl block mb-2 tracking-tighter font-bold ${item.isCurrent ? 'text-[#F4CE14]' : 'text-gray-600'}`}>{item.time}</span>
                {item.isCurrent && (
                  <span className="bg-[#F4CE14] text-black px-2 py-0.5 text-[10px] font-bold font-tech uppercase tracking-widest inline-block">LIVE</span>
                )}
              </div>
              <div className="flex-1 text-left">
                <h3 className={`font-bebas text-3xl mb-2 tracking-tight uppercase font-bold ${item.isCurrent ? 'text-white' : 'text-gray-400 group-hover:text-white transition-colors'}`}>{item.title}</h3>
                <p className="text-gray-500 font-tech text-sm leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const EventGrid = () => {
  const [activeId, setActiveId] = useState('1');

  return (
    <section className="py-32 bg-[#111] relative">
      <div className="container mx-auto px-6">
        <div className="mb-20 text-center">
          <h2 className="text-6xl md:text-8xl font-bebas font-semibold text-[#F4CE14] tracking-tight leading-none mb-2 uppercase">
            KALENDÁŘ AKCÍ 2026
          </h2>
          <p className="font-tech text-gray-400 tracking-widest uppercase text-sm md:text-base">VYZNAČ SI DATUM V KALENDÁŘI.</p>
          <div className="w-24 h-1 bg-[#F4CE14] mt-4 relative mx-auto">
            <div className="absolute top-0 right-0 w-4 h-full bg-white animate-pulse"></div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 h-[600px] items-stretch">
          {EVENTS.map((event) => {
            const isActive = activeId === event.id;
            return (
              <div
                key={event.id}
                onClick={() => setActiveId(event.id)}
                className={`
                  relative overflow-hidden cursor-pointer transition-all duration-500 ease-in-out will-change-[flex]
                  ${isActive ? 'lg:flex-[4] flex-[4]' : 'lg:flex-[0.5] flex-[1]'}
                  border-2 ${isActive ? 'border-[#F4CE14]' : 'border-white/5 hover:border-white/20'}
                  bg-black group
                  mx-2
                `}
              >
                {/* Un-skew content container */}
                <div className="w-full h-full relative">

                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <img
                      src={event.image}
                      alt={event.title}
                      loading="lazy"
                      className={`w-full h-full object-cover transition-transform duration-700 ease-out ${isActive ? 'scale-100 grayscale-0' : 'scale-110 grayscale opacity-40 group-hover:opacity-60'}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90"></div>
                  </div>

                  {/* Vertical Text (Invariant) */}
                  <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isActive ? 'opacity-0' : 'opacity-100 delay-500'}`}>
                    <h3 className="font-bebas text-3xl text-gray-400 tracking-widest uppercase lg:-rotate-90 whitespace-nowrap group-hover:text-white transition-colors">
                      {event.title}
                    </h3>
                  </div>

                  {/* Date Badge - Visible only on active slide */}
                  <div className={`absolute top-0 left-0 z-10 transition-opacity duration-500 ${isActive ? 'opacity-100 delay-[400ms]' : 'opacity-0'}`}>
                    <div className="bg-[#F4CE14] text-black px-6 py-3 font-bebas text-2xl font-bold shadow-lg">
                      {event.date}
                    </div>
                  </div>

                  {/* Active Content */}
                  <div className={`
                  absolute inset-0 p-10 md:p-14 flex flex-col justify-end 
                  transition-opacity duration-500 linear
                  ${isActive ? 'opacity-100 delay-[400ms]' : 'opacity-0 delay-0 pointer-events-none'}
                `}>
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-bebas text-5xl md:text-7xl text-white uppercase leading-none mb-4">{event.title}</h3>
                        <div className="flex items-center gap-3 text-gray-400 font-tech text-lg uppercase mb-8">
                          <MapPin size={20} className="text-[#F4CE14]" />
                          {event.location}
                        </div>
                      </div>
                    </div>

                    {event.id === '1' ? (
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Button className="bg-transparent border border-white text-white hover:bg-white hover:text-black px-5 py-3 h-auto uppercase font-tech tracking-wider text-[18px]">
                          Více o akci
                        </Button>
                        <Button className="bg-[#F4CE14] text-black hover:bg-white border-0 px-5 py-3 h-auto uppercase font-bold font-tech tracking-wider text-[18px] group relative overflow-hidden">
                          <span className="block transition-transform duration-300 group-hover:-translate-y-[150%]">Koupit vstupenku</span>
                          <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 translate-y-[150%] group-hover:translate-y-0 text-black">JIŽ BRZY</span>
                        </Button>
                      </div>
                    ) : (
                      <div className="border-t border-white/10 pt-6">
                        <p className="font-tech text-gray-400 italic">Více informací o této akci již brzy...</p>
                      </div>
                    )}
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const DriverRoster = () => {
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);

  return (
    <section id="riders" className="py-32 bg-black overflow-hidden relative">
      <div className="container mx-auto px-6 mb-16">
        <div className="flex items-start justify-between gap-8">
          <SectionHeader title="STARTOVNÍ ROŠT" subtitle="ELITA ČESKÉHO DEMOLIČNÍHO DERBY." />

          {/* Dynamic Driver Count Badge - Matches Hero Section Style */}
          <div className="relative bg-black/40 backdrop-blur-md border border-white/10 px-10 py-8 flex flex-col items-center group overflow-hidden hover:-translate-y-2 transition-transform duration-300">
            <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-[#F4CE14] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute bottom-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-[#F4CE14] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <p className="font-tech text-gray-500 uppercase tracking-widest font-bold mb-4 text-sm group-hover:text-[#F4CE14] transition-colors whitespace-nowrap">
              PŘIHLÁŠENÝCH
            </p>
            <p className="font-bebas text-7xl text-white group-hover:text-[#F4CE14] transition-colors font-semibold tracking-wider leading-none mb-2 whitespace-nowrap">
              87<span className="text-white/30 text-6xl ml-2">/ 90</span>
            </p>
            <p className="font-tech text-xs text-gray-500 tracking-[0.2em] uppercase font-bold group-hover:text-white transition-colors text-center whitespace-nowrap">JEZDCŮ</p>
          </div>
        </div>
      </div>

      <div className="flex gap-6 px-6 animate-scroll-x hover:pause">
        {[...DRIVERS, ...DRIVERS, ...DRIVERS].map((driver, i) => {
          // Parse Name and Nickname (e.g. PETR "DEMOLIČ" NOVÁK)
          let nickname = driver.category;
          let displayName = driver.name;

          const parts = driver.name.split('"');
          if (parts.length >= 3) {
            nickname = parts[1]; // The part inside quotes
            displayName = (parts[0] + parts[2]).replace(/\s+/g, ' ').trim(); // Remove extra spaces
          }

          const shortCarName = driver.car.split(' ').slice(0, 2).join(' ');

          return (
            <div
              key={`${driver.id}-${i}`}
              className="min-w-[280px] w-[280px] aspect-[4/5] relative group cursor-pointer bg-[#111] border border-white/10 hover:border-[#F4CE14] transition-all duration-300 overflow-hidden flex flex-col shadow-2xl"
              onClick={() => setSelectedDriver(driver)}
            >
              {/* Card Image Area */}
              <div className="flex-1 relative overflow-hidden">
                <img
                  src={driver.image}
                  alt={driver.name}
                  className="w-full h-full object-cover grayscale opacity-80 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent opacity-90"></div>

                {/* Overlay Name */}
                <div className="absolute bottom-4 left-4 right-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <p className="font-tech text-[#F4CE14] text-sm tracking-widest uppercase font-bold mb-2 drop-shadow-md">"{nickname}"</p>
                  <h3 className="font-bebas text-4xl text-white leading-none uppercase tracking-tight font-bold">{displayName}</h3>
                </div>
              </div>

              {/* Stats Bar */}
              <div className="p-4 grid grid-cols-3 gap-2 border-t border-white/10 bg-[#0a0a0a] group-hover:bg-[#F4CE14] transition-colors duration-300 group-hover:text-black">
                <div className="text-center border-r border-white/10 group-hover:border-black/10">
                  <p className="font-tech text-[9px] text-gray-500 group-hover:text-black/60 uppercase tracking-wider font-bold">ZÁVODŮ</p>
                  <p className="font-bebas text-xl text-white group-hover:text-black font-bold">{driver.stats.races}</p>
                </div>
                <div className="text-center border-r border-white/10 group-hover:border-black/10">
                  <p className="font-tech text-[9px] text-gray-500 group-hover:text-black/60 uppercase tracking-wider font-bold">VÝHRY</p>
                  <p className="font-bebas text-xl text-[#F4CE14] group-hover:text-black font-bold">{driver.stats.wins}</p>
                </div>
                <div className="text-center">
                  <p className="font-tech text-[9px] text-gray-500 group-hover:text-black/60 uppercase tracking-wider font-bold">BODY</p>
                  <p className="font-bebas text-xl text-white group-hover:text-black font-bold">{driver.stats.points}</p>
                </div>
              </div>

              {/* Car Model Strip (Slide Down) */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-[#F4CE14] text-black px-3 py-1 font-tech font-bold uppercase text-xs tracking-wider shadow-lg z-10 whitespace-nowrap">
                {shortCarName}
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="container mx-auto px-6 mt-16 flex justify-center gap-6">
        <Button className="bg-[#F4CE14] text-black hover:bg-white border-0 px-8 py-4 h-auto uppercase font-bebas tracking-wider text-lg transition-all duration-300">
          Zobrazit všechny jezdce
        </Button>
        <Button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 h-auto uppercase font-bebas tracking-wider text-lg transition-all duration-300">
          Chci taky závodit
        </Button>
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

const Standings = () => {
  const [activeCategory, setActiveCategory] = useState<'do1.6L' | 'nad1.6L' | 'zeny'>('do1.6L');

  const categoryLabels = {
    'do1.6L': 'DO 1.6 L',
    'nad1.6L': 'NAD 1.6 L',
    'zeny': 'ŽENY'
  };

  // Filter and sort drivers by category and points (highest first)
  const filteredDrivers = STANDINGS
    .filter(driver => driver.category === activeCategory)
    .sort((a, b) => b.points - a.points);

  return (
    <section id="standings" className="py-32 bg-[#0a0a0a] relative">
      <div className="absolute left-0 top-0 h-full w-px bg-white/5"></div>
      <div className="container mx-auto px-6">
        <div className="mb-20 text-center">
          <h2 className="text-6xl md:text-8xl font-bebas font-semibold text-[#F4CE14] tracking-tight leading-none mb-2 uppercase">
            BODOVÉ POŘADÍ
          </h2>
          <p className="font-tech text-gray-400 tracking-widest uppercase text-sm md:text-base">AKTUÁLNÍ STAV SEZÓNY 2026</p>
          <div className="w-24 h-1 bg-[#F4CE14] mt-4 relative mx-auto">
            <div className="absolute top-0 right-0 w-4 h-full bg-white animate-pulse"></div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center gap-4 mb-16">
          {(Object.keys(categoryLabels) as Array<keyof typeof categoryLabels>).map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-8 py-4 font-bebas text-2xl uppercase tracking-wider transition-all duration-300 border-2 ${activeCategory === category
                ? 'bg-[#F4CE14] text-black border-[#F4CE14]'
                : 'bg-transparent text-gray-400 border-white/10 hover:border-[#F4CE14]/50 hover:text-white'
                }`}
            >
              {categoryLabels[category]}
            </button>
          ))}
        </div>


        {/* Standings Table */}
        <div className="max-w-7xl mx-auto">
          {/* Table Header */}
          <div className="grid grid-cols-[120px_2fr_2fr_140px] gap-12 px-8 py-4 bg-black/60 border-b-2 border-[#F4CE14] mb-2">
            <div className="font-tech text-xs text-[#F4CE14] uppercase tracking-[0.3em] font-bold">ST. ČÍSLO</div>
            <div className="font-tech text-xs text-[#F4CE14] uppercase tracking-[0.3em] font-bold">JMÉNO JEZDCE</div>
            <div className="font-tech text-xs text-[#F4CE14] uppercase tracking-[0.3em] font-bold">AUTO</div>
            <div className="font-tech text-xs text-[#F4CE14] uppercase tracking-[0.3em] font-bold text-right">BODY</div>
          </div>

          {/* Scrollable Table Rows - Max 10 visible */}
          <div className="space-y-2 max-h-[700px] overflow-y-auto pr-2 custom-scrollbar">
            {filteredDrivers.map((driver, index) => (
              <div
                key={driver.startNumber}
                className={`grid grid-cols-[120px_2fr_2fr_140px] gap-12 px-8 py-6 transition-all duration-300 border-2 ${index === 0
                  ? 'bg-[#F4CE14]/10 border-[#F4CE14] shadow-[0_0_20px_rgba(244,206,20,0.2)]'
                  : index === 1
                    ? 'bg-white/5 border-white/20'
                    : index === 2
                      ? 'bg-white/[0.03] border-white/15'
                      : 'bg-black/40 border-white/5 hover:bg-white/[0.02] hover:border-white/10'
                  }`}
              >
                {/* Start Number */}
                <div className="flex items-center">
                  <span className={`font-bebas text-3xl ${index === 0 ? 'text-[#F4CE14]' : 'text-white'}`}>
                    #{driver.startNumber}
                  </span>
                </div>

                {/* Driver Name */}
                <div className="flex items-center">
                  <span className={`font-bebas text-2xl uppercase tracking-tight ${index === 0 ? 'text-white' : 'text-gray-300'}`}>
                    {driver.name}
                  </span>
                </div>

                {/* Car */}
                <div className="flex items-center">
                  <span className="font-tech text-sm text-gray-400 uppercase tracking-wider">
                    {driver.car}
                  </span>
                </div>

                {/* Points */}
                <div className="flex items-center justify-end">
                  <span className={`font-bebas text-4xl text-right w-full ${index === 0 ? 'text-[#F4CE14]' : 'text-white'}`}>
                    {driver.points}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const RulesAndSpecs = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const [activeItem, setActiveItem] = useState(0);

  const rulesData = [
    {
      category: "PRAVIDLA ZÁVODU",
      items: [
        {
          title: "ÚČAST V ZÁVODU",
          content: [
            "Každý se účastní závodu na vlastní nebezpečí.",
            "Závodník musí být starší 18-ti let.",
            "Každý startující musí zaplatit startovné 2000,- PŘEDEM NA ÚČET (viz vstup).",
            "Ve startovném je zahrnut volný vstup pro závodníka a jednoho mechanika, pronajatý prostor pro závodní vůz, stan, karavan nebo obyčné vozidlo."
          ],
          image: "https://picsum.photos/seed/participation/700/500"
        },
        {
          title: "ZÁVODNÍ KATEGORIE",
          content: [
            "Do 1600ccm",
            "Nad 1600ccm"
          ],
          image: "https://picsum.photos/seed/categories/700/500"
        },
        {
          title: "CÍL ZÁVODU",
          content: [
            "Cílem závodu je nasbírat co nejvíce bodů za umístění v jednotlivých rozjížďkách: 6-8 a více vraků v rozjížďce, 4 rozjížďky (cca 5 kol).",
            "Během těchto 4 rozjížděk musí závodník nasbírat co nejvíce body aby postupil do semifinále. po 4 závodech se body sčítají a postupuje polovina nejlepších. Závodníci se shodným počtem bodů se porovnají v čí více jízděch (dle účastníků) o postup do semifinále.",
            "SEMIFINÁLE: Postupuje polovina jezdců s každé kategorie s největším počtem bodů.",
            "FINÁLE: Vítězí první 3 s každé kategorie.",
            "Bodování: 1. Místo (3 body), 2. Místo (2 body), 3. Místo (1 bod)",
            "Po ukončení závodu kategorie RACE se zbylé pojízdné vraky mohou zúčastnit DEMOLITION DERBY, kde vítězí poslední pojízdný vrak a může si tak vybojit výhru 10000kč.",
            "Auta budou rozděleny do jednotlivých rozjížděk. Do finálové jízdy postupují vraky s největším počtem bodů.",
            "V případě, že jezdec nebude schopný pokračovat v rozjížďce, ale bude mít pojízdné auto, nastoupí do buňáku po skončení této rozjížďky.",
            "Auta, která se podaří opravit, budou bojovat v bárži o další účast v závodě.",
            "Po rozjížďkách bude následovat přestávka na opravení aut.",
            "Nařazení do dveří řidiče je přísně zakázáno. Dále je zakázáno úmyslné bourání do stojícího vozu v trati. Pokud toto závodník poruší, bude disqualifikován.",
            "Závodník nesmí opouštět auto během závodu pořadí.",
            "Pořadatel může kdykoli závod přerušit nebo pozastavit (červená vlajka).",
            "Pokud nebude závodník 'aktivní', bude se opakovně vyřadit střetem, bude disqualifikován.",
            "Při závodě nesmí být ohrožen žádný divák!",
            "První tři závodníci kategorie RACE budou odměněni věcnými cenami a poháry. – Kategorie DERBY Pohár DEMOLITION MAN + 10 000,-"
          ],
          image: "https://picsum.photos/seed/goal/700/500"
        },
        {
          title: "DERBY AUTO",
          content: [
            "Jedná se o závod sériových vozů s úpravami povolenými pro daný závod.",
            "Možnost vystužení karoserie pouze v motorovém prostoru (tzn. od přední výstuhy sériového automobilu a v prostorech okolo motoru).",
            "V lévé části karoserie (u řidiče/sedadla řidiče atrana) může být zpevněna plátem železa, jeklem, pásovinou apod.",
            "Povoleno je volnění dveří řidiče prozkoumanou na technické přejímce.",
            "Vozidlo které nebude splňovat požadavky nebude připuštěno do závodu bez možnosti odvolání.",
            "Do závodu mohou startovat vozidla pouze s jednou hnanou nápravou. Ne auta 4×4. (Při velkém zájmu bude zvlášť kategorie 4×4)",
            "Úpravy vozu mohou být minimální a nesmějí ohrožovat diváky nebo ostatní závodníky.",
            "Povoluje se pouze vnitřní ochranný rám (ochranný rám konzultovat s pořadatelem).",
            "Povoluje se změna umístění chladiče.",
            "Lyžina pod motor je povolena.",
            "Závodní může jen osobní automobil, kategorie SUV, MPV a VAN podle účastí a dohodě s pořadatelem. (v případě většího zájmu vypíšeme pro tyto vozy samostatnou kategorii).",
            "Vozidlo musí být vybaveno bezpečnostním pásem!! (doporučujeme 4bodový pás).",
            "Každé Derby Auto musí mít své číslo. To bude přiděleno pořadatelem nebo si ho zvolí závodník sám při vyplňování přihlášky na webových stránkách.",
            "Každé závodní auto musí být na střeše vybaveno 'plovitř' se startovním číslem.",
            "Auta na plyn se závodu účastní nemohou (jen v případě, že bude LPG nádrž odstraněna).",
            "Veškerá skla kromě čelního musí být z vozu odstraněna.",
            "Boční okna u řidiče musí být odstraněno a vybaveno ochranou sítí.",
            "Z vozu musí být odstraněno tažné zařízení (pokud jim disponuje).",
            "Pokud má vozidlo skleněné střešní okno, musí být z vozu odstraněno a otvor zavřený plechem.",
            "Z vozidla mohou být odstraněny pouze 5/4 dveře.",
            "Palivo do vozidla tankujte před každou jízdou na vyznačeném místě."
          ],
          image: "https://picsum.photos/seed/derbycar/700/500"
        },
        {
          title: "BODOVÁNÍ",
          content: [
            "1. Místo (3 body)",
            "2. Místo (2 body)",
            "3. Místo (1 bod)",
            "Po rozjížďkách bude následovat přestávka na opravení aut.",
            "Nařazení do dveří řidiče je přísně zakázáno. Dále je zakázáno úmyslné bourání do stojícího vozu v trati.",
            "Pokud toto závodník poruší, bude disqualifikován.",
            "Pořadatel může kdykoli závod přerušit nebo pozastavit (červená vlajka).",
            "Pokud nebude závodník 'aktivní', bude se opakovně vyřadit střetem, bude disqualifikován.",
            "Při závodě nesmí být ohrožen žádný divák!",
            "První tři závodníci kategorie RACE budou odměněni věcnými cenami a poháry."
          ],
          image: "https://picsum.photos/seed/scoring/700/500"
        }
      ]
    },
    {
      category: "POVOLENÉ ÚPRAVY",
      items: [
        {
          title: "ZPEVNĚNÍ ČI UCHYCENÍ KAPOTY",
          content: [
            "Zpevnění či uchycení kapoty pro zvýšení tuhosti (řetězy, nebo šrouby či sváry)."
          ],
          image: "https://picsum.photos/seed/hood/700/500"
        },
        {
          title: "DOPORUČENÉ VYSTUŽENÍ INTERIÉRU",
          content: [
            "Doporučené vystužení interiéru vozu, použití rámu (viz foto).",
            "Možnost omotání A,B sloupků pro zvýšení tuhosti karoserie."
          ],
          image: "https://picsum.photos/seed/interior/700/500"
        },
        {
          title: "POVOLENÁ VÝZTUHA BOČNÍ",
          content: [
            "Povolená výztuha boční (Řidičovy strany!) Např.: hardox, jekl, roxor apod."
          ],
          image: "https://picsum.photos/seed/side/700/500"
        },
        {
          title: "POVOLENÉ ÚPRAVY V MOTOROVÉM PROSTORU",
          content: [
            "Povolené úpravy v motorovém prostoru, tzn. úpravy od stěny chladiče po vystužení deformační zóny.",
            "Za nárazníkem a blatníky nesmí být umístěno nic.",
            "Všechny skla kromě čelního musí být odstraněny!"
          ],
          image: "https://picsum.photos/seed/engine_bay/700/500"
        }
      ]
    }
  ];

  const handleItemClick = (categoryIdx: number, itemIdx: number) => {
    setActiveCategory(categoryIdx);
    setActiveItem(itemIdx);
  };

  const currentImage = rulesData[activeCategory]?.items[activeItem]?.image || rulesData[0].items[0].image;

  return (
    <section id="rules" className="py-32 bg-[#0a0a0a] relative">
      <div className="absolute left-0 top-0 h-full w-px bg-white/5"></div>
      <div className="container mx-auto px-6 text-left">
        <SectionHeader title="PRAVIDLA & POVOLENÉ ÚPRAVY" subtitle="PRAVIDLA JSOU OD TOHO, ABY SE DODRŽOVALA." />

        <div className="space-y-24">
          {rulesData.map((section, categoryIdx) => {
            const isImageRight = categoryIdx % 2 === 0;

            return (
              <div key={categoryIdx} className="space-y-8">
                {/* Category Header */}
                <h3 className="font-bebas text-[28px] text-white tracking-tight uppercase font-bold border-b-2 border-[#F4CE14]/30 pb-4">
                  {section.category}
                </h3>

                {/* Two-column layout with alternating image position */}
                <div className={`grid lg:grid-cols-2 gap-12 items-start`}>
                  {/* Rules/Specs List */}
                  <div className={`space-y-3 ${!isImageRight ? 'lg:order-2' : 'lg:order-1'}`}>
                    {section.items.map((item, itemIdx) => {
                      // Show first item of each category as active, or the clicked item
                      const isActive = (activeCategory === categoryIdx && activeItem === itemIdx) || (activeCategory !== categoryIdx && itemIdx === 0);
                      return (
                        <div
                          key={itemIdx}
                          className={`border-2 transition-all duration-300 shadow-xl cursor-pointer ${isActive
                            ? 'bg-white/5 border-[#F4CE14]/40'
                            : 'bg-black/60 border-white/5 hover:bg-white/[0.04] hover:border-white/10'
                            }`}
                        >
                          <button
                            onClick={() => handleItemClick(categoryIdx, itemIdx)}
                            className="w-full p-6 flex items-center justify-between font-bebas text-2xl tracking-tight group text-left uppercase font-bold"
                          >
                            <div className="flex items-center gap-6">
                              <span
                                className={`font-tech text-sm transition-colors font-bold ${isActive ? 'text-[#F4CE14]' : 'text-gray-600'
                                  }`}
                              >
                                [ {String(itemIdx + 1).padStart(2, '0')} ]
                              </span>
                              <span
                                className={`group-hover:text-[#F4CE14] transition-colors ${isActive ? 'text-white' : 'text-gray-400'
                                  }`}
                              >
                                {item.title}
                              </span>
                            </div>
                            <div
                              className={`transition-all duration-500 p-1.5 border-2 border-white/10 rounded-full ${isActive
                                ? 'rotate-90 text-[#F4CE14] border-[#F4CE14]/30 bg-[#F4CE14]/10'
                                : 'text-gray-600 group-hover:text-white'
                                }`}
                            >
                              <ChevronRight size={24} />
                            </div>
                          </button>
                          <div
                            className={`overflow-hidden transition-all duration-500 ease-in-out ${isActive ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                              }`}
                          >
                            <div className="px-16 pb-8 text-gray-400 font-tech text-sm leading-relaxed border-t border-white/5 pt-6">
                              <ul className="space-y-3">
                                {item.content.map((line, idx) => (
                                  <li key={idx} className="flex gap-3">
                                    <span className="text-[#F4CE14] flex-shrink-0">•</span>
                                    <span>{line}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Dynamic Image - shows active item or first item of category */}
                  <div className={`${!isImageRight ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div className="sticky top-40">
                      <div className="relative group overflow-hidden border-4 border-white/10 hover:border-[#F4CE14]/40 transition-all duration-700 shadow-2xl">
                        <img
                          key={activeCategory === categoryIdx ? rulesData[categoryIdx]?.items[activeItem]?.image : section.items[0]?.image}
                          src={activeCategory === categoryIdx ? rulesData[categoryIdx]?.items[activeItem]?.image : section.items[0]?.image}
                          alt="Pravidla a specifikace"
                          className="w-full h-[600px] object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 animate-fadeIn"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-8">
                          <div className="font-tech text-xs text-[#F4CE14] tracking-[0.3em] uppercase mb-2">
                            {section.category}
                          </div>
                          <div className="font-bebas text-4xl text-white uppercase tracking-tight">
                            {activeCategory === categoryIdx ? rulesData[categoryIdx]?.items[activeItem]?.title : section.items[0]?.title}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const RegistrationForm = () => {
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [startNumber, setStartNumber] = useState('');
  const [startNumberError, setStartNumberError] = useState('');

  const handleStartNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setStartNumber(value);

    // Check if number exists in STANDINGS
    const exists = STANDINGS.some(d => d.startNumber === parseInt(value));
    if (exists) {
      setStartNumberError('Toto startovní číslo je již obsazené!');
    } else {
      setStartNumberError('');
    }
  };

  return (
    <section className="py-32 bg-white text-black relative">
      <div className="absolute top-0 left-0 w-full h-3 bg-[#F4CE14] shadow-lg"></div>
      <div className="container mx-auto px-6 max-w-4xl text-left">
        <div className="mb-20 text-center">
          <h2 className="text-6xl md:text-8xl font-bebas mb-12 tracking-tight leading-none uppercase font-semibold text-black">REGISTRACE JEZDCE</h2>

          {/* Progress Bar */}
          <div className="relative flex items-center justify-center gap-32 px-16">
            <div className="absolute top-1/2 left-16 right-16 h-1 bg-gray-100 -z-10 -translate-y-1/2"></div>
            <div className="absolute top-1/2 left-16 h-1 bg-[#F4CE14] transition-all duration-700 -z-10 -translate-y-1/2" style={{ width: `calc(${(step - 1) * 50}% - 64px)` }}></div>

            {[
              { num: 1, label: 'OSOBNÍ ÚDAJE' },
              { num: 2, label: 'VOZIDLO' },
              { num: 3, label: 'DOKONČENÍ' }
            ].map(item => (
              <div key={item.num} className="flex flex-col items-center">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center font-tech font-semibold text-xl transition-all duration-500 ${step >= item.num ? 'bg-[#F4CE14] scale-110 shadow-[0_0_30px_rgba(244,206,20,0.6)] border-4 border-white' : 'bg-gray-100 text-gray-400'}`}>
                  {step > item.num ? <CheckCircle size={28} /> : item.num}
                </div>
                <span className="mt-4 font-tech text-xs text-gray-400 tracking-[0.4em] uppercase font-bold text-center">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="font-tech text-xl">
          {/* STEP 1: Personal Information */}
          {step === 1 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-2 tracking-wider">Jméno *</label>
                  <input
                    type="text"
                    className="w-full border-2 border-gray-200 px-4 py-3 outline-none focus:border-[#F4CE14] transition-colors bg-white text-black font-normal text-base"
                    placeholder="Jméno"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-2 tracking-wider">Příjmení *</label>
                  <input
                    type="text"
                    className="w-full border-2 border-gray-200 px-4 py-3 outline-none focus:border-[#F4CE14] transition-colors bg-white text-black font-normal text-base"
                    placeholder="Příjmení"
                  />
                </div>
              </div>


              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-2 tracking-wider">Věk *</label>
                  <input
                    type="number"
                    min="18"
                    max="99"
                    className="w-full border-2 border-gray-200 px-4 py-3 outline-none focus:border-[#F4CE14] transition-colors bg-white text-black font-normal text-base"
                    placeholder="Věk (musí být 18+)"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-2 tracking-wider">Heslo (k vašemu účtu) *</label>
                  <input
                    type="password"
                    className="w-full border-2 border-gray-200 px-4 py-3 outline-none focus:border-[#F4CE14] transition-colors bg-white text-black font-normal text-base"
                    placeholder="Heslo"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-2 tracking-wider">E-mail *</label>
                  <input
                    type="email"
                    className="w-full border-2 border-gray-200 px-4 py-3 outline-none focus:border-[#F4CE14] transition-colors bg-white text-black font-normal text-base"
                    placeholder="E-mail"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-2 tracking-wider">Mobil *</label>
                  <input
                    type="tel"
                    className="w-full border-2 border-gray-200 px-4 py-3 outline-none focus:border-[#F4CE14] transition-colors bg-white text-black font-normal text-base"
                    placeholder="Mobil"
                  />
                </div>
              </div>

              <Button onClick={() => setStep(2)} className="w-full mt-8 bg-[#F4CE14] text-black hover:!bg-black hover:!text-[#F4CE14] transition-colors border-0 py-4 text-lg font-bold uppercase">
                POKRAČOVAT →
              </Button>
            </div>
          )}

          {/* STEP 2: Vehicle Information */}
          {step === 2 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="grid md:grid-cols-[1fr_2fr] gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-2 tracking-wider">Startovní číslo *</label>
                  <input
                    type="number"
                    value={startNumber}
                    onChange={handleStartNumberChange}
                    className={`w-full border-2 px-4 py-3 outline-none transition-colors bg-white text-black font-normal text-base ${startNumberError ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-[#F4CE14]'}`}
                    placeholder="Startovní číslo"
                  />
                  {startNumberError && <p className="text-red-500 text-xs font-bold mt-1 uppercase tracking-wider">{startNumberError}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-2 tracking-wider">Typ závodního vozu *</label>
                  <input
                    type="text"
                    className="w-full border-2 border-gray-200 px-4 py-3 outline-none focus:border-[#F4CE14] transition-colors bg-white text-black font-normal text-base"
                    placeholder="Typ závodního vozu (Škoda Favorit, Ford Mondeo...)"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase mb-2 tracking-wider">Kategorie *</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { value: 'do1.6L', label: 'DO 1,6L' },
                    { value: 'nad1.6L', label: 'NAD 1,6L' },
                    { value: 'zeny', label: 'ŽENY' }
                  ].map(cat => (
                    <div
                      key={cat.value}
                      onClick={() => setSelectedCategory(cat.value)}
                      className={`border-2 p-4 cursor-pointer transition-all text-center font-bold ${selectedCategory === cat.value
                        ? 'border-[#F4CE14] bg-[#F4CE14]/10'
                        : 'border-gray-200 hover:border-[#F4CE14]/50'
                        }`}
                    >
                      {cat.label}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase mb-2 tracking-wider">Odkud jsi?</label>
                <input
                  type="text"
                  className="w-full border-2 border-gray-200 px-4 py-3 outline-none focus:border-[#F4CE14] transition-colors bg-white text-black font-normal text-base"
                  placeholder="Odkud jsi?"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase mb-2 tracking-wider">Komentář</label>
                <textarea
                  rows={4}
                  className="w-full border-2 border-gray-200 px-4 py-3 outline-none focus:border-[#F4CE14] transition-colors bg-white text-black font-normal text-base resize-none"
                  placeholder="Jak se má moderátor představit? Něco o sobě. Přezdívka."
                ></textarea>
              </div>

              <div className="flex gap-4 mt-8">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1 border-2 border-black text-black hover:!bg-black hover:!text-[#F4CE14] transition-colors py-4 text-lg font-bold uppercase">
                  ← ZPĚT
                </Button>
                <Button onClick={() => setStep(3)} className="flex-1 bg-[#F4CE14] text-black hover:!bg-black hover:!text-[#F4CE14] transition-colors border-0 py-4 text-lg font-bold uppercase">
                  POKRAČOVAT →
                </Button>
              </div>
            </div>
          )}

          {/* STEP 3: Consent and Payment */}
          {step === 3 && (
            <div className="space-y-8 animate-fadeIn">
              {/* Payment Information Box */}
              <div className="border-4 border-dashed border-red-500 bg-red-50 p-6">
                <h3 className="font-bebas text-3xl text-center mb-4 uppercase">PLATBA STARTOVNÉHO:<br />(POUZE PŘEDEM)</h3>
                <div className="space-y-2 text-center font-bold">
                  <p className="text-sm">Číslo účtu:</p>
                  <p className="text-2xl font-bebas">2402064559/2010</p>
                  <p className="text-sm mt-4">Částka:</p>
                  <p className="text-2xl font-bebas text-red-600">2000 Kč</p>
                  <p className="text-sm mt-4">Variabilní symbol:</p>
                  <p className="text-2xl font-bebas">1392025</p>
                  <p className="text-sm mt-4">Poznámka:</p>
                  <p className="text-base">VRAKFEST a „Vaše jméno"</p>
                </div>
              </div>

              {/* Important Notice */}
              <div className="border-4 border-dashed border-red-500 bg-red-50 p-6">
                <p className="font-bold text-center mb-4">POZOR – Startovné lze zaplatit pouze předem.<br />Platba startovného hotově na místě nebude možná!</p>
                <p className="text-sm text-center">Počet startujících závodníků je omezený – platbou předem rezervujete své místo v závodě.</p>
                <p className="text-sm text-center mt-4">Závodník bude připsán na startovní listinu při přijetí platby.</p>
                <p className="text-sm text-center mt-4">V ceně je volný vstup pro závodníka jeho posádku včetně místa v depu pro jedno doprovodné vozidlo.</p>
                <p className="text-sm text-center mt-4 font-bold">Hlavní výhra je 10000 Kč + Stylové poháry od firmy YOMAX a dárky od sponzorů Elektro Dvořák Valašské Meziříčí.</p>
                <p className="text-sm text-center mt-4 font-bold">Níže najdete pravidla závodu.</p>
              </div>

              {/* Consent Checkboxes */}
              <div className="space-y-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" className="mt-1 w-5 h-5 accent-[#F4CE14]" />
                  <span className="text-sm">
                    <strong>Prohlášení o plnoletosti: *</strong><br />
                    Čestně prohlašuji, že v termín konání závodu jsem starší 18 let.
                  </span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" className="mt-1 w-5 h-5 accent-[#F4CE14]" />
                  <span className="text-sm">
                    <strong>Souhlas s pravidly: *</strong><br />
                    Čestně prohlašuji, že jsem si přečetl pravidla závodu (viz níže), souhlasím s nimi a budu je dodržovat.
                  </span>
                </label>
              </div>

              <div className="flex gap-4 mt-8">
                <Button variant="outline" onClick={() => setStep(2)} className="flex-1 border-2 border-black text-black hover:!bg-black hover:!text-[#F4CE14] transition-colors py-4 text-lg font-bold uppercase">
                  ← ZPĚT
                </Button>
                <Button className="flex-1 bg-green-600 text-white hover:!bg-black hover:!text-[#F4CE14] transition-colors border-0 py-4 text-lg font-bold uppercase">
                  🏁 ZAREGISTROVAT
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};




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
        <GalleryGrid />
        <SponsorsTicker />
        <Program />
        <EventGrid />
        <DriverRoster />
        <Standings />
        <RulesAndSpecs />
        <RegistrationForm />
        <MobileApp />

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