# Calendly Page-by-Page Content & Section Inventory

> **Audit Scope:** In-depth visual and structural content breakdown of Calendly.com pages, preserving the exact scrolling order of the homepage, component hierarchies, and interactive states.  
> **Audit Status:** Sitemap Inventory Compiled; Partial Live Verification Completed.

---

## 1. Homepage (`https://calendly.com/`)

The Calendly homepage serves as the primary multi-product showcase, organized into **11 sequential scrolling sections**, followed by sticky navigation and a comprehensive 6-column footer.

### Section 1: Hero Showcase & Multi-Product Tabs
- **DOM Container:** `<section id="[Home]-Hero">`
- **Headings:**
  - `H1`: *"All the work around meetings, handled."*
  - `H2` (Tab 1 Header): *"Book meetings with the world’s #1 scheduling tool"*
  - `H2` (Tab 2 Header): *"Introducing your 24/7 AI scheduling assistant"*
  - `H2` (Tab 3 Header): *"Actionable, shareable recaps for every meeting"*
  - `H2` (Tab 4 Header): *"Flexible, built-in payment tools"*
- **Lead Copy:**
  - *"From AI-powered scheduling to automated meeting recaps and follow-ups, get the busywork done with fewer tools and less effort."*
  - *"Sign up with email – No credit card required"*
- **Primary Calls-to-Action (Buttons):**
  - `Sign up with Google` (`/signup?identity_provider=google`)
  - `Sign up with Microsoft` (`/signup?identity_provider=microsoft`)
  - `Sign up with email` (`/signup`)
- **Interactive Controls:**
  - 4 interactive product preview tabs allowing visitors to toggle between:
    1. **Scheduling Preview**: Dynamic calendar picker, available time slots, time zone auto-detection.
    2. **Callie AI Preview**: Email thread mockup showing `@callie` negotiating meeting times.
    3. **Notetaker Preview**: Real-time transcript excerpt, bulleted key takeaways, and follow-up email drafts.
    4. **Payments Preview**: Stripe payment badge, price tag ($150 Consultation), card entry modal.

---

### Section 2: Social Proof & Volume Banner
- **DOM Container:** `<section class="...py-xl...">`
- **Headings:**
  - `H1`: *"Easy scheduling ahead."*
- **Supporting Text:**
  - *"Join 20 million professionals who easily book meetings with the #1 scheduling tool."*
- **Enterprise Logos & Accreditations:**
  - Logos displayed: Dropbox, eBay, Compass, Twilio, Indiana University, Dartmouth, Lyft, Bitly.
  - Statistic Highlight: *"Used by over 4 out of 5 Fortune 500 companies."*
- **Repeated CTAs:** Google / Microsoft / Email signup buttons.

---

### Section 3: The 4-Stage Meeting Lifecycle
- **DOM Container:** `<section>`
- **Headings:**
  - `H2`: *"Built for people whose work runs on meetings"*
- **Lead Text:**
  - *"Meetings move you forward, but the work around them can slow you down. Calendly handles the tasks before, during, and after meetings, so you have more space for what matters."*
- **Lifecycle Pillars:**
  1. `H3`: **Book** — *"Book the meeting and get paid with zero back-and-forth."*
  2. `H3`: **Prep** — *"Intake questions and automated reminders prepare both sides before the call."*
  3. `H3`: **Capture** — *"AI transcription and meeting recaps capture decisions automatically."*
  4. `H3`: **Follow up** — *"Pre-drafted action emails and automatic CRM syncing keep next steps moving."*
- **Action CTA:** `Start for free` (`/signup`)

---

### Section 4: Meeting Philosophy & Workflow Overview
- **DOM Container:** `<section>`
- **Headings:**
  - `H2`: *"There’s more to meetings than finding a time."*
- **Paragraph:**
  - *"Book meetings, capture discussions and decisions, and keep next steps moving with tools that help you handle the work before, during, and after every meeting."*
