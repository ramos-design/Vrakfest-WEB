import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Menu, X, User, Facebook, Instagram, Youtube } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export const TechNavBar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();
    const isHome = location.pathname === '/';

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Prevent scrolling when menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => { document.body.style.overflow = 'auto'; };
    }, [mobileMenuOpen]);

    const desktopNavLinks = [
        { label: 'O VRAKFESTU', href: isHome ? '#ovrakfestu' : '/#ovrakfestu' },
        { label: 'KALENDÁŘ', href: isHome ? '#kalendar' : '/#kalendar' },
        { label: 'JEZDCI', href: isHome ? '#jezdci' : '/#jezdci' },
        { label: 'PRAVIDLA', href: isHome ? '#pravidla' : '/#pravidla' },
        { label: 'APLIKACE', href: isHome ? '#aplikace' : '/#aplikace' },
    ];

    const mobileNavLinks = [
        { label: 'O VRAKFESTU', href: isHome ? '#ovrakfestu' : '/#ovrakfestu' },
        { label: 'PROGRAM', href: isHome ? '#program' : '/#program' },
        { label: 'KALENDÁŘ', href: isHome ? '#kalendar' : '/#kalendar' },
        { label: 'JEZDCI', href: isHome ? '#jezdci' : '/#jezdci' },
        { label: 'BODOVÉ POŘADÍ', href: isHome ? '#poradi' : '/#poradi' },
        { label: 'PRAVIDLA', href: isHome ? '#pravidla' : '/#pravidla' },
        { label: 'ČLÁNKY', href: isHome ? '#posledniclanky' : '/#posledniclanky' },
        { label: 'APLIKACE', href: isHome ? '#aplikace' : '/#aplikace' },
    ];

    const logoSrc = "/video/LOGO-Y.png";

    return (
        <>
            <header className={`fixed top-0 left-0 w-full z-[999] transition-all duration-300 border-b ${scrolled && !mobileMenuOpen ? 'bg-[#111]/95 border-white/5 shadow-2xl py-3' : mobileMenuOpen ? 'bg-transparent border-transparent py-5 lg:py-6' : 'bg-transparent border-white/5 py-5 lg:py-6'}`}>
                {/* 
                    GRID LAYOUT STRATEGY:
                    Mobile: [ User Icon ] [ Logo (Centered ABSOLUTELY) ] [ Toggle Button ]
                    Desktop: [ Nav ] [ Logo ] [ Buttons ]
                */}
                <div className="w-[95%] mx-auto px-3 lg:px-6 relative flex justify-between items-center lg:grid lg:grid-cols-[1fr_auto_1fr] lg:gap-4">

                    {/* DESKTOP: Left Navigation */}
                    {/* DESKTOP: Left Navigation */}
                    {/* DESKTOP: Left Navigation */}
                    <nav className="hidden lg:flex justify-self-start items-center gap-8 min-h-[3rem]">
                        {desktopNavLinks.map(item => (
                            <div key={item.label} className="relative group">
                                <a
                                    href={item.href}
                                    className="font-bebas text-lg text-white hover:text-[#F4CE14] transition-all uppercase tracking-wide no-underline hover:no-underline py-4 block"
                                >
                                    {item.label}
                                </a>
                            </div>
                        ))}
                    </nav>

                    {/* Logo - Centered Logic */}
                    {/* On Mobile: Absolute position. Added transition to black filter (brightness-0) when menu is open. */}
                    <div
                        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 lg:static lg:translate-x-0 lg:translate-y-0 lg:justify-self-center flex items-center gap-3 cursor-pointer z-20 mt-1 lg:mt-0 transition-all duration-300 ${mobileMenuOpen ? 'brightness-0' : 'brightness-100'}`}
                        onClick={() => {
                            if (mobileMenuOpen) setMobileMenuOpen(false);
                            window.scrollTo(0, 0);
                        }}
                    >
                        <Link to="/">
                            <img
                                src={logoSrc}
                                alt="VRAKFEST Logo"
                                className={`w-auto transition-all duration-300 object-contain hover:scale-105 ${scrolled && !mobileMenuOpen ? 'h-10 lg:h-14' : 'h-14 lg:h-20'}`}
                            />
                        </Link>
                    </div>

                    {/* MOBILE LEFT: User Icon - Fades out when menu is open */}
                    <div className={`lg:hidden z-20 transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                        <button className="text-white hover:text-[#F4CE14] transition-colors p-2">
                            <User size={28} />
                        </button>
                    </div>

                    {/* Right Side: Buttons (Desktop) & Hamburger (Mobile) */}
                    <div className="justify-self-end flex items-center gap-4 z-20">
                        {/* Desktop Buttons */}
                        <div className="hidden lg:flex items-center gap-4">
                            <Button variant="outline" size="small">PŘIHLÁŠENÍ</Button>
                            <Button variant="primary" size="small" className="inline-flex group relative overflow-hidden">
                                <span className="block transition-transform duration-300 group-hover:-translate-y-[150%]">KOUPIT VSTUPENKU</span>
                                <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 translate-y-[150%] group-hover:translate-y-0">JIŽ BRZY</span>
                            </Button>
                        </div>

                        {/* Mobile Toggle - Morphs between Menu and Close */}
                        <button
                            className={`lg:hidden transition-colors p-2 z-50 relative ${mobileMenuOpen ? 'text-black hover:text-white' : 'text-white hover:text-[#F4CE14]'}`}
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {/* Simple swap for now */}
                            {mobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
                        </button>
                    </div>

                </div>
            </header>

            {/* FULL SCREEN MOBILE MENU OVERLAY - Slide from Top */}
            <div className={`fixed inset-0 bg-[#F4CE14] z-[998] transition-transform duration-500 cubic-bezier(0.7, 0, 0.3, 1) flex flex-col pt-32 ${mobileMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>

                {/* Mobile Menu Content */}
                <nav className="flex-1 flex flex-col justify-start items-center gap-6 p-8 overflow-y-auto">
                    {mobileNavLinks.map((item, i) => (
                        <a
                            key={item.label}
                            href={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="font-bebas text-5xl text-black hover:text-white uppercase tracking-tight font-black transition-colors duration-75"
                            style={{
                                transitionDelay: `${mobileMenuOpen ? 200 + i * 50 : 0}ms`,
                                opacity: mobileMenuOpen ? 1 : 0,
                                transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                                transitionProperty: 'opacity, transform',
                                transitionDuration: '0.5s',
                                transitionTimingFunction: 'ease-out'
                            }}
                        >
                            {item.label}
                        </a>
                    ))}

                    <div
                        className="w-24 h-1 bg-black/20 my-4"
                        style={{
                            transitionDelay: `${mobileMenuOpen ? 200 + mobileNavLinks.length * 50 : 0}ms`,
                            opacity: mobileMenuOpen ? 1 : 0,
                            transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                            transitionProperty: 'opacity, transform',
                            transitionDuration: '0.5s',
                            transitionTimingFunction: 'ease-out'
                        }}
                    ></div>

                    {/* Expandable CTA */}
                    <div
                        className="w-full max-w-xs flex flex-col gap-4 pb-12"
                        style={{
                            transitionDelay: `${mobileMenuOpen ? 200 + (mobileNavLinks.length + 1) * 50 : 0}ms`,
                            opacity: mobileMenuOpen ? 1 : 0,
                            transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                            transitionProperty: 'opacity, transform',
                            transitionDuration: '0.5s',
                            transitionTimingFunction: 'ease-out'
                        }}
                    >
                        <Button
                            variant="primary"
                            className="w-full bg-black text-white hover:bg-white hover:text-black border-none text-lg py-4 shadow-2xl"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            KOUPIT VSTUPENKU
                        </Button>

                        <a href="#registrace" className="w-full" onClick={() => setMobileMenuOpen(false)}>
                            <Button
                                variant="outline"
                                className="w-full border-black text-black hover:bg-black hover:text-[#F4CE14] text-lg py-4"
                            >
                                REGISTRACE JEZDCE
                            </Button>
                        </a>
                    </div>
                </nav>

                <div
                    className="p-8 text-center pb-12"
                    style={{
                        transitionDelay: `${mobileMenuOpen ? 200 + (mobileNavLinks.length + 2) * 50 : 0}ms`,
                        opacity: mobileMenuOpen ? 1 : 0,
                        transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                        transitionProperty: 'opacity, transform',
                        transitionDuration: '0.5s',
                        transitionTimingFunction: 'ease-out'
                    }}
                >
                    <p className="font-tech text-xs text-black/60 uppercase tracking-widest font-bold mb-4">SLEDUJTE NÁS NA SÍTÍCH</p>
                    <div className="flex justify-center gap-6 mb-8">
                        <a href="https://www.facebook.com/VRAKFEST" target="_blank" rel="noopener noreferrer" className="text-black hover:text-white transition-colors">
                            <Facebook size={28} />
                        </a>
                        <a href="https://www.instagram.com/vrakfest.cz_official/" target="_blank" rel="noopener noreferrer" className="text-black hover:text-white transition-colors">
                            <Instagram size={28} />
                        </a>
                        <a href="https://www.youtube.com/@vrakfesttv409" target="_blank" rel="noopener noreferrer" className="text-black hover:text-white transition-colors">
                            <Youtube size={28} />
                        </a>
                    </div>
                    <p className="font-tech text-xs text-black/60 uppercase tracking-widest leading-none">© 2026 VRAKFEST_SYSTEMS</p>
                </div>
            </div>
        </>
    );
};
