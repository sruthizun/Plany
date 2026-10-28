import React, { forwardRef } from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "tertiary" | "outline-light" | "inverse";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      isLoading = false,
      fullWidth = false,
      leftIcon,
      rightIcon,
      className = "",
      disabled,
      type = "button",
      ...props
    },
    ref
  ) => {
    // Accessible focus ring using Calendly Cornflower (#6bb1ff) token
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-colors duration-150 select-none cursor-pointer " +
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6bb1ff] focus-visible:ring-offset-2 " +
      "disabled:pointer-events-none disabled:cursor-not-allowed";

    // Calendly Measured Action States
    const variantStyles = {
      primary:
        "bg-[#071a31] text-[#fcfbf8] hover:bg-[#0e396a] active:bg-[#1e5ea7] " +
        "disabled:bg-[#d8dce0] disabled:text-[#748491] shadow-cal-sm",
      secondary:
        "bg-transparent text-[#071a31] border-[1.5px] border-[#071a31] hover:bg-[#071a31] hover:text-[#fcfbf8] active:bg-[#0e396a] active:border-[#0e396a] " +
        "disabled:border-[#a4aeb7] disabled:text-[#748491]",
      tertiary:
        "bg-transparent text-[#071a31] hover:bg-[#071a31]/5 hover:text-[#5f6d77] active:bg-[#071a31]/10 active:text-[#1e5ea7] " +
        "disabled:text-[#748491]",
      "outline-light":
        "bg-white/10 text-white border border-white/30 hover:bg-white/20 active:bg-white/30 backdrop-blur-xs " +
        "disabled:opacity-50",
      inverse:
        "bg-white text-[#071a31] font-semibold hover:bg-[#fcfbf8] hover:text-[#0e396a] active:bg-[#e4e6e9] shadow-cal-sm " +
        "disabled:bg-[#d8dce0] disabled:text-[#748491]",
    };

    // Responsive Touch-Target Scale (Minimum 48px touch height on size md)
    const sizeStyles = {
      sm: "min-h-[36px] px-3.5 py-1.5 text-xs rounded-[8px] gap-1.5",
      md: "min-h-[48px] px-5 py-2.5 text-sm rounded-[10px] sm:rounded-[12px] gap-2",
      lg: "min-h-[52px] px-6 py-3 text-base rounded-[12px] gap-2.5",
    };

    const widthStyles = fullWidth ? "w-full" : "";

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        aria-busy={isLoading}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyles} ${className}`.trim()}
        {...props}
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>Loading...</span>
          </>
        ) : (
          <>
            {leftIcon && (
              <span className="inline-flex shrink-0 items-center justify-center" aria-hidden="true">
                {leftIcon}
              </span>
            )}
            <span>{children}</span>
            {rightIcon && (
              <span className="inline-flex shrink-0 items-center justify-center" aria-hidden="true">
                {rightIcon}
              </span>
            )}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
