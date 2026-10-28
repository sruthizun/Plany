import type { Metadata } from "next";
import { SolutionsPageLayout } from "@/components/solutions/SolutionsPageLayout";

export const metadata: Metadata = {
  title: "Individual Solutions | Plany",
  description:
    "Effortless personal scheduling for freelancers, independent consultants, and creators. Share your personal booking link and eliminate email coordination.",
};

export default function IndividualsSolutionsPage() {
  return (
    <SolutionsPageLayout
      audienceName="Individuals"
      badgeText="Personal Scheduling"
      headline="Effortless personal scheduling for freelancers and consultants."
      description="Take back control of your workday. Share a sleek, professional booking link with clients, collaborators, and mentees. Eliminate endless email tag while protecting your focus hours and personal time."
      heroMockup={{
        eventTitle: "30-Minute Advisory & Strategy Session",
        hostName: "Alex Morgan",
        duration: "30 Min",
        highlights: [
          { label: "Personal URL", value: "/alex/30-min-chat" },
          { label: "Working Hours", value: "Mon–Fri, 9:00 AM – 5:00 PM (Customizable)" },
          { label: "Timezone Handling", value: "Full IANA database support" },
          { label: "Calendar Placement", value: "Downloadable RFC 5545 .ics invite" },
        ],
        securityNote: "100% free personal booking link with local database persistence",
      }}
      useCasesTitle="Individual scheduling scenarios"
      useCasesSubtitle="How solo professionals and independent consultants manage their time."
      useCases={[
        {
          title: "Freelance Discovery Calls",
          description:
            "Add your personal link to your portfolio, proposals, or email signature so prospective clients can book an introductory chat without friction.",
          badge: "Freelance",
        },
        {
          title: "Paid Advisory & Consulting",
          description:
            "Provide clients with structured 30- or 60-minute consultation slots that respect your deep-work hours and automatically exclude weekends.",
          badge: "Consulting",
        },
        {
          title: "Mentorship & Networking",
          description:
            "Offer time to mentees, peer collaborators, or industry peers with clear boundaries, preventing casual chats from consuming your productive afternoons.",
          badge: "Networking",
        },
      ]}
      workflowTitle="How personal scheduling works"
      workflowSubtitle="From personal link sharing to a confirmed meeting on your calendar."
      workflowSteps={[
        {
          step: "01",
          title: "Share Your Personal URL",
          description:
            "Add your unique booking link (e.g. /alex/30-min-chat) to your website, LinkedIn profile, or email footer.",
          badge: "Distribution",
        },
        {
          step: "02",
          title: "Invitee Picks an Open Slot",
          description:
            "The client selects an open time from your available hours, automatically converted to their own timezone.",
          badge: "Selection",
        },
        {
          step: "03",
          title: "Details Captured",
          description:
            "Invitee submits their name, email, and meeting context with client-side and server-side validation.",
          badge: "Intake",
        },
        {
          step: "04",
          title: "Immediate .ics Calendar File",
          description:
            "The meeting commits to the database, presenting a confirmation screen and an immediate .ics download.",
          badge: "Confirmed",
        },
      ]}
      activeFeatures={[
        {
          title: "Personal Booking Link",
          description: "Clean, memorable link (e.g. /alex/30-min-chat) that presents your availability professionally on any device.",
          tag: "Active",
        },
        {
          title: "Timezone Intelligence",
          description: "Automatic browser timezone detection and searchable IANA picker prevents missed appointments with international clients.",
          tag: "Active",
        },
        {
          title: "Focus Time Protection",
          description: "Strict working hour rules and configurable pre/post meeting buffers keep your schedule balanced and stress-free.",
          tag: "Active",
        },
        {
          title: "Instant Calendar Export",
          description: "RFC 5545 .ics downloads let both you and your invitees add confirmed meetings directly to Apple, Google, or Outlook calendars.",
          tag: "Active",
        },
      ]}
      limitationsTitle="Individual scope & product roadmap"
      limitationsSubtitle="Clear transparency on what is active today versus planned additions."
      activeStatusSummary="Plany currently offers free personal single-host scheduling links with local SQLite database persistence, strict conflict prevention, and .ics calendar downloads. Paid bookings and direct cloud calendar sync are on our roadmap."
      roadmapItems={[
        {
          title: "Stripe Payment Integration",
          status: "Planned",
          description: "Collect consultation fees or deposits via credit card before an appointment is confirmed on your schedule.",
        },
        {
          title: "Google Calendar & iCloud Two-Way Sync",
          status: "Planned",
          description: "Continuously check personal cloud calendars to automatically block personal doctor appointments or events.",
        },
        {
          title: "Custom Domain Mapping",
          status: "Roadmap",
          description: "Host your booking page on your own custom domain (e.g. schedule.yourname.com) for a completely branded look.",
        },
        {
          title: "Custom Form Questions",
          status: "Roadmap",
          description: "Add customized intake questions, file upload fields, or intake questionnaires to your booking form.",
        },
      ]}
      faqItems={[
        {
          id: "individual-faq-pricing",
          title: "Is Plany completely free for individuals to use?",
          content:
            "Yes. The core personal scheduling engine, personal booking links, availability calculations, and calendar export are completely free.",
        },
        {
          id: "individual-faq-payments",
          title: "Can I charge clients for consultations right now?",
          content:
            "Not in the current release. Direct Stripe checkout is planned for a future update. Currently, booking appointments are confirmed directly upon form submission without payment processing.",
        },
        {
          id: "individual-faq-mobile",
          title: "Does Plany work well on mobile phones?",
          content:
            "Yes. The booking page and calendar selector are built with responsive Tailwind CSS, providing a smooth touch experience on iPhone and Android devices.",
        },
        {
          id: "individual-faq-calendar-app",
          title: "How do I add confirmed bookings to my phone or desktop calendar?",
          content:
            "Once a booking is confirmed, click 'Download calendar invite (.ics)'. Tapping the downloaded file on your phone or computer automatically adds the meeting to Apple Calendar, Google Calendar, or Microsoft Outlook.",
        },
      ]}
      ctaHeadline="Simplify your personal scheduling today"
      ctaDescription="Test the live booking flow with our seeded host profile Alex Morgan at /alex/30-min-chat."
    />
  );
}
