/**
 * Type Definitions for Vizly Analytics Dashboard
 * 
 * This file contains all TypeScript interfaces and types used throughout the application.
 * Organized by feature/domain for easy navigation.
 */

// ============================================================================
// Authentication Types
// ============================================================================

export type AuthScreen = 'login' | 'signup' | 'forgot';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  plan: UserPlan;
  verified?: boolean;
}

export type UserPlan = 'normal' | 'pro';

// ============================================================================
// Navigation Types
// ============================================================================

export type Screen = 
  | 'home' 
  | 'workspace' 
  | 'builder' 
  | 'dataview' 
  | 'dashboardview' 
  | 'community';

// ============================================================================
// Workspace Item Types
// ============================================================================

export type WorkspaceItemType = 'Dashboard' | 'Report' | 'Dataset';

export interface WorkspaceItem {
  id: string;
  name: string;
  type: WorkspaceItemType;
  icon?: any; // Lucide icon component
  color: string;
  description?: string;
  rows?: string; // For datasets
  lastViewed: string;
  createdAt?: string;
  updatedAt?: string;
}

// ============================================================================
// Data Source Types
// ============================================================================

export type DataSourceType = 'CSV' | 'Excel' | 'JSON' | 'API';

export interface DataSource {
  id: string;
  name: string;
  type: DataSourceType;
  rows: string;
  lastUpdated: string;
  columns?: string[];
  data?: any[];
}

// ============================================================================
// Dashboard Types
// ============================================================================

export interface Dashboard {
  id: string;
  name: string;
  description?: string;
  items?: DashboardItem[];
  createdAt?: string;
  updatedAt?: string;
}

export interface DashboardItem {
  id: string;
  type: 'chart' | 'kpi' | 'table' | 'text';
  title: string;
  chartType?: ChartType;
  position: {
    x: number;
    y: number;
  };
  size: {
    width: number;
    height: number;
  };
  data?: any;
}

// ============================================================================
// Chart Types
// ============================================================================

export type ChartType = 
  | 'bar' 
  | 'line' 
  | 'pie' 
  | 'area' 
  | 'scatter' 
  | 'donut';

export interface ChartConfig {
  type: ChartType;
  title: string;
  data: any[];
  options?: ChartOptions;
}

export interface ChartOptions {
  xAxis?: string;
  yAxis?: string;
  colorScheme?: string;
  showLegend?: boolean;
  showGrid?: boolean;
  animation?: boolean;
}

// ============================================================================
// Community Types
// ============================================================================

export interface CommunityWorkspace {
  id: string;
  title: string;
  description: string;
  preview?: string; // Image URL
  creator: WorkspaceCreator;
  stats: WorkspaceStats;
  tags: string[];
  category: string;
  color: string;
  isLiked: boolean;
  items?: WorkspaceItem[];
}

export interface WorkspaceCreator {
  name: string;
  avatar: string;
  verified: boolean;
  isPro: boolean;
}

export interface WorkspaceStats {
  likes: number;
  views: number;
  clones: number;
}

// ============================================================================
// Notification Types
// ============================================================================

export type NotificationType = 
  | 'share' 
  | 'import' 
  | 'publish' 
  | 'report' 
  | 'system';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  icon?: any; // Lucide icon component
  iconColor?: string;
  link?: string;
}

// ============================================================================
// Data Processing Types
// ============================================================================

export type DataOperation = 
  | 'filter' 
  | 'sort' 
  | 'aggregate' 
  | 'transform' 
  | 'merge' 
  | 'pivot';

export interface DataProcessingConfig {
  operation: DataOperation;
  column?: string;
  value?: any;
  options?: Record<string, any>;
}

// ============================================================================
// Modal/Dialog Types
// ============================================================================

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// ============================================================================
// Common Component Props
// ============================================================================

export interface BaseScreenProps {
  onNavigate: (screen: Screen) => void;
  onLogout: () => void;
  darkMode: boolean;
  onToggleDarkMode: (value: boolean) => void;
}

export interface WorkspaceScreenProps extends BaseScreenProps {
  onSelectDataSource?: (dataSource: DataSource) => void;
  onSelectDashboard?: (dashboard: Dashboard) => void;
  onSelectReport?: (report: WorkspaceItem) => void;
  userPlan?: UserPlan;
  onUpgradePlan?: () => void;
  workspaceItems?: WorkspaceItem[];
  setWorkspaceItems?: (items: WorkspaceItem[]) => void;
}

export interface CommunityHubProps extends BaseScreenProps {
  userPlan?: UserPlan;
  onUpgradePlan?: () => void;
  workspaceItems?: WorkspaceItem[];
  setWorkspaceItems?: (items: WorkspaceItem[]) => void;
  publishedWorkspaces?: CommunityWorkspace[];
  setPublishedWorkspaces?: (workspaces: CommunityWorkspace[]) => void;
  communityWorkspaces?: CommunityWorkspace[];
  setCommunityWorkspaces?: (workspaces: CommunityWorkspace[]) => void;
}
