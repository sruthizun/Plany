# Calendly Website Design System Specification

> **Specification Status:** Production Verified & Evidence-Based  
> **Target Domain:** [https://calendly.com/](https://calendly.com/)  
> **Verification Date:** 2026-10-13  
> **Design Architecture:** Astro Modern Component Engine + Tailwind CSS v4 Utility Framework + Custom Design Tokens  
> **Source Evidence:** Production CSS bundles (`/_astro/layouts.Bf65L7qA.css`, `/_astro/src.CY4XUkqM.css`, `/_astro/src.lnULwviv.css`, `widget.css`) + live DOM inspection.

---

## 1. Executive Summary & Verification Methodology

This design system document provides the concrete specifications for Calendly's live web interface to guide the development of Plany. Every property in this document has been reviewed against production assets and classified according to four strict evidence tiers:

- **`[Measured]`**: Directly confirmed from production CSS rules, `@font-face` declarations, or CSS custom properties.
- **`[Observed]`**: Directly confirmed from live production HTML structure, element attributes, or component props.
- **`[Estimated]`**: Inferred from contextual combinations where exact computed pixel sizing is dynamic or viewport-dependent.
- **`[Unverified]`**: Insufficient direct evidence to confirm without authenticated runtime browser sessions.

### Inspected URLs & Endpoints
1. **Homepage:** `https://calendly.com/` `[Observed]`
2. **Pricing & Plans:** `https://calendly.com/pricing` `[Observed]`
3. **Product & Scheduling:** `https://calendly.com/scheduling` `[Observed]`
4. **Auth & Conversion:** `https://calendly.com/signup` `[Observed]`
5. **Contact Sales:** `https://calendly.com/sales` `[Observed]`
6. **External Widget Runtime:** `https://assets.calendly.com/assets/external/widget.css` `[Measured]`
7. **Production Layout Stylesheet:** `https://calendly.com/_astro/layouts.Bf65L7qA.css` `[Measured]`

---

## 2. Typography System

Calendly employs a variable font architecture combining a custom brand display font (`Calendly Sans`), a geometric UI sans (`Geist`), and an editorial serif (`Wulkan Text`).

### 2.1 Font Families `[Measured]`

| Role | Font Family | Source File / Delivery | Weights / Variants | Fallback Stack | Evidence |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Brand Primary** | `Calendly Sans` | `/_astro/calendly-sans-variable.D6oRyvrG.woff2` | Variable (100–900), oblique `0deg 10deg` | `system-ui, -apple-system, "Segoe UI", Roboto, sans-serif` | `[Measured]` |
| **UI & Body Sans** | `Geist` | `/_astro/geist-latin.BfrrXRGr.woff2` | Variable (100–900), Normal | `system-ui, -apple-system, "Segoe UI", Roboto, sans-serif` | `[Measured]` |
| **Editorial Serif** | `Wulkan Text` | `/_astro/wulkan-text-regular.Bg2PuYJH.woff2` | Static (400, 500, 600), Normal & Italic | `Georgia, serif` | `[Measured]` |
| **Monospace / Code** | `ui-monospace` | System Native | 400, 500 | `SFMono-Regular, Menlo, Monaco, Consolas, "Courier New", monospace` | `[Measured]` |

#### Production `@font-face` Rules `[Measured]`
```css
@font-face {
  font-family: 'Calendly Sans';
  src: url('/_astro/calendly-sans-variable.D6oRyvrG.woff2') format('woff2');
  font-weight: 100 900;
  font-style: oblique 0deg 10deg;
  font-display: swap;
}

@font-face {
  font-family: 'Geist';
  src: url('/_astro/geist-latin.BfrrXRGr.woff2') format('woff2');
  font-weight: 100 900;
  font-style: normal;
  font-display: swap;
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}

@font-face {
  font-family: 'Wulkan Text';
  src: url('/_astro/wulkan-text-regular.Bg2PuYJH.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
```

### 2.2 Typographic Hierarchy & Scale `[Measured]`

Calendly couples Tailwind utility classes with dedicated `.type-*` classes:

| Class Selector | Font Size | Fixed Size | Line Height | Letter Spacing | Font Weight | Typical Usage | Evidence |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `.type-huge` | `40px` | — | `1.1` (`--leading-ui-huge`) | `0px` (fixed: `-2px`) | 500 (`medium`) | Hero Mega Headings | `[Measured]` |
| `.type-h1` | `36px` | — | `1.1` (`--leading-ui-h1`) | `0px` (fixed: `-2px`) | 500 (`medium`) | Page H1 Hero Titles | `[Measured]` |
| `.type-h2` / `-fixed` | `28px` | `48px` | `1.1` (`--leading-ui-h2`) | `0px` (fixed: `-2px`) | 500 (`medium`) | Major Section Headings | `[Measured]` |
| `.type-h3` / `-fixed` | `24px` | `36px` | `1.1` (`--leading-ui-h3`) | `0px` (fixed: `-1px`) | 500 (`medium`) | Subsection Titles | `[Measured]` |
| `.type-h4` / `-fixed` | `22px` | `28px` | `1.2` (`--leading-ui-h4`) | `0px` | 500 (`medium`) | Card Headers | `[Measured]` |
| `.type-h5` / `-fixed` | `20px` | `24px` | `1.4` (`--leading-ui-h5`) | `0px` | 500 (`medium`) | Subtitles / Pricing Tiers | `[Measured]` |
| `.type-h6` | `18px` | — | `1.4` (`--leading-ui-h6`) | `0px` | 500 (`medium`) | Small Section Heads | `[Measured]` |
| `.type-body-xl` | `18px` | — | `1.4` (`--leading-ui-body-xl`)| `0px` | 400 (`regular`) | Hero Lead Paragraphs | `[Measured]` |
| `.type-body-lg` | `16px` | — | `1.4` (`--leading-ui-body-lg`)| `0px` | 400 (`regular`) | Section Lead Copy | `[Measured]` |
| `.type-body-md` / `-fixed` | `14px` | `16px` | `1.4` (`--leading-ui-body-md`)| `0px` | 400 (`regular`) | Forms, Inputs, Body Text | `[Measured]` |
| `.type-body-sm` / `-fixed` | `12px` | `14px` | `1.4` (`--leading-ui-body-sm`)| `0px` | 400 (`regular`) | Nav Links, Buttons | `[Measured]` |
| `.type-body-xs` / `-fixed` | `10px` | `12px` | `1.4` (`--leading-ui-body-xs`)| `0px` | 400 (`regular`) | Legal Footnotes | `[Measured]` |
| `.type-overline` / `-fixed`| `12px` | `12px` | `1.0` (`--leading-ui-overline`)| `0px` (fixed: `1px`) | 500 (`medium`) | Uppercase Badges/Eyebrows | `[Measured]` |
| `.type-caption` | `12px` | — | `1.4` (`--leading-ui-caption`)| `0px` | 500 (`medium`) | Captions & Metadata | `[Measured]` |

*Note: Headings in `.type-*` defaults to medium weight (`500`). Specific hero components override this with `font-bold` (`700`) or `font-semibold` (`600`) classes.* `[Observed]`

---

## 3. Color Palette & Theming

### 3.1 Brand Core & Neutrals `[Measured]`

| Token Name | Hex Value | Primary Application | Evidence |
| :--- | :--- | :--- | :--- |
| `--color-midnight` | `#071a31` | Brand Dark: Headings, primary CTA background, high-contrast borders | `[Measured]` |
| `--color-navy` | `#0e396a` | Deep Navy: Primary CTA hover background, secondary pressed background | `[Measured]` |
| `--color-cobalt` | `#1e5ea7` | Interactive Blue: Primary CTA pressed background, hyperlink color | `[Measured]` |
| `--color-cornflower` | `#6bb1ff` | Focus Ring: Keyboard focus borders (`--color-action-focus-border`) | `[Measured]` |
| `--color-lake` | `#4890e3` | Mid Blue accent in graphics and illustrations | `[Measured]` |
| `--color-sky` | `#c1defe` | Light Blue surface accent, dark mode hover text | `[Measured]` |
| `--color-cloud` | `#f4f9ff` | Pale cloud blue section background tint | `[Measured]` |
| `--color-rain` | `#edf5ff` | Pale rain blue section background tint | `[Measured]` |
| `--color-magnolia` | `#fcfbf8` | Signature warm off-white canvas (`--color-surface-bg-primary`) | `[Measured]` |
| `--color-linen` | `#f5f3ee` | Secondary warm sand canvas (`--color-surface-bg-secondary`) | `[Measured]` |
| `--color-white` | `#ffffff` | Pure white card surfaces, form inputs, dropdown backgrounds | `[Measured]` |
| `--color-smoke` | `#f5f5f7` | Cool off-white neutral card background | `[Measured]` |
| `--color-ash` | `#e4e6e9` | Divider lines, rule borders | `[Measured]` |
| `--color-silver` | `#d8dce0` | Subtle borders, disabled action background (`--color-border-subtle`) | `[Measured]` |
| `--color-steel` | `#5f6d77` | Muted secondary text, tertiary hover text, icon gray | `[Measured]` |
| `--color-onyx` | `#0b0d0f` | Near-black text and dark-mode shadow stops | `[Measured]` |

### 3.2 Neutral Ramp & Disabled States `[Measured]`

| Token Name | Hex Value | Applied State | Evidence |
| :--- | :--- | :--- | :--- |
| `--color-ramp-neutral-200` | `#c6ccd2` | Default form field border (`--color-border-default`) | `[Measured]` |
| `--color-ramp-neutral-300` | `#a4aeb7` | Disabled button outline border | `[Measured]` |
| `--color-ramp-neutral-350` | `#93a0aa` | Tertiary muted text (`--color-text-tertiary`) | `[Measured]` |
| `--color-ramp-neutral-450` | `#748491` | Disabled button and input text | `[Measured]` |
| `--color-ramp-neutral-650` | `#49535c` | Dark mode disabled border | `[Measured]` |
| `--color-ramp-neutral-700` | `#3d464e` | Neutral badge text | `[Measured]` |
| `--color-ramp-neutral-750` | `#323a41` | Dark mode disabled background | `[Measured]` |

### 3.3 Functional Status & Badges `[Measured]`

| State | Background Token | Background Hex | Text Token | Text Hex | Hover Background | Evidence |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Success** | `--color-lime` | `#dbee9f` | `--color-ramp-green-700` | `#3f491b` | `--color-ramp-green-150` (`#cee67e`) | `[Measured]` |
| **Warning** | `--color-ramp-yellow-100` | `#ffe67c` | `--color-ramp-yellow-750` | `#473700` | `--color-ramp-yellow-150` (`#ffd843`) | `[Measured]` |
| **Error** | `--color-ramp-red-100` | `#fedfda` | `--color-ramp-red-700` | `#841f0e` | `--color-ramp-red-150` (`#fcd1ca`) | `[Measured]` |
| **Critical**| `--color-status-error` | `#b32812` | White | `#ffffff` | — | `[Measured]` |
| **Info** | `--color-ramp-blue-100` | `#d5e8fe` | `--color-ramp-blue-700` | `#114580` | — | `[Measured]` |

### 3.4 Button Action States `[Measured]`

Calendly defines strict token mappings for all button interaction states:

| Button Tier | State | Background | Text | Border | Evidence |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Primary** | Default | `#071a31` (`--color-midnight`) | `#fcfbf8` (`--color-magnolia`) | None (2px transparent) | `[Measured]` |
| | Hover | `#0e396a` (`--color-navy`) | `#fcfbf8` | None | `[Measured]` |
| | Pressed | `#1e5ea7` (`--color-cobalt`) | `#fcfbf8` | None | `[Measured]` |
| | Disabled | `#d8dce0` (`--color-silver`) | `#748491` (`--color-ramp-neutral-450`) | None | `[Measured]` |
| **Secondary**| Default | Transparent | `#071a31` (`--color-midnight`) | `1.5px solid #071a31` | `[Measured]` |
| | Hover | `#071a31` (`--color-midnight`) | `#fcfbf8` (`--color-magnolia`) | `1.5px solid #071a31` | `[Measured]` |
| | Pressed | `#0e396a` (`--color-navy`) | `#fcfbf8` | `1.5px solid #0e396a` | `[Measured]` |
| | Disabled | Transparent | `#748491` (`--color-ramp-neutral-450`) | `1.5px solid #a4aeb7` | `[Measured]` |
| **Tertiary** | Default | Transparent | `#071a31` (`--color-midnight`) | None | `[Measured]` |
| | Hover | Transparent | `#5f6d77` (`--color-steel`) | None | `[Measured]` |
| | Pressed | Transparent | `#1e5ea7` (`--color-cobalt`) | None | `[Measured]` |

---

## 4. Layout, Spacing & Container Geometry

### 4.1 Layout Constraints `[Measured]`
- **Global Canvas Max Width:** `1920px` (`--layout-max-width`) `[Measured]`
- **Section Max Width:** `1440px` (`--max-width-section`: `calc(var(--breakpoint-ui-dsk) + 2*80px)`) `[Measured]`
- **Desktop Content Container:** `1280px` (`--breakpoint-ui-dsk` / `max-w-[1280px]`) `[Measured]`
- **Heading Text Max Width:** `640px` (`--max-width-heading`) `[Measured]`
- **Subhead Text Max Width:** `560px` (`--max-width-subhead`) `[Measured]`
- **Carousel Card Width:** `384px` (`--width-scroll-card`) `[Measured]`

### 4.2 Spacing Module `[Measured]`
Based on a `4px` grid (`--spacing: .25rem`):
- `--spacing-xxs`: `4px` `[Measured]`
- `--spacing-xs`: `8px` `[Measured]`
- `--spacing-sm`: `12px` `[Measured]`
- `--spacing-md`: `16px` `[Measured]`
- `--spacing-lg`: `24px` (Horizontal page padding `--spacing-page-padding-horizontal`) `[Measured]`
- `--spacing-xl`: `32px` `[Measured]`
- `--spacing-2xl`: `40px` `[Measured]`
- `--spacing-3xl`: `48px` (Standard section padding `--spacing-section-default`) `[Measured]`
- `--spacing-ui-section-y`: `96px` (Major section vertical padding) `[Measured]`

### 4.3 Corner Radii & Elevation `[Measured]`
- **Buttons:** `8px` (`--radius-btn-small`), `10px` (`--radius-btn-standard`) `[Measured]`
- **OAuth CTA Shape:** `corner-shape: squircle!important; border-radius: 12px;` `[Measured]`
- **Inputs & Controls:** `8px` (`--radius-ui-fixed-xs`) `[Measured]`
- **Cards & Submenus:** `12px` (`--radius-ui-fixed-sm`), `16px` (`--radius-ui-fixed-md`), `20px` (`--radius-ui-fixed-lg`) `[Measured]`
- **Hero Showcase Card:** `24px` (`--radius-ui-fixed-xl`) `[Measured]`
- **Pills & Chips:** `9999px` (`--radius-ui-full`) `[Measured]`

#### Elevation Box Shadows `[Measured]`
```css
--var-shadow-ui-sm: 0 4px 5px #5f6d770a, 0 6px 10px #5f6d770d;
--var-shadow-ui-md: 0 4px 5px #5f6d770a, 0 4px 10px #5f6d7708, 0 10px 20px #5f6d770d;
--var-shadow-ui-lg: 0 4px 5px #5f6d770a, 0 8px 15px #5f6d7708, 0 15px 30px #5f6d770f;
--var-shadow-ui-xl: 0 4px 5px #5f6d770a, 0 8px 15px #5f6d7708, 0 30px 50px #5f6d7714;
--var-shadow-ui-2xl: 0 4px 5px #5f6d770a, 0 10px 15px #5f6d770a, 0 40px 50px #5f6d771a;
```
