"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Accordion, AccordionItemData } from "@/components/ui/Accordion";

export interface UseCaseItem {
  title: string;
  description: string;
  badge?: string;
  icon?: React.ReactNode;
}

export interface WorkflowStep {
  step: string;
  title: string;
  description: string;
  badge: string;
}

export interface ActiveFeatureItem {
  title: string;
  description: string;
  tag: string;
}

export interface RoadmapItem {
  title: string;
  status: "Planned" | "Under Research" | "Roadmap";
  description: string;
}

export interface SolutionsPageProps {
  audienceName: string;
  badgeText: string;
  headline: string;
  description: string;
  heroMockup: {
    eventTitle: string;
    hostName: string;
    duration: string;
    highlights: Array<{ label: string; value: string }>;
    securityNote: string;
  };
  useCasesTitle: string;
  useCasesSubtitle: string;
  useCases: UseCaseItem[];
  workflowTitle: string;
  workflowSubtitle: string;
  workflowSteps: WorkflowStep[];
  activeFeatures: ActiveFeatureItem[];
  limitationsTitle: string;
  limitationsSubtitle: string;
  activeStatusSummary: string;
  roadmapItems: RoadmapItem[];
  faqItems: AccordionItemData[];
  ctaHeadline: string;
  ctaDescription: string;
  workflowCardTheme?: "navy" | "light";
  hideFeatureDots?: boolean;
}

