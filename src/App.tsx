import { useState } from 'react';
import WorkspaceHome from './components/WorkspaceHome';
import WorkspaceScreen from './components/WorkspaceScreen';
import ReportBuilder from './components/ReportBuilder';
import ShareExportModal from './components/ShareExportModal';
import Login from './components/Login/Login';
import SignUp from './components/auth/SignUp';
import ForgotPassword from './components/auth/ForgotPassword';
import DataTableView from './components/DataTableView';
import DashboardView from './components/DashboardView';
import CommunityHub from './components/CommunityHub';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authScreen, setAuthScreen] = useState<'login' | 'signup' | 'forgot'>('login');
  const [currentScreen, setCurrentScreen] = useState<'home' | 'workspace' | 'builder' | 'dataview' | 'dashboardview' | 'community'>('workspace');
  const [showShareModal, setShowShareModal] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedDataSource, setSelectedDataSource] = useState<any>(null);
  const [selectedDashboard, setSelectedDashboard] = useState<any>(null);
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [userPlan, setUserPlan] = useState<'normal' | 'pro'>('normal'); // User subscription plan
  
  // Workspace items state - shared between workspace and community
  const [workspaceItems, setWorkspaceItems] = useState<any[]>([]);
  
  // Community published workspaces - user's published items
  const [publishedWorkspaces, setPublishedWorkspaces] = useState<any[]>([]);
  
  // Community workspaces from other users (with stats)
  const [communityWorkspaces, setCommunityWorkspaces] = useState<any[]>([]);

  // Set data-theme attribute on root element for CSS variables
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  }

  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentScreen('home'); // Start at WorkspaceHome (main home)
  };

  const handleSignUp = () => {
    setIsAuthenticated(true);
    setCurrentScreen('home'); // Start at WorkspaceHome
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAuthScreen('login');
    setCurrentScreen('home');
  };

  const handleUpgrade = () => {
    // Toggle plan for demo purposes
    setUserPlan(userPlan === 'normal' ? 'pro' : 'normal');
    alert(userPlan === 'normal' ? 'Upgraded to Pro Plan!' : 'Downgraded to Normal Plan!');
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        {!isAuthenticated ? (
          <>
            {authScreen === 'login' && (
              <Login 
                onLogin={handleLogin}
                onNavigateToSignUp={() => setAuthScreen('signup')}
                onNavigateToForgot={() => setAuthScreen('forgot')}
                darkMode={darkMode}
                onToggleDarkMode={setDarkMode}
              />
            )}
            
            {authScreen === 'signup' && (
              <SignUp 
                onSignUp={handleSignUp}
                onNavigateToLogin={() => setAuthScreen('login')}
                darkMode={darkMode}
                onToggleDarkMode={setDarkMode}
              />
            )}
            
            {authScreen === 'forgot' && (
              <ForgotPassword 
                onComplete={() => setAuthScreen('login')}
                onNavigateToLogin={() => setAuthScreen('login')}
                darkMode={darkMode}
                onToggleDarkMode={setDarkMode}
              />
            )}
          </>
        ) : (
          <>
            {currentScreen === 'home' && (
              <WorkspaceHome 
                onNavigate={setCurrentScreen}
                onLogout={handleLogout}
                darkMode={darkMode}
                onToggleDarkMode={setDarkMode}
              />
            )}
            
            {currentScreen === 'workspace' && (
              <WorkspaceScreen 
                onNavigate={setCurrentScreen}
                onLogout={handleLogout}
                darkMode={darkMode}
                onToggleDarkMode={setDarkMode}
                onSelectDataSource={(dataSource) => {
                  setSelectedDataSource(dataSource);
                  setCurrentScreen('dataview');
                }}
                onSelectDashboard={(dashboard) => {
                  setSelectedDashboard(dashboard);
                  setCurrentScreen('dashboardview');
                }}
                onSelectReport={(report) => {
                  setSelectedReport(report);
                  setCurrentScreen('builder');
                }}
                userPlan={userPlan}
                onUpgradePlan={handleUpgrade}
              />
            )}
            
            {currentScreen === 'builder' && (
              <ReportBuilder 
                onNavigate={setCurrentScreen}
                darkMode={darkMode}
                onToggleDarkMode={setDarkMode}
                report={selectedReport}
                onCreateDashboard={(dashboard) => {
                  setSelectedDashboard(dashboard);
                  setCurrentScreen('dashboardview');
                }}
              />
            )}

            {currentScreen === 'dataview' && (
              <DataTableView 
                onNavigate={setCurrentScreen}
                dataSource={selectedDataSource}
                darkMode={darkMode}
                onToggleDarkMode={setDarkMode}
              />
            )}

            {currentScreen === 'dashboardview' && (
              <DashboardView 
                onNavigate={setCurrentScreen}
                dashboard={selectedDashboard}
                darkMode={darkMode}
                onToggleDarkMode={setDarkMode}
              />
            )}

            {currentScreen === 'community' && (
              <CommunityHub 
                onNavigate={setCurrentScreen}
                onLogout={handleLogout}
                darkMode={darkMode}
                onToggleDarkMode={setDarkMode}
                userPlan={userPlan}
                onUpgradePlan={handleUpgrade}
                workspaceItems={workspaceItems}
                setWorkspaceItems={setWorkspaceItems}
                publishedWorkspaces={publishedWorkspaces}
                setPublishedWorkspaces={setPublishedWorkspaces}
                communityWorkspaces={communityWorkspaces}
                setCommunityWorkspaces={setCommunityWorkspaces}
              />
            )}

            {showShareModal && (
              <ShareExportModal onClose={() => setShowShareModal(false)} />
            )}
          </>
        )}
      </div>
    </div>
  );
}