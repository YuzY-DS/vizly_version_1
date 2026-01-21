/**
 * Badge Component
 * 
 * Small label or tag component for displaying status, counts, etc.
 */

import { ReactNode } from "react";
import { cn } from "../../utils/helpers";

// ============================================================================
// Types
// ============================================================================

interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "primary" | "success" | "warning" | "danger" | "info";
  size?: "sm" | "md" | "lg";
  className?: string;
}

// ============================================================================
// Variant Styles
// ============================================================================

const variantStyles = {
  default: "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400",
  primary: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
  success: "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400",
  warning: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400",
  danger: "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400",
  info: "bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400",
};

const sizeStyles = {
  sm: "px-1.5 py-0.5 text-xs",
  md: "px-2 py-0.5 text-xs",
  lg: "px-3 py-1 text-sm",
};

// ============================================================================
// Component
// ============================================================================

export function Badge({
  children,
  variant = "default",
  size = "md",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {children}
    </span>
  );
}
