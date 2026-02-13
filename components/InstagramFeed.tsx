import React, { useState, useEffect } from 'react';
import { SectionHeader } from './SectionHeader';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

export const InstagramFeed = () => {
    const [activeIndex, setActiveIndex] = useState(2);

    // Local videos from public/video
    const reels = [
        { id: 1, video: 'https://kneyhirbfnbukjyadogn.supabase.co/storage/v1/object/public/videos/Vrakfest%20OSTRAVA%20-%20REEL.mp4' },
        { id: 2, video: 'https://kneyhirbfnbukjyadogn.supabase.co/storage/v1/object/public/videos/VF-Hrachovec-REEL.mp4' },
        { id: 3, video: 'https://kneyhirbfnbukjyadogn.supabase.co/storage/v1/object/public/videos/VRESINA%202.mp4' },
        { id: 4, video: 'https://kneyhirbfnbukjyadogn.supabase.co/storage/v1/object/public/videos/BRANKY%20VF-web.mp4' },
        // Duplicates for infinite loop effect
        { id: 5, video: 'https://kneyhirbfnbukjyadogn.supabase.co/storage/v1/object/public/videos/Vrakfest%20OSTRAVA%20-%20REEL.mp4' },
        { id: 6, video: 'https://kneyhirbfnbukjyadogn.supabase.co/storage/v1/object/public/videos/VF-Hrachovec-REEL.mp4' },
        { id: 7, video: 'https://kneyhirbfnbukjyadogn.supabase.co/storage/v1/object/public/videos/VRESINA%202.mp4' },
    ];

    // Auto-rotate every 10 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % reels.length);
        }, 10000);
        return () => clearInterval(interval);
    }, [reels.length]);

    const handleNext = () => {
        setActiveIndex((prev) => (prev + 1) % reels.length);
    };

    const handlePrev = () => {
        setActiveIndex((prev) => (prev - 1 + reels.length) % reels.length);
    };

    const getReelStyle = (index: number) => {
        const total = reels.length;
        // Calculate shortest distance in a circle (e.g., from 6 to 0 is +1 step, not -6 steps)
        let offset = (index - activeIndex + total) % total;
        if (offset > total / 2) offset -= total;

        const isActive = offset === 0;
        const absOffset = Math.abs(offset);

        // Hide items that are too far away to prevent visual clutter
        const isVisible = absOffset <= 2;

        return {
            offset,
            isActive,
            isVisible,
            style: {
                transform: `translateX(calc(-50% + ${offset * 260}px)) scale(${1 - absOffset * 0.1})`, // 260px spacing
                zIndex: 50 - absOffset,
                opacity: isVisible ? 1 : 0,
                filter: isActive ? 'none' : `grayscale(100%) brightness(${Math.max(10, 50 - absOffset * 20)}%)`,
                pointerEvents: isVisible ? 'auto' : 'none',
                left: '50%',
            } as React.CSSProperties,
        };
    };

    return (
        <section className="py-24 bg-[#0a0a0a] relative overflow-hidden border-t border-white/5">
            <div className="container mx-auto px-6 mb-24 flex items-end justify-between">
                <SectionHeader title="SLEDUJ NÁŠ INSTAGRAM" subtitle="#VRAKFEST #CARNAGE" />
                <a
                    href="https://www.instagram.com/vrakfest.cz_official/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden md:flex items-center gap-2 text-[#F4CE14] font-bebas text-xl hover:text-white transition-colors group mb-8"
                >
                    <span className="group-hover:translate-x-[-4px] transition-transform">@VRAKFEST_OFFICIAL</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
            </div>

            <div className="relative w-full h-[600px] flex items-center justify-center perspective-[1000px]">
                {reels.map((reel, index) => {
                    const { style, isActive, isVisible } = getReelStyle(index);

                    return (
                        <div
                            key={reel.id}
                            onClick={() => setActiveIndex(index)}
                            className={`
                absolute top-0 w-[320px] h-[580px] origin-center rounded-xl overflow-hidden cursor-pointer 
                transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]
                border-2 ${isActive ? 'border-[#F4CE14] shadow-[0_0_50px_rgba(244,206,20,0.2)]' : 'border-[#333] shadow-[0_25px_50px_rgba(0,0,0,0.9)]'}
              `}
                            style={style}
                        >
                            <video
                                ref={(el) => {
                                    if (el) {
                                        if (isActive) {
                                            el.play().catch(() => { });
                                        } else {
                                            el.pause();
                                            el.currentTime = 0; // Show first frame as thumbnail
                                        }
                                    }
                                }}
                                src={reel.video}
                                muted
                                loop
                                playsInline
                                className="w-full h-full object-cover bg-black" // Added bg-black to avoid white flash
                            />

                            {/* Overlay Gradient */}
                            <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent transition-opacity ${isActive ? 'opacity-40' : 'opacity-80'}`}></div>

                            {/* Instagram Icon */}
                            <div className="absolute bottom-6 left-6 text-white z-10">
                                <div className="bg-white/10 backdrop-blur-md p-3 rounded-full mb-3 w-fit">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-white"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                                </div>
                                {isActive && <p className="font-bebas text-lg tracking-wide text-[#F4CE14]">SLEDOVAT</p>}
                            </div>

                        </div>
                    );
                })}

                {/* Desktop Navigation Arrows */}
                <button
                    onClick={handlePrev}
                    className="hidden md:flex absolute top-1/2 left-4 md:left-[15%] lg:left-[25%] z-50 -translate-y-1/2 w-12 h-12 items-center justify-center rounded-full border-2 border-[#F4CE14] text-[#F4CE14] hover:bg-[#F4CE14] hover:text-black transition-all hover:scale-110 hover:shadow-[0_0_20px_rgba(244,206,20,0.4)]"
                >
                    <ChevronLeft size={24} />
                </button>

                <button
                    onClick={handleNext}
                    className="hidden md:flex absolute top-1/2 right-4 md:right-[15%] lg:right-[25%] z-50 -translate-y-1/2 w-12 h-12 items-center justify-center rounded-full border-2 border-[#F4CE14] text-[#F4CE14] hover:bg-[#F4CE14] hover:text-black transition-all hover:scale-110 hover:shadow-[0_0_20px_rgba(244,206,20,0.4)]"
                >
                    <ChevronRight size={24} />
                </button>
            </div>

            {/* Mobile CTA */}
            <div className="md:hidden flex justify-center mt-12">
                <a
                    href="https://www.instagram.com/vrakfest.cz_official/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[#F4CE14] font-bebas text-xl hover:text-white transition-colors group"
                >
                    <span className="group-hover:translate-x-[-4px] transition-transform">@VRAKFEST_OFFICIAL</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
            </div>
        </section>
    );
};
