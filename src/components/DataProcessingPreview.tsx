import { AlertTriangle, CheckCircle, X, ArrowLeft, Play, Info } from 'lucide-react';

interface Operation {
  id: string;
  name: string;
  description: string;
}

interface PreviewItem {
  operationId: string;
  operationName: string;
  category: string;
  impact: string;
  affectedColumns: string[];
  details: string;
  config?: any;
}

interface DataProcessingPreviewProps {
  onClose: () => void;
  onConfirm: () => void;
  onBack: () => void;
  darkMode: boolean;
  previewItems: PreviewItem[];
  totalRows: number;
}

export default function DataProcessingPreview({ 
  onClose, 
  onConfirm, 
  onBack, 
  darkMode, 
  previewItems,
  totalRows 
}: DataProcessingPreviewProps) {
  
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high':
        return 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800';
      case 'medium':
        return 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/30 border-orange-200 dark:border-orange-800';
      case 'low':
        return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800';
      default:
        return 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800';
    }
  };

  const getImpactLabel = (impact: string) => {
    switch (impact) {
      case 'high':
        return 'High Impact - Will modify existing data';
      case 'medium':
        return 'Medium Impact - Will reorganize data';
      case 'low':
        return 'Low Impact - Will add new data';
      default:
        return 'Safe - Read only operation';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col border border-gray-200 dark:border-gray-700">
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-gray-900 dark:text-white">Review Operations</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Please review the changes before processing
                </p>
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

        {/* Summary Banner */}
        <div className="px-6 pt-4">
          <div className="bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Info className="w-5 h-5 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="text-sm font-medium text-orange-900 dark:text-orange-200 mb-1">
                  About to process {previewItems.length} operation{previewItems.length !== 1 ? 's' : ''}
                </h3>
                <p className="text-xs text-orange-700 dark:text-orange-300">
                  This will affect <strong>{totalRows.toLocaleString()} rows</strong> in your dataset. 
                  Review each operation below to ensure the changes are what you expect.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Operations Preview List */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          <div className="space-y-4">
            {previewItems.map((item, index) => (
              <div
                key={`${item.operationId}-${index}`}
                className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
              >
                {/* Operation Header */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white text-sm font-semibold">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                          {item.operationName}
                        </h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                          {item.category} Operation
                        </p>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs border ${getImpactColor(item.impact)}`}>
                      {getImpactLabel(item.impact)}
                    </div>
                  </div>
                </div>

                {/* Operation Details */}
                <div className="p-4 space-y-3">
                  {/* What will happen */}
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">What will happen:</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {item.details}
                    </p>
                  </div>

                  {/* Affected Columns */}
                  {item.affectedColumns.length > 0 && (
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                        Affected columns ({item.affectedColumns.length}):
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {item.affectedColumns.map((col) => (
                          <span
                            key={col}
                            className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded text-xs"
                          >
                            {col}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Configuration Details */}
                  {item.config && (
                    <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3 space-y-2">
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Configuration:</p>
                      
                      {/* Add Calculated Column config */}
                      {item.operationId === 'add-column' && (
                        <div className="space-y-1 text-xs">
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">New Column:</span>
                            <span className="text-gray-900 dark:text-white font-medium">
                              {item.config.newColumnName || 'N/A'}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Formula Type:</span>
                            <span className="text-gray-900 dark:text-white capitalize">
                              {item.config.calculationType || 'N/A'}
                            </span>
                          </div>
                          {item.config.customFormula && (
                            <div className="pt-1">
                              <span className="text-gray-600 dark:text-gray-400">Formula:</span>
                              <div className="mt-1 font-mono text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded">
                                {item.config.customFormula}
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Aggregate Data config */}
                      {item.operationId === 'aggregate' && (
                        <div className="space-y-1 text-xs">
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Function:</span>
                            <span className="text-gray-900 dark:text-white capitalize">
                              {item.config.aggregationType || 'N/A'}
                            </span>
                          </div>
                          {item.config.groupByColumn && (
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">Group By:</span>
                              <span className="text-gray-900 dark:text-white">
                                {item.config.groupByColumn}
                              </span>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Percentage Change config */}
                      {item.operationId === 'percentage-change' && (
                        <div className="space-y-1 text-xs">
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">New Column:</span>
                            <span className="text-gray-900 dark:text-white font-medium">
                              {item.config.newColumnName || 'N/A'}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Base Column:</span>
                            <span className="text-gray-900 dark:text-white">
                              {item.config.baseColumn || 'N/A'}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Compare Column:</span>
                            <span className="text-gray-900 dark:text-white">
                              {item.config.compareColumn || 'N/A'}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Estimated result */}
                  <div className="flex items-center space-x-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                    <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Will process <strong>{totalRows.toLocaleString()} rows</strong>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Edit</span>
            </button>
            <div className="flex items-center space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="flex items-center space-x-2 px-5 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all"
              >
                <Play className="w-4 h-4" />
                <span>Confirm & Process</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
