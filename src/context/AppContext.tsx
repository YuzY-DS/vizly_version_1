/**
 * App Context
 * 
 * Global application state management using React Context
 * Provides centralized state for authentication, theme, user data, etc.
 */

import { createContext, useContext, useState, ReactNode } from "react";
import type { AuthScreen, Screen, UserPlan } from "../types";

// ============================================================================
// Context Type Definition
// ============================================================================

interface AppContextType {
  // Authentication
  isAuthenticated: boolean;
  authScreen: AuthScreen;
  setAuthScreen: (screen: AuthScreen) => void;
  login: () => void;
  logout: () => void;

  // Navigation
  currentScreen: Screen;
  navigateTo: (screen: Screen) => void;

  // Theme
  darkMode: boolean;
  toggleDarkMode: () => void;

  // User
  userPlan: UserPlan;
  upgradePlan: () => void;

  // Selected Items (for navigation between screens)
  selectedDataSource: any;
  setSelectedDataSource: (dataSource: any) => void;
  selectedDashboard: any;
  setSelectedDashboard: (dashboard: any) => void;
  selectedReport: any;
  setSelectedReport: (report: any) => void;
}

// ============================================================================
// Create Context
// ============================================================================

const AppContext = createContext<AppContextType | undefined>(undefined);

// ============================================================================
// Provider Component
// ============================================================================

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authScreen, setAuthScreen] = useState<AuthScreen>("login");

  // Navigation state
  const [currentScreen, setCurrentScreen] = useState<Screen>("workspace");

  // Theme state
  const [darkMode, setDarkMode] = useState(false);

  // User state
  const [userPlan, setUserPlan] = useState<UserPlan>("normal");

  // Selected items state
  const [selectedDataSource, setSelectedDataSource] = useState<any>(null);
  const [selectedDashboard, setSelectedDashboard] = useState<any>(null);
  const [selectedReport, setSelectedReport] = useState<any>(null);

  // Authentication actions
  const login = () => {
    setIsAuthenticated(true);
    setCurrentScreen("home");
  };

  const logout = () => {
    setIsAuthenticated(false);
    setAuthScreen("login");
    setCurrentScreen("home");
  };

  // Navigation actions
  const navigateTo = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  // Theme actions
  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  // User actions
  const upgradePlan = () => {
    setUserPlan((prev) => (prev === "normal" ? "pro" : "normal"));
  };

  // Context value
  const value: AppContextType = {
    isAuthenticated,
    authScreen,
    setAuthScreen,
    login,
    logout,
    currentScreen,
    navigateTo,
    darkMode,
    toggleDarkMode,
    userPlan,
    upgradePlan,
    selectedDataSource,
    setSelectedDataSource,
    selectedDashboard,
    setSelectedDashboard,
    selectedReport,
    setSelectedReport,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// ============================================================================
// Custom Hook
// ============================================================================

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
