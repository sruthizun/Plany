"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { TiltedGridHero } from "@/components/ui/tilted-grid-hero";

const CDN = "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev";
const TILTED_GRID_IMAGES = [
  {
    src: `${CDN}/stock-images/767d99bb371a54d0d36751e8cecae43c.jpg`,
    alt: "Diver silhouetted inside a sunset seascape shaped like a profile",
  },
  {
    src: `${CDN}/gradients/hero_gradient/hero-gradients-01.png`,
    alt: "Soft multi-tone gradient wash",
  },
  {
    src: `${CDN}/stock-images/821d815affa6496c39cbdeeec7a84603.jpg`,
    alt: "Double-exposure portrait blended with a city skyline at dusk",
  },
  {
    src: `${CDN}/gradients/moon/moon-grade-03.png`,
    alt: "Moon-toned gradient",
  },
  {
    src: `${CDN}/stock-images/937438c560ada1c83317f2c11b3454b0.jpg`,
    alt: "Motion-blurred side-profile portrait against a deep orange backdrop",
  },
  {
    src: `${CDN}/gradients/shade_shiters/shade-shifters-05.png`,
    alt: "Shifting shade gradient",
  },
  {
    src: `${CDN}/stock-images/98f89cb9994f5c382ab964062c4039db.jpg`,
    alt: "Figure holding a racket that dissolves into a swirling colourful cloud",
  },
  {
    src: `${CDN}/gradients/shade_shiters/shade-shifters-09.png`,
    alt: "Shifting shade gradient",
  },
  {
    src: `${CDN}/stock-images/ddcbee38be8b7274e19e132d7ab35b53.jpg`,
    alt: "Hand gesture with a colourful cutout of a bird flying through the fingers",
  },
  {
    src: `${CDN}/gradients/moon/moon-grade-06.png`,
    alt: "Moon-toned gradient",
  },
];

