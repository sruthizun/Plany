import type { Metadata } from "next";
import { SolutionsPageLayout } from "@/components/solutions/SolutionsPageLayout";

export const metadata: Metadata = {
  title: "Enterprise Solutions | Plany",
  description:
    "Explore Plany for enterprise teams: robust SQLite database-level write locking, cross-timezone scheduling, and downloadable calendar invitations.",
};

export default function EnterpriseSolutionsPage() {
  return (
    <SolutionsPageLayout
      audienceName="Enterprise"
      badgeText="Enterprise Reliability"
      headline="Reliable, conflict-free scheduling for enterprise professionals."
      description="Equip executive leaders, consultants, and technical teams with deterministic scheduling. Eliminate double-bookings using SQLite atomic transactions, manage global timezones automatically, and export verified calendar invites."
      heroMockup={{
        eventTitle: "Executive Briefing & Architecture Review",
        hostName: "Alex Morgan",
        duration: "45 Min",
        highlights: [
          { label: "Host Availability", value: "Mon–Fri, 9:00 AM – 5:00 PM EST" },
          { label: "Timezone Resolution", value: "Exact UTC instant mapped to invitee local time" },
          { label: "Buffer Window", value: "15 min pre/post meeting breathing room" },
          { label: "Concurrency Protection", value: "ACID serialized database write-locking" },
        ],
        securityNote: "Isolated SQLite write locks ensure zero slot collision across concurrent sessions",
      }}
      useCasesTitle="Enterprise scheduling scenarios"
      useCasesSubtitle="How enterprise teams leverage Plany for high-stakes coordination."
      useCases={[
        {
          title: "Executive & Partner Briefings",
          description:
            "Provide VIP clients, board members, and external enterprise partners with a frictionless, distraction-free booking interface that respects executive focus hours.",
          badge: "Leadership",
        },
        {
          title: "Cross-Continental Project Alignment",
          description:
            "Coordinate complex initiatives across Americas, EMEA, and APAC. Plany calculates accurate daylight-saving shifts and eliminates midnight crossing miscalculations.",
          badge: "Global Teams",
        },
        {
          title: "Consulting & Technical Audits",
          description:
            "Architects and consultants can publish dedicated consultation slots with configured buffer times to ensure adequate preparation and review between sessions.",
          badge: "Consulting",
        },
      ]}
      workflowTitle="How enterprise scheduling works with Plany"
      workflowSubtitle="From personal link distribution to calendar placement."
      workflowSteps={[
        {
          step: "01",
          title: "Publish Dedicated Link",
          description:
            "Each team member maintains a unique URL (e.g. /alex/30-min-chat) configured with working hours and mandatory buffer windows.",
          badge: "Configuration",
        },
        {
          step: "02",
          title: "Invitee Timezone Detection",
          description:
            "When the enterprise client opens the link, Plany auto-detects their browser timezone and translates all available slots in real time.",
          badge: "Discovery",
        },
        {
          step: "03",
          title: "Serialized Transaction Commit",
          description:
            "Upon submission, Plany acquires a database write lock, validates duration and working hours, and confirms the reservation without double-booking.",
          badge: "Validation",
        },
        {
          step: "04",
          title: "RFC 5545 .ics Export",
          description:
            "Invitee and host receive instant booking confirmations with a downloadable RFC 5545-compliant .ics invitation compatible with Outlook and Google Calendar.",
          badge: "Confirmation",
        },
      ]}
      activeFeatures={[
        {
          title: "Database Write-Locking",
          description: "Strict SQLite transaction serialization ensures simultaneous booking attempts result in exactly one confirmation and one clean conflict error.",
          tag: "Active",
        },
        {
          title: "IANA Timezone Engine",
          description: "Comprehensive timezone calculations handle daylight-saving transitions and midnight boundary crossing without shifting meeting days.",
          tag: "Active",
        },
        {
          title: "Configured Buffer Windows",
          description: "Automatic padding before and after meetings protects team focus time and prevents consecutive meeting burnout.",
          tag: "Active",
        },
        {
          title: "RFC 5545 .ics Generation",
          description: "Standardized iCalendar files with CRLF delimiters, line folding, and proper UID tagging for seamless import into Microsoft 365 and Google Workspace.",
          tag: "Active",
        },
      ]}
      limitationsTitle="Enterprise scope & product roadmap"
      limitationsSubtitle="Transparent details on current capabilities versus planned roadmap items."
      activeStatusSummary="Plany currently provides single-host individual scheduling links backed by a local SQLite transactional engine and downloadable .ics calendar files. Enterprise organization management features are actively on the engineering roadmap."
      roadmapItems={[
        {
          title: "SAML 2.0 / Okta / Azure AD SSO",
          status: "Planned",
          description: "Centralized identity provider authentication and role-based access control for enterprise employee directories.",
        },
        {
          title: "SCIM Automated Provisioning",
          status: "Planned",
          description: "Automatic user provisioning and deprovisioning synchronized directly with enterprise HRIS and identity systems.",
        },
        {
          title: "Round-Robin & Collective Booking",
          status: "Roadmap",
          description: "Multi-host pooled availability routing meetings evenly across account teams and joint interview panels.",
        },
        {
          title: "SOC 2 Type II Audit Logging",
          status: "Under Research",
          description: "Detailed tenant audit logging, access trail exports, and compliance reporting for corporate governance.",
        },
      ]}
      faqItems={[
        {
          id: "enterprise-faq-sso",
          title: "Does Plany currently support SAML SSO or SCIM provisioning?",
          content:
            "Not in the current release. SAML SSO (Okta, Azure AD, Ping) and SCIM automated provisioning are on our enterprise product roadmap. The current release is focused on robust single-host scheduling and database concurrency.",
        },
        {
          id: "enterprise-faq-concurrency",
          title: "How does Plany prevent double-booking under concurrent load?",
          content:
            "Plany employs strict SQLite write-locking. When two invitees submit for the exact same slot concurrently, the database serializes the write operations. The first transaction commits successfully with a 201 Created status, while competing requests receive a 409 SlotConflictError.",
        },
        {
          id: "enterprise-faq-sync",
          title: "Does Plany synchronize directly via Microsoft Graph or Google APIs?",
          content:
            "The current release uses standardized RFC 5545 .ics calendar downloads that import natively into Microsoft Outlook, Google Calendar, and Apple Calendar. Direct two-way cloud API mailbox synchronization is planned for a future update.",
        },
        {
          id: "enterprise-faq-timezones",
          title: "Can international clients book across different timezones?",
          content:
            "Yes. Plany supports the complete IANA timezone database. Available slots are calculated dynamically based on the host's configured working hours and converted accurately into the invitee's local time, including day changes for slots crossing midnight.",
        },
      ]}
      ctaHeadline="Experience Plany's enterprise-grade booking reliability"
      ctaDescription="Test the live booking flow with our seeded host profile to see how slot calculations, conflict prevention, and .ics export operate in real time."
    />
  );
}
