import { X } from 'lucide-react';
import { useState } from 'react';

interface SaveExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'save' | 'export';
  onConfirm: (name: string, description: string, format?: string) => void;
  context?: 'dashboard' | 'dataset' | 'report';
  simpleExport?: boolean; // New prop to skip name/description for export
}

export default function SaveExportModal({ isOpen, onClose, type, onConfirm, context = 'dashboard', simpleExport = false }: SaveExportModalProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [format, setFormat] = useState('PDF');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(name, description, type === 'export' ? format : undefined);
    setName('');
    setDescription('');
    setFormat('PDF');
    onClose();
  };

  // Determine available formats based on context
  const getFormats = () => {
    if (context === 'dashboard') {
      return ['PDF']; // Dashboard only exports to PDF
    }
    else if (context === 'report') {
      return ['JNP']; // Dashboard only exports to PDF
    }
    return ['JSON', 'Excel', 'CSV']; // Dataset exports
  };

  const formats = getFormats();

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-gray-900 dark:text-white">
            {type === 'save' 
              ? (context === 'dataset' ? 'Save Dataset' : context === 'dashboard' ? 'Save Dashboard' : context === 'report' ? 'Save Report' : 'Save')
              : (context === 'dataset' ? 'Export Dataset' : context === 'dashboard' ? 'Export Dashboard' : context === 'report' ? 'Export Report' : 'Export')
            }
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {!simpleExport && (
            <div>
              <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={type === 'save' ? 'Enter dashboard name' : 'Enter export file name'}
                required
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white placeholder-gray-400"
              />
            </div>
          )}

          {!simpleExport && (
            <div>
              <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add a description (optional)"
                rows={3}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white placeholder-gray-400 resize-none"
              />
            </div>
          )}

          {type === 'export' && (
            <div>
              <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
                Format
              </label>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
              >
                {formats.map((fmt) => (
                  <option key={fmt}>{fmt}</option>
                ))}
              </select>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {type === 'save' ? 'Save' : 'Export'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}