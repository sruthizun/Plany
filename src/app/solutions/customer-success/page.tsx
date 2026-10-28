import type { Metadata } from "next";
import { SolutionsPageLayout } from "@/components/solutions/SolutionsPageLayout";

export const metadata: Metadata = {
  title: "Customer Success Solutions | Plany",
  description:
    "Deliver proactive customer engagement, streamline onboarding walkthroughs, and coordinate quarterly business reviews without scheduling friction.",
};

export default function CustomerSuccessSolutionsPage() {
  return (
    <SolutionsPageLayout
      audienceName="Customer Success"
      badgeText="Customer Retention"
      headline="Deliver high-touch customer engagement without the email hassle."
      description="Keep customers engaged, supported, and renewing. Empower customer success managers and implementation specialists with frictionless booking links for onboarding sessions, quarterly business reviews, and check-ins."
      heroMockup={{
        eventTitle: "Customer Onboarding & Architecture Review",
        hostName: "Alex Morgan",
        duration: "45 Min",
        highlights: [
          { label: "Account Stage", value: "New customer platform onboarding" },
          { label: "Customer Local Time", value: "Auto-converted with zero confusion" },
          { label: "Breathing Room", value: "15 min buffer to finalize implementation notes" },
          { label: "Meeting Placement", value: "RFC 5545 calendar invite download" },
        ],
        securityNote: "Customers schedule at their convenience within your approved working hours",
      }}
      useCasesTitle="Customer success & retention scenarios"
      useCasesSubtitle="How CS teams use Plany to maintain proactive touchpoints."
      useCases={[
        {
          title: "New Customer Onboarding Kickoffs",
          description:
            "Include your personal booking link in the automated welcome email so new accounts can immediately book their implementation kickoff meeting.",
          badge: "Onboarding",
        },
        {
          title: "Quarterly Business Reviews (QBRs)",
          description:
            "Coordinate executive reviews with client stakeholders across timezones without weeks of scheduling emails or overlapping commitments.",
          badge: "Executive Reviews",
        },
        {
          title: "Technical Support Escalations",
          description:
            "Provide key accounts with dedicated support consultation slots to resolve technical blockers quickly while protecting CSM deep-work hours.",
          badge: "Support",
        },
      ]}
      workflowTitle="The customer success meeting workflow"
      workflowSubtitle="From onboarding invitation to verified calendar placement."
      workflowSteps={[
        {
          step: "01",
          title: "Provide Booking URL",
          description:
            "Share your personal link (e.g. /alex/30-min-chat) in customer welcome emails, onboarding checklists, or email signatures.",
          badge: "Invitation",
        },
        {
          step: "02",
          title: "Customer Selects Time",
          description:
            "Customers browse live openings calculated strictly from your working hours and converted to their local timezone.",
          badge: "Self-Serve",
        },
        {
          step: "03",
          title: "Collect Discussion Agenda",
          description:
            "Customers enter their contact information and describe key agenda topics or platform questions they wish to cover.",
          badge: "Context",
        },
        {
          step: "04",
          title: "Calendar Lock-In",
          description:
            "Plany verifies slot availability with database write locks, confirms the session, and generates an instant .ics invitation.",
          badge: "Confirmed",
        },
      ]}
      activeFeatures={[
        {
          title: "Protected Working Hours",
          description: "Strict schedule enforcement guarantees customers can only book when you are actively on duty.",
          tag: "Active",
        },
        {
          title: "Pre/Post Meeting Buffers",
          description: "15-minute buffers ensure you can review account history before meetings and document customer action items after.",
          tag: "Active",
        },
        {
          title: "Zero Double-Booking",
          description: "Atomic database locking guarantees multiple customer booking requests cannot collide on the same time slot.",
          tag: "Active",
        },
        {
          title: "Universal .ics Invitation",
          description: "Standards-compliant calendar invitations import directly into Microsoft Outlook, Google Calendar, and Apple Calendar.",
          tag: "Active",
        },
      ]}
      limitationsTitle="Customer success scope & roadmap"
      limitationsSubtitle="Transparent details on active capabilities versus planned team features."
      activeStatusSummary="Plany currently offers individual CSM scheduling links with input validation, database concurrency protection, and downloadable .ics calendar files. Shared team inboxes and CRM integrations are planned for future updates."
      roadmapItems={[
        {
          title: "Shared Team CS Inboxes",
          status: "Planned",
          description: "Allow accounts to book with any available CSM on the account pod or implementation team.",
        },
        {
          title: "Zendesk & Gainsight Integration",
          status: "Planned",
          description: "Automatically log completed meetings, customer feedback, and attendance directly to your customer success platform.",
        },
        {
          title: "Automated Post-Meeting Surveys",
          status: "Roadmap",
          description: "Trigger automated CSAT or NPS follow-up surveys to customers after an onboarding session is completed.",
        },
        {
          title: "Direct Two-Way Cloud Calendar Sync",
          status: "Roadmap",
          description: "Bidirectional synchronization with Microsoft 365 and Google Workspace to reflect calendar updates automatically.",
        },
      ]}
      faqItems={[
        {
          id: "cs-faq-team-links",
          title: "Can multiple CSMs share a single collective booking link today?",
          content:
            "Not in the current release. Pooled team scheduling is on our product roadmap. Currently, each CSM maintains their own dedicated booking link.",
        },
        {
          id: "cs-faq-calendar-types",
          title: "Can enterprise clients using Microsoft 365 easily add meetings?",
          content:
            "Yes. Plany produces RFC 5545-compliant .ics files with CRLF line delimiters and line folding, ensuring smooth one-click import into Microsoft 365, Outlook, and Google Calendar.",
        },
        {
          id: "cs-faq-timezones",
          title: "How does Plany handle customers across international offices?",
          content:
            "Plany auto-detects the customer's browser timezone and displays all available slots in their local clock. Day shifts caused by midnight boundary crossings are handled accurately without day offsets.",
        },
        {
          id: "cs-faq-concurrency",
          title: "Will Plany prevent back-to-back meeting fatigue?",
          content:
            "Yes. You can configure buffer times before and after appointments (e.g. 10 or 15 minutes). The scheduling engine automatically excludes overlapping buffer windows from customer view.",
        },
      ]}
      ctaHeadline="Deliver effortless scheduling to your customers"
      ctaDescription="Test how easy it is for customers to book onboarding sessions by trying our live demo at /alex/30-min-chat."
    />
  );
}
