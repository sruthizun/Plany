"use client";

import React from "react";
import Link from "next/link";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";

export function SchedulingFeaturesSection() {
  const accordionItems = [
    {
      id: "booking-links",
      title: "Personalized Booking Links & Slugs",
      content:
        "Every event type has its own clean, shareable URL (like /alex/30-min-chat). Send your link via email, message, or website embed to let invitees pick a time that suits both of you.",
    },
    {
      id: "concurrency",
      title: "Cross-Process Concurrency Protection",
      content:
        "Multiple simultaneous requests for the exact same slot are safely serialized with SQLite database write-locks. Only one booking succeeds while competing requests receive a graceful conflict notice.",
    },
    {
      id: "working-hours",
      title: "Strict Host Availability Rules",
      content:
        "Set daily start and end times, customize duration, and automatically exclude off-hours and weekends so meetings only occur within your configured working window.",
    },
    {
      id: "calendar-export",
      title: "Universal File Export",
      content:
        "Once a booking is confirmed, invitees can immediately download an industry-standard .ics file containing exact meeting start/end timestamps and attendee metadata.",
    },
  ];

  return (
    <section id="features" className="py-16 sm:py-20 lg:py-24 bg-white border-t border-[#e4e6e9]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Left Column: Heading and Interactive Accordion */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <h2 className="type-h2 font-bold text-[#071a31] lg:whitespace-nowrap">
                A better way to coordinate your schedule
              </h2>
            </div>

            <Accordion items={accordionItems} defaultOpenIndex={0} />

            <div className="pt-2">
              <Link href="/alex/30-min-chat">
                <Button variant="primary" size="md">
                  Experience live scheduling demo
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column: Visual UI Mockup Card */}
          <div className="lg:col-span-6">
            <div className="bg-[#fcfbf8] rounded-[24px] border border-[#d8dce0] shadow-cal-lg p-6 sm:p-8 space-y-5">
              <div className="flex items-center justify-between pb-4 border-b border-[#e4e6e9]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#071a31] text-white font-bold flex items-center justify-center">
                    A
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#071a31]">Alex Morgan</h4>
                    <p className="text-xs text-[#5f6d77]">30-Minute Consultation</p>
                  </div>
                </div>
              </div>

              {/* Mockup Date & Time Preview */}
              <div className="bg-white rounded-[16px] border border-[#e4e6e9] p-5 space-y-4">
                <div className="flex items-center justify-between text-xs text-[#5f6d77]">
                  <span className="font-semibold text-[#071a31]">Selected Slot Preview</span>
                  <span>America/New_York</span>
                </div>
                <div className="p-3 bg-[#f4f9ff] border border-[#c1defe]/60 rounded-[12px] flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-[#071a31]">Thursday, 5 Nov 2026</p>
                    <p className="text-xs text-[#5f6d77]">2:00 PM – 2:30 PM (30 min)</p>
                  </div>
                  <span className="text-xs font-semibold text-[#071a31] bg-white px-2.5 py-1 rounded-lg border border-[#c1defe]">
                    Confirmed
                  </span>
                </div>
              </div>

              <div className="text-center pt-2">
                <Link
                  href="/alex/30-min-chat"
                  className="text-xs font-semibold text-[#071a31] hover:underline"
                >
                  Test this workflow live at /alex/30-min-chat →
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
