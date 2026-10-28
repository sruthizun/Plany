import type { Metadata } from "next";
import { IntegrationDetailLayout } from "@/components/integrations/IntegrationDetailLayout";

export const metadata: Metadata = {
  title: "Google Meet Integration (Planned) | Plany Integrations",
  description:
    "Planned Google Meet video conferencing integration. Learn how Plany plans to automatically generate secure virtual meeting links upon booking confirmation.",
};

export default function GoogleMeetIntegrationPage() {
  return (
    <IntegrationDetailLayout
      name="Google Meet"
      category="Video Conferencing"
      status="Planned"
      tagline="Automatic, unique video conference link creation for every scheduled meeting."
      description="Eliminate the friction of manually creating and pasting video conference links. When integrated, Plany will automatically generate a secure Google Meet link for every confirmed appointment."
      technicalSpecs={[
        { label: "Conferencing Service", value: "Google Meet (Google Workspace)" },
        { label: "Target API", value: "Google Calendar ConferenceData API" },
        { label: "Current Status", value: "Roadmap Module" },
        { label: "Active Alternative", value: "Host static meeting links in description" },
      ]}
      currentCapabilitiesTitle="What works in the current release"
      currentCapabilities={[
        "Hosts can include a static Google Meet room link or video conferencing instructions in event description fields.",
        "Event descriptions and meeting notes are preserved accurately in the downloadable RFC 5545 .ics calendar invitation.",
        "Confirmed bookings display complete meeting details on the immediate confirmation screen.",
      ]}
      limitationsTitle="Planned capabilities (Not yet supported)"
      limitations={[
        "Does not currently generate unique Google Meet video links dynamically via API calls.",
        "No direct OAuth connection to Google Workspace conferencing services in the current standalone release.",
        "Dial-in telephone numbers and PINs are not automatically provisioned per booking.",
      ]}
      workflowTitle="Planned Google Meet conferencing workflow"
      workflowSubtitle="How automated video link attachment will function upon launch."
      workflowSteps={[
        {
          step: "01",
          title: "Select Google Meet",
          description: "Host configures Google Meet as the preferred video location for their event type.",
          badge: "Planned",
        },
        {
          step: "02",
          title: "Invitee Reserves Slot",
          description: "Invitee selects an open time on the booking calendar and fills in contact information.",
          badge: "Active",
        },
        {
          step: "03",
          title: "Dynamic Room Creation",
          description: "Plany requests a unique, secure Google Meet room URL from the Google Workspace API.",
          badge: "Planned",
        },
        {
          step: "04",
          title: "Instant Video Placement",
          description: "The Google Meet link is attached to the confirmation page and embedded in the calendar invite.",
          badge: "Planned",
        },
      ]}
      faqItems={[
        {
          id: "meet-faq-current",
          title: "Can I use Google Meet with Plany right now?",
          content:
            "Yes. You can paste your personal Google Meet room link into your event description. When an invitee books, the link is clearly displayed on their confirmation screen and included inside the downloaded .ics calendar invite.",
        },
        {
          id: "meet-faq-unique",
          title: "Why are unique meeting links helpful for scheduling?",
          content:
            "Unique meeting links prevent consecutive invitees from accidentally entering the same video room while your previous call is still running, ensuring privacy between meetings.",
        },
        {
          id: "meet-faq-accounts",
          title: "Will invitees need a Google account to join a Google Meet call?",
          content:
            "No. Invitees can join Google Meet video calls directly from any modern web browser without needing a Google Workspace account.",
        },
      ]}
      ctaHeadline="Experience frictionless scheduling with Plany"
      ctaDescription="Test how quickly invitees can choose slots and receive complete meeting information at /alex/30-min-chat."
    />
  );
}
