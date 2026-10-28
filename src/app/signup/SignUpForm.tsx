"use client";

import React, { useState } from "react";
import Link from "next/link";

interface StatusNotice {
  title: string;
  message: string;
}

export function SignUpForm() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [statusNotice, setStatusNotice] = useState<StatusNotice | null>(null);

  const validateEmail = (val: string): boolean => {
    if (!val.trim()) {
      setEmailError("Enter your email to continue.");
      return false;
    }
    // Standard RFC 5322 compliant email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(val.trim())) {
      setEmailError("Please enter a valid email address (e.g. name@company.com).");
      return false;
    }
    setEmailError("");
    return true;
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setStatusNotice(null);
      return;
    }

    // Honest handling: Authentication and registration are not yet configured
    setStatusNotice({
      title: "Account Registration Coming Soon",
      message:
        "Plany self-serve account registration is currently in active development. Plany does not yet store passwords or create live user accounts. In the meantime, you can experience Plany's scheduling engine and calendar export features through our public demo at /alex/30-min-chat.",
    });
  };

  const handleOAuthClick = (provider: "Google" | "Microsoft") => {
    setStatusNotice({
      title: `${provider} Sign-Up Unavailable`,
      message: `${provider} authentication has not yet been configured for Plany. Third-party calendar and SSO providers will be supported in an upcoming release.`,
    });
  };

  return (
    <div className="w-full max-w-[480px] bg-white border border-[#d8dce0] rounded-[20px] p-7 sm:p-10 shadow-[0_4px_24px_rgba(7,26,49,0.06)] text-center">
      {/* Plany Brand Mark */}
      <div className="flex justify-center mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 focus:outline-none focus:ring-2 focus:ring-[#6bb1ff] rounded-[12px] p-1"
          aria-label="Plany homepage"
        >
          <div className="w-10 h-10 rounded-[12px] bg-[#071a31] text-[#fcfbf8] flex items-center justify-center font-bold text-lg shadow-cal-sm hover:bg-[#0e396a] transition-colors">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        </Link>
      </div>

      {/* 1. Heading */}
      <h1 className="text-[28px] sm:text-[34px] font-semibold text-[#071a31] tracking-[-0.02em] leading-tight">
        Create your free Plany account
      </h1>

      {/* 2. Supporting text */}
      <p className="text-sm text-[#5f6d77] mt-2.5 mb-7">
        No credit card required. Get started with Plany today.
      </p>

      {/* Status Notice (Honest auth messaging) */}
      {statusNotice && (
        <div
          className="mb-6 p-4 rounded-[12px] bg-[#f0f4f9] border border-[#c8d8ea] text-[#071a31] text-xs sm:text-sm text-left flex gap-3 animate-fade-in"
          role="status"
        >
          <svg
            className="w-5 h-5 text-[#1e5ea7] shrink-0 mt-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div className="space-y-1">
            <p className="font-semibold text-[#071a31]">{statusNotice.title}</p>
            <p className="text-[#5f6d77] leading-relaxed">{statusNotice.message}</p>
          </div>
        </div>
      )}

      {/* Email Form */}
      <form onSubmit={handleEmailSubmit} noValidate className="space-y-4 text-left">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="signup-email"
            className="text-xs font-semibold uppercase tracking-wider text-[#071a31]"
          >
            Enter your email
          </label>
          {/* 3. Email input */}
          <input
            id="signup-email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (emailError) setEmailError("");
            }}
            placeholder="Enter your email"
            autoComplete="email"
            aria-required="true"
            aria-invalid={!!emailError}
            aria-describedby={emailError ? "signup-email-error" : undefined}
            className={`w-full min-h-[48px] px-3.5 py-2.5 text-sm rounded-[10px] bg-white text-[#071a31] transition-colors duration-150 placeholder:text-[#748491] focus:outline-none focus:ring-3 ${
              emailError
                ? "border border-[#b32812] focus:border-[#b32812] focus:ring-[#fedfda]"
                : "border border-[#c6ccd2] hover:border-[#5f6d77] focus:border-[#1e5ea7] focus:ring-[#6bb1ff]/35"
            }`}
          />
          {emailError && (
            <p
              id="signup-email-error"
              className="text-xs font-medium text-[#841f0e] flex items-center gap-1.5 mt-0.5"
              role="alert"
            >
              <svg
                className="w-3.5 h-3.5 shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{emailError}</span>
            </p>
          )}
        </div>

        {/* 4. Full-width navy button: Continue with email */}
        <button
          type="submit"
          className="w-full min-h-[48px] px-5 py-2.5 rounded-[10px] sm:rounded-[12px] bg-[#071a31] text-[#fcfbf8] font-medium text-sm hover:bg-[#0e396a] active:bg-[#1e5ea7] focus:outline-none focus:ring-2 focus:ring-[#6bb1ff] focus:ring-offset-2 shadow-cal-sm transition-colors cursor-pointer select-none"
        >
          Continue with email
        </button>
      </form>

      {/* 5. A divider with “or” */}
      <div className="relative my-6" aria-hidden="true">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[#d8dce0]" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-3 font-semibold text-[#748491]">or</span>
        </div>
      </div>

      {/* Social Buttons */}
      <div className="space-y-3">
        {/* 6. Outlined button: Continue with Google */}
        <button
          type="button"
          onClick={() => handleOAuthClick("Google")}
          className="w-full min-h-[48px] px-4 py-2.5 rounded-[10px] sm:rounded-[12px] border border-[#c6ccd2] bg-white text-sm font-medium text-[#071a31] hover:bg-[#f5f5f7] hover:border-[#5f6d77] active:bg-[#e4e6e9] focus:outline-none focus:ring-2 focus:ring-[#6bb1ff] flex items-center justify-center gap-3 transition-colors cursor-pointer select-none"
        >
          <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="#4285F4"
              d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
            />
            <path
              fill="#FBBC05"
              d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.16 0 9.94 0 12s.45 3.84 1.25 5.42l4.03-3.15z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
            />
          </svg>
          <span>Continue with Google</span>
        </button>

        {/* 7. Outlined button: Continue with Microsoft */}
        <button
          type="button"
          onClick={() => handleOAuthClick("Microsoft")}
          className="w-full min-h-[48px] px-4 py-2.5 rounded-[10px] sm:rounded-[12px] border border-[#c6ccd2] bg-white text-sm font-medium text-[#071a31] hover:bg-[#f5f5f7] hover:border-[#5f6d77] active:bg-[#e4e6e9] focus:outline-none focus:ring-2 focus:ring-[#6bb1ff] flex items-center justify-center gap-3 transition-colors cursor-pointer select-none"
        >
          <svg className="w-5 h-5 shrink-0" viewBox="0 0 21 21" aria-hidden="true">
            <rect x="1" y="1" width="9" height="9" fill="#f25022" />
            <rect x="11" y="1" width="9" height="9" fill="#7fba00" />
            <rect x="1" y="11" width="9" height="9" fill="#00a4ef" />
            <rect x="11" y="11" width="9" height="9" fill="#ffb900" />
          </svg>
          <span>Continue with Microsoft</span>
        </button>
      </div>

      {/* 8. Supporting text */}
      <p className="text-xs text-[#748491] mt-5 leading-relaxed">
        Connect your calendar when integrations become available.
      </p>

      {/* 9. Footer text */}
      <div className="mt-8 pt-6 border-t border-[#d8dce0] text-center text-sm text-[#5f6d77]">
        <span>Already have a Plany account? </span>
        <Link
          href="/login"
          className="font-semibold text-[#071a31] hover:text-[#0e396a] underline underline-offset-2 transition-colors"
        >
          Log in
        </Link>
      </div>
    </div>
  );
}
