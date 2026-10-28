import type { Metadata } from "next";
import { SolutionsPageLayout } from "@/components/solutions/SolutionsPageLayout";

export const metadata: Metadata = {
  title: "Sales & RevOps Solutions | Plany",
  description:
    "Accelerate sales pipeline by removing demo scheduling friction. Empower sales reps and RevOps with reliable, conflict-free booking links.",
};

export default function SalesRevOpsSolutionsPage() {
  return (
    <SolutionsPageLayout
      audienceName="Sales & RevOps"
      badgeText="Sales Speed-to-Lead"
      headline="Accelerate sales pipeline by eliminating scheduling friction."
      description="Turn interested prospects into confirmed product demos in seconds. Equip account executives and SDRs with personal booking links that automatically convert timezones and prevent double-booked sales calls."
      heroMockup={{
        eventTitle: "Product Demo & Solution Walkthrough",
        hostName: "Alex Morgan",
        duration: "30 Min",
        highlights: [
          { label: "Target Prospect", value: "Instant self-serve booking link" },
          { label: "Global Territories", value: "Automatic IANA timezone conversion" },
          { label: "Meeting Cushion", value: "10-minute prep buffer between calls" },
          { label: "Conflict Guarantee", value: "Zero double-booked demo slots" },
        ],
        securityNote: "Eliminates back-and-forth emails to lock in sales demos while leads are warm",
      }}
      useCasesTitle="High-converting sales scheduling scenarios"
      useCasesSubtitle="Keep prospects engaged and moving quickly through your sales cycle."
      useCases={[
        {
          title: "Inbound Prospect Demos",
          description:
            "Include your personal booking link on landing pages or follow-up emails so warm inbound prospects book instantly instead of waiting days for an email reply.",
          badge: "Lead Conversion",
        },
        {
          title: "Outbound Sales Sequences",
          description:
            "Embed direct booking links in SDR cadences and cold outreach campaigns to provide interested buyers with an effortless, one-click scheduling option.",
          badge: "Outreach",
        },
        {
          title: "Contract & Proposal Reviews",
          description:
            "Account executives can rapidly schedule commercial reviews and legal walkthroughs with multiple stakeholders across different global timezones.",
          badge: "Closing",
        },
      ]}
      workflowTitle="The sales rep scheduling workflow"
      workflowSubtitle="From outreach sequence to locked-in product demo."
      workflowSteps={[
        {
          step: "01",
          title: "Insert Link in Outreach",
          description:
            "Add your personal link (e.g. /alex/30-min-chat) into your sales email template, LinkedIn message, or proposal deck.",
          badge: "Touchpoint",
        },
        {
          step: "02",
          title: "Prospect Views Open Slots",
          description:
            "The prospective buyer views your real-time calendar availability automatically converted into their local timezone.",
          badge: "Selection",
        },
        {
          step: "03",
          title: "Contact Details Captured",
          description:
            "The buyer enters their name, email, and meeting notes, which are verified via strict client and server validation.",
          badge: "Intake",
        },
        {
          step: "04",
          title: "Instant Calendar Placement",
          description:
            "The demo commits to the database with atomic concurrency protection, providing an immediate .ics download for their calendar.",
          badge: "Confirmed",
        },
      ]}
      activeFeatures={[
        {
          title: "Zero Double-Booking Risk",
          description: "Database-level serialized write locking prevents two prospects from simultaneously claiming the same demo slot.",
          tag: "Active",
        },
        {
          title: "Global Timezone Translation",
          description: "Prospects across EMEA, APAC, and Americas see your exact availability converted dynamically to their local clock.",
          tag: "Active",
        },
        {
          title: "Smart Meeting Buffers",
          description: "Configurable buffer times give sales reps breathing room to review CRM notes before calls and log action items after.",
          tag: "Active",
        },
        {
          title: "Universal .ics Invitation",
          description: "Standards-compliant RFC 5545 iCalendar files import cleanly into Google Calendar, Microsoft Outlook, and Apple Calendar.",
          tag: "Active",
        },
      ]}
      limitationsTitle="Sales & RevOps scope & roadmap"
      limitationsSubtitle="Clear transparency on current capabilities versus planned sales team features."
      activeStatusSummary="Plany currently supports individual sales rep booking links with database concurrency protection and RFC 5545 .ics calendar files. Automated team round-robin routing and bidirectional CRM sync are on our product roadmap."
      roadmapItems={[
        {
          title: "Round-Robin Lead Distribution",
          status: "Planned",
          description: "Automatically route inbound leads evenly across account executives or SDRs based on territory and availability rules.",
        },
        {
          title: "Bidirectional Salesforce & HubSpot Sync",
          status: "Planned",
          description: "Automatically create or update leads, contacts, and opportunities in your CRM when a meeting is booked.",
        },
        {
          title: "Lead Qualification Routing Forms",
          status: "Roadmap",
          description: "Ask qualification questions upfront (such as company size) and route prospects to the appropriate rep tier.",
        },
        {
          title: "Automated Rescheduling & No-Show Workflows",
          status: "Roadmap",
          description: "Self-serve rescheduling links sent to prospects when a meeting needs to be moved, keeping pipeline active.",
        },
      ]}
      faqItems={[
        {
          id: "sales-faq-round-robin",
          title: "Does Plany currently support round-robin meeting distribution?",
          content:
            "Not in the current release. Round-robin pooling across multiple sales reps is an active roadmap feature. Today, each sales representative has their own dedicated personal booking link.",
        },
        {
          id: "sales-faq-crm-sync",
          title: "Does Plany sync directly with Salesforce or HubSpot?",
          content:
            "Direct bidirectional CRM synchronization is planned for a future update. Currently, invitees provide their name, email, and meeting notes, which are stored in the database and can be exported or referenced directly.",
        },
        {
          id: "sales-faq-concurrency",
          title: "What happens if two hot leads attempt to book the same slot simultaneously?",
          content:
            "Plany's database engine uses atomic write locking. Only the first transaction commits (201 Created), while the second receives an immediate HTTP 409 conflict message and can pick another open slot, guaranteeing reps are never double-booked.",
        },
        {
          id: "sales-faq-timezones",
          title: "Can I sell across different continents without timezone confusion?",
          content:
            "Yes. Plany auto-detects the buyer's local timezone and dynamically converts your working hours. The underlying meeting instant is preserved in UTC, eliminating daylight-saving or midnight-crossing mistakes.",
        },
      ]}
      ctaHeadline="Speed up your sales cycle with frictionless booking"
      ctaDescription="Test how quickly prospects can book a demo with our live host profile Alex Morgan at /alex/30-min-chat."
    />
  );
}
