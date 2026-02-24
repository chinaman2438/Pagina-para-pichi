---
name: brand-guidelines
description: Applies Kingfisher Medical's brand visual language — colors, typography, image treatment, texture, and composition — to any web, print, or digital artifact. Use whenever visual styling, brand consistency, image treatment, or layout composition guidance is needed.
license: Complete terms in LICENSE.txt
---

# Kingfisher Medical — Brand Guidelines

## Overview

This skill defines the complete visual system for Kingfisher Medical, derived from reference screenshots and the Brand.md image-treatment principles. It covers: color palette, typography, image & texture treatment, composition patterns, and component styling.

**Keywords**: branding, brand guidelines, visual identity, color palette, typography, image treatment, duochrome, photo overlay, composition, web design, medical brand, Kingfisher Medical

---

## 1. Color Palette

### Primary Colors

| Role | Name | Hex | Usage |
|---|---|---|---|
| Primary Dark | Navy Blue | `#1A3A8F` | Headers, navigation bar, primary CTAs, hero headlines |
| Secondary Dark | Dark Charcoal | `#2A2A2A` | Dropdown backgrounds, body text, dark UI surfaces |
| Near-Black | Rich Black | `#1C1C1C` | CTA buttons (filled), high-contrast elements |
| Light | Clean White | `#FFFFFF` | Page backgrounds, card surfaces, text on dark |

### Accent Colors

| Role | Name | Hex | Usage |
|---|---|---|---|
| Purple Accent | Corporate Purple | `#6B3FA0` | Accent lines, product badges, highlight labels, triage purple zone tags |
| Warm Red | Alert Red | `#CC2929` | Urgent triage indicators, alert states |
| Safety Yellow | Caution Yellow | `#F5C800` | Triage tags (minor/delayed), warning states |
| Medical Green | Action Green | `#4A8C3F` | SmartSafe branding, success states, triage green tags |

### Neutral / Supporting Colors

| Role | Name | Hex | Usage |
|---|---|---|---|
| Body Text | Dark Gray | `#2D2D2D` | Standard body copy |
| Subtle Text | Medium Gray | `#6B6B6B` | Captions, secondary/muted text |
| Divider | Light Gray | `#E0E0E0` | Horizontal rules, form borders, section separators |
| Overlay | Dark Blue-Gray | `rgba(20, 40, 90, 0.55)` | Photo overlay wash for duochrome/cinematic hero sections |

### Color Rules
- The primary action color is **Navy Blue** (`#1A3A8F`) — used on nav bars and primary buttons
- Purple (`#6B3FA0`) functions as the subtle decorative accent (underlines, badges, zone labels)
- Triage colors (red, yellow, green, purple) are **functional** — use them only as status/category indicators, never decoratively
- New elements introduced to a composition **must obey** the existing palette — do not add unrelated hues

---

## 2. Typography

### Typefaces

| Context | Font | Fallback | Style |
|---|---|---|---|
| Navigation | Arial / Helvetica | sans-serif | ALL CAPS, wide letter-spacing (0.1–0.15em), medium weight |
| Hero Headlines | Arial Bold / Impact | sans-serif | Bold/ExtraBold, large scale (48–72px), Navy Blue or White |
| Section Headings | Arial Bold | sans-serif | Bold, 28–36px, dark charcoal or navy |
| Body Text | Arial / Helvetica | sans-serif | Regular weight, 15–17px, line-height 1.6, dark gray |
| CTA Buttons | Arial Bold | sans-serif | Bold, 14–16px, ALL CAPS or Title Case, high contrast |
| Form Labels | Arial | sans-serif | Regular, 14px, muted gray |

### Typographic Rules
- **Navigation items** are ALL CAPS with wide tracking — this is a hard brand rule
- **Headlines** are always heavy/bold weight, never light
- **Body text** is generous line-height for medical readability
- Purple accent lines (thin `3px` horizontal rule in `#6B3FA0`) are used under section headings for visual anchoring
- Do not use serif typefaces — the brand is clean, clinical, and authoritative

---

## 3. Image & Texture Treatment

This is the core of the visual system. Per Brand.md:

> *"Working with photos, illustrations and textures is just as important as the color palette. Photos become duochrome due to combinations of corporate colors. An accent is a bright circle of color, texture or line."*

### The Duochrome / Overlay Method

All photographic hero and banner backgrounds use a **color wash overlay** — never raw, full-color photography.

**How to apply:**
1. Start with a real, editorial-style photo (medical staff, emergency scenes, field equipment)
2. Apply a dark blue-gray overlay using `rgba(20, 40, 90, 0.55)` — this desaturates and blue-tones the image
3. The result should feel **cinematic and subdued**, with the brand's navy tone bleeding through
4. White text and icons sit on top of this overlay cleanly

