import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Accordion } from "@/components/ui/Accordion";

export const metadata: Metadata = {
  title: "Integrations Directory | Plany",
  description:
    "Explore Plany's integrations directory. Discover active RFC 5545 calendar invitations and our planned roadmap for Google Calendar, Outlook, Zoom, Slack, and CRM connectors.",
};

interface IntegrationItem {
  id: string;
  name: string;
  slug: string;
  category: string;
  status: "Available now" | "Planned" | "In planning";
  statusVariant: "success" | "neutral" | "warning";
  description: string;
  badge: string;
  highlight?: boolean;
}

interface CategoryGroup {
  title: string;
  description: string;
  items: IntegrationItem[];
}

export default function IntegrationsPage() {
  const categories: CategoryGroup[] = [
    {
      title: "Calendar & Scheduling",
      description: "Direct synchronization and open calendar standards for seamless scheduling.",
      items: [
        {
          id: "calendar-export",
          name: "RFC 5545 .ics Calendar Export",
          slug: "calendar-export",
          category: "Calendar & Scheduling",
          status: "Available now" as const,
          statusVariant: "success" as const,
          description:
            "Universal iCalendar file generation compliant with RFC 5545. Imports directly into Google Calendar, Microsoft Outlook, Apple Calendar, and mobile apps.",
          badge: "Active",
          highlight: true,
        },
        {
          id: "google-calendar",
          name: "Google Calendar",
          slug: "google-calendar",
          category: "Calendar & Scheduling",
          status: "Planned" as const,
          statusVariant: "neutral" as const,
          description:
            "Planned continuous bidirectional synchronization with Google Calendar accounts to block personal busy times automatically.",
          badge: "Connector",
        },
        {
          id: "outlook",
          name: "Microsoft Outlook & Office 365",
          slug: "outlook",
          category: "Calendar & Scheduling",
          status: "Planned" as const,
          statusVariant: "neutral" as const,
          description:
            "Planned integration via Microsoft Graph API for Exchange Online and Outlook 365 calendar event synchronization.",
          badge: "Connector",
        },
      ],
    },
    {
      title: "Video Conferencing",
      description: "Automated virtual meeting room generation attached directly to confirmed bookings.",
      items: [
        {
          id: "google-meet",
          name: "Google Meet",
          slug: "google-meet",
          category: "Video Conferencing",
          status: "Planned" as const,
          statusVariant: "neutral" as const,
          description:
            "Planned automatic generation of secure Google Meet conference links embedded into booking confirmations.",
          badge: "Conferencing",
        },
        {
          id: "microsoft-teams",
          name: "Microsoft Teams",
          slug: "microsoft-teams",
          category: "Video Conferencing",
          status: "Planned" as const,
          statusVariant: "neutral" as const,
          description:
            "Planned Microsoft Teams meeting creation and dial-in coordinator for corporate organizations.",
          badge: "Conferencing",
        },
        {
          id: "zoom",
          name: "Zoom Video Conferencing",
          slug: "zoom",
          category: "Video Conferencing",
          status: "Planned" as const,
          statusVariant: "neutral" as const,
          description:
            "Planned OAuth connector to provision unique Zoom meeting URLs and passcodes dynamically per booking.",
          badge: "Conferencing",
        },
      ],
    },
    {
      title: "Productivity & Collaboration",
      description: "Keep team channels updated when meetings are booked, rescheduled, or cancelled.",
      items: [
        {
          id: "slack",
          name: "Slack Notifications",
          slug: "slack",
          category: "Productivity & Collaboration",
          status: "Planned" as const,
          statusVariant: "neutral" as const,
          description:
            "Planned Slack channel alerts and direct messages when an invitee reserves a slot on your calendar.",
          badge: "Notifications",
        },
      ],
    },
    {
      title: "CRM & Sales",
      description: "Pipeline synchronization to log meetings and contacts into enterprise systems.",
      items: [
        {
          id: "salesforce",
          name: "Salesforce CRM",
          slug: "salesforce",
          category: "CRM & Sales",
          status: "Planned" as const,
          statusVariant: "neutral" as const,
          description:
            "Planned lead creation, contact matching, and opportunity activity history logging upon booking confirmation.",
          badge: "CRM",
        },
        {
          id: "hubspot",
          name: "HubSpot CRM",
          slug: "hubspot",
          category: "CRM & Sales",
          status: "Planned" as const,
          statusVariant: "neutral" as const,
          description:
            "Planned contact record creation and engagement logging in HubSpot for inbound sales cadences.",
          badge: "CRM",
        },
      ],
    },
    {
      title: "Automation & Developer Tools",
      description: "Custom workflow triggers and multi-app orchestration.",
      items: [
        {
          id: "zapier",
          name: "Zapier Automation",
          slug: "zapier",
          category: "Automation & Developer Tools",
          status: "In planning" as const,
          statusVariant: "warning" as const,
          description:
            "In planning: Zapier triggers and actions to connect Plany booking events with over 5,000+ web applications.",
          badge: "Automation",
        },
      ],
    },
  ];

  const directoryFaqs = [
    {
      id: "faq-how-calendar-works-now",
      title: "How does calendar integration currently work in Plany?",
      content:
        "Plany generates standards-compliant RFC 5545 iCalendar (.ics) files upon booking confirmation. When an invitee books a slot, they receive an immediate 'Download calendar invite (.ics)' button. Tapping or opening this file imports the meeting with its exact UTC timestamp, duration, title, host name, and invitee info directly into Google Calendar, Microsoft Outlook, Apple Calendar, and mobile calendar apps.",
    },
    {
      id: "faq-two-way-sync",
      title: "Does Plany currently offer automatic two-way calendar sync?",
      content:
        "No. Plany does not currently poll or synchronize directly with Google Calendar or Microsoft Exchange / Graph APIs. All calendar exports are handled via universal .ics file downloads. Two-way cloud calendar synchronization is an active architectural roadmap initiative.",
    },
    {
      id: "faq-video-links",
      title: "Can Plany generate Zoom, Google Meet, or Teams links right now?",
      content:
        "Not in the current release. Direct API connectors for Zoom, Google Meet, and Teams are planned for future updates. Currently, hosts can include virtual conferencing links or dial-in notes in their event description, which are preserved in the generated .ics calendar invitation.",
    },
    {
      id: "faq-crm-zapier",
      title: "When will Salesforce, HubSpot, and Zapier integrations be available?",
      content:
        "CRM connectors (Salesforce, HubSpot) and automation triggers (Zapier, webhooks) are on our engineering roadmap. Our current focus is delivering bulletproof individual scheduling, zero double-booking concurrency protection, and precise timezone calculations.",
    },
    {
      id: "faq-file-compatibility",
      title: "Is the exported .ics file compatible with Microsoft Outlook and Apple Calendar?",
      content:
        "Yes. Plany's .ics generator adheres strictly to RFC 5545 specifications, using CRLF line endings, text escaping for commas/semicolons/newlines, line folding for lines exceeding 75 octets, and deterministic UTC formatting (YYYYMMDDTHHmmssZ).",
    },
  ];

  return (
    <main className="min-h-screen bg-[#fcfbf8] text-[#071a31] pb-24">
      {/* =========================================================================
          Section 1: Hero Section
          ========================================================================= */}
      <section className="pt-12 pb-16 sm:pt-16 sm:pb-24 lg:pt-20 lg:pb-28 bg-[#fcfbf8] border-b border-[#e4e6e9]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold tracking-[-0.03em] text-[#071a31] max-w-4xl mx-auto leading-[1.08]">
            Connect Plany with the tools you use every day.
          </h1>

          <p className="type-body-xl text-[#5f6d77] max-w-2xl mx-auto leading-relaxed">
            Plany is built on universal calendar standards, featuring immediate RFC 5545 calendar export today and an extensible architecture designed for cloud calendar, conferencing, and CRM connectors.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <Link href="/alex/30-min-chat" className="w-full sm:w-auto">
              <Button variant="primary" size="lg" fullWidth>
                Try Live Booking Demo
              </Button>
            </Link>
            <Link href="/integrations/calendar-export" className="w-full sm:w-auto">
              <Button variant="secondary" size="lg" fullWidth>
                View Active .ics Export
              </Button>
            </Link>
          </div>

          <p className="text-xs text-[#748491]">
            Active RFC 5545 .ics generation • No third-party OAuth connection required
          </p>
        </div>
      </section>

      {/* =========================================================================
          Section 2: Integration Transparency & Status Notice
          ========================================================================= */}
      <section className="py-8 sm:py-10 bg-white border-b border-[#e4e6e9]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-6 sm:p-7 lg:p-8 rounded-[24px] bg-[#f4f9ff] border border-[#c1defe]/90 space-y-4 sm:space-y-5 shadow-cal-sm">
            <div className="flex items-center gap-2.5">
              <span className="w-3.5 h-3.5 rounded-full bg-[#10b981] shrink-0" />
              <h2 className="text-[20px] sm:text-[22px] lg:text-[24px] font-bold text-[#071a31] leading-tight">
                Integration Transparency &amp; Status Notice
              </h2>
            </div>
            <p className="text-base lg:text-[18px] text-[#5f6d77] leading-[1.6]">
              <strong className="font-bold text-[#071a31]">Available now: </strong>
              Universal RFC 5545 .ics file export, working hours calculation, timezone translation, and database write locking.
              <span className="inline-block mx-2 font-normal text-[#94a3b8]">•</span>
              <strong className="font-bold text-[#071a31]">In development: </strong>
              Direct OAuth synchronization (Google Calendar, Outlook), auto-generated video rooms (Meet, Teams, Zoom), and CRM webhooks.
            </p>
            <div className="pt-2 sm:pt-3 flex flex-wrap items-center gap-3 sm:gap-4 border-t border-[#c1defe]/60">
              <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#748491]">
                Current Status:
              </span>
              <Badge variant="success" size="md" dot>
                1 Active
              </Badge>
              <Badge variant="neutral" size="md">
                8 Planned
              </Badge>
              <Badge variant="warning" size="md">
                1 In planning
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          Section 3: Grouped Integration Cards
          ========================================================================= */}
      <section className="py-12 sm:py-16 lg:py-20 bg-[#fcfbf8] border-b border-[#e4e6e9]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12 lg:space-y-12">
          {categories.map((cat, catIdx) => (
            <div key={catIdx} className="space-y-5 sm:space-y-6">
              {/* Category Header with standardized spacing and clear divider */}
              <div className="space-y-2 sm:space-y-2.5 pb-4 sm:pb-5 border-b border-[#e4e6e9]">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#071a31] tracking-tight">
                  {cat.title}
                </h2>
                <p className="text-sm sm:text-base text-[#5f6d77] leading-relaxed max-w-2xl">
                  {cat.description}
                </p>
              </div>

              {/* Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {cat.items.map((item) => (
                  <Link
                    key={item.id}
                    href={`/integrations/${item.slug}`}
                    className={`group block p-6 sm:p-7 rounded-[22px] bg-white border transition-all flex flex-col justify-between ${
                      item.highlight
                        ? "border-2 border-[#071a31] shadow-cal-md hover:shadow-cal-lg"
                        : "border-[#d8dce0] hover:border-[#071a31] shadow-cal-sm hover:shadow-cal-md"
                    }`}
                  >
                    <div className="space-y-4">
                      {/* Top Header: Badge & View Specs */}
                      <div className="flex items-center justify-between gap-2">
                        <Badge variant={item.statusVariant} size="sm" dot={item.status === "Available now"}>
                          {item.status}
                        </Badge>
                        <span className="text-xs sm:text-sm font-semibold text-[#748491] group-hover:text-[#071a31] transition-colors shrink-0">
                          View Specs →
                        </span>
                      </div>

                      {/* Title & Description */}
                      <div className="space-y-2 pt-1">
                        <h3 className="text-lg sm:text-xl font-bold text-[#071a31] group-hover:text-[#006bff] transition-colors tracking-tight">
                          {item.name}
                        </h3>
                        <p className="text-sm sm:text-[15px] text-[#5f6d77] leading-[1.6]">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="pt-4 sm:pt-5 mt-5 sm:mt-6 border-t border-[#f5f5f7] flex items-center justify-between text-xs sm:text-sm text-[#748491]">
                      <span>{item.category}</span>
                      <span className="font-semibold text-[#071a31]">
                        {item.status === "Available now" ? "✓ Live in release" : "Planned module"}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          Section 4: What Works Now vs Future Development
          ========================================================================= */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white border-b border-[#e4e6e9]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <Badge variant="neutral" size="sm">
              Architecture Details
            </Badge>
            <h2 className="type-h2 font-bold text-[#071a31]">
              Current Capabilities vs. Future Roadmap
            </h2>
            <p className="type-body-md text-[#5f6d77]">
              We believe in technical honesty. Here is precisely what operates in production today and what requires upcoming development.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
            {/* Active Capabilities Panel */}
            <div className="p-6 sm:p-8 lg:p-9 rounded-[24px] bg-[#fcfbf8] border border-[#d8dce0] flex flex-col justify-between shadow-cal-sm">
              <div>
                <div className="flex items-center gap-2.5 mb-6 sm:mb-7 pb-4 border-b border-[#e4e6e9]">
                  <span className="w-3.5 h-3.5 rounded-full bg-[#10b981] shrink-0" />
                  <h3 className="text-lg sm:text-xl font-bold text-[#071a31]">
                    Available in Current Production
                  </h3>
                </div>
                <ul className="space-y-4 sm:space-y-5">
                  <li className="flex items-start gap-3 sm:gap-3.5 text-sm sm:text-[15px] lg:text-base text-[#071a31] leading-[1.6]">
                    <span className="text-[#10b981] font-bold mt-0.5 text-base shrink-0">✓</span>
                    <span><strong className="text-[#071a31] font-semibold">RFC 5545 .ics Export: </strong>Immediate calendar file generation with proper CRLF line breaks, UID tokens, and 75-octet line folding.</span>
                  </li>
                  <li className="flex items-start gap-3 sm:gap-3.5 text-sm sm:text-[15px] lg:text-base text-[#071a31] leading-[1.6]">
                    <span className="text-[#10b981] font-bold mt-0.5 text-base shrink-0">✓</span>
                    <span><strong className="text-[#071a31] font-semibold">Universal Import: </strong>Importable into Google Calendar, Microsoft Outlook, Apple Calendar, and mobile apps with one click.</span>
                  </li>
                  <li className="flex items-start gap-3 sm:gap-3.5 text-sm sm:text-[15px] lg:text-base text-[#071a31] leading-[1.6]">
                    <span className="text-[#10b981] font-bold mt-0.5 text-base shrink-0">✓</span>
                    <span><strong className="text-[#071a31] font-semibold">Timezone Preservation: </strong>Meeting instants stored in UTC and dynamically localized to host and invitee timezones.</span>
                  </li>
                  <li className="flex items-start gap-3 sm:gap-3.5 text-sm sm:text-[15px] lg:text-base text-[#071a31] leading-[1.6]">
                    <span className="text-[#10b981] font-bold mt-0.5 text-base shrink-0">✓</span>
                    <span><strong className="text-[#071a31] font-semibold">SQLite Concurrency Locking: </strong>Prevents double-booking collisions under concurrent slot reservations.</span>
                  </li>
                </ul>
              </div>
              <div className="pt-6 mt-6 border-t border-[#e4e6e9] text-xs sm:text-sm font-semibold text-[#10b981] flex items-center gap-2">
                <span>●</span>
                <span>Active and verified in current release</span>
              </div>
            </div>

            {/* Future Capabilities Panel */}
            <div className="p-6 sm:p-8 lg:p-9 rounded-[24px] bg-[#fcfbf8] border border-[#d8dce0] flex flex-col justify-between shadow-cal-sm">
              <div>
                <div className="flex items-center gap-2.5 mb-6 sm:mb-7 pb-4 border-b border-[#e4e6e9]">
                  <span className="w-3.5 h-3.5 rounded-full bg-[#94a3b8] shrink-0" />
                  <h3 className="text-lg sm:text-xl font-bold text-[#071a31]">
                    Planned Future Development
                  </h3>
                </div>
                <ul className="space-y-4 sm:space-y-5">
                  <li className="flex items-start gap-3 sm:gap-3.5 text-sm sm:text-[15px] lg:text-base text-[#5f6d77] leading-[1.6]">
                    <span className="text-[#748491] font-semibold mt-0.5 text-base shrink-0">•</span>
                    <span><strong className="text-[#071a31] font-semibold">Google &amp; Microsoft Cloud Sync: </strong>Direct bidirectional mailbox polling via Google Calendar API and Microsoft Graph.</span>
                  </li>
                  <li className="flex items-start gap-3 sm:gap-3.5 text-sm sm:text-[15px] lg:text-base text-[#5f6d77] leading-[1.6]">
                    <span className="text-[#748491] font-semibold mt-0.5 text-base shrink-0">•</span>
                    <span><strong className="text-[#071a31] font-semibold">Dynamic Video Rooms: </strong>Auto-generating unique Zoom, Google Meet, and Microsoft Teams meeting URLs on confirmation.</span>
                  </li>
                  <li className="flex items-start gap-3 sm:gap-3.5 text-sm sm:text-[15px] lg:text-base text-[#5f6d77] leading-[1.6]">
                    <span className="text-[#748491] font-semibold mt-0.5 text-base shrink-0">•</span>
                    <span><strong className="text-[#071a31] font-semibold">CRM Activity Tracking: </strong>Automatic contact and activity sync into Salesforce and HubSpot pipelines.</span>
                  </li>
                  <li className="flex items-start gap-3 sm:gap-3.5 text-sm sm:text-[15px] lg:text-base text-[#5f6d77] leading-[1.6]">
                    <span className="text-[#748491] font-semibold mt-0.5 text-base shrink-0">•</span>
                    <span><strong className="text-[#071a31] font-semibold">Zapier Automation Triggers: </strong>Dispatching webhook events to trigger thousands of third-party workflow actions.</span>
                  </li>
                </ul>
              </div>
              <div className="pt-6 mt-6 border-t border-[#e4e6e9] text-xs sm:text-sm font-semibold text-[#748491] flex items-center gap-2">
                <span>○</span>
                <span>In architectural planning &amp; development roadmap</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          Section 5: FAQs
          ========================================================================= */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#fcfbf8] border-b border-[#e4e6e9]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="type-h2 font-bold text-[#071a31]">
              Frequently Asked Questions
            </h2>
            <p className="type-body-md text-[#5f6d77]">
              Details on calendar file compatibility, data formats, and upcoming connectors.
            </p>
          </div>

          <div className="max-w-3xl mx-auto bg-white rounded-[20px] border border-[#d8dce0] shadow-cal-sm p-6 sm:p-8">
            <Accordion items={directoryFaqs} defaultOpenIndex={0} />
          </div>
        </div>
      </section>

      {/* =========================================================================
          Section 6: Final CTA
          ========================================================================= */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 mt-16 sm:mt-20">
        <div className="bg-[#071a31] text-[#fcfbf8] rounded-[24px] p-8 sm:p-12 text-center space-y-6 shadow-cal-xl">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white max-w-2xl mx-auto leading-tight">
            Test the live calendar export experience
          </h2>
          <p className="text-sm sm:text-base text-[#c1defe]/90 max-w-xl mx-auto leading-relaxed">
            Book a test appointment with our live host profile to verify how Plany's RFC 5545 calendar invitation file generates and imports.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Link href="/alex/30-min-chat" className="w-full sm:w-auto">
              <Button variant="inverse" size="lg" className="w-full sm:w-auto">
                Test Live Booking Demo
              </Button>
            </Link>
            <Link href="/integrations/calendar-export" className="w-full sm:w-auto">
              <Button variant="outline-light" size="lg" className="w-full sm:w-auto">
                Read .ics Export Details
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
