import React from "react";

export function NotetakerSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white border-t border-[#e4e6e9]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Left Column: Recap Visual Mockup */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="bg-[#fcfbf8] rounded-[24px] border border-[#d8dce0] shadow-cal-lg p-6 sm:p-8 space-y-6">
              <div className="pb-4 border-b border-[#e4e6e9]">
                <h4 className="text-base sm:text-lg font-bold text-[#071a31]">
                  Meeting Summary:
                </h4>
                <p className="text-sm text-[#5f6d77] mt-1">
                  Duration: 30 minutes
                </p>
              </div>

              {/* Takeaways Card */}
              <div className="p-5 sm:p-6 bg-white rounded-[16px] border border-[#e4e6e9] space-y-3.5 shadow-sm">
                <p className="text-xs sm:text-sm font-bold text-[#071a31] uppercase tracking-wider">
                  KEY DECISIONS & COMMITMENTS:
                </p>
                <ul className="space-y-3 text-sm text-[#5f6d77]">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#071a31] shrink-0 mt-2" />
                    <span className="leading-relaxed">Database-level concurrency coordinator approved for all scheduling routes.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#071a31] shrink-0 mt-2" />
                    <span className="leading-relaxed">Buffer before/after settings defaulted to 10 minutes per host policy.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#071a31] shrink-0 mt-2" />
                    <span className="leading-relaxed">Export confirmed bookings to universal RFC 5545 .ics calendars.</span>
                  </li>
                </ul>
              </div>

              {/* Action Items List */}
              <div className="p-4 sm:p-5 bg-[#f5f5f7] rounded-[14px] text-sm space-y-1.5 border border-[#e4e6e9]/60">
                <span className="font-semibold text-sm sm:text-base text-[#071a31]">Action Item:</span>
                <p className="text-sm text-[#5f6d77] leading-relaxed">
                  Alex to verify timezone conversions across daylight-saving transitions before Friday.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Concept Description & Notice */}
          <div className="lg:col-span-6 order-1 lg:order-2 space-y-4">
            <h2 className="type-h2 font-bold text-[#071a31] tracking-tight">
              Actionable recaps for every conversation
            </h2>

            <p className="type-body-md text-[#5f6d77] leading-relaxed">
              Meetings are only as effective as the actions that follow. Our planned Notetaker capability explores automated transcription, structured decision extraction, and pre-drafted client follow-ups.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
