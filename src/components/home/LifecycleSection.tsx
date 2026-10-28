"use client";

import React, { useState } from "react";

interface FeatureItem {
  id: number;
  title: string;
  image: string;
  width: number;
  height: number;
}

const FEATURES: FeatureItem[] = [
  {
    id: 1,
    title: "Share Availability",
    image: "/share-availability.png",
    width: 1251,
    height: 797,
  },
  {
    id: 2,
    title: "Book in Seconds",
    image: "/book-in-seconds.png",
    width: 1247,
    height: 792,
  },
  {
    id: 3,
    title: "Prepare with Context",
    image: "/prepare-with-context.png",
    width: 1670,
    height: 941,
  },
  {
    id: 4,
    title: "Sync & Export",
    image: "/sync-export.png",
    width: 1670,
    height: 942,
  },
];

export function LifecycleSection() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectedFeature = FEATURES[selectedIndex];

  return (
    <section id="lifecycle" className="py-16 sm:py-20 lg:py-24 bg-[#fcfbf8]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-3">
          <h2 className="type-h2 font-bold text-[#071a31]">
            Every stage of scheduling, effortlessly coordinated
          </h2>
          <p className="type-body-md text-[#5f6d77]">
            Plany handles the coordination busywork before and after your call, so you have more focus for what truly matters.
          </p>
        </div>

        {/* Two-column layout on desktop; stacked on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left: 4 Clickable Feature Labels */}
          <div className="lg:col-span-5 flex flex-col gap-3.5 sm:gap-4">
            {FEATURES.map((feature, idx) => {
              const isActive = selectedIndex === idx;
              return (
                <div key={feature.id} className="flex flex-col">
                  <button
                    type="button"
                    onClick={() => setSelectedIndex(idx)}
                    aria-selected={isActive}
                    className={`w-full text-left p-4 sm:p-5 rounded-[16px] sm:rounded-[20px] transition-all duration-200 cursor-pointer flex items-center justify-between border ${
                      isActive
                        ? "border-[#071a31] bg-white shadow-cal-sm"
                        : "border-transparent bg-transparent hover:bg-white/60 hover:border-[#d8dce0]"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      {/* Number circle */}
                      <span
                        className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm shrink-0 transition-colors duration-200 ${
                          isActive
                            ? "bg-[#071a31] text-[#fcfbf8]"
                            : "bg-[#e4e6e9] text-[#5f6d77]"
                        }`}
                      >
                        {feature.id}
                      </span>
                      {/* Label */}
                      <span
                        className={`text-base sm:text-lg tracking-tight transition-colors duration-200 ${
                          isActive
                            ? "text-[#071a31] font-bold"
                            : "text-[#5f6d77] font-medium hover:text-[#071a31]"
                        }`}
                      >
                        {feature.title}
                      </span>
                    </div>

                    {/* Right chevron indicator when active */}
                    <div
                      className={`transition-opacity duration-200 ${
                        isActive ? "opacity-100" : "opacity-0"
                      }`}
                      aria-hidden="true"
                    >
                      <svg
                        className="w-4 h-4 text-[#071a31]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </button>

                  {/* Mobile expansion: show image underneath the active feature label */}
                  {isActive && (
                    <div className="lg:hidden mt-3 p-2.5 bg-white rounded-[18px] border border-[#d8dce0] shadow-cal-sm animate-feature-panel">
                      <div className="overflow-hidden rounded-[14px] bg-[#fcfbf8] flex items-center justify-center">
                        <img
                          src={feature.image}
                          alt={feature.title}
                          className="w-full h-auto object-contain rounded-[12px]"
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right: Large Sticky Preview Panel on Desktop */}
          <div className="hidden lg:block lg:col-span-7 sticky top-28">
            <div className="bg-white rounded-[24px] border border-[#d8dce0] shadow-cal-xl overflow-hidden p-4 sm:p-5 lg:p-6 transition-all duration-300">
              <div
                key={selectedFeature.id}
                className="animate-feature-panel overflow-hidden rounded-[16px] bg-[#fcfbf8] border border-[#e4e6e9]/70 flex items-center justify-center"
              >
                <img
                  src={selectedFeature.image}
                  alt={selectedFeature.title}
                  className="w-full h-auto object-contain rounded-[14px]"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
