import type { Metadata } from "next";
import { IntegrationDetailLayout } from "@/components/integrations/IntegrationDetailLayout";

export const metadata: Metadata = {
  title: "Microsoft Teams Integration (Planned) | Plany Integrations",
  description:
    "Planned Microsoft Teams video conferencing integration. Learn how Plany plans to generate Teams meeting links for enterprise organizations.",
};

export default function MicrosoftTeamsIntegrationPage() {
  return (
    <IntegrationDetailLayout
      name="Microsoft Teams"
      category="Video Conferencing"
      status="Planned"
      tagline="Enterprise video conferencing and dial-in coordinator for Microsoft 365 environments."
      description="Connect Microsoft Teams to automate virtual meeting room creation for every scheduled consultation, client demo, or interview without manual link copying."
      technicalSpecs={[
        { label: "Target API", value: "Microsoft Graph onlineMeetings API" },
        { label: "Platform", value: "Microsoft 365 / Microsoft Teams" },
        { label: "Current Status", value: "Planned Integration" },
        { label: "Active Alternative", value: "Static Teams meeting link in description" },
      ]}
      currentCapabilitiesTitle="What works in the current release"
      currentCapabilities={[
        "Hosts can paste an existing Microsoft Teams personal meeting URL into the event description.",
        "Meeting details and location information are stored cleanly in SQLite and embedded into the RFC 5545 .ics download.",
        "The downloaded calendar invite opens natively in Microsoft Outlook and Teams calendars.",
      ]}
      limitationsTitle="Planned capabilities (Not yet supported)"
      limitations={[
        "Does not currently call Microsoft Graph onlineMeetings endpoints to dynamically provision new conference rooms.",
        "No tenant-wide Azure application registration or admin consent workflow in this release.",
        "Toll-free PSTN dial-in numbers and audio conference PINs are not generated per booking.",
      ]}
      workflowTitle="Planned Microsoft Teams conferencing workflow"
      workflowSubtitle="How automated Teams meeting generation will operate."
      workflowSteps={[
        {
          step: "01",
          title: "Select Teams Location",
          description: "Host designates Microsoft Teams as the video conferencing provider for the event.",
          badge: "Planned",
        },
        {
          step: "02",
          title: "Invitee Books Time",
          description: "The invitee selects an available date and time slot from the host's published calendar.",
          badge: "Active",
        },
        {
          step: "03",
          title: "Online Meeting Provisioned",
          description: "Plany communicates with Microsoft Graph to generate a dedicated Teams meeting room.",
          badge: "Planned",
        },
        {
          step: "04",
          title: "Calendar Sync & Join Link",
          description: "The Teams link is attached to both parties' calendar invites with one-click 'Join' capability.",
          badge: "Planned",
        },
      ]}
      faqItems={[
        {
          id: "teams-faq-current",
          title: "Can I use Microsoft Teams with Plany today?",
          content:
            "Yes. You can paste your personal Microsoft Teams meeting link or corporate bridge into the meeting description. It will be displayed to invitees upon booking and stored inside the downloadable .ics invitation.",
        },
        {
          id: "teams-faq-desktop-app",
          title: "Will the exported calendar invite open the Teams desktop client?",
          content:
            "Yes. When you download the .ics file and open it in Microsoft Outlook, the calendar entry displays any included Teams links, enabling one-click joining through the Teams desktop or web application.",
        },
        {
          id: "teams-faq-licensing",
          title: "Will hosts need a Microsoft 365 business license to use direct Teams sync?",
          content:
            "Yes. When direct Microsoft Graph online meeting generation launches, the host account must have a Microsoft 365 subscription that includes Microsoft Teams.",
        },
      ]}
      ctaHeadline="Experience Plany's scheduling engine today"
      ctaDescription="Test how our booking calendar and .ics invitation generation function by visiting /alex/30-min-chat."
    />
  );
}
