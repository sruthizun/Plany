import React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "magnolia" | "linen" | "elevated" | "muted";
  padding?: "none" | "sm" | "md" | "lg";
}

export function Card({
  children,
  variant = "default",
  padding = "md",
  className = "",
  ...props
}: CardProps) {
  const variantStyles = {
    default: "bg-white border border-[#d8dce0] shadow-cal-sm",
    magnolia: "bg-[#fcfbf8] border border-[#d8dce0] shadow-cal-sm",
    linen: "bg-[#f5f3ee] border border-[#d8dce0]",
    elevated: "bg-white border border-[#d8dce0] shadow-cal-lg",
    muted: "bg-[#f5f5f7] border border-[#e4e6e9]",
  };

  const paddingStyles = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  return (
    <div
      className={`rounded-[16px] sm:rounded-[20px] transition-shadow duration-150 ${variantStyles[variant]} ${paddingStyles[padding]} ${className}`.trim()}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  className = "",
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`flex flex-col gap-1.5 pb-4 ${className}`.trim()} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({
  className = "",
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={`text-lg font-semibold tracking-tight text-[#071a31] ${className}`.trim()}
      {...props}
    >
      {children}
    </h3>
  );
}

export function CardDescription({
  className = "",
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={`text-sm text-[#5f6d77] leading-relaxed ${className}`.trim()}
      {...props}
    >
      {children}
    </p>
  );
}

export function CardContent({
  className = "",
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`space-y-4 ${className}`.trim()} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({
  className = "",
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`flex items-center justify-between pt-4 border-t border-[#e4e6e9] ${className}`.trim()}
      {...props}
    >
      {children}
    </div>
  );
}
