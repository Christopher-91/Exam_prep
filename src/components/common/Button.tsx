import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger" | "subtle";
  size?: "xs" | "sm" | "md" | "lg";
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", loading, children, disabled, ...props }, ref) => {
    const variants = {
      primary: "bg-slate-900 hover:bg-slate-800 text-white shadow-xs active:bg-black",
      secondary: "border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 shadow-2xs active:bg-slate-100",
      outline: "border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 active:bg-slate-100",
      ghost: "bg-transparent hover:bg-slate-100 text-slate-600 hover:text-slate-900 active:bg-slate-200",
      danger: "bg-rose-700 hover:bg-rose-800 text-white shadow-xs active:bg-rose-900",
      subtle: "bg-slate-100 hover:bg-slate-200 text-slate-800 active:bg-slate-300",
    };

    const sizes = {
      xs: "text-xs px-2.5 py-1 rounded h-7",
      sm: "text-xs font-medium px-3 py-1.5 rounded-md h-8",
      md: "text-xs font-medium px-3.5 py-2 rounded-md h-9",
      lg: "text-sm font-medium px-4.5 py-2.5 rounded-md h-10",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center justify-center gap-1.5 font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none select-none cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {loading ? (
          <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
