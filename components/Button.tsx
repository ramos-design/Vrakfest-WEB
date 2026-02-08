import React from 'react';

export const Button = ({
    children,
    variant = 'primary',
    size = 'default',
    className = '',
    onClick,
    disabled = false,
    type = 'button'
}: {
    children?: React.ReactNode;
    variant?: 'primary' | 'outline' | 'ghost' | 'engine-start';
    size?: 'default' | 'small' | 'medium';
    className?: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void | Promise<void>;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
}) => {
    const isOutline = variant === 'outline';
    const isEngine = variant === 'engine-start';

    // Base classes imitating our .btn .skew-btn from styles.css
    const baseClasses = "relative inline-flex items-center justify-center font-tech font-bold uppercase tracking-wider transform -skew-x-[15deg] transition-all duration-300 cursor-pointer border";

    const sizeClasses = (() => {
        switch (size) {
            case 'small': return "px-6 py-2 text-base";
            case 'medium': return "px-8 py-3 text-[15px]"; // Unchanged, rarely used
            default: return "px-10 py-4 text-[18px]"; // UPDATED: 18px as requested
        }
    })();

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
        <button
            type={type}
            disabled={disabled}
            className={`${baseClasses} ${sizeClasses} ${variantClasses} ${className} ${disabled ? 'opacity-50 cursor-not-allowed grayscale' : ''}`}
            onClick={onClick}
        >
            <span className="block transform skew-x-[15deg]">
                {children}
            </span>
        </button>
    );
};
