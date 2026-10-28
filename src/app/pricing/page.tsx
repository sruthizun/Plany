"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Accordion } from "@/components/ui/Accordion";

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      name: "Free Preview",
      badge: "Available Now",
      badgeVariant: "success" as const,
      priceMonthly: "$0",
      priceAnnual: "$0",
      period: "forever",
      description: "Everything you need to eliminate email back-and-forth and coordinate 1-on-1 meetings.",
      highlight: true,
      ctaText: "Try Free Demo",
      ctaHref: "/alex/30-min-chat",
      ctaVariant: "primary" as const,
      ctaDisabled: false,
      features: [
        "Verified personal booking link (/alex/30-min-chat)",
        "SQLite atomic double-booking protection",
        "Automatic IANA timezone conversion",
        "Configurable working hours & buffer times",
        "Universal RFC 5545 .ics calendar export",
        "Unlimited confirmed appointments",
      ],
    },
    {
      name: "Standard",
      badge: "Planned Tier",
      badgeVariant: "neutral" as const,
      priceMonthly: "$12",
      priceAnnual: "$10",
      period: "per seat / month",
      description: "For professionals who manage multiple meeting types and require custom intake workflows.",
      highlight: false,
      ctaText: "Coming Soon",
      ctaHref: "#",
      ctaVariant: "secondary" as const,
      ctaDisabled: true,
      features: [
        "Everything in Free Preview",
        "Unlimited custom event types & links",
        "Custom intake questionnaires & required fields",
        "Automated email reminder workflows",
        "Custom meeting cancellation & rescheduling rules",
        "Direct calendar synchronization hooks",
      ],
    },
    {
      name: "Teams",
      badge: "Planned Tier",
      badgeVariant: "neutral" as const,
      priceMonthly: "$20",
      priceAnnual: "$16",
      period: "per seat / month",
      description: "For collaborating teams that need multi-host panel meetings and lead distribution.",
      highlight: false,
      ctaText: "Coming Soon",
      ctaHref: "#",
      ctaVariant: "secondary" as const,
      ctaDisabled: true,
      features: [
        "Everything in Standard",
        "Collective multi-host scheduling (all required)",
        "Round-robin automated meeting distribution",
        "Centralized team admin management",
        "Shared team availability schedules",
        "Admin reporting & booking velocity metrics",
      ],
    },
    {
      name: "Enterprise",
      badge: "In Planning",
      badgeVariant: "neutral" as const,
      priceMonthly: "Custom",
      priceAnnual: "Custom",
      period: "tailored contract",
      description: "For organizations requiring enterprise-grade security, governance, and custom SLAs.",
      highlight: false,
      ctaText: "In Planning",
      ctaHref: "#",
      ctaVariant: "secondary" as const,
      ctaDisabled: true,
      features: [
        "Everything in Teams",
        "SAML 2.0 Single Sign-On (SSO)",
        "SCIM automated user provisioning & de-provisioning",
        "Domain capture and organization-wide governance",
        "Dedicated implementation specialist",
        "99.9% uptime Service Level Agreement (SLA)",
      ],
    },
  ];

  const comparisonRows = [
    {
      category: "Scheduling Engine",
      items: [
        { feature: "1-on-1 Appointment Booking", free: "Yes", standard: "Yes", teams: "Yes", enterprise: "Yes" },
        { feature: "Double-Booking Prevention (Atomic Locks)", free: "Yes (SQLite)", standard: "Yes", teams: "Yes", enterprise: "Yes" },
        { feature: "Automatic Timezone Detection & Conversion", free: "Yes", standard: "Yes", teams: "Yes", enterprise: "Yes" },
        { feature: "Pre- & Post-Meeting Buffer Protection", free: "Yes", standard: "Yes", teams: "Yes", enterprise: "Yes" },
        { feature: "Universal RFC 5545 .ics Calendar Export", free: "Yes", standard: "Yes", teams: "Yes", enterprise: "Yes" },
        { feature: "Multiple Active Event Types", free: "1 active link", standard: "Unlimited", teams: "Unlimited", enterprise: "Unlimited" },
      ],
    },
    {
      category: "Workflow & Team Features",
      items: [
        { feature: "Invitee Intake Notes & Questions", free: "Standard notes", standard: "Custom fields", teams: "Custom fields", enterprise: "Custom fields" },
        { feature: "Collective Multi-Host Meetings", free: "—", standard: "—", teams: "Planned", enterprise: "Planned" },
        { feature: "Round-Robin Lead Routing", free: "—", standard: "—", teams: "Planned", enterprise: "Planned" },
        { feature: "Team Availability Schedules", free: "—", standard: "—", teams: "Planned", enterprise: "Planned" },
      ],
    },
    {
      category: "Security & Governance",
      items: [
        { feature: "Cross-Process Concurrency Safety", free: "Yes", standard: "Yes", teams: "Yes", enterprise: "Yes" },
        { feature: "SAML 2.0 Single Sign-On (SSO)", free: "—", standard: "—", teams: "—", enterprise: "Planned" },
        { feature: "SCIM User Provisioning", free: "—", standard: "—", teams: "—", enterprise: "Planned" },
        { feature: "Dedicated Support & SLAs", free: "Community", standard: "Standard", teams: "Priority", enterprise: "Dedicated CSM" },
      ],
    },
  ];

  const faqItems = [
    {
      id: "is-plany-free",
      title: "Is Plany free to use right now?",
      content:
        "Yes! Plany is currently in active developer preview with 100% free access to all core scheduling functionality, including personalized booking links, atomic double-booking protection, timezone calculations, and calendar export. You can test the live flow at /alex/30-min-chat without entering credit card details.",
    },
    {
      id: "when-paid-plans",
      title: "When will paid plans become available?",
      content:
        "Paid subscription tiers are currently in architectural planning. We will post advance notices and transparent documentation well before any paid billing or payment gateway integrations are activated.",
    },
    {
      id: "how-concurrency-works",
      title: "How does Plany prevent double-booking?",
      content:
        "Plany uses a SQLite-compatible database-level write-locking coordinator. When concurrent booking requests arrive for the same time slot, they are safely serialized. Only the first transaction commits, while competing requests immediately receive a clean conflict notice (HTTP 409) rather than creating overlapping appointments.",
    },
    {
      id: "supported-calendars",
      title: "What calendars can import Plany appointments?",
      content:
        "Plany automatically generates standards-compliant RFC 5545 .ics files on every confirmed booking. These files import natively into Google Calendar, Microsoft Outlook, Apple Calendar, Thunderbird, and all major mobile calendar applications.",
    },
    {
      id: "can-i-test-demo",
      title: "Can I test the booking flow before signing up?",
      content:
        "Absolutely. Visit /alex/30-min-chat to test our interactive scheduling widget with host Alex Morgan, explore date selection, inspect timezone switches, submit a test booking, and download your real calendar invitation file.",
    },
  ];

  return (
    <main className="min-h-screen bg-[#fcfbf8] text-[#071a31] pb-24">
      {/* 1. Page Header */}
      <section className="pt-12 pb-14 sm:pt-16 sm:pb-20 text-center px-4 sm:px-6 lg:px-8 border-b border-[#e4e6e9] bg-white">
        <div className="max-w-[1280px] mx-auto space-y-4">
          <div className="inline-flex items-center gap-2">
            <Badge variant="info" size="sm">
              Illustrative Pricing Architecture
            </Badge>
            <span className="text-xs text-[#5f6d77]">
              Developer Preview Release
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#071a31] max-w-3xl mx-auto leading-tight">
            Simple, transparent plans for every stage of your schedule
          </h1>

          <p className="type-body-lg text-[#5f6d77] max-w-2xl mx-auto leading-relaxed">
            Plany is currently in active preview with all core 1-on-1 scheduling capabilities 100% free. Explore our proposed plan tiers below.
          </p>

          {/* Billing Frequency Toggle */}
          <div className="pt-4 flex items-center justify-center gap-3">
            <span className={`text-sm font-medium ${!isAnnual ? "text-[#071a31]" : "text-[#5f6d77]"}`}>
              Monthly
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={isAnnual}
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-[#071a31] transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#6bb1ff] focus:ring-offset-2"
            >
              <span className="sr-only">Toggle annual billing</span>
              <span
                aria-hidden="true"
                className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                  isAnnual ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
            <div className="flex items-center gap-1.5">
              <span className={`text-sm font-medium ${isAnnual ? "text-[#071a31]" : "text-[#5f6d77]"}`}>
                Annual
              </span>
              <span className="text-[11px] font-bold bg-[#dbee9f] text-[#3f491b] px-2 py-0.5 rounded-full">
                Save ~20%
              </span>
            </div>
          </div>

          {/* Truthful Notice */}
          <p className="text-xs text-[#748491] pt-2">
            No credit cards or billing information are collected in this preview release.
          </p>
        </div>
      </section>

      {/* 2. Pricing Cards Grid */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, index) => {
            const price = isAnnual ? plan.priceAnnual : plan.priceMonthly;
            return (
              <div
                key={index}
                className={`rounded-[24px] p-6 sm:p-7 flex flex-col justify-between transition-all duration-200 ${
                  plan.highlight
                    ? "bg-white border-2 border-[#071a31] shadow-cal-xl relative"
                    : "bg-white border border-[#d8dce0] shadow-cal-sm hover:shadow-cal-md"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-[#071a31] tracking-tight">
                      {plan.name}
                    </h3>
                    <Badge variant={plan.badgeVariant} size="sm">
                      {plan.badge}
                    </Badge>
                  </div>

                  {/* Pricing Display */}
                  <div className="mb-4">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl sm:text-4xl font-extrabold text-[#071a31]">
                        {price}
                      </span>
                      {price !== "Custom" && (
                        <span className="text-xs text-[#5f6d77] font-medium">
                          / {plan.period}
                        </span>
                      )}
                    </div>
                    {isAnnual && price !== "$0" && price !== "Custom" && (
                      <p className="text-[11px] text-[#10b981] font-semibold mt-1">
                        Billed annually (save 20%)
                      </p>
                    )}
                  </div>

                  <p className="text-xs text-[#5f6d77] leading-relaxed mb-6 pb-6 border-b border-[#e4e6e9]">
                    {plan.description}
                  </p>

                  {/* Key Features List */}
                  <div className="space-y-2.5 mb-8">
                    <p className="text-xs font-bold uppercase tracking-wider text-[#748491]">
                      Includes:
                    </p>
                    <ul className="space-y-2 text-xs text-[#071a31]">
                      {plan.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2 leading-tight">
                          <span className="text-[#10b981] font-bold shrink-0">✓</span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Plan Action CTA */}
                <div>
                  {plan.ctaDisabled ? (
                    <Button
                      variant={plan.ctaVariant}
                      size="md"
                      fullWidth
                      disabled
                      className="cursor-not-allowed opacity-60"
                    >
                      {plan.ctaText}
                    </Button>
                  ) : (
                    <Link href={plan.ctaHref} className="block w-full">
                      <Button variant={plan.ctaVariant} size="md" fullWidth>
                        {plan.ctaText}
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Comprehensive Feature Comparison Table */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 mt-20 sm:mt-28 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#071a31]">
            Compare capabilities across plans
          </h2>
          <p className="text-sm text-[#5f6d77]">
            Review what is available right now in the free preview versus planned future tiers.
          </p>
        </div>

        {/* Comparison Table with Horizontal Scroll Container */}
        <div className="bg-white rounded-[20px] border border-[#d8dce0] shadow-cal-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[640px]">
              <thead>
                <tr className="bg-[#fcfbf8] border-b border-[#d8dce0]">
                  <th className="py-4 px-6 font-bold text-[#071a31] w-2/5">Features & Capabilities</th>
                  <th className="py-4 px-4 font-bold text-[#071a31] text-center w-[15%]">Free Preview</th>
                  <th className="py-4 px-4 font-bold text-[#5f6d77] text-center w-[15%]">Standard</th>
                  <th className="py-4 px-4 font-bold text-[#5f6d77] text-center w-[15%]">Teams</th>
                  <th className="py-4 px-4 font-bold text-[#5f6d77] text-center w-[15%]">Enterprise</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e4e6e9]">
                {comparisonRows.map((cat, cIdx) => (
                  <React.Fragment key={cIdx}>
                    <tr className="bg-[#f5f5f7]/80">
                      <td colSpan={5} className="py-2.5 px-6 font-bold text-xs uppercase tracking-wider text-[#748491]">
                        {cat.category}
                      </td>
                    </tr>
                    {cat.items.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-[#fcfbf8] transition-colors">
                        <td className="py-3.5 px-6 text-[#071a31] font-medium">{row.feature}</td>
                        <td className="py-3.5 px-4 text-center font-semibold text-[#071a31]">
                          {row.free === "Yes" || row.free === "Yes (SQLite)" ? (
                            <span className="text-[#10b981] font-bold">{row.free}</span>
                          ) : (
                            row.free
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-center text-[#5f6d77]">{row.standard}</td>
                        <td className="py-3.5 px-4 text-center text-[#5f6d77]">{row.teams}</td>
                        <td className="py-3.5 px-4 text-center text-[#5f6d77]">{row.enterprise}</td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 4. Frequently Asked Questions (FAQ) */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 mt-20 sm:mt-28 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#071a31]">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-[#5f6d77]">
            Everything you need to know about Plany&apos;s current preview access and future plans.
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-white rounded-[20px] border border-[#d8dce0] shadow-cal-sm p-6 sm:p-8">
          <Accordion items={faqItems} defaultOpenIndex={0} />
        </div>
      </section>

      {/* 5. Bottom Conversion Banner */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 mt-20 sm:mt-28">
        <div className="bg-[#071a31] text-[#fcfbf8] rounded-[24px] p-8 sm:p-12 text-center space-y-6 shadow-cal-xl">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white max-w-2xl mx-auto leading-tight">
            Start scheduling with zero back-and-forth today
          </h2>
          <p className="text-sm sm:text-base text-[#c1defe]/90 max-w-xl mx-auto leading-relaxed">
            Test the live booking engine with host Alex Morgan, pick an available slot, and download your universal calendar invitation.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Link href="/alex/30-min-chat" className="w-full sm:w-auto">
              <Button variant="inverse" size="lg" className="w-full sm:w-auto">
                Test Live Demo Now
              </Button>
            </Link>
            <Link href="/" className="w-full sm:w-auto">
              <Button variant="outline-light" size="lg" className="w-full sm:w-auto">
                Back to Homepage
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
