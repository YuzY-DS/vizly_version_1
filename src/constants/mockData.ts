/**
 * Mock Data for Vizly Analytics Dashboard
 * 
 * This file contains all mock/sample data used throughout the application.
 * Organized by feature for easy maintenance and updates.
 */

import {
  BarChart3,
  FileText,
  Database,
} from "lucide-react";
import type { 
  WorkspaceItem, 
  CommunityWorkspace, 
  Notification,
  DataSource 
} from "../types";

// ============================================================================
// Workspace Items - Default workspace content
// ============================================================================

export const MOCK_WORKSPACE_ITEMS: WorkspaceItem[] = [
  // Datasets
  {
    id: "ds1",
    name: "E-commerce Sales Data",
    type: "Dataset",
    icon: Database,
    color: "bg-emerald-500",
    rows: "15 rows",
    lastViewed: "5 min ago",
    description: "Sales data from Q4 2024 including revenue, customers, and regions",
  },
  {
    id: "ds2",
    name: "Customer Analytics",
    type: "Dataset",
    icon: Database,
    color: "bg-teal-500",
    rows: "10 rows",
    lastViewed: "1 hour ago",
    description: "Customer behavior and demographics data",
  },

  // Dashboards
  {
    id: "d1",
    name: "Sales Performance Dashboard",
    type: "Dashboard",
    icon: BarChart3,
    color: "bg-purple-500",
    lastViewed: "10 min ago",
    description: "Real-time sales metrics and KPIs",
  },
  {
    id: "d2",
    name: "Marketing Overview",
    type: "Dashboard",
    icon: BarChart3,
    color: "bg-pink-500",
    lastViewed: "2 hours ago",
    description: "Campaign performance and conversion rates",
  },

  // Reports
  {
    id: "r1",
    name: "Monthly Revenue Analysis",
    type: "Report",
    icon: FileText,
    color: "bg-blue-500",
    lastViewed: "15 min ago",
    description: "Detailed breakdown of monthly revenue trends",
  },
  {
    id: "r2",
    name: "Category Growth Trends",
    type: "Report",
    icon: FileText,
    color: "bg-emerald-500",
    lastViewed: "20 min ago",
    description: "Product category performance analysis",
  },
  {
    id: "r3",
    name: "Product Performance Report",
    type: "Report",
    icon: FileText,
    color: "bg-indigo-500",
    lastViewed: "25 min ago",
    description: "Top performing products and inventory insights",
  },
];

// ============================================================================
// Community Workspaces - Public shared workspaces
// ============================================================================

export const MOCK_COMMUNITY_WORKSPACES: CommunityWorkspace[] = [
  {
    id: "cw1",
    title: "Sales Analytics Dashboard",
    description: "Track revenue, customer segments, and regional performance",
    preview: "https://images.unsplash.com/photo-1666875753105-c63a6f3bdc86?w=800",
    creator: {
      name: "Sarah Johnson",
      avatar: "SJ",
      verified: true,
      isPro: true,
    },
    stats: {
      likes: 1243,
      views: 8956,
      clones: 234,
    },
    tags: ["Sales", "Analytics", "Dashboard"],
    category: "Sales",
    color: "bg-blue-500",
    isLiked: false,
  },
  {
    id: "cw2",
    title: "Marketing Campaign Tracker",
    description: "Monitor campaign performance and ROI metrics",
    preview: "https://images.unsplash.com/photo-1608222351212-18fe0ec7b13b?w=800",
    creator: {
      name: "Mike Chen",
      avatar: "MC",
      verified: false,
      isPro: true,
    },
    stats: {
      likes: 892,
      views: 5432,
      clones: 156,
    },
    tags: ["Marketing", "Campaigns", "ROI"],
    category: "Marketing",
    color: "bg-green-500",
    isLiked: false,
  },
  {
    id: "cw3",
    title: "Financial Overview",
    description: "Comprehensive financial metrics and forecasting",
    preview: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
    creator: {
      name: "Emma Davis",
      avatar: "ED",
      verified: true,
      isPro: true,
    },
    stats: {
      likes: 2156,
      views: 12340,
      clones: 445,
    },
    tags: ["Finance", "Forecasting", "Metrics"],
    category: "Finance",
    color: "bg-purple-500",
    isLiked: false,
  },
  {
    id: "cw4",
    title: "Product Analytics",
    description: "User behavior and product usage insights",
    preview: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
    creator: {
      name: "Alex Kumar",
      avatar: "AK",
      verified: true,
      isPro: false,
    },
    stats: {
      likes: 654,
      views: 3421,
      clones: 89,
    },
    tags: ["Product", "Analytics", "Users"],
    category: "Product",
    color: "bg-orange-500",
    isLiked: false,
  },
  {
    id: "cw5",
    title: "HR Performance Dashboard",
    description: "Employee metrics, hiring pipeline, and retention",
    preview: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800",
    creator: {
      name: "Lisa Park",
      avatar: "LP",
      verified: false,
      isPro: true,
    },
    stats: {
      likes: 432,
      views: 2134,
      clones: 67,
    },
    tags: ["HR", "Performance", "Analytics"],
    category: "HR",
    color: "bg-pink-500",
    isLiked: false,
  },
  {
    id: "cw6",
    title: "Supply Chain Monitor",
    description: "Logistics, inventory, and supplier performance",
    preview: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800",
    creator: {
      name: "David Wong",
      avatar: "DW",
      verified: true,
      isPro: true,
    },
    stats: {
      likes: 987,
      views: 6543,
      clones: 178,
    },
    tags: ["Supply Chain", "Logistics", "Inventory"],
    category: "Operations",
    color: "bg-cyan-500",
    isLiked: false,
  },
];

