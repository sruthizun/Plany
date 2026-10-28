import React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "error" | "info" | "neutral";
  size?: "sm" | "md";
  dot?: boolean;
}

export const Badge = ({
  children,
  variant = "default",
  size = "md",
  dot = false,
  className = "",
  ...props
}: BadgeProps) => {
  // Calendly Measured Functional Badges
  const variantStyles = {
    default: "bg-[#071a31] text-[#fcfbf8]",
    success: "bg-[#dbee9f] text-[#3f491b]",
    warning: "bg-[#ffe67c] text-[#473700]",
    error: "bg-[#fedfda] text-[#841f0e]",
    info: "bg-[#d5e8fe] text-[#114580]",
    neutral: "bg-[#f5f5f7] text-[#3d464e] border border-[#d8dce0]",
  };

  const dotColors = {
    default: "bg-[#6bb1ff]",
    success: "bg-[#3f491b]",
    warning: "bg-[#473700]",
    error: "bg-[#b32812]",
    info: "bg-[#114580]",
    neutral: "bg-[#748491]",
  };

  const sizeStyles = {
    sm: "px-2 py-0.5 text-[11px] font-medium rounded-full gap-1.5",
    md: "px-2.5 py-1 text-xs font-medium rounded-full gap-2",
  };

  return (
    <span
      className={`inline-flex items-center select-none ${variantStyles[variant]} ${sizeStyles[size]} ${className}`.trim()}
      {...props}
    >
      {dot && (
        <span
          className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotColors[variant]}`}
          aria-hidden="true"
        />
      )}
      <span>{children}</span>
    </span>
  );
};
