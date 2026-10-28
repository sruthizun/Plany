import type { Metadata } from "next";
import { IntegrationDetailLayout } from "@/components/integrations/IntegrationDetailLayout";

export const metadata: Metadata = {
  title: "HubSpot CRM Integration (Planned) | Plany Integrations",
  description:
    "Planned HubSpot CRM integration. Learn how Plany plans to sync contacts, track marketing attribution, and log meeting activities directly into HubSpot.",
};

export default function HubSpotIntegrationPage() {
  return (
    <IntegrationDetailLayout
      name="HubSpot CRM"
      category="CRM & Sales"
      status="Planned"
      tagline="Seamless contact creation, activity tracking, and deal timeline synchronization in HubSpot."
      description="Connect your marketing and sales funnels directly to HubSpot CRM. When integrated, Plany will automatically create or update HubSpot contacts whenever an invitee books a meeting, logging the appointment directly onto their engagement timeline."
      technicalSpecs={[
        { label: "Target Protocol", value: "HubSpot CRM v3 API" },
        { label: "App Distribution", value: "HubSpot App Marketplace" },
        { label: "Current Status", value: "Planned Integration" },
        { label: "Active Alternative", value: "Local SQLite persistence & client validation" },
      ]}
      currentCapabilitiesTitle="What works in the current release"
      currentCapabilities={[
        "Captures invitee name, email, and meeting notes with client and server input validation.",
        "ACID SQLite persistence with atomic concurrency protection ensuring zero duplicate booking attempts.",
        "Generates universal RFC 5545 .ics invitations compatible with all major email and calendar clients.",
      ]}
      limitationsTitle="Planned capabilities (Not yet supported)"
      limitations={[
        "Does not currently call HubSpot's /crm/v3/objects/contacts API to synchronize records.",
        "No automatic creation of HubSpot Meeting engagements on contact timelines.",
        "UTM parameters and marketing attribution tracking (e.g. tracking ad source) are not yet forwarded to HubSpot.",
      ]}
      workflowTitle="Planned HubSpot CRM synchronization workflow"
      workflowSubtitle="How contact creation and timeline updates will operate."
      workflowSteps={[
        {
          step: "01",
          title: "Connect HubSpot Portal",
          description: "Host connects their HubSpot portal using standard OAuth 2.0 app authorization.",
          badge: "Planned",
        },
        {
          step: "02",
          title: "Lead Books Appointment",
          description: "A lead selects an open time slot on the host's booking link and provides their contact details.",
          badge: "Active",
        },
        {
          step: "03",
          title: "Contact Created or Updated",
          description: "Plany queries HubSpot by email; if found, updates the record; if new, creates a new contact.",
          badge: "Planned",
        },
        {
          step: "04",
          title: "Meeting Logged to Timeline",
          description: "A scheduled meeting engagement is added to the contact's activity feed with complete meeting details.",
          badge: "Planned",
        },
      ]}
      faqItems={[
        {
          id: "hubspot-faq-current",
          title: "Can I connect HubSpot to Plany today?",
          content:
            "Not in the current release. Direct HubSpot API connectivity is on our product roadmap. Today, customer data is captured and stored locally in Plany's database upon booking confirmation.",
        },
        {
          id: "hubspot-faq-free-tier",
          title: "Will the integration work with free HubSpot CRM accounts?",
          content:
            "Yes! The planned connector will support all HubSpot subscription tiers, including HubSpot Free CRM, Starter, Professional, and Enterprise.",
        },
        {
          id: "hubspot-faq-forms",
          title: "Can I map Plany booking fields to custom HubSpot contact properties?",
          content:
            "Yes. When the integration is released, hosts will be able to map Plany intake fields directly to standard and custom HubSpot contact properties.",
        },
      ]}
      ctaHeadline="Experience Plany's smooth booking flow"
      ctaDescription="Test how invitees interact with our scheduling engine at /alex/30-min-chat."
    />
  );
}
