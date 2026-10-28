"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Accordion, AccordionItemData } from "@/components/ui/Accordion";

export type IntegrationStatus = "Available now" | "Planned" | "In planning";

export interface IntegrationDetailProps {
  name: string;
  category: string;
  status: IntegrationStatus;
  statusVariant?: "success" | "neutral" | "warning" | "info";
  tagline: string;
  description: string;
  currentCapabilitiesTitle?: string;
  currentCapabilities: string[];
  limitationsTitle?: string;
  limitations: string[];
  workflowTitle?: string;
  workflowSubtitle?: string;
  workflowSteps: Array<{
    step: string;
    title: string;
    description: string;
    badge: string;
  }>;
  technicalSpecs?: Array<{
    label: string;
    value: string;
  }>;
  faqItems: AccordionItemData[];
  ctaHeadline?: string;
  ctaDescription?: string;
  isAvailableNow?: boolean;
}

export function IntegrationDetailLayout({
  name,
  category,
  status,
  statusVariant = status === "Available now" ? "success" : "neutral",
  tagline,
  description,
  currentCapabilitiesTitle = "What works in the current release",
  currentCapabilities,
  limitationsTitle = "Planned capabilities & scope boundaries",
  limitations,
  workflowTitle = "How this integration fits into the workflow",
  workflowSubtitle = "Step-by-step breakdown of how Plany interacts with this service.",
  workflowSteps,
  technicalSpecs,
  faqItems,
  ctaHeadline,
  ctaDescription,
  isAvailableNow = status === "Available now",
}: IntegrationDetailProps) {
  return (
    <main className="min-h-screen bg-[#fcfbf8] text-[#071a31] pb-24">
      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-[#e4e6e9]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center gap-2 text-xs text-[#5f6d77]">
          <Link href="/integrations" className="hover:text-[#071a31] transition-colors">
            Integrations Directory
          </Link>
          <span>/</span>
          <span className="text-[#748491]">{category}</span>
          <span>/</span>
          <span className="font-semibold text-[#071a31]">{name}</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="pt-10 pb-16 sm:pt-14 sm:pb-20 bg-[#fcfbf8] border-b border-[#e4e6e9]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column */}
            <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
                <Badge variant={statusVariant} size="sm" dot>
                  {status}
                </Badge>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#f1f3f5] text-[#5f6d77] border border-[#d8dce0]">
                  {category}
                </span>
                {!isAvailableNow && (
                  <span className="text-xs text-[#748491] font-medium hidden sm:inline">
                    • In development roadmap
                  </span>
                )}
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-[48px] font-extrabold tracking-[-0.03em] text-[#071a31] leading-[1.12]">
                {name}
              </h1>

              <p className="text-lg sm:text-xl font-medium text-[#071a31]">
                {tagline}
              </p>

              <p className="type-body-md text-[#5f6d77] max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                {description}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <Link href="/alex/30-min-chat" className="w-full sm:w-auto">
                  <Button variant="primary" size="lg" fullWidth>
                    Try Live Booking Demo
                  </Button>
                </Link>
                <Link href="/integrations" className="w-full sm:w-auto">
                  <Button variant="secondary" size="lg" fullWidth>
                    ← All Integrations
                  </Button>
                </Link>
              </div>

              <p className="text-xs text-[#748491]">
                {isAvailableNow
                  ? "Standard RFC 5545 format • Works natively across desktop & mobile calendar apps"
                  : "Transparent architecture documentation • Planned future capability"}
              </p>
            </div>

            {/* Right Column: Status & Spec Card */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-[24px] border border-[#d8dce0] shadow-cal-md p-6 sm:p-7 space-y-5">
                <div className="flex items-center justify-between pb-4 border-b border-[#e4e6e9]">
                  <div>
                    <span className="text-xs font-semibold text-[#748491] uppercase tracking-wider">
                      Integration Status
                    </span>
                    <h3 className="text-lg font-bold text-[#071a31]">{name}</h3>
                  </div>
                  <Badge variant={statusVariant} size="sm">
                    {status}
                  </Badge>
                </div>

                {technicalSpecs && technicalSpecs.length > 0 && (
                  <div className="space-y-3">
                    <p className="text-xs font-semibold text-[#748491] uppercase tracking-wider">
                      Technical Specifications
                    </p>
                    <div className="space-y-2">
                      {technicalSpecs.map((spec, idx) => (
                        <div
                          key={idx}
                          className="p-3 bg-[#fcfbf8] rounded-[10px] border border-[#e4e6e9] flex items-center justify-between text-xs"
                        >
                          <span className="font-semibold text-[#071a31]">{spec.label}</span>
                          <span className="text-[#5f6d77] font-mono text-[11px]">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div
                  className={`p-4 rounded-[14px] text-xs space-y-1 ${
                    isAvailableNow
                      ? "bg-[#eef8ee] border border-[#c4eec4] text-[#1e5822]"
                      : "bg-[#f4f9ff] border border-[#c1defe]/70 text-[#1e5ea7]"
                  }`}
                >
                  <p className="font-bold">
                    {isAvailableNow ? "✓ Verified Active Capability" : "ℹ Roadmap Specification"}
                  </p>
                  <p className="text-xs leading-relaxed text-[#5f6d77]">
                    {isAvailableNow
                      ? "This feature is fully implemented and tested in the current release. Test it live at /alex/30-min-chat."
                      : "Direct third-party OAuth connections are planned. Plany does not currently claim active API connections to this service."}
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Capabilities & Scope Comparison Section */}
      <section className="py-16 sm:py-20 bg-white border-b border-[#e4e6e9]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="type-h2 font-bold text-[#071a31]">
              Capabilities & Scope Boundaries
            </h2>
            <p className="type-body-md text-[#5f6d77]">
              Clear distinction between what operates in the current release versus planned additions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left: What Works Now */}
            <div className="p-6 sm:p-7 rounded-[20px] bg-[#fcfbf8] border border-[#d8dce0] space-y-4 shadow-cal-sm">
              <div className="flex items-center gap-2 text-xs font-bold text-[#10b981]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]" />
                <span className="uppercase tracking-wider">{currentCapabilitiesTitle}</span>
              </div>
              <ul className="space-y-3">
                {currentCapabilities.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#071a31]">
                    <span className="text-[#10b981] font-bold mt-0.5">✓</span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: What is Planned / Not Supported */}
            <div className="p-6 sm:p-7 rounded-[20px] bg-[#fcfbf8] border border-[#d8dce0] space-y-4 shadow-cal-sm">
              <div className="flex items-center gap-2 text-xs font-bold text-[#748491]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#94a3b8]" />
                <span className="uppercase tracking-wider">{limitationsTitle}</span>
              </div>
              <ul className="space-y-3">
                {limitations.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#5f6d77]">
                    <span className="text-[#748491] font-semibold mt-0.5">•</span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="py-16 sm:py-20 bg-[#fcfbf8] border-b border-[#e4e6e9]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="type-h2 font-bold text-[#071a31]">{workflowTitle}</h2>
            <p className="type-body-md text-[#5f6d77]">{workflowSubtitle}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {workflowSteps.map((step, idx) => (
              <div
                key={idx}
                className="relative p-6 sm:p-7 rounded-[20px] bg-[#0e396a] border border-[#1e5ea7]/50 shadow-cal-sm hover:shadow-cal-md hover:border-[#6bb1ff] hover:bg-[#114580] transition-all flex flex-col justify-between"
              >
                <div className="text-center">
                  <h3 className="text-lg font-bold text-white mb-2.5 tracking-tight text-center">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#eaf2fb] leading-relaxed text-center">
                    {step.description}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-[#1e5ea7]/60 flex items-center justify-between text-xs">
                  <span className="text-[11px] font-semibold text-[#eaf2fb] bg-[#071a31]/60 px-2.5 py-1 rounded-full border border-[#1e5ea7] tracking-normal">
                    {step.badge}
                  </span>
                  <span className="text-xs font-semibold text-[#c1defe]">
                    Step {idx + 1} of 4
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 sm:py-20 bg-white border-b border-[#e4e6e9]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="type-h2 font-bold text-[#071a31]">
              {name} Integration FAQ
            </h2>
            <p className="type-body-md text-[#5f6d77]">
              Technical and scheduling details regarding {name}.
            </p>
          </div>

          <div className="max-w-3xl mx-auto bg-[#fcfbf8] rounded-[20px] border border-[#d8dce0] shadow-cal-sm p-6 sm:p-8">
            <Accordion items={faqItems} defaultOpenIndex={0} />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 mt-16 sm:mt-20">
        <div className="bg-[#071a31] text-[#fcfbf8] rounded-[24px] p-8 sm:p-12 text-center space-y-6 shadow-cal-xl">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white max-w-2xl mx-auto leading-tight">
            {ctaHeadline || `Ready to test Plany's live scheduling flow?`}
          </h2>
          <p className="text-sm sm:text-base text-[#c1defe]/90 max-w-xl mx-auto leading-relaxed">
            {ctaDescription ||
              "Experience how Plany coordinates slots, avoids double-bookings, and delivers instant calendar files."}
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Link href="/alex/30-min-chat" className="w-full sm:w-auto">
              <Button variant="inverse" size="lg" className="w-full sm:w-auto">
                Test Live Booking Demo
              </Button>
            </Link>
            <Link href="/integrations" className="w-full sm:w-auto">
              <Button variant="outline-light" size="lg" className="w-full sm:w-auto">
                Browse Integrations Directory
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
