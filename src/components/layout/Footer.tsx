"use client";

import React from "react";
import Link from "next/link";

export function Footer() {
  const [currentYear, setCurrentYear] = React.useState(2026);

  React.useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="w-full bg-white border-t border-[#d8dce0] text-[#071a31] mt-auto">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-6">
          {/* Column 1: Brand & Tagline */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2 space-y-4 pr-4">
            <Link href="/" className="flex items-center gap-2.5 inline-block">
              <div className="w-8 h-8 rounded-[10px] bg-[#071a31] text-[#fcfbf8] flex items-center justify-center font-bold text-base shadow-cal-sm">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <span className="font-semibold text-xl tracking-tight text-[#071a31]">
                Plany
              </span>
            </Link>

            <p className="text-sm text-[#5f6d77] max-w-sm leading-relaxed">
              Easy scheduling ahead. Eliminate back-and-forth emails, automate calendar coordination, and keep every meeting productive.
            </p>
          </div>

          {/* Column 2: Product */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#748491]">
              Product
            </h4>
            <ul className="space-y-2 text-sm text-[#5f6d77]">
              <li>
                <Link href="/scheduling" className="hover:text-[#071a31] transition-colors">
                  Scheduling
                </Link>
              </li>
              <li>
                <Link href="/#features" className="hover:text-[#071a31] transition-colors">
                  AI Assistant
                </Link>
              </li>
              <li>
                <Link href="/#features" className="hover:text-[#071a31] transition-colors">
                  Notetaker
                </Link>
              </li>
              <li>
                <Link href="/#features" className="hover:text-[#071a31] transition-colors">
                  Payments
                </Link>
              </li>
              <li>
                <Link href="/integrations" className="hover:text-[#071a31] transition-colors">
                  Integrations
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-[#071a31] transition-colors">
                  Pricing Plans
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Solutions */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#748491]">
              Solutions
            </h4>
            <ul className="space-y-2 text-sm text-[#5f6d77]">
              <li>
                <Link href="/solutions/enterprise" className="hover:text-[#071a31] transition-colors">
                  Enterprise
                </Link>
              </li>
              <li>
                <Link href="/solutions/small-business" className="hover:text-[#071a31] transition-colors">
                  Small Business
                </Link>
              </li>
              <li>
                <Link href="/solutions/sales-revops" className="hover:text-[#071a31] transition-colors">
                  Sales & RevOps
                </Link>
              </li>
              <li>
                <Link href="/solutions/recruiting" className="hover:text-[#071a31] transition-colors">
                  Recruiting
                </Link>
              </li>
              <li>
                <Link href="/solutions/customer-success" className="hover:text-[#071a31] transition-colors">
                  Customer Success
                </Link>
              </li>
              <li>
                <Link href="/solutions/individuals" className="hover:text-[#071a31] transition-colors">
                  Individuals
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Features */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#748491]">
              Features
            </h4>
            <ul className="space-y-2 text-sm text-[#5f6d77]">
              <li>
                <Link href="/scheduling" className="hover:text-[#071a31] transition-colors">
                  Calendar Sync
                </Link>
              </li>
              <li>
                <Link href="/scheduling" className="hover:text-[#071a31] transition-colors">
                  Buffer Times
                </Link>
              </li>
              <li>
                <Link href="/scheduling" className="hover:text-[#071a31] transition-colors">
                  Timezone Detection
                </Link>
              </li>
              <li>
                <Link href="/alex/30-min-chat" className="hover:text-[#071a31] transition-colors">
                  Booking Widget Demo
                </Link>
              </li>
              <li>
                <Link href="/preview" className="hover:text-[#071a31] transition-colors">
                  Design Preview
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Company & Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#748491]">
              About & Legal
            </h4>
            <ul className="space-y-2 text-sm text-[#5f6d77]">
              <li>
                <Link href="/#features" className="hover:text-[#071a31] transition-colors">
                  About Plany
                </Link>
              </li>
              <li>
                <Link href="/#features" className="hover:text-[#071a31] transition-colors">
                  Security Standards
                </Link>
              </li>
              <li>
                <Link href="/#features" className="hover:text-[#071a31] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/#features" className="hover:text-[#071a31] transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/#features" className="hover:text-[#071a31] transition-colors">
                  System Status
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Compliance */}
        <div className="mt-12 pt-8 border-t border-[#e4e6e9] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#5f6d77]">
          <p>© {currentYear} Plany, Inc. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <Link href="/#features" className="hover:text-[#071a31] transition-colors">
              Privacy Notice
            </Link>
            <Link href="/#features" className="hover:text-[#071a31] transition-colors">
              Terms of Service
            </Link>
            <Link href="/#features" className="hover:text-[#071a31] transition-colors">
              Security
            </Link>
            <Link href="/#features" className="hover:text-[#071a31] transition-colors">
              Cookie Settings
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