- **Visuals:** High-fidelity animated illustration illustrating connected workflows across calendars, CRMs, and email clients.

---

### Section 5: Core Scheduling Switchback & Feature Accordions
- **DOM Container:** `<section id="[Home]-AccordionSwitchbacks-Scheduling">`
- **Headings:**
  - `H2`: *"A better way to book your meetings"*
- **Accordion Tabs & States:**
  1. **Full control over your calendar:** Connect up to 6 Google, Outlook, or iCloud calendars; customize daily limits, buffer times, and minimum notice periods.
  2. **Meeting templates for every scenario:** 1-on-1s, collective panel meetings, round-robin lead distribution, and group webinars.
  3. **Automated email & text workflows:** Automated confirmation emails, custom reminder cadences, and SMS notifications reducing no-shows.
  4. **Website embeds and routing forms:** Inline and popup booking widgets with custom routing logic sending qualified leads to the right rep.
  5. **Scheduling whenever, wherever:** Chrome extension, mobile app, and instant link generation from any email or chat.

---

### Section 6: Callie AI Assistant Feature Switchback
- **DOM Container:** `<section id="[Home]-AccordionSwitchbacks-Callie">`
- **Headings:**
  - `H2`: *"Meet Callie, your AI assistant"*
- **Lead Description:**
  - *"Instead of managing scheduling links and calendars yourself, just add callie@calendly.com to the email thread. Say what you need and let Callie take it from there."*
- **Subsections & Pillars:**
  - `H3`: **Conversational scheduling** — Callie understands natural language scheduling requests directly in email threads without rigid commands.
  - `H3`: **Precise coordination** — Callie cross-references real-time availability across attendees, buffers, and meeting rules to propose optimal slots.
  - `H3`: **24/7 assistance with meeting tasks** — Continuous coordination that works in the background across time zones.

---

### Section 7: AI Notetaker Feature Switchback
- **DOM Container:** `<section id="[Home]-AccordionSwitchbacks-Notetaker">`
- **Headings:**
  - `H2`: *"Actionable recaps for every meeting"*
- **Lead Description:**
  - *"End every call with meeting summaries and next steps, so nothing falls through the cracks."*
- **Subsections & Highlights:**
  - `H3`: **Clear summaries with next steps** — Structured bullet points detailing key decisions, commitments, and deadlines.
  - `H3`: **Pre-drafted follow-up emails** — Client-ready follow-up drafts generated immediately following the meeting.
  - `H3`: **Works with your tools** — Seamless auto-join for Zoom, Google Meet, and Microsoft Teams.
  - `H3`: **Instant meeting recall** — Searchable repository of meeting transcripts, timestamps, and audio/video highlights.

---

### Section 8: Payments & Monetization Feature Switchback
- **DOM Container:** `<section id="[Home]-AccordionSwitchbacks-Payments">`
- **Headings:**
  - `H2`: *"Flexible payment options that fit your business"*
- **Lead Description:**
  - *"Collect payment when clients book with you, so you can get paid sooner and reduce no-shows."*
- **Subsections & Payment Modes:**
  - `H3`: **Upfront meeting payments** — Secure credit card and digital wallet collection directly on the booking page.
  - `H3`: **Meeting packages** — Sell multi-session packages, consultations, and recurring retainer sessions.
  - `H3`: **Invoices** — Issue automated billing invoices for completed bookings.
  - `H3`: **Payment links** — Share custom payment links for ad-hoc services.

---

### Section 9: Customer Stories, Testimonials & Quantitative ROI
- **DOM Container:** `<section id="[Home]-CustomerStories">`
- **Headings:**
  - `H2`: *"Real customers. Real results."*
