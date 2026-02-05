# VrakFest Design System & Typography Guide

This document serves as a reference for the visual language of the VrakFest web application as of February 2026.

## 1. Typography

### Font Families
- **Headlines (H1, H2, H3, H4):** `Bebas Neue` (via `.font-bebas`). Characterized by bold, condensed, and powerful racing aesthetics.
- **Body & Technical Text:** `Space Mono` (via `.font-tech`). Monospaced font for an industrial, data-driven feel.
- **Secondary Headings (CSS Variable):** `Oswald` is also defined in variables but primarily `Bebas Neue` is used in React components.

### Font Sizes (REM Units)
Based on a base font size of `16px`.

| Element | Desktop | Tablet | Mobile | Tailwind Class / Style |
| :--- | :--- | :--- | :--- | :--- |
| **H1** | 6.75rem (108px) | 4.5rem (72px) | 4.0rem (64px) | `.font-bebas font-semibold text-white uppercase tracking-tight` |
| **H2** | 4.5rem (72px) | 3.5rem (56px) | 4.0rem (64px) | `.font-bebas font-semibold text-[#F4CE14] uppercase tracking-tight` |
| **H3** | 3.0rem (48px) | 2.5rem (40px) | 2.75rem (44px) | `.font-bebas font-semibold text-white uppercase tracking-tight` |
| **H4** | 2.25rem (36px) | 1.75rem (28px) | 2.0rem (32px) | `.font-bebas font-semibold text-white uppercase tracking-tight` |
| **P (Body)** | 1.125rem | 1.0rem | 1.125rem (18px) | `.font-tech text-gray-400 leading-relaxed` |
| **Small** | 0.875rem | 0.8rem | 0.9rem | `.font-tech text-gray-500 tracking-widest uppercase font-bold` |

## 2. Color Palette

- **Primary (Signal Yellow):** `#F4CE14` (Variable: `--primary`)
- **Accent (Orange):** `#ff4d00` (Variable: `--accent-orange`)
- **Background (Dark):** `#111111` (Variable: `--bg-dark`)
- **Background (Darker):** `#0a0a0a` (Variable: `--bg-darker`)
- **Card Background:** `#1a1a1a` (Variable: `--bg-card`)
- **Text Main:** `#e0e0e0`
- **Text Muted:** `#888888`
- **Border Color:** `#333333`

## 3. Global Styles & Utilities

- **Scroll Behavior:** `smooth`
- **Skew Buttons:** `-15deg` skew applied to buttons for aggressive racing feel.
- **Selection:** Background `#F4CE14`, Text `black`.
- **Global Smooth Scroll:** Lenis library initialized in `App.tsx` for premium inertia scrolling.

## 4. Key Components & Code Snippets
### Section Header
```tsx
<SectionHeader 
  title={<>MILUJEME AUTA,<br />ZÁBAVU A <span className="text-white">ADRENALIN</span></>} 
  subtitle="JSME KOMUNITA PŘÁTEL, CO MAJÍ RÁDI BOURAČKY." 
/>
```

### Primary Button (Skewed)
```tsx
<Button className="bg-[#F4CE14] text-black hover:bg-white">
  KOUPIT VSTUPENKU
</Button>
```

### Outline Button
```tsx
<Button variant="outline" className="!border-white !text-white hover:!bg-white hover:!text-black">
  BODOVÉ POŘADÍ
</Button>
```

### 3D Roll Button (Internal Component)
```tsx
<div className="button_container">
  <div className="b05_3d_roll">
    <div className="spacer">CHCI ZÁVODIT</div>
    <div className="roll-side">CHCI ZÁVODIT</div>
    <div className="roll-side">CHCI ZÁVODIT</div>
  </div>
</div>
```

---
*Note: This guide is for internal developer reference. The visual Design System page /dsgn has been decommissioned.*
