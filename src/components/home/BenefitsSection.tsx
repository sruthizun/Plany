import React from "react";

export function BenefitsSection() {
  const useCases = [
    {
      role: "Solo Consultants & Advisors",
      summary: "Eliminate email back-and-forth and look professional from the first client interaction.",
      benefits: [
        "Single clean booking link for all client intake",
        "Clear buffers between consultation calls",
        "Automated timezone adjustments for remote clients",
      ],
    },
    {
      role: "Engineering & Technical Teams",
      summary: "Protect uninterrupted focus blocks while keeping technical reviews organized.",
      benefits: [
        "Strict daily limits prevent calendar overload",
        "Deterministic conflict prevention under concurrent requests",
        "Clear buffer times for note taking and code review",
      ],
    },
    {
      role: "Customer Success & Operations",
      summary: "Provide a seamless onboarding and review scheduling process for clients.",
      benefits: [
        "Instant confirmation with calendar invite (.ics)",
        "Pre-meeting intake questions for context",
        "Standardized durations for QBRs and syncs",
      ],
    },
    {
      role: "Global & Distributed Teams",
      summary: "Coordinate meetings across different continents without mental timezone math.",
      benefits: [
        "Automatic browser timezone detection for invitees",
        "Midnight-crossing date calculation safeguards",
        "Daylight saving time deterministic convergence",
      ],
    },
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white border-t border-[#e4e6e9]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <h2 className="type-h2 font-bold text-[#071a31]">
            Built for people whose work runs on meetings
          </h2>
          <p className="type-body-md text-[#5f6d77]">
            Plany delivers practical benefits across distinct scheduling workflows without unnecessary complexity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {useCases.map((uc, idx) => (
            <div
              key={idx}
              className="p-6 rounded-[20px] bg-[#fcfbf8] border border-[#d8dce0] hover:border-[#071a31] transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <span className="text-xs font-bold text-[#071a31] uppercase tracking-wider block">
                  Use Case {idx + 1}
                </span>
                <h3 className="text-lg font-bold text-[#071a31] tracking-tight">
                  {uc.role}
                </h3>
                <p className="text-xs sm:text-sm text-[#5f6d77] leading-relaxed">
                  {uc.summary}
                </p>
              </div>

              <div className="pt-6 mt-4 border-t border-[#e4e6e9] space-y-2">
                {uc.benefits.map((b, bIdx) => (
                  <div key={bIdx} className="flex items-start gap-2 text-xs text-[#071a31]">
                    <span className="text-[#10b981] font-bold shrink-0">✓</span>
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
