"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

interface NavDropdownProps {
  label: string;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  children: React.ReactNode;
  widthClass?: string;
}

function NavDropdown({
  label,
  isOpen,
  onToggle,
  onClose,
  children,
  widthClass = "w-[576px]",
}: NavDropdownProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={onToggle}
      onMouseLeave={onClose}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className={`group inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-[8px] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6bb1ff] cursor-pointer ${
          isOpen
            ? "bg-[#071a31]/5 text-[#071a31]"
            : "text-[#071a31] hover:bg-[#071a31]/5 hover:text-[#0e396a]"
        }`}
      >
        <span>{label}</span>
        <svg
          className={`w-4 h-4 text-[#5f6d77] transition-transform duration-150 group-hover:text-[#071a31] ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Panel with Invisible Mouse Bridge */}
      {isOpen && (
        <div
          className={`absolute top-full left-0 pt-2 z-50 animate-inline-dropdown ${widthClass}`}
        >
          {/* 6px invisible mouse hover bridge */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-transparent" />
          <div className="bg-white rounded-[16px] border border-[#d8dce0] shadow-cal-lg p-6 overflow-hidden">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}

export function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null);

  // Close menus on Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setActiveDropdown(null);
        setMobileMenuOpen(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      {/* Sticky Header Shell (Magnolia #fcfbf8/90 with backdrop blur, 72px desktop / 64px mobile) */}
      <header className="sticky top-0 z-40 w-full bg-[#fcfbf8]/95 backdrop-blur-md border-b border-[#d8dce0] transition-colors">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-16 lg:h-18 flex items-center justify-between">
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-8 lg:-translate-x-10 xl:-translate-x-12">
            <Link
              href="/"
              className="flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6bb1ff] rounded-[8px] p-1"
            >
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

            {/* Desktop Navigation Links (> 1024px) */}
            <nav className="hidden lg:flex items-center gap-1">
              {/* Product Mega-Dropdown */}
              <NavDropdown
                label="Product"
                isOpen={activeDropdown === "product"}
                onToggle={() => setActiveDropdown(activeDropdown === "product" ? null : "product")}
                onClose={() => setActiveDropdown(null)}
                widthClass="w-[580px]"
              >
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#748491] mb-3">
                      Core Platform
                    </p>
                    <ul className="space-y-2">
                      <li>
                        <Link
                          href="/scheduling"
                          onClick={() => setActiveDropdown(null)}
                          className="group block p-2 rounded-[10px] hover:bg-[#f5f5f7] transition-colors"
                        >
                          <p className="text-sm font-semibold text-[#071a31] group-hover:text-[#0e396a]">
                            Scheduling
                          </p>
                          <p className="text-xs text-[#5f6d77]">
                            Automated booking links and calendar sync.
                          </p>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/#features"
                          onClick={() => setActiveDropdown(null)}
                          className="group block p-2 rounded-[10px] hover:bg-[#f5f5f7] transition-colors"
                        >
                          <p className="text-sm font-semibold text-[#071a31] group-hover:text-[#0e396a] flex items-center gap-1.5">
                            AI Assistant
                            <span className="text-[10px] bg-[#dbee9f] text-[#3f491b] font-bold px-1.5 py-0.2 rounded-full">
                              Beta
                            </span>
                          </p>
                          <p className="text-xs text-[#5f6d77]">
                            Conversational scheduling right inside emails.
                          </p>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/#features"
                          onClick={() => setActiveDropdown(null)}
                          className="group block p-2 rounded-[10px] hover:bg-[#f5f5f7] transition-colors"
                        >
                          <p className="text-sm font-semibold text-[#071a31] group-hover:text-[#0e396a]">
                            Notetaker
                          </p>
                          <p className="text-xs text-[#5f6d77]">
                            Automated meeting transcripts and action items.
                          </p>
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#748491] mb-3">
                      Ecosystem & Extensions
                    </p>
                    <ul className="space-y-2">
                      <li>
                        <Link
                          href="/integrations"
                          onClick={() => setActiveDropdown(null)}
                          className="group block p-2 rounded-[10px] hover:bg-[#f5f5f7] transition-colors"
                        >
                          <p className="text-sm font-semibold text-[#071a31] group-hover:text-[#0e396a]">
                            Integrations
                          </p>
                          <p className="text-xs text-[#5f6d77]">
                            Connect Google, Microsoft, Zoom, Slack, & Stripe.
                          </p>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/solutions/enterprise"
                          onClick={() => setActiveDropdown(null)}
                          className="group block p-2 rounded-[10px] hover:bg-[#f5f5f7] transition-colors"
                        >
                          <p className="text-sm font-semibold text-[#071a31] group-hover:text-[#0e396a]">
                            Security & Governance
                          </p>
                          <p className="text-xs text-[#5f6d77]">
                            SSO, SCIM provisioning, and enterprise compliance.
                          </p>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/alex/30-min-chat"
                          onClick={() => setActiveDropdown(null)}
                          className="group block p-2 rounded-[10px] bg-[#f4f9ff] hover:bg-[#edf5ff] transition-colors border border-[#c1defe]/50"
                        >
                          <p className="text-sm font-semibold text-[#071a31]">
                            Live Booking Demo
                          </p>
                          <p className="text-xs text-[#5f6d77]">
                            Test host Alex Morgan&apos;s real booking page.
                          </p>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </NavDropdown>

              {/* Solutions Mega-Dropdown */}
              <NavDropdown
                label="Solutions"
                isOpen={activeDropdown === "solutions"}
                onToggle={() => setActiveDropdown(activeDropdown === "solutions" ? null : "solutions")}
                onClose={() => setActiveDropdown(null)}
                widthClass="w-[620px]"
              >
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#748491] mb-3">
                      By Organization Scale
                    </p>
                    <ul className="space-y-2">
                      <li>
                        <Link
                          href="/solutions/enterprise"
                          onClick={() => setActiveDropdown(null)}
                          className="group block p-2 rounded-[10px] hover:bg-[#f5f5f7] transition-colors"
                        >
                          <p className="text-sm font-semibold text-[#071a31] group-hover:text-[#0e396a]">
                            Enterprise
                          </p>
                          <p className="text-xs text-[#5f6d77]">
                            Large teams requiring SSO, SCIM, and dedicated CSM.
                          </p>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/solutions/small-business"
                          onClick={() => setActiveDropdown(null)}
                          className="group block p-2 rounded-[10px] hover:bg-[#f5f5f7] transition-colors"
                        >
                          <p className="text-sm font-semibold text-[#071a31] group-hover:text-[#0e396a]">
                            Small Business
                          </p>
                          <p className="text-xs text-[#5f6d77]">
                            Growing teams managing client bookings and intake.
                          </p>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/solutions/individuals"
                          onClick={() => setActiveDropdown(null)}
                          className="group block p-2 rounded-[10px] hover:bg-[#f5f5f7] transition-colors"
                        >
                          <p className="text-sm font-semibold text-[#071a31] group-hover:text-[#0e396a]">
                            Individuals
                          </p>
                          <p className="text-xs text-[#5f6d77]">
                            Solo entrepreneurs, consultants, and freelancers.
                          </p>
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#748491] mb-3">
                      By Department
                    </p>
                    <ul className="space-y-2">
                      <li>
                        <Link
                          href="/solutions/sales-revops"
                          onClick={() => setActiveDropdown(null)}
                          className="group block p-2 rounded-[10px] hover:bg-[#f5f5f7] transition-colors"
                        >
                          <p className="text-sm font-semibold text-[#071a31]">Sales & RevOps</p>
                          <p className="text-xs text-[#5f6d77]">Speed to lead with instant qualification.</p>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/solutions/customer-success"
                          onClick={() => setActiveDropdown(null)}
                          className="group block p-2 rounded-[10px] hover:bg-[#f5f5f7] transition-colors"
                        >
                          <p className="text-sm font-semibold text-[#071a31]">Customer Success</p>
                          <p className="text-xs text-[#5f6d77]">Frictionless onboarding and QBRs.</p>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/solutions/recruiting"
                          onClick={() => setActiveDropdown(null)}
                          className="group block p-2 rounded-[10px] hover:bg-[#f5f5f7] transition-colors"
                        >
                          <p className="text-sm font-semibold text-[#071a31]">Recruiting</p>
                          <p className="text-xs text-[#5f6d77]">Panel interview coordination made easy.</p>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </NavDropdown>

              {/* Direct Integrations Link */}
              <Link
                href="/integrations"
                className="px-3 py-2 text-sm font-medium text-[#071a31] hover:bg-[#071a31]/5 hover:text-[#0e396a] rounded-[8px] transition-colors"
              >
                Integrations
              </Link>

              {/* Direct Pricing Link */}
              <Link
                href="/pricing"
                className="px-3 py-2 text-sm font-medium text-[#071a31] hover:bg-[#071a31]/5 hover:text-[#0e396a] rounded-[8px] transition-colors"
              >
                Pricing
              </Link>

              {/* Resources Mega-Dropdown */}
              <NavDropdown
                label="Resources"
                isOpen={activeDropdown === "resources"}
                onToggle={() => setActiveDropdown(activeDropdown === "resources" ? null : "resources")}
                onClose={() => setActiveDropdown(null)}
                widthClass="w-[500px]"
              >
                <div className="grid grid-cols-2 gap-4">
                  <Link
                    href="/preview"
                    onClick={() => setActiveDropdown(null)}
                    className="p-3 rounded-[10px] hover:bg-[#f5f5f7] transition-colors"
                  >
                    <p className="text-sm font-semibold text-[#071a31]">UI Component System</p>
                    <p className="text-xs text-[#5f6d77]">Live design tokens, buttons, and inputs preview.</p>
                  </Link>
                  <Link
                    href="/alex/30-min-chat"
                    onClick={() => setActiveDropdown(null)}
                    className="p-3 rounded-[10px] hover:bg-[#f5f5f7] transition-colors"
                  >
                    <p className="text-sm font-semibold text-[#071a31]">Sample Booking Widget</p>
                    <p className="text-xs text-[#5f6d77]">Live interactive scheduling calendar.</p>
                  </Link>
                </div>
              </NavDropdown>
            </nav>
          </div>

          {/* Desktop Action CTAs (> 1024px) */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-medium text-[#071a31] hover:text-[#0e396a] px-3 py-2 transition-colors"
            >
              Log In
            </Link>
            <Link href="/signup">
              <Button
                variant="primary"
                size="md"
              >
                Get started
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Hamburger Button (<= 1024px) */}
          <div className="flex lg:hidden items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-[10px] text-[#071a31] hover:bg-[#071a31]/5 focus:outline-none focus:ring-2 focus:ring-[#6bb1ff]"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Full-Bleed Menu Drawer (<= 1024px) */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-b border-[#d8dce0] bg-[#fcfbf8] px-4 pt-3 pb-6 space-y-4 max-h-[calc(100vh-80px)] overflow-y-auto">
            <div className="space-y-1">
              {/* Product Accordion */}
              <div>
                <button
                  type="button"
                  onClick={() => setMobileSubmenu(mobileSubmenu === "product" ? null : "product")}
                  className="w-full flex items-center justify-between py-2.5 px-3 text-base font-medium text-[#071a31] rounded-[8px] hover:bg-[#071a31]/5"
                >
                  <span>Product</span>
                  <svg
                    className={`w-4 h-4 text-[#5f6d77] transition-transform ${
                      mobileSubmenu === "product" ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {mobileSubmenu === "product" && (
                  <div className="pl-4 pr-2 py-2 space-y-2 bg-[#f5f5f7] rounded-[10px] my-1">
                    <Link
                      href="/scheduling"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block py-1.5 text-sm font-medium text-[#071a31]"
                    >
                      Scheduling
                    </Link>
                    <Link
                      href="/alex/30-min-chat"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block py-1.5 text-sm font-medium text-[#1e5ea7]"
                    >
                      Live Booking Demo
                    </Link>
                  </div>
                )}
              </div>

              {/* Solutions Accordion */}
              <div>
                <button
                  type="button"
                  onClick={() => setMobileSubmenu(mobileSubmenu === "solutions" ? null : "solutions")}
                  className="w-full flex items-center justify-between py-2.5 px-3 text-base font-medium text-[#071a31] rounded-[8px] hover:bg-[#071a31]/5"
                >
                  <span>Solutions</span>
                  <svg
                    className={`w-4 h-4 text-[#5f6d77] transition-transform ${
                      mobileSubmenu === "solutions" ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {mobileSubmenu === "solutions" && (
                  <div className="pl-4 pr-2 py-2 space-y-2 bg-[#f5f5f7] rounded-[10px] my-1">
                    <Link
                      href="/solutions/enterprise"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block py-1.5 text-sm font-medium text-[#071a31]"
                    >
                      Enterprise
                    </Link>
                    <Link
                      href="/solutions/small-business"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block py-1.5 text-sm font-medium text-[#071a31]"
                    >
                      Small Business
                    </Link>
                    <Link
                      href="/solutions/sales-revops"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block py-1.5 text-sm font-medium text-[#071a31]"
                    >
                      Sales & RevOps
                    </Link>
                    <Link
                      href="/solutions/recruiting"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block py-1.5 text-sm font-medium text-[#071a31]"
                    >
                      Recruiting
                    </Link>
                    <Link
                      href="/solutions/customer-success"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block py-1.5 text-sm font-medium text-[#071a31]"
                    >
                      Customer Success
                    </Link>
                    <Link
                      href="/solutions/individuals"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block py-1.5 text-sm font-medium text-[#071a31]"
                    >
                      Individuals
                    </Link>
                  </div>
                )}
              </div>

              {/* Integrations Direct Link */}
              <Link
                href="/integrations"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2.5 px-3 text-base font-medium text-[#071a31] rounded-[8px] hover:bg-[#071a31]/5"
              >
                Integrations
              </Link>

              {/* Pricing Direct Link */}
              <Link
                href="/pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2.5 px-3 text-base font-medium text-[#071a31] rounded-[8px] hover:bg-[#071a31]/5"
              >
                Pricing
              </Link>

              {/* Preview Link */}
              <Link
                href="/preview"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2.5 px-3 text-base font-medium text-[#071a31] rounded-[8px] hover:bg-[#071a31]/5"
              >
                Component Preview
              </Link>
            </div>

            {/* Mobile Actions */}
            <div className="pt-4 border-t border-[#d8dce0] flex flex-col gap-2.5">
              <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="w-full">
                <Button
                  variant="secondary"
                  size="md"
                  fullWidth
                >
                  Log In
                </Button>
              </Link>
              <Link href="/signup" onClick={() => setMobileMenuOpen(false)} className="w-full">
                <Button
                  variant="primary"
                  size="md"
                  fullWidth
                >
                  Get started free
                </Button>
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
