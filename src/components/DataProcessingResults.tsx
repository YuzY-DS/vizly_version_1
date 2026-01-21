import {
  CheckCircle,
  X,
  TrendingUp,
  AlertTriangle,
  Sparkles,
  Download,
  FileText,
} from "lucide-react";

interface ProcessingResult {
  operation: string;
  operationName: string;
  status: "success" | "warning" | "info";
  rowsAffected: number;
  details: string;
  columns?: string[]; // Add columns field for descriptive stats
  statsData?: {
    [columnName: string]: {
      [statName: string]: string | number;
    };
  }; // New structure for column-based stats
  metrics?: {
    before: string | number;
    after: string | number;
    label: string;
  }[];
}

interface DataProcessingResultsProps {
  onClose: () => void;
  results: ProcessingResult[];
  darkMode: boolean;
  totalRows: number;
}

export default function DataProcessingResults({
  onClose,
  results,
  darkMode,
  totalRows,
}: DataProcessingResultsProps) {
  const totalRowsAffected = results.reduce(
    (sum, result) => sum + result.rowsAffected,
    0,
  );
  const successfulOperations = results.filter(
    (r) => r.status === "success",
  ).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col border border-gray-200 dark:border-gray-700">
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-600 rounded-lg flex items-center justify-center shadow-lg">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-gray-900 dark:text-white flex items-center space-x-2">
                  <span>Processing Complete!</span>
                  <Sparkles className="w-5 h-5 text-yellow-500" />
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Successfully processed {successfulOperations}{" "}
                  operation
                  {successfulOperations !== 1 ? "s" : ""}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/50 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </button>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                    Total Rows
                  </p>
                  <p className="text-2xl text-gray-900 dark:text-white">
                    {totalRows.toLocaleString()}
                  </p>
                </div>
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                    Rows Affected
                  </p>
                  <p className="text-2xl text-green-600 dark:text-green-400">
                    {totalRowsAffected.toLocaleString()}
                  </p>
                </div>
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                    Operations
                  </p>
                  <p className="text-2xl text-purple-600 dark:text-purple-400">
                    {results.length}
                  </p>
                </div>
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          <h3 className="text-sm text-gray-700 dark:text-gray-300 mb-3">
            Operation Details
          </h3>
          <div className="space-y-3">
            {results.map((result, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-start space-x-3 flex-1">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        result.status === "success"
                          ? "bg-green-100 dark:bg-green-900/30"
                          : result.status === "warning"
                            ? "bg-yellow-100 dark:bg-yellow-900/30"
                            : "bg-blue-100 dark:bg-blue-900/30"
                      }`}
                    >
                      {result.status === "success" ? (
                        <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                      ) : result.status === "warning" ? (
                        <AlertTriangle className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                      ) : (
                        <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-gray-900 dark:text-white mb-1">
                        {result.operationName}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {result.details}
                      </p>

                      {result.metrics &&
                        result.metrics.length > 0 && (
                          <div className="mt-3 space-y-2">
                            {/* Show table format for descriptive-stats */}
                            {result.operation === 'descriptive-stats' && result.statsData ? (
                              <div className="overflow-x-auto">
                                <table className="w-full border-collapse bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden">
                                  <thead>
                                    <tr className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/40 dark:to-purple-900/40">
                                      <th className="px-4 py-2 text-left text-xs text-gray-700 dark:text-gray-300 border-b border-gray-300 dark:border-gray-600">
                                        Statistic
                                      </th>
                                      {result.columns && result.columns.map((col, idx) => (
                                        <th key={idx} className="px-4 py-2 text-left text-xs text-gray-700 dark:text-gray-300 border-b border-gray-300 dark:border-gray-600">
                                          {col}
                                        </th>
                                      ))}
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {['Mean', 'Median', 'Mode', 'Std Deviation', 'Min Value', 'Max Value'].map((statName, statIndex) => (
                                      <tr
                                        key={statIndex}
                                        className="border-b border-gray-200 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-blue-950/20 transition-colors"
                                      >
                                        <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 font-medium">
                                          {statName}
                                        </td>
                                        {result.columns && result.columns.map((col, colIdx) => (
                                          <td key={colIdx} className="px-4 py-3 text-sm text-blue-600 dark:text-blue-400">
                                            {result.statsData?.[col]?.[statName] || 'N/A'}
                                          </td>
                                        ))}
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            ) : (
                              /* Show regular format for other operations */
                              result.metrics.map(
                                (metric, mIndex) => (
                                  <div
                                    key={mIndex}
                                    className="flex items-center space-x-4 text-sm"
                                  >
                                    <span className="text-gray-500 dark:text-gray-400 min-w-[100px]">
                                      {metric.label}:
                                    </span>
                                    <div className="flex items-center space-x-2">
                                      <span className="text-green-600 dark:text-green-400 font-medium">
                                        {metric.after}
                                      </span>
                                    </div>
                                  </div>
                                ),
                              )
                            )}
                          </div>
                        )}
                    </div>
                  </div>
                  <div className="text-right ml-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Rows Affected
                    </p>
                    <p className="text-lg text-gray-900 dark:text-white">
                      {result.rowsAffected.toLocaleString()}
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
            <div className="text-sm text-gray-600 dark:text-gray-400">
              <span className="inline-flex items-center space-x-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 px-3 py-1 rounded-full">
                <CheckCircle className="w-4 h-4" />
                <span>
                  All changes have been applied successfully
                </span>
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={onClose}
                className="px-5 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all shadow-md hover:shadow-lg"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}