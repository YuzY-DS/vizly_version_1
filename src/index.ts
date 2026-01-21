/**
 * Main Export Index
 * 
 * Central export point for commonly used imports
 * Makes it easier to import multiple items from one place
 */

// ============================================================================
// Types
// ============================================================================
export type * from './types';

// ============================================================================
// Constants
// ============================================================================
export * from './constants/config';
export * from './constants/mockData';

// ============================================================================
// Hooks
// ============================================================================
export * from './hooks';

// ============================================================================
// Context
// ============================================================================
export { AppProvider, useApp } from './context/AppContext';

// ============================================================================
// Shared Components
// ============================================================================
export * from './components/shared';

// ============================================================================
// Utilities
// ============================================================================
export * from './utils/helpers';

/**
 * Usage Examples:
 * 
 * // Import types
 * import type { WorkspaceItem, UserPlan } from './index';
 * 
 * // Import hooks
 * import { useWorkspace, useNotifications } from './index';
 * 
 * // Import components
 * import { Button, Card, Badge } from './index';
 * 
 * // Import utilities
 * import { formatNumber, generateId } from './index';
 * 
 * // Import constants
 * import { MOCK_WORKSPACE_ITEMS, APP_CONFIG } from './index';
 */
