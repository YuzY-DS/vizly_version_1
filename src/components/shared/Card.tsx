/**
 * Card Component
 * 
 * Reusable card component for displaying content
 */

import { ReactNode } from "react";
import { cn } from "../../utils/helpers";

// ============================================================================
// Types
// ============================================================================

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
  colorAccent?: string;
}

// ============================================================================
// Component
// ============================================================================

export function Card({
  children,
  className,
  hover = false,
  onClick,
  colorAccent,
}: CardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700",
        "overflow-hidden transition-all duration-300",
        hover && "hover:shadow-xl hover:-translate-y-1 cursor-pointer",
        onClick && "cursor-pointer",
        className
      )}
    >
      {colorAccent && <div className={`h-2 ${colorAccent}`} />}
      {children}
    </div>
  );
}

// ============================================================================
// Card Sub-components
// ============================================================================

interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

export function CardHeader({ children, className }: CardHeaderProps) {
  return (
    <div className={cn("p-6 border-b border-gray-100 dark:border-gray-700", className)}>
      {children}
    </div>
  );
}

interface CardBodyProps {
  children: ReactNode;
  className?: string;
}

export function CardBody({ children, className }: CardBodyProps) {
  return <div className={cn("p-6", className)}>{children}</div>;
}

interface CardFooterProps {
  children: ReactNode;
  className?: string;
}

export function CardFooter({ children, className }: CardFooterProps) {
  return (
    <div
      className={cn(
        "p-6 pt-4 border-t border-gray-100 dark:border-gray-700",
        className
      )}
    >
      {children}
    </div>
  );
}
