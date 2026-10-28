"use client";

import React, { useState, useId, useRef } from "react";

export interface TabItem {
  id: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  content: React.ReactNode;
}

export interface TabsProps {
  tabs: TabItem[];
  defaultTabId?: string;
  variant?: "pills" | "underline" | "cards";
  className?: string;
  onChange?: (tabId: string) => void;
}

export function Tabs({
  tabs,
  defaultTabId,
  variant = "pills",
  className = "",
  onChange,
}: TabsProps) {
  const baseId = useId();
  const [activeTabId, setActiveTabId] = useState<string>(
    defaultTabId || (tabs[0]?.id ?? "")
  );
  const tabRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  const handleSelect = (id: string) => {
    setActiveTabId(id);
    if (onChange) {
      onChange(id);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, currentIndex: number) => {
    let nextIndex = currentIndex;
    if (e.key === "ArrowRight") {
      nextIndex = (currentIndex + 1) % tabs.length;
      e.preventDefault();
    } else if (e.key === "ArrowLeft") {
      nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
      e.preventDefault();
    } else if (e.key === "Home") {
      nextIndex = 0;
      e.preventDefault();
    } else if (e.key === "End") {
      nextIndex = tabs.length - 1;
      e.preventDefault();
    }

    if (nextIndex !== currentIndex && tabs[nextIndex]) {
      const nextTab = tabs[nextIndex]!;
      handleSelect(nextTab.id);
      tabRefs.current[nextTab.id]?.focus();
    }
  };

  const activeTab = tabs.find((t) => t.id === activeTabId) || tabs[0];

  return (
    <div className={`w-full flex flex-col gap-6 ${className}`.trim()}>
      {/* Tab List */}
      <div
        role="tablist"
        aria-orientation="horizontal"
        className={`flex items-center overflow-x-auto no-scrollbar scroll-smooth gap-2 p-1.5 ${
          variant === "pills"
            ? "bg-[#f5f5f7] rounded-full max-w-fit mx-auto border border-[#e4e6e9]"
            : variant === "underline"
            ? "border-b border-[#e4e6e9] gap-6"
            : "grid grid-cols-2 sm:grid-cols-4 gap-3 bg-transparent"
        }`}
      >
        {tabs.map((tab, idx) => {
          const isSelected = tab.id === activeTabId;
          const tabElementId = `${baseId}-tab-${tab.id}`;
          const panelElementId = `${baseId}-panel-${tab.id}`;

          let buttonClasses = "";
          if (variant === "pills") {
            buttonClasses = isSelected
              ? "bg-[#071a31] text-[#fcfbf8] shadow-cal-sm rounded-full"
              : "text-[#5f6d77] hover:text-[#071a31] hover:bg-black/5 rounded-full";
          } else if (variant === "underline") {
            buttonClasses = isSelected
              ? "text-[#071a31] border-b-2 border-[#071a31] font-semibold -mb-px"
              : "text-[#5f6d77] hover:text-[#071a31] border-b-2 border-transparent";
          } else if (variant === "cards") {
            buttonClasses = isSelected
              ? "bg-white text-[#071a31] border-2 border-[#071a31] shadow-cal-md rounded-[14px]"
              : "bg-white/80 text-[#5f6d77] border border-[#d8dce0] hover:border-[#5f6d77] rounded-[14px]";
          }

          return (
            <button
              key={tab.id}
              ref={(el) => {
                tabRefs.current[tab.id] = el;
              }}
              role="tab"
              id={tabElementId}
              type="button"
              aria-selected={isSelected}
              aria-controls={panelElementId}
              tabIndex={isSelected ? 0 : -1}
              onClick={() => handleSelect(tab.id)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              className={`px-4 py-2.5 text-sm font-medium transition-all duration-150 flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6bb1ff] ${buttonClasses}`}
            >
              {tab.icon && (
                <span className="shrink-0" aria-hidden="true">
                  {tab.icon}
                </span>
              )}
              <span>{tab.label}</span>
              {tab.badge && <span className="ml-1">{tab.badge}</span>}
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      {activeTab && (
        <div
          role="tabpanel"
          id={`${baseId}-panel-${activeTab.id}`}
          aria-labelledby={`${baseId}-tab-${activeTab.id}`}
          className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6bb1ff] rounded-[16px]"
          tabIndex={0}
        >
          {activeTab.content}
        </div>
      )}
    </div>
  );
}
