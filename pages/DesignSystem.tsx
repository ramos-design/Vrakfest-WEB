import React, { useState, useEffect } from 'react';
import { Typewriter } from '../components/Typewriter';
import { Button } from '../components/Button';
import { SectionHeader } from '../components/SectionHeader';
import { ArrowRight, Box, Type, Palette, Monitor, Tablet, Smartphone, MoveVertical, Save } from 'lucide-react';
import { saveTheme, STORAGE_KEY } from '../components/ThemeController';

// Metadata for display purposes (not stored in simple config)
const TYPO_META = [
    { tag: 'h1', text: 'HEADLINE H1 - VRAKFEST', desc: 'Main Hero Titles (Bebas Neue)', class: 'font-bebas font-semibold text-[#F4CE14] uppercase tracking-tight leading-none' },
    { tag: 'h2', text: 'HEADLINE H2 - SECTION', desc: 'Section Headers (Bebas Neue)', class: 'font-bebas font-semibold text-[#F4CE14] uppercase tracking-tight leading-none' },
    { tag: 'h3', text: 'HEADLINE H3 - CARD', desc: 'Card Titles (Bebas Neue)', class: 'font-bebas font-semibold text-white uppercase tracking-tight leading-none' },
    { tag: 'h4', text: 'HEADLINE H4 - SUB', desc: 'Subheadings (Bebas Neue)', class: 'font-bebas font-semibold text-white uppercase tracking-tight leading-none' },
    { tag: 'p', text: 'Body Text - Industrial design language relies on monospace fonts data.', desc: 'Standard Paragraph (Space Mono)', class: 'font-tech text-gray-400 leading-relaxed' },
    { tag: 'small', text: 'SMALL TEXT / METADATA', desc: 'Captions, Labels (Space Mono)', class: 'font-tech text-gray-500 tracking-widest uppercase font-bold' },
];

// Initial defaults matching ThemeController
const DEFAULT_VALUES = {
    desktop: { h1: 6, h2: 4.5, h3: 3, h4: 2.25, p: 1.125, small: 0.875 },
    tablet: { h1: 4.5, h2: 3.5, h3: 2.5, h4: 1.75, p: 1, small: 0.8 },
    mobile: { h1: 3, h2: 2.25, h3: 1.75, h4: 1.5, p: 1, small: 0.75 }
};

