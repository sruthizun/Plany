"use client";

import React from "react";
import { Tabs } from "@/components/ui/Tabs";
import { Badge } from "@/components/ui/Badge";

export function ProductOverviewSection() {
  const tabs = [
    {
      id: "availability",
      label: "Availability Engine",
      content: (
        <div className="bg-white rounded-[20px] border border-[#d8dce0] shadow-cal-md p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-6 space-y-4">
            <div>
              <Badge variant="default" size="sm">
                Core Scheduling
              </Badge>
            </div>
            <h3 className="type-h3 font-bold text-[#071a31]">
              Full control over when you are available
            </h3>
            <p className="text-base text-[#5f6d77] leading-relaxed">
              Define your regular working hours, blackout weekends, and let Plany dynamically compute available time slots. Confirmed bookings are instantly removed from future availability to prevent overbooking.
            </p>
            <ul className="space-y-2.5 text-sm font-medium text-[#071a31]">
              <li className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#071a31] shrink-0" />
                Granular daily schedules (e.g. 9:00 AM – 5:00 PM)
              </li>
              <li className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#071a31] shrink-0" />
                Automated weekend and off-hour filtering
              </li>
              <li className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#071a31] shrink-0" />
                Dynamic slot intervals matching event duration
              </li>
            </ul>
          </div>

          <div className="lg:col-span-6 bg-[#fcfbf8] rounded-[16px] border border-[#e4e6e9] p-5 space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-[#e4e6e9] text-xs font-semibold text-[#071a31]">
              <span>Host Working Schedule</span>
            </div>
            {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day, idx) => (
              <div
                key={day}
                className="flex items-center justify-between py-1.5 px-3 rounded-[8px] bg-white border border-[#e4e6e9] text-xs"
              >
                <span className="font-medium text-[#071a31]">{day}</span>
                <span className="text-[#5f6d77]">9:00 AM – 5:00 PM</span>
              </div>
            ))}
            <div className="flex items-center justify-between py-1.5 px-3 rounded-[8px] bg-[#f5f5f7] text-xs text-[#748491]">
              <span>Saturday & Sunday</span>
              <span className="italic">Unavailable</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "buffers",
      label: "Buffer Times",
      content: (
        <div className="bg-white rounded-[20px] border border-[#d8dce0] shadow-cal-md p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-6 space-y-4">
            <div>
              <Badge variant="default" size="sm">
                Meeting Fatigue Shield
              </Badge>
            </div>
            <h3 className="type-h3 font-bold text-[#071a31]">
              Smart pre- and post-meeting padding
            </h3>
            <p className="text-base text-[#5f6d77] leading-relaxed">
              Back-to-back meetings without pause lead to fatigue and rushed handoffs. Plany allows you to automatically attach buffer times before and after appointments, blocking overlapping bookings that cut into your prep time.
            </p>
            <ul className="space-y-2.5 text-sm font-medium text-[#071a31]">
              <li className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#071a31] shrink-0" />
                Customizable buffer before (e.g. 10 min prep)
              </li>
              <li className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#071a31] shrink-0" />
                Customizable buffer after (e.g. 15 min wrap-up)
              </li>
              <li className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#071a31] shrink-0" />
                Enforced concurrently during booking creation
              </li>
            </ul>
          </div>

          <div className="lg:col-span-6 bg-[#fcfbf8] rounded-[16px] border border-[#e4e6e9] p-5 space-y-3.5">
            <div className="pb-3 border-b border-[#e4e6e9] text-xs font-semibold text-[#071a31]">
              <span>Protected Timeline Example</span>
            </div>
            <div className="space-y-2.5">
              <div className="p-2.5 rounded-[10px] bg-white border border-[#e4e6e9] text-xs flex items-center justify-between">
                <span className="text-sm font-medium text-[#071a31]">10 Min Pre-Meeting Buffer</span>
                <span className="text-xs text-[#5f6d77]">1:50 PM – 2:00 PM</span>
              </div>
              <div className="p-3.5 rounded-[12px] bg-[#071a31] text-[#fcfbf8] text-xs flex items-center justify-between shadow-cal-sm">
                <div>
                  <p className="text-sm font-bold text-[#fcfbf8]">30-Minute Architecture Review</p>
                  <p className="text-[11px] text-[#fcfbf8]/70">Confirmed Meeting</p>
                </div>
                <span className="text-xs text-[#fcfbf8]/90">2:00 PM – 2:30 PM</span>
              </div>
              <div className="p-2.5 rounded-[10px] bg-white border border-[#e4e6e9] text-xs flex items-center justify-between">
                <span className="text-sm font-medium text-[#071a31]">15 Min Post-Meeting Buffer</span>
                <span className="text-xs text-[#5f6d77]">2:30 PM – 2:45 PM</span>
              </div>
            </div>
            <div className="pt-2 border-t border-[#e4e6e9]">
              <p className="text-xs text-[#5f6d77] italic text-center">
                Next available booking slot automatically opens at 2:45 PM.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "timezones",
      label: "Timezone Engine",
      content: (
        <div className="bg-white rounded-[20px] border border-[#d8dce0] shadow-cal-md p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-6 space-y-4">
            <div>
              <Badge variant="default" size="sm">
                Global Coordination
              </Badge>
            </div>
            <h3 className="type-h3 font-bold text-[#071a31]">
              Flawless cross-border time conversion
            </h3>
            <p className="text-base text-[#5f6d77] leading-relaxed">
              Never calculate GMT offsets or DST discrepancies in your head. Plany detects the invitee&apos;s browser timezone automatically, converts availability on the fly, and flags slots that cross midnight cleanly.
            </p>
            <ul className="space-y-2.5 text-sm font-medium text-[#071a31]">
              <li className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#071a31] shrink-0" />
                Browser timezone auto-detection on initial load
              </li>
              <li className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#071a31] shrink-0" />
                Drop-down switcher across global IANA timezones
              </li>
              <li className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#071a31] shrink-0" />
                Exact UTC instant preservation on change
              </li>
            </ul>
          </div>

          <div className="lg:col-span-6 bg-[#fcfbf8] rounded-[16px] border border-[#e4e6e9] p-5 space-y-3.5">
            <div className="pb-3 border-b border-[#e4e6e9] text-xs font-semibold text-[#071a31]">
              <span>Simultaneous Instant Representation</span>
            </div>
            <div className="space-y-2.5">
              <div className="p-3 rounded-[10px] bg-white border border-[#e4e6e9] flex items-center justify-between text-xs">
                <div>
                  <p className="text-sm font-semibold text-[#071a31]">Host (New York)</p>
                  <p className="text-xs text-[#5f6d77]">America/New_York</p>
                </div>
                <span className="text-xs text-[#071a31]">10:00 AM</span>
              </div>
              <div className="p-3 rounded-[10px] bg-white border border-[#e4e6e9] flex items-center justify-between text-xs">
                <div>
                  <p className="text-sm font-semibold text-[#071a31]">Invitee (London)</p>
                  <p className="text-xs text-[#5f6d77]">Europe/London</p>
                </div>
                <span className="text-xs text-[#071a31]">3:00 PM</span>
              </div>
              <div className="p-3 rounded-[10px] bg-white border border-[#e4e6e9] flex items-center justify-between text-xs">
                <div>
                  <p className="text-sm font-semibold text-[#071a31]">Invitee (Tokyo)</p>
                  <p className="text-xs text-[#5f6d77]">Asia/Tokyo</p>
                </div>
                <span className="text-xs text-[#071a31]">11:00 PM</span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="overview" className="py-16 sm:py-20 lg:py-24 bg-[#f5f3ee] border-t border-[#e4e6e9]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <h2 className="type-h2 font-bold text-[#071a31]">
            Designed to remove friction from every meeting workflow
          </h2>
          <p className="type-body-md text-[#5f6d77]">
            Explore how Plany&apos;s scheduling engine manages calendar coordination, buffers, and timezones automatically.
          </p>
        </div>

        <Tabs tabs={tabs} defaultTabId="availability" variant="pills" />
      </div>
    </section>
  );
}
