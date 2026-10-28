import type { Metadata } from "next";
import { SolutionsPageLayout } from "@/components/solutions/SolutionsPageLayout";

export const metadata: Metadata = {
  title: "Small Business Solutions | Plany",
  description:
    "Frictionless client scheduling for small businesses, boutique agencies, and consultants. Eliminate phone tag and manage client appointments effortlessly.",
};

export default function SmallBusinessSolutionsPage() {
  return (
    <SolutionsPageLayout
      audienceName="Small Business"
      workflowCardTheme="light"
      hideFeatureDots
      badgeText="Small Business Scheduling"
      headline="Frictionless client appointments without the back-and-forth."
      description="Stop wasting hours coordinating consultation calls, project reviews, and client check-ins. Share your professional booking link, enforce your working hours, and let clients pick open times that fit your calendar."
      heroMockup={{
        eventTitle: "Client Discovery & Project Estimate",
        hostName: "Alex Morgan",
        duration: "30 Min",
        highlights: [
          { label: "Working Hours", value: "Mon–Fri, 9:00 AM – 5:00 PM (Configured)" },
          { label: "Weekend Bookings", value: "Strictly disabled to protect off-hours" },
          { label: "Client Intake", value: "Captures name, email & appointment notes" },
          { label: "Instant Sync", value: "Downloadable .ics calendar invitation" },
        ],
        securityNote: "Clients can only book within your approved working hours",
      }}
      useCasesTitle="How small businesses schedule with Plany"
      useCasesSubtitle="Streamline appointments for agencies, independent firms, and service professionals."
      useCases={[
        {
          title: "Client Consultations & Estimates",
          description:
            "Embed your link on your website or quote emails so prospective clients can instantly lock in a time to discuss proposals without multiple phone calls.",
          badge: "New Clients",
        },
        {
          title: "Account Reviews & Check-Ins",
          description:
            "Provide ongoing retainer clients with a hassle-free way to book project status reviews and deliverables walk-throughs without clashing with your deep work.",
          badge: "Retention",
        },
        {
          title: "Vendor & Partner Coordination",
          description:
            "Coordinate with subcontractors, suppliers, and creative partners without double-booking your team or overcommitting your working days.",
          badge: "Operations",
        },
      ]}
      workflowTitle="How small business scheduling works"
      workflowSubtitle="A clean, simple 4-step process for you and your clients."
      workflowSteps={[
        {
          step: "01",
          title: "Set Your Working Schedule",
          description:
            "Specify your active workdays and operating hours. Weekends and evenings are automatically blocked from client view.",
          badge: "Setup",
        },
        {
          step: "02",
          title: "Share Your Booking Link",
          description:
            "Add your link (e.g. /alex/30-min-chat) to your email signature, business cards, website contact page, or WhatsApp messages.",
          badge: "Outreach",
        },
        {
          step: "03",
          title: "Client Selects Open Slot",
          description:
            "Clients browse currently available times, enter their contact info, and submit without needing to create an account.",
          badge: "Self-Serve",
        },
        {
          step: "04",
          title: "Confirmation & Calendar Invite",
          description:
            "Plany saves the appointment to the database and generates a standard .ics invite that imports directly into client calendars.",
          badge: "Booked",
        },
      ]}
      activeFeatures={[
        {
          title: "Strict Business Hours",
          description: "Clients can only book within your configured schedule. Early mornings, late evenings, and weekends are protected.",
          tag: "Active",
        },
        {
          title: "Automatic Past-Slot Filtering",
          description: "Any time slot that has already passed in the client's current time is automatically removed from booking choices.",
          tag: "Active",
        },
        {
          title: "Smart Buffer Padding",
          description: "Add 10-15 minutes of buffer time before and after meetings so you never run late between client appointments.",
          tag: "Active",
        },
        {
          title: "Universal .ics Invitation",
          description: "RFC 5545-compliant calendar file downloads let clients add meetings directly to Apple, Google, or Outlook calendars.",
          tag: "Active",
        },
      ]}
      limitationsTitle="Small business scope & upcoming features"
      limitationsSubtitle="Transparent roadmap for business owners evaluating Plany."
      activeStatusSummary="Plany currently offers personal single-host scheduling links with client intake form validation and downloadable .ics calendar files. Multi-staff pooling and payment collection are planned for future releases."
      roadmapItems={[
        {
          title: "Stripe & PayPal Payment Checkout",
          status: "Planned",
          description: "Require upfront payments or consultation deposits before confirming booking appointments on your calendar.",
        },
        {
          title: "SMS Client Reminders",
          status: "Planned",
          description: "Automated text message reminders sent 24 hours and 1 hour before appointments to reduce client no-shows.",
        },
        {
          title: "Multi-Staff Team Calendar",
          status: "Roadmap",
          description: "Allow clients to select specific staff members or book the first available team member at your business.",
        },
        {
          title: "Custom Domain Branding",
          status: "Roadmap",
          description: "Host your booking page on your own domain (such as schedule.yourbusiness.com) with custom logos and colors.",
        },
      ]}
      faqItems={[
        {
          id: "smb-faq-account",
          title: "Do my clients need to create a Plany account to book a meeting?",
          content:
            "No. Clients simply click your booking link, choose an available date and time, enter their name and email, and confirm. There is zero signup friction.",
        },
        {
          id: "smb-faq-payments",
          title: "Can I collect payments for appointments right now?",
          content:
            "Not in the current release. Payment integrations (such as Stripe and PayPal) are on our product roadmap. Currently, all booking slots are confirmed directly upon form submission.",
        },
        {
          id: "smb-faq-mobile",
          title: "Does Plany work smoothly on mobile phones?",
          content:
            "Yes. Both the booking interface and the calendar navigation are fully responsive and touch-friendly on iOS and Android smartphones and tablets.",
        },
        {
          id: "smb-faq-conflict",
          title: "Will Plany prevent two clients from booking the exact same time?",
          content:
            "Yes. Plany's database engine uses transactional write locks. If two clients click confirm on the same slot simultaneously, only the first request succeeds, completely eliminating double-bookings.",
        },
      ]}
      ctaHeadline="Simplify client bookings for your business today"
      ctaDescription="Try our interactive booking widget with host Alex Morgan to see how fast clients can schedule time on your calendar."
    />
  );
}
