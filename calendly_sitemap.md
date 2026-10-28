# Calendly Website Sitemap (Hierarchical)

> **Audit Date:** October 2026  
> **Target Domain:** [https://calendly.com/](https://calendly.com/)  
> **Auditor:** Expert Website Auditor & Browser Automation Engineer  
> **Audit Status:** Sitemap Inventory Compiled; Partial Live Verification Completed.  
> **Scope:** Public-facing production website, navigation architecture, verified landing pages, and ecosystem subdomains.

---

## 1. Top-Level Architectural Overview

Calendly’s digital estate is structured into eight core functional divisions:
1. **Homepage (`/`)**: Dynamic product hub with 11 scrolling sections, multi-tab feature switchbacks, customer social proof, and interactive workflow previews.
2. **Product Ecosystem (`/scheduling`, `/ai-assistant`, `/notetaker`, `/contacts`, `/payments`, `/security`)**: Core scheduling engine, generative AI tools, relationship management, payment collection, and enterprise security.
3. **Solutions Architecture (`/solutions/*`)**: Audience-tailored landing pages segmented by organizational scale (Individuals, Small Business, Enterprise), departmental team (Sales, Marketing, Customer Success, Recruiting, IT, RevOps), and industry vertical (Education, Technology, Financial Services, Professional Services).
4. **Integrations Directory (`/integration/*`)**: Comprehensive ecosystem of 100+ native connectors spanning Google, Microsoft, Zoom, Salesforce, HubSpot, Slack, Zapier, Stripe, PayPal, and LLM integrations (ChatGPT, Claude).
5. **Pricing & Conversion Funnels (`/pricing`, `/signup`, `/login`, `/demo`, `/contact`)**: Subscription plan tiers, self-serve onboarding, guided product tours, and high-touch enterprise sales routing.
6. **Resources & Content Hubs (`/learn`, `/resources`, `/blog`, `/customers`, `/release-notes`)**: Learning academy, guide & webinar repository, multi-category thought leadership blog, customer case study portfolio, and product release updates.
7. **Developer Platform & Community (`developer.calendly.com`, `community.calendly.com`)**: API documentation, OAuth 2.0 flows, webhook registries, developer release notes, and peer support forums.
8. **Corporate & Legal Governance (`/about`, `/careers`, `/newsroom`, `/legal/*`, `calendlystatus.com`)**: Executive vision, active hiring, press releases, comprehensive legal and compliance policies, and real-time infrastructure status.

---

## 2. Homepage & Embedded Scrolling Sections

```
[PAGE-001] Homepage: https://calendly.com/
│
├── Section 1: Hero Showcase [id: [Home]-Hero]
│   ├── H1: "All the work around meetings, handled."
│   ├── P: "From AI-powered scheduling to automated meeting recaps and follow-ups, get the busywork done with fewer tools and less effort."
│   ├── CTAs: "Sign up with Google" | "Sign up with Microsoft" | "Sign up with email"
│   └── Interactive Tabs:
│       ├── Tab 1: Scheduling (Automated booking previews)
│       ├── Tab 2: Callie (Beta AI assistant preview)
│       ├── Tab 3: Notetaker (Meeting recaps & action items preview)
│       └── Tab 4: Payments (Upfront payment & invoice preview)
│
├── Section 2: Social Proof Banner
│   ├── H1: "Easy scheduling ahead."
│   ├── P: "Join 20 million professionals who easily book meetings with the #1 scheduling tool."
│   └── CTAs: "Sign up with Google" | "Sign up with Microsoft" | "Sign up with email"
│
├── Section 3: Meeting Lifecycle Architecture
│   ├── H2: "Built for people whose work runs on meetings"
│   ├── Step 1 [H3]: Book ("Book the meeting and get paid with zero back-and-forth")
│   ├── Step 2 [H3]: Prep ("Automated reminders and intake forms")
│   ├── Step 3 [H3]: Capture ("Actionable meeting summaries and recordings")
│   ├── Step 4 [H3]: Follow up ("Pre-drafted follow-up emails and CRM sync")
│   └── CTA: "Start for free"
│
├── Section 4: Workflow Overview
│   ├── H2: "There's more to meetings than finding a time."
│   └── P: "Book meetings, capture discussions and decisions, and keep next steps moving with tools that help you handle the work before, during, and after every meeting."
│
├── Section 5: Feature Switchback - Core Scheduling [id: [Home]-AccordionSwitchbacks-Scheduling]
│   ├── H2: "A better way to book your meetings"
│   ├── Accordion Tab 1: Full control over your calendar (Availability & working hours)
│   ├── Accordion Tab 2: Meeting templates for every scenario (1-on-1, round-robin, collective)
│   ├── Accordion Tab 3: Automated email & text workflows (Reminders & reduce no-shows)
│   ├── Accordion Tab 4: Website embeds and routing forms (Lead qualification & direct booking)
│   └── Accordion Tab 5: Scheduling whenever, wherever (Mobile & extension access)
│
├── Section 6: Feature Switchback - Callie AI [id: [Home]-AccordionSwitchbacks-Callie]
│   ├── H2: "Meet Callie, your AI assistant"
│   ├── P: "Instead of managing scheduling links and calendars yourself, just add callie@calendly.com to the email thread. Say what you need and let Callie take it from there."
│   ├── Feature 1 [H3]: Conversational scheduling
│   ├── Feature 2 [H3]: Precise coordination
│   └── Feature 3 [H3]: 24/7 assistance with meeting tasks
│
├── Section 7: Feature Switchback - Notetaker [id: [Home]-AccordionSwitchbacks-Notetaker]
│   ├── H2: "Actionable recaps for every meeting"
│   ├── P: "End every call with meeting summaries and next steps, so nothing falls through the cracks."
│   ├── Feature 1 [H3]: Clear summaries with next steps
│   ├── Feature 2 [H3]: Pre-drafted follow-up emails
│   ├── Feature 3 [H3]: Works with your tools (Zoom, Google Meet, Teams)
│   └── Feature 4 [H3]: Instant meeting recall
│
├── Section 8: Feature Switchback - Payments [id: [Home]-AccordionSwitchbacks-Payments]
│   ├── H2: "Flexible payment options that fit your business"
│   ├── P: "Collect payment when clients book with you, so you can get paid sooner and reduce no-shows."
│   ├── Feature 1 [H3]: Upfront meeting payments
│   ├── Feature 2 [H3]: Meeting packages
│   ├── Feature 3 [H3]: Invoices
│   └── Feature 4 [H3]: Payment links
│
├── Section 9: Customer Stories & Metrics [id: [Home]-CustomerStories]
│   ├── H2: "Real customers. Real results."
│   ├── Stat Card 1: "$1,200 annual savings" (Consulting business efficiency)
│   ├── Stat Card 2: "100% attendance rate" (Reduced no-shows via automated reminders)
│   ├── Stat Card 3: "75 hours saved monthly" (Team administrative reduction)
│   ├── Stat Card 4: "80% reduction in booking-related emails" (Sales scheduling)
│   └── Stat Card 5: "3 to 5 hours saved per week" (Solo entrepreneur impact)
│
├── Section 10: Integrations Showcase [id: [Home]-Integrations-ConnectCalendlywithyourfavoritetools]
│   ├── H2: "Connect Calendly with your favorite tools"
│   ├── P: "Our extensive list of integrations makes Calendly flexible."
│   ├── Highlight 1: Google suite (Calendar, Meet, Analytics)
│   ├── Highlight 2: Microsoft suite (Teams, Outlook, Azure SSO)
│   └── CTA: "View all integrations" -> https://calendly.com/integration
│
└── Section 11: Final Call-to-Action Banner
    ├── H2: "From the first meeting to the follow-up"
    ├── P: "All of the work around meetings, handled in one place. Book time, capture every discussion, and keep next steps moving without the manual work."
    └── CTA: "Start for free" -> https://calendly.com/signup
```

---

## 3. Global Navigation Hierarchy

### 3.1 Primary Navigation Dropdowns (Header)

#### Dropdown 1: Product (`/product`)
- **Core Products:**
  - [PAGE-002] **Scheduling** (`/scheduling`): Simplified booking, calendar sync, buffers, and meeting links.
  - [PAGE-003] **Callie (Beta)** (`/ai-assistant`): AI scheduling assistant via email (`callie@calendly.com`) and conversational chat.
  - [PAGE-004] **Notetaker** (`/notetaker`): Automated meeting recording, AI transcription, client-ready recaps, and action items.
  - [PAGE-005] **Contacts** (`/contacts`): Relationship management hub, interaction history, attendee details, and CRM synchronization.
  - [PAGE-006] **Payments** (`/payments`): Upfront payments, deposits, recurring packages, and Stripe/PayPal payment links.
- **Platform & Extension Tools:**
  - [PAGE-007] **Integrations** (`/integration`): Directory of 100+ native connectors.
  - [PAGE-008] **Security** (`/security`): Enterprise compliance (SOC 2 Type II, ISO 27001, GDPR, HIPAA, SSO/SCIM).
  - [PAGE-009] **Mobile App** (`/features/mobile-apps`): iOS & Android native apps for scheduling on the go.
  - [PAGE-010] **Browser Extension** (`/features/browser-extensions`): Chrome, Firefox, Edge, Safari, and Outlook extensions.
  - [PAGE-011] **Admin Controls** (`/features/admin-management`): Centralized governance, team permissions, managed templates, and audit logs.
  - [PAGE-012] **Analytics** (`/features/analytics`): Reporting on booking velocity, team performance, and meeting volume.

#### Dropdown 2: Solutions (`/solutions`)
- **By Organization Size:**
  - [PAGE-013] **Individuals** (`/solutions/individuals`): Solo professionals, consultants, freelancers, and personal scheduling.
  - [PAGE-014] **Small Business** (`/solutions/small-business`): Growing teams needing shared calendars, intake forms, and automated payments.
  - [PAGE-015] **Large Companies (Enterprise)** (`/solutions/enterprise`): Enterprise-grade security, Salesforce sync, SCIM, and dedicated CSM.
- **By Department / Team:**
  - [PAGE-016] **Sales** (`/solutions/sales`): Inbound lead routing, automated qualification, round-robin distribution, and CRM logging.
  - [PAGE-017] **Marketing** (`/solutions/marketing`): Website scheduling embeds, campaign conversion optimization, and marketing attribution.
  - [PAGE-018] **Customer Success** (`/solutions/customer-success`): Automated onboarding milestones, QBR scheduling, and retention touchpoints.
  - [PAGE-019] **Recruiting** (`/solutions/recruiting`): High-volume candidate coordination, multi-interviewer panels, and ATS integration.
  - [PAGE-020] **IT** (`/solutions/it`): Centralized identity management, SAML SSO, SCIM provisioning, and security compliance.
  - [PAGE-021] **Revenue Operations** (`/solutions/revenue-operations`): Full-funnel scheduling lifecycle automation and pipeline acceleration.
- **By Industry Vertical:**
  - [PAGE-022] **Education** (`/solutions/education`): Academic advising, student office hours, admissions interviews, and campus scheduling.
  - [PAGE-023] **Technology** (`/solutions/technology`): Tech startups and scaleups accelerating sales cycles and engineering interviews.
  - [PAGE-024] **Financial Services** (`/solutions/financial-services`): Compliant wealth management, banking, mortgage, and insurance client meetings.
  - [PAGE-025] **Professional Services** (`/solutions/professional-services`): Legal, accounting, consulting, and agency billable hour scheduling.

#### Dropdown 3: Resources (`/resources`)
- **Learning & Technical Docs:**
  - [PAGE-026] **Learning Hub** (`/learn`): Structured video tutorials, onboarding courses, and best practices.
  - [PAGE-027] **Getting Started Guide** (`/learn/getting-started`): Quick-start onboarding for new accounts.
  - [PAGE-028] **Guides & Webinars** (`/resources`): Downloadable whitepapers, live webinars, and tactical guides.
  - [PAGE-029] **Developer Docs** (`https://developer.calendly.com`): REST API reference, webhooks, embeds, and SDKs.
  - [PAGE-030] **Help Center** (`/help`): Knowledge base, account troubleshooting, billing, and user FAQs.
  - [PAGE-031] **Community** (`https://community.calendly.com`): User community forum, feature discussions, and peer networking.
- **Company & Stories:**
  - [PAGE-032] **About Us** (`/about`): Calendly mission, culture, founders, leadership, and company milestones.
  - [PAGE-033] **What's New (Release Notes)** (`/release-notes`): Chronological log of product updates and new feature announcements.
  - [PAGE-034] **Customer Stories** (`/customers`): Case studies highlighting ROI, hours saved, and revenue gains.
  - [PAGE-035] **Newsroom** (`/newsroom`): Press releases, media coverage, and brand assets.
  - [PAGE-036] **Contact Us** (`/contact-us`): General inquiries and company communication.

#### Standalone Primary Navigation Item:
- [PAGE-037] **Pricing** (`/pricing`): Plan comparison (Free, Standard, Teams, Enterprise) with monthly/annual billing options.

#### Header Global Action Buttons:
- **Log In** (`https://calendly.com/login`): Authentication gateway for existing users.
- **Talk to Sales** (`https://calendly.com/contact`): Enterprise lead inquiry form and sales contact portal.
- **Get started / Get started for free** (`https://calendly.com/signup`): Self-serve free trial and account registration.

---

## 4. Deep Architectural Hierarchies

### 4.1 Core Product & Capabilities Hierarchy
```
/scheduling (Automated Scheduling Hub)
├── /scheduling/availability (Customizable availability, working hours, buffers)
├── /scheduling/event-types (One-on-one, group, collective, round-robin meeting templates)
├── /scheduling/meetings (Internal and external meeting management)
├── /scheduling/meeting-polls (Multi-invitee voting on meeting times)
├── /scheduling/appointments (Service appointments & client bookings)
├── /scheduling/groups (Team scheduling & shared event types)
├── /scheduling/routing (Form-based logic & instant routing to sales reps)
├── /scheduling/embed-options (Inline, popup widget, and text embeds)
├── /scheduling/automated-communication (Workflows, automated reminders, SMS, follow-ups)
├── /scheduling/calendar-connections (Google, Outlook, Office 365, iCloud sync)
└── /scheduling/crm-integrations (Bi-directional CRM data sync)

/ai-assistant (Callie AI Platform)
├── Conversational email scheduling (callie@calendly.com)
├── In-app conversational chat assistant
└── Natural language availability management

/notetaker (AI Meeting Notetaker)
├── Automatic recording & transcription
├── AI-generated meeting recaps & key takeaways
├── Action item generation & automated follow-up drafts
└── Multi-platform support (Zoom, Google Meet, Microsoft Teams)

/contacts (Relationship Management Hub)
├── Attendee profile timelines & meeting history
├── Meeting metadata & custom question tracking
└── Contact list sync with Salesforce & HubSpot

/payments (Payment Collection Suite)
├── Stripe integration (Credit card, Apple Pay, Google Pay)
├── PayPal integration
└── Paid appointment policies & refund handling
```

### 4.2 Integrations Hierarchy (`/integration`)
```
/integration (Directory Hub)
├── Category Filters:
│   ├── /integration#video-conferencing (Zoom, Google Meet, Microsoft Teams, Webex, GoTo Meeting)
│   ├── /integration#sales-and-crm (Salesforce, HubSpot, Gong, ActiveCampaign)
│   ├── /integration#payments (Stripe, PayPal)
│   ├── /integration#recruiting-and-ats (Greenhouse, Lever, LinkedIn Messaging)
│   ├── /integration#analytics (Google Analytics, Meta Pixel)
│   └── /integration#workflow-automation (Zapier, Make, Slack, Mailchimp)
└── Dedicated Partner & Integration Landing Pages:
    ├── /integration/salesforce (Enterprise CRM sync & auto-lead creation)
    ├── /integration/hubspot (Contact timeline & deals automation)
    ├── /integration/google (Google Calendar & Meet integration)
    ├── /integration/microsoft (Outlook Calendar & Office 365 sync)
    ├── /integration/microsoft-teams (Automated Teams video links)
    ├── /integration/zoom (Automated Zoom link generation)
    ├── /integration/slack (Direct booking & notifications inside Slack)
    ├── /integration/zapier (Connection to 1,000+ business applications)
    ├── /integration/stripe (Credit card payment processing at booking)
    ├── /integration/paypal (PayPal checkout for event types)
    ├── /integration/chatgpt (ChatGPT action integration)
    └── /integration/claude (Anthropic Claude conversational scheduling)
```

### 4.3 Developer Documentation Hierarchy (`developer.calendly.com`)
```
developer.calendly.com (Root -> Redirects to /docs/getting-started/overview)
├── Getting Started:
│   ├── /docs/getting-started/overview (Developer platform introduction)
│   ├── /docs/getting-started/introduction (Core concepts & architecture)
│   └── /docs/getting-started/frequently-asked-questions (Developer FAQs)
├── API Reference:
│   ├── /api-docs/calendly-api/users/* (Get current user, user profiles)
│   ├── /api-docs/calendly-api/event-types/* (Create, read, update, list event types)
│   ├── /api-docs/calendly-api/scheduled-events/* (Manage scheduled meetings & invitees)
│   ├── /api-docs/calendly-api/routing-forms/* (Query routing form submissions)
│   ├── /api-docs/calendly-api/notetaker/* (Access meeting recaps & transcripts)
│   ├── /api-docs/calendly-api/contacts/* (Query & update contact entities)
│   ├── /api-docs/calendly-api/webhooks/* (Webhook subscriptions & event streams)
│   └── /api-docs/calendly-o-auth/o-auth/* (OAuth 2.0 authorization, token refresh, revocation)
└── Developer Release Notes:
    └── /release-notes (Chronological developer API changelog from 2020 through 2026)
```

### 4.4 Corporate Governance & Legal Hub (`/legal`)
```
/legal (Legal Portal Hub)
├── /legal/customer-terms-conditions (Primary Customer Terms & Conditions)
├── /legal/privacy-notice (Global Privacy Notice)
├── /legal/data-processing-addendum (GDPR Data Processing Addendum - DPA)
├── /legal/ccpa (California Consumer Privacy Act Notice at Collection)
├── /legal/beta-terms (Beta Features Terms of Use)
├── /legal/participant-terms-conditions (Invitee / Participant Terms)
├── /legal/ferpa-coppa-privacy-notice (Educational FERPA & Children's COPPA Notice)
├── /legal/acceptable-use-policy (Platform Acceptable Use Policy)
├── /legal/industry-specific-supplemental-terms (Supplemental Terms)
├── /legal/developer-policy (Developer & API Usage Terms)
├── /legal/dmca (DMCA & Trademark Infringement Policy)
├── /legal/definitions (Legal Taxonomy & Definitions)
└── /legal/web-accessibility-statement (ADA / WCAG Web Accessibility Statement)
```

---

## 5. Global Footer Link Taxonomy

The live Calendly footer contains 53 verified links distributed across 6 functional columns and utility sections:

| Column Header | Link Label | Target URL |
| :--- | :--- | :--- |
| **Product** | Scheduling | `/scheduling` |
| | AI assistant | `/ai-assistant` |
| | Notetaker | `/notetaker` |
| | Contacts | `/contacts` |
| | Payments | `/payments` |
| | Security | `/security` |
| **Features** | Customizable availability | `/scheduling/availability` |
| | Event types | `/scheduling/event-types` |
| | Meeting polls | `/scheduling/meeting-polls` |
| | Reminders & follow up | `/scheduling/automated-communication` |
| | Meeting routing | `/scheduling/routing` |
| | Analytics | `/features/analytics` |
| | Admin management | `/features/admin-management` |
| **Integrations** | Google ecosystem | `/integration?search=google` |
| | Microsoft ecosystem | `/integration?search=microsoft` |
| | Video conferencing | `/integration#video-conferencing` |
| | Payment processors | `/integration#payments` |
| | Sales & CRM | `/integration#sales-and-crm` |
| | Recruiting & ATS | `/integration#recruiting-and-ats` |
| | All integrations | `/integration` |
| **Solutions** | For individuals | `/solutions/individuals` |
| | For teams | `/solutions/small-business` |
| | For large companies | `/solutions/enterprise` |
| **Plans & Tours**| Create your account | `/signup` |
| | Pricing and plans | `/pricing` |
| | Product tour | `/demo` |
| | What's new | `/release-notes` |
| **Resources & Help**| Getting started guide | `/learn/getting-started` |
| | Calendly community | `https://community.calendly.com` |
| | Developer tools | `https://developer.calendly.com` |
| | Help center | `/help` |
| | Learning hub | `/learn` |
| **Contact & Company**| Contact support | `/help/support` |
| | Contact sales | `/contact` |
| | About us | `/about` |
| | Careers | `/careers` |
| | Become a partner | `/partners/contact` |
| | Blog | `/blog` |
| **Mobile Apps** | iOS App (Apple App Store) | `https://apps.apple.com/app/calendly-mobile/id1451094657...` |
| | Android App (Google Play) | `https://play.google.com/store/apps/details?id=com.calendly.app...` |
| **Extensions** | Microsoft Edge Add-on | `https://microsoftedge.microsoft.com/addons/detail/...` |
| | Apple Safari Extension | `https://apps.apple.com/us/app/calendly-meeting-scheduling/...` |
| | Google Chrome Extension | `https://chromewebstore.google.com/detail/...` |
| | Mozilla Firefox Extension | `https://addons.mozilla.org/en-US/firefox/addon/...` |
| | Microsoft Outlook Add-in | `https://appsource.microsoft.com/en-us/product/office/...` |
| **Social Links** | X (Twitter) | `https://x.com/calendly` |
| | Instagram | `https://instagram.com/calendly` |
| | Facebook | `https://facebook.com/calendly` |
| | LinkedIn | `https://linkedin.com/company/calendly` |
| | YouTube | `https://www.youtube.com/c/Calendly` |
| **Legal & Utilities**| Privacy Policy | `/legal/privacy-notice` |
| | Legal | `/legal` |
| | System Status | `https://www.calendlystatus.com` (redirects to `https://calendlystatus.com/`) |
| | Language Selector | English (Interactive modal/selector) |
| | Cookie Settings | Interactive modal trigger |
| | Your Privacy Choices | Interactive privacy preferences trigger |

---

## 6. Subdomain Architecture & External Ecosystem

Calendly operates multiple specialized subdomains that form an integral part of its public web presence:

1. **`developer.calendly.com`**
   - **Role:** Official developer portal, API documentation, OAuth specification, SDKs, and webhook guides.
   - **Status:** Verified live (redirects root to `/docs/getting-started/overview`).
2. **`community.calendly.com`**
   - **Role:** Customer support and user community forum powered by InSided/Gainsight.
   - **Status:** Verified live.
3. **`calendlystatus.com`** (Aliased from `www.calendlystatus.com`)
   - **Role:** Real-time infrastructure availability, incident history, and scheduled maintenance monitoring powered by Atlassian Statuspage.
   - **Status:** Verified live.
4. **App Stores & Extensions (Third-Party Calendly-Controlled Assets)**
   - Apple App Store (iOS Mobile App & macOS Safari Extension)
   - Google Play Store (Android Mobile App)
   - Google Chrome Web Store (Chrome Extension)
   - Microsoft AppSource (Office 365 / Outlook Add-in)
   - Microsoft Edge Add-ons (Edge Extension)
   - Mozilla Add-ons (Firefox Extension)

---

## 7. URL Discrepancies, Redirects & Not-Found Candidates

In accordance with empirical audit verification principles, the following URLs have been checked and separated into verified redirects and confirmed not-found responses:

### 7.1 Confirmed Not-Found URLs (HTTP 404)
These URLs appear in legacy sitemaps, navigation references, or documentation but do not exist on the live production server:
1. `https://calendly.com/home/scheduling` — **HTTP 404 Not Found** *(Present in `marketing-site/sitemap.xml`, but superseded by `https://calendly.com/scheduling`)*
2. `https://developer.calendly.com/api-reference` — **HTTP 404 Not Found** *(Active API docs reside under `https://developer.calendly.com/api-docs/calendly-api/*`)*
3. `https://calendly.com/legal/security` — **HTTP 404 Not Found** *(Active page is located at `https://calendly.com/security`)*
4. `https://calendly.com/legal/terms-of-service` — **HTTP 404 Not Found** *(Active contract is `https://calendly.com/legal/customer-terms-conditions`)*
5. `https://calendly.com/legal/cookie-policy` — **HTTP 404 Not Found** *(Cookie disclosures are integrated into `/legal/privacy-notice`)*

### 7.2 Verified Redirects
1. `https://calendly.com/compare` $\rightarrow$ `https://calendly.com/blog/compare-calendly` (HTTP 200)
2. `https://developer.calendly.com` $\rightarrow$ `https://developer.calendly.com/docs/getting-started/overview` (HTTP 200)
3. `https://calendly.com/leadership` $\rightarrow$ `https://calendly.com/about` (HTTP 200)
4. `https://calendly.com/features` $\rightarrow$ `https://calendly.com/scheduling` (HTTP 200)
5. `https://calendly.com/solutions/financial-services/insurance` $\rightarrow$ `https://calendly.com/solutions/financial-services` (HTTP 200)
6. `https://www.calendlystatus.com` $\rightarrow$ `https://calendlystatus.com/` (HTTP 200)

### 7.3 Complete 1,074-URL Inventory Mapping
For the complete line-by-line inventory of all 1,074 discovered URLs—including all 423 Help Center articles, 287 Blog posts, 98 Integration listings, 75 Guides/Webinars, 60 Customer Stories, 32 Newsroom releases, and 20 Learning academy courses—consult [`calendly_pages.csv`](file:///c:/Users/galik/calendy-sitemap/calendly_pages.csv):
- **URLs Individually Verified Live (HTTP 200):** 572
- **URLs Unverified (Published in Sitemap; rate-limited during bulk checks):** 487
- **URLs Confirmed as Redirects:** 10
- **URLs Confirmed Not Found (HTTP 404):** 5

