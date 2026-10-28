import type { Metadata } from "next";
import { SolutionsPageLayout } from "@/components/solutions/SolutionsPageLayout";

export const metadata: Metadata = {
  title: "Recruiting Solutions | Plany",
  description:
    "Deliver a modern, candidate-friendly interview scheduling experience. Eliminate back-and-forth emails and coordinate candidate interviews with ease.",
};

export default function RecruitingSolutionsPage() {
  return (
    <SolutionsPageLayout
      audienceName="Recruiting"
      badgeText="Candidate Experience"
      headline="Deliver a modern, candidate-friendly interview scheduling experience."
      description="Make a stellar first impression on top candidates. Share clean personal booking links for screening calls and hiring manager interviews, with automatic timezone translation and zero risk of overlapping interviews."
      heroMockup={{
        eventTitle: "Candidate Screening & Career Discussion",
        hostName: "Alex Morgan",
        duration: "30 Min",
        highlights: [
          { label: "Role Alignment", value: "Dedicated screening conversation" },
          { label: "Candidate Timezone", value: "Auto-detected with instant local display" },
          { label: "Debrief Buffer", value: "15 min after call for scorecard entry" },
          { label: "Calendar Placement", value: "One-click .ics calendar invitation" },
        ],
        securityNote: "Candidates book directly from your open interview slots without account creation",
      }}
      useCasesTitle="Recruiting & talent acquisition scenarios"
      useCasesSubtitle="How recruiters and hiring teams streamline interview pipelines."
      useCases={[
        {
          title: "Initial Recruiter Screenings",
          description:
            "Send candidates a clean 15- or 30-minute booking link in your initial outreach message to schedule quick qualification calls without delay.",
          badge: "Sourcing",
        },
        {
          title: "Hiring Manager Deep-Dives",
          description:
            "Enable hiring managers to publish specific interview slots that fit their weekly rhythm, preventing interviews from infringing on strategic focus time.",
          badge: "Interviews",
        },
        {
          title: "Global Candidate Sourcing",
          description:
            "Hire remote talent globally. Candidates in any country view available interview times in their local clock, avoiding awkward middle-of-the-night mixups.",
          badge: "Remote Hiring",
        },
      ]}
      workflowTitle="The candidate interview workflow"
      workflowSubtitle="From initial outreach to a confirmed interview on both calendars."
      workflowSteps={[
        {
          step: "01",
          title: "Send Screening Invitation",
          description:
            "Paste your Plany link (e.g. /alex/30-min-chat) into your email outreach, LinkedIn InMail, or ATS template.",
          badge: "Outreach",
        },
        {
          step: "02",
          title: "Candidate Selects Slot",
          description:
            "The candidate views open interview slots automatically converted to their local timezone and selects a convenient time.",
          badge: "Self-Serve",
        },
        {
          step: "03",
          title: "Information Capture",
          description:
            "Candidate provides their full name, email, phone number, and optional resume or portfolio links in the details form.",
          badge: "Details",
        },
        {
          step: "04",
          title: "Calendar Confirmation",
          description:
            "The interview is committed to the database, rendering an instant confirmation screen with a downloadable .ics calendar file.",
          badge: "Confirmed",
        },
      ]}
      activeFeatures={[
        {
          title: "Scorecard Buffers",
          description: "Configurable post-interview buffer padding ensures interviewers have time to complete scorecards and write notes.",
          tag: "Active",
        },
        {
          title: "Global Timezone Translation",
          description: "Candidate timezones are detected automatically and calculated with precision against host working hours.",
          tag: "Active",
        },
        {
          title: "Zero Double-Booking",
          description: "Atomic database locking guarantees interview slots cannot be claimed twice, preserving recruiter professionalism.",
          tag: "Active",
        },
        {
          title: "Standardized .ics Invitations",
          description: "Universal RFC 5545 calendar files import seamlessly into candidate Google Calendar, Apple Calendar, and Outlook.",
          tag: "Active",
        },
      ]}
      limitationsTitle="Recruiting scope & engineering roadmap"
      limitationsSubtitle="Transparent details on current capabilities versus planned recruiting features."
      activeStatusSummary="Plany currently supports 1:1 candidate interview scheduling with individual interviewers, verified database write locks, and downloadable .ics files. Multi-interviewer collective panel scheduling and ATS integrations are on our roadmap."
      roadmapItems={[
        {
          title: "Multi-Interviewer Panel Scheduling",
          status: "Planned",
          description: "Pool availability across multiple hiring team members to schedule collective panel interviews in a single click.",
        },
        {
          title: "Greenhouse & Lever ATS Synchronization",
          status: "Planned",
          description: "Two-way integration with applicant tracking systems to log interview times and candidate data automatically.",
        },
        {
          title: "Automated Candidate SMS Reminders",
          status: "Roadmap",
          description: "Send friendly text message reminders to candidates prior to their scheduled interview to reduce ghosting.",
        },
        {
          title: "Self-Serve Candidate Rescheduling",
          status: "Roadmap",
          description: "Allow candidates to move their interview slot directly from their confirmation screen without manual email coordination.",
        },
      ]}
      faqItems={[
        {
          id: "recruiting-faq-panels",
          title: "Can I schedule panel interviews with multiple team members today?",
          content:
            "Not in the current release. Collective multi-host panel scheduling is on our product roadmap. Today, each interviewer or recruiter shares their individual booking link.",
        },
        {
          id: "recruiting-faq-ats",
          title: "Does Plany integrate directly with Greenhouse or Lever?",
          content:
            "Direct ATS integrations are planned for a future update. In the current release, candidate details (name, email, notes) are captured upon confirmation and can be transferred to your ATS.",
        },
        {
          id: "recruiting-faq-timezones",
          title: "How does Plany handle candidates in different timezones?",
          content:
            "Plany detects the candidate's browser timezone on page load and dynamically converts your open slots. The underlying UTC instant is preserved, so neither party has to do mental timezone math.",
        },
        {
          id: "recruiting-faq-calendar",
          title: "How do candidates add the interview to their calendar?",
          content:
            "Upon confirming the booking, candidates click 'Download calendar invite (.ics)'. The file imports directly into Google Calendar, Microsoft Outlook, and Apple Calendar with event title, host name, and exact time.",
        },
      ]}
      ctaHeadline="Upgrade your interview scheduling experience"
      ctaDescription="Try our live booking widget at /alex/30-min-chat to experience candidate scheduling firsthand."
    />
  );
}
