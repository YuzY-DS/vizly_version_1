import { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './Button.module.css';

/**
 * Button Component
 * 
 * Reusable button component with multiple variants and sizes
 * 
 * @param {Object} props - Component props
 * @param {string} variant - Button style variant: primary, secondary, outline, ghost, danger, gradient
 * @param {string} size - Button size: sm, md, lg
 * @param {ReactNode} icon - Optional icon element
 * @param {string} iconPosition - Icon position: left or right
 * @param {boolean} fullWidth - Whether button should take full width
 * @param {boolean} loading - Whether button is in loading state
 */

export function Button({
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  fullWidth = false,
  loading = false,
  className = '',
  children,
  disabled,
  ...props
}) {
  // Build class names
  const buttonClasses = [
    styles.button,
    styles[`button${variant.charAt(0).toUpperCase() + variant.slice(1)}`], // Capitalize variant
    styles[`button${size.charAt(0).toUpperCase() + size.slice(1)}`], // Capitalize size
    fullWidth && styles.buttonFullWidth,
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      className={buttonClasses}
      disabled={disabled || loading}
      {...props}
    >
      {/* Loading Spinner */}
      {loading && (
        <svg
          className={styles.loadingSpinner}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className={styles.loadingSpinnerCircle}
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className={styles.loadingSpinnerPath}
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      
      {/* Left Icon */}
      {!loading && icon && iconPosition === 'left' && (
        <span className={styles.icon}>{icon}</span>
      )}
      
      {/* Button Text */}
      {children}
      
      {/* Right Icon */}
      {!loading && icon && iconPosition === 'right' && (
        <span className={styles.icon}>{icon}</span>
      )}
    </button>
  );
}

// Export as default for easier importing
export default Button;
