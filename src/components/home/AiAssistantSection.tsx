import React from "react";

export function AiAssistantSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-[#fcfbf8] border-t border-[#e4e6e9]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Left Column: Vision & Explanation */}
          <div className="lg:col-span-6 space-y-5">
            <h2 className="type-h2 font-bold text-[#071a31] tracking-tight">
              Conversational scheduling with Callie<br />AI
            </h2>

            <p className="text-base text-[#5f6d77] leading-relaxed">
              Instead of manually copying and pasting calendar links into email threads, our upcoming Callie AI assistant is planned to negotiate mutually available meeting slots through natural conversation.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-[#071a31] shrink-0 mt-2" />
                <div>
                  <h4 className="text-base font-semibold text-[#071a31]">In-Thread Scheduling</h4>
                  <p className="text-sm text-[#5f6d77] leading-relaxed mt-0.5">
                    CC the assistant on an active email discussion to trigger availability lookups.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-[#071a31] shrink-0 mt-2" />
                <div>
                  <h4 className="text-base font-semibold text-[#071a31]">Context-Aware Slot Proposals</h4>
                  <p className="text-sm text-[#5f6d77] leading-relaxed mt-0.5">
                    Evaluates both attendees&apos; working hours, buffers, and timezones before suggesting times.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Email Thread Mockup */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-[20px] border border-[#d8dce0] shadow-cal-md p-6 sm:p-7 space-y-4">
              {/* Message 1 */}
              <div className="p-4 bg-[#fcfbf8] rounded-[14px] border border-[#e4e6e9] text-sm space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-[#071a31]">Alex Morgan</span>
                  <span className="text-xs text-[#748491]">10:15 AM</span>
                </div>
                <p className="text-[#5f6d77] leading-relaxed">
                  &ldquo;Hey Jordan, looping in{" "}
                  <a
                    href="mailto:callie@plany.app"
                    className="font-semibold text-[#1e5ea7] hover:underline"
                  >
                    callie@plany.app
                  </a>{" "}
                  to coordinate 30 minutes next Tuesday or Wednesday.&rdquo;
                </p>
              </div>

              {/* Message 2: AI Response */}
              <div className="p-4 bg-[#f4f9ff] rounded-[14px] border border-[#c1defe]/60 text-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-[#071a31]">Callie Assistant</span>
                  <span className="text-xs text-[#748491]">10:16 AM</span>
                </div>
                <p className="text-[#071a31] font-medium">
                  I found 3 mutual openings for Alex and Jordan:
                </p>
                <div className="space-y-2">
                  <div className="px-3.5 py-2.5 bg-white rounded-[8px] border border-[#c1defe] font-medium text-[#071a31] text-sm shadow-sm">
                    Tuesday, Nov 10 at 10:00 AM EDT
                  </div>
                  <div className="px-3.5 py-2.5 bg-white rounded-[8px] border border-[#c1defe] font-medium text-[#071a31] text-sm shadow-sm">
                    Wednesday, Nov 11 at 2:00 PM EDT
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

