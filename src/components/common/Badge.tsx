import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "primary" | "secondary" | "success" | "warning" | "danger" | "neutral" | "outline";
  size?: "sm" | "md";
}

export function Badge({
  className,
  variant = "neutral",
  size = "sm",
  children,
  ...props
}: BadgeProps) {
  // Restrained, professional palette with muted background and dark legible text
  const variants = {
    primary: "bg-blue-50 text-blue-800 border-blue-200",
    secondary: "bg-slate-100 text-slate-800 border-slate-200",
    success: "bg-emerald-50 text-emerald-800 border-emerald-200",
    warning: "bg-amber-50 text-amber-800 border-amber-200",
    danger: "bg-rose-50 text-rose-800 border-rose-200",
    neutral: "bg-slate-50 text-slate-700 border-slate-200",
    outline: "bg-transparent text-slate-700 border-slate-300",
  };

  const sizes = {
    sm: "text-[11px] px-2 py-0.5 font-medium rounded",
    md: "text-xs px-2.5 py-1 font-medium rounded-md",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 border transition-colors select-none",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
