import { useState } from 'react';
import { X, Sparkles, Eraser, Shuffle, Calculator, CheckCircle, AlertCircle, Play, Info, ChevronRight, Settings2 } from 'lucide-react';
import DataProcessingPreview from './DataProcessingPreview';

interface DataProcessingModalProps {
  onClose: () => void;
  onProcess: (operation: string, options: any) => void;
  darkMode: boolean;
  columns: string[];
}

export default function DataProcessingModal({ onClose, onProcess, darkMode, columns }: DataProcessingModalProps) {
  const [activeTab, setActiveTab] = useState<'clean' | 'transform' | 'calculate' | 'validate'>('clean');
  const [selectedOperations, setSelectedOperations] = useState<string[]>([]);
  const [expandedOperation, setExpandedOperation] = useState<string | null>(null);
  const [operationConfigs, setOperationConfigs] = useState<Record<string, any>>({});
  const [showPreview, setShowPreview] = useState(false);

  const tabs = [
    { id: 'clean' as const, label: 'Clean Data', icon: Eraser },
    { id: 'transform' as const, label: 'Transform', icon: Shuffle },
    { id: 'calculate' as const, label: 'Calculate', icon: Calculator },
    { id: 'validate' as const, label: 'Validate', icon: CheckCircle },
  ];

  const cleanOperations = [
    { id: 'remove-duplicates', name: 'Remove Duplicate Rows', description: 'Remove rows with identical values', needsColumns: true, columnMode: 'multiple' },
    { id: 'trim-whitespace', name: 'Trim Whitespace', description: 'Remove leading and trailing spaces from text fields', needsColumns: true, columnMode: 'multiple' },
    { id: 'fill-missing', name: 'Fill Missing Values', description: 'Replace null/empty values with defaults or averages', needsColumns: true, columnMode: 'multiple' },
  ];

  const transformOperations = [
    { id: 'split-column', name: 'Split Column', description: 'Divide one column into multiple columns by delimiter', needsColumns: true, columnMode: 'single' },
    { id: 'merge-columns', name: 'Merge Columns', description: 'Combine multiple columns into a single column', needsColumns: true, columnMode: 'multiple' },
    { id: 'sort-data', name: 'Sort Data', description: 'Sort rows by one or more columns', needsColumns: true, columnMode: 'single' },
  ];

  const calculateOperations = [
    { id: 'add-column', name: 'Add Calculated Column', description: 'Create new column with custom formula', needsColumns: true, columnMode: 'multiple', needsConfig: true },
    { id: 'aggregate', name: 'Aggregate Data', description: 'Calculate sum, average, min, max, count', needsColumns: true, columnMode: 'multiple', needsConfig: true },
    { id: 'percentage-change', name: 'Percentage Change', description: 'Calculate % change between two columns', needsColumns: true, columnMode: 'multiple', needsConfig: true },
    { id: 'descriptive-stats', name: 'Descriptive Statistics', description: 'Calculate mean, median, mode, and standard deviation', needsColumns: true, columnMode: 'multiple', needsConfig: false },
  ];

  const validateOperations = [
    { id: 'check-duplicates', name: 'Check for Duplicates', description: 'Identify and highlight duplicate records', needsColumns: true, columnMode: 'multiple' },
    { id: 'find-missing', name: 'Find Missing Values', description: 'Detect empty or null cells in your data', needsColumns: true, columnMode: 'multiple' },
    { id: 'data-quality', name: 'Data Quality Score', description: 'Get overall data quality assessment', needsColumns: false },
  ];

  const getOperations = () => {
    switch (activeTab) {
      case 'clean': return cleanOperations;
      case 'transform': return transformOperations;
      case 'calculate': return calculateOperations;
      case 'validate': return validateOperations;
      default: return cleanOperations;
    }
  };

  const toggleOperation = (operationId: string) => {
    const isCurrentlySelected = selectedOperations.includes(operationId);
    
    if (isCurrentlySelected) {
      setSelectedOperations(prev => prev.filter(id => id !== operationId));
      setExpandedOperation(null);
      // Remove config
      const newConfigs = { ...operationConfigs };
      delete newConfigs[operationId];
      setOperationConfigs(newConfigs);
    } else {
      setSelectedOperations(prev => [...prev, operationId]);
      setExpandedOperation(operationId);
      // Initialize config based on operation type - start with NO columns selected
      const initialConfig: any = { columns: [] };
      
      // Add extra config for calculated column
      if (operationId === 'add-column') {
        initialConfig.newColumnName = '';
        initialConfig.calculationType = 'add';
        initialConfig.columns = []; // Start with empty for add-column
      }
      
      // Add extra config for aggregate
      if (operationId === 'aggregate') {
        initialConfig.aggregationType = 'sum';
        initialConfig.groupByColumn = '';
        initialConfig.columns = []; // Start with empty
      }
      
      // Add extra config for percentage change
      if (operationId === 'percentage-change') {
        initialConfig.newColumnName = '';
        initialConfig.baseColumn = '';
        initialConfig.compareColumn = '';
        initialConfig.columns = []; // Start with empty
      }
      
      setOperationConfigs(prev => ({
        ...prev,
        [operationId]: initialConfig
      }));
    }
  };

  const updateCalculationConfig = (operationId: string, field: string, value: any) => {
    setOperationConfigs(prev => ({
      ...prev,
      [operationId]: {
        ...prev[operationId],
        [field]: value
      }
    }));
  };

  const toggleColumnForOperation = (operationId: string, column: string, columnMode: string) => {
    setOperationConfigs(prev => {
      const currentConfig = prev[operationId] || { columns: [] };
      const currentColumns = currentConfig.columns || [];
      
      let newColumns;
      if (columnMode === 'single') {
        // Single selection mode
        newColumns = [column];
      } else {
        // Multiple selection mode
        if (currentColumns.includes(column)) {
          newColumns = currentColumns.filter((c: string) => c !== column);
        } else {
          newColumns = [...currentColumns, column];
        }
      }
      
      return {
        ...prev,
        [operationId]: { ...currentConfig, columns: newColumns }
      };
    });
  };

  const handleProcess = () => {
    if (selectedOperations.length === 0) {
      alert('Please select at least one operation');
      return;
    }
    
    // Validate that operations with column requirements have columns selected
    const operations = getOperations();
    for (const opId of selectedOperations) {
      const operation = operations.find(op => op.id === opId);
      const config = operationConfigs[opId];
      
      // Special validation for Add Calculated Column
      if (opId === 'add-column') {
        if (!config?.newColumnName || config.newColumnName.trim() === '') {
          alert('Please enter a name for the new calculated column');
          return;
        }
        if (!config?.columns || config.columns.length === 0) {
          alert('Please select at least one source column for the calculation');
          return;
        }
      } else if (opId === 'percentage-change') {
        if (!config?.newColumnName || config.newColumnName.trim() === '') {
          alert('Please enter a name for the percentage change column');
          return;
        }
        if (!config?.baseColumn || config.baseColumn === '') {
          alert('Please select a base column for percentage calculation');
          return;
        }
        if (!config?.compareColumn || config.compareColumn === '') {
          alert('Please select a compare column for percentage calculation');
          return;
        }
      } else if (operation?.needsColumns) {
        if (!config?.columns || config.columns.length === 0) {
          alert(`Please select at least one column for "${operation.name}"`);
          return;
        }
      }
    }
    
    // Show preview instead of directly processing
    setShowPreview(true);
  };

  const generatePreviewItems = () => {
    const allOperations = [...cleanOperations, ...transformOperations, ...calculateOperations, ...validateOperations];
    const operations = getOperations();
    
    return selectedOperations.map((opId) => {
      const operation = allOperations.find(op => op.id === opId);
      const config = operationConfigs[opId];
      const affectedColumns = config?.columns || [];

      // Determine impact level and details for each operation
      let impact = 'medium';
      let details = '';

      switch (opId) {
        case 'remove-duplicates':
          impact = 'high';
          details = `Remove all duplicate rows based on ${affectedColumns.join(', ')}. Only the first occurrence will be kept.`;
          break;
        case 'trim-whitespace':
          impact = 'medium';
          details = `Remove leading and trailing whitespace from ${affectedColumns.length} column(s): ${affectedColumns.join(', ')}.`;
          break;
        case 'fill-missing':
          impact = 'medium';
          details = `Fill empty/null values in ${affectedColumns.length} column(s) with default values or averages.`;
          break;
        case 'split-column':
          impact = 'medium';
          details = `Split column "${affectedColumns[0]}" into multiple columns using a delimiter.`;
          break;
        case 'merge-columns':
          impact = 'low';
          details = `Combine ${affectedColumns.length} columns (${affectedColumns.join(', ')}) into a single new column.`;
          break;
        case 'sort-data':
          impact = 'medium';
          details = `Sort all rows based on column "${affectedColumns[0]}".`;
          break;
        case 'add-column':
          impact = 'low';
          details = `Create new column "${config.newColumnName}" using ${config.calculationType} calculation on ${affectedColumns.length} source column(s).`;
          break;
        case 'aggregate':
          impact = 'medium';
          details = config.groupByColumn 
            ? `Calculate ${config.aggregationType} of ${affectedColumns.join(', ')} grouped by "${config.groupByColumn}".`
            : `Calculate ${config.aggregationType} of ${affectedColumns.join(', ')} for all data.`;
          break;
        case 'percentage-change':
          impact = 'low';
          details = `Create new column "${config.newColumnName}" showing percentage change from "${config.baseColumn}" to "${config.compareColumn}".`;
          break;
        case 'check-duplicates':
          impact = 'safe';
          details = `Scan and highlight duplicate rows based on ${affectedColumns.length} column(s). No data will be modified.`;
          break;
        case 'find-missing':
          impact = 'safe';
          details = `Identify and report empty/null values in ${affectedColumns.length} column(s). No data will be modified.`;
          break;
        case 'data-quality':
          impact = 'safe';
          details = `Generate comprehensive quality score for your dataset. No data will be modified.`;
          break;
        default:
          details = operation?.description || 'Process data according to selected options.';
      }

      return {
        operationId: opId,
        operationName: operation?.name || opId,
        category: activeTab,
        impact,
        affectedColumns,
        details,
        config
      };
    });
  };

  const handleConfirmProcess = () => {
    onProcess(activeTab, { operations: selectedOperations, configs: operationConfigs });
    setShowPreview(false);
    onClose();
  };

  const handleBackToEdit = () => {
    setShowPreview(false);
  };

  // Show preview modal if active
  if (showPreview) {
    return (
      <DataProcessingPreview
        onClose={onClose}
        onConfirm={handleConfirmProcess}
        onBack={handleBackToEdit}
        darkMode={darkMode}
        previewItems={generatePreviewItems()}
        totalRows={15} // This would come from actual data
      />
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col border border-gray-200 dark:border-gray-700">
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-gray-900 dark:text-white">Data Processing Center</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">Clean, transform, and optimize your data</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-6 pt-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex space-x-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-t-lg transition-all ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Info Banner */}
        <div className="px-6 pt-4">
          <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-3 flex items-start space-x-3">
            <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-blue-900 dark:text-blue-200">
                Select operations and configure which columns to process. Click on an operation to expand and select specific columns.
              </p>
            </div>
          </div>
        </div>

        {/* Operations List */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          <div className="space-y-3">
            {getOperations().map((operation) => {
              const isSelected = selectedOperations.includes(operation.id);
              const isExpanded = expandedOperation === operation.id;
              const config = operationConfigs[operation.id];
              const selectedColumns = config?.columns || [];

              return (
                <div
                  key={operation.id}
                  className={`rounded-lg border-2 transition-all ${
                    isSelected
                      ? 'border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-950/30 shadow-md'
                      : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
                  }`}
                >
                  {/* Operation Header */}
                  <div
                    onClick={() => toggleOperation(operation.id)}
                    className="p-4 cursor-pointer hover:bg-blue-50/50 dark:hover:bg-blue-950/20 transition-colors rounded-t-lg"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className={`text-sm ${
                            isSelected
                              ? 'text-blue-900 dark:text-blue-200'
                              : 'text-gray-900 dark:text-white'
                          }`}>
                            {operation.name}
                          </h4>
                          {operation.needsColumns && isSelected && selectedColumns.length > 0 && (
                            <span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full">
                              {selectedColumns.length} column{selectedColumns.length !== 1 ? 's' : ''}
                            </span>
                          )}
                        </div>
                        <p className={`text-xs ${
                          isSelected
                            ? 'text-blue-700 dark:text-blue-300'
                            : 'text-gray-500 dark:text-gray-400'
                        }`}>
                          {operation.description}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2 ml-3">
                        {operation.needsColumns && isSelected && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setExpandedOperation(isExpanded ? null : operation.id);
                            }}
                            className="p-1 hover:bg-blue-200 dark:hover:bg-blue-900 rounded transition-colors"
                          >
                            <Settings2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                          </button>
                        )}
                        {isSelected && (
                          <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Column Selection (Expanded) */}
                  {isSelected && isExpanded && operation.needsColumns && (
                    <div className="px-4 pb-4 border-t border-blue-200 dark:border-blue-800">
                      <div className="pt-3">
                        {/* Special config for Add Calculated Column */}
                        {operation.id === 'add-column' && (
                          <div className="space-y-4 mb-4">
                            {/* New Column Name */}
                            <div>
                              <label className="block text-xs text-gray-700 dark:text-gray-300 mb-2">
                                New Column Name <span className="text-red-500">*</span>
                              </label>
                              <input
                                type="text"
                                placeholder="e.g., Profit Margin, Total Price, etc."
                                value={config?.newColumnName || ''}
                                onChange={(e) => {
                                  e.stopPropagation();
                                  updateCalculationConfig(operation.id, 'newColumnName', e.target.value);
                                }}
                                className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            </div>

                            {/* Calculation Type */}
                            <div>
                              <label className="block text-xs text-gray-700 dark:text-gray-300 mb-2">
                                Calculation Type <span className="text-red-500">*</span>
                              </label>
                              <select
                                value={config?.calculationType || 'add'}
                                onChange={(e) => {
                                  e.stopPropagation();
                                  updateCalculationConfig(operation.id, 'calculationType', e.target.value);
                                }}
                                className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                              >
                                <option value="add">Add (+) - Sum selected columns</option>
                                <option value="subtract">Subtract (-) - Subtract columns in order</option>
                                <option value="multiply">Multiply (×) - Multiply selected columns</option>
                                <option value="divide">Divide (÷) - Divide columns in order</option>
                                <option value="average">Average - Calculate mean of columns</option>
                                <option value="percentage">Percentage (%) - Calculate percentage</option>
                                <option value="concat">Concatenate - Join text columns</option>
                                <option value="custom">Custom Formula - Advanced</option>
                              </select>
                            </div>

                            {/* Custom Formula (if selected) */}
                            {config?.calculationType === 'custom' && (
                              <div>
                                <label className="block text-xs text-gray-700 dark:text-gray-300 mb-2">
                                  Custom Formula
                                </label>
                                <input
                                  type="text"
                                  placeholder="e.g., [Sales] * 0.15 + [Bonus]"
                                  value={config?.customFormula || ''}
                                  onChange={(e) => {
                                    e.stopPropagation();
                                    updateCalculationConfig(operation.id, 'customFormula', e.target.value);
                                  }}
                                  className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                                />
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                  Use [Column Name] to reference columns
                                </p>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Special config for Aggregate Data */}
                        {operation.id === 'aggregate' && (
                          <div className="space-y-4 mb-4">
                            {/* Aggregation Type */}
                            <div>
                              <label className="block text-xs text-gray-700 dark:text-gray-300 mb-2">
                                Aggregation Function <span className="text-red-500">*</span>
                              </label>
                              <select
                                value={config?.aggregationType || 'sum'}
                                onChange={(e) => {
                                  e.stopPropagation();
                                  updateCalculationConfig(operation.id, 'aggregationType', e.target.value);
                                }}
                                className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                              >
                                <option value="sum">Sum - Total of all values</option>
                                <option value="average">Average - Mean value</option>
                                <option value="count">Count - Number of records</option>
                                <option value="min">Min - Minimum value</option>
                                <option value="max">Max - Maximum value</option>
                                <option value="median">Median - Middle value</option>
                              </select>
                            </div>

                            {/* Group By Column (Optional) */}
                            <div>
                              <label className="block text-xs text-gray-700 dark:text-gray-300 mb-2">
                                Group By Column (Optional)
                              </label>
                              <select
                                value={config?.groupByColumn || ''}
                                onChange={(e) => {
                                  e.stopPropagation();
                                  updateCalculationConfig(operation.id, 'groupByColumn', e.target.value);
                                }}
                                className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                              >
                                <option value="">No grouping (all data)</option>
                                {columns.map((col) => (
                                  <option key={col} value={col}>{col}</option>
                                ))}
                              </select>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                Calculate aggregation for each unique value in this column
                              </p>
                            </div>
                          </div>
                        )}

                        {/* Special config for Percentage Change */}
                        {operation.id === 'percentage-change' && (
                          <div className="space-y-4 mb-4">
                            {/* New Column Name */}
                            <div>
                              <label className="block text-xs text-gray-700 dark:text-gray-300 mb-2">
                                New Column Name <span className="text-red-500">*</span>
                              </label>
                              <input
                                type="text"
                                placeholder="e.g., Profit Percentage, Growth Rate"
                                value={config?.newColumnName || ''}
                                onChange={(e) => {
                                  e.stopPropagation();
                                  updateCalculationConfig(operation.id, 'newColumnName', e.target.value);
                                }}
                                className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            </div>

                            {/* Base Column */}
                            <div>
                              <label className="block text-xs text-gray-700 dark:text-gray-300 mb-2">
                                Base Column <span className="text-red-500">*</span>
                              </label>
                              <select
                                value={config?.baseColumn || ''}
                                onChange={(e) => {
                                  e.stopPropagation();
                                  updateCalculationConfig(operation.id, 'baseColumn', e.target.value);
                                }}
                                className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                              >
                                <option value="">Select base column...</option>
                                {columns.map((col) => (
                                  <option key={col} value={col}>{col}</option>
                                ))}
                              </select>
                            </div>

                            {/* Compare Column */}
                            <div>
                              <label className="block text-xs text-gray-700 dark:text-gray-300 mb-2">
                                Compare Column <span className="text-red-500">*</span>
                              </label>
                              <select
                                value={config?.compareColumn || ''}
                                onChange={(e) => {
                                  e.stopPropagation();
                                  updateCalculationConfig(operation.id, 'compareColumn', e.target.value);
                                }}
                                className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                              >
                                <option value="">Select compare column...</option>
                                {columns.map((col) => (
                                  <option key={col} value={col}>{col}</option>
                                ))}
                              </select>
                            </div>

                            <div className="bg-gray-100 dark:bg-gray-900 p-3 rounded-lg">
                              <p className="text-xs text-gray-600 dark:text-gray-400">
                                <strong>Example:</strong> Percentage Change = (Compare Column - Base Column) / Base Column * 100
                              </p>
                            </div>
                          </div>
                        )}

                        {/* Column Selection */}
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                          {operation.id === 'add-column' 
                            ? 'Select source columns for calculation:' 
                            : operation.id === 'aggregate'
                            ? 'Select columns to aggregate:'
                            : operation.id === 'percentage-change'
                            ? 'Select base and compare columns:'
                            : `Select columns to process ${operation.columnMode === 'single' ? '(choose one):' : ':'}`
                          }
                        </p>
                        {operation.id !== 'percentage-change' && (
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                            {columns.map((column) => {
                              const isColumnSelected = selectedColumns.includes(column);
                              return (
                                <button
                                  key={column}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleColumnForOperation(operation.id, column, operation.columnMode);
                                  }}
                                  className={`px-3 py-2 rounded-lg text-xs transition-all ${
                                    isColumnSelected
                                      ? 'bg-blue-600 text-white shadow-sm'
                                      : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500'
                                  }`}
                                >
                                  {column}
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {selectedOperations.length} operation{selectedOperations.length !== 1 ? 's' : ''} selected
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleProcess}
                disabled={selectedOperations.length === 0}
                className={`flex items-center space-x-2 px-5 py-2 rounded-lg transition-all ${
                  selectedOperations.length > 0
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg'
                    : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-500 cursor-not-allowed'
                }`}
              >
                <Play className="w-4 h-4" />
                <span>Process Data</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}