**Observed effects across reference images:**
- Image 1 (hero): Hospital staff photo with blue-tinted desaturated overlay → product photography floated on top
- Image 3 (stats banner): Accident scene photo treated to near-monochrome blue-gray, icons and white text overlaid
- Both achieve the "duochrome" effect: one tone from the brand palette merges with the photo

### Product Photography
- Product shots use **clean white or very light neutral backgrounds** — clinical, sharp, no shadows
- Products can be arranged in collage/floating layouts (image 1) — breaking the grid feels intentional and dynamic
- When grouping products, use slight angles/rotation on individual items to create energy

### Texture Principles
- **Texture comes from the photography itself** — gritty field scenes, hospital environments, equipment close-ups
- No pattern overlays, no grain textures applied digitally on their own
- The duochrome overlay IS the texture system — it unifies diverse photos into one visual language
- **Accent circles/color blocks** (per Brand.md): bright isolated color circles or bold rectangular labels (e.g., "HOSPITAL EVACUATION PURPLE ZONE") act as punctuation within a composition

---

## 4. Composition Patterns

### Hero / Full-Bleed Sections
- Full-width photo background with overlay
- Text left-aligned, headline extremely large and bold
- Supporting text in a smaller weight below headline
- CTA button: rounded rectangle, solid navy blue fill, white text, prominent but not oversized
- Product photography floated on the right side of the frame, partially overlapping content areas

### Content Sections (White Background)
- Clean, generous whitespace
- Section heading with purple accent underline (`#6B3FA0`, 3px, ~48px wide)
- Centered heading + left-aligned or centered body copy
- Product grid: equal-width columns (3–4 across), product image on top + title + short description below
- Dividers: thin `1px` light gray lines (`#E0E0E0`)

### Feature Banners (Dark Overlay on Photo)
- 3-column icon + heading + body layout
- Icons: simple line icons in Navy Blue
- All text in white, no outlined/bordered boxes needed — spacing does the work
- Columns are equal-width, centered within the banner

### Navigation
- Sticky header bar in solid Navy Blue (`#1A3A8F`)
- Logo in white on left, nav items in white ALL CAPS on right
- Dropdown menu: near-black (`#2A2A2A`) background, muted gray text, items in ALL CAPS
- Cart/search icons in white, clean and minimal
- Zero decorative elements in the nav — authority through restraint

### Forms / Contact
- Extremely clean: white background, light gray input borders, minimal to no shadows
- Labels above inputs (not placeholder-only)
- Submit CTA: full black fill, white bold text, no border radius (squared edges = authority/trust)
- Left column: contact info in plain body text; Right column: the form

---

## 5. Component Styling Reference

### Primary Button
```css
background: #1A3A8F;
color: #FFFFFF;
border: none;
border-radius: 4px;
padding: 12px 28px;
font-weight: 700;
font-size: 15px;
letter-spacing: 0.03em;
```

### Dark CTA Button (e.g., "SEND")
```css
background: #1C1C1C;
color: #FFFFFF;
border: none;
border-radius: 0;
padding: 12px 32px;
font-weight: 700;
font-size: 14px;
letter-spacing: 0.08em;
text-transform: uppercase;
```

### Navigation Bar
```css
background: #1A3A8F;
color: #FFFFFF;
font-size: 13px;
font-weight: 600;
letter-spacing: 0.12em;
text-transform: uppercase;
```

### Dropdown Menu
```css
background: #2A2A2A;
color: #B0B0B0;
font-size: 13px;
font-weight: 600;
letter-spacing: 0.1em;
text-transform: uppercase;
```

### Photo Overlay (Hero / Banner)
```css
background-color: rgba(20, 40, 90, 0.55);
/* Applied as a pseudo-element or wrapper over a background-image */
```

### Section Accent Line
```css
width: 48px;
height: 3px;
background: #6B3FA0;
margin: 8px auto 24px;
```

### Form Input
```css
border: 1px solid #D0D0D0;
border-radius: 2px;
padding: 10px 14px;
font-size: 15px;
color: #2D2D2D;
background: #FFFFFF;
```

---

## 6. Do's & Don'ts

### ✅ Do
- Use duochrome overlay treatment on all photographic backgrounds
- Keep the nav in solid Navy Blue with ALL CAPS labels
- Float product photography at angles over hero backgrounds
- Use purple accent lines under section headings
- Keep form UI stripped back and clinical
- Let triage colors (red/yellow/green/purple) carry their medical meaning
- Reference the palette when introducing any new visual element

### ❌ Don't
- Use raw, unedited full-color photography as backgrounds
- Add new brand colors without updating this guideline
- Use serif typefaces
- Apply drop shadows heavily — keep depth subtle
- Use triage-category colors for decorative purposes
- Over-crowd layouts — whitespace is part of the brand language
