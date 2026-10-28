import type { Metadata } from "next";
import { IntegrationDetailLayout } from "@/components/integrations/IntegrationDetailLayout";

export const metadata: Metadata = {
  title: "RFC 5545 .ics Calendar Export | Plany Integrations",
  description:
    "Universal calendar invitation export. Learn how Plany generates RFC 5545-compliant .ics files with CRLF delimiters, line folding, and automatic timezone preservation.",
};

export default function CalendarExportIntegrationPage() {
  return (
    <IntegrationDetailLayout
      name="RFC 5545 .ics Calendar Export"
      category="Calendar & Scheduling"
      status="Available now"
      tagline="Universal calendar data exchange format compliant with internet standard RFC 5545."
      description="Plany generates standardized iCalendar (.ics) invitations immediately upon booking confirmation. Both hosts and invitees can import these files seamlessly into Apple Calendar, Google Calendar, Microsoft Outlook, and mobile calendar apps without needing third-party API keys."
      technicalSpecs={[
        { label: "Standard Specification", value: "RFC 5545 (Internet Calendaring)" },
        { label: "Line Ending Format", value: "CRLF (\\r\\n) Required" },
        { label: "Line Length Folding", value: "Folded at <= 75 octets" },
        { label: "Timestamp Precision", value: "Deterministic UTC (YYYYMMDDTHHmmssZ)" },
        { label: "UID Tokenization", value: "UUIDv4 / Base-36 non-sequential" },
      ]}
      currentCapabilitiesTitle="Verified active capabilities in current release"
      currentCapabilities={[
        "Automatic generation of valid VCALENDAR and VEVENT structures with PRODID and VERSION:2.0 headers.",
        "Deterministic UTC start and end timestamps (DTSTART / DTEND) ensuring zero time drift across invitee timezones.",
        "Automatic escaping of special characters including commas, semicolons, backslashes, and newlines in text fields.",
        "Strict line folding implementation (<= 75 octets) per RFC 5545 Section 3.1 to prevent parsing errors in legacy email clients.",
        "Sanitized event titles and clean filenames (e.g. 30-minute-architecture-review-2026-11-05.ics) for immediate usability.",
        "One-click browser download trigger immediately after database commit at /alex/30-min-chat.",
      ]}
      limitationsTitle="Out of scope for .ics file downloads"
      limitations={[
        "Does not provide automated two-way cloud mailbox polling (e.g. cannot automatically detect when a meeting is deleted in your external Google Calendar).",
        "Requires manual click to download or tap to import into your personal calendar application.",
        "Does not send automated server-side email notifications or SMTP invitations in the current standalone release.",
      ]}
      workflowTitle="How .ics calendar export functions"
      workflowSubtitle="From booking form submission to native calendar entry."
      workflowSteps={[
        {
          step: "01",
          title: "Invitee Submits Details",
          description: "Invitee enters their contact information and clicks Confirm on the booking page.",
          badge: "Submission",
        },
        {
          step: "02",
          title: "Atomic Database Commit",
          description: "Plany validates the slot and saves the record to SQLite with serialized write locks.",
          badge: "Persistence",
        },
        {
          step: "03",
          title: "RFC 5545 Payload Built",
          description: "The engine constructs the VCALENDAR payload in memory with UTC timestamps and folded lines.",
          badge: "Compilation",
        },
        {
          step: "04",
          title: "One-Click Browser Import",
          description: "The user clicks 'Download calendar invite (.ics)' and imports it natively into their calendar.",
          badge: "Import",
        },
      ]}
      faqItems={[
        {
          id: "ics-faq-apps",
          title: "Which calendar applications can open Plany's .ics files?",
          content:
            "Virtually all modern calendar software supports RFC 5545 .ics files, including Microsoft Outlook (Desktop, Web, Mac), Google Calendar, Apple Calendar (iOS and macOS), Mozilla Thunderbird, and native Android calendar apps.",
        },
        {
          id: "ics-faq-dst",
          title: "How does the .ics file handle daylight-saving time shifts?",
          content:
            "Plany formats all DTSTART and DTEND parameters in canonical UTC time (ending in 'Z'). When imported, your calendar application converts this universal instant into your current local clock, automatically adjusting for any daylight-saving time differences.",
        },
        {
          id: "ics-faq-two-way",
          title: "Does downloading the .ics file update my calendar if the host cancels?",
          content:
            "No. The .ics file represents a static snapshot of the confirmed booking instant. Automated cancellation updates require continuous two-way API synchronization, which is planned for future releases.",
        },
      ]}
      ctaHeadline="Experience the active .ics export in action"
      ctaDescription="Book a test slot with host Alex Morgan to generate and download an authentic RFC 5545 calendar invitation."
    />
  );
}
