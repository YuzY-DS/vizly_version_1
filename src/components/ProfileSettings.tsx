import { useState } from 'react';
import { X, User, Mail, Lock, Bell, Globe, Palette, Shield, Trash2, Upload, Camera, Eye, EyeOff, Check, ChevronRight, Save, LogOut, Crown, Zap, Star, TrendingUp } from 'lucide-react';

interface ProfileSettingsProps {
  onClose: () => void;
  onLogout: () => void;
  darkMode: boolean;
  onToggleDarkMode: (value: boolean) => void;
  userPlan?: 'normal' | 'pro';
  onUpgradePlan?: () => void;
}

export default function ProfileSettings({ onClose, onLogout, darkMode, onToggleDarkMode, userPlan = 'normal', onUpgradePlan }: ProfileSettingsProps) {
  const [activeSection, setActiveSection] = useState<'profile' | 'security' | 'preferences' | 'notifications' | 'subscription' | 'account'>('profile');
  
  // Profile state
  const [fullName, setFullName] = useState('kong');
  const [username, setUsername] = useState('kong');
  const [email, setEmail] = useState('kong@gmail.com');
  const [bio, setBio] = useState('Analytics enthusiast and data visualization expert');
  const [company, setCompany] = useState('Acme Corporation');
  const [role, setRole] = useState('Data Analyst');
  
  // Security state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  
  // Preferences state
  const [language, setLanguage] = useState('en');
  const [timezone, setTimezone] = useState('UTC-8');
  const [dateFormat, setDateFormat] = useState('MM/DD/YYYY');
  
  // Notifications state
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [reportUpdates, setReportUpdates] = useState(true);
  const [shareNotifications, setShareNotifications] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(false);
  const [commentNotifications, setCommentNotifications] = useState(true);

  const menuItems = [
    { id: 'profile', label: 'Profile Information', icon: User },
    { id: 'security', label: 'Security & Login', icon: Shield },
    { id: 'preferences', label: 'Preferences', icon: Palette },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'subscription', label: 'Subscription', icon: Zap },
    { id: 'account', label: 'Account Management', icon: Trash2 },
  ];

  const handleSaveProfile = () => {
    // Save profile logic
    alert('Profile saved successfully!');
  };

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    // Change password logic
    alert('Password changed successfully!');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div>
            <h2 className="text-gray-900 dark:text-white">Settings</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">Manage your account settings and preferences</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        {/* Main Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar Menu */}
          <div className="w-64 border-r border-gray-200 dark:border-gray-700 p-4 overflow-y-auto custom-scrollbar">
            <nav className="space-y-1">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id as any)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                    activeSection === item.id
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </div>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ))}
            </nav>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
            {/* Profile Information */}
            {activeSection === 'profile' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-gray-900 dark:text-white mb-1">Profile Information</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Update your personal details and profile picture</p>
                </div>

                {/* Profile Picture */}
                <div className="flex items-center space-x-6">
                  <div className="relative">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl">
                      K
                    </div>
                    <button className="absolute bottom-0 right-0 w-8 h-8 bg-white dark:bg-gray-700 rounded-full flex items-center justify-center shadow-lg border-2 border-white dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                      <Camera className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                    </button>
                  </div>
                  <div>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mb-2">
                      Upload Photo
                    </button>
                    <p className="text-sm text-gray-600 dark:text-gray-400">JPG, PNG or GIF. Max size 2MB.</p>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-700 dark:text-gray-300 mb-2 block">Full Name</label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-700 dark:text-gray-300 mb-2 block">Username</label>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-700 dark:text-gray-300 mb-2 block">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-700 dark:text-gray-300 mb-2 block">Bio</label>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-700 dark:text-gray-300 mb-2 block">Company</label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-700 dark:text-gray-300 mb-2 block">Role</label>
                    <input
                      type="text"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    onClick={onClose}
                    className="px-6 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveProfile}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </button>
                </div>
              </div>
            )}

            {/* Security & Login */}
            {activeSection === 'security' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-gray-900 dark:text-white mb-1">Security & Login</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Manage your password and security preferences</p>
                </div>

                {/* Change Password */}
                <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                  <h4 className="text-gray-900 dark:text-white mb-4">Change Password</h4>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-gray-700 dark:text-gray-300 mb-2 block">Current Password</label>
                      <div className="relative">
                        <input
                          type={showCurrentPassword ? 'text' : 'password'}
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          className="w-full px-4 py-2 pr-12 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                        />
                        <button
                          type="button"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        >
                          {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm text-gray-700 dark:text-gray-300 mb-2 block">New Password</label>
                      <div className="relative">
                        <input
                          type={showNewPassword ? 'text' : 'password'}
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="w-full px-4 py-2 pr-12 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        >
                          {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm text-gray-700 dark:text-gray-300 mb-2 block">Confirm New Password</label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="w-full px-4 py-2 pr-12 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        >
                          {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={handleChangePassword}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Update Password
                    </button>
                  </div>
                </div>

                {/* Two-Factor Authentication */}
                <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-gray-900 dark:text-white mb-1">Two-Factor Authentication</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Add an extra layer of security to your account</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={twoFactorEnabled}
                        onChange={(e) => setTwoFactorEnabled(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  {twoFactorEnabled && (
                    <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                      <p className="text-sm text-blue-800 dark:text-blue-300">
                        Two-factor authentication is enabled. You'll need to enter a code from your authenticator app when logging in.
                      </p>
                    </div>
                  )}
                </div>

                {/* Active Sessions */}
                <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                  <h4 className="text-gray-900 dark:text-white mb-4">Active Sessions</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg">
                      <div>
                        <p className="text-gray-900 dark:text-white">Chrome on MacOS</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">San Francisco, CA • Current session</p>
                      </div>
                      <span className="px-3 py-1 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-full text-sm">
                        Active
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg">
                      <div>
                        <p className="text-gray-900 dark:text-white">Safari on iPhone</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Last active 2 hours ago</p>
                      </div>
                      <button className="text-red-600 dark:text-red-400 hover:underline text-sm">
                        Revoke
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Preferences */}
            {activeSection === 'preferences' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-gray-900 dark:text-white mb-1">Preferences</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Customize your experience</p>
                </div>

                {/* Theme */}
                <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                  <h4 className="text-gray-900 dark:text-white mb-4">Appearance</h4>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-900 dark:text-white mb-1">Dark Mode</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Use dark theme across the application</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={darkMode}
                        onChange={(e) => onToggleDarkMode(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>

                {/* Language & Region */}
                <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                  <h4 className="text-gray-900 dark:text-white mb-4">Language & Region</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-gray-700 dark:text-gray-300 mb-2 block">Language</label>
                      <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                      >
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                        <option value="ja">Japanese</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm text-gray-700 dark:text-gray-300 mb-2 block">Timezone</label>
                      <select
                        value={timezone}
                        onChange={(e) => setTimezone(e.target.value)}
                        className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                      >
                        <option value="UTC-8">Pacific Time (UTC-8)</option>
                        <option value="UTC-5">Eastern Time (UTC-5)</option>
                        <option value="UTC+0">UTC</option>
                        <option value="UTC+1">Central European Time (UTC+1)</option>
                        <option value="UTC+9">Japan Standard Time (UTC+9)</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm text-gray-700 dark:text-gray-300 mb-2 block">Date Format</label>
                      <select
                        value={dateFormat}
                        onChange={(e) => setDateFormat(e.target.value)}
                        className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                      >
                        <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                        <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                        <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    onClick={() => alert('Preferences saved!')}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Preferences</span>
                  </button>
                </div>
              </div>
            )}

            {/* Notifications */}
            {activeSection === 'notifications' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-gray-900 dark:text-white mb-1">Notifications</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Manage how you receive notifications</p>
                </div>

                {/* Email Notifications */}
                <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                  <h4 className="text-gray-900 dark:text-white mb-4">Email Notifications</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-900 dark:text-white">All Email Notifications</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Receive email updates about your account</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={emailNotifications}
                          onChange={(e) => setEmailNotifications(e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-900 dark:text-white">Report Updates</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Get notified when reports are updated</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={reportUpdates}
                          onChange={(e) => setReportUpdates(e.target.checked)}
                          disabled={!emailNotifications}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 peer-disabled:opacity-50"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-900 dark:text-white">Share Notifications</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">When someone shares a report with you</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={shareNotifications}
                          onChange={(e) => setShareNotifications(e.target.checked)}
                          disabled={!emailNotifications}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 peer-disabled:opacity-50"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-900 dark:text-white">Comments & Mentions</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">When someone comments or mentions you</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={commentNotifications}
                          onChange={(e) => setCommentNotifications(e.target.checked)}
                          disabled={!emailNotifications}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 peer-disabled:opacity-50"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-900 dark:text-white">Weekly Digest</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Summary of your activity every week</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={weeklyDigest}
                          onChange={(e) => setWeeklyDigest(e.target.checked)}
                          disabled={!emailNotifications}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 peer-disabled:opacity-50"></div>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    onClick={() => alert('Notification preferences saved!')}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Preferences</span>
                  </button>
                </div>
              </div>
            )}

            {/* Subscription */}
            {activeSection === 'subscription' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-gray-900 dark:text-white mb-1">Subscription</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Manage your subscription plan</p>
                </div>

                {/* Current Plan Card */}
                <div className={`rounded-xl p-6 border-2 ${
                  userPlan === 'pro'
                    ? 'bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 border-blue-200 dark:border-blue-800'
                    : 'bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700'
                }`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      {userPlan === 'pro' ? (
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                          <Crown className="w-6 h-6 text-white" />
                        </div>
                      ) : (
                        <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-xl flex items-center justify-center">
                          <Star className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                        </div>
                      )}
                      <div>
                        <h4 className="text-gray-900 dark:text-white flex items-center space-x-2">
                          <span>{userPlan === 'pro' ? 'Pro Plan' : 'Normal Plan'}</span>
                          {userPlan === 'pro' && (
                            <span className="px-2 py-0.5 bg-blue-600 text-white text-xs rounded-full">Active</span>
                          )}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {userPlan === 'pro' ? '$29/month' : 'Free forever'}
                        </p>
                      </div>
                    </div>
                    {userPlan === 'normal' && (
                      <button
                        onClick={onUpgradePlan}
                        className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg flex items-center space-x-2"
                      >
                        <Zap className="w-4 h-4" />
                        <span>Upgrade Now</span>
                      </button>
                    )}
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Storage</span>
                      <span className="text-gray-900 dark:text-white">
                        2.4 GB / {userPlan === 'pro' ? '100 GB' : '10 GB'}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all"
                        style={{ width: userPlan === 'pro' ? '2.4%' : '24%' }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Plan Comparison */}
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                  <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                    <h4 className="text-gray-900 dark:text-white">Compare Plans</h4>
                  </div>
                  <div className="grid grid-cols-2 divide-x divide-gray-200 dark:divide-gray-700">
                    {/* Normal Plan */}
                    <div className="p-6">
                      <div className="text-center mb-6">
                        <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center mx-auto mb-3">
                          <Star className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                        </div>
                        <h5 className="text-gray-900 dark:text-white mb-1">Normal</h5>
                        <p className="text-2xl text-gray-900 dark:text-white mb-1">$0</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Free forever</p>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-start space-x-2">
                          <Check className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">10 GB storage</span>
                        </div>
                        <div className="flex items-start space-x-2">
                          <Check className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">5 dashboards</span>
                        </div>
                        <div className="flex items-start space-x-2">
                          <Check className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">Basic charts</span>
                        </div>
                        <div className="flex items-start space-x-2">
                          <Check className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">10 datasets</span>
                        </div>
                        <div className="flex items-start space-x-2">
                          <Check className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">Email support</span>
                        </div>
                        <div className="flex items-start space-x-2 opacity-40">
                          <X className="w-5 h-5 text-gray-400 dark:text-gray-600 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-500 dark:text-gray-500">Advanced analytics</span>
                        </div>
                        <div className="flex items-start space-x-2 opacity-40">
                          <X className="w-5 h-5 text-gray-400 dark:text-gray-600 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-500 dark:text-gray-500">AI Assistant</span>
                        </div>
                        <div className="flex items-start space-x-2 opacity-40">
                          <X className="w-5 h-5 text-gray-400 dark:text-gray-600 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-500 dark:text-gray-500">Priority support</span>
                        </div>
                      </div>
                    </div>

                    {/* Pro Plan */}
                    <div className="p-6 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/20">
                      <div className="text-center mb-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                          <Crown className="w-6 h-6 text-white" />
                        </div>
                        <h5 className="text-gray-900 dark:text-white mb-1">Pro</h5>
                        <p className="text-2xl text-gray-900 dark:text-white mb-1">$29</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">per month</p>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-start space-x-2">
                          <Check className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">100 GB storage</span>
                        </div>
                        <div className="flex items-start space-x-2">
                          <Check className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">Unlimited dashboards</span>
                        </div>
                        <div className="flex items-start space-x-2">
                          <Check className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">All chart types</span>
                        </div>
                        <div className="flex items-start space-x-2">
                          <Check className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">Unlimited datasets</span>
                        </div>
                        <div className="flex items-start space-x-2">
                          <Check className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">Priority email support</span>
                        </div>
                        <div className="flex items-start space-x-2">
                          <Check className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">Advanced analytics</span>
                        </div>
                        <div className="flex items-start space-x-2">
                          <Check className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">AI Assistant (Zia)</span>
                        </div>
                        <div className="flex items-start space-x-2">
                          <Check className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">24/7 priority support</span>
                        </div>
                      </div>
                      {userPlan === 'normal' && (
                        <button
                          onClick={onUpgradePlan}
                          className="w-full mt-6 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg flex items-center justify-center space-x-2"
                        >
                          <Zap className="w-4 h-4" />
                          <span>Upgrade to Pro</span>
                        </button>
                      )}
                      {userPlan === 'pro' && (
                        <div className="mt-6 px-4 py-2.5 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-lg flex items-center justify-center space-x-2">
                          <Check className="w-4 h-4" />
                          <span>Current Plan</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Billing Information */}
                {userPlan === 'pro' && (
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                    <h4 className="text-gray-900 dark:text-white mb-4">Billing Information</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Next billing date</span>
                        <span className="text-gray-900 dark:text-white">Feb 15, 2024</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Payment method</span>
                        <span className="text-gray-900 dark:text-white">•••• 4242</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Amount</span>
                        <span className="text-gray-900 dark:text-white">$29.00 USD</span>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex space-x-3">
                      <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm">
                        Update Payment Method
                      </button>
                      <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm">
                        View Invoice History
                      </button>
                    </div>
                  </div>
                )}

                {/* Cancel Subscription */}
                {userPlan === 'pro' && (
                  <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6 border border-red-200 dark:border-red-800">
                    <h4 className="text-red-900 dark:text-red-400 mb-2">Cancel Subscription</h4>
                    <p className="text-sm text-red-700 dark:text-red-300 mb-4">
                      You'll lose access to Pro features at the end of your billing period (Feb 15, 2024)
                    </p>
                    <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm">
                      Cancel Pro Plan
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Account Management */}
            {activeSection === 'account' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-gray-900 dark:text-white mb-1">Account Management</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Manage your account and data</p>
                </div>

                {/* Account Status */}
                <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                  <h4 className="text-gray-900 dark:text-white mb-4">Account Status</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Account Type</span>
                      <span className="text-gray-900 dark:text-white">Premium</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Member Since</span>
                      <span className="text-gray-900 dark:text-white">January 2024</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Storage Used</span>
                      <span className="text-gray-900 dark:text-white">2.4 GB of 10 GB</span>
                    </div>
                  </div>
                </div>

                {/* Download Data */}
                <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                  <h4 className="text-gray-900 dark:text-white mb-2">Download Your Data</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Request a copy of all your data including reports, dashboards, and settings
                  </p>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                    <Upload className="w-4 h-4" />
                    <span>Request Data Export</span>
                  </button>
                </div>

                {/* Log Out All Devices */}
                <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                  <h4 className="text-gray-900 dark:text-white mb-2">Log Out All Devices</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Sign out from all devices except this one
                  </p>
                  <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center space-x-2">
                    <LogOut className="w-4 h-4" />
                    <span>Log Out All Sessions</span>
                  </button>
                </div>

                {/* Delete Account */}
                <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6 border border-red-200 dark:border-red-800">
                  <h4 className="text-red-900 dark:text-red-400 mb-2">Delete Account</h4>
                  <p className="text-sm text-red-700 dark:text-red-300 mb-4">
                    Permanently delete your account and all associated data. This action cannot be undone.
                  </p>
                  <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2">
                    <Trash2 className="w-4 h-4" />
                    <span>Delete Account</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}