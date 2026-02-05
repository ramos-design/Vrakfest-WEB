import React from 'react';

export const SectionHeader = ({ title, subtitle, align = 'left' }: { title: React.ReactNode, subtitle?: React.ReactNode, align?: 'left' | 'center' | 'right' }) => (
    <div className={`mb-12 ${align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left'}`}>
        <h2 style={{ fontSize: 'var(--fs-h2)' }} className="font-bebas font-semibold text-[#F4CE14] tracking-tight leading-[1.1] mb-2 uppercase">
            {title}
        </h2>
        {subtitle && <p className="font-tech text-gray-400 tracking-widest uppercase text-sm md:text-base">{subtitle}</p>}
        <div className={`w-24 h-1 bg-[#F4CE14] mt-4 relative ${align === 'center' ? 'mx-auto' : align === 'right' ? 'ml-auto' : ''}`}>
            <div className="absolute top-0 right-0 w-4 h-full bg-white animate-pulse"></div>
        </div>
    </div>
);
