import type { Metadata } from "next";
import { IntegrationDetailLayout } from "@/components/integrations/IntegrationDetailLayout";

export const metadata: Metadata = {
  title: "Zoom Integration (Planned) | Plany Integrations",
  description:
    "Planned Zoom video conferencing integration. Learn how Plany plans to generate unique Zoom meeting rooms, passcodes, and waiting room security.",
};

export default function ZoomIntegrationPage() {
  return (
    <IntegrationDetailLayout
      name="Zoom Video Conferencing"
      category="Video Conferencing"
      status="Planned"
      tagline="Dynamic Zoom meeting creation with unique meeting IDs, passcodes, and waiting room security."
      description="Connect your Zoom account to automatically generate unique, secure video meeting rooms for every scheduled call. Prevent meeting overlap and ensure invitee privacy effortlessly."
      technicalSpecs={[
        { label: "Target Protocol", value: "Zoom REST API v2" },
        { label: "Authentication Method", value: "Zoom OAuth 2.0 / Server-to-Server" },
        { label: "Current Status", value: "Planned Integration" },
        { label: "Active Alternative", value: "Static Zoom Personal Meeting ID (PMI)" },
      ]}
      currentCapabilitiesTitle="What works in the current release"
      currentCapabilities={[
        "Hosts can paste their Zoom Personal Meeting Link (PMI) or custom vanity URL into the event description.",
        "The Zoom link and dial-in details are saved with the appointment and rendered on the confirmed booking screen.",
        "The downloadable RFC 5545 .ics calendar invitation embeds the Zoom link directly into the event location and notes.",
      ]}
      limitationsTitle="Planned capabilities (Not yet supported)"
      limitations={[
        "Does not currently generate randomized Zoom meeting IDs and unique passcodes per booking via Zoom API calls.",
        "No direct Zoom App Marketplace OAuth connection in this standalone release.",
        "Does not configure host video settings, waiting room toggles, or cloud recording automatically.",
      ]}
      workflowTitle="Planned Zoom conferencing workflow"
      workflowSubtitle="How dynamic Zoom room generation will operate."
      workflowSteps={[
        {
          step: "01",
          title: "Authorize Zoom Account",
          description: "Host authorizes Plany via Zoom App Marketplace with meeting creation permissions.",
          badge: "Planned",
        },
        {
          step: "02",
          title: "Invitee Chooses Slot",
          description: "Invitee picks an open time that aligns with the host's configured working hours.",
          badge: "Active",
        },
        {
          step: "03",
          title: "Zoom API Dispatch",
          description: "Plany calls Zoom's /users/me/meetings endpoint to create a unique meeting with passcode.",
          badge: "Planned",
        },
        {
          step: "04",
          title: "Confirmation & Calendar File",
          description: "The Zoom join URL is attached to the confirmed booking screen and .ics calendar invite.",
          badge: "Planned",
        },
      ]}
      faqItems={[
        {
          id: "zoom-faq-current",
          title: "Can I use Zoom with Plany today?",
          content:
            "Yes! You can paste your Zoom meeting link into your event description. When an invitee completes a booking, the Zoom link is displayed clearly on the confirmation screen and included in the downloaded .ics calendar invite.",
        },
        {
          id: "zoom-faq-pmi-vs-unique",
          title: "What is the difference between static PMI and dynamic meeting links?",
          content:
            "A Personal Meeting ID (PMI) is a permanent link that stays the same for all calls. Dynamic meeting links generate a brand new meeting ID and passcode for every single booking, preventing back-to-back participants from entering early.",
        },
        {
          id: "zoom-faq-free-tier",
          title: "Will free Zoom accounts be supported when the integration launches?",
          content:
            "Yes. Both free and paid Zoom accounts will be supported, subject to Zoom's standard meeting duration limits (such as the 40-minute limit on free group calls).",
        },
      ]}
      ctaHeadline="Try Plany's live scheduling flow today"
      ctaDescription="Test how our booking calendar and .ics invitation generation function by visiting /alex/30-min-chat."
    />
  );
}
