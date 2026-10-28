import React from "react";
import { Badge } from "@/components/ui/Badge";

export function PaymentsSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-[#f5f3ee] border-t border-[#e4e6e9]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Left Column: Heading, Description, and Payment Preview Card */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <h2 className="type-h2 font-bold text-[#071a31] tracking-tight">
                Flexible payment options for your consultations
              </h2>

              <p className="type-body-md text-[#5f6d77] leading-relaxed mt-4">
                For coaches, attorneys, and specialized consultants, reducing no-shows means collecting payment upfront. Plany&apos;s product roadmap includes native payment flows where clients can book and pay in a single seamless step.
              </p>
            </div>

            {/* Payment Preview Card */}
            <div className="bg-white rounded-[20px] border border-[#d8dce0] shadow-cal-md p-6 sm:p-7 space-y-4">
              <div className="flex items-center justify-between pb-3.5 border-b border-[#e4e6e9]">
                <div>
                  <h4 className="text-base font-bold text-[#071a31]">60-Minute Strategy Session</h4>
                  <p className="text-xs sm:text-sm text-[#5f6d77] mt-1">Consultation with Alex Morgan</p>
                </div>
                <Badge variant="neutral">Planned Checkout</Badge>
              </div>

              <div className="p-4 sm:p-5 rounded-[14px] bg-[#fcfbf8] border border-[#e4e6e9] space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#5f6d77]">Session Fee:</span>
                  <span className="font-bold text-[#071a31] text-base">$150.00</span>
                </div>
                <div className="flex items-center justify-between text-sm pt-3 border-t border-[#e4e6e9]">
                  <span className="text-[#5f6d77]">Payment Gateway:</span>
                  <span className="font-bold text-[#071a31] text-base">Razor pay</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Three Enlarged Informational Cards */}
          <div className="lg:col-span-6 space-y-4">
            <div className="p-5 sm:p-6 bg-white rounded-[16px] border border-[#e4e6e9] shadow-sm space-y-1.5">
              <h4 className="text-base font-bold text-[#071a31]">Upfront Deposits:</h4>
              <p className="text-sm sm:text-[15px] text-[#5f6d77] leading-relaxed">
                Require a deposit or full session fee before confirming the calendar invite.
              </p>
            </div>

            <div className="p-5 sm:p-6 bg-white rounded-[16px] border border-[#e4e6e9] shadow-sm space-y-1.5">
              <h4 className="text-base font-bold text-[#071a31]">Automated Invoicing:</h4>
              <p className="text-sm sm:text-[15px] text-[#5f6d77] leading-relaxed">
                Attach billing receipts directly to the confirmed meeting record.
              </p>
            </div>

            <div className="p-5 sm:p-6 bg-white rounded-[16px] border border-[#e4e6e9] shadow-sm space-y-1.5">
              <h4 className="text-base font-bold text-[#071a31]">Current Capability Note:</h4>
              <p className="text-sm sm:text-[15px] text-[#5f6d77] leading-relaxed">
                Payment gateways are currently in architectural planning. Live booking routes in this release do not process credit cards or accept fees.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
