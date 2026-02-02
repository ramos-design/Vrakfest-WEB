# Design System Master File (VRAKFEST 2026)

> **LOGIC:** When building a specific page, first check `design-system/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

---

**Project:** Vrakfest 2026
**Generated:** 2026-02-02 12:48:34 (Curated by Antigravity)
**Category:** Event / Automotive
**Style:** High-Tech Grunge / HUD Interface

---

## Global Rules

### Color Palette

| Role | Hex | CSS Variable | Usage |
|------|-----|--------------|-------|
| **Primary** | `#F4CE14` | `--primary` | Signal Yellow - Headlines, Actions |
| **Background** | `#111111` | `--bg-dark` | Main Background (Matte Black) |
| **Card Bg** | `#1A1A1A` | `--bg-card` | Panels, Modals |
| **Text Main** | `#E0E0E0` | `--text-main` | Primary Content |
| **Text Muted** | `#888888` | `--text-muted` | Labels, meta data |
| **Accent** | `#FF4D00` | `--accent-orange` | Warnings, Errors |

### Typography

- **Heading Font:** `Bebas Neue` (Google Fonts)
  - Usage: H1-H3, navigation, buttons
  - Mood: Aggressive, condensed, loud
  
- **Tech Font:** `Share Tech Mono` (Google Fonts)
  - Usage: Telemetry data, dates, times, form inputs
  - Mood: Digital, raw data

- **Body Font:** `Rajdhani` (Google Fonts)
  - Usage: Paragraphs, descriptions
  - Mood: Square, technical but readable

### Visual Effects (Key Effects)
1.  **Skewed Elements:** Buttons and certain containers have `-15deg` skew (`transform: skew(-15deg)`). Text inside is counter-skewed.
2.  **Glitch Effect:** Main headlines use a CSS-only glitch animation with data-text attribute.
3.  **HUD Borders:** Thin 1px borders rather than shadows.
4.  **Corners:** Tactical markers in corners of video frames/images.

---

## Component Specs

### Buttons
```css
.btn {
    font-family: 'Share Tech Mono';
    text-transform: uppercase;
    font-weight: bold;
    transform: skew(-15deg);
}

.btn-primary {
    background-color: #F4CE14; /* Yellow */
    color: #000;
}

.btn-outline {
    border: 1px solid #F4CE14;
    color: #F4CE14;
    background: transparent;
}
```

### Cards (Driver/Event)
- **Shape:** Clipped corner (polygon clip-path)
- **Interaction:** Hover brightness + border highlight
- **Content:** Image top, Gradient overlay bottom with text

### Modals
- **Backdrop:** Blur (5px) + Darken (0.9 opacity)
- **Style:** Tech panel with borders, no rounded corners (or minimal radius)

---

## Anti-Patterns (Do NOT Use)

- ❌ **Rounded Corners:** No standard 8px/12px radius. Use sharp edges or clipped corners.
- ❌ **Drop Shadows:** Avoid diffuse shadows. Use glow or hard borders.
- ❌ **Serif Fonts:** Strictly forbidden.
- ❌ **Clean White Backgrounds:** Always dark mode base.

---

## Pre-Delivery Checklist

- [x] **Performance:** Images lazy loaded (simulated)
- [x] **Responsiveness:** Grid collapses to stack on mobile (<768px)
- [x] **Typography:** All caps for headers enforced
- [x] **Interactivity:** Hover states on all interactive elements
