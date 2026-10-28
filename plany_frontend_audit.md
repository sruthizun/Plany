# Plany Frontend Audit & Implementation Plan

> **Audit Date:** October 2026  
> **Target Application:** Plany (Frontend Recreation of Calendly)  
> **Source Documents:** `calendly_sitemap.md`, `calendly_pages.csv`, `calendly_page_sections.md`, `calendly_design_system.md`, `calendly_design_tokens.json`, `calendly_component_specs.md`, `calendly_responsive_specs.md`, `calendly_interactions.md`, `calendly_comprehensive_audit.md`, `calendly_design_verification.md`  
> **Scope:** Frontend audit, gap analysis, component inventory, and phased roadmap. Backend code, database schema, and booking contracts remain strictly untouched.

---

## 1. Executive Summary

Plany currently possesses a fully verified backend scheduling engine, SQLite database persistence, concurrency control with cross-process write-locking, RFC 5545 `.ics` export, and an active booking route at `/alex/30-min-chat`. 

However, the marketing and public frontend surfaces are largely unimplemented:
- The root route (`/`) is the default Next.js starter boilerplate.
- The UI primitives in `src/components/ui/` use placeholder slate/indigo styling rather than Calendly's measured design tokens (Midnight `#071a31`, Magnolia `#fcfbf8`, Linen `#f5f3ee`, etc.).
- The header, global navigation mega-menus, announcements banner, and 6-column footer are absent from the root layout.
- The high-priority marketing templates (Homepage, Pricing, Product/Feature switchbacks, Solutions, Integrations) are missing.

This audit provides a precise inventory of existing assets, identifies exact visual and structural gaps against Calendly's specifications, and proposes a phased implementation plan.

---

## 2. Existing Frontend Routes & Components

### 2.1 Existing Routes
| Route | File Path | Current Status | Notes & Dependencies |
| :--- | :--- | :--- | :--- |
| `/` | `src/app/page.tsx` | **Boilerplate** | Unaltered Next.js 16 starter template; needs complete replacement with Calendly 11-section homepage. |
| `/[username]/[slug]` | `src/app/[username]/[slug]/page.tsx` | **Functional (Booking)** | Renders `BookingCalendarView`. Fully wired to Prisma queries for host, event type, schedule, and confirmed bookings. |
| `/preview` | `src/app/preview/page.tsx` | **Internal Sandbox** | Interactive preview page demonstrating Button, Input, Card, and Badge states across viewports. |
| `/api/bookings` | `src/app/api/bookings/route.ts` | **Backend API** | Critical booking creation endpoint with SQLite concurrency locks. *(Strictly prohibited from modification).* |

### 2.2 Existing Components
| Component | File Path | Current State | Reusability Assessment |
| :--- | :--- | :--- | :--- |
| `BookingCalendarView` | `src/components/booking/BookingCalendarView.tsx` | Fully functional (1,017 lines) | **High**: Contains calendar navigation, time slot generation, timezone converter, invitee form, submission states, and ICS export. Retain 100% of logic; polish colors and borders in Phase 5. |
| `Button` | `src/components/ui/Button.tsx` | Functional | **High**: Supports `primary`, `secondary`, `tertiary`, `size` (sm/md/lg), `isLoading`, `leftIcon`, `rightIcon`. Needs token realignment (Midnight `#071a31`, Magnolia text `#fcfbf8`, Navy hover `#0e396a`, Cobalt pressed `#1e5ea7`, radii 8px/10px/16px). |
| `Input` | `src/components/ui/Input.tsx` | Functional | **High**: Accessible labels, IDs, error states, left/right icon slots. Needs border and focus ring colors aligned with `--color-ramp-neutral-200` (`#c6ccd2`) and `--color-cornflower` (`#6bb1ff`). |
| `Card` | `src/components/ui/Card.tsx` | Functional | **High**: Flexible slots (`CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`). Update surface colors to Magnolia (`#fcfbf8`), Pure White (`#ffffff`), and Linen (`#f5f3ee`). |
| `Badge` | `src/components/ui/Badge.tsx` | Functional | **High**: Status variants and dot indicators. Update color mappings to Lime (`#dbee9f`), Amber (`#ffe67c`), Red (`#fedfda`), Blue (`#d5e8fe`), and Neutral (`#3d464e`). |

---

## 3. Gap Analysis: Calendly Reference vs. Current Implementation