export function HeroSection() {
  const pathname = usePathname();
  const [selectedSlotIndex, setSelectedSlotIndex] = useState(1);
  const [isCardVisible, setIsCardVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const sampleSlots = ["9:00 AM", "9:30 AM", "11:00 AM", "2:00 PM", "3:30 PM"];

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsCardVisible(true);
      return;
    }

    let isSettled = false;
    let ticking = false;

    const updateVisibility = () => {
      if (!cardRef.current || !isSettled) return;
      const rect = cardRef.current.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;

      let inTriggerArea = false;
      // In viewport bounds: top is within viewport and bottom has not completely scrolled off
      if (rect.top <= vh - 60 && rect.bottom >= 60) {
        // At the top of the page (scrollY < 30), only trigger if the card is already deep inside the screen
        if (window.scrollY >= 30 || rect.top <= vh * 0.7) {
          inTriggerArea = true;
        }
      }

      setIsCardVisible((prev) => (prev !== inTriggerArea ? inTriggerArea : prev));
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
        rootMargin: "0px 0px -60px 0px",
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

  return (
    <>
      {/* 1. Hero Section (Fits within desktop viewport, booking calendar begins below) */}
      <section className="relative overflow-hidden pt-4 pb-6 sm:pt-7 sm:pb-12 lg:pt-8 lg:pb-14 bg-[#fcfbf8] min-h-0 sm:min-h-[calc(100vh-108px)] lg:min-h-[760px] flex flex-col justify-center">
        {/* 1. Headline */}
        <div className="max-w-[860px] mx-auto text-center px-4 mb-3 sm:mb-6">
          <h1 className="text-[28px] sm:text-5xl lg:text-[54px] xl:text-[60px] font-extrabold tracking-[-0.03em] text-[#071a31] leading-[1.14] sm:leading-[1.08] text-center">
            All your scheduling handled
            <br className="hidden sm:inline" />{" "}
            with zero back-and-forth.
          </h1>
        </div>

        {/* 2. Tilted Grid Animation (84% of viewport width on desktop) */}
        <div className="w-full flex justify-center overflow-hidden mb-4 sm:mb-8">
          <div className="w-[92vw] sm:w-[84vw] max-w-[1440px]">
            <TiltedGridHero
              images={TILTED_GRID_IMAGES}
              tileHeight={42}
              axis={50}
              className="h-[185px] sm:h-[325px] lg:h-[340px] w-full"
            />
          </div>
        </div>

        {/* 3. Action Buttons */}
        <div className="relative top-0 sm:-top-[46px] flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3.5 px-4">
          <Link href="/signup" className="w-full sm:w-auto flex justify-center">
            <Button variant="primary" size="md" className="w-full max-w-[270px] sm:w-auto">
              Get started free
            </Button>
          </Link>
          <Link href="/scheduling" className="w-full sm:w-auto flex justify-center">
            <Button variant="secondary" size="md" className="w-full max-w-[270px] sm:w-auto">
              Explore scheduling
            </Button>
          </Link>
        </div>
      </section>

      {/* 2. Interactive Booking Calendar (Separate section in normal flow below the hero) */}
      <section className="relative pt-0 pb-14 sm:pb-18 lg:pb-24 bg-[#fcfbf8]">
        <div className="relative max-w-[760px] sm:max-w-[880px] lg:max-w-[1010px] mx-auto w-full px-4 sm:px-6">
          {/* Soft decorative background glow */}
          <div
            className="absolute -inset-4 bg-gradient-to-tr from-[#6bb1ff]/20 to-[#dbee9f]/25 rounded-[32px] blur-2xl -z-10"
            aria-hidden="true"
          />

          {/* Interactive Scheduling Card Mockup */}
          <div
            ref={cardRef}
            className="bg-white rounded-[24px] border border-[#d8dce0] shadow-cal-xl overflow-hidden p-6 sm:p-8 lg:p-9 motion-reduce:transition-none motion-reduce:transform-none motion-reduce:opacity-100"
            style={{
              transform: isCardVisible ? "scale(1)" : "scale(0.7)",
              opacity: 1,
              transition:
                "transform 900ms cubic-bezier(0.25, 0.1, 0.25, 1)",
              transformOrigin: "center center",
              willChange: "auto",
              backfaceVisibility: "hidden",
              WebkitFontSmoothing: "antialiased",
            }}
          >
            {/* Card Header: Host Info */}
            <div className="flex items-center justify-between pb-6 border-b border-[#e4e6e9]">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-full bg-[#071a31] text-[#fcfbf8] font-bold text-lg flex items-center justify-center shrink-0 shadow-cal-sm">
                  A
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#5f6d77] uppercase tracking-wider">
                    Alex Morgan
                  </p>
                  <h3 className="text-base sm:text-xl font-bold text-[#071a31] tracking-tight">
                    30-Minute Architecture Review
                  </h3>
                </div>
              </div>
              <Badge variant="neutral" size="sm">
                30 Min
              </Badge>
            </div>

            {/* Card Body: Interactive Slot Picker Mockup */}
            <div className="py-6 sm:py-7 grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-start">
              {/* Mini Calendar Column */}
              <div className="md:col-span-7 space-y-3.5 sm:space-y-4">
                <div className="flex items-center justify-between text-xs font-semibold text-[#071a31] px-1">
                  <span className="text-sm font-bold">November 2026</span>
                  <span className="text-[#5f6d77] text-[11px]">Select Date</span>
                </div>
                
                {/* Calendar Grid Representation */}
                <div className="grid grid-cols-7 gap-1.5 text-center text-xs">
                  {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                    <span key={i} className="text-[#748491] font-semibold py-1 text-[11px]">
                      {d}
                    </span>
                  ))}
                  {[...Array(3)].map((_, i) => (
                    <span key={`empty-${i}`} className="py-1.5 sm:py-2 text-transparent">
                      -
                    </span>
                  ))}
                  {[1, 2, 3, 4].map((day) => (
                    <span
                      key={day}
                      className="py-1.5 sm:py-2 text-[#a4aeb7] rounded-full text-xs"
                    >
                      {day}
                    </span>
                  ))}
                  {/* Active Selected Day: Nov 5 */}
                  <span className="py-1.5 sm:py-2 bg-[#071a31] text-white font-bold rounded-full text-xs shadow-cal-sm flex items-center justify-center">
                    5
                  </span>
                  {[6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((day) => (
                    <span
                      key={day}
                      className="py-1.5 sm:py-2 text-[#071a31] hover:bg-[#f4f9ff] font-medium rounded-full text-xs cursor-pointer transition-colors"
                    >
                      {day}
                    </span>
                  ))}
                </div>

                {/* Timezone pill */}
                <div className="pt-2 text-[11px] text-[#5f6d77] flex items-center gap-2 bg-[#fcfbf8] px-3 py-2 rounded-[10px] border border-[#e4e6e9]">
                  <svg className="w-3.5 h-3.5 text-[#5f6d77] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="truncate">Timezone: America/New_York (UTC-4)</span>
                </div>
              </div>

              {/* Available Slots Column */}
              <div className="md:col-span-5 space-y-2.5 sm:space-y-3 border-t md:border-t-0 md:border-l border-[#e4e6e9] md:pl-6 lg:pl-7 pt-4 md:pt-0">
                <p className="text-xs font-semibold text-[#071a31] mb-2.5">
                  Times for 5 Nov 2026:
                </p>
                <div className="space-y-2 sm:space-y-2.5">
                  {sampleSlots.map((slot, idx) => {
                    const isSelected = selectedSlotIndex === idx;
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedSlotIndex(idx)}
                        className={`w-full py-2.5 sm:py-3 px-3.5 sm:px-4 text-xs font-semibold rounded-[10px] text-left transition-all duration-150 flex items-center justify-between cursor-pointer ${
                          isSelected
                            ? "bg-[#071a31] text-[#fcfbf8] shadow-cal-sm"
                            : "bg-[#fcfbf8] text-[#071a31] border border-[#d8dce0] hover:border-[#071a31] hover:bg-white"
                        }`}
                      >
                        <span>{slot}</span>
                        {isSelected && (
                          <span className="text-[10px] bg-white/20 text-white px-2 py-0.5 rounded-md font-medium">
                            Selected
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Card Footer: Live Demo Link */}
            <div className="pt-5 border-t border-[#e4e6e9] flex items-center justify-end">
              <Link
                href="/alex/30-min-chat"
                className="text-xs font-semibold text-[#071a31] hover:text-[#0e396a] flex items-center gap-1 group"
              >
                <span>Open live booking page</span>
                <svg
                  className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
