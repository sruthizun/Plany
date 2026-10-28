"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Accordion } from "@/components/ui/Accordion";

export default function SchedulingPage() {
  const [previewSelectedDate, setPreviewSelectedDate] = useState("2026-11-05");
  const [previewSelectedSlot, setPreviewSelectedSlot] = useState("10:00 AM");

  const workflowSteps = [
    {
      step: "01",
      title: "Share Your Link",
      description: "Each event type has a clean, personalized link (such as /alex/30-min-chat) that can be shared in emails, chat messages, or document links.",
      badge: "Step 1",
    },
    {
      step: "02",
      title: "Invitee Picks a Time",
      description: "Invitees view live available slots computed directly from host availability rules and translated automatically into their local timezone.",
      badge: "Step 2",
    },
    {
      step: "03",
      title: "Enter Meeting Details",
      description: "A clean, accessible form captures invitee name, email, and optional context notes with strict client and server validation.",
      badge: "Step 3",
    },
    {
      step: "04",
      title: "Confirm & Export .ics",
      description: "The booking commits to the database with concurrency protection, rendering an immediate confirmation screen with downloadable .ics file.",
      badge: "Step 4",
    },
  ];

  const availabilityPoints = [
    {
      title: "Configured Working Hours",
      description: "Meetings are restricted to the host's configured schedule (such as Monday–Friday, 9:00 AM – 5:00 PM), automatically filtering out off-hours.",
    },
    {
      title: "Automated Slot Generation",
      description: "Available time slots are generated dynamically in increments matching the event duration (e.g. 30-minute intervals).",
    },
    {
      title: "Automatic Past-Slot Filtering",
      description: "Any time slot that has already passed in the invitee's local time is strictly excluded from the calendar view.",
    },
    {
      title: "Conflict Removal",
      description: "Time slots that overlap with existing confirmed appointments are automatically eliminated from available options.",
    },
    {
      title: "Smart Buffer Times",
      description: "Configurable pre- and post-meeting padding (e.g. 10 minutes before and after) ensures you have breathing room between sessions.",
    },
  ];

  const faqItems = [
    {
      id: "faq-how-it-works",
      title: "How does Plany scheduling work?",
      content:
        "Plany operates on an availability rules engine backed by SQLite persistence. When an invitee opens a booking link (like /alex/30-min-chat), Plany computes all valid time slots for the host's configured working days, removes existing confirmed appointments and buffer windows, converts the times to the invitee's timezone, and safely commits bookings using database write-locking.",
    },
    {
      id: "faq-timezones",
      title: "Can invitees book in different timezones?",
      content:
        "Yes. Plany automatically detects the invitee's browser timezone on page load and provides a searchable dropdown of global IANA timezones. All available times are translated dynamically to the invitee's local clock, while preserving the exact underlying UTC instant.",
    },
    {
      id: "faq-double-booking",
      title: "How does Plany prevent conflicting bookings?",
      content:
        "Plany uses a SQLite-compatible database-level write-locking coordinator. When concurrent requests attempt to reserve the same slot, the database serializes write access. Only the first valid booking succeeds, while competing requests receive an immediate HTTP 409 conflict error without creating double bookings.",
    },
    {
      id: "faq-calendar-export",
      title: "Can I download a calendar invitation?",
      content:
        "Yes. Once a booking is confirmed, invitees can immediately click 'Download calendar invite (.ics)'. Plany generates a standards-compliant RFC 5545 iCalendar file that imports natively into Google Calendar, Microsoft Outlook, Apple Calendar, and mobile apps.",
    },
    {
      id: "faq-auto-sync",
      title: "Does Plany automatically sync with Google Calendar or Outlook?",
      content:
        "In the current release, Plany supports universal downloadable .ics calendar invitations that you can add to any calendar application. Direct two-way API synchronization (such as continuous Google Calendar or Outlook mailbox polling) is in architectural research and planned for future releases.",
    },
  ];

  return (
    <main className="min-h-screen bg-[#fcfbf8] text-[#071a31] pb-24">
      {/* =========================================================================
          Section 1: Hero
          ========================================================================= */}
      <section className="pt-12 pb-16 sm:pt-16 sm:pb-24 lg:pt-20 lg:pb-28 bg-[#fcfbf8] border-b border-[#e4e6e9]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
            
            {/* Left Column: Heading and CTAs */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold tracking-[-0.03em] text-[#071a31] leading-[1.08]">
                Effortless meeting scheduling that puts time on your side.
              </h1>

              <p className="type-body-xl text-[#5f6d77] max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Plany replaces email back-and-forth with a smooth self-serve booking interface. Invitees pick from real-time available slots converted into their local timezone, with atomic database locks stopping double-booking.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <Link href="/alex/30-min-chat" className="w-full sm:w-auto">
                  <Button variant="primary" size="lg" fullWidth>
                    Try Free Demo
                  </Button>
                </Link>
                <a href="#features" className="w-full sm:w-auto">
                  <Button variant="secondary" size="lg" fullWidth>
                    Explore Features
                  </Button>
                </a>
              </div>
            </div>

            {/* Right Column: Hero Scheduling Card Illustration */}
            <div className="lg:col-span-6">
              <div className="bg-white rounded-[28px] border border-[#d8dce0] shadow-cal-xl p-7 sm:p-10 space-y-6 sm:space-y-8">
                <div className="flex items-center justify-between pb-6 border-b border-[#e4e6e9]">
                  <div className="flex items-center gap-4 sm:gap-5">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#071a31] text-white text-xl sm:text-2xl font-bold flex items-center justify-center shrink-0">
                      A
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-semibold text-[#5f6d77] uppercase tracking-wider">
                        Alex Morgan
                      </p>
                      <h3 className="text-xl sm:text-2xl font-bold text-[#071a31] tracking-tight mt-0.5">
                        30-Minute Architecture Review
                      </h3>
                    </div>
                  </div>
                  <Badge variant="neutral" size="md" className="px-3.5 py-1.5 text-xs sm:text-sm font-semibold shrink-0">
                    30 Min
                  </Badge>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div className="p-5 sm:p-6 bg-[#fcfbf8] rounded-[16px] border border-[#e4e6e9] space-y-1.5">
                    <h4 className="text-sm sm:text-base font-bold text-[#071a31]">Host Working Hours</h4>
                    <p className="text-xs sm:text-sm text-[#5f6d77] leading-relaxed">Monday–Friday: 9:00 AM – 5:00 PM</p>
                  </div>
                  <div className="p-5 sm:p-6 bg-[#fcfbf8] rounded-[16px] border border-[#e4e6e9] space-y-1.5">
                    <h4 className="text-sm sm:text-base font-bold text-[#071a31]">Timezone Support</h4>
                    <p className="text-xs sm:text-sm text-[#5f6d77] leading-relaxed">Auto-detected: America/New_York</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          Section 2: How Scheduling Works
          ========================================================================= */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white border-b border-[#e4e6e9]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="type-h2 font-bold text-[#071a31]">
              How Plany scheduling works
            </h2>
            <p className="type-body-md text-[#5f6d77]">
              From link sharing to calendar export, Plany manages each step deterministically.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {workflowSteps.map((step, idx) => (
              <div
                key={idx}
                className="relative p-6 sm:p-7 rounded-[20px] bg-[#fcfbf8] border border-[#d8dce0] shadow-cal-sm hover:shadow-cal-md transition-all flex flex-col justify-between"
              >
                <div className="text-center">
                  <h3 className="text-lg font-bold text-[#071a31] mb-2.5 tracking-tight text-center">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5f6d77] leading-relaxed text-center">
                    {step.description}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-[#e4e6e9] flex items-center justify-between text-xs">
                  <span className="text-[11px] font-semibold text-[#071a31] bg-[#f5f5f7] px-2.5 py-1 rounded-full border border-[#d8dce0] tracking-normal">
                    {step.badge}
                  </span>
                  <span className="text-xs font-semibold text-[#5f6d77]">
                    Step {idx + 1} of 4
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          Section 3: Availability Management
          ========================================================================= */}
      <section id="features" className="py-16 sm:py-20 lg:py-24 bg-[#fcfbf8] border-b border-[#e4e6e9]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
            
            <div className="lg:col-span-6 space-y-5">
              <h2 className="type-h2 font-bold text-[#071a31] tracking-tight">
                Accurate availability calculations without manual checks
              </h2>
              <p className="type-body-md text-[#5f6d77] leading-relaxed">
                Plany&apos;s scheduling engine calculates available time slots dynamically based on configured host availability rules and existing confirmed bookings.
              </p>

              <div className="space-y-3 pt-2">
                {availabilityPoints.map((pt, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm">
                    <span className="text-[#10b981] font-bold shrink-0 mt-0.5">✓</span>
                    <div>
                      <span className="font-bold text-[#071a31]">{pt.title}: </span>
                      <span className="text-[#5f6d77]">{pt.description}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-[14px] bg-white border border-[#d8dce0] text-xs text-[#5f6d77]">
                <span className="font-semibold text-[#071a31]">Configuration Notice: </span>
                Availability rules in this release are configured via backend host schedule records. An interactive host dashboard for editing hours in real-time is in architectural planning.
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="bg-white rounded-[24px] border border-[#d8dce0] shadow-cal-md p-6 sm:p-8 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#e4e6e9] text-xs font-semibold text-[#071a31]">
                  <span>Active Host Rule: Alex Morgan</span>
                  <span className="text-[#10b981]">Enforced</span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-2 px-3 rounded-[8px] bg-[#fcfbf8] border border-[#e4e6e9]">
                    <span className="font-medium text-[#071a31]">Configured Working Days</span>
                    <span className="text-[#5f6d77]">Monday – Friday</span>
                  </div>
                  <div className="flex justify-between py-2 px-3 rounded-[8px] bg-[#fcfbf8] border border-[#e4e6e9]">
                    <span className="font-medium text-[#071a31]">Daily Available Hours</span>
                    <span className="text-[#5f6d77]">9:00 AM – 5:00 PM (EDT)</span>
                  </div>
                  <div className="flex justify-between py-2 px-3 rounded-[8px] bg-[#fcfbf8] border border-[#e4e6e9]">
                    <span className="font-medium text-[#071a31]">Slot Duration</span>
                    <span className="text-[#5f6d77]">30 Minutes</span>
                  </div>
                  <div className="flex justify-between py-2 px-3 rounded-[8px] bg-[#fcfbf8] border border-[#e4e6e9]">
                    <span className="font-medium text-[#071a31]">Buffer Before / After</span>
                    <span className="text-[#5f6d77]">10 min / 10 min</span>
                  </div>
                </div>

                <p className="text-[11px] text-[#748491] italic pt-2 text-center">
                  Live slots are tested and verified by our automated test suite on every commit.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          Section 4: Global Timezone Support
          ========================================================================= */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white border-b border-[#e4e6e9]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="type-h2 font-bold text-[#071a31]">
              Global timezone conversion that preserves the exact instant
            </h2>
            <p className="type-body-md text-[#5f6d77]">
              Invitees can view and book meetings in their own local time without calculating GMT offsets or suffering date-shift bugs.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-[20px] bg-[#fcfbf8] border border-[#d8dce0] space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#748491]">
                Host Location
              </span>
              <h3 className="text-lg font-bold text-[#071a31]">New York (EDT)</h3>
              <p className="text-2xl font-extrabold text-[#071a31]">10:00 AM</p>
              <p className="text-xs text-[#5f6d77]">
                America/New_York (UTC-4)
              </p>
              <div className="pt-2 text-[11px] text-[#10b981] font-semibold">
                ✓ Host standard working time
              </div>
            </div>

            <div className="p-6 rounded-[20px] bg-[#fcfbf8] border border-[#d8dce0] space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#748491]">
                Invitee Location
              </span>
              <h3 className="text-lg font-bold text-[#071a31]">London (BST)</h3>
              <p className="text-2xl font-extrabold text-[#071a31]">3:00 PM</p>
              <p className="text-xs text-[#5f6d77]">
                Europe/London (UTC+1)
              </p>
              <div className="pt-2 text-[11px] text-[#10b981] font-semibold">
                ✓ Automatic 5-hour positive offset
              </div>
            </div>

            <div className="p-6 rounded-[20px] bg-[#fcfbf8] border border-[#d8dce0] space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#748491]">
                Invitee Location
              </span>
              <h3 className="text-lg font-bold text-[#071a31]">Tokyo (JST)</h3>
              <p className="text-2xl font-extrabold text-[#071a31]">11:00 PM</p>
              <p className="text-xs text-[#5f6d77]">
                Asia/Tokyo (UTC+9)
              </p>
              <div className="pt-2 text-[11px] text-[#10b981] font-semibold">
                ✓ Crosses midnight safely flagged
              </div>
            </div>
          </div>

          <div className="p-4 rounded-[14px] bg-[#f5f5f7] border border-[#e4e6e9] text-xs text-[#5f6d77] max-w-2xl mx-auto text-center">
            <span className="font-semibold text-[#071a31]">Illustration Note: </span>
            All three cards represent the exact same underlying UTC timestamp (14:00 UTC). When invitees change their timezone, Plany updates the local display without shifting the meeting instant.
          </div>
        </div>
      </section>

      {/* =========================================================================
          Section 5: Booking Protection & Concurrency
          ========================================================================= */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#fcfbf8] border-b border-[#e4e6e9]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="type-h2 font-bold text-[#071a31]">
              Engineered with cross-process double-booking protection
            </h2>
            <p className="type-body-md text-[#5f6d77]">
              Plany addresses concurrency at the database layer rather than relying solely on in-memory locks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-[20px] bg-white border border-[#d8dce0] shadow-cal-sm space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-[10px] bg-[#fcfbf8] border border-[#e4e6e9] flex items-center justify-center font-bold text-[#071a31] shrink-0">
                  1
                </div>
                <h3 className="text-lg font-bold text-[#071a31] tracking-tight leading-snug">
                  Database-Level Locking
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#5f6d77] leading-relaxed">
                Uses SQLite write-locking transactions to coordinate concurrent requests across separate processes and server instances.
              </p>
            </div>

            <div className="p-6 rounded-[20px] bg-white border border-[#d8dce0] shadow-cal-sm space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-[10px] bg-[#fcfbf8] border border-[#e4e6e9] flex items-center justify-center font-bold text-[#071a31] shrink-0">
                  2
                </div>
                <h3 className="text-lg font-bold text-[#071a31] tracking-tight leading-snug">
                  Cross-Event Type Shield
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#5f6d77] leading-relaxed">
                When a host confirms a booking on one event type, that time slot is immediately protected across all the host&apos;s other active event types.
              </p>
            </div>

            <div className="p-6 rounded-[20px] bg-white border border-[#d8dce0] shadow-cal-sm space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-[10px] bg-[#fcfbf8] border border-[#e4e6e9] flex items-center justify-center font-bold text-[#071a31] shrink-0">
                  3
                </div>
                <h3 className="text-lg font-bold text-[#071a31] tracking-tight leading-snug">
                  Strict Input Validation
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#5f6d77] leading-relaxed">
                Payloads with inverted dates, past times, invalid emails, or duration mismatches are rejected before touching the database.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          Section 6: Booking Confirmation & Calendar Export (.ics)
          ========================================================================= */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white border-b border-[#e4e6e9]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
            
            <div className="lg:col-span-6 space-y-5">
              <h2 className="type-h2 font-bold text-[#071a31] tracking-tight">
                Instant confirmation with downloadable .ics calendar invitations
              </h2>
              <p className="type-body-md text-[#5f6d77] leading-relaxed">
                Every confirmed booking renders an immediate confirmation screen with full appointment details and a one-click button to download an RFC 5545-compliant .ics file.
              </p>

              <div className="space-y-2 text-xs sm:text-sm text-[#071a31]">
                <p className="flex items-center gap-2">
                  <span className="text-[#10b981] font-bold">✓</span>
                  <span>Universal VCALENDAR / VEVENT formatted with CRLF line delimiters</span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-[#10b981] font-bold">✓</span>
                  <span>Line folding for octet limits (&le; 75 octets) per RFC 5545 specification</span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-[#10b981] font-bold">✓</span>
                  <span>Imports directly into Google Calendar, Outlook, and Apple Calendar</span>
                </p>
              </div>

              <div className="p-4 rounded-[14px] bg-[#fcfbf8] border border-[#e4e6e9] text-xs text-[#5f6d77]">
                <span className="font-semibold text-[#071a31]">Integration Scope : </span>
                Calendar export is handled via standards-based .ics file downloads. Plany does not currently poll or synchronize directly via Google or Microsoft Graph APIs.
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="bg-[#fcfbf8] rounded-[24px] border border-[#d8dce0] p-6 sm:p-8 space-y-4 shadow-cal-sm">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#10b981]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]" />
                  <span>Confirmed Booking Screen Mockup</span>
                </div>
                <div className="p-4 bg-white rounded-[16px] border border-[#e4e6e9] space-y-3">
                  <h4 className="text-base font-bold text-[#071a31]">30-Minute Architecture Review</h4>
                  <div className="text-xs text-[#5f6d77] space-y-1">
                    <p>• Host: Alex Morgan</p>
                    <p>• Time: 12:00 AM – 12:30 AM, 5 Nov 2026</p>
                    <p>• Timezone: America/New_York (EDT)</p>
                  </div>
                  <div className="pt-2">
                    <Button variant="primary" size="sm" fullWidth leftIcon={
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    }>
                      Download calendar invite (.ics)
                    </Button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          Section 7: Interactive Booking Preview
          ========================================================================= */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#fcfbf8] border-b border-[#e4e6e9]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="type-h2 font-bold text-[#071a31]">
              Interactive booking flow preview
            </h2>
            <p className="type-body-md text-[#5f6d77]">
              Experience how invitees navigate the booking calendar and select time slots.
            </p>
          </div>

          <div className="max-w-3xl mx-auto bg-white rounded-[24px] border border-[#d8dce0] shadow-cal-md p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#e4e6e9]">
              <div>
                <h3 className="text-lg font-bold text-[#071a31]">
                  Select Date & Available Time Slot
                </h3>
              </div>
              <Badge variant="neutral">Demonstration</Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Date Selector Preview */}
              <div className="space-y-3">
                <p className="text-xs font-semibold text-[#071a31]">1. Choose a Date (November 2026):</p>
                <div className="grid grid-cols-3 gap-2">
                  {["2026-11-04", "2026-11-05", "2026-11-06"].map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setPreviewSelectedDate(d)}
                      className={`py-2 px-3 text-xs font-semibold rounded-[10px] text-center border transition-all cursor-pointer ${
                        previewSelectedDate === d
                          ? "bg-[#071a31] text-white border-[#071a31] shadow-cal-sm"
                          : "bg-[#fcfbf8] text-[#071a31] border-[#d8dce0] hover:border-[#071a31]"
                      }`}
                    >
                      {d.slice(5)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Slot Selector Preview */}
              <div className="space-y-3">
                <p className="text-xs font-semibold text-[#071a31]">2. Choose Available Time:</p>
                <div className="grid grid-cols-2 gap-2">
                  {["9:00 AM", "10:00 AM", "1:30 PM", "3:00 PM"].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setPreviewSelectedSlot(s)}
                      className={`py-2 px-3 text-xs font-semibold rounded-[10px] text-center border transition-all cursor-pointer ${
                        previewSelectedSlot === s
                          ? "bg-[#071a31] text-white border-[#071a31] shadow-cal-sm"
                          : "bg-[#fcfbf8] text-[#071a31] border-[#d8dce0] hover:border-[#071a31]"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#e4e6e9] flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-[#5f6d77]">
                Selected: <span className="font-bold text-[#071a31]">{previewSelectedSlot}</span> on <span className="font-bold text-[#071a31]">{previewSelectedDate}</span>
              </span>

              <Link href="/alex/30-min-chat" className="w-full sm:w-auto">
                <Button variant="primary" size="md" fullWidth>
                  Launch Live Booking Widget →
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          Section 8: Frequently Asked Questions (FAQ)
          ========================================================================= */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white border-b border-[#e4e6e9]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="type-h2 font-bold text-[#071a31]">
              Frequently Asked Questions
            </h2>
            <p className="type-body-md text-[#5f6d77]">
              Technical and workflow inquiries regarding Plany&apos;s scheduling engine.
            </p>
          </div>

          <div className="max-w-3xl mx-auto bg-[#fcfbf8] rounded-[20px] border border-[#d8dce0] shadow-cal-sm p-6 sm:p-8">
            <Accordion items={faqItems} defaultOpenIndex={0} />
          </div>
        </div>
      </section>

      {/* =========================================================================
          Section 9: Final Call-to-Action
          ========================================================================= */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 mt-16 sm:mt-20">
        <div className="bg-[#071a31] text-[#fcfbf8] rounded-[24px] p-8 sm:p-12 text-center space-y-6 shadow-cal-xl">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white max-w-2xl mx-auto leading-tight">
            Ready to test the live scheduling engine?
          </h2>
          <p className="text-sm sm:text-base text-[#c1defe]/90 max-w-xl mx-auto leading-relaxed">
            Visit our seeded host profile, select your preferred time slot, and experience frictionless scheduling firsthand.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Link href="/alex/30-min-chat" className="w-full sm:w-auto">
              <Button variant="inverse" size="lg" className="w-full sm:w-auto">
                Try Free Demo Now
              </Button>
            </Link>
            <Link href="/pricing" className="w-full sm:w-auto">
              <Button variant="outline-light" size="lg" className="w-full sm:w-auto">
                View Pricing Plans
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
