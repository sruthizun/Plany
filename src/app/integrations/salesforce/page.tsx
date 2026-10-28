import type { Metadata } from "next";
import { IntegrationDetailLayout } from "@/components/integrations/IntegrationDetailLayout";

export const metadata: Metadata = {
  title: "Salesforce CRM Integration (Planned) | Plany Integrations",
  description:
    "Planned Salesforce CRM integration. Learn how Plany plans to create leads, match existing contacts, and log meeting activities automatically in Salesforce.",
};

export default function SalesforceIntegrationPage() {
  return (
    <IntegrationDetailLayout
      name="Salesforce CRM"
      category="CRM & Sales"
      status="Planned"
      tagline="Automatic lead creation, contact matching, and meeting activity logging in Salesforce CRM."
      description="Connect your sales scheduling pipeline directly to Salesforce. When integrated, Plany will automatically check for existing contacts, create new leads when unknown prospects book, and log completed meetings as sales activities."
      technicalSpecs={[
        { label: "Target Protocol", value: "Salesforce REST API / Composite Resources" },
        { label: "Authentication", value: "Salesforce Connected App (OAuth 2.0)" },
        { label: "Current Status", value: "Planned Integration" },
        { label: "Active Alternative", value: "Client-side and database contact record storage" },
      ]}
      currentCapabilitiesTitle="What works in the current release"
      currentCapabilities={[
        "Validated capture of invitee full name, email address, and optional meeting context notes.",
        "ACID-compliant SQLite database persistence preventing lost leads or corrupted records.",
        "Deterministic UTC timestamps preventing misreported activity dates across global sales regions.",
      ]}
      limitationsTitle="Planned capabilities (Not yet supported)"
      limitations={[
        "Does not currently connect to Salesforce instances or execute SOQL queries to check for existing Leads or Contacts.",
        "No automatic creation of Salesforce Task, Event, or Opportunity records upon booking completion.",
        "Custom field mapping (e.g. mapping intake questions to custom Salesforce Lead fields) is not yet supported.",
      ]}
      workflowTitle="Planned Salesforce CRM synchronization workflow"
      workflowSubtitle="How automated lead and activity recording will operate."
      workflowSteps={[
        {
          step: "01",
          title: "Authorize Connected App",
          description: "Salesforce admin authorizes Plany via OAuth 2.0 with standard API access permissions.",
          badge: "Planned",
        },
        {
          step: "02",
          title: "Prospect Books Demo",
          description: "A prospect visits the sales rep's booking link and selects an available demo time slot.",
          badge: "Active",
        },
        {
          step: "03",
          title: "Contact Deduplication",
          description: "Plany queries Salesforce to match the email against existing Leads, Contacts, or Accounts.",
          badge: "Planned",
        },
        {
          step: "04",
          title: "Task & Event Created",
          description: "A completed Event record is logged to the Salesforce activity timeline under the matched record.",
          badge: "Planned",
        },
      ]}
      faqItems={[
        {
          id: "sf-faq-current",
          title: "Does Plany sync with Salesforce today?",
          content:
            "No. Direct Salesforce API synchronization is an active roadmap feature. Currently, invitee details are stored in Plany's local database and can be exported or entered manually into your CRM.",
        },
        {
          id: "sf-faq-editions",
          title: "Which Salesforce editions will be supported?",
          content:
            "When launched, Plany will support Salesforce Enterprise, Unlimited, Performance, and Developer editions that have REST API access enabled.",
        },
        {
          id: "sf-faq-custom-objects",
          title: "Will Plany support mapping to custom Salesforce objects?",
          content:
            "The initial release will focus on standard objects (Leads, Contacts, Accounts, and Events), followed by support for custom object and field mapping in an enterprise update.",
        },
      ]}
      ctaHeadline="Test Plany's fast booking experience"
      ctaDescription="Experience the live scheduling engine that powers your sales pipeline at /alex/30-min-chat."
    />
  );
}
