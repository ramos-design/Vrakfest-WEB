import React from 'react';
import { Shield, Mail, Instagram, Youtube, Facebook, MapPin, ExternalLink, ChevronRight, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => (
    <footer className="bg-black border-t-8 border-[#F4CE14] pt-24 pb-12 overflow-hidden relative">
        {/* Background Decorative Element */}
        <div className="absolute -bottom-32 -right-32 text-[30rem] font-bebas italic text-white/[0.02] pointer-events-none select-none leading-none z-0">
            2026
        </div>

        <div className="container mx-auto px-6 relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-12 lg:gap-x-8 xl:gap-x-12 mb-20">

                {/* Column 1: Brand & About */}
                <div className="col-span-2 lg:col-span-2 space-y-8 flex flex-col items-center md:items-start text-center md:text-left">
                    <div className="flex flex-col items-center md:items-start gap-4">
                        <img
                            src="/video/LOGO-Y.png"
                            alt="VRAKFEST Logo"
                            className="h-16 w-auto object-contain"
                        />
                    </div>
                    <p className="text-gray-500 font-tech text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
                        Největší středoevropský festival destrukce a motorismu. Adrenalin, skřípění plechů a komunita, která se nebojí žádné výzvy.
                    </p>
                </div>

                {/* Column 2: Quick Links */}
                <div className="text-left">
                    <h4 className="font-bebas text-2xl text-white mb-8 uppercase tracking-wider font-bold border-l-4 border-[#F4CE14] pl-4">NAVIGACE</h4>
                    <ul className="space-y-4 font-tech text-gray-500 text-sm uppercase font-bold">
                        <li>
                            <a href="#ovrakfestu" className="hover:text-[#F4CE14] transition-all flex items-center justify-start gap-2 group">
                                <ChevronRight size={14} className="text-[#F4CE14] opacity-0 group-hover:opacity-100 hidden md:block -ml-4 group-hover:ml-0 transition-all" />
                                O VRAKFESTU
                            </a>
                        </li>
                        <li>
                            <a href="#program" className="hover:text-[#F4CE14] transition-all flex items-center justify-start gap-2 group">
                                <ChevronRight size={14} className="text-[#F4CE14] opacity-0 group-hover:opacity-100 hidden md:block -ml-4 group-hover:ml-0 transition-all" />
                                PROGRAM AKCE
                            </a>
                        </li>
                        <li>
                            <a href="#jezdci" className="hover:text-[#F4CE14] transition-all flex items-center justify-start gap-2 group">
                                <ChevronRight size={14} className="text-[#F4CE14] opacity-0 group-hover:opacity-100 hidden md:block -ml-4 group-hover:ml-0 transition-all" />
                                JEZDCI & TÝMY
                            </a>
                        </li>
                        <li>
                            <a href="#pravidla" className="hover:text-[#F4CE14] transition-all flex items-center justify-start gap-2 group">
                                <ChevronRight size={14} className="text-[#F4CE14] opacity-0 group-hover:opacity-100 hidden md:block -ml-4 group-hover:ml-0 transition-all" />
                                PRAVIDLA ZÁVODŮ
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Column 3: Informuj se */}
                <div className="text-left">
                    <h4 className="font-bebas text-2xl text-white mb-8 uppercase tracking-wider font-bold border-l-4 border-[#F4CE14] pl-4">INFORMUJ SE</h4>
                    <ul className="space-y-4 font-tech text-gray-500 text-sm uppercase font-bold">
                        <li>
                            <a href="#poradi" className="hover:text-[#F4CE14] transition-all flex items-center justify-start gap-2 group">
                                <ChevronRight size={14} className="text-[#F4CE14] opacity-0 group-hover:opacity-100 hidden md:block -ml-4 group-hover:ml-0 transition-all" />
                                BODOVÉ POŘADÍ
                            </a>
                        </li>
                        <li>
                            <a href="#blog" className="hover:text-[#F4CE14] transition-all flex items-center justify-start gap-2 group">
                                <ChevronRight size={14} className="text-[#F4CE14] opacity-0 group-hover:opacity-100 hidden md:block -ml-4 group-hover:ml-0 transition-all" />
                                BLOGOVÉ ČLÁNKY
                            </a>
                        </li>
                        <li>
                            <a href="#kalendar" className="hover:text-[#F4CE14] transition-all flex items-center justify-start gap-2 group">
                                <ChevronRight size={14} className="text-[#F4CE14] opacity-0 group-hover:opacity-100 hidden md:block -ml-4 group-hover:ml-0 transition-all" />
                                KALENDÁŘ UDÁLOSTÍ
                            </a>
                        </li>
                        <li>
                            <a href="#partneri" className="hover:text-[#F4CE14] transition-all flex items-center justify-start gap-2 group">
                                <ChevronRight size={14} className="text-[#F4CE14] opacity-0 group-hover:opacity-100 hidden md:block -ml-4 group-hover:ml-0 transition-all" />
                                PARTNEŘI AKCE
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Column 4: Important Links */}
                <div className="text-left">
                    <h4 className="font-bebas text-2xl text-white mb-8 uppercase tracking-wider font-bold border-l-4 border-[#F4CE14] pl-4">DŮLEŽITÉ</h4>
                    <ul className="space-y-4 font-tech text-gray-500 text-sm uppercase font-bold">
                        <li>
                            <a href="#registrace" className="hover:text-[#F4CE14] transition-all flex items-center justify-start gap-2 group text-[#F4CE14]">
                                <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 hidden md:block -ml-4 group-hover:ml-0 transition-all" />
                                REGISTRACE JEZDCE
                            </a>
                        </li>
                        <li>
                            <a href="#akreditace" className="hover:text-[#F4CE14] transition-all flex items-center justify-start gap-2 group">
                                <ChevronRight size={14} className="text-[#F4CE14] opacity-0 group-hover:opacity-100 hidden md:block -ml-4 group-hover:ml-0 transition-all" />
                                AKREDITACE
                            </a>
                        </li>
                        <li>
                            <a href="#pridej-se" className="hover:text-[#F4CE14] transition-all flex items-center justify-start gap-2 group">
                                <ChevronRight size={14} className="text-[#F4CE14] opacity-0 group-hover:opacity-100 hidden md:block -ml-4 group-hover:ml-0 transition-all" />
                                PŘIDEJ SE K NÁM
                            </a>
                        </li>
                        <li>
                            <a href="#aplikace" className="hover:text-[#F4CE14] transition-all flex items-center justify-start gap-2 group">
                                <ChevronRight size={14} className="text-[#F4CE14] opacity-0 group-hover:opacity-100 hidden md:block -ml-4 group-hover:ml-0 transition-all" />
                                APLIKACE
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Column 5: Contact */}
                <div className="space-y-8 text-left">
                    <h4 className="font-bebas text-2xl text-white mb-8 uppercase tracking-wider font-bold border-l-4 border-[#F4CE14] pl-4">KONTAKT</h4>
                    <div className="space-y-4 font-tech text-sm">
                        <a href="mailto:info@VrakFest.cz" className="flex items-center justify-start gap-3 text-gray-400 hover:text-white transition-colors group">
                            <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center group-hover:bg-[#F4CE14]/20 transition-colors">
                                <Mail size={16} className="text-[#F4CE14]" />
                            </div>
                            <span>INFO@VRAKFEST.CZ</span>
                        </a>
                        <a href="tel:+420731331429" className="flex items-center justify-start gap-3 text-gray-400 hover:text-white transition-colors group">
                            <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center group-hover:bg-[#F4CE14]/20 transition-colors">
                                <Phone size={16} className="text-[#F4CE14]" />
                            </div>
                            <span>+420 731 331 429</span>
                        </a>
                    </div>

                    <div className="flex gap-4 pt-4 border-t border-white/5 justify-start">
                        <a href="https://facebook.com" className="w-10 h-10 bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#F4CE14] hover:text-black transition-all group">
                            <Facebook size={18} className="group-hover:scale-110 transition-transform" />
                        </a>
                        <a href="https://instagram.com" className="w-10 h-10 bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#F4CE14] hover:text-black transition-all group">
                            <Instagram size={18} className="group-hover:scale-110 transition-transform" />
                        </a>
                        <a href="https://youtube.com" className="w-10 h-10 bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#F4CE14] hover:text-black transition-all group">
                            <Youtube size={18} className="group-hover:scale-110 transition-transform" />
                        </a>
                    </div>
                </div>

            </div>

            {/* Bottom Bar */}
            <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                <p className="font-tech text-center md:text-left text-[10px] text-gray-600 tracking-[0.3em] uppercase order-2 md:order-1">
                    © 2026 VRAKFEST_OFFICIAL. VŠECHNA PRÁVA VYHRAZENA.
                </p>
                <div className="flex flex-wrap justify-center gap-8 font-tech text-[10px] text-gray-500 uppercase tracking-widest order-1 md:order-2">
                    <a href="#" className="hover:text-white transition-colors">OCHRANA OSOBNÍCH ÚDAJŮ</a>
                    <a href="#" className="hover:text-white transition-colors">OBCHODNÍ PODMÍNKY</a>
                </div>
            </div>
        </div>
    </footer>
);
