import { useState } from 'react';
import { Search, Plus, Grid3x3, Moon, Sun, User, Bell, Settings, ChevronLeft, Undo2, Redo2, Save, Eye, History, BarChart3, PieChart, LineChart, Table2, GripVertical, Palette, Type, Layers, Download, Database, Hash, Calendar, AlignLeft, ToggleLeft, X, TrendingUp } from 'lucide-react';
import SaveExportModal from './SaveExportModal';
import { 
  PieChart as RechartsPieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Legend, 
  Tooltip,
  BarChart as RechartsBarChart,
  Bar,
  LineChart as RechartsLineChart,
  Line,
  AreaChart as RechartsAreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';

interface ReportBuilderProps {
  onNavigate: (screen: 'home' | 'workspace' | 'builder') => void;
  darkMode: boolean;
  onToggleDarkMode: (value: boolean) => void;
  report?: any;
  onCreateDashboard?: (dashboard: any) => void;
}

interface Column {
  id: string;
  name: string;
  type: 'text' | 'number' | 'date' | 'boolean';
  icon: any;
}

interface Dataset {
  id: number;
  name: string;
  columns: Column[];
  rows: string;
}

export default function ReportBuilder({ onNavigate, darkMode, onToggleDarkMode, report, onCreateDashboard }: ReportBuilderProps) {
  const [activeTab, setActiveTab] = useState<'builder' | 'preview' | 'history'>(report ? 'preview' : 'builder');
  const [autoSave, setAutoSave] = useState(true);
  const [selectedDataset, setSelectedDataset] = useState<number | null>(null);
  const [columnsZone, setColumnsZone] = useState<Column[]>([]);
  const [rowsZone, setRowsZone] = useState<Column[]>([]);
  const [draggedColumn, setDraggedColumn] = useState<Column | null>(null);
  const [selectedChartType, setSelectedChartType] = useState<string>('bar-chart');
  const [selectedColorScheme, setSelectedColorScheme] = useState<number>(0);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  // Sample data for E-commerce


  // Get chart type and color based on report name
  const getReportChartConfig = () => {
    if (!report) return { chartType: 'bar-chart', colorIndex: 0 };
    
    if (report.name === 'Monthly Revenue Analysis') {
      return { chartType: 'bar-chart', colorIndex: 0 }; // Blue bar chart
    } else if (report.name === 'Category Growth Trends') {
      return { chartType: 'area-chart', colorIndex: 2 }; // Green area chart
    } else if (report.name === 'Product Performance Report') {
      return { chartType: 'line-chart', colorIndex: 5 }; // Indigo line chart
    }
    
    return { chartType: 'bar-chart', colorIndex: 0 };
  };

  // Set initial chart type and color based on report
  useState(() => {
    if (report) {
      const config = getReportChartConfig();
      setSelectedChartType(config.chartType);
      setSelectedColorScheme(config.colorIndex);
    }
  });

  // Datasets with columns
  const datasets: Dataset[] = [
    {
      id: 1,
      name: 'E-commerce Sales Data',
      rows: '15',
      columns: [
        { id: 'product', name: 'Product Name', type: 'text', icon: AlignLeft },
        { id: 'category', name: 'Category', type: 'text', icon: AlignLeft },
        { id: 'revenue', name: 'Revenue', type: 'number', icon: Hash },
        { id: 'quantity', name: 'Quantity Sold', type: 'number', icon: Hash },
        { id: 'date', name: 'Sale Date', type: 'date', icon: Calendar },
        { id: 'region', name: 'Region', type: 'text', icon: AlignLeft },
      ]
    },
  ];


  const chartTypes = [
    { icon: BarChart3, name: 'Bar Chart' },
    { icon: LineChart, name: 'Line Chart' },
    { icon: PieChart, name: 'Pie Chart' },
    { icon: TrendingUp, name: 'Area Chart' },
  ];

  const historyItems = [
    { id: 1, action: 'Changed color scheme', time: '2 min ago' },
    { id: 2, action: 'Changed color scheme', time: '5 min ago' },
    { id: 3, action: 'Updated data source', time: '10 min ago' },
    { id: 4, action: 'Created report', time: '15 min ago' },
  ];

  // Pie chart data
  const pieChartData = [
    { name: 'East', value: 6603.75, percentage: 43.05 },
    { name: 'Central', value: 2975.73, percentage: 19.40 },
    { name: 'West', value: 5760.62, percentage: 37.55 },
  ];

  // Color schemes
  const colorSchemes = [
    ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444'],
    ['#8b5cf6', '#ec4899', '#3b82f6', '#10b981', '#f59e0b'],
    ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444'],
    ['#f59e0b', '#ef4444', '#ec4899', '#8b5cf6', '#3b82f6'],
    ['#ec4899', '#8b5cf6', '#3b82f6', '#10b981', '#f59e0b'],
    ['#6366f1', '#8b5cf6', '#3b82f6', '#10b981', '#f59e0b'],
    ['#ef4444', '#f59e0b', '#ec4899', '#8b5cf6', '#3b82f6'],
    ['#14b8a6', '#10b981', '#3b82f6', '#8b5cf6', '#f59e0b'],
    ['#eab308', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6'],
    ['#06b6d4', '#3b82f6', '#10b981', '#8b5cf6', '#f59e0b']
  ];

  const COLORS = colorSchemes[selectedColorScheme];

  // Custom label for pie chart
  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percentage }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        className="text-sm font-semibold"
      >
        {`${percentage}%`}
      </text>
    );
  };

  // Handle drop on columns zone
  const handleDropOnColumns = (e: React.DragEvent) => {
    e.preventDefault();
    if (draggedColumn && !columnsZone.find(col => col.id === draggedColumn.id)) {
      setColumnsZone([...columnsZone, draggedColumn]);
    }
    setDraggedColumn(null);
  };

  // Handle drop on rows zone
  const handleDropOnRows = (e: React.DragEvent) => {
    e.preventDefault();
    if (draggedColumn && !rowsZone.find(col => col.id === draggedColumn.id)) {
      setRowsZone([...rowsZone, draggedColumn]);
    }
    setDraggedColumn(null);
  };

  // Remove column from zone
  const removeFromColumnsZone = (columnId: string) => {
    setColumnsZone(columnsZone.filter(col => col.id !== columnId));
  };

  const removeFromRowsZone = (columnId: string) => {
    setRowsZone(rowsZone.filter(col => col.id !== columnId));
  };

  // Prevent default to allow drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Top Bar */}
      <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="px-4 lg:px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Left Section */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => onNavigate('workspace')}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
              <div>
                <h2 className="text-gray-900 dark:text-white">Q4 Sales Report</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">Last saved 2 min ago</p>
              </div>
            </div>

            {/* Center Section - Undo/Redo */}
            <div className="hidden lg:flex items-center space-x-2">
              <button className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <Undo2 className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
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
              <button className="hidden lg:flex items-center space-x-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors" onClick={() => setShowSaveModal(true)}>
                <Save className="w-4 h-4" />
                <span>Save</span>
              </button>
              <button className="hidden lg:flex items-center space-x-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors" onClick={() => setShowExportModal(true)}>
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-4 lg:px-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex space-x-1">
            <button
              onClick={() => setActiveTab('builder')}
              className={`px-4 py-3 border-b-2 transition-colors ${
                activeTab === 'builder'
                  ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Layers className="w-4 h-4" />
                <span>Builder</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-4 py-3 border-b-2 transition-colors ${
                activeTab === 'preview'
                  ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Eye className="w-4 h-4" />
                <span>Preview</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-4 py-3 border-b-2 transition-colors ${
                activeTab === 'history'
                  ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <History className="w-4 h-4" />
                <span>History</span>
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Data & KPIs */}
        {activeTab === 'builder' && (
          <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-y-auto custom-scrollbar">
            <div className="p-4">
              <h3 className="text-gray-900 dark:text-white mb-4">Data Sources</h3>
              
              {/* Dataset Selector */}
              <div className="mb-6">
                <label className="text-sm text-gray-600 dark:text-gray-400 mb-2 block">Select Dataset</label>
                <select
                  value={selectedDataset || ''}
                  onChange={(e) => setSelectedDataset(Number(e.target.value) || null)}
                  className="w-full px-3 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white cursor-pointer hover:border-blue-400 dark:hover:border-blue-500 transition-colors"
                >
                  <option value="" className="text-gray-500">Choose a dataset...</option>
                  {datasets.map((dataset) => (
                    <option key={dataset.id} value={dataset.id} className="text-gray-900 dark:text-white">
                      {dataset.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Columns List */}
              {selectedDataset && (
                <div className="space-y-2">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Available Columns</p>
                  {datasets
                    .find((ds) => ds.id === selectedDataset)
                    ?.columns.map((column) => {
                      const ColumnIcon = column.icon;
                      return (
                        <div
                          key={column.id}
                          className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 cursor-move hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
                          draggable
                          onDragStart={() => setDraggedColumn(column)}
                        >
                          <div className="flex items-center space-x-2">
                            <GripVertical className="w-4 h-4 text-gray-400" />
                            <ColumnIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                            <span className="text-sm text-gray-900 dark:text-white flex-1">{column.name}</span>
                          </div>
                          <div className="ml-10 mt-1">
                            <span className="inline-block px-2 py-0.5 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded">
                              {column.type}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                </div>
              )}

              {/* Empty State */}
              {!selectedDataset && (
                <div className="text-center py-8">
                  <Database className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                  <p className="text-sm text-gray-500 dark:text-gray-400">Select a dataset to view columns</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Center Panel - Canvas */}
        <div className="flex-1 bg-gray-100 dark:bg-gray-950 overflow-y-auto p-4 custom-scrollbar">
          {activeTab === 'builder' && (
            <div className="max-w-6xl mx-auto h-full flex flex-col gap-3">
              {/* Chart Configuration - Columns and Rows Drop Zones */}
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex-shrink-0">
                <div className="border-b border-gray-200 dark:border-gray-700 px-4 py-2.5 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2.5">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
                        <BarChart3 className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h3 className="text-sm text-gray-900 dark:text-white">Configure Your Chart</h3>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Drag and drop columns</p>
                      </div>
                    </div>
                    <button className="px-3 py-1.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg flex items-center space-x-2 text-sm">
                      <BarChart3 className="w-3.5 h-3.5" />
                      <span>Generate Chart</span>
                    </button>
                  </div>
                </div>
                
                <div className="p-3">
                  <div className="grid grid-cols-2 gap-3">
                    {/* Columns Zone */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-xs text-gray-700 dark:text-gray-300 flex items-center space-x-1.5">
                          <div className="w-4 h-4 bg-blue-100 dark:bg-blue-900/30 rounded flex items-center justify-center">
                            <Grid3x3 className="w-2.5 h-2.5 text-blue-600 dark:text-blue-400" />
                          </div>
                          <span>Axis Y</span>
                        </label>
                      </div>
                      <div
                        className={`h-[100px] overflow-y-auto p-2 rounded-lg border-2 border-dashed transition-all ${
                          draggedColumn
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/10 shadow-inner'
                            : 'border-gray-300 dark:border-gray-600 bg-gray-50/50 dark:bg-gray-900/50'
                        }`}
                        onDrop={handleDropOnColumns}
                        onDragOver={handleDragOver}
                      >
                        {columnsZone.length === 0 ? (
                          <div className="flex flex-col items-center justify-center h-full text-center py-3">
                            <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mb-1">
                              <Grid3x3 className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Drop here</p>
                          </div>
                        ) : (
                          <div className="space-y-1">
                            {columnsZone.map((column) => {
                              const ColumnIcon = column.icon;
                              return (
                                <div
                                  key={column.id}
                                  className="flex items-center justify-between p-1.5 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700 group hover:shadow-sm transition-all"
                                >
                                  <div className="flex items-center space-x-1.5 min-w-0">
                                    <div className="w-4 h-4 bg-blue-100 dark:bg-blue-900/30 rounded flex items-center justify-center flex-shrink-0">
                                      <ColumnIcon className="w-2.5 h-2.5 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <span className="text-xs text-gray-900 dark:text-white truncate">{column.name}</span>
                                  </div>
                                  <button
                                    onClick={() => removeFromColumnsZone(column.id)}
                                    className="opacity-0 group-hover:opacity-100 transition-opacity p-0.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded flex-shrink-0"
                                  >
                                    <X className="w-3 h-3 text-red-600 dark:text-red-400" />
                                  </button>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Rows Zone */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-xs text-gray-700 dark:text-gray-300 flex items-center space-x-1.5">
                          <div className="w-4 h-4 bg-purple-100 dark:bg-purple-900/30 rounded flex items-center justify-center">
                            <Table2 className="w-2.5 h-2.5 text-purple-600 dark:text-purple-400" />
                          </div>
                          <span>Axis X</span>
                        </label>
                      </div>
                      <div
                        className={`h-[100px] overflow-y-auto p-2 rounded-lg border-2 border-dashed transition-all ${
                          draggedColumn
                            ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/10 shadow-inner'
                            : 'border-gray-300 dark:border-gray-600 bg-gray-50/50 dark:bg-gray-900/50'
                        }`}
                        onDrop={handleDropOnRows}
                        onDragOver={handleDragOver}
                      >
                        {rowsZone.length === 0 ? (
                          <div className="flex flex-col items-center justify-center h-full text-center py-3">
                            <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mb-1">
                              <Table2 className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Drop here</p>
                          </div>
                        ) : (
                          <div className="space-y-1">
                            {rowsZone.map((column) => {
                              const ColumnIcon = column.icon;
                              return (
                                <div
                                  key={column.id}
                                  className="flex items-center justify-between p-1.5 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700 group hover:shadow-sm transition-all"
                                >
                                  <div className="flex items-center space-x-1.5 min-w-0">
                                    <div className="w-4 h-4 bg-purple-100 dark:bg-purple-900/30 rounded flex items-center justify-center flex-shrink-0">
                                      <ColumnIcon className="w-2.5 h-2.5 text-purple-600 dark:text-purple-400" />
                                    </div>
                                    <span className="text-xs text-gray-900 dark:text-white truncate">{column.name}</span>
                                  </div>
                                  <button
                                    onClick={() => removeFromRowsZone(column.id)}
                                    className="opacity-0 group-hover:opacity-100 transition-opacity p-0.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded flex-shrink-0"
                                  >
                                    <X className="w-3 h-3 text-red-600 dark:text-red-400" />
                                  </button>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chart Preview */}
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm h-[600px] flex flex-col">
                <div className="border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center justify-between bg-gray-50 dark:bg-gray-900/50">
                  <div className="flex items-center space-x-2">
                    <PieChart className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <h3 className="text-gray-900 dark:text-white">Chart Preview</h3>
                  </div>
                  <button
                    onClick={() => setActiveTab('preview')}
                    className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2.5 py-1 rounded-full hover:bg-blue-100 hover:text-blue-600 dark:hover:bg-blue-900/30 dark:hover:text-blue-400 transition-all cursor-pointer flex items-center space-x-1.5"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Live Preview</span>
                  </button>
                </div>
                
                <div className="flex-1 p-6 overflow-hidden">
                  <div className="w-full h-full">
                    {selectedChartType === 'bar-chart' && (
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsBarChart data={pieChartData}>
                          <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
                          <XAxis 
                            dataKey="name" 
                            stroke={darkMode ? '#9ca3af' : '#6b7280'}
                            style={{ fontSize: '12px' }}
                          />
                          <YAxis 
                            stroke={darkMode ? '#9ca3af' : '#6b7280'}
                            style={{ fontSize: '12px' }}
                          />
                          <Tooltip 
                            contentStyle={{
                              backgroundColor: darkMode ? '#1f2937' : '#ffffff',
                              border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
                              borderRadius: '8px',
                              color: darkMode ? '#f9fafb' : '#111827',
                              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                            }}
                            formatter={(value: any) => [`$${(value / 1000).toFixed(1)}K`, 'Revenue']}
                          />
                          <Legend 
                            wrapperStyle={{
                              color: darkMode ? '#9ca3af' : '#6b7280',
                              fontSize: '14px'
                            }}
                          />
                          <Bar dataKey="value" fill={COLORS[0]} radius={[8, 8, 0, 0]} />
                        </RechartsBarChart>
                      </ResponsiveContainer>
                    )}

                    {selectedChartType === 'line-chart' && (
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsLineChart data={pieChartData}>
                          <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
                          <XAxis 
                            dataKey="name" 
                            stroke={darkMode ? '#9ca3af' : '#6b7280'}
                            style={{ fontSize: '12px' }}
                          />
                          <YAxis 
                            stroke={darkMode ? '#9ca3af' : '#6b7280'}
                            style={{ fontSize: '12px' }}
                          />
                          <Tooltip 
                            contentStyle={{
                              backgroundColor: darkMode ? '#1f2937' : '#ffffff',
                              border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
                              borderRadius: '8px',
                              color: darkMode ? '#f9fafb' : '#111827',
                              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                            }}
                            formatter={(value: any) => [`$${(value / 1000).toFixed(1)}K`, 'Revenue']}
                          />
                          <Legend 
                            wrapperStyle={{
                              color: darkMode ? '#9ca3af' : '#6b7280',
                              fontSize: '14px'
                            }}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="value" 
                            stroke={COLORS[0]} 
                            strokeWidth={3}
                            dot={{ fill: COLORS[0], r: 5 }}
                            activeDot={{ r: 7 }}
                          />
                        </RechartsLineChart>
                      </ResponsiveContainer>
                    )}

                    {selectedChartType === 'pie-chart' && (
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsPieChart>
                          <Pie
                            data={pieChartData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomLabel}
                            outerRadius={130}
                            fill="#8884d8"
                            dataKey="value"
                            animationBegin={0}
                            animationDuration={800}
                          >
                            {pieChartData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip 
                            contentStyle={{
                              backgroundColor: darkMode ? '#1f2937' : '#ffffff',
                              border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
                              borderRadius: '8px',
                              color: darkMode ? '#f9fafb' : '#111827',
                              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                            }}
                            formatter={(value: any) => [`$${(value / 1000).toFixed(1)}K`, 'Revenue']}
                          />
                          <Legend 
                            verticalAlign="bottom" 
                            height={40}
                            iconType="circle"
                            wrapperStyle={{
                              color: darkMode ? '#9ca3af' : '#6b7280',
                              fontSize: '14px'
                            }}
                          />
                        </RechartsPieChart>
                      </ResponsiveContainer>
                    )}

                    {selectedChartType === 'area-chart' && (
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsAreaChart data={pieChartData}>
                          <defs>
                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor={COLORS[0]} stopOpacity={0.8}/>
                              <stop offset="95%" stopColor={COLORS[0]} stopOpacity={0.1}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
                          <XAxis 
                            dataKey="name" 
                            stroke={darkMode ? '#9ca3af' : '#6b7280'}
                            style={{ fontSize: '12px' }}
                          />
                          <YAxis 
                            stroke={darkMode ? '#9ca3af' : '#6b7280'}
                            style={{ fontSize: '12px' }}
                          />
                          <Tooltip 
                            contentStyle={{
                              backgroundColor: darkMode ? '#1f2937' : '#ffffff',
                              border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
                              borderRadius: '8px',
                              color: darkMode ? '#f9fafb' : '#111827',
                              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                            }}
                            formatter={(value: any) => [`$${(value / 1000).toFixed(1)}K`, 'Revenue']}
                          />
                          <Legend 
                            wrapperStyle={{
                              color: darkMode ? '#9ca3af' : '#6b7280',
                              fontSize: '14px'
                            }}
                          />
                          <Area 
                            type="monotone" 
                            dataKey="value" 
                            stroke={COLORS[0]} 
                            strokeWidth={3}
                            fillOpacity={1} 
                            fill="url(#colorValue)" 
                          />
                        </RechartsAreaChart>
                      </ResponsiveContainer>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'preview' && (
            <div className="w-full h-full flex items-center justify-center px-[0px] py-[24px]">
              <div className="w-full max-w-6xl bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30">
                  <h2 className="text-gray-900 dark:text-white">Q4 Sales Report</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Regional Revenue Analysis</p>
                </div>
                <div className="p-6">
                  <div className="w-full">
                    {selectedChartType === 'bar-chart' && (
                      <ResponsiveContainer width="100%" aspect={2.2}>
                        <RechartsBarChart data={pieChartData}>
                          <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
                          <XAxis 
                            dataKey="name" 
                            stroke={darkMode ? '#9ca3af' : '#6b7280'}
                            style={{ fontSize: '12px' }}
                          />
                          <YAxis 
                            stroke={darkMode ? '#9ca3af' : '#6b7280'}
                            style={{ fontSize: '12px' }}
                          />
                          <Tooltip 
                            contentStyle={{
                              backgroundColor: darkMode ? '#1f2937' : '#ffffff',
                              border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
                              borderRadius: '8px',
                              color: darkMode ? '#f9fafb' : '#111827',
                              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                            }}
                            formatter={(value: any) => [`$${(value / 1000).toFixed(1)}K`, 'Revenue']}
                          />
                          <Legend 
                            wrapperStyle={{
                              color: darkMode ? '#9ca3af' : '#6b7280',
                              fontSize: '14px'
                            }}
                          />
                          <Bar dataKey="value" fill={COLORS[0]} radius={[8, 8, 0, 0]} />
                        </RechartsBarChart>
                      </ResponsiveContainer>
                    )}

                    {selectedChartType === 'line-chart' && (
                      <ResponsiveContainer width="100%" aspect={2.2}>
                        <RechartsLineChart data={pieChartData}>
                          <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
                          <XAxis 
                            dataKey="name" 
                            stroke={darkMode ? '#9ca3af' : '#6b7280'}
                            style={{ fontSize: '12px' }}
                          />
                          <YAxis 
                            stroke={darkMode ? '#9ca3af' : '#6b7280'}
                            style={{ fontSize: '12px' }}
                          />
                          <Tooltip 
                            contentStyle={{
                              backgroundColor: darkMode ? '#1f2937' : '#ffffff',
                              border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
                              borderRadius: '8px',
                              color: darkMode ? '#f9fafb' : '#111827',
                              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                            }}
                            formatter={(value: any) => [`$${(value / 1000).toFixed(1)}K`, 'Revenue']}
                          />
                          <Legend 
                            wrapperStyle={{
                              color: darkMode ? '#9ca3af' : '#6b7280',
                              fontSize: '14px'
                            }}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="value" 
                            stroke={COLORS[0]} 
                            strokeWidth={3}
                            dot={{ fill: COLORS[0], r: 5 }}
                            activeDot={{ r: 7 }}
                          />
                        </RechartsLineChart>
                      </ResponsiveContainer>
                    )}

                    {selectedChartType === 'pie-chart' && (
                      <ResponsiveContainer width="100%" aspect={2.2}>
                        <RechartsPieChart>
                          <Pie
                            data={pieChartData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomLabel}
                            outerRadius={150}
                            fill="#8884d8"
                            dataKey="value"
                            animationBegin={0}
                            animationDuration={800}
                          >
                            {pieChartData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip 
                            contentStyle={{
                              backgroundColor: darkMode ? '#1f2937' : '#ffffff',
                              border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
                              borderRadius: '8px',
                              color: darkMode ? '#f9fafb' : '#111827',
                              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                            }}
                            formatter={(value: any) => [`$${(value / 1000).toFixed(1)}K`, 'Revenue']}
                          />
                          <Legend 
                            verticalAlign="bottom" 
                            height={40}
                            iconType="circle"
                            wrapperStyle={{
                              color: darkMode ? '#9ca3af' : '#6b7280',
                              fontSize: '14px'
                            }}
                          />
                        </RechartsPieChart>
                      </ResponsiveContainer>
                    )}

                    {selectedChartType === 'area-chart' && (
                      <ResponsiveContainer width="100%" aspect={2.2}>
                        <RechartsAreaChart data={pieChartData}>
                          <defs>
                            <linearGradient id="colorValuePreview" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor={COLORS[0]} stopOpacity={0.8}/>
                              <stop offset="95%" stopColor={COLORS[0]} stopOpacity={0.1}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
                          <XAxis 
                            dataKey="name" 
                            stroke={darkMode ? '#9ca3af' : '#6b7280'}
                            style={{ fontSize: '12px' }}
                          />
                          <YAxis 
                            stroke={darkMode ? '#9ca3af' : '#6b7280'}
                            style={{ fontSize: '12px' }}
                          />
                          <Tooltip 
                            contentStyle={{
                              backgroundColor: darkMode ? '#1f2937' : '#ffffff',
                              border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
                              borderRadius: '8px',
                              color: darkMode ? '#f9fafb' : '#111827',
                              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                            }}
                            formatter={(value: any) => [`$${(value / 1000).toFixed(1)}K`, 'Revenue']}
                          />
                          <Legend 
                            wrapperStyle={{
                              color: darkMode ? '#9ca3af' : '#6b7280',
                              fontSize: '14px'
                            }}
                          />
                          <Area 
                            type="monotone" 
                            dataKey="value" 
                            stroke={COLORS[0]} 
                            strokeWidth={3}
                            fillOpacity={1} 
                            fill="url(#colorValuePreview)" 
                          />
                        </RechartsAreaChart>
                      </ResponsiveContainer>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="max-w-2xl mx-auto">
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                {historyItems.map((item, index) => (
                  <div
                    key={item.id}
                    className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer ${
                      index !== historyItems.length - 1 ? 'border-b border-gray-100 dark:border-gray-700' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span className="text-gray-900 dark:text-white">{item.action}</span>
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{item.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Panel - Styling */}
        {activeTab === 'builder' && (
          <div className="w-80 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 overflow-y-auto custom-scrollbar">
            <div className="p-4">
              <h3 className="text-gray-900 dark:text-white mb-4">Styling & Formatting</h3>
              
              {/* Chart Type */}
              <div className="mb-6">
                <label className="text-sm text-gray-600 dark:text-gray-400 mb-2 block">Chart Type</label>
                <div className="grid grid-cols-2 gap-2">
                  {chartTypes.map((chart, index) => {
                    const chartId = chart.name.toLowerCase().replace(' ', '-');
                    const isSelected = selectedChartType === chartId;
                    return (
                      <button
                        key={index}
                        onClick={() => setSelectedChartType(chartId)}
                        className={`p-3 rounded-lg border-2 transition-all flex flex-col items-center space-y-2 ${
                          isSelected
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-400'
                            : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 hover:border-blue-400 dark:hover:border-blue-500'
                        }`}
                      >
                        <chart.icon className={`w-6 h-6 ${isSelected ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'}`} />
                        <span className={`text-xs ${isSelected ? 'text-blue-600 dark:text-blue-400 font-medium' : 'text-gray-600 dark:text-gray-400'}`}>
                          {chart.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Colors */}
              <div className="mb-6">
                <label className="text-sm text-gray-600 dark:text-gray-400 mb-2 flex items-center space-x-2">
                  <Palette className="w-4 h-4" />
                  <span>Color Scheme</span>
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {[
                    { bg: 'bg-blue-600', colors: ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444'] },
                    { bg: 'bg-purple-600', colors: ['#8b5cf6', '#ec4899', '#3b82f6', '#10b981', '#f59e0b'] },
                    { bg: 'bg-green-600', colors: ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444'] },
                    { bg: 'bg-orange-600', colors: ['#f59e0b', '#ef4444', '#ec4899', '#8b5cf6', '#3b82f6'] },
                    { bg: 'bg-pink-600', colors: ['#ec4899', '#8b5cf6', '#3b82f6', '#10b981', '#f59e0b'] },
                    { bg: 'bg-indigo-600', colors: ['#6366f1', '#8b5cf6', '#3b82f6', '#10b981', '#f59e0b'] },
                    { bg: 'bg-red-600', colors: ['#ef4444', '#f59e0b', '#ec4899', '#8b5cf6', '#3b82f6'] },
                    { bg: 'bg-teal-600', colors: ['#14b8a6', '#10b981', '#3b82f6', '#8b5cf6', '#f59e0b'] },
                    { bg: 'bg-yellow-600', colors: ['#eab308', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6'] },
                    { bg: 'bg-cyan-600', colors: ['#06b6d4', '#3b82f6', '#10b981', '#8b5cf6', '#f59e0b'] }
                  ].map((scheme, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedColorScheme(index)}
                      className={`w-10 h-10 ${scheme.bg} rounded-lg transition-all relative ${
                        selectedColorScheme === index
                          ? 'scale-110 ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-gray-800'
                          : 'hover:scale-105'
                      }`}
                    >
                      {selectedColorScheme === index && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Labels */}
              <div className="mb-6">
                <label className="text-sm text-gray-600 dark:text-gray-400 mb-2 flex items-center space-x-2">
                  <Type className="w-4 h-4" />
                  <span>Labels</span>
                </label>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">Title</label>
                    <input
                      type="text"
                      placeholder="Chart title"
                      className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">X-Axis Label</label>
                    <input
                      type="text"
                      placeholder="X-axis"
                      className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">Y-Axis Label</label>
                    <input
                      type="text"
                      placeholder="Y-axis"
                      className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              
            </div>
          </div>
        )}
      </div>

      {/* Save Modal */}
      {showSaveModal && (
        <SaveExportModal
          isOpen={true}
          type="save"
          onClose={() => setShowSaveModal(false)}
          onConfirm={(name, description) => {
            console.log('Saving dashboard:', name, description);
            
            // Create dashboard object
            const newDashboard = {
              id: Date.now(),
              name: name,
              description: description,
              chartType: selectedChartType,
              colorScheme: selectedColorScheme,
              columnsZone: columnsZone,
              rowsZone: rowsZone,
              dataset: datasets.find(ds => ds.id === selectedDataset),
              createdAt: new Date().toISOString()
            };
            
            // Navigate to dashboard view
            if (onCreateDashboard) {
              onCreateDashboard(newDashboard);
            }
            
            setShowSaveModal(false);
          }}
        />
      )}

      {/* Export Modal */}
      {showExportModal && (
        <SaveExportModal
          isOpen={true}
          type="export"
          context="report"
          simpleExport={true}
          onClose={() => setShowExportModal(false)}
          onConfirm={(name, description, format) => {
            console.log('Exporting report as:', format);
            setShowExportModal(false);
          }}
        />
      )}
    </div>
  );
}