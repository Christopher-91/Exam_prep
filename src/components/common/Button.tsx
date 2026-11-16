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
      primary: "bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm hover:shadow active:bg-indigo-800",
      secondary: "bg-slate-900 hover:bg-slate-800 text-white shadow-sm active:bg-black",
      outline: "border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 active:bg-slate-100",
      ghost: "bg-transparent hover:bg-slate-100 text-slate-600 hover:text-slate-900 active:bg-slate-200",
      danger: "bg-rose-600 hover:bg-rose-700 text-white shadow-sm active:bg-rose-800",
      subtle: "bg-indigo-50 hover:bg-indigo-100 text-indigo-700 active:bg-indigo-200",
    };

    const sizes = {
      xs: "text-xs px-2.5 py-1 rounded-md h-7",
      sm: "text-xs font-medium px-3 py-1.5 rounded-lg h-8",
      md: "text-sm font-medium px-4 py-2 rounded-lg h-10",
      lg: "text-base font-medium px-5 py-2.5 rounded-xl h-12",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-medium transition-all duration-150 disabled:opacity-50 disabled:pointer-events-none select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {loading ? (
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

