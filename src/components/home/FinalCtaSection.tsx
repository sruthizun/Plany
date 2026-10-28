import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function FinalCtaSection() {
  return (
    <section className="bg-[#071a31] text-[#fcfbf8] py-16 sm:py-20 lg:py-24 relative overflow-hidden">
      {/* Subtle radial background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#1e5ea7]/20 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
        <h2 className="type-huge font-bold tracking-tight text-white max-w-2xl mx-auto leading-tight">
          From the first meeting to the follow-up.
        </h2>

        <p className="type-body-lg text-[#c1defe]/90 max-w-xl mx-auto leading-relaxed">
          All the coordination around your meetings, handled in one place. Share your link, eliminate back-and-forth emails, and let your invitees book effortlessly.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4">
          <Link href="/alex/30-min-chat" className="w-full sm:w-auto">
            <Button
              variant="inverse"
              size="lg"
              className="w-full sm:w-auto"
            >
              Get started free
            </Button>
          </Link>
          <Link href="/preview" className="w-full sm:w-auto">
            <Button variant="outline-light" size="lg" className="w-full sm:w-auto">
              View Design System
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
