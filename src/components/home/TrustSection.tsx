'use client';

import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { TextEffect } from "@/components/ui/text-effect";

export function TrustSection() {
  const pathname = usePathname();
  const [isHeadingInView, setIsHeadingInView] = useState(false);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = headingRef.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsHeadingInView(true);
      return;
    }

    let isSettled = false;
    let ticking = false;

    const updateVisibility = () => {
      if (!headingRef.current || !isSettled) return;
      const rect = headingRef.current.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;

      // Heading enters when its top is within 85% of viewport and bottom is still visible
      // It leaves when it scrolls off the top (bottom < 30) or off the bottom (top > vh * 0.95)
      let inTriggerArea = false;
      if (rect.top <= vh * 0.85 && rect.bottom >= 30) {
        inTriggerArea = true;
      }

      setIsHeadingInView((prev) => (prev !== inTriggerArea ? inTriggerArea : prev));
    };

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          updateVisibility();
          ticking = false;
        });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    const observer = new IntersectionObserver(
      () => {
        updateVisibility();
      },
      {
        rootMargin: "0px 0px -15% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1.0],
      }
    );

    observer.observe(el);

    const rafId = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        isSettled = true;
        updateVisibility();
      });
    });

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  const capabilities = [
    {
      title: "Atomic Write-Locking",
      description: "SQLite database-level write locks prevent race conditions and cross-process double bookings.",
    },
    {
      title: "Timezone Precision",
      description: "Automatic IANA timezone resolution ensures exact meeting instants with zero date or DST drift.",
    },
    {
      title: "Intelligent Buffers",
      description: "Custom pre- and post-meeting buffer protections eliminate meeting fatigue and schedule compression.",
    },
    {
      title: "RFC 5545 Calendar Export",
      description: "Universal downloadable .ics calendar files compatible with Google Calendar and Outlook.",
    },
  ];

  return (
    <section className="bg-white border-y border-[#e4e6e9] py-16 sm:py-20 lg:py-24">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={headingRef}
          className="text-center max-w-4xl lg:max-w-5xl mx-auto mb-12 space-y-2"
        >
          <TextEffect
            as="h2"
            per="word"
            preset="blur"
            trigger={isHeadingInView}
            className="type-h2 font-bold text-[#071a31] lg:whitespace-nowrap"
          >
            Engineered for scheduling reliability, precision, and trust
          </TextEffect>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {capabilities.map((cap, index) => (
            <div
              key={index}
              className="p-6 sm:p-7 rounded-[20px] bg-white border border-[#d8dce0] shadow-cal-sm hover:shadow-cal-md transition-all flex flex-col justify-center text-center"
            >
              <h3 className="text-lg font-bold text-[#071a31] mb-2.5 tracking-tight text-center">
                {cap.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#5f6d77] leading-relaxed text-center">
                {cap.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