- **Quantified Metric Cards:**
  - `Card 1`: **$1,200 annual savings** — Elimination of unnecessary scheduling point solutions.
  - `Card 2`: **100% attendance rate** — Elimination of client no-shows via automated SMS/email reminders.
  - `Card 3`: **75 hours saved monthly** — Reduced back-and-forth scheduling admin across mid-sized teams.
  - `Card 4`: **80% reduction in booking-related emails** — Streamlined sales inbound conversion.
  - `Card 5`: **3 to 5 hours saved per week** — Reclaimed time for consultants and solo entrepreneurs.
- **Featured Quotes:**
  - *"I use Calendly every single day. Without it, I honestly couldn't run my business."*
  - *"Adding a booking fee didn't just reduce no-shows – it changed the tone of my consultations."*

---

### Section 10: Integrations Grid & Supported Tools
- **DOM Container:** `<section id="[Home]-Integrations-ConnectCalendlywithyourfavoritetools">`
- **Headings:**
  - `H2`: *"Connect Calendly with your favorite tools"*
- **Description:**
  - *"Our extensive list of integrations makes Calendly flexible."*
- **Ecosystem Categories Showcased:**
  - **Google Suite:** Connect Calendar, Meet, and Google Analytics.
  - **Microsoft Suite:** Connect Teams, Outlook, Azure SSO, and Office 365.
  - **Salesforce & HubSpot:** Auto-sync contacts, leads, and activity records.
  - **Video Conferencing:** Auto-generate unique Zoom, Webex, and GoTo Meeting rooms.
  - **Payment Gateways:** Stripe and PayPal.
- **Call-to-Action:** `View all integrations` (`/integration`)

---

### Section 11: Final Conversion CTA Banner
- **DOM Container:** `<section>`
- **Headings:**
  - `H2`: *"From the first meeting to the follow-up"*
- **Lead Copy:**
  - *"All of the work around meetings, handled in one place. Book time, capture every discussion, and keep next steps moving without the manual work."*
- **Call-to-Action:** `Start for free` (`/signup`)

---

## 2. Key Product Pages Section Breakdown

### 2.1 Core Scheduling (`/scheduling`)
- **Page Title:** Automated Scheduling Software | Calendly
- **Main Heading (`H1`):** *"Scheduling software that puts time on your side"*
- **Core Sections:**
  1. **Availability Engine:** Granular daily hours, date-specific overrides, buffer times between meetings.
  2. **Event Types:** 1-on-1, Group (webinars), Collective (all hosts required), Round Robin (distributed leads).
  3. **Routing Forms:** Qualify visitors via intake questionnaires before presenting booking slots.
  4. **Calendar Sync:** Conflict prevention across up to 6 business and personal calendars.
  5. **Workflows:** Multi-channel notification triggers (SMS and email).

### 2.2 Callie AI Assistant (`/ai-assistant`)
- **Page Title:** Meet Callie, Calendly’s AI Assistant | Calendly
- **Main Heading (`H1`):** *"Meet Callie, Calendly’s AI assistant"*
- **Core Sections:**
  1. **How It Works (Email):** Loop `callie@calendly.com` on email discussions for fully automated coordination.
  2. **Chat Assistant:** In-app natural language prompt interface to create event types and modify availability.
  3. **Privacy & Security:** Strict zero-data training policies and SOC 2 data protection standards.
  4. **Callie FAQ:** Plan requirements, supported email providers, and team deployment guidelines.

### 2.3 Calendly Notetaker (`/notetaker`)
- **Page Title:** AI Meeting Notetaker: Transcribe & Summarize Calls | Calendly
- **Main Heading (`H1`):** *"Actionable recaps for every meeting"*
- **Core Sections:**
  1. **Automated Attendance:** Bot joins Zoom, Meet, or Teams calls automatically.
  2. **Client-Ready Recaps:** Summaries formatted for external client sharing.
  3. **Follow-Up Automation:** Auto-generates follow-up emails ready to review and send.
  4. **Security & Retention Controls:** Org-wide controls on recording storage, transcript access, and data deletion.

