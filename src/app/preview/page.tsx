"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Accordion } from "@/components/ui/Accordion";
import { Tabs } from "@/components/ui/Tabs";

export default function ComponentPreviewPage() {
  const [testEmail, setTestEmail] = useState("");
  const [testError, setTestError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleValidate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testEmail || !testEmail.includes("@")) {
      setTestError("Please enter a valid email address (e.g. name@company.com)");
    } else {
      setTestError("");
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 1000);
    }
  };

  const sampleAccordionItems = [
    {
      id: "calendar-sync",
      title: "Real-time calendar synchronization",
      content:
        "Connect up to 6 Google, Outlook, and Office 365 calendars to ensure you are never double-booked across your personal and professional schedules.",
    },
    {
      id: "buffer-times",
      title: "Customizable buffer times & daily limits",
      content:
        "Add automatic 10-minute padding before and after meetings to allow time to travel, take notes, or recharge between back-to-back calls.",
    },
    {
      id: "intake-questions",
      title: "Invitee intake forms & custom routing",
      content:
        "Collect required information upfront with custom fields, phone numbers, and dropdown selection to qualify attendees before they book.",
    },
  ];

  const sampleTabs = [
    {
      id: "tab-scheduling",
      label: "Scheduling",
      content: (
        <Card padding="md" variant="default">
          <CardHeader>
            <CardTitle>Core Scheduling Engine</CardTitle>
            <CardDescription>
              Share your custom link and let invitees pick an available slot in their local timezone.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-4 rounded-[12px] bg-[#f4f9ff] border border-[#c1defe]/60 text-sm text-[#071a31] space-y-2">
              <p className="font-semibold">Live Integration Active:</p>
              <p className="text-xs text-[#5f6d77]">
                Connects directly to the backend scheduling engine with SQLite concurrency control.
              </p>
              <div className="pt-2">
                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => {
                    window.location.href = "/alex/30-min-chat";
                  }}
                >
                  Test Sample Booking Page
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ),
    },
    {
      id: "tab-callie",
      label: "AI Assistant",
      badge: <Badge variant="success" size="sm">Beta</Badge>,
      content: (
        <Card padding="md" variant="default">
          <CardHeader>
            <CardTitle>Callie AI Assistant</CardTitle>
            <CardDescription>
              Loop your AI assistant directly on email threads to coordinate meetings effortlessly.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-4 rounded-[12px] bg-[#fcfbf8] border border-[#d8dce0] text-sm text-[#5f6d77] space-y-1">
              <p className="font-semibold text-[#071a31]">Natural Language Scheduling:</p>
              <p className="text-xs">
                &ldquo;Hi Callie, please find 30 minutes for Jane and me next Tuesday afternoon.&rdquo;
              </p>
            </div>
          </CardContent>
        </Card>
      ),
    },
    {
      id: "tab-payments",
      label: "Payments",
      content: (
        <Card padding="md" variant="default">
          <CardHeader>
            <CardTitle>Upfront Payments & Deposits</CardTitle>
            <CardDescription>
              Collect credit card and digital wallet payments with Stripe before appointments are confirmed.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-4 rounded-[12px] bg-[#f5f5f7] border border-[#e4e6e9] text-sm text-[#071a31] flex items-center justify-between">
              <div>
                <p className="font-semibold">30 Min Consultation</p>
                <p className="text-xs text-[#5f6d77]">Requires $150 upfront deposit</p>
              </div>
              <Badge variant="neutral">Stripe Powered</Badge>
            </div>
          </CardContent>
        </Card>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-[#fcfbf8] text-[#071a31]">
      {/* Main Content Area */}
      <main className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        {/* Page Banner / Header */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <Badge variant="success" size="sm" dot>
              Phase 2 Design System Verified
            </Badge>
            <span className="text-xs text-[#5f6d77] font-mono">
              Tokens: Midnight #071a31, Magnolia #fcfbf8, Cornflower #6bb1ff
            </span>
          </div>
          <h1 className="type-h1 font-bold text-[#071a31]">
            Plany UI Design System & Component Library
          </h1>
          <p className="text-base text-[#5f6d77] max-w-2xl leading-relaxed">
            Recreated with measured Calendly design tokens: Midnight action states, 48px touch targets,
            accessible focus outlines, responsive 1024px navigation collapse, and fluid typography.
          </p>
        </section>

        {/* Section 1: Buttons */}
        <section id="buttons" className="space-y-6">
          <div className="border-b border-[#e4e6e9] pb-3">
            <h2 className="text-xl font-semibold text-[#071a31]">1. Buttons & Interaction States</h2>
            <p className="text-sm text-[#5f6d77]">
              Primary (#071a31), Secondary (1.5px border), Tertiary (Ghost), and Outline Light variants with 48px touch height (md).
            </p>
          </div>

          <Card padding="lg">
            <div className="space-y-6">
              {/* Variants row */}
              <div className="space-y-2">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#748491]">
                  Measured Action Variants
                </h3>
                <div className="flex flex-wrap items-center gap-4">
                  <Button variant="primary">Primary Action</Button>
                  <Button variant="secondary">Secondary Action</Button>
                  <Button variant="tertiary">Tertiary Ghost</Button>
                  <Button variant="primary" isLoading>
                    Loading State
                  </Button>
                  <Button variant="primary" disabled>
                    Disabled
                  </Button>
                </div>
              </div>

              {/* Sizes row */}
              <div className="space-y-2">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#748491]">
                  Size Scale (sm: 36px, md: 48px touch target, lg: 52px)
                </h3>
                <div className="flex flex-wrap items-center gap-4">
                  <Button size="sm">Small (36px)</Button>
                  <Button size="md">Medium Target (48px)</Button>
                  <Button size="lg">Large Hero (52px)</Button>
                </div>
              </div>

              {/* With icons */}
              <div className="space-y-2">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#748491]">
                  Icons & Full Width
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
                  <Button
                    variant="primary"
                    fullWidth
                    leftIcon={
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    }
                  >
                    Confirm Booking (Full Width)
                  </Button>
                  <Button
                    variant="secondary"
                    fullWidth
                    rightIcon={
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    }
                  >
                    Next Available Time
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Section 2: Form Inputs */}
        <section id="inputs" className="space-y-6">
          <div className="border-b border-[#e4e6e9] pb-3">
            <h2 className="text-xl font-semibold text-[#071a31]">2. Form Inputs & Validation States</h2>
            <p className="text-sm text-[#5f6d77]">
              Inputs with 48px touch targets, neutral-200 border (#c6ccd2), Cornflower focus ring (#6bb1ff), and error states.
            </p>
          </div>

          <Card padding="lg">
            <form onSubmit={handleValidate} className="space-y-6 max-w-xl">
              <Input
                label="Full Name"
                placeholder="Alex Morgan"
                defaultValue="Alex Morgan"
                helperText="Enter your name as it should appear on the calendar invite."
                required
              />

              <Input
                label="Email Address (Validation Test)"
                type="email"
                placeholder="alex@company.com"
                value={testEmail}
                onChange={(e) => {
                  setTestEmail(e.target.value);
                  if (testError) setTestError("");
                }}
                error={testError}
                helperText={!testError ? "Type an invalid email and click submit to trigger validation error." : undefined}
                required
                leftIcon={
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.206" />
                  </svg>
                }
              />

              <Input
                label="Disabled Field"
                placeholder="Host Timezone"
                defaultValue="America/New_York (UTC-4)"
                disabled
                helperText="This setting is managed by the event host."
              />

              <div className="pt-2">
                <Button type="submit" variant="primary" isLoading={isLoading}>
                  Test Submit & Validation
                </Button>
              </div>
            </form>
          </Card>
        </section>

        {/* Section 3: Accordions */}
        <section id="accordions" className="space-y-6">
          <div className="border-b border-[#e4e6e9] pb-3">
            <h2 className="text-xl font-semibold text-[#071a31]">3. Reusable Accordion (Feature Switchbacks)</h2>
            <p className="text-sm text-[#5f6d77]">
              Accessible expandable panels with chevron rotation, aria-expanded, keyboard toggling, and divider borders.
            </p>
          </div>

          <Card padding="lg">
            <div className="max-w-2xl">
              <Accordion items={sampleAccordionItems} defaultOpenIndex={0} />
            </div>
          </Card>
        </section>

        {/* Section 4: Tabs */}
        <section id="tabs" className="space-y-6">
          <div className="border-b border-[#e4e6e9] pb-3">
            <h2 className="text-xl font-semibold text-[#071a31]">4. Reusable Tabs (Product Previews)</h2>
            <p className="text-sm text-[#5f6d77]">
              Accessible tabs supporting pill switcher, underline, and card styles with keyboard arrow navigation.
            </p>
          </div>

          <Card padding="lg">
            <div className="max-w-3xl">
              <Tabs tabs={sampleTabs} defaultTabId="tab-scheduling" variant="pills" />
            </div>
          </Card>
        </section>

        {/* Section 5: Badges & Statuses */}
        <section id="badges" className="space-y-6">
          <div className="border-b border-[#e4e6e9] pb-3">
            <h2 className="text-xl font-semibold text-[#071a31]">5. Status Badges & Pills</h2>
            <p className="text-sm text-[#5f6d77]">
              Measured status indicators: Lime (Success), Amber (Warning), Red (Error), Blue (Info), and Neutral.
            </p>
          </div>

          <Card padding="md">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="default" dot>Brand Default</Badge>
                <Badge variant="success" dot>Success (#dbee9f)</Badge>
                <Badge variant="warning" dot>Warning (#ffe67c)</Badge>
                <Badge variant="error" dot>Error (#fedfda)</Badge>
                <Badge variant="info" dot>Info (#d5e8fe)</Badge>
                <Badge variant="neutral">Neutral Notice</Badge>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Badge variant="default" size="sm">Small Brand</Badge>
                <Badge variant="success" size="sm">Small Success</Badge>
                <Badge variant="warning" size="sm">Small Warning</Badge>
                <Badge variant="error" size="sm">Small Error</Badge>
              </div>
            </div>
          </Card>
        </section>
      </main>
    </div>
  );
}
