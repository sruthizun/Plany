import type { Metadata } from "next";
import { IntegrationDetailLayout } from "@/components/integrations/IntegrationDetailLayout";

export const metadata: Metadata = {
  title: "Google Calendar Integration (Planned) | Plany Integrations",
  description:
    "Planned bidirectional Google Calendar integration. Learn how Plany plans to sync busy slots and push bookings directly to Google Calendar.",
};

export default function GoogleCalendarIntegrationPage() {
  return (
    <IntegrationDetailLayout
      name="Google Calendar"
      category="Calendar & Scheduling"
      status="Planned"
      tagline="Continuous bidirectional synchronization with Google Workspace and personal Google accounts."
      description="Connect your Google Calendar to prevent scheduling conflicts with personal events and automatically push confirmed bookings into your Google calendar without manual file downloads."
      technicalSpecs={[
        { label: "Target Protocol", value: "Google Calendar API v3 / REST" },
        { label: "Authorization Scope", value: "OAuth 2.0 (calendar.events.freebusy)" },
        { label: "Current Status", value: "Architectural Planning & API Design" },
        { label: "Current Workaround", value: "One-click RFC 5545 .ics file import" },
      ]}
      currentCapabilitiesTitle="What works in the current release"
      currentCapabilities={[
        "Generate RFC 5545 .ics calendar files that import directly into any Google Calendar account via browser or mobile app.",
        "Accurate UTC instant conversion that automatically matches Google Calendar's timezone display.",
        "Conflict prevention across all bookings placed within the Plany database engine.",
      ]}
      limitationsTitle="Planned capabilities (Not yet supported)"
      limitations={[
        "No direct Google OAuth 2.0 login or token exchange in current standalone release.",
        "Does not poll your personal Google Calendar to automatically block doctor appointments or external personal events.",
        "Confirmed bookings are not automatically pushed via background API calls to Google servers.",
        "Account connection buttons are disabled until Google verification and production API scopes are published.",
      ]}
      workflowTitle="Planned Google Calendar sync workflow"
      workflowSubtitle="How bidirectional synchronization will operate once released."
      workflowSteps={[
        {
          step: "01",
          title: "OAuth Authorization",
          description: "Host authorizes Plany with Google Calendar read/write access via standard Google consent.",
          badge: "Planned",
        },
        {
          step: "02",
          title: "FreeBusy Query",
          description: "Plany queries Google's FreeBusy API to exclude personal conflicts from available booking slots.",
          badge: "Planned",
        },
        {
          step: "03",
          title: "Invitee Books Time",
          description: "Invitee selects an open slot that is guaranteed conflict-free with both Plany and Google Calendar.",
          badge: "Active",
        },
        {
          step: "04",
          title: "Direct Event Creation",
          description: "Plany pushes the confirmed appointment directly to the host's primary Google Calendar via API.",
          badge: "Planned",
        },
      ]}
      faqItems={[
        {
          id: "gcal-faq-current",
          title: "Can I use Google Calendar with Plany today?",
          content:
            "Yes! While automated two-way cloud API synchronization is in development, you can immediately add any Plany booking to Google Calendar using the 'Download calendar invite (.ics)' button on the confirmation page.",
        },
        {
          id: "gcal-faq-oauth",
          title: "Can I connect my Google account today?",
          content:
            "No. Direct Google OAuth connection is intentionally disabled in this release to prevent confusion, as the cloud API connector is currently in architectural design.",
        },
        {
          id: "gcal-faq-multi-cal",
          title: "Will Plany support checking multiple Google Calendars for conflicts?",
          content:
            "Yes. When the direct integration launches, hosts will be able to select multiple Google secondary calendars (such as personal, family, or side-project calendars) to check for conflicting busy blocks.",
        },
      ]}
      ctaHeadline="Try the live booking demo with .ics Google import"
      ctaDescription="Experience how easy it is to book a slot and import the resulting RFC 5545 invitation into your Google Calendar."
    />
  );
}
