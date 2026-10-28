"use client";

import React, { useState, useId } from "react";

export interface AccordionItemData {
  id?: string;
  title: React.ReactNode;
  content: React.ReactNode;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
}

export interface AccordionProps {
  items: AccordionItemData[];
  defaultOpenIndex?: number;
  allowMultiple?: boolean;
  className?: string;
  onItemChange?: (index: number) => void;
}

export function Accordion({
  items,
  defaultOpenIndex = 0,
  allowMultiple = false,
  className = "",
  onItemChange,
}: AccordionProps) {
  const baseId = useId();
  const [openIndices, setOpenIndices] = useState<number[]>(
    defaultOpenIndex >= 0 ? [defaultOpenIndex] : []
  );

  const toggleItem = (index: number) => {
    let newIndices: number[];
    if (allowMultiple) {
      newIndices = openIndices.includes(index)
        ? openIndices.filter((i) => i !== index)
        : [...openIndices, index];
    } else {
      newIndices = openIndices.includes(index) ? [] : [index];
    }
    setOpenIndices(newIndices);
    if (onItemChange) {
      onItemChange(index);
    }
  };

  return (
    <div className={`divide-y divide-[#e4e6e9] border-y border-[#e4e6e9] ${className}`.trim()}>
      {items.map((item, index) => {
        const isOpen = openIndices.includes(index);
        const headerId = item.id ? `${item.id}-header` : `${baseId}-header-${index}`;
        const panelId = item.id ? `${item.id}-panel` : `${baseId}-panel-${index}`;

        return (
          <div key={item.id || index} className="group py-1">
            <h3>
              <button
                type="button"
                id={headerId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggleItem(index)}
                className="w-full py-4 px-2 flex items-center justify-between text-left transition-colors duration-150 rounded-[8px] hover:bg-[#071a31]/[0.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6bb1ff]"
              >
                <div className="flex items-center gap-3 pr-4">
                  {item.icon && (
                    <span className="shrink-0 text-[#071a31] group-hover:text-[#0e396a]" aria-hidden="true">
                      {item.icon}
                    </span>
                  )}
                  <span className="text-base sm:text-lg font-medium text-[#071a31] group-hover:text-[#0e396a]">
                    {item.title}
                  </span>
                  {item.badge && <span className="ml-2">{item.badge}</span>}
                </div>

                <span
                  className={`w-6 h-6 shrink-0 flex items-center justify-center rounded-full text-[#5f6d77] transition-transform duration-200 ${
                    isOpen ? "rotate-180 text-[#071a31]" : ""
                  }`}
                  aria-hidden="true"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={headerId}
              hidden={!isOpen}
              className={`px-2 pb-5 pt-1 text-sm sm:text-base text-[#5f6d77] leading-relaxed transition-all duration-200 ${
                isOpen ? "block opacity-100" : "hidden opacity-0"
              }`}
            >
              {item.content}
            </div>
          </div>
        );
      })}
    </div>
  );
}