### 2.4 Enterprise Scheduling (`/solutions/enterprise`)
- **Page Title:** Enterprise Appointment Scheduling Software | Calendly
- **Main Heading (`H1`):** *"Enterprise scheduling built for speed, security, and scale"*
- **Core Sections:**
  1. **Enterprise Security & Governance:** SAML SSO (Okta, Azure, Ping), SCIM user provisioning, domain control.
  2. **Salesforce Native Integration:** Custom object mapping, real-time lead routing, and opportunity attribution.
  3. **Centralized Administration:** Department-level admin roles, standardized event templates, and global audit logs.
  4. **Dedicated Enterprise Support:** Dedicated Customer Success Manager, 99.9% uptime SLA, and custom implementation plans.

### 2.5 Pricing & Plans (`/pricing`)
- **Page Title:** Calendly Pricing & Plans | Free, Standard, Teams, Enterprise
- **Main Heading (`H1`):** *"Pick the right plan for you"*
- **Tiers & Comparisons:**
  1. **Free Plan ($0):** 1 calendar connection, 1 active event type, core booking link, automated notifications.
  2. **Standard Plan ($10/seat/mo billed annually):** Unlimited event types, multiple calendars, integrations with Stripe/PayPal/Zapier.
  3. **Teams Plan ($16/seat/mo billed annually):** Round robin, collective events, Salesforce & HubSpot CRM routing, admin analytics.
  4. **Enterprise (Custom):** SSO, SCIM, Salesforce routing, dedicated CSM, security review, master services agreement (MSA).
- **Interactive Controls:** Monthly vs. Annual billing toggle (saving ~20%).

### 2.6 Integrations Directory (`/integration`)
- **Page Title:** Integrations & Apps Directory | Calendly
- **Main Heading (`H1`):** *"Connect Calendly with the tools you use every day"*
- **Filter Navigation:**
  - Search input field
  - Category filters: Video Conferencing, Sales & CRM, Payments, Recruiting & ATS, Analytics, Workflow Automation.
  - Top Connectors featured: Salesforce, HubSpot, Google Meet, Microsoft Teams, Zoom, Slack, Zapier, Stripe, PayPal, Claude, ChatGPT.

### 2.7 Developer Platform (`developer.calendly.com/docs/getting-started/overview`)
- **Page Title:** Build with Calendly | Developer Documentation
- **Main Heading (`H1`):** *"Build with Calendly"*
- **Core Subsections:**
  1. **Getting Started Overview:** Authentication, API tokens, Sandbox testing.
  2. **OAuth 2.0:** Secure user authorization workflows and refresh tokens.
  3. **REST API Reference:** Users, Event Types, Scheduled Events, Webhooks, Routing Forms, Notetaker Recaps.
  4. **Embedding Calendly:** Inline, popup widget, and popup text JavaScript SDKs.
  5. **Changelog & Release Notes:** Up-to-date versioning of API schemas.

### 2.8 Legal Hub (`/legal`)
- **Page Title:** Legal Overview | Calendly
- **Main Heading (`H1`):** *"Calendly Legal"*
- **Policy Inventory:**
  1. **Customer Terms and Conditions:** `/legal/customer-terms-conditions`
  2. **Global Privacy Notice:** `/legal/privacy-notice`
  3. **Data Processing Addendum (DPA):** `/legal/data-processing-addendum`
  4. **California Privacy Notice (CCPA):** `/legal/ccpa`
  5. **Beta Terms of Use:** `/legal/beta-terms`
  6. **Invitee / Participant Terms:** `/legal/participant-terms-conditions`
  7. **Education (FERPA & COPPA):** `/legal/ferpa-coppa-privacy-notice`
  8. **Acceptable Use Policy:** `/legal/acceptable-use-policy`
  9. **Developer Policy:** `/legal/developer-policy`
  10. **DMCA Notice:** `/legal/dmca`
