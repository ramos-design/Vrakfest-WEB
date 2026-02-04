import React, { useEffect } from 'react';

// Default configuration structure holding values for all devices
// Desktop is base, Tablet < 1024, Mobile < 640
const DEFAULT_CONFIG = {
    baseFontSize: 16,
    desktop: [
        { tag: 'h1', rem: 6 },
        { tag: 'h2', rem: 4.5 },
        { tag: 'h3', rem: 3 },
        { tag: 'h4', rem: 2.25 },
        { tag: 'p', rem: 1.125 },
        { tag: 'small', rem: 0.875 },
    ],
    tablet: [
        { tag: 'h1', rem: 4.5 },
        { tag: 'h2', rem: 3.5 },
        { tag: 'h3', rem: 2.5 },
        { tag: 'h4', rem: 1.75 },
        { tag: 'p', rem: 1 },
        { tag: 'small', rem: 0.8 },
    ],
    mobile: [
        { tag: 'h1', rem: 3 },
        { tag: 'h2', rem: 2.25 },
        { tag: 'h3', rem: 1.75 },
        { tag: 'h4', rem: 1.5 },
        { tag: 'p', rem: 1 },
        { tag: 'small', rem: 0.75 },
    ]
};

export const STORAGE_KEY = 'vrakfest_theme_responsive_config';

export const saveTheme = (baseFontSize: number, typographyConfig: any) => {
    const config = {
        baseFontSize,
        ...typographyConfig // expects { desktop: [], tablet: [], mobile: [] }
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    applyTheme(config);
};

export const applyTheme = (config: any) => {
    if (!config) return;

    // 1. Set Base Font Size (global)
    document.documentElement.style.fontSize = `${config.baseFontSize}px`;

    // 2. Generate CSS Block with Media Queries
    // This allows us to use CSS variables that change based on viewport width
    const styleId = 'vrakfest-dynamic-theme';
    let styleEl = document.getElementById(styleId);

    if (!styleEl) {
        styleEl = document.createElement('style');
        styleEl.id = styleId;
        document.head.appendChild(styleEl);
    }

    // Helper to generate vars string
    const getVars = (items: any[]) => items.map(item => `--fs-${item.tag}: ${item.rem}rem;`).join('\n');

    // We define Desktop as root (default), then override for smaller screens
    const css = `
    /* Default / Desktop (Base) */
    :root {
      ${getVars(config.desktop)}
    }

    /* Tablet Override */
    @media (max-width: 1024px) {
      :root {
        ${getVars(config.tablet)}
      }
    }

    /* Mobile Override */
    @media (max-width: 640px) {
      :root {
        ${getVars(config.mobile)}
      }
    }
  `;

    styleEl.innerHTML = css;
};

export const ThemeController = () => {
    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                applyTheme(JSON.parse(stored));
            } else {
                applyTheme(DEFAULT_CONFIG);
            }
        } catch (e) {
            console.error('Failed to load theme:', e);
        }
    }, []);

    return null;
};