export const DesignSystem = () => {
    const [viewMode, setViewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
    const [baseFontSize, setBaseFontSize] = useState(16);

    // Complex state holding all 3 configs
    const [config, setConfig] = useState(DEFAULT_VALUES);

    // Load saved settings on mount
    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            const parsed = JSON.parse(stored);
            setBaseFontSize(parsed.baseFontSize || 16);

            // Reconstruct config object from array storage
            // Storage saves arrays: { desktop: [{tag, rem}, ...], ... }
            // We convert to map for easier editing: { desktop: { h1: 6, ... }, ... }
            const newConfig = { ...DEFAULT_VALUES };

            ['desktop', 'tablet', 'mobile'].forEach(mode => {
                if (parsed[mode]) {
                    const modeMap: any = {};
                    parsed[mode].forEach((item: any) => {
                        modeMap[item.tag] = item.rem;
                    });
                    // @ts-ignore
                    newConfig[mode] = modeMap;
                }
            });
            // @ts-ignore
            setConfig(newConfig);
        }
    }, []);

    const handleRemChange = (tag: string, newRem: string) => {
        const val = parseFloat(newRem);
        setConfig(prev => ({
            ...prev,
            [viewMode]: {
                // @ts-ignore
                ...prev[viewMode],
                [tag]: val
            }
        }));
    };

    const handleSave = () => {
        // Convert back to array format for ThemeController
        const exportFormat = {
            desktop: TYPO_META.map(m => ({ tag: m.tag, rem: config.desktop[m.tag as keyof typeof config.desktop] })),
            tablet: TYPO_META.map(m => ({ tag: m.tag, rem: config.tablet[m.tag as keyof typeof config.tablet] })),
            mobile: TYPO_META.map(m => ({ tag: m.tag, rem: config.mobile[m.tag as keyof typeof config.mobile] })),
        };

        saveTheme(baseFontSize, exportFormat);
        alert(`SAVED! Configuration for ALL devices updated.`);
    };

    const containerWidth = viewMode === 'desktop' ? 'w-full' : viewMode === 'tablet' ? 'w-[768px]' : 'w-[375px]';
    const containerMx = viewMode === 'desktop' ? '' : 'mx-auto border-x-2 border-white/10 shadow-2xl';

    // Helper to get current value
    // @ts-ignore
    const getCurrentRem = (tag: string) => config[viewMode][tag];

    return (
        <div className="min-h-screen bg-[#111] text-white pt-32 pb-20">
            <div className="container mx-auto px-6 mb-16">
                <SectionHeader
                    title="SYSTEM DESIGN [DSGN]"
                    subtitle="CORE VISUAL LANGUAGE & COMPONENTS"
                />

                {/* View Mode Switcher */}
                <div className="sticky top-24 z-50 bg-[#111]/90 backdrop-blur-md py-4 border-b border-white/10 mb-12 flex justify-between items-center">
                    <div className="flex gap-2">
                        <button
                            onClick={() => setViewMode('desktop')}
                            className={`flex items-center gap-2 px-4 py-2 font-tech text-sm uppercase tracking-widest transition-colors border border-transparent ${viewMode === 'desktop' ? 'bg-[#F4CE14] text-black font-bold' : 'bg-white/5 hover:bg-white/10 text-gray-400 hover:border-white/20'}`}
                        >
                            <Monitor size={18} /> Desktop
                        </button>
                        <button
                            onClick={() => setViewMode('tablet')}
                            className={`flex items-center gap-2 px-4 py-2 font-tech text-sm uppercase tracking-widest transition-colors border border-transparent ${viewMode === 'tablet' ? 'bg-[#F4CE14] text-black font-bold' : 'bg-white/5 hover:bg-white/10 text-gray-400 hover:border-white/20'}`}
                        >
                            <Tablet size={18} /> Tablet
                        </button>
                        <button
                            onClick={() => setViewMode('mobile')}
                            className={`flex items-center gap-2 px-4 py-2 font-tech text-sm uppercase tracking-widest transition-colors border border-transparent ${viewMode === 'mobile' ? 'bg-[#F4CE14] text-black font-bold' : 'bg-white/5 hover:bg-white/10 text-gray-400 hover:border-white/20'}`}
                        >
                            <Smartphone size={18} /> Mobile
                        </button>
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="text-xs font-tech text-gray-500 uppercase hidden md:inline">
                            Editing: <span className="text-[#F4CE14] font-bold">{viewMode}</span>
                        </span>
                        <button
                            onClick={handleSave}
                            className="bg-[#F4CE14] hover:bg-white text-black px-6 py-2 flex items-center gap-2 font-bebas text-lg transition-all shadow-lg"
                        >
                            <Save size={18} /> ULOŽIT VŠE
                        </button>
                    </div>
                </div>

                {/* Content Container based on ViewMode */}
                <div className={`${containerWidth} ${containerMx} transition-all duration-300 relative`}>

                    {/* Visual Reference of Device Frame */}
                    {viewMode !== 'desktop' && (
                        <div className="absolute -top-6 left-0 text-[10px] text-gray-500 font-tech uppercase">
                            Device Preview: {viewMode} ({viewMode === 'tablet' ? '768px' : '375px'})
                        </div>
                    )}

                    {/* TYPOGRAPHY */}
                    <section className="mb-24">
                        <div className="flex items-center gap-4 mb-8">
                            <Type className="text-[#F4CE14]" />
                            <h3 className="font-bebas text-4xl text-white tracking-tight">TYPOGRAPHY CONFIG</h3>
                        </div>

                        <div className="space-y-4 border border-white/5 p-8 bg-black/50">
                            <p className="font-tech text-xs text-gray-500 mb-8 max-w-2xl">
                                Adjusting values below changes the font size specifically for
                                <span className="text-[#F4CE14] font-bold uppercase"> {viewMode} </span>
                                devices. Click "ULOŽIT VŠE" to apply changes globally.
                            </p>

                            {TYPO_META.map((item, i) => {
                                const currentRem = getCurrentRem(item.tag);
                                return (
                                    <div key={i} className="grid md:grid-cols-[1fr_3fr] gap-8 items-baseline border-b border-white/5 pb-8 last:border-0 last:pb-0">
                                        <div className="font-tech text-gray-500 text-sm">
                                            <span className="text-[#F4CE14] font-bold block mb-1">&lt;{item.tag}&gt;</span>
                                            <p className="mb-4 text-xs">{item.desc}</p>

                                            <div className="bg-white/5 p-3 border border-white/10 inline-flex flex-col gap-2 min-w-[200px]">
                                                <div className="flex items-center gap-2 w-full justify-between">
                                                    <label className="text-xs uppercase font-bold text-gray-500">REM ({viewMode}):</label>
                                                    <input
                                                        type="number"
                                                        step="0.125"
                                                        value={currentRem}
                                                        onChange={(e) => handleRemChange(item.tag, e.target.value)}
                                                        className="w-20 bg-black border border-white/20 text-[#F4CE14] font-mono text-sm px-2 py-1 focus:border-[#F4CE14] outline-none text-right"
                                                    />
                                                </div>
                                                <div className="text-[10px] text-gray-500 pt-2 border-t border-white/5 flex justify-between">
                                                    <span>Computed:</span>
                                                    <span className="text-white font-bold">{(currentRem * baseFontSize).toFixed(1)}px</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            {/* Preview applies the styles inline immediately for feedback */}
                                            <div
                                                className={item.class}
                                                style={{ fontSize: `${currentRem}rem` }}
                                            >
                                                {item.text}
                                            </div>
                                            <div className="mt-2 flex gap-4 opacity-50 text-[10px] font-mono text-gray-600">
                                                <span>Current: {currentRem}rem</span>
                                                <span>Mode: {viewMode}</span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </section>

                    {/* COLORS (Static for now) */}
                    <section className="mb-24">
                        <div className="flex items-center gap-4 mb-8">
                            <Palette className="text-[#F4CE14]" />
                            <h3 className="font-bebas text-4xl text-white tracking-tight">COLOR PALETTE</h3>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {[
                                { name: 'PRIMARY', hex: '#F4CE14', variable: 'var(--primary)' },
                                { name: 'BG DARK', hex: '#111111', variable: 'var(--bg-dark)' },
                                { name: 'BG DARKER', hex: '#0a0a0a', variable: 'var(--bg-darker)' },
                                { name: 'BG CARD', hex: '#1a1a1a', variable: 'var(--bg-card)' },
                            ].map((color) => (
                                <div key={color.name} className="group">
                                    <div
                                        className="h-24 w-full mb-4 border border-white/10 shadow-xl group-hover:scale-[1.02] transition-transform"
                                        style={{ backgroundColor: color.variable }}
                                    ></div>
                                    <div className="font-tech text-xs">
                                        <p className="text-white font-bold uppercase">{color.name}</p>
                                        <p className="text-gray-500">{color.hex}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                </div>
            </div>
        </div>
    );
};
