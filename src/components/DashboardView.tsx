import { useState, useRef, useEffect } from 'react';
import { Search, Grid3x3, Moon, Sun, User, Settings, BarChart3, FileText, Database, LogOut, UserCog, Send, Bot, Sparkles, GripVertical, Trash2, Plus, ArrowLeft, Undo2, Redo2, Save, Download, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize2, AlignLeft, AlignCenter, AlignRight, Grid2x2, Layers, Copy, Palette, Settings2, X } from 'lucide-react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ProfileSettings from './ProfileSettings';
import SaveExportModal from './SaveExportModal';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

interface DashboardViewProps {
  onNavigate: (screen: 'home' | 'workspace' | 'builder' | 'dataview') => void;
  onLogout: () => void;
  darkMode: boolean;
  onToggleDarkMode: (value: boolean) => void;
  dashboard: any;
}

interface DashboardItem {
  id: string;
  name: string;
  type: 'Report' | 'Chart' | 'Table';
  icon: any;
  color: string;
}

interface CanvasItem extends DashboardItem {
  gridColumn: number;
  gridRow: number;
  colSpan: number;
  rowSpan: number;
}

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  actions?: Array<{ label: string; onClick: () => void }>;
}

const DraggableDashboardItem = ({ item, onQuickAdd }: { item: DashboardItem; onQuickAdd: (item: DashboardItem) => void }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'dashboard-item',
    item: item,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      onDoubleClick={() => onQuickAdd(item)}
      className={`bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-all cursor-move group relative ${
        isDragging ? 'opacity-50' : ''
      }`}
      title="Drag to canvas or double-click to quick add"
    >
      <div className="flex items-center space-x-3">
        <div className={`w-10 h-10 ${item.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
          <item.icon className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-gray-900 dark:text-white text-sm truncate">{item.name}</h4>
          <p className="text-gray-500 dark:text-gray-400 text-xs">{item.type}</p>
        </div>
        <GripVertical className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onQuickAdd(item);
        }}
        className="absolute top-2 right-2 p-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded opacity-0 group-hover:opacity-100 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-all"
        title="Quick add"
      >
        <Plus className="w-3 h-3" />
      </button>
    </div>
  );
};

const CanvasDroppedItem = ({ 
  item, 
  onDelete, 
  onMove, 
  isSelected,
  onSelect,
  onResize
}: { 
  item: CanvasItem; 
  onDelete: (id: string) => void; 
  onMove: (id: string, x: number, y: number) => void;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onResize: (id: string, colSpan: number, rowSpan: number) => void;
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'canvas-item',
    item: { id: item.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [isResizing, setIsResizing] = useState(false);

  const handleResizeStart = (e: React.MouseEvent, direction: 'width' | 'height' | 'both') => {
    e.stopPropagation();
    setIsResizing(true);
    
    const startX = e.clientX;
    const startY = e.clientY;
    const startColSpan = item.colSpan;
    const startRowSpan = item.rowSpan;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const deltaY = moveEvent.clientY - startY;
      
      let newColSpan = startColSpan;
      let newRowSpan = startRowSpan;

      if (direction === 'width' || direction === 'both') {
        const colChange = Math.round(deltaX / 100);
        newColSpan = Math.max(2, Math.min(12, startColSpan + colChange));
      }
      
      if (direction === 'height' || direction === 'both') {
        const rowChange = Math.round(deltaY / 100);
        newRowSpan = Math.max(1, Math.min(4, startRowSpan + rowChange));
      }

      if (newColSpan !== item.colSpan || newRowSpan !== item.rowSpan) {
        onResize(item.id, newColSpan, newRowSpan);
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const sampleData = [
    { name: 'East', value: 6603.75, percentage: 43.05 },
    { name: 'Central', value: 2975.73, percentage: 19.40 },
    { name: 'West', value: 5760.62, percentage: 37.55 },
  ];

  const pieData = [
    { name: 'Electronics', value: 4330 },
    { name: 'Furniture', value: 2720 },
  ];

  const COLORS = ['#8b5cf6', '#ec4899', '#f59e0b', '#10b981'];

  const renderChart = () => {
    if (item.type === 'Chart') {
      if (item.name.includes('Revenue')) {
        return (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={sampleData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-gray-300 dark:stroke-gray-600" />
              <XAxis dataKey="name" className="text-gray-600 dark:text-gray-400" fontSize={12} />
              <YAxis className="text-gray-600 dark:text-gray-400" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="value" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );
      } else if (item.name.includes('Region') || item.name.includes('Category')) {
        return (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        );
      } else {
        return (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={sampleData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-gray-300 dark:stroke-gray-600" />
              <XAxis dataKey="name" className="text-gray-600 dark:text-gray-400" fontSize={12} />
              <YAxis className="text-gray-600 dark:text-gray-400" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Line type="monotone" dataKey="sales" stroke="#ec4899" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        );
      }
    } else if (item.type === 'Report') {
      // Different chart types for different reports
      if (item.name === 'Monthly Revenue Analysis') {
        return (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={sampleData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-gray-300 dark:stroke-gray-600" />
              <XAxis dataKey="name" className="text-gray-600 dark:text-gray-400" fontSize={12} />
              <YAxis className="text-gray-600 dark:text-gray-400" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="value" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );
      } else if (item.name === 'Category Growth Trends') {
        return (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={sampleData}>
              <defs>
                <linearGradient id={`colorValue-${item.id}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-gray-300 dark:stroke-gray-600" />
              <XAxis dataKey="name" className="text-gray-600 dark:text-gray-400" fontSize={12} />
              <YAxis className="text-gray-600 dark:text-gray-400" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Area type="monotone" dataKey="value" stroke="#10b981" fillOpacity={1} fill={`url(#colorValue-${item.id})`} />
            </AreaChart>
          </ResponsiveContainer>
        );
      } else if (item.name === 'Product Performance Report') {
        return (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={sampleData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-gray-300 dark:stroke-gray-600" />
              <XAxis dataKey="name" className="text-gray-600 dark:text-gray-400" fontSize={12} />
              <YAxis className="text-gray-600 dark:text-gray-400" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Line type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        );
      } else {
        return (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={sampleData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-gray-300 dark:stroke-gray-600" />
              <XAxis dataKey="name" className="text-gray-600 dark:text-gray-400" fontSize={12} />
              <YAxis className="text-gray-600 dark:text-gray-400" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="value" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );
      }
    } else if (item.type === 'Table') {
      return (
        <div className="w-full h-full overflow-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">Month</th>
                <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">Sales</th>
                <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">Revenue</th>
              </tr>
            </thead>
            <tbody>
              {sampleData.map((row, idx) => (
                <tr key={idx} className="border-b border-gray-200 dark:border-gray-700">
                  <td className="px-4 py-2 text-gray-900 dark:text-gray-100">{row.name}</td>
                  <td className="px-4 py-2 text-gray-900 dark:text-gray-100">${row.sales.toLocaleString()}</td>
                  <td className="px-4 py-2 text-gray-900 dark:text-gray-100">${row.revenue.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else {
      return (
        <div className="w-full h-full flex flex-col space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Total Sales</p>
              <p className="text-gray-900 dark:text-white">$124,582</p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Growth</p>
              <p className="text-gray-900 dark:text-white">+15.3%</p>
            </div>
          </div>
          <div className="flex-1 bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Summary</p>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Q4 performance exceeded expectations with strong growth across all regions. Key highlights include...
            </p>
          </div>
        </div>
      );
    }
  };

  return (
    <div
      ref={drag}
      onClick={() => onSelect(item.id)}
      style={{
        gridColumn: `${item.gridColumn} / span ${item.colSpan}`,
        gridRow: `${item.gridRow} / span ${item.rowSpan}`,
      }}
      className={`bg-white dark:bg-gray-800 rounded-xl border-2 ${
        isSelected 
          ? 'border-blue-500 shadow-lg shadow-blue-500/20' 
          : 'border-gray-200 dark:border-gray-700'
      } p-4 hover:shadow-md transition-all group relative ${
        isDragging ? 'opacity-50' : ''
      } ${isResizing ? 'transition-none' : ''}`}
    >
      {/* Selection Indicator */}
      {isSelected && (
        <div className="absolute -top-1 -left-1 w-3 h-3 bg-blue-500 rounded-full border-2 border-white dark:border-gray-900"></div>
      )}

      {/* Delete Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(item.id);
        }}
        className={`absolute top-2 right-2 p-1.5 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg ${
          isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
        } hover:bg-red-100 dark:hover:bg-red-900/40 transition-all z-10`}
      >
        <Trash2 className="w-3.5 h-3.5" />
      </button>
      
      {/* Resize Handles - Only show when selected */}
      {isSelected && (
        <>
          {/* Bottom-right corner resize */}
          <div
            onMouseDown={(e) => handleResizeStart(e, 'both')}
            className="absolute bottom-0 right-0 w-4 h-4 bg-blue-500 rounded-tl cursor-nwse-resize hover:bg-blue-600 transition-colors z-20"
            title="Resize"
          />
          
          {/* Right edge resize */}
          <div
            onMouseDown={(e) => handleResizeStart(e, 'width')}
            className="absolute top-1/2 right-0 w-2 h-8 -translate-y-1/2 bg-blue-500 rounded-l cursor-ew-resize hover:bg-blue-600 transition-colors z-20"
            title="Resize width"
          />
          
          {/* Bottom edge resize */}
          <div
            onMouseDown={(e) => handleResizeStart(e, 'height')}
            className="absolute bottom-0 left-1/2 w-8 h-2 -translate-x-1/2 bg-blue-500 rounded-t cursor-ns-resize hover:bg-blue-600 transition-colors z-20"
            title="Resize height"
          />
        </>
      )}
      
      {/* Item Title - Just name, no icon */}
      <div className="mb-4">
        <h3 className="text-gray-900 dark:text-white">{item.name}</h3>
      </div>
      
      <div className="w-full h-64 min-h-[16rem]">
        {renderChart()}
      </div>

      {/* Dimension indicator when selected */}
      {isSelected && (
        <div className="absolute bottom-2 left-2 px-2 py-1 bg-blue-500 text-white text-xs rounded">
          {item.colSpan} × {item.rowSpan}
        </div>
      )}
    </div>
  );
};

export default function DashboardView({ onNavigate, onLogout, darkMode, onToggleDarkMode, dashboard }: DashboardViewProps) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [autoSave, setAutoSave] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [chatMessage, setChatMessage] = useState('');
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [showGrid, setShowGrid] = useState(true);
  const [showChat, setShowChat] = useState(true);
  
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: `Hello! I'm Zia, your AI assistant. I can help you with the ${dashboard.name}. Try asking me to add charts, or just drag items from the left!`,
      sender: 'ai',
      timestamp: new Date(),
      actions: [
        { label: '📊 Add Revenue Chart', onClick: () => handleQuickAddById('c1') },
        { label: '📈 Add Sales Chart', onClick: () => handleQuickAddById('c2') },
      ]
    },
  ]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const [dashboardItems] = useState<DashboardItem[]>([
    { id: 'r1', name: 'Monthly Revenue Analysis', type: 'Report', icon: FileText, color: 'bg-blue-500' },
    { id: 'r2', name: 'Category Growth Trends', type: 'Report', icon: FileText, color: 'bg-emerald-500' },
    { id: 'r3', name: 'Product Performance Report', type: 'Report', icon: FileText, color: 'bg-indigo-500' },
    { id: 't1', name: 'E-commerce Sales Data', type: 'Table', icon: Database, color: 'bg-emerald-500' },
  ]);

  const [canvasItems, setCanvasItems] = useState<CanvasItem[]>([]);
  const [history, setHistory] = useState<CanvasItem[][]>([[]]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const reports = dashboardItems.filter(item => item.type === 'Report');
  const tables = dashboardItems.filter(item => item.type === 'Table');

  // Initialize with pre-populated dashboard items
  useEffect(() => {
    const initialItems: CanvasItem[] = [
      {
        id: 'default-1',
        name: 'Monthly Revenue Analysis',
        type: 'Report',
        icon: FileText,
        color: 'bg-blue-500',
        gridColumn: 1,
        gridRow: 1,
        colSpan: 6,
        rowSpan: 1,
      },
      {
        id: 'default-2',
        name: 'Category Growth Trends',
        type: 'Report',
        icon: FileText,
        color: 'bg-emerald-500',
        gridColumn: 7,
        gridRow: 1,
        colSpan: 6,
        rowSpan: 1,
      },
      {
        id: 'default-3',
        name: 'Product Performance Report',
        type: 'Report',
        icon: FileText,
        color: 'bg-indigo-500',
        gridColumn: 1,
        gridRow: 2,
        colSpan: 6,
        rowSpan: 1,
      },
      // {
      //   id: 'default-4',
      //   name: 'E-commerce Sales Data',
      //   type: 'Table',
      //   icon: Database,
      //   color: 'bg-emerald-500',
      //   gridColumn: 7,
      //   gridRow: 2,
      //   colSpan: 6,
      //   rowSpan: 1,
      // },
    ];
    setCanvasItems(initialItems);
    setHistory([initialItems]);
  }, []);

  const addToHistory = (newItems: CanvasItem[]) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newItems);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setCanvasItems(history[historyIndex - 1]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setCanvasItems(history[historyIndex + 1]);
    }
  };

  const handleQuickAddById = (itemId: string) => {
    const item = dashboardItems.find(i => i.id === itemId);
    if (item) {
      handleQuickAdd(item);
    }
  };

  const handleQuickAdd = (item: DashboardItem) => {
    if (canvasItems.find(ci => ci.id === item.id)) {
      return;
    }

    const nextRow = canvasItems.length > 0 
      ? Math.max(...canvasItems.map(i => i.gridRow + i.rowSpan - 1)) + 1
      : 1;

    const newItem: CanvasItem = {
      ...item,
      gridColumn: 1,
      gridRow: nextRow,
      colSpan: 6,
      rowSpan: 1,
    };

    const newItems = [...canvasItems, newItem];
    setCanvasItems(newItems);
    addToHistory(newItems);
    setSelectedItemId(newItem.id);
  };

  const handleDrop = (item: DashboardItem, x: number, y: number) => {
    if (canvasItems.find(ci => ci.id === item.id)) {
      return;
    }

    const nextRow = canvasItems.length > 0 
      ? Math.max(...canvasItems.map(i => i.gridRow + i.rowSpan - 1)) + 1
      : 1;

    const newItem: CanvasItem = {
      ...item,
      gridColumn: 1,
      gridRow: nextRow,
      colSpan: 6,
      rowSpan: 1,
    };

    const newItems = [...canvasItems, newItem];
    setCanvasItems(newItems);
    addToHistory(newItems);
    setSelectedItemId(newItem.id);
  };

  const handleMoveCanvasItem = (id: string, x: number, y: number) => {
    // Grid-based movement
  };

  const handleDeleteCanvasItem = (id: string) => {
    const newItems = canvasItems.filter(item => item.id !== id);
    setCanvasItems(newItems);
    addToHistory(newItems);
    if (selectedItemId === id) {
      setSelectedItemId(null);
    }
  };

  const handleResizeItem = (id: string, colSpan: number, rowSpan: number) => {
    const newItems = canvasItems.map(item => 
      item.id === id ? { ...item, colSpan, rowSpan } : item
    );
    setCanvasItems(newItems);
  };

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: chatMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setChatMessages([...chatMessages, userMessage]);
    setChatMessage('');

    setTimeout(() => {
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(chatMessage),
        sender: 'ai',
        timestamp: new Date(),
        actions: getAIActions(chatMessage),
      };
      setChatMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  const getAIActions = (message: string): Array<{ label: string; onClick: () => void }> | undefined => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('revenue') || lowerMessage.includes('add revenue')) {
      return [{ label: '➕ Add Revenue Chart', onClick: () => handleQuickAddById('c1') }];
    } else if (lowerMessage.includes('sales') || lowerMessage.includes('add sales')) {
      return [{ label: '➕ Add Sales Chart', onClick: () => handleQuickAddById('c2') }];
    } else if (lowerMessage.includes('table') || lowerMessage.includes('data')) {
      return [{ label: '➕ Add Sales Table', onClick: () => handleQuickAddById('t1') }];
    } else if (lowerMessage.includes('report')) {
      return [{ label: '➕ Add Q4 Report', onClick: () => handleQuickAddById('r1') }];
    }
    return undefined;
  };

  const getAIResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('revenue') || lowerMessage.includes('sales')) {
      return `Based on the ${dashboard.name}, your revenue has increased by 15% this quarter. Would you like me to add the Revenue Trends chart to your dashboard?`;
    } else if (lowerMessage.includes('customer')) {
      return 'The Customer Analysis report shows 1,200 active customers with high engagement. I can add the customer data visualization for you!';
    } else if (lowerMessage.includes('chart') || lowerMessage.includes('add')) {
      return 'You can drag any chart, report, or table from the left sidebar onto the canvas. Or just double-click an item to add it instantly!';
    } else if (lowerMessage.includes('help') || lowerMessage.includes('shortcut')) {
      return 'Here are some tips: Double-click items to add them quickly, click items on canvas to select and resize them, use Cmd/Ctrl+Z to undo. Press Cmd/Ctrl+/ to see all shortcuts!';
    } else {
      return `I'm here to help with your ${dashboard.name}! You can ask me to add specific widgets, get insights from your data, or learn shortcuts. What would you like to do?`;
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const cmdOrCtrl = isMac ? e.metaKey : e.ctrlKey;

      // Cmd/Ctrl + Z - Undo
      if (cmdOrCtrl && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        handleUndo();
      }
      
      // Cmd/Ctrl + Y or Cmd/Ctrl + Shift + Z - Redo
      if (cmdOrCtrl && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
        e.preventDefault();
        handleRedo();
      }

      // Delete or Backspace - Delete selected item
      if ((e.key === 'Delete' || e.key === 'Backspace') && selectedItemId) {
        e.preventDefault();
        handleDeleteCanvasItem(selectedItemId);
      }

      // Cmd/Ctrl + D - Duplicate (future feature)
      if (cmdOrCtrl && e.key === 'd') {
        e.preventDefault();
        // Duplicate logic here
      }

      // Escape - Deselect
      if (e.key === 'Escape') {
        setSelectedItemId(null);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedItemId, historyIndex, history]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const CanvasDropZone = () => {
    const [{ isOver }, drop] = useDrop(() => ({
      accept: ['dashboard-item', 'canvas-item'],
      drop: (item: any, monitor) => {
        const offset = monitor.getClientOffset();
        if (!offset) return;

        const canvasRect = document.getElementById('dashboard-canvas')?.getBoundingClientRect();
        if (!canvasRect) return;

        const x = offset.x - canvasRect.left;
        const y = offset.y - canvasRect.top;

        if (item.x !== undefined && item.y !== undefined) {
          handleMoveCanvasItem(item.id, x - 150, y - 75);
        } else {
          handleDrop(item, x, y);
        }
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    }));

    return (
      <div
        ref={drop}
        id="dashboard-canvas"
        onClick={() => setSelectedItemId(null)}
        className={`flex-1 bg-gray-50 dark:bg-gray-900 overflow-auto transition-colors h-full relative custom-scrollbar ${
          isOver ? 'bg-blue-50 dark:bg-blue-900/10' : ''
        }`}
      >
        {/* Grid Overlay */}
        {showGrid && (
          <div 
            className="absolute inset-0 pointer-events-none z-0"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgb(209 213 219 / 0.3) 1px, transparent 1px),
                linear-gradient(to bottom, rgb(209 213 219 / 0.3) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px',
            }}
          />
        )}

        <div className="p-6 h-full relative z-10">
          {canvasItems.length === 0 && !isOver && (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Plus className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-gray-900 dark:text-white mb-2">Build Your Dashboard</h3>
                <p className="text-gray-500 dark:text-gray-400 max-w-md mb-4">
                  Drag and drop reports, charts, and tables from the left sidebar
                </p>
                <p className="text-sm text-gray-400 dark:text-gray-500">
                  💡 Tip: Double-click any item to add it instantly
                </p>
              </div>
            </div>
          )}

          {isOver && canvasItems.length === 0 && (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                  <Plus className="w-10 h-10 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-blue-900 dark:text-blue-100 mb-2">Drop Here</h3>
                <p className="text-blue-700 dark:text-blue-300">Release to add to dashboard</p>
              </div>
            </div>
          )}

          {canvasItems.length > 0 && (
            <div className="grid grid-cols-12 gap-6 auto-rows-min">
              {canvasItems.map(item => (
                <CanvasDroppedItem
                  key={item.id}
                  item={item}
                  onDelete={handleDeleteCanvasItem}
                  onMove={handleMoveCanvasItem}
                  isSelected={selectedItemId === item.id}
                  onSelect={setSelectedItemId}
                  onResize={handleResizeItem}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="h-screen bg-gray-50 dark:bg-gray-900 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm flex-shrink-0">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Left Section */}
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => onNavigate('workspace')}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </button>
                <div>
                  <h2 className="text-gray-900 dark:text-white">{dashboard.name}</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {autoSave ? 'Auto-saved' : 'Last saved'} 2 min ago
                  </p>
                </div>
              </div>

              {/* Center Section - Undo/Redo & Auto-save */}
              <div className="hidden lg:flex items-center space-x-2">
                <button 
                  onClick={handleUndo}
                  disabled={historyIndex === 0}
                  className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Undo (Cmd/Ctrl+Z)"
                >
                  <Undo2 className="w-5 h-5" />
                </button>
                <button 
                  onClick={handleRedo}
                  disabled={historyIndex === history.length - 1}
                  className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Redo (Cmd/Ctrl+Y)"
                >
                  <Redo2 className="w-5 h-5" />
                </button>
                <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 mx-2"></div>
                <label className="flex items-center space-x-2 px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={autoSave}
                    onChange={(e) => setAutoSave(e.target.checked)}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Auto-save</span>
                </label>
              </div>

              {/* Right Section */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onToggleDarkMode(!darkMode)}
                  className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
                <button 
                  onClick={() => setShowSaveModal(true)}
                  className="hidden lg:flex items-center space-x-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <Save className="w-4 h-4" />
                  <span>Save</span>
                </button>
                <button 
                  onClick={() => setShowExportModal(true)}
                  className="hidden lg:flex items-center space-x-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content - Three Column Layout */}
        <div className="flex flex-1 min-h-0">
          {/* Left Sidebar - Dashboard Items */}
          {!sidebarCollapsed && (
            <aside className="w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex-shrink-0 h-full flex flex-col">
              <div className="p-6 flex-shrink-0">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h2 className="text-gray-900 dark:text-white mb-2">Dashboard Items</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Drag or double-click to add</p>
                  </div>
                  <button
                    onClick={() => setSidebarCollapsed(true)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    title="Collapse sidebar"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  </button>
                </div>

              {/* Search */}
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search items..."
                    className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-900 dark:text-white placeholder-gray-400"
                  />
                </div>
              </div>
              </div>

              {/* Scrollable Items Container */}
              <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-6 custom-scrollbar">
              
              {/* Reports Section */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm text-gray-700 dark:text-gray-300 flex items-center space-x-2">
                    <FileText className="w-4 h-4" />
                    <span>Reports</span>
                  </h3>
                  <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                    {reports.length}
                  </span>
                </div>
                <div className="space-y-2">
                  {reports.map(item => (
                    <DraggableDashboardItem key={item.id} item={item} onQuickAdd={handleQuickAdd} />
                  ))}
                </div>
              </div>
              
              {/* Tables Section */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm text-gray-700 dark:text-gray-300 flex items-center space-x-2">
                    <Database className="w-4 h-4" />
                    <span>Dataset</span>
                  </h3>
                  <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                    {tables.length}
                  </span>
                </div>
                <div className="space-y-2">
                  {tables.map(item => (
                    <DraggableDashboardItem key={item.id} item={item} onQuickAdd={handleQuickAdd} />
                  ))}
                </div>
              </div>
              </div>
            </aside>
          )}

          {/* Collapsed Sidebar Button */}
          {sidebarCollapsed && (
            <div className="flex-shrink-0 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex items-start pt-6 px-2">
              <button
                onClick={() => setSidebarCollapsed(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                title="Expand sidebar"
              >
                <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          )}

          {/* Center - Dashboard Canvas */}
          <CanvasDropZone />

          {/* Right Sidebar - AI Chat */}
          {!showChat && (
            <aside className="w-96 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 flex flex-col flex-shrink-0 h-full">
              {/* Chat Header */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <Bot className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-gray-900 dark:text-white flex items-center space-x-2">
                        <span>Zia AI Assistant</span>
                        <Sparkles className="w-4 h-4 text-purple-500" />
                      </h2>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Always here to help</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowChat(true)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    title="Collapse chat"
                  >
                    <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  </button>
                </div>
              </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
              {chatMessages.map(message => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] ${message.sender === 'user' ? '' : 'space-y-2'}`}>
                    <div
                      className={`rounded-lg p-4 ${
                        message.sender === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                      }`}
                    >
                      {message.sender === 'ai' && (
                        <div className="flex items-center space-x-2 mb-2">
                          <Bot className="w-4 h-4 text-purple-500" />
                          <span className="text-xs text-gray-500 dark:text-gray-400">Zia</span>
                        </div>
                      )}
                      <p className="text-sm">{message.text}</p>
                    </div>
                    
                    {/* Action Buttons */}
                    {message.actions && message.actions.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {message.actions.map((action, idx) => (
                          <button
                            key={idx}
                            onClick={action.onClick}
                            className="px-3 py-1.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors text-sm flex items-center space-x-1"
                          >
                            <span>{action.label}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask Zia anything..."
                  className="flex-1 px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-900 dark:text-white placeholder-gray-400"
                />
                <button
                  onClick={handleSendMessage}
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Ask about your dashboard, or request to add widgets
              </p>
            </div>
          </aside>
          )}

          {/* Collapsed Chat Button */}
          {showChat && (
            <div className="flex-shrink-0 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 flex items-start pt-6 px-2">
              <button
                onClick={() => setShowChat(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                title="Expand chat"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          )}
        </div>

        {/* Profile Settings Modal */}
        {showSettings && (
          <ProfileSettings
            onClose={() => setShowSettings(false)}
            onLogout={onLogout}
            darkMode={darkMode}
            onToggleDarkMode={onToggleDarkMode}
          />
        )}

        {/* Save/Export Modal */}
        {showSaveModal && (
          <SaveExportModal
            isOpen={true}
            type="save"
            onClose={() => setShowSaveModal(false)}
            onConfirm={(name, description) => {
              console.log('Saving dashboard:', name, description);
              setShowSaveModal(false);
            }}
          />
        )}

        {showExportModal && (
          <SaveExportModal
            isOpen={true}
            type="export"
            context="dashboard"
            simpleExport={true}
            onClose={() => setShowExportModal(false)}
            onConfirm={(name, description, format) => {
              console.log('Exporting dashboard as PDF:',format);
              setShowExportModal(false);
              
            }}
          />
        )}
      </div>
    </DndProvider>
  );
}