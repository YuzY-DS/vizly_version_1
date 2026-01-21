/**
 * useWorkspace Hook
 * 
 * Custom hook for managing workspace items (dashboards, reports, datasets)
 */

import { useState, useCallback } from "react";
import type { WorkspaceItem } from "../types";
import { MOCK_WORKSPACE_ITEMS } from "../constants/mockData";
import { generateId } from "../utils/helpers";

export function useWorkspace(initialItems?: WorkspaceItem[]) {
  const [items, setItems] = useState<WorkspaceItem[]>(
    initialItems || MOCK_WORKSPACE_ITEMS
  );

  // Add a new item
  const addItem = useCallback((item: Omit<WorkspaceItem, "id">) => {
    const newItem: WorkspaceItem = {
      ...item,
      id: generateId(item.type.toLowerCase()),
    };
    setItems((prev) => [...prev, newItem]);
    return newItem;
  }, []);

  // Update an existing item
  const updateItem = useCallback((id: string, updates: Partial<WorkspaceItem>) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, ...updates } : item
      )
    );
  }, []);

  // Delete an item
  const deleteItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  // Get item by ID
  const getItem = useCallback(
    (id: string) => {
      return items.find((item) => item.id === id);
    },
    [items]
  );

  // Filter items by type
  const getItemsByType = useCallback(
    (type: WorkspaceItem["type"] | "All") => {
      if (type === "All") return items;
      return items.filter((item) => item.type === type);
    },
    [items]
  );

  // Get grouped items
  const getGroupedItems = useCallback(() => {
    return {
      dashboards: items.filter((item) => item.type === "Dashboard"),
      reports: items.filter((item) => item.type === "Report"),
      datasets: items.filter((item) => item.type === "Dataset"),
    };
  }, [items]);

  // Search items
  const searchItems = useCallback(
    (searchTerm: string) => {
      if (!searchTerm) return items;
      const lowerSearch = searchTerm.toLowerCase();
      return items.filter(
        (item) =>
          item.name.toLowerCase().includes(lowerSearch) ||
          item.description?.toLowerCase().includes(lowerSearch)
      );
    },
    [items]
  );

  return {
    items,
    setItems,
    addItem,
    updateItem,
    deleteItem,
    getItem,
    getItemsByType,
    getGroupedItems,
    searchItems,
  };
}
