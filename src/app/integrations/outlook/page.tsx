import type { Metadata } from "next";
import { IntegrationDetailLayout } from "@/components/integrations/IntegrationDetailLayout";

export const metadata: Metadata = {
  title: "Microsoft Outlook & Office 365 Integration (Planned) | Plany Integrations",
  description:
    "Planned Microsoft Outlook and Exchange 365 calendar synchronization. Learn how Plany plans to connect with Microsoft Graph API.",
};

export default function OutlookIntegrationPage() {
  return (
    <IntegrationDetailLayout
      name="Microsoft Outlook & Office 365"
      category="Calendar & Scheduling"
      status="Planned"
      tagline="Seamless enterprise calendar integration for Microsoft 365, Exchange Online, and Outlook."
      description="Connect your corporate or personal Microsoft Outlook calendar to eliminate scheduling conflicts across enterprise organizations and automatically push booked meetings to your Exchange mailbox."
      technicalSpecs={[
        { label: "Target Protocol", value: "Microsoft Graph REST API v1.0" },
        { label: "Identity Provider", value: "Microsoft Entra ID (Azure AD)" },
        { label: "Current Status", value: "Under Architectural Research" },
        { label: "Active Alternative", value: "RFC 5545 .ics download supported natively" },
      ]}
      currentCapabilitiesTitle="What works in the current release"
      currentCapabilities={[
        "Generate RFC 5545-compliant .ics files with CRLF delimiters that import natively into Outlook Web, Outlook Desktop, and Outlook for Mac.",
        "Automatic line folding ensuring that meeting details, host names, and descriptions render cleanly without corruption in Microsoft email clients.",
        "Accurate UTC instant calculations matching Microsoft 365 organization timezone configurations.",
      ]}
      limitationsTitle="Planned capabilities (Not yet supported)"
      limitations={[
        "No direct Azure AD or Microsoft Graph API OAuth connection in the current release.",
        "Does not poll Exchange mailboxes to automatically mark host working hours as busy.",
        "Confirmed bookings are not automatically written to Microsoft 365 mailboxes via cloud APIs.",
        "Account connection buttons are disabled until Azure application registration and tenant consent flows are released.",
      ]}
      workflowTitle="Planned Outlook synchronization workflow"
      workflowSubtitle="How Microsoft Graph synchronization will operate once enabled."
      workflowSteps={[
        {
          step: "01",
          title: "Microsoft 365 Sign-In",
          description: "Host authenticates using their Microsoft 365 or personal Microsoft account credentials.",
          badge: "Planned",
        },
        {
          step: "02",
          title: "Exchange Calendar Check",
          description: "Plany queries the host's Exchange calendar schedule to calculate genuine real-time availability.",
          badge: "Planned",
        },
        {
          step: "03",
          title: "Conflict-Free Selection",
          description: "The invitee picks an open slot verified against both Plany rules and Exchange appointments.",
          badge: "Active",
        },
        {
          step: "04",
          title: "Direct Event Insertion",
          description: "Plany creates the event directly in the host's Outlook calendar using the Microsoft Graph API.",
          badge: "Planned",
        },
      ]}
      faqItems={[
        {
          id: "outlook-faq-current",
          title: "Can I add Plany bookings to Microsoft Outlook today?",
          content:
            "Yes! You can immediately import any confirmed booking into Microsoft Outlook by clicking 'Download calendar invite (.ics)'. Outlook recognizes the RFC 5545 format and opens the appointment prefilled with title, host, and time.",
        },
        {
          id: "outlook-faq-enterprise",
          title: "Will Plany support corporate Microsoft 365 tenant administrator consent?",
          content:
            "Yes. When the Microsoft 365 integration launches, we will support both individual user consent and tenant-wide administrator consent for enterprise rollouts.",
        },
        {
          id: "outlook-faq-exchange-onprem",
          title: "Will on-premises Exchange servers be supported?",
          content:
            "The initial planned connector targets Exchange Online (cloud-hosted Microsoft 365). Hybrid and on-premises Exchange server support is under architectural evaluation.",
        },
      ]}
      ctaHeadline="Try our booking flow with Outlook-ready .ics export"
      ctaDescription="Test how cleanly Plany generates RFC 5545 calendar invitations that open directly in Microsoft Outlook."
    />
  );
}
