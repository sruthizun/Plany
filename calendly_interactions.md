# Calendly Interaction Specifications

> **Specification Status:** Production Verified & Evidence-Based  
> **Target Domain:** [https://calendly.com/](https://calendly.com/)  
> **Verification Date:** 2026-10-13  
> **Scope:** Dynamic behaviors, animation timings, keyframes, hover/focus states, form validation workflows, calendar date-time picker flows, and modal mechanics.

---

## 1. Executive Summary & Verification Methodology

This specification details the dynamic interaction patterns, micro-animations, and user feedback mechanisms observed on the live Calendly website and within its booking embeds.

### Evidence Classification:
- **`[Measured]`**: Directly extracted from production stylesheets (`_astro/layouts.Bf65L7qA.css`, `widget.css`) — including `@keyframes`, transition durations, easing functions, and hover/active pseudo-classes.
- **`[Observed]`**: Directly identified from live DOM structures, component attributes, and interactive Astro Island props.
- **`[Estimated]`**: Inferred interaction transitions where dynamic JS-driven inline styles manipulate the DOM.
- **`[Unverified]`**: Multi-host complex scheduling edge cases requiring authenticated live calendar sync.

---

## 2. Animation Engine & Keyframe Specifications `[Measured]`

Calendly compiles lightweight, GPU-accelerated CSS keyframes:

### 2.1 Center Modal & Dialog Entry `[Measured]`
```css
/* Center Modal Entry (250ms duration, cubic-bezier ease-out curve) */
.animate-[modal-dialog-in_0\.25s_cubic-bezier\(0\.16\,1\,0\.3\,1\)_both] {
  animation: 0.25s cubic-bezier(0.16, 1, 0.3, 1) both modal-dialog-in;
}

@keyframes modal-dialog-in {
  0% {
    opacity: 0;
    translate: -50% -10px;
    scale: 0.97;
  }
  100% {
    opacity: 1;
    translate: -50% -50%;
    scale: 1;
  }
}

/* Modal Backdrop Overlay Fade-In */
@keyframes modal-overlay-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
```

### 2.2 Navigation Dropdown Slide-In `[Measured]`
```css
/* Smooth 6px Downward Slide & Fade */
@keyframes inline-dropdown-in {
  0% {
    opacity: 0;
    translate: 0 -6px;
  }
  100% {
    opacity: 1;
    translate: 0 0;
  }
}
```

### 2.3 Logo Marquee & Skeleton Waves `[Measured]`
```css
/* Infinite Scrolling Trust Bar Logos */
@-UIt2W_trust-bar-scroll {
  0% { transform: translate(0); }
  100% { transform: translate(-50%); }
}

/* Trust Bar Logo Entrance Stagger */
@-UIt2W_trust-bar-logo-in {
  0% {
    opacity: 0;
    transform: translateY(25px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Skeleton Loading Wave Shimmer */
@keyframes OSLNWW_loading-skeleton-wave {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* Scroll Bounce Indicator */
@keyframes oonvCG_scrollBounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(6px); }
}
```

### 2.4 Transition Timing Reference `[Measured]`

| Transition Class | Duration | Curve | Applied Elements | Evidence |
| :--- | :--- | :--- | :--- | :--- |
| `duration-150` | `150ms` | `cubic-bezier(0.4, 0, 0.2, 1)` | Button background, text color, form borders, focus rings | `[Measured]` |
| `inline-dropdown-in` | `200ms` | `cubic-bezier(0.16, 1, 0.3, 1)` | Mega-menu dropdown panel appearance | `[Measured]` |
| `modal-dialog-in` | `250ms` | `cubic-bezier(0.16, 1, 0.3, 1)` | Modal popup entry | `[Measured]` |
| `bannerScrollAnim` | `300ms` | `ease-out` / `ease-in` | Global announcement banner hide/reveal | `[Measured]` |
| Accordion Toggle | `200ms` – `300ms` | `ease-in-out` | FAQ expansion and chevron rotation | `[Estimated]` |

---

## 3. Navigation Bar & Dropdown Interactions

### 3.1 Mega-Menu Dropdown Interaction Flow `[Measured]` & `[Observed]`
1. **Trigger Hover / Focus:**
   - User hovers or focuses on a navigation item (`Product`, `Solutions`, `Resources`).
   - Trigger receives subtle background `--color-midnight-a05` (`#071a310d`) with `8px` corner radius.
   - SVG arrow icon rotates `180deg` via `transform: rotate(180deg)` (`duration-150`).
2. **Mouse Bridge Protection:**
   - `.Sp-BGW_dropdownOuter:before` provides a `4px` tall invisible hitbox bridging the gap between trigger and menu panel `[Measured]`.
   - Prevents menu dismissal when crossing the whitespace between button and menu.
3. **Panel Display:**
   - Panel renders at `top: calc(100% + 4px)`.
   - Executes `@keyframes inline-dropdown-in` (fades in and translates from `-6px` to `0px` over `200ms`).
4. **Dismissal:**
   - Moving the pointer outside panel bounds immediately dismisses the menu.
   - Pressing <kbd>Esc</kbd> closes the menu and returns focus to the trigger button `[Observed]`.

### 3.2 Announcement Banner Scroll Hide `[Measured]`
- Once user scrolls down past `100px`, the announcement container receives `data-contained="true"`.
- It executes:
  ```css
  opacity: 0;
  pointer-events: none;
  transform: translateY(-100%);
  transition: transform .3s ease-in, opacity .15s ease-in .15s;
  ```
- Scrolling back to the top ($Y \le 50\text{px}$) restores the banner via `0.3s ease-out`.

---

## 4. Hero Feature Tabs & Dynamic Canvas Switching

### 4.1 Tab Switching Mechanics `[Observed]`
- **Tabs:** 4 product categories (*Scheduling*, *Callie AI*, *Notetaker*, *Payments*).
- **Tab State Toggle:**
  - Active tab receives: background `#ffffff`, text `#071a31` (`--color-midnight`), box shadow `--var-shadow-ui-sm`.
  - Inactive tabs: transparent background, text `#5f6d77` (`--color-steel`), hover text `#071a31`.
- **Content Swap:**
  - Pre-rendered showcase DOM nodes are toggled via CSS visibility/display for zero-latency switching without page reloads.

---

## 5. Sticky Switchback Accordions & Rive Vector Mechanics

### 5.1 Scrolljack & Progress Synchronization `[Measured]` & `[Observed]`
Extracted from Astro Island component `StickyCarouselIsland`:
1. **Sticky Pinning:** Right-hand visual canvas pins in place (`position: sticky; top: 120px`) as the user scrolls into the section.
2. **Item Progress:** As the user scrolls through the 5 feature items, an IntersectionObserver measures scroll depth.
3. **Progress Bar Fill:** Active item displays a horizontal progress bar animating from `0%` to `100%`.
4. **Rive Vector Animation State Machine:**
   - Reaching a new item threshold signals the Rive runtime (`@rive-app/canvas`) to switch artboards.
   - Vector files loaded:
     - `home-scheduling-01-full-control.riv` `[Measured]`
     - `home-scheduling-02-meeting-templates-scenario.riv` `[Measured]`
   - Visual transitions occur at 60fps without video buffering or compression artifacts.

---

## 6. Form Validation & Input Interactions `[Measured]`

Extracted from `/signup` and input styles:

### 6.1 Input Interaction States `[Measured]`
1. **Default State:**
   - Border: `1px solid #c6ccd2` (`--color-border-default`)
   - Background: Pure White (`#ffffff`)
   - Text: `--color-midnight` (`#071a31`)
2. **Focus-Visible State:**
   - Border: `1px solid #6bb1ff` (`--color-action-focus-border`)
   - Focus Ring: `4px ring #6bb1ff4d` (`--color-cornflower-a30`)
   - Transition: `transition-[border-color,box-shadow] duration-150`
3. **Invalid (Error) State:**
   - Evaluated on field `blur` or form submission attempt with invalid input.
   - Attribute: `aria-invalid="true"`
   - Border: `1px solid #b32812` (`--color-status-error`)
   - Shadow: `0 0 0 4px rgba(179, 40, 18, 0.24)`
   - Inline Error Message: Appears below input in red (`#b32812`, `14px`, medium weight).
4. **Disabled State:**
   - `disabled:cursor-not-allowed disabled:opacity-60`
   - Background fills with `--color-smoke` (`#f5f5f7`).

---

## 7. Calendar Selection & Booking Flow Sequence `[Observed]`

```
+------------------------------------------------------------------------------------+
| STEP 1: Host Header & Meeting Overview                                             |
| Host avatar, meeting duration (30 min), web conferencing platform badge (Zoom/Meet)|
+------------------------------------------------------------------------------------+
| STEP 2: Month Calendar Date Selection                                              |
| - Month pagination arrows (<< >>)                                                  |
| - Available dates marked with bold typography and light blue hover circle (#f4f9ff)|
| - Click selects date: solid blue circle (#071a31 / #006BFF) with white text        |
+------------------------------------------------------------------------------------+
| STEP 3: Time Slot Column Selection                                                 |
| - Available 30-min slots listed vertically                                         |
| - Click time slot (e.g. 10:00 AM) triggers split button confirmation:              |
|   Left segment: "10:00 AM" | Right segment: Blue "Next" confirmation button        |
| - Auto-detected timezone displayed with dropdown override                          |
+------------------------------------------------------------------------------------+
| STEP 4: Invitee Intake Questionnaire                                               |
| - Name field (required)                                                            |
| - Email field (required with validation)                                           |
| - Add Guests link (+ Add Guests)                                                   |
| - Custom intake questions (textarea)                                               |
| - "Schedule Event" solid primary button                                            |
+------------------------------------------------------------------------------------+
| STEP 5: Booking Confirmation Screen                                                |
| - Green checkmark badge                                                            |
| - Confirmed date, time, and calendar invite dispatched notice                      |
| - 1-click "Add to Google Calendar", "Add to Outlook", "Add to iCal" buttons        |
+------------------------------------------------------------------------------------+
```

---

## 8. Modal Mechanics & Focus Management

### 8.1 Ketch Cookie & Privacy Modal `[Measured]`
- **Backdrop:** `position: fixed; inset: 0; z-index: 10001; background: var(--color-midnight-a60); backdrop-filter: blur(8px);`
- **Focus Trap:** Keyboard tab loop remains trapped inside the preference modal while open.
- **Dismiss Triggers:** Close X button, backdrop click, or <kbd>Esc</kbd> key.

### 8.2 External Widget Embed Modal (`widget.css`) `[Measured]`
- **Backdrop:** `.calendly-overlay` (`background-color: rgba(31, 31, 31, .4); z-index: 9999;`)
- **Center Dialog Entry:** `.calendly-popup` enters via `translateY(-50%) translateX(-50%)`.
- **Dismiss Triggers:** Close button (`.calendly-popup-close`), backdrop click (`.calendly-close-overlay`), or <kbd>Esc</kbd> key.
- **Scroll Lock:** Parent webpage body scrolling locked while modal is active.