### 3.1 Design System & Design Tokens
| Attribute | Calendly Specification | Current Plany State | Required Changes |
| :--- | :--- | :--- | :--- |
| **Canvas Background** | Warm off-white Magnolia `#fcfbf8` (`--color-surface-bg-primary`) and Linen `#f5f3ee` (`--color-surface-bg-secondary`) | Cool slate-50 `#f8fafc` | Update `globals.css` theme variables and body background to Magnolia `#fcfbf8`. |
| **Brand Primary Dark**| Midnight `#071a31` (`--color-midnight`) | Slate-900 `#0f172a` | Replace slate-900 with `#071a31` for headings, text, and primary CTAs. |
| **Button States** | Hover: Navy `#0e396a`, Pressed: Cobalt `#1e5ea7`, Disabled: Silver `#d8dce0` | Slate-800 hover, Slate-950 active | Update `Button.tsx` variant classes to measured Calendly color tokens. |
| **Focus Rings** | Cornflower `#6bb1ff` with 30% alpha ring (`rgba(107, 177, 255, 0.30)`) | Indigo-500 `#6366f1` | Update focus utility tokens in `globals.css` and components. |
| **Typography Scale** | `.type-huge` (40px/56px), `.type-h1` (36px), `.type-h2` (28px/48px), `.type-body-xl` (18px), line-height `1.1` (headings) and `1.4` (body) | Generic Tailwind font sizes (`text-3xl`, `text-lg`) | Define exact `.type-*` typography classes in `globals.css`. |
| **Container Widths** | Max canvas: `1920px`, Section: `1440px`, Content: `1280px` (`max-w-[1280px]`) | Generic `max-w-3xl` / `max-w-[1280px]` | Standardize container classes across all templates. |
| **Shadows** | Tinted elevation using Steel `#5f6d77` (`--var-shadow-ui-sm` through `--var-shadow-ui-2xl`) | Tailwind standard black shadows | Add Calendly-measured shadow definitions to `globals.css`. |

### 3.2 Layout & Global Navigation
- **Announcement Banner:** Missing. Needs dismissible top announcement bar (`#84c1ff` background, `#071a31` text, smooth scroll hide animation).
- **Sticky Header Shell:** Missing from root layout. Needs sticky header (72px desktop / 64px mobile, 90% Magnolia with backdrop blur).
- **Mega-Dropdown Menus:** Missing. Calendly has 3 mega-panels:
  - Product Panel (`576px` width)
  - Solutions Panel (`924px` width)
  - Resources Panel (`1005px` width)
  - Equipped with invisible mouse bridge (`4px`) and slide-in keyframe animation (`inline-dropdown-in`).
- **Mobile Menu Drawer:** Missing responsive slide-down/drawer menu for screens `<= 1024px`.
- **Global Footer:** Missing. Calendly features a structured 6-column footer with category links, language selector, legal links, and copyright banner.

### 3.3 Page Templates
- **Homepage (`/`):** Missing all 11 sequential scrolling sections documented in `calendly_page_sections.md` and `calendly_sitemap.md`.
- **Pricing Page (`/pricing`):** Missing annual/monthly billing toggle, 4-tier cards (Free, Standard, Teams, Enterprise), feature comparison matrix, and FAQs.
- **Product/Feature Template (`/scheduling`):** Missing reusable layout for feature pages with tabbed showcases and accordion switchbacks.
- **Solutions Template (`/solutions/enterprise`):** Missing role/industry targeted landing page archetype.
- **Integrations Hub (`/integration`):** Missing directory search, category filter pills, connector cards, and integration detail views.

---

## 4. Required Assets & Visual Resources

To preserve high visual fidelity without broken links or copyright infringements:
1. **Brand Identity:**
   - Plany primary logomark & logotype (clean geometric calendar/clock SVG in Midnight `#071a31`).
2. **Identity Providers:**
   - Google "G" logo SVG for OAuth CTA.
   - Microsoft 4-square logo SVG for OAuth CTA.
3. **Enterprise Social Proof Logos:**
   - Monochrome partner/customer SVGs (Dropbox, eBay, Compass, Twilio, Dartmouth, Lyft, Bitly).
4. **Integration App Badges:**
   - Clean vector badges for Google Calendar, Outlook, Zoom, Microsoft Teams, Slack, Salesforce, HubSpot, Stripe, PayPal, Zapier.
5. **Interactive UI Mockups / Demonstrations:**
   - Scheduling tab preview (interactive calendar & slot picker card).
   - Callie AI assistant preview (interactive email negotiation thread mockup).
   - Notetaker preview (interactive meeting transcript & action items recap).
   - Payments preview (Stripe consultation checkout & invoice card).
6. **Icons:**
   - SVG icon set matching Geist / Lucide aesthetics: Calendar, Clock, Video, Globe, Checkmark, ChevronDown, ChevronRight, Close, Menu, Sparkles, Shield, CreditCard, Users, Search.

---

## 5. Prioritized Implementation Plan

### Phase 1: Frontend Audit & Plan (Current Step)
- [x] Inspect existing project files, routes, components, styles, and dependencies.
- [x] Review all 10 Calendly reference documents.
- [x] Compile detailed gap analysis and component inventory into `plany_frontend_audit.md`.
- [x] Submit report for user review and approval before writing code.

---

### Phase 2: Design System Tokens & Global Shared Layout
*Files to modify / create:*
1. `src/app/globals.css`:
   - Inject Calendly design tokens into `@theme` and `:root`: Midnight `#071a31`, Navy `#0e396a`, Cobalt `#1e5ea7`, Cornflower `#6bb1ff`, Magnolia `#fcfbf8`, Linen `#f5f3ee`, Ash `#e4e6e9`, Silver `#d8dce0`, Steel `#5f6d77`.
   - Add typographic classes (`.type-huge`, `.type-h1` through `.type-h6`, `.type-body-*`).
   - Add custom animations and keyframes (`inline-dropdown-in`, `modal-dialog-in`, `trust-bar-scroll`).
   - Add Calendly shadow elevation tokens.
