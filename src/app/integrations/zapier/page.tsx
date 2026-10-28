import type { Metadata } from "next";
import { IntegrationDetailLayout } from "@/components/integrations/IntegrationDetailLayout";

export const metadata: Metadata = {
  title: "Zapier Integration (In Planning) | Plany Integrations",
  description:
    "Zapier integration in planning. Learn how Plany plans to connect with 5,000+ web applications through event triggers and actions.",
};

export default function ZapierIntegrationPage() {
  return (
    <IntegrationDetailLayout
      name="Zapier Automation"
      category="Automation & Developer Tools"
      status="In planning"
      statusVariant="warning"
      tagline="Connect Plany booking events to over 5,000+ business applications via automated Zaps."
      description="Supercharge your scheduling workflow with automated triggers. In planning: Plany will emit webhook events whenever a booking is created or cancelled, enabling you to trigger automated actions across spreadsheets, databases, email marketing platforms, and CRMs."
      technicalSpecs={[
        { label: "Platform", value: "Zapier Developer Platform" },
        { label: "Trigger Architecture", value: "REST Webhooks (REST Hooks)" },
        { label: "Current Status", value: "In Planning (Early Design)" },
        { label: "Active Alternative", value: "Verified SQLite database event storage" },
      ]}
      currentCapabilitiesTitle="What works in the current release"
      currentCapabilities={[
        "Validated capture of all booking parameters: invitee name, email, start time, end time, duration, and notes.",
        "Deterministic SQLite storage with atomic locking, ensuring every confirmed booking is persisted reliably.",
        "Universal RFC 5545 .ics calendar export importable into all major calendar and productivity apps.",
      ]}
      limitationsTitle="Planned capabilities (In planning)"
      limitations={[
        "Does not currently emit outgoing HTTP webhook requests to Zapier catch hook endpoints.",
        "No official Plany Zapier app is currently published in the Zapier App Directory.",
        "Zapier triggers (such as 'New Booking Created') and actions (such as 'Create Booking Slot') are in architectural planning.",
      ]}
      workflowTitle="Planned Zapier automation workflow"
      workflowSubtitle="How automated triggers and actions will operate once developed."
      workflowSteps={[
        {
          step: "01",
          title: "Build Zapier Trigger",
          description: "User creates a Zap choosing 'Plany' as the trigger app and 'New Invitee Booking' as the event.",
          badge: "In Planning",
        },
        {
          step: "02",
          title: "Invitee Confirms",
          description: "An invitee selects a slot on Plany and successfully submits the booking form.",
          badge: "Active",
        },
        {
          step: "03",
          title: "Webhook Dispatched",
          description: "Plany dispatches a structured JSON payload to Zapier containing all appointment metadata.",
          badge: "In Planning",
        },
        {
          step: "04",
          title: "Multi-App Action",
          description: "Zapier routes data to downstream apps: adds row to Google Sheets, sends email in Mailchimp, etc.",
          badge: "In Planning",
        },
      ]}
      faqItems={[
        {
          id: "zapier-faq-current",
          title: "Can I connect Plany to Zapier today?",
          content:
            "Not in the current release. The Zapier integration is currently in early planning and architectural design. Today, all bookings are committed to the local SQLite database and exported via .ics calendar files.",
        },
        {
          id: "zapier-faq-triggers",
          title: "What triggers will be supported when Plany's Zapier app launches?",
          content:
            "We plan to support three core triggers: 'New Booking Created', 'Booking Rescheduled', and 'Booking Cancelled'.",
        },
        {
          id: "zapier-faq-custom-webhooks",
          title: "Will Plany offer direct webhooks without requiring Zapier?",
          content:
            "Yes! Along with our official Zapier app, we plan to provide direct developer webhooks so teams can receive HTTP POST events directly in their own custom backends and microservices.",
        },
      ]}
      ctaHeadline="Test Plany's core booking engine today"
      ctaDescription="Experience how our booking calendar and .ics invitation generation function by visiting /alex/30-min-chat."
    />
  );
}
