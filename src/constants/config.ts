/**
 * Application Configuration
 * 
 * Central place for app-wide configuration constants
 */

// ============================================================================
// App Metadata
// ============================================================================

export const APP_CONFIG = {
  name: "Vizly",
  version: "1.0.0",
  description: "Modern Analytics Dashboard Experience",
  author: "Vizly Team",
} as const;

// ============================================================================
// Feature Flags
// ============================================================================

export const FEATURES = {
  enableCommunity: true,
  enableNotifications: true,
  enableDataProcessing: true,
  enableAIAssistant: false, // Future feature
  enableCollaboration: true,
  enableExport: true,
} as const;

// ============================================================================
// Plan Limits
// ============================================================================

export const PLAN_LIMITS = {
  normal: {
    maxWorkspaces: 5,
    maxDashboards: 10,
    maxReports: 20,
    maxDataSources: 5,
    maxCollaborators: 3,
    canPublishToCommunity: false,
    canExportPDF: false,
    canUseAdvancedCharts: false,
  },
  pro: {
    maxWorkspaces: Infinity,
    maxDashboards: Infinity,
    maxReports: Infinity,
    maxDataSources: Infinity,
    maxCollaborators: Infinity,
    canPublishToCommunity: true,
    canExportPDF: true,
    canUseAdvancedCharts: true,
  },
} as const;

// ============================================================================
// UI Configuration
// ============================================================================

export const UI_CONFIG = {
  sidebarCollapsedWidth: 80,
  sidebarExpandedWidth: 256,
  headerHeight: 145,
  mobileBreakpoint: 1024,
  gridGap: 24,
  cardBorderRadius: 16,
  animationDuration: 300,
} as const;

// ============================================================================
// Chart Configuration
// ============================================================================

export const CHART_CONFIG = {
  defaultType: "bar",
  animationEnabled: true,
  showLegend: true,
  showGrid: true,
  defaultColorScheme: "default",
} as const;

// ============================================================================
// Data Processing
// ============================================================================

export const DATA_PROCESSING = {
  operations: [
    { id: "filter", name: "Filter Rows", icon: "Filter", description: "Filter data by conditions" },
    { id: "sort", name: "Sort Data", icon: "ArrowUpDown", description: "Sort by column values" },
    { id: "aggregate", name: "Aggregate", icon: "Sigma", description: "Calculate summaries" },
    { id: "pivot", name: "Pivot Table", icon: "Table", description: "Reshape your data" },
    { id: "join", name: "Join Data", icon: "GitMerge", description: "Merge datasets" },
    { id: "transform", name: "Transform", icon: "Wand2", description: "Apply transformations" },
    { id: "deduplicate", name: "Remove Duplicates", icon: "Copy", description: "Remove duplicate rows" },
    { id: "fill", name: "Fill Missing", icon: "Droplet", description: "Handle missing values" },
    { id: "rename", name: "Rename Columns", icon: "Type", description: "Rename column headers" },
    { id: "calculate", name: "Calculate Field", icon: "Calculator", description: "Create calculated columns" },
    { id: "stats", name: "Statistics", icon: "BarChart3", description: "Descriptive statistics" },
  ],
} as const;

// ============================================================================
// Navigation
// ============================================================================

export const NAV_ITEMS = [
  { id: "home", label: "My Files", path: "/home" },
  { id: "community", label: "Community", path: "/community" },
] as const;

// ============================================================================
// Categories
// ============================================================================

export const CATEGORIES = [
  "All",
  "Sales",
  "Marketing",
  "Finance",
  "Product",
  "HR",
  "Operations",
  "Custom",
] as const;

// ============================================================================
// Time Ranges
// ============================================================================

export const TIME_RANGES = [
  { id: "today", label: "Today" },
  { id: "week", label: "This Week" },
  { id: "month", label: "This Month" },
  { id: "quarter", label: "This Quarter" },
  { id: "year", label: "This Year" },
  { id: "custom", label: "Custom Range" },
] as const;

// ============================================================================
// Export Formats
// ============================================================================

export const EXPORT_FORMATS = [
  { id: "pdf", label: "PDF Document", extension: ".pdf", proOnly: true },
  { id: "png", label: "PNG Image", extension: ".png", proOnly: false },
  { id: "csv", label: "CSV Data", extension: ".csv", proOnly: false },
  { id: "excel", label: "Excel Workbook", extension: ".xlsx", proOnly: true },
  { id: "json", label: "JSON Data", extension: ".json", proOnly: false },
] as const;

// ============================================================================
// Notification Settings
// ============================================================================

export const NOTIFICATION_CONFIG = {
  maxVisible: 5,
  autoMarkReadAfter: 5000, // ms
  playSound: false,
  showBadge: true,
} as const;
