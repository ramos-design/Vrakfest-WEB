import React from 'react';
import { Shield, Phone, UserPlus, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => (
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
            <p>
                © 2026 VRAKFEST_SYSTEMS. ALL_SYSTEMS_SECURED.
                <span className="mx-2 text-[#F4CE14]">|</span>
                <Link to="/dsgn" className="hover:text-[#F4CE14] transition-colors">DSGN</Link>
            </p>
        </div>

        <div className="absolute -bottom-32 -right-32 text-[30rem] font-bebas italic text-white/[0.015] pointer-events-none select-none leading-none z-0">
            2026
        </div>
    </footer>
);
