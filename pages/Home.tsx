import React, { useState, useEffect, useRef } from 'react';
import { Button } from '../components/Button';
import { Typewriter } from '../components/Typewriter';
import { SectionHeader } from '../components/SectionHeader';
import {
  Menu, X, Play, Clock, Users, Shield,
  MapPin, ShoppingCart, UserPlus, Phone,
  ChevronDown, ChevronRight, CheckCircle, Info,
  Search, ExternalLink, Settings, Cpu, ArrowRight, ArrowLeft, User, ShoppingBag
} from 'lucide-react';
import { DRIVERS, EVENTS, PROGRAM, MARKET_ITEMS, SPONSORS, STANDINGS } from '../constants';
import { Driver } from '../types';


// --- Helper Functions ---
// --- Helper Functions ---
const formatEventDate = (dateStr: string, includeYear = false) => {
  if (!dateStr) return '';
  let day, month, year;
  if (dateStr.includes('-')) {
    const parts = dateStr.split('-');
    day = parseInt(parts[2], 10);
    month = parseInt(parts[1], 10);
    year = parts[0];
  } else if (dateStr.includes('.')) {
    const parts = dateStr.split('.');
    day = parseInt(parts[0], 10);
    month = parseInt(parts[1], 10);
    year = parts[2];
  } else {
    return dateStr;
  }
  return includeYear && year ? `${day}.${month}.${year}` : `${day}.${month}.`;
};

const AnimatedCTA = ({ ctaIndex, defaultText, alternateText }: { ctaIndex: number, defaultText: string, alternateText: string }) => {
  return (
    <div className="relative h-[1.25em] overflow-hidden flex flex-col items-center">
      <div
        className="transition-transform duration-700 ease-in-out flex flex-col items-center"
        style={{ transform: `translateY(-${ctaIndex * 50}%)` }}
      >
        <span className="h-[1.25em] flex items-center justify-center whitespace-nowrap px-1 uppercase tracking-wider">
          {defaultText}
        </span>
        <span className="h-[1.25em] flex items-center justify-center whitespace-nowrap px-1 uppercase tracking-wider">
          {alternateText}
        </span>
      </div>
    </div>
  );
};

// --- Components ---
import { InstagramFeed } from '../components/InstagramFeed';
import { supabase } from '../supabaseClient';







// --- Fixed Header with Grid Layout (1fr auto 1fr) ---