2. `src/components/ui/Button.tsx`:
   - Align button variant colors, hover/active/disabled states, touch heights (36px, 48px, 52px), and radii.
3. `src/components/ui/Input.tsx`, `Card.tsx`, `Badge.tsx`:
   - Align styling with design tokens.
4. `src/components/ui/Accordion.tsx` & `Tabs.tsx`:
   - Create reusable interactive accordion and tab strip primitives.
5. `src/components/layout/Navbar.tsx`:
   - Build announcement banner, sticky navigation bar, Product/Solutions/Resources mega-dropdowns, CTA buttons, and mobile menu drawer (collapses at `1024px`).
6. `src/components/layout/Footer.tsx`:
   - Build 6-column responsive marketing footer.
7. `src/app/layout.tsx`:
   - Integrate `Navbar` and `Footer` while preserving clean layout for booking routes.

---

### Phase 3: Homepage Implementation (`/`)
*Files to modify / create:*
1. `src/components/home/`:
   - `HeroSection.tsx`: H1 *"All the work around meetings, handled."*, OAuth buttons (Google, Microsoft, Email), 4-tab interactive preview (Scheduling, Callie AI, Notetaker, Payments).
   - `SocialProofSection.tsx`: H2 *"Easy scheduling ahead."*, 20M user stat, monochrome enterprise logo cloud.
   - `MeetingLifecycleSection.tsx`: 4-pillar grid (Book, Prep, Capture, Follow up).
   - `WorkflowSection.tsx`: Workflow diagram with connected calendar/CRM visuals.
   - `FeatureSwitchbacks.tsx`: Accordion switchbacks for Scheduling, Callie AI, Notetaker, and Payments.
   - `CustomerStoriesSection.tsx`: Quantified ROI stat cards ($1,200 savings, 100% attendance, 75 hrs saved) and quotes.
   - `IntegrationsShowcase.tsx`: Tool grid highlighting Google, Microsoft, Salesforce, Zoom, Stripe.
   - `ConversionBanner.tsx`: Final bottom CTA banner *"From the first meeting to the follow-up"*.
2. `src/app/page.tsx`:
   - Assemble all 11 homepage sections in order with max-width constraints and alternating backgrounds.

---

### Phase 4: Remaining Key Marketing Page Templates
*Files to create:*
1. **Pricing Page (`/pricing` / `src/app/pricing/page.tsx`):**
   - Monthly / Annual billing toggle (with 20% discount badge).
   - 4 plan cards: Free ($0), Standard ($10), Teams ($16), Enterprise (Custom).
   - Expandable feature comparison table across plans.
   - Frequently asked questions (FAQ) accordion.
2. **Product / Feature Template (`/scheduling` / `src/app/scheduling/page.tsx`):**
   - Reusable template for product pages: Hero, interactive feature showcase, availability engine highlights, workflow triggers, and call to action.
3. **Solutions Template (`/solutions/enterprise` / `src/app/solutions/enterprise/page.tsx`):**
   - Audience-tailored landing page with SSO/SCIM security, Salesforce CRM routing, and team administration highlights.
4. **Integrations Directory (`/integration` / `src/app/integration/page.tsx`):**
   - Search input, category filter pills, interactive connector cards grid.

---

### Phase 5: Existing Booking Page (`/[username]/[slug]`) Visual Polish
*Files to inspect & adjust:*
1. `src/components/booking/BookingCalendarView.tsx`:
   - Update container surfaces, calendar date cells, time slot button states, and form inputs to use Magnolia/Midnight/Cornflower design tokens.
   - Ensure 100% preservation of scheduling logic, timezone math, conflict detection, API calls, and `.ics` generation.

---

### Phase 6: Verification & QA
1. **TypeScript Typecheck:** Run `npx tsc --noEmit` to verify 0 errors.
2. **Production Build:** Run `npm run build` to verify all dynamic and static pages compile.
3. **Automated Test Suite:** Run `npm test` to verify all 50/50 backend tests continue passing without regressions.
4. **Responsive Visual Testing:** Test across Desktop (`1440px`), Tablet (`1024px`), and Mobile (`390px`).
5. **Interactive Verification:** Test mega-dropdown menus, mobile hamburger, pricing frequency toggle, accordion tabs, hero preview switcher, and booking flow on `/alex/30-min-chat`.

---

## 6. Verification Checklist & Prohibited Boundaries

- [x] No modifications to backend endpoints, Prisma schema, or SQLite database.
- [x] No changes to scheduling algorithms, buffer logic, or timezone math.
- [x] No deletions or alterations of existing Calendly reference documents.
- [x] Plany branding preserved as the product name.
- [x] All 10 Calendly research documents utilized as design sources of truth.
