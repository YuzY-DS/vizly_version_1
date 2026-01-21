import { Bell, Check, X, Share2, Upload, Globe, FileText, Settings, Trash2, CheckCheck } from 'lucide-react';
import { useState } from 'react';

interface Notification {
  id: string;
  type: 'share' | 'import' | 'publish' | 'report' | 'system';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  iconColor?: string;
}

interface NotificationPanelProps {
  darkMode: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: "n1",
    type: "share",
    title: "Workspace Shared",
    message: "Sarah Chen shared 'Sales Analytics Q4' with you",
    timestamp: "2 minutes ago",
    read: false,
    iconColor: "blue",
  },
  {
    id: "n2",
    type: "import",
    title: "Data Import Complete",
    message: "Successfully imported 15,234 rows from 'customer_data.csv'",
    timestamp: "15 minutes ago",
    read: false,
    iconColor: "green",
  },
  {
    id: "n3",
    type: "publish",
    title: "Workspace Published",
    message: "Your 'Marketing Dashboard' is now live in the community",
    timestamp: "1 hour ago",
    read: false,
    iconColor: "purple",
  },
  {
    id: "n4",
    type: "report",
    title: "Report Generation Complete",
    message: "Monthly Revenue Report is ready for download",
    timestamp: "3 hours ago",
    read: true,
    iconColor: "orange",
  },
  {
    id: "n5",
    type: "system",
    title: "Storage Alert",
    message: "You've used 80% of your storage quota",
    timestamp: "Yesterday",
    read: true,
    iconColor: "red",
  },
  {
    id: "n6",
    type: "share",
    title: "Collaboration Invite",
    message: "Mike Chen invited you to collaborate on 'Product Analytics'",
    timestamp: "2 days ago",
    read: true,
    iconColor: "blue",
  },
];

export default function NotificationPanel({ darkMode }: NotificationPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  
  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'share':
        return Share2;
      case 'import':
        return Upload;
      case 'publish':
        return Globe;
      case 'report':
        return FileText;
      case 'system':
        return Settings;
      default:
        return Bell;
    }
  };

  const getIconColorClass = (color?: string, read?: boolean) => {
    if (read) return 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500';
    
    switch (color) {
      case 'blue':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400';
      case 'green':
        return 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400';
      case 'purple':
        return 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400';
      case 'orange':
        return 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400';
      case 'red':
        return 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400';
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <div className="relative">
      {/* Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2.5 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all group"
      >
        <Bell className="w-5 h-5 group-hover:scale-110 transition-transform" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Panel */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Panel */}
          <div className="absolute right-0 mt-2 w-96 max-h-[600px] bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden flex flex-col">
            {/* Header */}
            <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <h3 className="text-gray-900 dark:text-white">Notifications</h3>
                  {unreadCount > 0 && (
                    <span className="px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </button>
              </div>
              
              {/* Action Buttons */}
              {notifications.length > 0 && (
                <div className="flex items-center gap-2">
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-600"
                    >
                      <CheckCheck className="w-3.5 h-3.5" />
                      Mark all read
                    </button>
                  )}
                  <button
                    onClick={clearAll}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-gray-800 text-red-600 dark:text-red-400 text-xs rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors border border-gray-200 dark:border-gray-600"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Clear all
                  </button>
                </div>
              )}
            </div>

            {/* Notifications List */}
            <div className="overflow-y-auto flex-1">
              {notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 px-4">
                  <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                    <Bell className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-900 dark:text-white mb-1">All caught up!</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                    No notifications at the moment
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100 dark:divide-gray-700">
                  {notifications.map((notification) => {
                    const Icon = getNotificationIcon(notification.type);
                    return (
                      <div
                        key={notification.id}
                        onClick={() => markAsRead(notification.id)}
                        className={`px-5 py-4 cursor-pointer transition-all hover:bg-gray-50 dark:hover:bg-gray-700/50 group ${
                          !notification.read ? 'bg-blue-50/30 dark:bg-blue-900/10' : ''
                        }`}
                      >
                        <div className="flex gap-3">
                          {/* Icon */}
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${getIconColorClass(notification.iconColor, notification.read)}`}>
                            <Icon className="w-5 h-5" />
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <h4 className={`text-sm ${notification.read ? 'text-gray-700 dark:text-gray-300' : 'text-gray-900 dark:text-white'}`}>
                                {notification.title}
                              </h4>
                              {!notification.read && (
                                <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1" />
                              )}
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                              {notification.message}
                            </p>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-gray-500 dark:text-gray-500">
                                {notification.timestamp}
                              </span>
                              <button
                                onClick={(e) => deleteNotification(notification.id, e)}
                                className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-all"
                              >
                                <Trash2 className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <div className="px-5 py-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                <button className="w-full text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors text-center">
                  View all notifications
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
