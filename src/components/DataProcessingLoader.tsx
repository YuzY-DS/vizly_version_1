import { Loader2, Sparkles } from 'lucide-react';

interface DataProcessingLoaderProps {
  darkMode: boolean;
  currentOperation: string;
  progress: number;
}

export default function DataProcessingLoader({ darkMode, currentOperation, progress }: DataProcessingLoaderProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md p-8 border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col items-center text-center">
          {/* Animated Icon */}
          <div className="relative mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center animate-pulse">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <div className="absolute inset-0 w-20 h-20 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>

          {/* Title */}
          <h3 className="text-xl text-gray-900 dark:text-white mb-2">Processing Your Data</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            Please wait while we optimize your dataset
          </p>

          {/* Current Operation */}
          <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-lg p-4 mb-6">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Current Operation:</p>
            <p className="text-sm text-gray-900 dark:text-white flex items-center justify-center space-x-2">
              <Loader2 className="w-4 h-4 animate-spin text-blue-600 dark:text-blue-400" />
              <span>{currentOperation}</span>
            </p>
          </div>

          {/* Progress Bar */}
          <div className="w-full">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-500 dark:text-gray-400">Progress</span>
              <span className="text-xs text-blue-600 dark:text-blue-400">{progress}%</span>
            </div>
            <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