// ============================================================================
// Notifications - User notifications
// ============================================================================

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "n1",
    type: "share",
    title: "Workspace Shared",
    message: "Sarah Chen shared a workspace with you",
    timestamp: "2 minutes ago",
    read: false,
    iconColor: "blue",
  },
  {
    id: "n2",
    type: "import",
    title: "Data Import Complete",
    message: "Data import completed for Sales Q4 2024",
    timestamp: "1 hour ago",
    read: false,
    iconColor: "green",
  },
  {
    id: "n3",
    type: "publish",
    title: "Workspace Published",
    message: "Marketing Dashboard was published to community",
    timestamp: "3 hours ago",
    read: false,
    iconColor: "purple",
  },
  {
    id: "n4",
    type: "report",
    title: "Report Ready",
    message: "Report generation completed",
    timestamp: "Yesterday",
    read: true,
    iconColor: "gray",
  },
];

// ============================================================================
// Sample Data Sources
// ============================================================================

export const MOCK_DATA_SOURCES: DataSource[] = [
  {
    id: "ds1",
    name: "E-commerce Sales Data",
    type: "CSV",
    rows: "15 rows",
    lastUpdated: "5 min ago",
    columns: ["Date", "Product", "Category", "Revenue", "Customers", "Region"],
  },
  {
    id: "ds2",
    name: "Customer Analytics",
    type: "Excel",
    rows: "10 rows",
    lastUpdated: "1 hour ago",
    columns: ["Customer ID", "Age", "Gender", "Location", "Lifetime Value"],
  },
];

// ============================================================================
// Sample Chart Data
// ============================================================================

export const SAMPLE_CHART_DATA = {
  revenue: [
    { month: "Jan", value: 12400 },
    { month: "Feb", value: 15200 },
    { month: "Mar", value: 18900 },
    { month: "Apr", value: 16700 },
    { month: "May", value: 21300 },
    { month: "Jun", value: 24500 },
  ],
  categories: [
    { name: "Electronics", value: 35 },
    { name: "Clothing", value: 25 },
    { name: "Food", value: 20 },
    { name: "Books", value: 12 },
    { name: "Other", value: 8 },
  ],
  regions: [
    { region: "North", sales: 4200 },
    { region: "South", sales: 3800 },
    { region: "East", sales: 5100 },
    { region: "West", sales: 4500 },
  ],
};

// ============================================================================
// User Profile Data
// ============================================================================

export const MOCK_USER = {
  id: "user1",
  name: "Kong",
  email: "kong@gmail.com",
  avatar: "K",
  plan: "normal" as const,
  verified: false,
};

// ============================================================================
// Color Schemes for Charts
// ============================================================================

export const COLOR_SCHEMES = {
  default: ["#3B82F6", "#8B5CF6", "#EC4899", "#10B981", "#F59E0B"],
  ocean: ["#0EA5E9", "#06B6D4", "#14B8A6", "#10B981", "#84CC16"],
  sunset: ["#F97316", "#EF4444", "#DC2626", "#F59E0B", "#FBBF24"],
  forest: ["#10B981", "#059669", "#047857", "#065F46", "#064E3B"],
  purple: ["#8B5CF6", "#7C3AED", "#6D28D9", "#5B21B6", "#4C1D95"],
  pink: ["#EC4899", "#DB2777", "#BE185D", "#9D174D", "#831843"],
  grayscale: ["#6B7280", "#4B5563", "#374151", "#1F2937", "#111827"],
  vibrant: ["#EF4444", "#F59E0B", "#10B981", "#3B82F6", "#8B5CF6"],
  pastel: ["#FBCFE8", "#BFDBFE", "#BAE6FD", "#BBF7D0", "#FDE68A"],
  neon: ["#06B6D4", "#A78BFA", "#F472B6", "#34D399", "#FBBF24"],
};