const Hero = ({ activeEvent, registeredCount, ctaIndex }: { activeEvent: any, registeredCount: number, ctaIndex: number }) => {
  const displayEvent = activeEvent || EVENTS[0];

  const targetDate = new Date(displayEvent.date.split('.').reverse().join('-')); // Handle DD.MM.YYYY
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
        {/* Mobile: Block layout with <br/> and leading-[1.25] for consistent spacing. Desktop: Flex column with gap. */}
        <h1 className="font-bebas font-semibold leading-[1.25] md:leading-[0.9] mb-6 md:mb-10 animate-fadeIn uppercase tracking-tight block md:flex md:flex-col md:items-center md:gap-4 lg:gap-6 text-center">
          <span className="text-white">ZÁVODY VRAKŮ</span>
          <br className="md:hidden" />
          <span className="text-[#F4CE14] drop-shadow-[0_0_40px_rgba(244,206,20,0.6)] no-underline">A DEMOLIČNÍ DERBY</span>
        </h1>

        <div className="w-full max-w-6xl mb-8">
          {/* Mobile: Grid 2x2, Desktop: Flex Row */}
          <div className="grid grid-cols-2 md:flex md:flex-row bg-gradient-to-r from-transparent via-black/60 to-transparent backdrop-blur-md border-y border-white/10 md:divide-x divide-[#F4CE14]/30">

            {/* Stat Card 1 - Upcoming Event */}
            {/* Mobile borders: Right + Bottom */}
            <div className="flex-auto px-4 md:px-8 py-4 md:py-6 flex flex-col items-center group relative hover:bg-white/5 transition-colors duration-300 border-r border-b border-[#F4CE14]/50 md:border-0">
              <p className="font-tech text-gray-500 uppercase tracking-widest font-bold mb-2 md:mb-4 text-[10px] md:text-xs group-hover:text-[#F4CE14] transition-colors whitespace-nowrap">
                NADCHÁZEJÍCÍ UDÁLOST
              </p>

              <p className="font-bebas text-4xl md:text-5xl lg:text-6xl text-white group-hover:text-[#F4CE14] transition-colors font-semibold tracking-wider leading-none mb-2 text-center whitespace-nowrap">
                {displayEvent.title}
              </p>
              <p className="font-tech text-[10px] text-gray-500 tracking-[0.2em] uppercase font-bold group-hover:text-white transition-colors text-center whitespace-nowrap">
                {displayEvent.location}
              </p>
            </div>

            {/* Stat Card 2 - Date */}
            {/* Mobile borders: Bottom only */}
            <div className="flex-auto px-4 md:px-8 py-4 md:py-6 flex flex-col items-center group relative hover:bg-white/5 transition-colors duration-300 border-b border-[#F4CE14]/50 md:border-0">
              <p className="font-tech text-gray-500 uppercase tracking-widest font-bold mb-2 md:mb-4 text-[10px] md:text-xs group-hover:text-[#F4CE14] transition-colors whitespace-nowrap">
                KDY TO BUDE?
              </p>

              <p className="font-bebas text-4xl md:text-5xl lg:text-6xl text-white group-hover:text-[#F4CE14] transition-colors font-semibold tracking-wider leading-none mb-2 whitespace-nowrap">
                {formatEventDate(displayEvent.date)}
              </p>
              <p className="font-tech text-[10px] text-gray-500 tracking-[0.2em] uppercase font-bold group-hover:text-white transition-colors text-center whitespace-nowrap">
                ULOŽ SI TO
              </p>
            </div>

            {/* Stat Card 3 - Days to Start */}
            {/* Mobile borders: Right only */}
            <div className="flex-auto px-4 md:px-8 py-4 md:py-6 flex flex-col items-center group relative hover:bg-white/5 transition-colors duration-300 border-r border-[#F4CE14]/50 md:border-0">
              <p className="font-tech text-gray-500 uppercase tracking-widest font-bold mb-2 md:mb-4 text-[10px] md:text-xs group-hover:text-[#F4CE14] transition-colors whitespace-nowrap">
                POČET DNÍ
              </p>

              <p className="font-bebas text-4xl md:text-5xl lg:text-6xl text-white group-hover:text-[#F4CE14] transition-colors font-semibold tracking-wider leading-none mb-2 whitespace-nowrap">
                {Math.max(0, daysToStart)}
              </p>
              <p className="font-tech text-[10px] text-gray-500 tracking-[0.2em] uppercase font-bold group-hover:text-white transition-colors text-center whitespace-nowrap">
                DO STARTU
              </p>
            </div>

            {/* Stat Card 4 - Registered Racers */}
            {/* Mobile borders: None */}
            <div className="flex-auto px-4 md:px-8 py-4 md:py-6 flex flex-col items-center group relative hover:bg-white/5 transition-colors duration-300">
              <p className="font-tech text-gray-500 uppercase tracking-widest font-bold mb-2 md:mb-4 text-[10px] md:text-xs group-hover:text-[#F4CE14] transition-colors whitespace-nowrap">
                PŘIHLÁŠENÝCH
              </p>

              <p className="font-bebas text-4xl md:text-5xl lg:text-6xl text-white group-hover:text-[#F4CE14] transition-colors font-semibold tracking-wider leading-none mb-2 whitespace-nowrap">
                {registeredCount}<span className="text-white/30 text-3xl md:text-4xl ml-2 align-top">/90</span>
              </p>
              <p className="font-tech text-[10px] text-gray-500 tracking-[0.2em] uppercase font-bold group-hover:text-white transition-colors text-center whitespace-nowrap">
                JEZDCŮ
              </p>
            </div>
          </div>
        </div>

        {/* Buttons: Cleaned vertical stacking and narrowed width on mobile */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6 w-full mt-6 scale-90 2xl:scale-100 origin-top">
          <Button className="w-10/12 sm:w-auto max-w-sm mx-auto sm:mx-0">
            <a href="#registrace">
              <AnimatedCTA ctaIndex={ctaIndex} defaultText="CHCI ZÁVODIT" alternateText="REGISTROVAT SE" />
            </a>
          </Button>
          <Button variant="outline" className="w-10/12 sm:w-auto max-w-sm mx-auto sm:mx-0 !border-white !text-white hover:!bg-white hover:!text-black hover:!shadow-none">BODOVÉ POŘADÍ</Button>
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

const About = ({ ctaIndex }: { ctaIndex: number }) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [countersStarted, setCountersStarted] = useState(false);
  const [counts, setCounts] = useState({ visitors: 0, racers: 0, cars: 0, adrenaline: 0 });
  const scrollRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  // Animate counters when visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !countersStarted) {
          setCountersStarted(true);

          // Animate visitors counter
          animateCounter(0, 12000, 2000, (val) =>
            setCounts(prev => ({ ...prev, visitors: val }))
          );

          // Animate racers counter
          animateCounter(0, 90, 2000, (val) =>
            setCounts(prev => ({ ...prev, racers: val }))
          );

          // Animate cars counter
          animateCounter(0, 500, 2000, (val) =>
            setCounts(prev => ({ ...prev, cars: val }))
          );

          // Animate adrenaline counter
          animateCounter(0, 100, 2000, (val) =>
            setCounts(prev => ({ ...prev, adrenaline: val }))
          );
        }
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, [countersStarted]);

  const animateCounter = (start: number, end: number, duration: number, callback: (val: number) => void) => {
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(start + (end - start) * easeOutQuart);

      callback(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  };

  const youtubeVideos = [
    { id: '1mtAOEGe9Rw', title: 'VrakFest Video 1' },
    { id: 'UiuVOYyp0XA', title: 'VrakFest Video 2' },
    { id: 'QCvG3Hso_UE', title: 'VrakFest Video 3' },
    { id: 'JMHHKZepvOE', title: 'VrakFest Video 4' },
    { id: '_2TrwB0pmaA', title: 'VrakFest Video 5' },
    { id: 'ZDFaYvdV_Pc', title: 'VrakFest Video 6' },
    { id: 'rmW-I_AbfDc', title: 'VrakFest Video 7' },
    { id: '1N1gVG62-9o', title: 'VrakFest Video 8' },
  ];

  return (
    <section id="ovrakfestu" className="py-16 md:py-32 bg-[#0a0a0a] relative overflow-hidden">
      {/* Tire Track Background */}
      <div className="hidden lg:block absolute top-0 right-0 w-full h-full pointer-events-none select-none opacity-15 overflow-hidden">
        <img
          src="/media/grunge-tire-track-wheel-braking-marks-truck-car-motorcycle-tread-pattern-silhouette-auto-race.png"
          alt=""
          className="absolute -top-10 -right-10 w-[140%] h-auto rotate-[8deg] origin-top-right"
          style={{ mixBlendMode: 'screen', filter: 'brightness(1.5) contrast(1.2)' }}
        />
      </div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:gap-24 items-start w-full max-w-full">
          {/* Left Column - Content */}
          <div className="w-full max-w-full min-w-0 flex flex-col items-start text-left">
            <SectionHeader title={<>MILUJEME AUTA,<br />ZÁBAVU A <span className="text-white">ADRENALIN</span></>} subtitle="VRAKFEST JE PRO VŠECHNY, CO MAJÍ RÁDI BOURAČKY!" />

            <div className="w-full max-w-full prose prose-invert">
              <p style={{ fontSize: 'var(--fs-p)' }} className="text-gray-400 leading-relaxed mb-8 md:mb-12 font-medium break-words w-full">
                Zapomeňte na naleštěné karoserie. Tady vládne hrubá síla, technický um a nekonečný adrenalin.
                Právě zde se staré plechy mění v legendy a kousky rezu v medaile.
                Tisíce fanoušků, desítky upravených vraků a jediný cíl: probojovat se skrze chaos a dojet do cíle jako první.
                Žádné brzdy, žádné slitování – jen čistá destrukce a zvuk kovu na kov.
              </p>
            </div>

            {/* Stats Grid */}
            <div ref={statsRef} className="grid grid-cols-2 gap-4 md:gap-8 mb-0 md:mb-16 w-full max-w-full">
              <div
                className="bg-white/5 p-5 md:p-8 border-l-4 border-[#F4CE14] group hover:bg-[#F4CE14]/10 transition-all text-left shadow-lg overflow-hidden w-full"
                style={{
                  opacity: countersStarted ? 1 : 0,
                  transform: countersStarted ? 'translateY(0)' : 'translateY(30px)',
                  transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
                  transitionDelay: '0ms'
                }}
              >
                <p className="font-bebas text-4xl md:text-5xl text-[#F4CE14] mb-2 uppercase tracking-tight font-bold truncate">
                  {counts.visitors.toLocaleString('cs-CZ')}+
                </p>
                <p className="font-tech text-xs text-gray-500 tracking-widest uppercase truncate">NÁVŠTĚVNÍKŮ ROČNĚ</p>
              </div>
              <div
                className="bg-white/5 p-5 md:p-8 border-l-4 border-[#F4CE14] group hover:bg-[#F4CE14]/10 transition-all text-left shadow-lg overflow-hidden w-full"
                style={{
                  opacity: countersStarted ? 1 : 0,
                  transform: countersStarted ? 'translateY(0)' : 'translateY(30px)',
                  transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
                  transitionDelay: '100ms'
                }}
              >
                <p className="font-bebas text-4xl md:text-5xl text-[#F4CE14] mb-2 uppercase tracking-tight font-bold truncate">
                  {counts.racers}+
                </p>
                <p className="font-tech text-xs text-gray-500 tracking-widest uppercase truncate">JEZDCŮ NA KAŽDÉ AKCI</p>
              </div>
              <div
                className="bg-white/5 p-5 md:p-8 border-l-4 border-[#F4CE14] group hover:bg-[#F4CE14]/10 transition-all text-left shadow-lg overflow-hidden w-full"
                style={{
                  opacity: countersStarted ? 1 : 0,
                  transform: countersStarted ? 'translateY(0)' : 'translateY(30px)',
                  transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
                  transitionDelay: '200ms'
                }}
              >
                <p className="font-bebas text-4xl md:text-5xl text-[#F4CE14] mb-2 uppercase tracking-tight font-bold truncate">
                  {counts.cars}+
                </p>
                <p className="font-tech text-xs text-gray-500 tracking-widest uppercase truncate">ZLIKVIDOVANÝCH AUT</p>
              </div>
              <div
                className="bg-white/5 p-5 md:p-8 border-l-4 border-[#F4CE14] group hover:bg-[#F4CE14]/10 transition-all text-left shadow-lg overflow-hidden w-full"
                style={{
                  opacity: countersStarted ? 1 : 0,
                  transform: countersStarted ? 'translateY(0)' : 'translateY(30px)',
                  transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
                  transitionDelay: '300ms'
                }}
              >
                <p className="font-bebas text-4xl md:text-5xl text-[#F4CE14] mb-2 uppercase tracking-tight font-bold truncate">
                  {counts.adrenaline}%
                </p>
                <p className="font-tech text-xs text-gray-500 tracking-widest uppercase truncate">ADRENALINU A ZÁBAVY</p>
              </div>
            </div>

            {/* Buttons - Desktop Only */}
            <div className="hidden lg:flex flex-col sm:flex-row justify-center sm:justify-start gap-4 md:gap-6 w-full -mt-2 md:mt-0 origin-top">
              <Button className="w-10/12 sm:w-auto max-w-sm mx-auto sm:mx-0 bg-[#F4CE14] text-black hover:bg-white border-0 group relative overflow-hidden justify-center">
                <span className="block transition-transform duration-300 group-hover:-translate-y-[150%]">Koupit vstupenku</span>
                <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 translate-y-[150%] group-hover:translate-y-0 text-black">JIŽ BRZY</span>
              </Button>
              <Button variant="outline" className="w-10/12 sm:w-auto max-w-sm mx-auto sm:mx-0 btn-race justify-center p-0">
                <a href="#registrace" className="w-full h-full flex items-center justify-center px-10">
                  <AnimatedCTA ctaIndex={ctaIndex} defaultText="Chci závodit" alternateText="Registrovat se" />
                </a>
              </Button>
            </div>
          </div>

          {/* Right Column - Media */}
          <div className="w-full max-w-full mt-4 lg:mt-0 lg:sticky lg:top-40 space-y-8 lg:space-y-12">
            <div className="relative group w-full">
              <div className="relative border-4 border-white/10 group-hover:border-[#F4CE14]/60 transition-all duration-700 overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.8)] w-full" style={{ paddingBottom: '60%' }}>
                <div className="absolute inset-0">
                  {!isVideoPlaying ? (
                    <>
                      <img
                        src="https://img.youtube.com/vi/agKclmFnbTk/maxresdefault.jpg"
                        alt="VrakFest Video"
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                      />
                      <div className="absolute inset-0 bg-black/50 group-hover:bg-transparent transition-colors duration-700"></div>
                      <div
                        className="absolute inset-0 flex items-center justify-center cursor-pointer"
                        onClick={() => setIsVideoPlaying(true)}
                      >
                        <div className="w-20 h-20 md:w-28 md:h-28 bg-[#F4CE14] rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-[0_0_50px_rgba(244,206,20,0.6)] border-b-8 border-yellow-700">
                          <Play className="text-black ml-1" fill="currentColor" size={32} />
                        </div>
                      </div>
                    </>
                  ) : (
                    <iframe
                      className="w-full h-full"
                      src="https://www.youtube.com/embed/agKclmFnbTk?autoplay=1&controls=1&modestbranding=1&rel=0"
                      title="VrakFest Video"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-6 pt-4 w-full overflow-hidden">
              <p className="font-tech text-xs text-gray-500 mb-4 tracking-[0.4em] uppercase">YOUTUBE RECAPS</p>
              <div ref={scrollRef} className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar cursor-grab active:cursor-grabbing items-center w-full">
                {youtubeVideos.map((video, i) => (
                  <div
                    key={i}
                    onClick={() => setSelectedVideo(video.id)}
                    className="w-[180px] sm:w-[200px] aspect-video bg-black border border-white/10 relative group overflow-hidden shadow-xl flex-shrink-0 cursor-pointer"
                  >
                    <img
                      src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                      alt={video.title}
                      className="w-full h-full object-cover opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-10 h-10 bg-[#F4CE14] rounded-full flex items-center justify-center shadow-lg">
                        <Play className="text-black fill-black ml-1" size={16} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Video Modal Popup */}
            {selectedVideo && (
              <div
                className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4"
                onClick={() => setSelectedVideo(null)}
              >
                <div
                  className="relative w-full max-w-5xl aspect-video"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => setSelectedVideo(null)}
                    className="absolute -top-12 right-0 text-white hover:text-[#F4CE14] transition-colors"
                  >
                    <X size={32} />
                  </button>
                  <iframe
                    className="w-full h-full border-4 border-[#F4CE14]"
                    src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1&controls=1&modestbranding=1&rel=0`}
                    title="VrakFest Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            )}
          </div>

          {/* Buttons - Mobile Only (at the bottom) */}
          <div className="flex lg:hidden flex-col sm:flex-row justify-center gap-4 w-full mt-0">
            <Button className="w-full sm:w-auto bg-[#F4CE14] text-black hover:bg-white border-0 group relative overflow-hidden justify-center">
              <span className="block transition-transform duration-300 group-hover:-translate-y-[150%]">Koupit vstupenku</span>
              <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 translate-y-[150%] group-hover:translate-y-0 text-black">JIŽ BRZY</span>
            </Button>
            <Button variant="outline" className="w-full sm:w-auto btn-race justify-center p-0">
              <a href="#registrace" className="w-full h-full flex items-center justify-center px-10 py-4">
                <AnimatedCTA ctaIndex={ctaIndex} defaultText="Chci závodit" alternateText="Registrovat se" />
              </a>
            </Button>
          </div>
        </div>
      </div >
    </section >
  );
};

const GalleryGrid = () => {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = cardRefs.current.map((card, index) => {
      if (!card) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // Add card to visible when scrolling in
              setTimeout(() => {
                setVisibleCards((prev) => {
                  if (!prev.includes(index)) {
                    return [...prev, index];
                  }
                  return prev;
                });
              }, index * 200);
            } else {
              // Remove card from visible when scrolling out
              setVisibleCards((prev) => prev.filter((i) => i !== index));
            }
          });
        },
        { threshold: 0.3 }
      );

      observer.observe(card);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, []);

  return (
    <section className="pb-32 bg-[#0a0a0a] relative">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Box 1 */}
          <div
            ref={(el) => (cardRefs.current[0] = el)}
            className={`flex flex-col gap-6 group transition-all duration-1000 ${visibleCards.includes(0) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
          >
            <div className="aspect-[4/3] overflow-hidden border-2 border-white/5 group-hover:border-[#F4CE14] transition-all duration-500 relative shadow-2xl">
              <img
                src="/media/DSC_4209.jpg"
                className={`w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 ${visibleCards.includes(0) ? 'grayscale-0' : 'grayscale'
                  } group-hover:grayscale-0`}
                alt="Rodina"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
            </div>
            <div className="text-left">
              <h3 style={{ fontSize: 'var(--fs-h3)' }} className={`font-bebas uppercase leading-tight tracking-tight transition-colors font-bold mb-4 ${visibleCards.includes(0) ? 'text-[#F4CE14]' : 'text-white'
                } group-hover:text-[#F4CE14]`}>Den plný adrenalinu pro celou rodinu!</h3>
              <p style={{ fontSize: 'var(--fs-p)' }} className="font-tech text-gray-400 leading-relaxed font-medium">
                Vrakfest není jen o bourání. Je to festival zážitků pro malé i velké. Od doprovodných show pro děti až po vyhlášenou gastro sekci – u nás si den užije celá rodina.
              </p>
            </div>
          </div>

          {/* Box 2 */}
          <div
            ref={(el) => (cardRefs.current[1] = el)}
            className={`flex flex-col gap-6 group md:mt-24 transition-all duration-1000 ${visibleCards.includes(1) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
          >
            <div className="aspect-[4/3] overflow-hidden border-2 border-white/5 group-hover:border-[#F4CE14] transition-all duration-500 relative shadow-2xl">
              <img
                src="/media/DSC_0871.jpg"
                className={`w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 ${visibleCards.includes(1) ? 'grayscale-0' : 'grayscale'
                  } group-hover:grayscale-0`}
                alt="Závod"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
            </div>
            <div className="text-left">
              <h3 style={{ fontSize: 'var(--fs-h3)' }} className={`font-bebas uppercase leading-tight tracking-tight transition-colors font-bold mb-4 ${visibleCards.includes(1) ? 'text-[#F4CE14]' : 'text-white'
                } group-hover:text-[#F4CE14]`}>Přijď si zazávodit, zabourat a vyhrát 10000 Kč! a víc!</h3>
              <p style={{ fontSize: 'var(--fs-p)' }} className="font-tech text-gray-400 leading-relaxed font-medium">
                Máš staré auto a chuť na pořádnou porci destrukce? Přihlas se do naší arény. Bojuj o čest, slávu a tučnou finanční odměnu, která čeká na posledního vítěze.
              </p>
            </div>
          </div>

          {/* Box 3 */}
          <div
            ref={(el) => (cardRefs.current[2] = el)}
            className={`flex flex-col gap-6 group md:mt-48 transition-all duration-1000 ${visibleCards.includes(2) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
          >
            <div className="aspect-[4/3] overflow-hidden border-2 border-white/5 group-hover:border-[#F4CE14] transition-all duration-500 relative shadow-2xl">
              <img
                src="/media/DSC_0655.jpg"
                className={`w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 ${visibleCards.includes(2) ? 'grayscale-0' : 'grayscale'
                  } group-hover:grayscale-0`}
                alt="Zábava"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
            </div>
            <div className="text-left">
              <h3 style={{ fontSize: 'var(--fs-h3)' }} className={`font-bebas uppercase leading-tight tracking-tight transition-colors font-bold mb-4 ${visibleCards.includes(2) ? 'text-[#F4CE14]' : 'text-white'
                } group-hover:text-[#F4CE14]`}>Užijte si srandu se starými vraky.</h3>
              <p style={{ fontSize: 'var(--fs-p)' }} className="font-tech text-gray-400 leading-relaxed font-medium">
                Sledujte, jak se plechy kroutí v dechberoucích soubojích. Čekají vás tvrdé nárazy a atmosféra, kterou jinde nezažijete. Tohle je čistý adrenalin bez pravidel!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const SponsorsTicker = () => {
  const [selectedSponsor, setSelectedSponsor] = useState<typeof SPONSORS[0] | null>(null);
  const [displayedSponsor, setDisplayedSponsor] = useState<typeof SPONSORS[0] | null>(null);

  useEffect(() => {
    if (selectedSponsor) {
      setDisplayedSponsor(selectedSponsor);
    }
  }, [selectedSponsor]);

  return (
    <section id="partneri" className="py-24 bg-black relative overflow-hidden">
      <div className="container mx-auto px-6 mb-16 text-center">
        <h2 style={{ fontSize: 'var(--fs-h2)' }} className="font-bebas font-semibold text-white tracking-tight leading-[1.1] uppercase mb-2">
          PARTNEŘI AKCE
        </h2>
        <p className="font-tech text-gray-400 tracking-widest uppercase text-sm md:text-base">
          CHCEŠ SE STÁT TAKY PARTNEREM? <a href="#registrace-partnera" className="text-[#F4CE14] hover:text-white transition-colors underline decoration-2 underline-offset-4">TAK KLIKNI ZDE</a>
        </p>
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
              style={{ fontSize: 'var(--fs-h3)' }}
              className="font-bebas text-black mx-20 font-semibold hover:scale-110 inline-block transition-transform cursor-pointer select-none tracking-tight uppercase hover:text-white"
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
                <h3 style={{ fontSize: 'var(--fs-h3)' }} className="font-bebas text-[#F4CE14] uppercase leading-none tracking-tight">
                  {displayedSponsor?.name}
                </h3>
                <div className="w-16 h-1 bg-white/20"></div>
                <p className="font-tech text-xl text-gray-300 leading-relaxed max-w-lg">
                  {displayedSponsor?.description}
                </p>
                <div className="pt-4">
                  <Button variant="outline" className="border-white text-white hover:!bg-white hover:!text-black hover:!border-white transition-colors duration-300">
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

const Program = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [feesStarted, setFeesStarted] = useState(false);
  const [feeCounts, setFeeCounts] = useState({ adult: 0, child: 0, family21: 0, family22: 0, registration: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const feesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const offset = windowHeight * 0.6; // Trigger point

        // Calculate progress in pixels relative to the container top
        const progress = offset - rect.top;
        setScrollProgress(Math.max(0, progress));
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animate fee counters when visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !feesStarted) {
          setFeesStarted(true);

          // Animate adult ticket price
          animateFeeCounter(0, 300, 1500, (val) =>
            setFeeCounts(prev => ({ ...prev, adult: val }))
          );

          // Animate child ticket price
          animateFeeCounter(0, 200, 1500, (val) =>
            setFeeCounts(prev => ({ ...prev, child: val }))
          );

          // Animate family 2+1 price
          animateFeeCounter(0, 600, 1500, (val) =>
            setFeeCounts(prev => ({ ...prev, family21: val }))
          );

          // Animate family 2+2 price
          animateFeeCounter(0, 800, 1500, (val) =>
            setFeeCounts(prev => ({ ...prev, family22: val }))
          );

          // Animate registration fee
          animateFeeCounter(0, 2000, 1500, (val) =>
            setFeeCounts(prev => ({ ...prev, registration: val }))
          );
        }
      },
      { threshold: 0.3 }
    );

    if (feesRef.current) {
      observer.observe(feesRef.current);
    }

    return () => observer.disconnect();
  }, [feesStarted]);

  const animateFeeCounter = (start: number, end: number, duration: number, callback: (val: number) => void) => {
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(start + (end - start) * easeOutQuart);

      callback(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  };

  return (
    <section id="program" className="py-32 bg-black relative">
      <div className="container mx-auto px-6">
        <SectionHeader title="PROGRAM" subtitle="JAK TO U NÁS CHODÍ A KOLIK TO STOJÍ?" />

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Column: Harmonogram & Warning */}
          <div className="relative space-y-12">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <h3 style={{ fontSize: 'var(--fs-h3)' }} className="font-bebas text-white uppercase tracking-tight font-bold leading-none">HARMONOGRAM</h3>
              </div>

              <div className="relative pl-8 md:pl-12" ref={containerRef}>
                {/* Visual Timeline Rail */}
                <div className="absolute left-[3px] md:left-[5px] top-4 bottom-4 w-[3px] bg-white/10 rounded-full"></div>

                {/* Active Progress Line */}
                <div
                  className="absolute left-[3px] md:left-[5px] top-4 w-[3px] bg-[#F4CE14] shadow-[0_0_15px_#F4CE14] rounded-full transition-all duration-100 ease-out z-10"
                  style={{ height: `${Math.min(containerRef.current ? containerRef.current.clientHeight - 32 : 1000, scrollProgress)}px`, maxHeight: 'calc(100% - 32px)' }}
                ></div>

                <div className="space-y-4">
                  {PROGRAM.map((item, idx) => {
                    // Approximate position for each item to trigger 'active' state of the dot
                    // Simple heuristic: if scrollProgress is significantly vast past the index * estimated height
                    const itemActive = scrollProgress > (idx * 150 + 50); // rough estimation, or just let line pass

                    return (
                      <div key={idx} className="relative group/timeline-item">
                        {/* Timeline Dot */}
                        <div className={`absolute -left-[35.5px] md:-left-[49.5px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 transition-all duration-300 z-20 ${itemActive ? 'bg-[#F4CE14] border-[#F4CE14] shadow-[0_0_10px_#F4CE14] scale-125' : 'bg-[#111] border-white/20'}`}></div>

                        <div className={`flex flex-col md:flex-row gap-2 md:gap-6 p-4 md:p-8 border-2 border-white/5 transition-all duration-500 relative group shadow-2xl ${item.isCurrent ? 'bg-white/10 border-[#F4CE14] yellow-glow z-10 scale-[1.03]' : 'hover:bg-white/[0.03] hover:border-white/20'}`}>
                          <div className="md:w-32 text-left shrink-0">
                            <span className="font-tech text-2xl md:text-3xl block mb-0 md:mb-2 tracking-tighter font-bold text-[#F4CE14]">{item.time}</span>
                            {item.isCurrent && (
                              <span className="bg-[#F4CE14] text-black px-2 py-0.5 text-[10px] font-bold font-tech uppercase tracking-widest inline-block">LIVE</span>
                            )}
                          </div>
                          <div className="flex-1 text-left">
                            <h4 style={{ fontSize: 'var(--fs-h4)' }} className={`font-bebas mb-1 leading-none tracking-tight uppercase font-bold ${item.isCurrent ? 'text-white' : 'text-gray-400 group-hover:text-white transition-colors'}`}>{item.title}</h4>
                            <p style={{ fontSize: 'var(--fs-p)' }} className="text-gray-500 font-tech leading-relaxed">{item.description}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Upozornění - Moved under Harmonogram */}
            <div className="border-l-4 border-[#F4CE14] bg-[#F4CE14]/5 p-6 font-tech text-gray-400 text-sm leading-relaxed">
              <div className="flex items-center gap-3 mb-3 text-[#F4CE14] font-bold uppercase tracking-widest">
                <Info size={18} />
                <span>Důležité upozornění</span>
              </div>
              <p style={{ fontSize: 'var(--fs-p)' }} className="mb-2">Pořadatel si vyhrazuje právo na změnu programu.</p>
              <p style={{ fontSize: 'var(--fs-p)' }}>V den závodu se můžou časy posunout. <span className="text-white font-bold">Děkujeme za pochopení.</span></p>
            </div>
          </div>

          {/* Right Column: Fees (Vstupné, Startovné) */}
          <div ref={feesRef} className="text-left space-y-12 lg:space-y-24 animate-fadeIn">

            {/* Vstupné */}
            <div id="vstupne">
              <div className="flex items-center gap-4 mb-6">
                <h3 style={{ fontSize: 'var(--fs-h3)' }} className="font-bebas text-white uppercase tracking-tight font-bold leading-none">VSTUPNÉ</h3>
              </div>

              <div className="shadow-[0_0_30px_rgba(244,206,20,0.2)] relative overflow-hidden group transition-transform duration-300 hover:scale-[1.01]">
                {/* Yellow Section */}
                <div className="bg-[#F4CE14] p-8 pb-10 relative z-10">
                  {/* Decorative background accent */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                  <div className="relative z-10 flex flex-col gap-6">
                    {/* Adult Ticket */}
                    <div className="flex items-center justify-between border-b-2 border-black/10 border-dashed pb-6">
                      <div className="flex flex-col">
                        <span className="font-tech text-black/60 text-sm uppercase tracking-[0.2em] font-bold mb-1">VSTUP PRO</span>
                        <span className="font-bebas text-black text-4xl md:text-5xl uppercase tracking-tight leading-none">DOSPĚLÉ</span>
                      </div>
                      <span className="font-bebas text-6xl text-black tracking-tighter">{feeCounts.adult} KČ</span>
                    </div>

                    {/* Child Ticket */}
                    <div className="flex items-center justify-between border-b-2 border-black/10 border-dashed pb-6">
                      <div className="flex flex-col">
                        <span className="font-tech text-black/60 text-sm uppercase tracking-[0.2em] font-bold mb-1">VSTUP PRO</span>
                        <span className="font-bebas text-black text-4xl md:text-5xl uppercase tracking-tight leading-none">DĚTI <span className="text-lg opacity-60 align-top ml-1 font-tech tracking-normal">(6-15 LET)</span></span>
                      </div>
                      <span className="font-bebas text-6xl text-black tracking-tighter">{feeCounts.child} KČ</span>
                    </div>

                    {/* Family Ticket 2+1 */}
                    <div className="flex items-center justify-between border-b-2 border-black/10 border-dashed pb-6">
                      <div className="flex flex-col">
                        <span className="font-tech text-black/60 text-sm uppercase tracking-[0.2em] font-bold mb-1">ZVÝHODNĚNÉ</span>
                        <span className="font-bebas text-black text-4xl md:text-5xl uppercase tracking-tight leading-none">RODINA 2+1</span>
                      </div>
                      <span className="font-bebas text-6xl text-black tracking-tighter">{feeCounts.family21} KČ</span>
                    </div>

                    {/* Family Ticket 2+2 */}
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="font-tech text-black/60 text-sm uppercase tracking-[0.2em] font-bold mb-1">ZVÝHODNĚNÉ</span>
                        <span className="font-bebas text-black text-4xl md:text-5xl uppercase tracking-tight leading-none">RODINA 2+2</span>
                      </div>
                      <span className="font-bebas text-6xl text-black tracking-tighter">{feeCounts.family22} KČ</span>
                    </div>
                  </div>
                </div>

                {/* Black Section - Free Entry */}
                <div className="bg-black p-8 relative flex items-center justify-between border-t border-[#F4CE14]/20">
                  <div className="flex flex-col z-10">
                    <span className="font-tech text-gray-500 text-sm uppercase tracking-[0.2em] font-bold mb-1">VSTUP PRO</span>
                    <span className="font-bebas text-white text-4xl md:text-5xl uppercase tracking-tight leading-none">DĚTI DO 6 LET</span>
                  </div>
                  <span className="font-bebas text-6xl text-[#F4CE14] tracking-tighter z-10">ZDARMA</span>
                </div>
              </div>
            </div>

            {/* Startovné */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <h3 style={{ fontSize: 'var(--fs-h3)' }} className="font-bebas text-white uppercase tracking-tight font-bold leading-none">STARTOVNÉ</h3>
              </div>

              <div className="bg-white/5 border border-white/10 p-8 hover:border-[#F4CE14]/30 transition-colors shadow-2xl">
                <span className="block font-tech text-gray-400 text-sm uppercase tracking-widest mb-1 font-bold">REGISTRAČNÍ POPLATEK</span>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="font-bebas text-6xl text-[#F4CE14] tracking-tighter">{feeCounts.registration} <span className="text-3xl">KČ</span></span>
                  <span className="font-tech text-white text-xl uppercase font-bold ml-2">ZA ZÁVODNÍKA</span>
                </div>
                <p className="font-tech text-gray-400 text-sm italic border-t border-white/10 pt-4">
                  Platba možná <span className="text-white font-bold not-italic decoration-[#F4CE14] underline decoration-2 underline-offset-4">pouze předem na účet</span>.
                </p>
              </div>
            </div>

            {/* Demolition Derby Prize */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <h3 style={{ fontSize: 'var(--fs-h3)' }} className="font-bebas text-[#F4CE14] uppercase tracking-tight font-bold leading-none">DEMOLITION DERBY</h3>
              </div>

              <div className="bg-[#F4CE14]/5 border-2 border-[#F4CE14]/30 p-8 hover:border-[#F4CE14] transition-all shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#F4CE14]/10 blur-[50px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-[#F4CE14]/20 transition-colors"></div>
                <span className="block font-tech text-[#F4CE14] text-sm uppercase tracking-widest mb-1 font-bold">POSLEDNÍ POJÍZDNÝ VRAK</span>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="font-bebas text-6xl text-white tracking-tighter">10 000 <span className="text-3xl font-tech">KČ</span></span>
                  <span className="font-tech text-[#F4CE14] text-xl uppercase font-bold ml-2">VÝHRA</span>
                </div>
                <p className="font-tech text-gray-400 text-sm border-t border-white/10 pt-4">
                  Tuto finanční odměnu získá jezdec, jehož vrak zůstane <span className="text-white font-bold">jako poslední v pohybu</span>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const EventGrid = ({ liveEvents }: { liveEvents: any[] }) => {
  const eventsToDisplay = liveEvents.length > 0 ? liveEvents : EVENTS;
  const [activeId, setActiveId] = useState(eventsToDisplay[0]?.id || '1');

  // Sync activeId when liveEvents are loaded
  useEffect(() => {
    if (liveEvents.length > 0 && (activeId === '1' || !liveEvents.find(e => e.id === activeId))) {
      setActiveId(liveEvents[0].id);
    }
  }, [liveEvents]);

  return (
    <section id="kalendar" className="py-32 bg-[#111] relative">
      <div className="container mx-auto px-6">
        <div className="mb-20 text-center">
          <h2 style={{ fontSize: 'var(--fs-h2)' }} className="font-bebas font-semibold text-[#F4CE14] tracking-tight leading-none mb-2 uppercase">
            KALENDÁŘ AKCÍ 2026
          </h2>
          <p className="font-tech text-gray-400 tracking-widest uppercase text-sm md:text-base">TOHLE NESMÍŠ PROPASNOUT!</p>
          <div className="w-24 h-1 bg-[#F4CE14] mt-4 relative mx-auto">
            <div className="absolute top-0 right-0 w-4 h-full bg-white animate-pulse"></div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 h-[850px] lg:h-[600px] items-stretch">
          {eventsToDisplay.map((event) => {
            const isActive = activeId === event.id;
            return (
              <div
                key={event.id}
                onClick={() => setActiveId(event.id)}
                className={`
                  relative overflow-hidden cursor-pointer transition-all duration-500 ease-in-out will-change-[flex]
                  ${isActive ? 'lg:flex-[4] flex-[8]' : 'lg:flex-[0.5] flex-[0.8]'}
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
                    <h3 className="font-bebas !text-[22px] lg:!text-3xl text-gray-400 tracking-widest uppercase lg:-rotate-90 whitespace-nowrap group-hover:text-white transition-colors px-4 text-center leading-none">
                      {event.title} <span className="opacity-40 ml-2">{formatEventDate(event.date, true)}</span>
                    </h3>
                  </div>

                  {/* Date Badge - Visible only on active slide */}
                  <div className={`absolute top-0 left-0 z-10 transition-opacity duration-500 ${isActive ? 'opacity-100 delay-[400ms]' : 'opacity-0'}`}>
                    <div className="bg-[#F4CE14] text-black px-6 py-3 font-bebas text-2xl font-bold shadow-lg">
                      {formatEventDate(event.date, true)}
                    </div>
                  </div>

                  {/* Active Content */}
                  <div className={`
                  absolute inset-0 p-6 md:p-14 flex flex-col justify-end 
                  transition-opacity duration-500 linear
                  ${isActive ? 'opacity-100 delay-[400ms]' : 'opacity-0 delay-0 pointer-events-none'}
                `}>
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 style={{ fontSize: 'var(--fs-h4)' }} className="font-bebas text-white uppercase leading-none mb-4">{event.title}</h3>
                        <div className="flex items-center gap-3 text-gray-400 font-tech text-lg uppercase mb-8">
                          <MapPin size={20} className="text-[#F4CE14]" />
                          {event.location}
                        </div>
                      </div>
                    </div>

                    {event.id === '1' ? (
                      <div className="flex flex-row gap-2 md:gap-4">
                        <Button size="medium" className="bg-transparent border border-white text-white hover:bg-white hover:text-black flex-1 md:flex-none md:w-auto px-2 md:px-8 whitespace-nowrap">
                          Více o akci
                        </Button>
                        <Button size="medium" className="bg-[#F4CE14] text-black hover:bg-white border-0 group relative overflow-hidden flex-1 md:flex-none md:w-auto px-2 md:px-8 whitespace-nowrap">
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

const DriverRoster = ({ registeredCount, paidDrivers, liveStandings }: { registeredCount: number, paidDrivers: any[], liveStandings: any[] }) => {
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);

  // Fallback to static DRIVERS if no paid drivers yet
  const driversToDisplay = paidDrivers && paidDrivers.length > 0 ? paidDrivers : DRIVERS;

  return (
    <section id="jezdci" className="py-32 bg-black overflow-hidden relative">
      <div className="container mx-auto px-6 mb-16">
        <div className="flex flex-col md:flex-row items-start justify-between gap-8">
          <SectionHeader
            title="STARTOVNÍ ROŠT"
            subtitle={
              <span>
                PŘIHLÁŠENÍ JEZDCI DO <Typewriter words={['AKTUÁLNÍHO ZÁVODU', 'VRAKFESTU 4.4. V OSTRAVĚ']} className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
              </span>
            }
          />

          {/* Dynamic Driver Count Badge */}
          <div className="w-full md:w-auto relative bg-black/40 backdrop-blur-md border border-white/10 px-10 py-8 flex flex-col items-center group overflow-hidden hover:-translate-y-2 transition-transform duration-300">
            <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-[#F4CE14] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute bottom-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-[#F4CE14] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <p className="font-tech text-gray-500 uppercase tracking-widest font-bold mb-4 text-sm group-hover:text-[#F4CE14] transition-colors whitespace-nowrap">
              PŘIHLÁŠENÝCH
            </p>
            <p className="font-bebas text-7xl text-white group-hover:text-[#F4CE14] transition-colors font-semibold tracking-wider leading-none mb-2 whitespace-nowrap">
              {registeredCount}<span className="text-white/30 text-6xl ml-2">/ 90</span>
            </p>
            <p className="font-tech text-xs text-gray-500 tracking-[0.2em] uppercase font-bold group-hover:text-white transition-colors text-center whitespace-nowrap">JEZDCŮ</p>
          </div>
        </div>
      </div>

      <div className="w-full relative overflow-hidden">
        <div className="flex gap-6 px-6 w-max animate-driver-scroll hover:pause-off">
          {/* We repeat the drivers 3 times to ensure smooth infinite looping */}
          {[...driversToDisplay, ...driversToDisplay, ...driversToDisplay].map((driver, i) => {
            const isDynamic = 'profiles' in driver;
            let nickname = '';
            let displayName = '';
            let image = '';
            let startNumber = 0;
            let car = '';
            let points = 0;
            let wins = 0;

            if (isDynamic) {
              const d = driver as any;
              displayName = `${d.profiles?.first_name} ${d.profiles?.last_name}`;
              nickname = d.profiles?.nickname || '';
              image = d.profiles?.profile_photo_url || 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=800';
              startNumber = d.start_number;
              car = d.car_model;
              // Try to find points for this driver from liveStandings if available
              const standing = liveStandings.find(s => s.profiles?.id === d.profiles?.id || s.profiles?.email === d.profiles?.email);
              points = standing?.total_points || 0;
              wins = standing?.wins_count || 0;
            } else {
              const d = driver as Driver;
              displayName = d.name;
              image = d.image;
              startNumber = 0;
              car = d.car;
              points = d.stats.points || 0;
              wins = d.stats.wins || 0;
              const parts = d.name.split('"');
              if (parts.length >= 3) {
                nickname = parts[1];
                displayName = (parts[0] + parts[2]).replace(/\s+/g, ' ').trim();
              }
            }

            return (
              <div
                key={`${(driver as any).id || i}-${i}`}
                className="min-w-[280px] w-[280px] aspect-[4/6] relative group cursor-pointer bg-[#111] border border-white/10 hover:border-[#F4CE14] transition-all duration-300 overflow-hidden flex flex-col shadow-2xl"
                onClick={() => !isDynamic && setSelectedDriver(driver as Driver)}
              >
                {/* Car Slide-In Badge */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-[#F4CE14] px-4 py-1.5 transform -translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-30 shadow-xl rounded-b-md border-x border-b border-black/10 min-w-[120px] text-center">
                  <span className="font-tech text-black text-[9px] font-black uppercase tracking-widest whitespace-nowrap leading-none block">{car}</span>
                </div>

                <div className="flex-1 relative overflow-hidden">
                  <img
                    src={image}
                    alt={displayName}
                    className="w-full h-full object-cover grayscale opacity-80 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent opacity-90"></div>
                  <div className="absolute bottom-4 left-4 right-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    {nickname && <p className="font-tech text-[#F4CE14] text-sm tracking-widest uppercase font-bold mb-2 drop-shadow-md">"{nickname}"</p>}
                    <h4 style={{ fontSize: 'var(--fs-h4)' }} className="font-bebas text-white leading-[1.1] uppercase tracking-tight font-bold">{displayName}</h4>
                  </div>
                </div>

                <div className="p-4 grid grid-cols-3 gap-1 border-t border-white/10 bg-[#0a0a0a] group-hover:bg-[#F4CE14] transition-colors duration-300 group-hover:text-black">
                  <div className="text-center border-r border-white/10 group-hover:border-black/10">
                    <p className="font-tech min-h-[1.5em] text-[9px] text-gray-500 group-hover:text-black/60 uppercase tracking-wider font-bold leading-tight">ČÍSLO</p>
                    <p className="font-bebas text-xl text-white group-hover:text-black font-bold">{startNumber}</p>
                  </div>
                  <div className="text-center border-r border-white/10 group-hover:border-black/10">
                    <p className="font-tech min-h-[1.5em] text-[9px] text-gray-500 group-hover:text-black/60 uppercase tracking-wider font-bold leading-tight">BODY</p>
                    <p className="font-bebas text-xl text-white group-hover:text-black font-bold truncate px-1">{points}</p>
                  </div>
                  <div className="text-center px-1">
                    <p className="font-tech min-h-[1.5em] text-[9px] text-gray-500 group-hover:text-black/60 uppercase tracking-wider font-bold leading-tight">VÝHRY</p>
                    <p className="font-bebas text-xl text-white group-hover:text-black font-bold">{wins}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="container mx-auto px-6 mt-16 flex flex-col sm:flex-row justify-center gap-6">
        <Button className="bg-[#F4CE14] text-black hover:bg-white border-0 transition-all duration-300 w-full sm:w-auto">
          ZOBRAZIT VŠECHNY JEZDCE
        </Button>
        <Button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-black transition-all duration-300 w-full sm:w-auto">
          CHCI TAKY ZÁVODIT
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
                <h2 className="text-8xl font-bebas leading-[1.1] mb-6 uppercase tracking-tight font-semibold">{selectedDriver.name}</h2>
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

              <Button size="medium" className="w-full">PROHLÉDNOUT TÝM</Button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes driverScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.3333%); }
        }
        .animate-driver-scroll {
          animation: driverScroll 40s linear infinite;
        }
      `}</style>
    </section>
  );
};

const Standings = ({ liveStandings }: { liveStandings: any[] }) => {
  const [activeCategory, setActiveCategory] = useState<'do1.6L' | 'nad1.6L' | 'zeny'>('do1.6L');

  const categoryLabels = {
    'do1.6L': 'DO 1.6 L',
    'nad1.6L': 'NAD 1.6 L',
    'zeny': 'ŽENY'
  };

  // Filter and sort drivers by category and points (highest first)
  const filteredDrivers = (liveStandings && liveStandings.length > 0)
    ? liveStandings
      .map(s => ({
        startNumber: 0, // Placeholder
        name: `${s.profiles?.first_name} ${s.profiles?.last_name}`.toUpperCase(),
        car: 'VRAK', // Placeholder
        points: s.total_points,
        category: 'do1.6L' // Placeholder
      }))
      .filter(driver => driver.category === activeCategory)
      .sort((a, b) => b.points - a.points)
    : STANDINGS
      .filter(driver => driver.category === activeCategory)
      .sort((a, b) => b.points - a.points);

  return (
    <section id="poradi" className="py-32 bg-[#0a0a0a] relative">
      <div className="absolute left-0 top-0 h-full w-px bg-white/5"></div>
      <div className="container mx-auto px-6">
        <div className="mb-20 text-center">
          <h2 style={{ fontSize: 'var(--fs-h2)' }} className="font-bebas font-semibold text-[#F4CE14] tracking-tight leading-none mb-2 uppercase">
            BODOVÉ POŘADÍ
          </h2>
          <p className="font-tech text-gray-400 tracking-widest uppercase text-sm md:text-base">STAV SEZÓNY 2025</p>
          <div className="w-24 h-1 bg-[#F4CE14] mt-4 relative mx-auto">
            <div className="absolute top-0 right-0 w-4 h-full bg-white animate-pulse"></div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-row justify-center gap-2 md:gap-6 mb-12 md:mb-16 w-full">
          {(Object.keys(categoryLabels) as Array<keyof typeof categoryLabels>).map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`relative flex-1 px-2 py-4 md:px-8 md:py-3 transition-all duration-300 group ${activeCategory === category ? 'z-10' : 'z-0'}`}
            >
              <div className={`absolute inset-0 transform -skew-x-[15deg] border-2 transition-all duration-300 ${activeCategory === category
                ? 'bg-[#F4CE14] border-[#F4CE14] shadow-[0_0_20px_rgba(244,206,20,0.4)]'
                : 'bg-transparent border-white/20 group-hover:border-[#F4CE14]/50'
                }`}></div>
              <span className={`relative font-tech font-bold text-sm md:text-[20px] uppercase tracking-wider transition-colors duration-300 whitespace-nowrap ${activeCategory === category ? 'text-black' : 'text-gray-400 group-hover:text-white'}`}>
                {categoryLabels[category]}
              </span>
            </button>
          ))}
        </div>


        {/* Standings Table */}
        <div className="max-w-7xl mx-auto">
          {/* Table Header */}
          <div className="grid grid-cols-[50px_1.5fr_1.5fr_50px] md:grid-cols-[120px_2fr_2fr_140px] gap-2 md:gap-12 px-2 md:px-8 py-4 bg-black/60 border-b-2 border-[#F4CE14] mb-2">
            <div className="font-tech text-[10px] md:text-xs text-[#F4CE14] uppercase tracking-[0.1em] md:tracking-[0.3em] font-bold text-left">ST.Č</div>
            <div className="font-tech text-[10px] md:text-xs text-[#F4CE14] uppercase tracking-[0.1em] md:tracking-[0.3em] font-bold text-left">JEZDEC</div>
            <div className="font-tech text-[10px] md:text-xs text-[#F4CE14] uppercase tracking-[0.1em] md:tracking-[0.3em] font-bold text-left">AUTO</div>
            <div className="font-tech text-[10px] md:text-xs text-[#F4CE14] uppercase tracking-[0.1em] md:tracking-[0.3em] font-bold text-left md:text-right">BODY</div>
          </div>

          {/* Scrollable Table Rows - Max 10 visible */}
          <div className="space-y-2 max-h-[700px] overflow-y-auto pr-2 custom-scrollbar" data-lenis-prevent>
            {filteredDrivers.map((driver, index) => (
              <div
                key={driver.startNumber}
                className={`grid grid-cols-[50px_1.5fr_1.5fr_50px] md:grid-cols-[120px_2fr_2fr_140px] gap-2 md:gap-12 px-2 md:px-8 py-3 md:py-6 transition-all duration-300 border mb-2 md:mb-0 md:border-2 ${index === 0
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
                  <span className={`font-bebas text-xl md:text-3xl ${index === 0 ? 'text-[#F4CE14]' : 'text-white'}`}>
                    #{driver.startNumber}
                  </span>
                </div>

                {/* Driver Name */}
                <div className="flex items-center overflow-hidden">
                  <span className={`font-bebas text-lg md:text-2xl uppercase tracking-tight truncate ${index === 0 ? 'text-white' : 'text-gray-300'}`}>
                    {driver.name}
                  </span>
                </div>

                {/* Car */}
                <div className="flex items-center">
                  <span className="font-tech text-[10px] md:text-sm text-gray-400 uppercase tracking-wider">
                    {driver.car}
                  </span>
                </div>

                {/* Points */}
                <div className="flex items-center justify-center md:justify-end">
                  <span className={`font-bebas text-lg md:text-4xl text-center md:text-right w-full ${index === 0 ? 'text-[#F4CE14]' : 'text-white'}`}>
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

const TriviaSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      text: "Výhra v Demolition Derby je 10 000 Kč pro posledního v pohybu!",
      image: "/media/DSC_0871.jpg"
    },
    {
      text: "Vrakfestu se může zúčastnit každý starší 18 let se svým upraveným vrakem.",
      image: "/media/DSC_4209.jpg"
    },
    {
      text: "Po hlavním závodu následuje hromadná demolice zbylých pojízdných aut.",
      image: "/media/DSC_0655.jpg"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative aspect-square overflow-hidden shadow-[0_0_10px_rgba(0,0,0,0.5)] group bg-black animate-fadeIn">
      {slides.map((slide, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 p-8 md:p-12 flex flex-col justify-center items-center text-center transition-all duration-[1200ms] cubic-bezier(0.4, 0, 0.2, 1) will-change-[opacity,transform] ${currentSlide === idx
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-0 scale-105 translate-y-4 pointer-events-none'
            }`}
        >
          <img
            src={slide.image}
            className="absolute inset-0 w-full h-full object-cover grayscale brightness-[0.2] -z-10"
            alt=""
          />

          <div className="relative z-10 w-full">
            <div className={`transition-all duration-[1200ms] delay-200 will-change-[opacity,transform] ${currentSlide === idx ? 'translate-y-0 opacity-100' : '-translate-y-6 opacity-0'
              }`}>
              <span className="font-bebas text-[#F4CE14] text-4xl md:text-5xl lg:text-7xl tracking-tight uppercase drop-shadow-[0_0_15px_rgba(244,206,20,0.4)] font-bold block mb-2">
                Věděli jste, že...?
              </span>
              <div className="w-16 h-1 bg-[#F4CE14] mx-auto mb-8 shadow-[0_0_10px_#F4CE14]"></div>
            </div>

            <p className={`font-tech text-white text-lg md:text-2xl uppercase font-bold tracking-tight leading-snug max-w-sm mx-auto transition-all duration-[1200ms] delay-400 will-change-[opacity,transform] ${currentSlide === idx ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
              }`}>
              {slide.text}
            </p>
          </div>
        </div>
      ))}

      {/* Dynamic Progress Bars */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-3 z-10">
        {slides.map((_, idx) => (
          <div
            key={idx}
            className="h-1 bg-white/10 w-12 overflow-hidden relative"
          >
            {currentSlide === idx && (
              <div className="absolute inset-0 bg-[#F4CE14] animate-progress-timer origin-left shadow-[0_0_8px_#F4CE14]"></div>
            )}
          </div>
        ))}
      </div>

      {/* Tech Grid Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#F4CE14_1px,transparent_1px)] [background-size:24px_24px]"></div>

      {/* Corner Brackets */}
      <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-[#F4CE14]/50"></div>
      <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-[#F4CE14]/50"></div>
      <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-[#F4CE14]/50"></div>
      <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-[#F4CE14]/50"></div>

      <style>{`
        @keyframes progress-timer {
          0% { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }
        .animate-progress-timer {
          animation: progress-timer 10s linear forwards;
        }
      `}</style>
    </div>
  );
};

const RulesAndSpecs = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const [activeItem, setActiveItem] = useState<number | null>(0);
  const [lastActiveItem, setLastActiveItem] = useState(0);

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
            "Nad 1600ccm",
            "Ženy"
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
          image: "/media/povolene%20upravy/kapota-768x480.png"
        },
        {
          title: "DOPORUČENÉ VYSTUŽENÍ INTERIÉRU",
          content: [
            "Doporučené vystužení interiéru vozu, použití rámu (viz foto).",
            "Možnost omotání A,B sloupků pro zvýšení tuhosti karoserie."
          ],
          image: "/media/povolene%20upravy/R%C3%A1m-sloupky-768x507.png"
        },
        {
          title: "POVOLENÁ VÝZTUHA BOČNÍ",
          content: [
            "Povolená výztuha boční (Řidičovy strany!) Např.: hardox, jekl, roxor apod."
          ],
          image: "/media/povolene%20upravy/vystuha-dve%C5%99e-1024x682.png"
        },
        {
          title: "POVOLENÉ ÚPRAVY V MOTOROVÉM PROSTORU",
          content: [
            "Povolené úpravy v motorovém prostoru, tzn. úpravy od stěny chladiče po vystužení deformační zóny.",
            "Za nárazníkem a blatníky nesmí být umístěno nic.",
            "Všechny skla kromě čelního musí být odstraněny!"
          ],
          image: "/media/povolene%20upravy/Motorovy-prostor.png"
        }
      ]
    }
  ];

  const handleItemClick = (categoryIdx: number, itemIdx: number) => {
    if (activeCategory === categoryIdx && activeItem === itemIdx) {
      setActiveItem(null);
    } else {
      setActiveCategory(categoryIdx);
      setActiveItem(itemIdx);
      setLastActiveItem(itemIdx);
      setTimeout(() => {
        const el = document.getElementById(`rule-item-${categoryIdx}-${itemIdx}`);
        if (el) {
          const headerOffset = 85;
          const elementPosition = el.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
      }, 600);
    }
  };

  const currentImage = rulesData[activeCategory]?.items[activeItem ?? 0]?.image || rulesData[0].items[0].image;

  return (
    <section id="pravidla" className="py-32 bg-[#0a0a0a] relative">
      <div className="absolute left-0 top-0 h-full w-px bg-white/5"></div>
      <div className="container mx-auto px-6 text-left">
        <SectionHeader
          title={<>PRAVIDLA <span className="text-white">& POVOLENÉ ÚPRAVY</span></>}
          subtitle="PRAVIDLA JSOU OD TOHO, ABY SE DODRŽOVALA."
          align="center"
        />

        <div className="space-y-24">
          {rulesData.map((section, categoryIdx) => {
            const isImageRight = categoryIdx % 2 === 0;

            return (
              <div key={categoryIdx} className="space-y-8">
                {/* Category Header */}
                <h3 style={{ fontSize: 'var(--fs-h3)' }} className="font-bebas text-white tracking-tight uppercase font-bold border-b-2 border-[#F4CE14]/30 pb-4">
                  {section.category}
                </h3>

                {/* Two-column layout with alternating image position */}
                <div className={`grid lg:grid-cols-2 gap-12 items-stretch`}>
                  {/* Rules/Specs List */}
                  <div className={`space-y-3 ${!isImageRight ? 'lg:order-2' : 'lg:order-1'}`}>
                    {section.items.map((item, itemIdx) => {
                      // Show first item of each category as active, or the clicked item
                      const isActive = activeCategory === categoryIdx && activeItem === itemIdx;
                      return (
                        <div
                          key={itemIdx}
                          id={`rule-item-${categoryIdx}-${itemIdx}`}
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
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold font-tech shrink-0 transition-all duration-300 ${isActive ? 'bg-[#F4CE14] text-black shadow-[0_0_10px_#F4CE14]' : 'bg-white/10 text-gray-500 group-hover:bg-white/20 group-hover:text-gray-300'
                                  }`}
                              >
                                {String(itemIdx + 1).padStart(2, '0')}
                              </div>
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
                            className={`overflow-hidden transition-all duration-500 ease-in-out ${isActive ? 'max-h-[6000px] opacity-100' : 'max-h-0 opacity-0'
                              }`}
                          >
                            <div className="px-16 pb-8 text-gray-400 font-tech text-sm leading-relaxed border-t border-white/5 pt-6">
                              <ul className="space-y-3">
                                {item.content.map((line, idx) => (
                                  <li key={idx} className="flex gap-3">
                                    <span className="text-[#F4CE14] flex-shrink-0">•</span>
                                    <span style={{ fontSize: 'var(--fs-p)' }}>{line}</span>
                                  </li>
                                ))}
                              </ul>

                              {/* Mobile Image - Shown below content when expanded (ONLY for Modifications) */}
                              {categoryIdx !== 0 && (
                                <div className="lg:hidden mt-8 relative group overflow-hidden border-2 border-white/10 hover:border-[#F4CE14]/40 transition-all duration-700 shadow-2xl">
                                  <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-[300px] object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                                  <div className="absolute bottom-0 left-0 right-0 p-6">
                                    <div className="font-bebas text-2xl text-white uppercase tracking-tight">
                                      {item.title}
                                    </div>
                                  </div>
                                </div>
                              )}

                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className={`${!isImageRight ? 'lg:order-1' : 'lg:order-2'} hidden lg:block`}>
                    <div className="sticky top-28 self-start">
                      {categoryIdx === 0 ? (
                        <TriviaSlider />
                      ) : (
                        <div className={`relative group overflow-hidden border-4 border-white/10 hover:border-[#F4CE14]/40 transition-all duration-500 shadow-2xl ${activeCategory === categoryIdx && activeItem === null ? 'opacity-0 translate-y-4 pointer-events-none' : 'opacity-100 translate-y-0'
                          }`}>
                          <img
                            key={activeCategory === categoryIdx ? rulesData[categoryIdx].items[activeItem ?? lastActiveItem].image : section.items[0].image}
                            src={activeCategory === categoryIdx ? rulesData[categoryIdx].items[activeItem ?? lastActiveItem].image : section.items[0].image}
                            alt="Pravidla a specifikace"
                            className="w-full h-[600px] object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 animate-fadeIn"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                          <div className="absolute bottom-0 left-0 right-0 p-8">
                            <div className="font-tech text-xs text-[#F4CE14] tracking-[0.3em] uppercase mb-2">
                              {section.category}
                            </div>
                            <div className="font-bebas text-4xl text-white uppercase tracking-tight">
                              {activeCategory === categoryIdx ? rulesData[categoryIdx].items[activeItem ?? lastActiveItem].title : section.items[0].title}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Mobile Trivia Slider (between sections) */}
                {categoryIdx === 0 && (
                  <div className="lg:hidden mt-8">
                    <TriviaSlider />
                  </div>
                )}
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
  const [activeEvent, setActiveEvent] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    nickname: '',
    age: '',
    email: '',
    phone: '',
    startNumber: '',
    carModel: '',
    teamName: '',
    category: '',
    city: '',
    password: '',
    photo: null as File | null,
    consentGdpr: false,
    consentRules: false,
    consentAge: false,
    websiteUrl: '' // Honeypot field (bots will fill this)
  });
  const [startNumberError, setStartNumberError] = useState('');

  // Debounced start number check
  useEffect(() => {
    const checkNumber = async () => {
      if (!formData.startNumber || !activeEvent) return;

      const num = parseInt(formData.startNumber);

      // 1. Check static standings first (legacy/hardcoded data)
      const existsInStatic = STANDINGS.some(d => d.startNumber === num);
      if (existsInStatic) {
        setStartNumberError('Toto startovní číslo je již obsazené v historických tabulkách!');
        return;
      }

      // 2. Check live registrations for the active event
      const { data, error } = await supabase
        .from('registrations')
        .select('id')
        .eq('event_id', activeEvent.id)
        .eq('start_number', num)
        .limit(1);

      if (data && data.length > 0) {
        setStartNumberError('Toto číslo je už pro tento závod obsazené!');
      } else {
        setStartNumberError('');
      }
    };

    const timer = setTimeout(checkNumber, 500);
    return () => clearTimeout(timer);
  }, [formData.startNumber, activeEvent]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, photo: e.target.files![0] }));
    }
  };

  useEffect(() => {
    const fetchActiveEvent = async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('is_active', true)
        .order('date', { ascending: true })
        .limit(1)
        .single();

      if (data && !error) {
        setActiveEvent(data);
      }
    };
    fetchActiveEvent();
  }, []);

  const handleRegistration = async () => {
    // 0. Honeypot check: If the hidden field is filled, it's a bot
    if (formData.websiteUrl) {
      console.warn('Bot detected via honeypot!');
      setStep(5); // Show success to bot so they don't try other ways
      return;
    }

    if (startNumberError) {
      alert(startNumberError);
      return;
    }

    setLoading(true);
    try {
      const normalizedEmail = formData.email.trim().toLowerCase();
      console.log('Starting registration for address:', normalizedEmail);

      let userId = '';

      // 1. Initial Check: Does this email already have a profile?
      // (This avoids Auth rate limits during testing)
      const { data: profiles, error: lookupError } = await supabase
        .from('profiles')
        .select('id')
        .ilike('email', normalizedEmail);

      if (lookupError) {
        console.error('Profile lookup error:', lookupError);
      }

      if (profiles && profiles.length > 0) {
        console.log('Found existing profile, skipping signUp. ID:', profiles[0].id);
        userId = profiles[0].id;
      } else {
        // 2. Sign Up User if they don't exist
        console.log('Profile not found for', normalizedEmail, '- attempting signUp...');
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email: normalizedEmail,
          password: formData.password,
          options: {
            data: {
              first_name: formData.firstName,
              last_name: formData.lastName,
              nickname: formData.nickname,
            }
          }
        });

        if (authError) {
          console.error('Auth Error during signUp:', authError);
          // Special handling for rate limit during iterative testing
          if (authError.message.toLowerCase().includes('rate limit')) {
            throw new Error(`Limit pro odesílání e-mailů vyčerpán pro: ${normalizedEmail}. Pokud používáte novou adresu, prosím počkejte chvíli nebo VYPNĚTE potvrzování e-mailem v Supabase dashboardu (Authentication -> Providers -> Email -> Confirm email).`);
          }
          throw authError;
        }

        if (authData.user) {
          userId = authData.user.id;
        }
      }

      if (!userId) throw new Error('Registrace se nezdařila - uživatel nebyl vytvořen ani nalezen.');
      console.log('Using userId:', userId);

      // 2. Upload Photo (if exists)
      let photoUrl = '';
      if (formData.photo) {
        try {
          const fileExt = formData.photo.name.split('.').pop();
          const fileName = `${userId}-${Date.now()}.${fileExt}`;
          const { error: uploadError } = await supabase.storage
            .from('driver-photos')
            .upload(fileName, formData.photo);

          if (uploadError) throw uploadError;

          const { data: publicUrlData } = supabase.storage
            .from('driver-photos')
            .getPublicUrl(fileName);

          photoUrl = publicUrlData.publicUrl;
          console.log('Photo uploaded:', photoUrl);
        } catch (err) {
          console.error('Photo Upload Error:', err);
        }
      }

      // 3. Create/Update Profile
      console.log('Upserting profile...');
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
          id: userId,
          first_name: formData.firstName,
          last_name: formData.lastName,
          nickname: formData.nickname,
          email: normalizedEmail,
          phone: formData.phone,
          age: parseInt(formData.age),
          city: formData.city,
          profile_photo_url: photoUrl
        });

      if (profileError) {
        console.error('Profile Upsert Error:', profileError);
        throw profileError;
      }

      // 4. Create Registration
      console.log('Inserting registration...');
      const { error: regError } = await supabase
        .from('registrations')
        .insert({
          profile_id: userId,
          event_id: activeEvent?.id || '00000000-0000-0000-0000-000000000000',
          start_number: parseInt(formData.startNumber),
          car_model: formData.carModel,
          team_name: formData.teamName,
          category: formData.category, // e.g. 'do1.6L'
          variable_symbol: '44' + Math.floor(Math.random() * 900000 + 100000),
          consent_gdpr: formData.consentGdpr,
          consent_rules: formData.consentRules,
          consent_age: formData.consentAge
        });

      if (regError) {
        console.error('Registration Insert Error:', regError);
        if (regError.code === '23505') {
          throw new Error('Toto startovní číslo je již pro tento závod obsazené. Prosím, vraťte se o krok zpět a zvolte jiné.');
        }
        throw regError;
      }

      console.log('Registration successful!');
      setStep(5);
    } catch (error: any) {
      console.error('Registration Process Failed:', error);
      alert('Chyba: ' + (error.message || 'Něco se nepovedlo při ukládání dat.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="registrace" className="py-32 bg-white text-black relative">
      {/* Racing Flag Border Top */}
      <div
        className="absolute top-0 left-0 w-full h-8 z-10 shadow-lg"
        style={{
          backgroundImage: `
            conic-gradient(#000 0.25turn, #fff 0.25turn 0.5turn, #000 0.5turn 0.75turn, #fff 0.75turn)
          `,
          backgroundSize: '32px 32px'
        }}
      ></div>

      <div className="container mx-auto px-6 max-w-4xl text-left">
        <div className="mb-8 md:mb-20 text-center">
          <h2 style={{ fontSize: 'var(--fs-h2)' }} className="font-bebas mb-12 tracking-tight leading-none uppercase font-semibold text-black">REGISTRACE JEZDCE</h2>

          {/* Progress Bar */}
          <div className="relative flex items-center justify-center gap-10 md:gap-24 px-4 md:px-16">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[calc(100%-110px)] md:w-[calc(100%-128px)] h-1 bg-gray-100 -z-10 -translate-y-1/2"></div>
            <div className="absolute top-1/2 left-[55px] md:left-[64px] h-1 bg-[#F4CE14] transition-all duration-700 -z-10 -translate-y-1/2" style={{ width: `calc(${(step - 1) * 33.333}% - ${step === 1 ? 0 : 0}px)` }}></div>

            {[
              { num: 1, label: 'OSOBNÍ ÚDAJE' },
              { num: 2, label: 'VOZIDLO' },
              { num: 3, label: 'PLATBA' },
              { num: 4, label: 'DOKONČENÍ' },
              { num: 5, label: 'HOTOVO' }
            ].map(item => (
              <div key={item.num} className="flex flex-col items-center">
                <div className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center font-tech font-semibold text-lg md:text-xl transition-all duration-500 ${step >= item.num ? 'bg-[#F4CE14] scale-110 shadow-[0_0_30px_rgba(244,206,20,0.6)] border-4 border-white' : 'bg-gray-100 text-gray-400'}`}>
                  {step > item.num || step === 5 && item.num === 5 ? <CheckCircle className="w-6 h-6 md:w-7 md:h-7" /> : item.num}
                </div>
                <span className="mt-4 font-tech text-[10px] md:text-xs text-gray-400 tracking-wider md:tracking-[0.4em] uppercase font-bold text-center max-w-[90px] md:max-w-none">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="font-tech text-xl">
          {/* STEP 1: Personal Information */}
          {step === 1 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="grid grid-cols-2 gap-4 md:gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-2 tracking-wider">Jméno *</label>
                  {/* Honeypot field - hidden from humans */}
                  <div style={{ display: 'none', visibility: 'hidden' }}>
                    <input
                      type="text"
                      name="websiteUrl"
                      value={formData.websiteUrl}
                      onChange={handleInputChange}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full border-2 border-gray-200 px-4 py-3 outline-none focus:border-[#F4CE14] transition-colors bg-white text-black font-normal text-base"
                    placeholder="Jméno"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-2 tracking-wider">Příjmení *</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full border-2 border-gray-200 px-4 py-3 outline-none focus:border-[#F4CE14] transition-colors bg-white text-black font-normal text-base"
                    placeholder="Příjmení"
                    required
                  />
                </div>
              </div>


              <div className="grid grid-cols-2 gap-4 md:gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-2 tracking-wider">Tvoje přezdívka *</label>
                  <input
                    type="text"
                    name="nickname"
                    value={formData.nickname}
                    onChange={handleInputChange}
                    className="w-full border-2 border-gray-200 px-4 py-3 outline-none focus:border-[#F4CE14] transition-colors bg-white text-black font-normal text-base"
                    placeholder="Např. Drtič"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-2 tracking-wider">Věk *</label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    min="18"
                    max="99"
                    className="w-full border-2 border-gray-200 px-4 py-3 outline-none focus:border-[#F4CE14] transition-colors bg-white text-black font-normal text-base"
                    placeholder="Věk (musí být 18+)"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 md:gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-2 tracking-wider">E-mail *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full border-2 border-gray-200 px-4 py-3 outline-none focus:border-[#F4CE14] transition-colors bg-white text-black font-normal text-base"
                    placeholder="E-mail"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-2 tracking-wider">Mobil *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full border-2 border-gray-200 px-4 py-3 outline-none focus:border-[#F4CE14] transition-colors bg-white text-black font-normal text-base"
                    placeholder="Mobil"
                    required
                  />
                </div>
              </div>

              <Button onClick={() => setStep(2)} className="w-full mt-8 bg-[#F4CE14] text-black hover:!bg-black hover:!text-[#F4CE14] transition-colors border-0">
                POKRAČOVAT →
              </Button>
            </div>
          )}

          {/* STEP 2: Vehicle Information */}
          {step === 2 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="grid grid-cols-[1fr_2fr] gap-4 md:gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-2 tracking-wider">Startovní číslo *</label>
                  <input
                    type="number"
                    name="startNumber"
                    value={formData.startNumber}
                    onChange={handleInputChange}
                    className={`w-full border-2 px-4 py-3 outline-none transition-colors bg-white text-black font-normal text-base ${startNumberError ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-[#F4CE14]'}`}
                    placeholder="Startovní číslo"
                    required
                  />
                  {startNumberError && <p className="text-red-500 text-xs font-bold mt-1 uppercase tracking-wider">{startNumberError}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-2 tracking-wider">Typ závodního vozu *</label>
                  <input
                    type="text"
                    name="carModel"
                    value={formData.carModel}
                    onChange={handleInputChange}
                    className="w-full border-2 border-gray-200 px-4 py-3 outline-none focus:border-[#F4CE14] transition-colors bg-white text-black font-normal text-base"
                    placeholder="Např. Škoda Fabia"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase mb-2 tracking-wider">Kategorie *</label>
                <div className="grid grid-cols-3 gap-2 md:gap-4">
                  {[
                    { value: 'do1.6L', label: 'DO 1,6L' },
                    { value: 'nad1.6L', label: 'NAD 1,6L' },
                    { value: 'zeny', label: 'ŽENY' }
                  ].map(cat => (
                    <div
                      key={cat.value}
                      onClick={() => setFormData(prev => ({ ...prev, category: cat.value }))}
                      className={`border-2 py-2 px-1 md:p-4 cursor-pointer transition-all text-center font-bold text-[14px] md:text-base ${formData.category === cat.value
                        ? 'border-[#F4CE14] bg-[#F4CE14]/10'
                        : 'border-gray-200 hover:border-[#F4CE14]/50'
                        }`}
                    >
                      {cat.label}
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 md:gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-2 tracking-wider">Odkud jsi? *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full border-2 border-gray-200 px-4 py-3 outline-none focus:border-[#F4CE14] transition-colors bg-white text-black font-normal text-base"
                    placeholder="Odkud jsi?"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase mb-2 tracking-wider">Za jaký tým jedeš?</label>
                  <input
                    type="text"
                    name="teamName"
                    value={formData.teamName}
                    onChange={handleInputChange}
                    className="w-full border-2 border-gray-200 px-4 py-3 outline-none focus:border-[#F4CE14] transition-colors bg-white text-black font-normal text-base"
                    placeholder="Název tvého týmu"
                  />
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <Button variant="outline" onClick={() => setStep(1)} className="w-16 border-2 border-black text-black hover:!bg-black hover:!text-[#F4CE14] transition-colors flex items-center justify-center px-0">
                  <ArrowLeft size={24} />
                </Button>
                <Button onClick={() => setStep(3)} className="flex-1 bg-[#F4CE14] text-black hover:!bg-black hover:!text-[#F4CE14] transition-colors border-0">
                  POKRAČOVAT →
                </Button>
              </div>
            </div>
          )}

          {/* STEP 3: Consent and Payment */}
          {/* STEP 3: Payment */}
          {step === 3 && (
            <div className="space-y-8 animate-fadeIn">
              {/* Payment Information Box */}
              <div className="border-4 border-dashed border-red-500 bg-red-50/50 p-6 md:p-10 relative overflow-hidden group mb-12">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rotate-45 translate-x-16 -translate-y-16"></div>

                <h3 className="font-bebas text-4xl text-center mb-8 uppercase tracking-tight text-red-600">
                  PLATBA STARTOVNÉHO:<br />
                  <span className="text-2xl text-black">(POUZE PŘEDEM!)</span>
                </h3>

                <div className="flex flex-col md:flex-row items-center gap-10">
                  <div className="flex-1 space-y-4 text-center md:text-left font-bold">
                    <div>
                      <p className="font-tech text-gray-500 text-[10px] uppercase tracking-widest mb-1">Číslo účtu:</p>
                      <p className="font-bebas text-3xl md:text-4xl text-black tracking-tight underline decoration-[#F4CE14] decoration-4 underline-offset-4">2402064559/0600</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="font-tech text-gray-500 text-[10px] uppercase tracking-widest mb-1">Částka:</p>
                        <p className="font-bebas text-3xl text-red-600">2000 Kč</p>
                      </div>
                      <div>
                        <p className="font-tech text-gray-500 text-[10px] uppercase tracking-widest mb-1">Var. symbol:</p>
                        <p className="font-bebas text-3xl text-black">442026</p>
                      </div>
                    </div>

                    <div>
                      <p className="font-tech text-gray-500 text-[10px] uppercase tracking-widest mb-1">Poznámka pro příjemce:</p>
                      <p className="font-tech text-base md:text-lg bg-black text-white px-4 py-2 inline-block">VRAKFEST a „Vaše jméno"</p>
                    </div>
                  </div>

                  {/* QR Code Section */}
                  <div className="w-full md:w-auto flex flex-col items-center">
                    <div className="bg-white p-4 shadow-xl border-2 border-gray-100 group-hover:border-[#F4CE14] transition-colors duration-500 relative">
                      <img
                        src="/qr_payment_demo_1770476385305.png"
                        alt="QR Platba Demo"
                        className="w-40 h-40 md:w-48 md:h-48"
                      />
                      <div className="absolute inset-0 border-4 border-transparent group-hover:border-[#F4CE14]/20 pointer-events-none transition-all duration-500"></div>
                    </div>
                    <p className="font-tech text-[10px] text-gray-400 mt-4 uppercase tracking-[0.2em] font-bold">QR PLATBA (DEMO)</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <Button variant="outline" onClick={() => setStep(2)} className="w-16 border-2 border-black text-black hover:!bg-black hover:!text-[#F4CE14] transition-colors flex items-center justify-center px-0">
                  <ArrowLeft size={24} />
                </Button>
                <Button onClick={() => setStep(4)} className="flex-1 bg-[#F4CE14] text-black hover:!bg-black hover:!text-[#F4CE14] transition-colors border-0">
                  MÁM ZAPLACENO, POKRAČOVAT →
                </Button>
              </div>
            </div>
          )}

          {/* STEP 4: Finalization */}
          {step === 4 && (
            <div className="space-y-8 animate-fadeIn">
              {/* Photo Upload & Password Section */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider">Profilová fotografie *</label>

                <div className="grid grid-cols-2 md:grid-cols-[240px_1fr] gap-4 md:gap-6 items-start">
                  <div>
                    <label className="block w-full aspect-square cursor-pointer bg-white border-2 border-gray-200 hover:border-[#F4CE14] text-center flex flex-col items-center justify-center transition-colors group p-2 md:p-4">
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                      {formData.photo ? (
                        <div className="w-full h-full relative">
                          <img
                            src={URL.createObjectURL(formData.photo)}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="text-white text-[10px] font-bold uppercase">Změnit fotku</span>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-2 md:gap-3 text-gray-400 group-hover:text-black transition-colors">
                          <svg className="w-6 h-6 md:w-8 md:h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><circle cx="9" cy="9" r="2" /><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" /></svg>
                          <span className="font-bold uppercase tracking-widest text-[9px] md:text-[10px] leading-tight">Nahrát<br />fotku</span>
                        </div>
                      )}
                    </label>
                  </div>

                  <div className="contents md:flex md:flex-col md:gap-4">
                    <p className="text-xs text-gray-500 leading-relaxed pt-1 md:pt-0">
                      Nahrajte prosím fotografii pro váš profil jezdce. Může se jednat o fotku obličeje, celé postavy v kombinéze nebo třeba jen vašeho závodního speciálu. Maximální velikost 5MB, doporučený formát na výšku 4:3.
                    </p>

                    <div className="col-span-2 md:col-span-1">
                      <label className="block text-xs font-bold text-gray-600 uppercase mb-2 tracking-wider">Heslo do aplikace *</label>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full border-2 border-gray-200 px-4 py-3 outline-none focus:border-[#F4CE14] transition-colors bg-white text-black font-normal text-base"
                        placeholder="Nastavte si heslo"
                        required
                      />
                      <p className="text-xs text-gray-400 mt-2">
                        Slouží pro přihlášení do mobilní aplikace.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Consent Checkboxes */}
              <div className="space-y-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="consentAge"
                    checked={formData.consentAge}
                    onChange={handleInputChange}
                    className="mt-1 w-5 h-5 accent-[#F4CE14]"
                    required
                  />
                  <span className="text-sm">
                    <strong>Prohlášení o plnoletosti: *</strong><br />
                    Čestně prohlašuji, že v termín konání závodu jsem starší 18 let.
                  </span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="consentRules"
                    checked={formData.consentRules}
                    onChange={handleInputChange}
                    className="mt-1 w-5 h-5 accent-[#F4CE14]"
                    required
                  />
                  <span className="text-sm">
                    <strong>Souhlas s pravidly: *</strong><br />
                    Čestně prohlašuji, že jsem si přečetl <a href="#pravidla" className="text-black font-bold underline hover:text-[#F4CE14] transition-colors">pravidla závodu</a>, souhlasím s nimi a budu je dodržovat.
                  </span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="consentGdpr"
                    checked={formData.consentGdpr}
                    onChange={handleInputChange}
                    className="mt-1 w-5 h-5 accent-[#F4CE14]"
                    required
                  />
                  <span className="text-sm">
                    <strong>Ochrana osobních údajů: *</strong><br />
                    Souhlasím se zpracováním osobních údajů pro účely registrace a účasti v závodě.
                  </span>
                </label>
              </div>

              <div className="flex gap-4 mt-8">
                <Button variant="outline" onClick={() => setStep(3)} className="w-16 border-2 border-black text-black hover:!bg-black hover:!text-[#F4CE14] transition-colors flex items-center justify-center px-0">
                  <ArrowLeft size={24} />
                </Button>
                <Button
                  onClick={handleRegistration}
                  disabled={loading || !formData.consentGdpr || !formData.consentRules || !formData.consentAge || !formData.password || !formData.photo}
                  className={`flex-1 ${loading ? 'bg-gray-400' : 'bg-green-600'} text-white hover:!bg-black hover:!text-[#F4CE14] transition-colors border-0 font-bold`}
                >
                  {loading ? 'ZPRACOVÁVÁM...' : '🏁 ZAREGISTROVAT'}
                </Button>
              </div>
            </div>
          )}

          {/* STEP 5: Success State */}
          {step === 5 && (
            <div className="space-y-8 animate-fadeIn py-10 text-center">
              <div className="flex justify-center mb-8">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-green-600 animate-bounce">
                  <CheckCircle size={64} strokeWidth={2.5} />
                </div>
              </div>

              <h3 className="font-bebas text-5xl text-black tracking-tight uppercase">REGISTRACE ÚSPĚŠNÁ!</h3>
              <p className="font-tech text-gray-500 max-w-lg mx-auto leading-relaxed">
                Vaše registrace byla přijata a právě se zpracovává. Na váš e-mail <span className="text-black font-bold">{formData.email}</span> jsme zaslali potvrzení s instrukcemi k platbě.
              </p>

              <div className="bg-gray-50 p-8 border-2 border-dashed border-gray-200">
                <p className="font-tech text-xs text-gray-400 uppercase tracking-widest mb-4">Platební rekapitulace</p>
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-end border-b border-gray-100 pb-2">
                    <span className="font-tech text-xs text-gray-500 uppercase">Variabilní symbol:</span>
                    <span className="font-bebas text-2xl">442026</span>
                  </div>
                  <div className="flex justify-between items-end border-b border-gray-100 pb-2">
                    <span className="font-tech text-xs text-gray-500 uppercase">K úhradě:</span>
                    <span className="font-bebas text-2xl text-red-600">2 000 Kč</span>
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <Button onClick={() => setStep(1)} variant="outline" className="w-full border-2 border-black text-black">
                  ZPĚT NA ZAČÁTEK
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Racing Flag Border Bottom */}
      <div
        className="absolute bottom-0 left-0 w-full h-8 z-10 shadow-lg"
        style={{
          backgroundImage: `
            conic-gradient(#000 0.25turn, #fff 0.25turn 0.5turn, #000 0.5turn 0.75turn, #fff 0.75turn)
          `,
          backgroundSize: '32px 32px'
        }}
      ></div >
    </section >
  );
};




const DriverInfoAndCTA = () => {
  return (
    <section className="py-24 bg-black relative border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-stretch">
          {/* Left Column: CTA */}
          <div className="bg-[#1a1a1a] p-8 md:p-12 border-2 border-[#F4CE14] relative overflow-hidden group shadow-2xl flex flex-col justify-center">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
              <img
                src="/media/DSC_7229.jpg"
                alt="Vrakfest Action"
                className="w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-700 grayscale group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
            </div>

            <div className="relative z-10">
              <h3 className="font-bebas text-5xl md:text-6xl text-white mb-6 leading-none uppercase">Máš na to <span className="text-[#F4CE14]">koule</span> závodit?</h3>
              <p className="font-tech text-gray-300 text-lg mb-10 leading-relaxed uppercase tracking-wider max-w-xl">
                PŘESTAŇ O TOM JEN SNÍT A UKAŽ CO JE V TOBĚ. 90 JEZDCŮ, JEDNA TRAŤ A ČISTÁ DESTRUKCE.
                ZAREGISTRUJ SE PRÁVĚ TEĎ A BUĎ SOUČÁSTÍ VRAKFESTU.
              </p>
              <Button className="w-fit px-8 py-3 text-lg h-auto">
                <a href="#registrace">ZAREGISTROVAT SE</a>
              </Button>
            </div>
          </div>

          {/* Right Column: Driver Information Q&A */}
          <div id="informace-pro-jezdce">
            <h3 style={{ fontSize: 'var(--fs-h3)' }} className="font-bebas text-[#F4CE14] uppercase tracking-tight font-bold leading-none mb-8">
              INFORMACE PRO JEZDCE
            </h3>

            <div className="space-y-4 font-tech text-gray-400">
              <div className="bg-white/5 border-l-4 border-[#F4CE14] p-6">
                <p className="font-bold text-white mb-2 uppercase tracking-wider text-lg">PLATBA STARTOVNÉHO</p>
                <p className="leading-relaxed text-lg">
                  POZOR – Startovné lze zaplatit <span className="text-white font-bold">pouze předem</span>.
                  Platba startovného hotově na místě <span className="text-red-500 font-bold">nebude možná!</span>
                </p>
              </div>

              <div className="bg-white/5 border-l-4 border-gray-700 hover:border-[#F4CE14] transition-colors p-6">
                <p className="font-bold text-white mb-2 uppercase tracking-wider text-lg">REZERVACE MÍSTA</p>
                <p className="leading-relaxed text-lg">
                  Počet startujících závodníků je omezený – platbou předem rezervujete své místo v závodě.
                  Závodník bude připsán na startovní listinu při přijetí platby.
                </p>
              </div>

              <div className="bg-white/5 border-l-4 border-gray-700 hover:border-[#F4CE14] transition-colors p-6">
                <p className="font-bold text-white mb-2 uppercase tracking-wider text-lg">CO JE V CENĚ?</p>
                <p className="leading-relaxed text-lg">
                  V ceně je volný vstup pro závodníka jeho posádku včetně místa v depu pro jedno doprovodné vozidlo.
                </p>
              </div>

              <div className="bg-white/5 border-l-4 border-gray-700 hover:border-[#F4CE14] transition-colors p-6">
                <p className="font-bold text-white mb-2 uppercase tracking-wider text-lg">VÝHRY A CENY</p>
                <p className="leading-relaxed text-lg">
                  Hlavní výhra je <span className="text-[#F4CE14] font-bold">10 000 Kč</span> + Stylové poháry od firmy YOMAX a dárky od sponzorů Elektro Dvořák Valašské Meziříčí.
                </p>
              </div>

              <a href="#pravidla" className="block mt-6 text-[#F4CE14] hover:text-white transition-colors uppercase tracking-widest text-sm font-bold flex items-center gap-2 group">
                <span className="w-8 h-[2px] bg-[#F4CE14] group-hover:w-16 transition-all"></span>
                PRAVIDLA NAJDETE KLIKNUTÍM ZDE
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const AccreditationAndPartners = () => {
  return (
    <section className="py-24 bg-black relative border-t border-white/5">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-16 lg:gap-24 items-start">
          {/* Left Column: Partner Registration */}
          <div className="space-y-8 min-w-0 max-w-full">
            {/* Subtle Ticker and Logo loop (No frame) */}
            <div className="overflow-hidden whitespace-nowrap group py-4 fade-mask w-full">
              <div className="flex w-max animate-marquee">
                {[
                  "/media/sponzors/dvorak.jpg",
                  "/media/sponzors/granex.jpg",
                  "/media/sponzors/silvie.jpg",
                  "/media/sponzors/yomax.jpg",
                  "/media/sponzors/dvorak.jpg",
                  "/media/sponzors/granex.jpg",
                  "/media/sponzors/silvie.jpg",
                  "/media/sponzors/yomax.jpg",
                  "/media/sponzors/dvorak.jpg",
                  "/media/sponzors/granex.jpg",
                  "/media/sponzors/silvie.jpg",
                  "/media/sponzors/yomax.jpg",
                  "/media/sponzors/dvorak.jpg",
                  "/media/sponzors/granex.jpg",
                  "/media/sponzors/silvie.jpg",
                  "/media/sponzors/yomax.jpg"
                ].map((logo, i) => (
                  <div key={i} className="flex-shrink-0 flex items-center mx-8 opacity-60 transition-all duration-500">
                    <img
                      src={logo}
                      alt="Partner"
                      className="h-12 w-auto object-contain grayscale invert mix-blend-screen opacity-80 transition-all duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div id="registrace-partnera" className="bg-white/5 border border-white/10 p-4 md:p-10 shadow-2xl relative overflow-hidden w-full">
              <div className="flex items-center gap-4 mb-6 relative z-10 w-full">
                <h3 style={{ fontSize: 'var(--fs-h3)' }} className="font-bebas text-[#F4CE14] uppercase tracking-tight font-bold leading-none break-words">STAŇ SE PARTNEREM</h3>
              </div>
              <p className="font-tech text-gray-400 mb-8 leading-relaxed font-medium relative z-10">
                Chcete spojit svou značku s nejbláznivější motoristickou akcí? Ozvěte se nám a domluvíme spolupráci.
              </p>

              <form className="space-y-4 relative z-10 w-full">
                <div className="grid gap-4 w-full">
                  <div className="space-y-2">
                    <label className="font-tech text-xs text-gray-500 uppercase tracking-widest font-bold ml-1">Název Firmy</label>
                    <input type="text" className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 font-tech focus:border-[#F4CE14] focus:outline-none hover:bg-white/10 transition-colors placeholder:text-white/20 font-bold" placeholder="VAŠE FIRMA S.R.O." />
                  </div>

                  <div className="space-y-2">
                    <label className="font-tech text-xs text-gray-500 uppercase tracking-widest font-bold ml-1">Kontaktní Jméno a Příjmení</label>
                    <input type="text" className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 font-tech focus:border-[#F4CE14] focus:outline-none hover:bg-white/10 transition-colors placeholder:text-white/20 font-bold" placeholder="JAN NOVÁK" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="font-tech text-xs text-gray-500 uppercase tracking-widest font-bold ml-1">Email</label>
                      <input type="email" className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 font-tech focus:border-[#F4CE14] focus:outline-none hover:bg-white/10 transition-colors placeholder:text-white/20 font-bold" placeholder="@" />
                    </div>
                    <div className="space-y-2">
                      <label className="font-tech text-xs text-gray-500 uppercase tracking-widest font-bold ml-1">Telefon</label>
                      <input type="tel" className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 font-tech focus:border-[#F4CE14] focus:outline-none hover:bg-white/10 transition-colors placeholder:text-white/20 font-bold" placeholder="+420" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="font-tech text-xs text-gray-500 uppercase tracking-widest font-bold ml-1">Zpráva / Představa spolupráce</label>
                    <textarea className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 font-tech focus:border-[#F4CE14] focus:outline-none hover:bg-white/10 transition-colors placeholder:text-white/20 font-bold min-h-[120px]" placeholder="MÁME ZÁJEM O..."></textarea>
                  </div>
                </div>

                <Button className="w-full">
                  ODESLAT DOTAZ
                </Button>
              </form>
            </div>
          </div>

          {/* Right Column: Accreditation Form */}
          <div id="akreditace" className="bg-[#F4CE14] p-4 md:p-10 relative overflow-hidden shadow-2xl min-w-0 max-w-full">
            <div className="flex items-center gap-4 mb-6 relative z-10 w-full">
              <h3 style={{ fontSize: 'var(--fs-h3)' }} className="font-bebas text-black uppercase tracking-tight font-bold leading-none break-words">AKREDITACE 2026</h3>
            </div>
            <p className="font-tech text-black/70 mb-8 leading-relaxed font-medium relative z-10">
              Jste fotograf, kameraman nebo novinář? Získejte oficiální akreditaci na Vrakfest a přístup do media zóny.
            </p>

            <form className="space-y-4 relative z-10">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <label className="font-tech text-xs text-black/60 uppercase tracking-widest font-bold ml-1">Vyberte Závod</label>
                  <div className="relative">
                    <select className="w-full bg-black/5 border border-black/10 text-black px-4 py-3 font-tech focus:border-black focus:outline-none appearance-none cursor-pointer hover:bg-black/10 transition-colors font-bold">
                      <option>OSTRAVA - 4.4.</option>
                      <option>HRACHOVEC - 27.6.</option>
                      <option>NOVÉ MÍSTO - 22.8.</option>
                      <option>OSTRAVA - 24.10.</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-black/60">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="font-tech text-xs text-black/60 uppercase tracking-widest font-bold ml-1">Pozice</label>
                  <div className="relative">
                    <select className="w-full bg-black/5 border border-black/10 text-black px-4 py-3 font-tech focus:border-black focus:outline-none appearance-none cursor-pointer hover:bg-black/10 transition-colors font-bold">
                      <option>Fotograf</option>
                      <option>Kameraman</option>
                      <option>Dronař</option>
                      <option>Bloger / Influencer</option>
                      <option>Novinář</option>
                      <option>Televize</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-black/60">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="font-tech text-xs text-black/60 uppercase tracking-widest font-bold ml-1">Jméno a Příjmení</label>
                  <input type="text" className="w-full bg-black/5 border border-black/10 text-black px-4 py-3 font-tech focus:border-black focus:outline-none hover:bg-black/10 transition-colors placeholder:text-black/40 font-bold" placeholder="JAN NOVÁK" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="font-tech text-xs text-black/60 uppercase tracking-widest font-bold ml-1">Email</label>
                    <input type="email" className="w-full bg-black/5 border border-black/10 text-black px-4 py-3 font-tech focus:border-black focus:outline-none hover:bg-black/10 transition-colors placeholder:text-black/40 font-bold" placeholder="@" />
                  </div>
                  <div className="space-y-2">
                    <label className="font-tech text-xs text-black/60 uppercase tracking-widest font-bold ml-1">Telefon</label>
                    <input type="tel" className="w-full bg-black/5 border border-black/10 text-black px-4 py-3 font-tech focus:border-black focus:outline-none hover:bg-black/10 transition-colors placeholder:text-black/40 font-bold" placeholder="+420" />
                  </div>
                </div>
              </div>

              <div className="h-4"></div>

              <Button className="w-full bg-black text-white hover:bg-white hover:text-black border-transparent shadow-xl">
                ODESLAT ŽÁDOST
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const LatestArticlesAndPress = () => {
  const articles = [
    { title: "ZIMNÍ PŘIPRAVA VRCHOLÍ", text: "Týmy dokončují poslední úpravy na svých speciálech pro nadcházející sezónu." },
    { title: "NOVÁ KATEGORIE PRO ŽENY", text: "Vyslyšeli jsme vaše přání a otevíráme zcela novou kategorii čistě pro závodnice." },
    { title: "ZETOR CUP ZRUŠEN", text: "Z technických důvodů se letošní ročník Zetor Cupu neuskuteční." }
  ];

  return (
    <section className="py-24 bg-[#0a0a0a] relative border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left: Articles */}
          <div className="bg-white/5 border border-white/10 p-8 shadow-2xl relative overflow-hidden">
            <div className="flex items-center gap-4 mb-8">
              <h3 className="font-bebas text-3xl text-white uppercase tracking-tight font-bold leading-none">POSLEDNÍ ČLÁNKY</h3>
            </div>
            <div className="space-y-6">
              {articles.map((article, i) => (
                <div key={i} className={`group cursor-pointer border-b border-white/10 ${i === 2 ? 'border-b-0 pb-0' : 'pb-6'} hover:border-[#F4CE14] transition-colors`}>
                  {i === 0 && (
                    <div className="mb-4 overflow-hidden rounded-sm border border-white/10 group-hover:border-[#F4CE14]/50 transition-colors">
                      <img
                        src="/articles/winter_prep.png"
                        alt="Zimní příprava"
                        className="w-full h-48 object-cover grayscale group-hover:grayscale-0 scale-100 group-hover:scale-105 transition-all duration-700"
                      />
                    </div>
                  )}
                  <div className="flex items-center gap-3 mb-2">
                    <span className="w-2 h-2 bg-[#F4CE14] rounded-full"></span>
                    <span className="font-tech text-xs text-gray-500 uppercase tracking-widest">{new Date().getFullYear()}</span>
                  </div>
                  <h4 className="font-bebas text-xl text-white group-hover:text-[#F4CE14] transition-colors mb-2 tracking-wide">{article.title}</h4>
                  <p className="font-tech text-gray-400 text-sm leading-relaxed line-clamp-2">{article.text}</p>
                </div>
              ))}
            </div>
            <Button variant="outline" className="mt-8 w-full">VŠECHNY ČLÁNKY</Button>
          </div>

          {/* Right: Media Logos */}
          <div>
            <div className="flex items-center gap-4 mb-8">
              <h3 className="font-bebas text-3xl text-[#F4CE14] uppercase tracking-tight font-bold leading-none">NAPSALI O NÁS</h3>
            </div>
            <p className="font-tech text-gray-400 mb-8 font-medium">Vrakfest se pravidelně objevuje v médiích.</p>

            <div className="grid grid-cols-2 gap-4">
              {['DENIK.CZ', 'VALAŠSKÝ DENÍK', 'PORTAL RIDIČE', 'POLAR TV', 'KURZY.CZ'].map((media, i) => (
                <div key={i} className="h-24 bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-[#F4CE14]/30 transition-all cursor-default group">
                  <span className="font-bebas text-2xl text-gray-600 group-hover:text-white transition-colors">{media}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const MobileApp = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <section
      id="aplikace"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="py-32 bg-black overflow-hidden relative text-left"
    >
      {/* Base Gray Grid */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[length:40px_40px] pointer-events-none"></div>

      {/* Interactive Yellow Grid (Revealed by Mask) */}
      <div
        className="absolute inset-0 z-0 bg-[linear-gradient(rgba(244,206,20,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(244,206,20,0.15)_1px,transparent_1px)] bg-[length:40px_40px] pointer-events-none transition-opacity duration-300"
        style={{
          opacity: isHovering ? 1 : 0,
          WebkitMaskImage: `radial-gradient(circle 250px at ${mousePos.x}px ${mousePos.y}px, black, transparent)`,
          maskImage: `radial-gradient(circle 250px at ${mousePos.x}px ${mousePos.y}px, black, transparent)`
        }}
      ></div>

      <div className="container mx-auto px-6 relative z-10 text-left">
        <div className="grid lg:grid-cols-3 gap-16 lg:gap-24 items-center">
          {/* Left Column: Mobile (33%) */}
          <div className="lg:col-span-1 flex justify-center relative scale-85 md:scale-100 lg:scale-110 origin-center lg:-ml-8">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-[#F4CE14]/10 blur-[140px] rounded-full animate-pulse"></div>

            <div className="relative w-[320px] h-[640px] bg-black border-[14px] border-[#222] rounded-[50px] shadow-[0_0_80px_rgba(0,0,0,1)] z-10 p-2 overflow-hidden border-b-[20px]">
              <div className="h-full rounded-[38px] overflow-hidden bg-[#0a0a0a] p-5 pt-10 flex flex-col font-tech text-left relative">
                <div className="flex justify-center mb-8 border-b border-white/5 pb-6">
                  <img src="/video/LOGO-Y.png" alt="VRAKAPP" className="h-10 w-auto object-contain brightness-110" />
                </div>

                <div className="grid grid-cols-2 gap-3 flex-1 overflow-hidden pb-4">
                  {[
                    { icon: <Clock size={20} />, label: 'TIMING', active: true },
                    { icon: <ShoppingCart size={20} />, label: 'BAZAR' },
                    { icon: <Users size={20} />, label: 'HLASOVÁNÍ' },
                    { icon: <User size={20} />, label: 'PROFILY' },
                    { icon: <ShoppingBag size={20} />, label: 'MERCH' },
                    { icon: <MapPin size={20} />, label: 'AKCE' }
                  ].map((tile, tidx) => (
                    <div
                      key={tidx}
                      className={`aspect-square rounded-2xl border flex flex-col items-center justify-center gap-2 transition-all duration-500 ${tile.active
                        ? 'bg-[#F4CE14]/20 border-[#F4CE14]/30 text-[#F4CE14]'
                        : 'bg-black border-white/10 text-gray-500'
                        }`}
                    >
                      {tile.icon}
                      <span className="text-[8px] font-bold tracking-widest leading-none">{tile.label}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-auto flex justify-between gap-3 pb-2">
                  <div className="h-12 flex-1 bg-black rounded-xl border-2 border-white/10 flex items-center justify-center"><Users size={20} className="text-gray-400" /></div>
                  <div className="h-12 flex-1 bg-[#F4CE14] rounded-xl flex items-center justify-center"><Play size={20} className="text-black fill-black" /></div>
                  <div className="h-12 flex-1 bg-black rounded-xl border-2 border-white/10 flex items-center justify-center"><Settings size={20} className="text-gray-400" /></div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Content (66%) */}
          <div className="lg:col-span-2 text-left">
            <SectionHeader title="VRAKFEST APP" subtitle="PŘIPRAVUJEME NĚCO VELKÉHO. PŘIDEJ SE NA WAITING LIST!" />

            <div className="grid md:grid-cols-2 gap-x-12 gap-y-10 mb-16">
              {[
                { icon: <Clock size={28} />, text: 'LIVE TIMING', desc: 'Sleduj body a časy všech závodníků online v reálném čase.' },
                { icon: <ShoppingCart size={28} />, text: 'MARKETPLACE', desc: 'Přístup k limitovaným nabídkám náhradních dílů přímo od jezdců.' },
                { icon: <Users size={28} />, text: 'HLASOVÁNÍ', desc: 'Rozhoduj o nejlepším vraku dne a vyhrávej ceny od sponzorů.' },
                { icon: <User size={28} />, text: 'PROFILY JEZDCŮ', desc: 'Kompletní statistiky, historie bouraček a týmové info na jednom místě.' },
                { icon: <ShoppingBag size={28} />, text: 'PRODEJ MERCHE', desc: 'Oficiální Vrakfest trička, mikiny a doplňky přímo v aplikaci.' },
                { icon: <MapPin size={28} />, text: 'KALENDÁŘ AKCÍ', desc: 'Interaktivní mapa a harmonogram všech plánovaných závodů v sezóně.' }
              ].map((item, i) => (
                <div key={i} className="flex gap-6 group">
                  <div className="flex-shrink-0 w-16 h-16 bg-black border-2 border-white/10 flex items-center justify-center text-[#F4CE14] group-hover:bg-[#F4CE14] group-hover:text-black transition-all duration-500 group-hover:-rotate-3 border-b-4 border-black shadow-xl">
                    {item.icon}
                  </div>
                  <div>
                    <h4 style={{ fontSize: 'var(--fs-h4)' }} className="font-bebas tracking-tight group-hover:text-[#F4CE14] transition-colors mb-1 uppercase font-bold leading-none">{item.text}</h4>
                    <p style={{ fontSize: 'var(--fs-p)' }} className="text-gray-500 font-tech leading-snug">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="max-w-3xl">
              <p className="font-tech text-[#F4CE14] text-sm uppercase tracking-[0.2em] font-bold mb-4">BUĎ U TOHO JAKO PRVNÍ A PŘIDEJ SE NA WAITING LIST</p>
              <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-stretch pt-2">
                <div className="flex-[2] min-w-0 relative transform -skew-x-[15deg] bg-black border border-white/20 focus-within:border-[#F4CE14] transition-all duration-300">
                  <input
                    type="email"
                    placeholder="TVŮJ E-MAIL"
                    className="w-full bg-transparent px-6 py-4 text-white font-tech focus:outline-none transform skew-x-[15deg] placeholder:text-white/20"
                  />
                </div>
                <Button className="flex-1 whitespace-nowrap !px-8">
                  PŘIDAT SE NA WAITING LIST
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

















export const Home = () => {
  const [liveStandings, setLiveStandings] = useState<any[]>([]);
  const [liveEvents, setLiveEvents] = useState<any[]>([]);
  const [registeredCount, setRegisteredCount] = useState(0);
  const [paidDrivers, setPaidDrivers] = useState<any[]>([]);
  const [ctaIndex, setCtaIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCtaIndex(prev => (prev === 0 ? 1 : 0));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchHomeData = async () => {
      // 1. Fetch Standings with Profiles
      const { data: standingsData } = await supabase
        .from('standings')
        .select(`
          total_points,
          races_count,
          wins_count,
          profiles (
            first_name,
            last_name,
            nickname,
            city,
            profile_photo_url
          )
        `)
        .eq('season_year', 2026)
        .order('total_points', { ascending: false });

      if (standingsData && standingsData.length > 0) setLiveStandings(standingsData);

      // 2. Fetch Events
      const { data: eventsData } = await supabase
        .from('events')
        .select('*')
        .order('date', { ascending: true });

      if (eventsData && eventsData.length > 0) {
        setLiveEvents(eventsData);
        // Fetch registered count for the first active event
        const activeE = eventsData.find((e: any) => e.is_active) || eventsData[0];

        // Fetch paid registered count
        const { count } = await supabase
          .from('registrations')
          .select('*', { count: 'exact', head: true })
          .eq('event_id', activeE.id)
          .eq('payment_status', 'paid');
        if (count !== null) setRegisteredCount(count);

        // Fetch paid drivers for roster
        const { data: paidData } = await supabase
          .from('registrations')
          .select('*, profiles(*)')
          .eq('event_id', activeE.id)
          .eq('payment_status', 'paid');
        if (paidData) setPaidDrivers(paidData);
      }
    };

    fetchHomeData();
  }, []);
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
    <div className="min-h-screen bg-[#111] text-white selection:bg-[#F4CE14] selection:text-black">
      <main>
        <Hero activeEvent={liveEvents[0]} registeredCount={registeredCount} ctaIndex={ctaIndex} />
        <About ctaIndex={ctaIndex} />
        <GalleryGrid />
        <SponsorsTicker />
        <Program />
        <EventGrid liveEvents={liveEvents} />
        <DriverRoster registeredCount={registeredCount} paidDrivers={paidDrivers} liveStandings={liveStandings} />
        <Standings liveStandings={liveStandings} />
        <RulesAndSpecs />

        {/* Caution Tape Separator */}
        <div className="bg-gradient-to-b from-[#0a0a0a] to-black py-24 relative z-20">
          <div className="relative h-20 bg-[#F4CE14] overflow-hidden -skew-y-1">
            <div
              className="absolute inset-0 h-full w-[200%]"
              style={{
                backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 40px, #F4CE14 40px, #F4CE14 80px)',
                animation: 'slideTape 2s linear infinite'
              }}
            ></div>
          </div>
        </div>

        <DriverInfoAndCTA />
        <RegistrationForm />
        <LatestArticlesAndPress />
        <AccreditationAndPartners />
        <MobileApp />
        <InstagramFeed />
      </main>


      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideTape {
          0% { transform: translateX(0); }
          100% { transform: translateX(-113.14px); }
        }
        @keyframes rotateLogo {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-rotate-slow {
          animation: rotateLogo 10s linear infinite;
        }
        .animate-fadeIn {
          animation: fadeIn 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
        html {
          scroll-behavior: smooth;
        }
        .btn-race {
          border-color: white !important;
          color: white !important;
        }
        .btn-race:hover {
          background-color: white !important;
          color: black !important;
          border-color: white !important;
          box-shadow: 0 0 20px rgba(255, 255, 255, 0.5) !important;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .fade-mask {
          mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
        }
      `}</style>
    </div>
  );
}