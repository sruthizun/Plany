import type { Metadata } from "next";
import { IntegrationDetailLayout } from "@/components/integrations/IntegrationDetailLayout";

export const metadata: Metadata = {
  title: "Slack Integration (Planned) | Plany Integrations",
  description:
    "Planned Slack integration. Learn how Plany plans to send instant booking alerts, cancellation notices, and daily schedule summaries to Slack channels.",
};

export default function SlackIntegrationPage() {
  return (
    <IntegrationDetailLayout
      name="Slack Notifications"
      category="Productivity & Collaboration"
      status="Planned"
      tagline="Real-time booking alerts, cancellation notices, and daily agendas sent directly to Slack."
      description="Keep your team and your personal workspace in sync. When integrated, Plany will dispatch instant notifications to your chosen Slack channel or direct message whenever an invitee books, reschedules, or cancels an appointment."
      technicalSpecs={[
        { label: "Target Protocol", value: "Slack Web API / Incoming Webhooks" },
        { label: "App Distribution", value: "Slack App Directory" },
        { label: "Current Status", value: "Planned Integration" },
        { label: "Active Alternative", value: "Immediate web confirmation & .ics download" },
      ]}
      currentCapabilitiesTitle="What works in the current release"
      currentCapabilities={[
        "Immediate booking confirmation displayed on screen with complete invitee name, email, time, and timezone.",
        "Verified database write-locking ensuring all confirmed appointments are stored permanently in SQLite.",
        "Downloadable RFC 5545 .ics calendar files containing all session parameters.",
      ]}
      limitationsTitle="Planned capabilities (Not yet supported)"
      limitations={[
        "Does not currently dispatch HTTP POST payloads to Slack incoming webhook URLs upon booking.",
        "No Slack App bot user or interactive message buttons (e.g. 'View in Calendar' or 'Message Invitee') in current release.",
        "Daily morning agenda digests sent to Slack are not yet implemented.",
      ]}
      workflowTitle="Planned Slack notification workflow"
      workflowSubtitle="How instant booking alerts will be posted to your workspace."
      workflowSteps={[
        {
          step: "01",
          title: "Connect Slack Channel",
          description: "Host authorizes the Plany Slack app and selects a channel (e.g. #sales-demos or #interviews).",
          badge: "Planned",
        },
        {
          step: "02",
          title: "Invitee Confirms Booking",
          description: "An invitee selects a time slot and successfully submits their contact information.",
          badge: "Active",
        },
        {
          step: "03",
          title: "Webhook Event Triggered",
          description: "Plany serializes the booking details and sends an encrypted payload to the Slack Web API.",
          badge: "Planned",
        },
        {
          step: "04",
          title: "Rich Notification Posted",
          description: "A formatted Slack message with invitee name, company, time, and timezone appears instantly.",
          badge: "Planned",
        },
      ]}
      faqItems={[
        {
          id: "slack-faq-current",
          title: "Can I receive Slack alerts for Plany bookings today?",
          content:
            "Not automatically in the current release. Today, bookings are confirmed immediately on screen and saved to the database. Automated Slack webhook dispatchers are on our upcoming product roadmap.",
        },
        {
          id: "slack-faq-dm",
          title: "Can I receive alerts via direct message instead of a public channel?",
          content:
            "Yes. When the integration launches, you will be able to choose between sending notifications to a shared public channel, a private channel, or as a direct message from the Plany bot.",
        },
        {
          id: "slack-faq-reschedule",
          title: "Will the Slack alert notify me if an appointment is rescheduled?",
          content:
            "Yes. The planned Slack connector will send notifications for new bookings, rescheduled appointments, and cancellations.",
        },
      ]}
      ctaHeadline="Experience Plany's live scheduling flow"
      ctaDescription="Test how fast invitees can reserve time on our live host profile at /alex/30-min-chat."
    />
  );
}
