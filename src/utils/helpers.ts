/**
 * Utility Helper Functions
 * 
 * Common utility functions used throughout the application
 */

import type { WorkspaceItem, WorkspaceItemType } from "../types";

// ============================================================================
// String Utilities
// ============================================================================

/**
 * Capitalizes the first letter of a string
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Truncates a string to a specified length
 */
export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + "...";
}

/**
 * Formats a number with commas
 */
export function formatNumber(num: number): string {
  return num.toLocaleString();
}

// ============================================================================
// Date Utilities
// ============================================================================

/**
 * Formats a relative time string (e.g., "5 min ago")
 */
export function formatRelativeTime(dateString: string): string {
  // For now, return the input as-is since we're using relative strings
  // In a real app, this would calculate from a Date object
  return dateString;
}

/**
 * Formats a date to a readable string
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

/**
 * Gets current timestamp
 */
export function getCurrentTimestamp(): string {
  return new Date().toISOString();
}

// ============================================================================
// Array Utilities
// ============================================================================

/**
 * Groups items by a specific key
 */
export function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce((result, item) => {
    const groupKey = String(item[key]);
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(item);
    return result;
  }, {} as Record<string, T[]>);
}

/**
 * Filters an array by a search term
 */
export function filterBySearch<T extends Record<string, any>>(
  items: T[],
  searchTerm: string,
  searchKeys: (keyof T)[]
): T[] {
  if (!searchTerm) return items;
  
  const lowerSearch = searchTerm.toLowerCase();
  return items.filter((item) =>
    searchKeys.some((key) =>
      String(item[key]).toLowerCase().includes(lowerSearch)
    )
  );
}

/**
 * Sorts an array by a key
 */
export function sortBy<T>(
  array: T[],
  key: keyof T,
  order: "asc" | "desc" = "asc"
): T[] {
  return [...array].sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];
    
    if (aVal < bVal) return order === "asc" ? -1 : 1;
    if (aVal > bVal) return order === "asc" ? 1 : -1;
    return 0;
  });
}

// ============================================================================
// Workspace Item Utilities
// ============================================================================

/**
 * Filters workspace items by type
 */
export function filterItemsByType(
  items: WorkspaceItem[],
  type: WorkspaceItemType | "All"
): WorkspaceItem[] {
  if (type === "All") return items;
  return items.filter((item) => item.type === type);
}

/**
 * Groups workspace items by type
 */
export function groupItemsByType(items: WorkspaceItem[]) {
  return {
    dashboards: items.filter((item) => item.type === "Dashboard"),
    reports: items.filter((item) => item.type === "Report"),
    datasets: items.filter((item) => item.type === "Dataset"),
  };
}

/**
 * Gets item count by type
 */
export function getItemCountByType(
  items: WorkspaceItem[],
  type: WorkspaceItemType
): number {
  return items.filter((item) => item.type === type).length;
}

// ============================================================================
// Color Utilities
// ============================================================================

/**
 * Gets a color from a predefined palette
 */
export function getColorByIndex(index: number): string {
  const colors = [
    "bg-blue-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-red-500",
    "bg-indigo-500",
    "bg-cyan-500",
  ];
  return colors[index % colors.length];
}

/**
 * Gets icon background color based on item type
 */
export function getIconColorByType(type: WorkspaceItemType): string {
  switch (type) {
    case "Dashboard":
      return "bg-purple-100 dark:bg-purple-900/30";
    case "Report":
      return "bg-blue-100 dark:bg-blue-900/30";
    case "Dataset":
      return "bg-emerald-100 dark:bg-emerald-900/30";
    default:
      return "bg-gray-100 dark:bg-gray-700";
  }
}

/**
 * Gets text color based on item type
 */
export function getTextColorByType(type: WorkspaceItemType): string {
  switch (type) {
    case "Dashboard":
      return "text-purple-600 dark:text-purple-400";
    case "Report":
      return "text-blue-600 dark:text-blue-400";
    case "Dataset":
      return "text-emerald-600 dark:text-emerald-400";
    default:
      return "text-gray-600 dark:text-gray-400";
  }
}

// ============================================================================
// Validation Utilities
// ============================================================================

/**
 * Validates email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validates password strength
 */
export function isValidPassword(password: string): boolean {
  // Minimum 8 characters, at least one letter and one number
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return passwordRegex.test(password);
}

/**
 * Checks if a value is empty
 */
export function isEmpty(value: any): boolean {
  if (value == null) return true;
  if (typeof value === "string") return value.trim().length === 0;
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === "object") return Object.keys(value).length === 0;
  return false;
}

// ============================================================================
// ID Generation
// ============================================================================

/**
 * Generates a unique ID
 */
export function generateId(prefix: string = "id"): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// ============================================================================
// Local Storage Utilities
// ============================================================================

/**
 * Safely gets item from localStorage
 */
export function getFromLocalStorage<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
}

/**
 * Safely sets item in localStorage
 */
export function setToLocalStorage(key: string, value: any): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
}

/**
 * Removes item from localStorage
 */
export function removeFromLocalStorage(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Error removing from localStorage:", error);
  }
}

// ============================================================================
// Class Name Utilities
// ============================================================================

/**
 * Conditionally joins class names
 */
export function cn(...classes: (string | boolean | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

// ============================================================================
// Debounce Utility
// ============================================================================

/**
 * Debounces a function call
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
