# Calendly Responsive Specifications

> **Specification Status:** Production Verified & Evidence-Based  
> **Target Domain:** [https://calendly.com/](https://calendly.com/)  
> **Verification Date:** 2026-10-13  
> **Scope:** Multi-device layout behavior, verified breakpoints, media queries, and component responsive adaptations across Desktop, Tablet, and Mobile.

---

## 1. Executive Summary & Verification Methodology

Calendly's responsive architecture couples standard Tailwind CSS media queries with custom CSS breakpoint variables (`--breakpoint-*`) and modern CSS Container Queries (`@container`).

### Evidence & Verification Status
- **Breakpoints & Media Queries:** 100% verified from production stylesheets (`_astro/layouts.Bf65L7qA.css`, `widget.css`) `[Measured]`.
- **Component DOM Visibility:** Verified via production class names (e.g. `ui-sdsk-nav:hidden`, `ui-tb:inline-flex!`, `hidden!`) `[Measured]`.
- **Dynamic Viewport Testing Limitation:** Headless browser automation via Playwright could not be initialized due to a sandbox network 404 downloading the driver. Breakpoints below are directly measured from production code rather than simulated in a live headless browser. Manual browser checks needed are specified in Section 4.

---

## 2. Breakpoint Architecture & Media Queries

### 2.1 Core Breakpoint Variables `[Measured]`

| Variable Name | Pixel Boundary | Target Device | Tailwind Framework Prefix |
| :--- | :--- | :--- | :--- |
| **`--breakpoint-ltb`** | `769px` | Tablet / Large Tablet Boundary | `ui-tb:` |
| **`--breakpoint-ui-sdsk`** | `1024px` | Small Desktop Boundary | `ui-sdsk:`, `ui-sdsk-nav:` |
| **`--breakpoint-ui-dsk`** | `1280px` | Standard Desktop Canvas Boundary | `ui-dsk:` |

### 2.2 Active Media Queries in Production Stylesheets `[Measured]`

```css
/* Mobile Max Boundaries */
@media (width <= 767px) { ... }    /* Mobile Phone Screens */
@media (width <= 975px) { ... }    /* Booking Modal Mobile Boundary (widget.css) */
@media (width <= 1023px) { ... }   /* Mobile & Tablet Combined */
@media (width <= 1279px) { ... }   /* Sub-Desktop Screens */

/* Progressive Min Boundaries */
@media (width >= 481px) { ... }    /* Large Mobile / Phablet */
@media (width >= 577px) { ... }    /* Small Tablet */
@media (width >= 640px) { ... }    /* Tailwind 'sm' */
@media (width >= 768px) { ... }    /* Standard Tablet Portrait */
@media (width >= 769px) { ... }    /* Calendly '--breakpoint-ltb' */
@media (width >= 993px) { ... }    /* Large Tablet / Small Laptop */
@media (width >= 1024px) { ... }   /* Calendly '--breakpoint-ui-sdsk' */
@media (width >= 1072px) { ... }   /* Extended Desktop Nav Breakpoint */
@media (width >= 1280px) { ... }   /* Calendly '--breakpoint-ui-dsk' */

/* Rem-Based Media Queries */
@media (width >= 40rem) { ... }    /* 640px */
@media (width >= 48rem) { ... }    /* 768px */
@media (width >= 64rem) { ... }    /* 1024px */
@media (width >= 80rem) { ... }    /* 1280px */
@media (width >= 96rem) { ... }    /* 1536px */

/* Device Capability Queries */
@media (hover: hover) { ... }      /* Pointer Hover Interactions */
@media (prefers-reduced-motion: no-preference) { ... }
@media (prefers-reduced-motion: reduce) { ... }
```

### 2.3 Container Queries (`@container`) `[Measured]`
On major switchback containers (`[Home]-AccordionSwitchbacks-Scheduling`), Calendly uses CSS container queries:
```html
<div class="w-full flex flex-col @container gap-3xl max-w-[1280px] px-(--section-padding-x)">
```
*Allows children to re-flow based on the container width independently of the outer browser window.* `[Measured]`

---

## 3. Responsive Layout Adaptations by Component

### 3.1 Global Header & Navigation

| Element | Desktop ($\ge 1024\text{px}$) `[Measured]` | Tablet ($768\text{px} - 1023\text{px}$) `[Measured]` | Mobile ($< 768\text{px}$) `[Measured]` |
| :--- | :--- | :--- | :--- |
| **Mega-Menu Links** | Visible horizontal row (`Product`, `Solutions`, `Resources`, `Pricing`) | Hidden (`ui-sdsk-nav:hidden`) | Hidden (`ui-sdsk-nav:hidden`) |
| **Talk to Sales CTA**| Visible tertiary button (`ui-sdsk-nav:inline-flex!`) | Hidden (`hidden!`) | Hidden (`hidden!`) |
| **Log In Button** | Visible outline button (`ui-tb:inline-flex!`) | Visible outline button (`ui-tb:inline-flex!`) | Hidden (`hidden!`) |
| **Get Started Button**| Full text ("Get started for free"), `min-h-[48px]` | Compact text ("Get started"), `min-h-[48px]` | Compact button, `min-h-[36px]`, `px-3 py-2` |
| **Hamburger Icon** | Hidden (`ui-sdsk-nav:hidden`) | Visible (`flex h-6 w-6`) | Visible (`flex h-6 w-6`) |
| **Mobile Drawer** | Inactive | Full-viewport slideout overlay | Full-viewport slideout overlay |

---

### 3.2 Hero Section & Feature Tabs

| Element | Desktop ($\ge 1024\text{px}$) `[Observed]` | Tablet ($768\text{px} - 1023\text{px}$) `[Observed]` | Mobile ($< 768\text{px}$) `[Observed]` |
| :--- | :--- | :--- | :--- |
| **H1 Display Title** | `36px` – `40px`, centered, max-width `640px` | `32px` – `36px`, centered | `28px` – `32px`, left or centered |
| **OAuth CTAs** | Inline horizontal row (`Google`, `Microsoft`) | Inline row or stacked | Stacked vertically, `100%` width each |
| **Product Tabs** | Horizontal 4-tab pill row centered | Horizontal scrollable chip row | 2x2 grid or horizontal scrolling chip row |
| **Preview Showcase** | Fixed max-width `1200px`, padding `32px`, radius `24px` | Fluid width, padding `24px`, radius `20px` | Full width with `16px` gutters, radius `16px` |

---

### 3.3 Sticky Switchback Accordions (`StickyCarouselIsland`)

| Element | Desktop ($\ge 1024\text{px}$) `[Measured]` | Mobile & Tablet ($< 1024\text{px}$) `[Observed]` |
| :--- | :--- | :--- |
| **Layout Mode** | 2-column split screen (`grid grid-cols-2 gap-16`) | Single-column vertical stream or swipe card carousel |
| **Sticky Pinning** | Right column pins (`position: sticky; top: 120px`) | Pinning disabled (`position: relative`) |
| **Active Indicator**| Animated progress bar fills from 0% to 100% on active item | Sequential vertical card stack or horizontal snap scroll |
| **Visual Asset** | Interactive Rive vector animation (`.riv`) | Scaled-down Rive canvas or static fallback illustration |
| **Section Padding** | `96px` (`--spacing-ui-section-y`) | `48px` (`--spacing-section-default`) |

---

### 3.4 Pricing Tier Cards & Plans Matrix

| Element | Desktop ($\ge 1024\text{px}$) `[Observed]` | Tablet ($768\text{px} - 1023\text{px}$) `[Observed]` | Mobile ($< 768\text{px}$) `[Observed]` |
| :--- | :--- | :--- | :--- |
| **Card Layout** | 4-column grid (`grid-cols-4 gap-6`) | 2-column grid (`grid-cols-2 gap-6`) | Single-column stacked cards |
| **Billing Toggle** | Horizontal pill centered above grid | Horizontal pill centered above grid | Horizontal pill centered above grid |
| **Comparison Table**| Full expanded table below cards | Horizontal scrollable table | Collapsed into expandable category accordions |

---

### 3.5 Calendly Booking Modal Embed `[Measured]`

Extracted directly from production `widget.css`:

```css
/* Desktop: Centered Floating Window */
@media (min-width: 976px) {
  .calendly-popup {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
    width: 80%;
    max-width: 1000px;
    min-width: 900px;
    height: 90%;
    max-height: 700px !important;
    border-radius: 12px;
  }
  .calendly-popup-close {
    right: 25px;
    top: 25px;
  }
}

/* Mobile & Tablet: Bottom Slide-Up Sheet */
@media (max-width: 975px) {
  .calendly-popup {
    position: fixed;
    top: 50px;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: auto;
    min-width: 0;
    max-height: none;
    transform: none;
    border-radius: 16px 16px 0 0;
  }
  .calendly-popup-close {
    right: 15px;
    top: 15px;
  }
}
```

---

### 3.6 Global Footer Directory

| Element | Desktop ($\ge 1024\text{px}$) `[Observed]` | Tablet ($768\text{px} - 1023\text{px}$) `[Observed]` | Mobile ($< 768\text{px}$) `[Observed]` |
| :--- | :--- | :--- | :--- |
| **Directory Grid** | 6 columns (`grid-cols-6`) | 3 columns $\times$ 2 rows (`grid-cols-3`) | Collapsible vertical accordion or 2-column stack |
| **Vertical Padding**| Top: `64px`, Bottom: `48px` | Top: `48px`, Bottom: `36px` | Top: `36px`, Bottom: `24px` |
| **Legal Sub-bar** | Single horizontal row | Two stacked horizontal rows | Vertical stack, centered text alignment |

---

## 4. Manual Browser Verification Protocol

Because automated headless browser execution was unavailable, the following manual viewport tests are recommended during QA in a standard browser:

| Test Case | Viewport Dimensions | Target Component | Action & Expected Outcome | Status |
| :--- | :--- | :--- | :--- | :--- |
| **TC-01** | `1440 x 900px` (Desktop) | Mega Navigation | Hover "Product" & "Solutions". Verify `inline-dropdown-in` animation, 4px mouse bridge, and panel positioning. | Needs Manual Run |
| **TC-02** | `1024 x 768px` (Boundary) | Sticky Header | Resize between 1023px and 1025px. Confirm nav links collapse and hamburger icon appears at exactly 1023px. | Needs Manual Run |
| **TC-03** | `768 x 1024px` (Tablet) | Pricing Page | Verify pricing cards shift from 4-columns to a 2x2 grid. | Needs Manual Run |
| **TC-04** | `375 x 812px` (Mobile) | Booking Widget | Trigger popup. Confirm sheet docks to bottom (`top: 50px; bottom: 0; border-radius: 16px 16px 0 0`). | Needs Manual Run |
| **TC-05** | `375 x 812px` (Mobile) | Sticky Switchbacks | Scroll homepage through Section 5. Confirm Rive canvas pins or smoothly unpins into vertical stream. | Needs Manual Run |
