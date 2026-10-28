import React from "react";
import { HeroSection } from "@/components/home/HeroSection";
import { TrustSection } from "@/components/home/TrustSection";
import { LifecycleSection } from "@/components/home/LifecycleSection";
import { ProductOverviewSection } from "@/components/home/ProductOverviewSection";
import { SchedulingFeaturesSection } from "@/components/home/SchedulingFeaturesSection";
import { AiAssistantSection } from "@/components/home/AiAssistantSection";
import { NotetakerSection } from "@/components/home/NotetakerSection";
import { PaymentsSection } from "@/components/home/PaymentsSection";
import { BenefitsSection } from "@/components/home/BenefitsSection";
import { IntegrationsSection } from "@/components/home/IntegrationsSection";
import { FinalCtaSection } from "@/components/home/FinalCtaSection";

export const metadata = {
  title: "Plany — All Your Scheduling Handled With Zero Back-and-Forth",
  description:
    "From automated calendar scheduling to conflict prevention and timezone conversion, get the busywork done with fewer tools and less effort.",
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#fcfbf8] text-[#071a31] overflow-x-hidden">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Social Proof & Architectural Trust Section */}
      <TrustSection />

      {/* 3. Meeting Lifecycle Section */}
      <LifecycleSection />

      {/* 4. Product Overview with Interactive Tabs */}
      <ProductOverviewSection />

      {/* 5. Core Scheduling Features with Accordion Switchback */}
      <SchedulingFeaturesSection />

      {/* 6. AI Assistant Feature Section (Roadmap Concept) */}
      <AiAssistantSection />

      {/* 7. Meeting Notes / Notetaker Feature Section (Future Concept) */}
      <NotetakerSection />

      {/* 8. Payments & Monetization Section (Planned Capability) */}
      <PaymentsSection />

      {/* 9. Practical Benefits & Use Cases Section */}
      <BenefitsSection />

      {/* 10. Integrations & Compatibility Section */}
      <IntegrationsSection />

      {/* 11. Final Call-to-Action Section */}
      <FinalCtaSection />
    </main>
  );
}
