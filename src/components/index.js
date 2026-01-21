/**
 * Component Exports
 * 
 * Centralized export file for all refactored components
 * Makes importing components easier across the application
 */

// ============================================
// Refactored Components (CSS Modules)
// ============================================

export { default as Login } from './Login/Login';
export { default as Button } from './Button/Button';

// ============================================
// To Be Refactored (Still using Tailwind)
// ============================================

// Authentication
export { default as SignUp } from './auth/SignUp';
export { default as ForgotPassword } from './auth/ForgotPassword';

// Main Views
export { default as WorkspaceHome } from './WorkspaceHome';
export { default as WorkspaceScreen } from './WorkspaceScreen';
export { default as ReportBuilder } from './ReportBuilder';
export { default as DataTableView } from './DataTableView';
export { default as DashboardView } from './DashboardView';
export { default as CommunityHub } from './CommunityHub';

// Modals & Overlays
export { default as ProfileSettings } from './ProfileSettings';
export { default as ImportDataModal } from './ImportDataModal';
export { default as ShareExportModal } from './ShareExportModal';
export { default as DataPreviewModal } from './DataPreviewModal';
export { default as EditItemModal } from './EditItemModal';
export { default as PublishWorkspaceModal } from './PublishWorkspaceModal';
export { default as SaveExportModal } from './SaveExportModal';
export { default as DataProcessingModal } from './DataProcessingModal';

// Shared Components
export { Card } from './shared/Card';
export { Badge } from './shared/Badge';

/**
 * Usage Examples:
 * 
 * // Single import
 * import { Login } from './components';
 * 
 * // Multiple imports
 * import { Login, Button, WorkspaceHome } from './components';
 * 
 * // Default import (if needed)
 * import Login from './components/Login/Login';
 */
