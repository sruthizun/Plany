# Calendly Component Specifications

> **Specification Status:** Production Verified & Evidence-Based  
> **Target Domain:** [https://calendly.com/](https://calendly.com/)  
> **Verification Date:** 2026-10-13  
> **Scope:** Detailed component anatomies, states, measurements, and visual rules for building Plany.

---

## 1. Global Navigation Bar & Header

### 1.1 Global Announcement Banner `[Measured]` & `[Observed]`
- **DOM Container:** `<div class="flex items-center justify-center text-center bg-ramp-blue-250 text-text-primary relative min-h-(--global-announcement-banner-height) w-full px-6 py-2 pr-12 ui-tb:pl-8 Sp-BGW_bannerScrollAnim">` `[Observed]`
- **Background Color:** `--color-ramp-blue-250` (`#84c1ff`) `[Measured]`
- **Text Color:** `--color-text-primary` (`#071a31`) `[Measured]`
- **Typography:** `--font-geist`, `type-body-sm-fixed` (`14px`, medium weight `500`) `[Measured]`
- **Dismiss Button:** Absolute right (`right: 8px`), `opacity: 0.7`, hover `opacity: 1.0` `[Measured]`
- **Scroll Transition (`.Sp-BGW_bannerScrollAnim`):** `[Measured]`
  ```css
  /* Uncontained State */
  transition: transform .3s ease-out, opacity .3s ease-out;

  /* Contained State (scrolled past ~100px) */
  .Sp-BGW_bannerScrollAnim[data-contained=true] {
    opacity: 0;
    pointer-events: none;
    transform: translateY(-100%);
    transition: transform .3s ease-in, opacity .15s ease-in .15s;
  }
  ```

### 1.2 Sticky Header Shell `[Measured]` & `[Observed]`
- **DOM Container:** `<header class="sticky top-0 z-50 w-full bg-surface-bg-primary/90 backdrop-blur-md border-b border-border-subtle">` `[Observed]`
- **Height:** `--header-height` (`64px` on mobile, `72px` on desktop) `[Measured]`
- **Background:** `--color-magnolia` (`#fcfbf8`) with 90% opacity and `backdrop-filter: blur(12px)` `[Measured]`
- **Border:** `1px solid var(--color-silver)` (`#d8dce0`) `[Measured]`
- **Max Width:** `1280px` centered with `24px` horizontal padding `[Measured]`

### 1.3 Navigation Dropdown Triggers `[Measured]` & `[Observed]`
- **Markup:** `<button class="group inline-flex items-center gap-xxs-fixed rounded-ui-fixed-xs px-xs-fixed py-xs-fixed type-body-sm-fixed font-medium font-geist text-text-primary focus:outline-none">` `[Observed]`
- **Typography:** `Geist`, `14px`, Medium (`500`), Line Height `1.4` `[Measured]`
- **Color:** `--color-midnight` (`#071a31`) `[Measured]`
- **Gap:** `--spacing-gap-xxs-fixed` (`4px`) `[Measured]`
- **Padding:** `px-xs-fixed py-xs-fixed` (`8px 8px`) `[Measured]`
- **Hover / Active State:** Background fills with `--color-midnight-a05` (`#071a310d`), radius `8px` (`--radius-ui-fixed-xs`) `[Measured]`
- **Chevron Arrow:** 16x16px SVG, transitions `transform: rotate(180deg)` over `150ms` `[Measured]`

### 1.4 Mega-Dropdown Panels `[Measured]`
- **Outer Wrapper (`.Sp-BGW_dropdownOuter`):** `[Measured]`
  ```css
  z-index: 10;
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  ```
- **Invisible Mouse Bridge (`.Sp-BGW_dropdownOuter:before`):** `[Measured]`
  ```css
  content: "";
  height: 4px;
  position: absolute;
  top: -4px;
  left: 0;
  right: 0;
  ```
  *(Confirmed from production stylesheet: Prevents hover loss when cursor traverses gap between button and panel)*
- **Panel Container (`.Sp-BGW_dropdownPanel`):** `[Measured]`
  - Product Dropdown Width: `576px` (`--header-panel-width-product`)
  - Solutions Dropdown Width: `924px` (`--header-panel-width-default`)
  - Resources Dropdown Width: `1005px` (`--header-panel-width-resources`)
  - Background: Pure White (`#ffffff`)
  - Border: `1px solid #d8dce0` (`--color-silver`)
  - Corner Radius: `16px` (`--radius-ui-fixed-md`)
  - Shadow: `--var-shadow-ui-lg` (`0 4px 5px #5f6d770a, 0 8px 15px #5f6d7708, 0 15px 30px #5f6d770f`)
  - Entrance Animation: `inline-dropdown-in 0.2s cubic-bezier(0.16, 1, 0.3, 1) both` (`opacity: 0 -> 1; translate: 0 -6px -> 0 0`)

---

## 2. Buttons & Interactive Controls

Calendly uses 4 distinct button tiers plus an OAuth squircle variant:

### 2.1 Primary Action Button `[Measured]`
- **DOM Markup:** `<a class="inline-flex items-center justify-center font-geist font-medium leading-ui-body-sm tracking-ui-none whitespace-nowrap transition-colors duration-150 cursor-pointer min-h-[36px] px-3 py-2 ui-tb:min-h-[48px] ui-tb:p-btn-small rounded-btn-small bg-action-primary-bg text-action-primary-text hover:bg-action-primary-bg-hover active:bg-action-primary-bg-pressed border-2 border-transparent gap-btn focus-visible:border-action-focus-border">` `[Observed]`
- **Dimensions:** `min-h-[36px]` (mobile) / `min-h-[48px]` (desktop) `[Measured]`
- **Padding:** Mobile `12px 8px`, Desktop `p-btn-small` (`12px 16px`) `[Measured]`
- **Border Radius:** `--radius-btn-small` (`8px`) / Hero CTA: `--radius-btn-standard` (`10px`) `[Measured]`
- **Colors:**
  - Base: Background `#071a31` (`--color-midnight`), Text `#fcfbf8` (`--color-magnolia`) `[Measured]`
  - Hover: Background `#0e396a` (`--color-navy`) `[Measured]`
  - Pressed (Active): Background `#1e5ea7` (`--color-cobalt`) `[Measured]`
  - Disabled: Background `#d8dce0` (`--color-silver`), Text `#748491` (`--color-ramp-neutral-450`), cursor `not-allowed` `[Measured]`
- **Focus Outline:** `border-color: #6bb1ff` (`--color-action-focus-border`) `[Measured]`

### 2.2 Secondary Outline Button `[Measured]`
- **DOM Markup:** `<a class="rounded-btn-small bg-transparent border-[1.5px] border-action-secondary-border text-action-secondary-text gap-btn hover:bg-action-secondary-bg-hover hover:border-action-secondary-border-hover hover:text-action-secondary-text-hover active:bg-action-secondary-bg-pressed active:border-action-secondary-border-pressed focus-visible:outline-action-focus-border">` `[Observed]`
- **Border:** `1.5px solid #071a31` (`--color-action-secondary-border`) `[Measured]`
- **Colors:**
  - Base: Background Transparent, Text `#071a31` `[Measured]`
  - Hover: Background `#071a31`, Text `#fcfbf8`, Border `#071a31` `[Measured]`
  - Pressed: Background `#0e396a`, Border `#0e396a`, Text `#fcfbf8` `[Measured]`
  - Disabled: Border `1.5px solid #a4aeb7` (`--color-ramp-neutral-300`), Text `#748491` `[Measured]`

### 2.3 Tertiary / Ghost Button `[Measured]`
- **DOM Markup:** `<a class="bg-transparent text-action-tertiary-text border-2 border-transparent hover:text-action-tertiary-text-hover active:text-action-tertiary-text-pressed">` `[Observed]`
- **Colors:**
  - Base: Background Transparent, Text `#071a31` `[Measured]`
  - Hover: Text `#5f6d77` (`--color-steel`) `[Measured]`
  - Pressed: Text `#1e5ea7` (`--color-cobalt`) `[Measured]`

### 2.4 OAuth Squircle Button `[Measured]`
- **DOM Selector:** `.homepage-v2-hero-copy [data-button-variant=oauth-primary]` `[Measured]`
- **Shape Rule:** `corner-shape: squircle!important; border-radius: 12px;` `[Measured]`
- **Height:** `48px` `[Measured]`
- **Background:** `#ffffff`, Border `1px solid #c6ccd2` (`--color-ramp-neutral-200`) `[Measured]`
- **Disabled State:** Background `#323a41` (`--color-ramp-neutral-750`), Border `#49535c` (`--color-ramp-neutral-650`), Text `#748491` `[Measured]`

---

## 3. Forms & Inputs

### 3.1 Text & Email Input Field `[Measured]` & `[Observed]`
- **DOM Markup:**
  ```html
  <input 
    type="email" 
    placeholder="Enter your email" 
    class="peer w-full rounded-ui-fixed-xs border border-border-default bg-surface-fg-secondary-emphasis type-body-md-fixed text-text-primary outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-transparent autofill:[-webkit-box-shadow:0_0_0_50px_var(--color-surface-fg-secondary-emphasis)_inset] focus-visible:border-action-focus-border focus-visible:ring-4 focus-visible:ring-cornflower-a30 aria-invalid:border-status-error aria-invalid:shadow-[0_0_0_4px_rgba(179,40,18,0.24)] aria-invalid:focus-visible:border-status-error aria-invalid:focus-visible:ring-status-error/30 disabled:cursor-not-allowed disabled:opacity-60 px-md py-3 min-h-[2.875rem] w-full" 
    name="email" 
  />
  ```
- **Height:** `min-h-[2.875rem]` (`46px`) `[Measured]`
- **Padding:** `px-md py-3` (`16px` horizontal, `12px` vertical) `[Measured]`
- **Border Radius:** `8px` (`--radius-ui-fixed-xs`) `[Measured]`
- **States:**
  - Default: Border `1px solid #c6ccd2` (`--color-border-default`), background `#ffffff` `[Measured]`
  - Focus-Visible: Border `1px solid #6bb1ff`, `box-shadow: ring-4 ring-cornflower-a30` (`rgba(107, 177, 255, 0.3)`) `[Measured]`
  - Error (Invalid): `aria-invalid="true"` triggers Border `#b32812` (`--color-status-error`) and glow shadow `0 0 0 4px rgba(179, 40, 18, 0.24)` `[Measured]`
  - Disabled: `opacity: 0.6`, cursor `not-allowed`, background `#f5f5f7` `[Measured]`

---

## 4. Cards & Pricing Matrices

### 4.1 Pricing Tier Card `[Measured]` & `[Observed]`
- **Container:** `<div class="flex flex-col p-6 rounded-ui-fixed-lg border border-border-default bg-surface-fg-secondary-emphasis shadow-ui-sm">` `[Observed]`
- **Border Radius:** `20px` (`--radius-ui-fixed-lg`) `[Measured]`
- **Background:** `#ffffff` (Standard) / `#f4f9ff` subtle cloud tint (Teams/Featured) `[Measured]`
- **Border:** `1px solid #d8dce0` (Default) / `2px solid #071a31` (Featured Tier) `[Measured]`
- **Pricing Typography:**
  - Price Number (`$10`, `$16`): `48px` (`--text-ui-h2-fixed`), Bold (`700`), Line Height `1.0` `[Measured]`
  - Period Subtitle: `14px`, color `--color-steel` (`#5f6d77`) `[Measured]`
- **Billing Frequency Toggle:**
  - Pill switcher toggles Annual vs. Monthly billing `[Observed]`
  - Annual Discount Badge: Green pill badge "Save ~20%" (`bg-lime: #dbee9f`, `text-green-700: #3f491b`) `[Measured]`

---

## 5. Hero Feature Tabs & Sticky Switchback Accordions

### 5.1 Hero Multi-Product Tabs `[Observed]`
- **Container:** Horizontal tab bar centered below hero headline `[Observed]`
- **Tabs (4 Product Pillars):**
  1. *Scheduling* (Calendar picker preview)
  2. *Callie AI* (AI assistant email thread mockup)
  3. *Notetaker* (Meeting summary and CRM follow-up preview)
  4. *Payments* (Stripe payment card mockup)
- **Active Tab Styling:** Background `#ffffff`, text `#071a31`, shadow `--var-shadow-ui-sm` `[Measured]`
- **Inactive Tab Styling:** Transparent background, text `#5f6d77`, hover text `#071a31` `[Measured]`

### 5.2 Sticky Carousel Switchback (`StickyCarouselIsland`) `[Measured]` & `[Observed]`
- **DOM Container:** `<section id="[Home]-AccordionSwitchbacks-Scheduling" class="flex w-full justify-center bg-surface-bg-primary py-section-default">` `[Observed]`
- **Astro Component Export:** `StickyCarouselIsland` `[Observed]`
- **Desktop Layout:** 2-column split layout (`max-w-[1280px]`):
  - Left: Sticky scroll feature list (5 items with animated progress bar indicator) `[Observed]`
  - Right: Sticky canvas rendering interactive Rive vector binary animations (`.riv`) `[Measured]`
- **Rive Vector File Assets (`.riv`):** `[Measured]`
  - `home-scheduling-01-full-control.riv`
  - `home-scheduling-02-meeting-templates-scenario.riv`

---

## 6. Calendly External Widget & Booking Embed `[Measured]`

Extracted directly from production runtime `https://assets.calendly.com/assets/external/widget.css`:

### 6.1 Modal Backdrop Overlay `[Measured]`
```css
.calendly-overlay {
  background-color: rgba(31, 31, 31, .4);
  bottom: 0;
  left: 0;
  overflow: hidden;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 9999;
}
```

### 6.2 Centered Popup Window `[Measured]`
```css
/* Desktop Viewport */
.calendly-popup {
  box-sizing: border-box;
  height: 90%;
  left: 50%;
  max-height: 700px !important;
  max-width: 1000px;
  min-width: 900px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%) translateX(-50%);
  width: 80%;
}

/* Mobile Viewport (<= 975px) */
@media (max-width: 975px) {
  .calendly-popup {
    bottom: 0;
    height: auto;
    left: 0;
    max-height: none;
    min-width: 0;
    position: fixed;
    right: 0;
    top: 50px;
    transform: none;
    width: 100%;
  }
}
```

### 6.3 Close Button & Floating Badge `[Measured]`
- **Close Button (`.calendly-popup-close`):** `width: 19px; height: 19px; top: 25px; right: 25px; cursor: pointer;` `[Measured]`
- **Floating Badge Widget (`.calendly-badge-widget`):** `position: fixed; bottom: 15px; right: 20px; z-index: 9998;` `[Measured]`

---

## 7. Calendar Date Picker & Time Slot Selector

Based on Calendly booking engine architecture (`/scheduling` & embed flows):

### 7.1 Month Calendar Grid `[Observed]`
- **Header:** Month & Year label (e.g. "October 2026") flanked by `<` and `>` chevron buttons
- **Weekday Row:** `Mo Tu We Th Fr Sa Su` (caption font `12px`, uppercase, color `--color-steel`)
- **Date Circles:**
  - Available Dates: Bold font, light blue hover circle fill (`#f4f9ff`), clickable `[Observed]`
  - Selected Date: Solid dark navy/blue circle (`#071a31` or `#006BFF`), white text `[Observed]`
  - Unavailable / Past Dates: Reduced opacity (`0.35`), non-interactive (`pointer-events: none`) `[Estimated]`

### 7.2 Time Slot Selector `[Observed]`
- **Column Layout:** Vertical list of available times (e.g. `09:00 AM`, `09:30 AM`, `10:00 AM`) displayed adjacent to the calendar on desktop, or below on mobile `[Observed]`
- **Two-Step Confirmation Interaction:** Clicking a time slot splits the button into:
  - Left segment: Time label
  - Right segment: Blue confirmation **"Next"** CTA button `[Observed]`
- **Timezone Selector:** Bottom dropdown menu with automatic browser timezone pre-selection via `Intl.DateTimeFormat` `[Observed]`

---

## 8. Global Website Footer `[Measured]` & `[Observed]`

- **Container:** `<footer class="w-full bg-surface-bg-primary border-t border-border-subtle pt-16 pb-12">` `[Observed]`
- **Desktop Grid:** 6 equal columns (`grid-cols-6`), max-width `1280px` `[Observed]`
- **Columns:** Product, Solutions, Popular Features, Compare, Resources, Company `[Observed]`
- **Sub-bar:** App store download badges (iOS/Android), browser extension badges (Chrome, Outlook), locale selector, copyright notice, and Ketch cookie preference link (`#ketch-preferences`) `[Observed]`
