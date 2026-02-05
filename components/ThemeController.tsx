import React, { useEffect } from 'react';

// Default configuration structure holding values for all devices
// Desktop is base, Tablet < 1024, Mobile < 640
const DEFAULT_CONFIG = {
  baseFontSize: 16,
  desktop: { h1: 6.75, h2: 4.5, h3: 3, h4: 2.25, p: 1.125, small: 0.875 },
  tablet: { h1: 4.5, h2: 3.5, h3: 2.5, h4: 1.75, p: 1, small: 0.8 },
  mobile: { h1: 4, h2: 4, h3: 2.75, h4: 2, p: 1.125, small: 0.9 }
};

export const applyTheme = (config: any) => {
  if (!config) return;

  // 1. Set Base Font Size (global)
  document.documentElement.style.fontSize = `${config.baseFontSize}px`;

  // 2. Generate CSS Block with Media Queries
  const styleId = 'vrakfest-dynamic-theme';
  let styleEl = document.getElementById(styleId);

  if (!styleEl) {
    styleEl = document.createElement('style');
    styleEl.id = styleId;
    document.head.appendChild(styleEl);
  }

  // Helper to generate vars string
  const getVars = (items: { [key: string]: number }) =>
    Object.entries(items)
      .map(([tag, rem]) => `--fs-${tag}: ${rem}rem;`)
      .join('\n');

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
    applyTheme(DEFAULT_CONFIG);
  }, []);

  return null;
};
