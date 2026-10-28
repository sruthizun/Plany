import React, { forwardRef, useId } from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      error,
      leftIcon,
      rightIcon,
      id,
      className = "",
      disabled,
      required,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;

    // Calendly Measured: 48px touch height, 10px-12px corner radius, precise focus ring
    const baseInputStyles =
      "w-full min-h-[48px] px-3.5 py-2.5 text-sm rounded-[10px] bg-white text-[#071a31] transition-colors duration-150 " +
      "placeholder:text-[#748491] focus:outline-none focus:ring-3 " +
      "disabled:bg-[#f5f5f7] disabled:text-[#748491] disabled:border-[#d8dce0] disabled:cursor-not-allowed";

    const stateStyles = error
      ? "border border-[#b32812] focus:border-[#b32812] focus:ring-[#fedfda]"
      : "border border-[#c6ccd2] hover:border-[#5f6d77] focus:border-[#1e5ea7] focus:ring-[#6bb1ff]/35";

    const paddingLeft = leftIcon ? "pl-10" : "";
    const paddingRight = rightIcon ? "pr-10" : "";

    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs font-semibold uppercase tracking-wider text-[#071a31] flex items-center justify-between"
          >
            <span>
              {label}
              {required && <span className="text-[#b32812] ml-1">*</span>}
            </span>
          </label>
        )}

        <div className="relative flex items-center">
          {leftIcon && (
            <div
              className="absolute left-3.5 flex items-center pointer-events-none text-[#5f6d77]"
              aria-hidden="true"
            >
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            required={required}
            aria-invalid={!!error}
            aria-describedby={
              error ? errorId : helperText ? helperId : undefined
            }
            className={`${baseInputStyles} ${stateStyles} ${paddingLeft} ${paddingRight} ${className}`.trim()}
            {...props}
          />

          {rightIcon && (
            <div
              className="absolute right-3.5 flex items-center pointer-events-none text-[#5f6d77]"
              aria-hidden="true"
            >
              {rightIcon}
            </div>
          )}
        </div>

        {error && (
          <p id={errorId} className="text-xs font-medium text-[#841f0e] flex items-center gap-1 mt-0.5" role="alert">
            <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {error}
          </p>
        )}

        {helperText && !error && (
          <p id={helperId} className="text-xs text-[#5f6d77] mt-0.5">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
