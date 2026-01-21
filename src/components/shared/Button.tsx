/**
 * Button Component
 * 
 * Reusable button component with multiple variants and sizes
 */

import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../../utils/helpers";

// ============================================================================
// Types
// ============================================================================

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger" | "gradient";
  size?: "sm" | "md" | "lg";
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
  loading?: boolean;
}

// ============================================================================
// Variant Styles
// ============================================================================

const variantStyles = {
  primary: "bg-blue-600 text-white hover:bg-blue-700",
  secondary: "bg-gray-600 text-white hover:bg-gray-700",
  outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20",
  ghost: "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700",
  danger: "bg-red-600 text-white hover:bg-red-700",
  gradient: "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700",
};

const sizeStyles = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2.5 text-base",
  lg: "px-6 py-3 text-lg",
};

// ============================================================================
// Component
// ============================================================================

export function Button({
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "left",
  fullWidth = false,
  loading = false,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        // Base styles
        "inline-flex items-center justify-center gap-2 rounded-lg transition-all duration-200",
        "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "shadow-sm hover:shadow-md",
        
        // Variant styles
        variantStyles[variant],
        
        // Size styles
        sizeStyles[size],
        
        // Full width
        fullWidth && "w-full",
        
        // Custom className
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
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
      )}
      
      {!loading && icon && iconPosition === "left" && icon}
      
      {children}
      
      {!loading && icon && iconPosition === "right" && icon}
    </button>
  );
}