export function SolutionsPageLayout({
  audienceName,
  badgeText,
  headline,
  description,
  heroMockup,
  useCasesTitle,
  useCasesSubtitle,
  useCases,
  workflowTitle,
  workflowSubtitle,
  workflowSteps,
  activeFeatures,
  limitationsTitle,
  limitationsSubtitle,
  activeStatusSummary,
  roadmapItems,
  faqItems,
  ctaHeadline,
  ctaDescription,
  workflowCardTheme,
  hideFeatureDots,
}: SolutionsPageProps) {
  const isSmallBusiness = audienceName === "Small Business";
  const isLightWorkflow = workflowCardTheme === "light" || isSmallBusiness;
  const shouldHideFeatureDots = hideFeatureDots ?? isSmallBusiness;
  return (
    <main className="min-h-screen bg-[#fcfbf8] text-[#071a31] pb-24">
      {/* =========================================================================
          Section 1: Hero Section
          ========================================================================= */}
      <section className="pt-12 pb-16 sm:pt-16 sm:pb-24 lg:pt-20 lg:pb-28 bg-[#fcfbf8] border-b border-[#e4e6e9]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
            
            {/* Left Column: Heading and CTAs */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2">
                <Badge variant="info" size="sm" dot>
                  {badgeText}
                </Badge>
                <span className="text-xs text-[#5f6d77] font-medium hidden sm:inline">
                  Solutions for {audienceName}
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold tracking-[-0.03em] text-[#071a31] leading-[1.1]">
                {headline}
              </h1>

              <p className="type-body-xl text-[#5f6d77] max-w-xl mx-auto lg:mx-0 leading-relaxed">
                {description}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <Link href="/alex/30-min-chat" className="w-full sm:w-auto">
                  <Button variant="primary" size="lg" fullWidth>
                    Try Live Booking Demo
                  </Button>
                </Link>
                <a href="#use-cases" className="w-full sm:w-auto">
                  <Button variant="secondary" size="lg" fullWidth>
                    Explore Use Cases
                  </Button>
                </a>
              </div>

              <p className="text-xs text-[#748491]">
                Verified live booking flow • Powered by SQLite atomic concurrency
              </p>
            </div>

            {/* Right Column: Audience-Specific Hero Mockup */}
            <div className="lg:col-span-6">
              <div className="bg-white rounded-[24px] border border-[#d8dce0] shadow-cal-xl p-6 sm:p-8 space-y-5">
                <div className="flex items-center justify-between pb-5 border-b border-[#e4e6e9]">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-[#071a31] text-white font-bold flex items-center justify-center text-lg shadow-cal-sm">
                      {heroMockup.hostName.charAt(0)}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#5f6d77] uppercase tracking-wider">
                        {heroMockup.hostName}
                      </p>
                      <h3 className="text-base sm:text-lg font-bold text-[#071a31]">
                        {heroMockup.eventTitle}
                      </h3>
                    </div>
                  </div>
                  <Badge variant="neutral" size="sm">
                    {heroMockup.duration}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                  {heroMockup.highlights.map((item, idx) => (
                    <div key={idx} className="p-3.5 bg-[#fcfbf8] rounded-[12px] border border-[#e4e6e9] space-y-1">
                      <span className="font-semibold text-[#071a31]">{item.label}</span>
                      <p className="text-[#5f6d77] leading-tight">{item.value}</p>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-[#f4f9ff] border border-[#c1defe]/60 rounded-[14px] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]" />
                    <span className="font-semibold text-[#071a31]">{heroMockup.securityNote}</span>
                  </div>
                  <Badge variant="success" size="sm">Live</Badge>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          Section 2: Audience Use Cases & Benefits
          ========================================================================= */}
      <section id="use-cases" className="py-16 sm:py-20 lg:py-24 bg-white border-b border-[#e4e6e9]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="type-h2 font-bold text-[#071a31]">
              {useCasesTitle}
            </h2>
            <p className="type-body-md text-[#5f6d77]">
              {useCasesSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {useCases.map((useCase, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-7 rounded-[20px] bg-[#fcfbf8] border border-[#d8dce0] shadow-cal-sm hover:shadow-cal-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-[12px] bg-[#e8f1fd] text-[#006bff] flex items-center justify-center font-bold text-sm">
                      {useCase.icon || `0${idx + 1}`}
                    </div>
                    {useCase.badge && (
                      <Badge variant="info" size="sm">
                        {useCase.badge}
                      </Badge>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-[#071a31]">
                    {useCase.title}
                  </h3>
                  <p className="text-sm text-[#5f6d77] leading-relaxed">
                    {useCase.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          Section 3: Tailored Workflow
          ========================================================================= */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#fcfbf8] border-b border-[#e4e6e9]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="type-h2 font-bold text-[#071a31]">
              {workflowTitle}
            </h2>
            <p className="type-body-md text-[#5f6d77]">
              {workflowSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {workflowSteps.map((step, idx) => (
              <div
                key={idx}
                className={
                  isLightWorkflow
                    ? "relative p-6 sm:p-7 rounded-[20px] bg-white border border-[#d8dce0] shadow-cal-sm hover:shadow-cal-md transition-all flex flex-col justify-between"
                    : "relative p-6 sm:p-7 rounded-[20px] bg-[#0e396a] border border-[#1e5ea7]/50 shadow-cal-sm hover:shadow-cal-md hover:border-[#6bb1ff] hover:bg-[#114580] transition-all flex flex-col justify-between"
                }
              >
                <div className="text-center">
                  <h3
                    className={
                      isLightWorkflow
                        ? "text-lg font-bold text-[#071a31] mb-2.5 tracking-tight text-center"
                        : "text-lg font-bold text-white mb-2.5 tracking-tight text-center"
                    }
                  >
                    {step.title}
                  </h3>
                  <p
                    className={
                      isLightWorkflow
                        ? "text-xs sm:text-sm text-[#5f6d77] leading-relaxed text-center"
                        : "text-xs sm:text-sm text-[#eaf2fb] leading-relaxed text-center"
                    }
                  >
                    {step.description}
                  </p>
                </div>

                <div
                  className={
                    isLightWorkflow
                      ? "pt-4 mt-6 border-t border-[#e4e6e9] flex items-center justify-between text-xs"
                      : "pt-4 mt-6 border-t border-[#1e5ea7]/60 flex items-center justify-between text-xs"
                  }
                >
                  <span
                    className={
                      isLightWorkflow
                        ? "text-[11px] font-semibold text-[#071a31] bg-[#f5f5f7] px-2.5 py-1 rounded-full border border-[#d8dce0] tracking-normal"
                        : "text-[11px] font-semibold text-[#eaf2fb] bg-[#071a31]/60 px-2.5 py-1 rounded-full border border-[#1e5ea7] tracking-normal"
                    }
                  >
                    {step.badge}
                  </span>
                  <span
                    className={
                      isLightWorkflow
                        ? "text-xs font-semibold text-[#5f6d77]"
                        : "text-xs font-semibold text-[#c1defe]"
                    }
                  >
                    Step {idx + 1} of 4
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          Section 4: Active Feature Capabilities
          ========================================================================= */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white border-b border-[#e4e6e9]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <Badge variant="success" size="sm" dot>
              Current Core Capabilities
            </Badge>
            <h2 className="type-h2 font-bold text-[#071a31]">
              Built on verified scheduling infrastructure
            </h2>
            <p className="type-body-md text-[#5f6d77]">
              Every solution page is backed by our production-tested booking engine.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {activeFeatures.map((feat, idx) => (
              <div
                key={idx}
                className="p-6 rounded-[20px] bg-[#fcfbf8] border border-[#d8dce0] space-y-3 shadow-cal-sm"
              >
                <div className={shouldHideFeatureDots ? "flex items-center justify-end" : "flex items-center justify-between"}>
                  {!shouldHideFeatureDots && <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]" />}
                  <span className="text-[11px] font-semibold text-[#1e5ea7] bg-[#e8f1fd] px-2 py-0.5 rounded-md">
                    {feat.tag}
                  </span>
                </div>
                <h4 className="text-base font-bold text-[#071a31]">
                  {feat.title}
                </h4>
                <p className="text-xs sm:text-sm text-[#5f6d77] leading-relaxed">
                  {feat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          Section 5: Current Scope & Planned Roadmap
          ========================================================================= */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#fcfbf8] border-b border-[#e4e6e9]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <Badge variant="neutral" size="sm">
              Transparency & Scope
            </Badge>
            <h2 className="type-h2 font-bold text-[#071a31]">
              {limitationsTitle}
            </h2>
            <p className="type-body-md text-[#5f6d77]">
              {limitationsSubtitle}
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-white rounded-[24px] border border-[#d8dce0] p-6 sm:p-8 space-y-6 shadow-cal-sm">
            <div className="p-4 rounded-[14px] bg-[#f4f9ff] border border-[#c1defe]/70 text-xs sm:text-sm text-[#071a31] space-y-1">
              <span className="font-bold text-[#1e5ea7]">Current Release Scope:</span>
              <p className="text-[#5f6d77] leading-relaxed">
                {activeStatusSummary}
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#748491]">
                Upcoming Roadmap & Planned Features
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {roadmapItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-[14px] bg-[#fcfbf8] border border-[#e4e6e9] space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-[#071a31]">{item.title}</span>
                      <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-[#f1f3f5] text-[#5f6d77] border border-[#d8dce0]">
                        {item.status}
                      </span>
                    </div>
                    <p className="text-xs text-[#5f6d77] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          Section 6: Audience FAQs
          ========================================================================= */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white border-b border-[#e4e6e9]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="type-h2 font-bold text-[#071a31]">
              Frequently Asked Questions
            </h2>
            <p className="type-body-md text-[#5f6d77]">
              Answers for {audienceName} regarding scheduling, security, and setup.
            </p>
          </div>

          <div className="max-w-3xl mx-auto bg-[#fcfbf8] rounded-[20px] border border-[#d8dce0] shadow-cal-sm p-6 sm:p-8">
            <Accordion items={faqItems} defaultOpenIndex={0} />
          </div>
        </div>
      </section>

      {/* =========================================================================
          Section 7: Final Call to Action
          ========================================================================= */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 mt-16 sm:mt-20">
        <div className="bg-[#071a31] text-[#fcfbf8] rounded-[24px] p-8 sm:p-12 text-center space-y-6 shadow-cal-xl">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white max-w-2xl mx-auto leading-tight">
            {ctaHeadline}
          </h2>
          <p className="text-sm sm:text-base text-[#c1defe]/90 max-w-xl mx-auto leading-relaxed">
            {ctaDescription}
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Link href="/alex/30-min-chat" className="w-full sm:w-auto">
              <Button variant="inverse" size="lg" className="w-full sm:w-auto">
                Test Live Booking Widget
              </Button>
            </Link>
            <Link href="/pricing" className="w-full sm:w-auto">
              <Button variant="outline-light" size="lg" className="w-full sm:w-auto">
                Explore Pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
