/**
 * useNotifications Hook
 * 
 * Custom hook for managing user notifications
 */

import { useState, useCallback } from "react";
import type { Notification } from "../types";
import { MOCK_NOTIFICATIONS } from "../constants/mockData";
import { generateId } from "../utils/helpers";

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>(
    MOCK_NOTIFICATIONS
  );
  const [isOpen, setIsOpen] = useState(false);

  // Add a new notification
  const addNotification = useCallback((
    notification: Omit<Notification, "id" | "read">
  ) => {
    const newNotification: Notification = {
      ...notification,
      id: generateId("notif"),
      read: false,
    };
    setNotifications((prev) => [newNotification, ...prev]);
    return newNotification;
  }, []);

  // Mark notification as read
  const markAsRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  }, []);

  // Mark all as read
  const markAllAsRead = useCallback(() => {
    setNotifications((prev) =>
      prev.map((notif) => ({ ...notif, read: true }))
    );
  }, []);

  // Delete a notification
  const deleteNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  }, []);

  // Clear all notifications
  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  // Get unread count
  const unreadCount = notifications.filter((n) => !n.read).length;

  // Toggle dropdown
  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const closeDropdown = useCallback(() => {
    setIsOpen(false);
  }, []);

  return {
    notifications,
    unreadCount,
    isOpen,
    addNotification,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAll,
    toggleOpen,
    closeDropdown,
  };
}
