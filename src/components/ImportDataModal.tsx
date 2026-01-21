import { useState } from 'react';
import { X, Upload, FileText, FileSpreadsheet, FileJson, ChevronRight, ChevronLeft, Check, AlertCircle } from 'lucide-react';

interface ImportDataModalProps {
  onClose: () => void;
  onImport: (data: any) => void;
}

export default function ImportDataModal({ onClose, onImport }: ImportDataModalProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [fileType, setFileType] = useState<'excel' | 'json' | 'csv'>('excel');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<{ title?: string; file?: string }>({});
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Mock Excel sheets - in real app, these would be detected from the uploaded file
  const [excelSheets, setExcelSheets] = useState([
    { id: 1, name: 'E-commerce Sales Data', rows: 15, columns: 8, selected: false },
  ]);

  const fileTypes = [
    {
      id: 'excel',
      name: 'Excel',
      icon: FileSpreadsheet,
      description: 'Import from .xlsx or .xls files',
      formats: '.xlsx, .xls',
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      borderColor: 'border-green-200 dark:border-green-800',
    },
    {
      id: 'json',
      name: 'JSON',
      icon: FileJson,
      description: 'Import from JSON format',
      formats: '.json',
      color: 'text-yellow-600 dark:text-yellow-400',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
      borderColor: 'border-yellow-200 dark:border-yellow-800',
    },
    {
      id: 'csv',
      name: 'CSV',
      icon: FileText,
      description: 'Import from CSV files',
      formats: '.csv',
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      borderColor: 'border-blue-200 dark:border-blue-800',
    },
  ];

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setErrors({ ...errors, file: undefined });
      
      // If Excel file is selected, simulate sheet detection
      if (fileType === 'excel') {
        // In real app, you would parse the Excel file here
        console.log('Excel file detected, loading sheets...');
      }
    }
  };

  const handleStep1Next = () => {
    const newErrors: { title?: string; file?: string } = {};
    
    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!selectedFile) {
      newErrors.file = 'Please select a file to import';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setErrors({});
    
    // If file type is Excel, go to step 2, otherwise import directly
    if (fileType === 'excel') {
      setStep(2);
    } else {
      handleImport();
    }
  };

  const handleImport = () => {
    const selectedSheets = excelSheets.filter(sheet => sheet.selected);
    
    if (fileType === 'excel' && selectedSheets.length === 0) {
      setErrors({ file: 'Please select at least one sheet to import' });
      return;
    }
    
    const importData = {
      title,
      description,
      fileType,
      file: selectedFile,
      sheets: fileType === 'excel' ? selectedSheets : null,
    };
    
    onImport(importData);
    setShowSuccess(true);
    
    // Close modal after showing success message
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  const toggleSheet = (sheetId: number) => {
    setExcelSheets(excelSheets.map(sheet => 
      sheet.id === sheetId ? { ...sheet, selected: !sheet.selected } : sheet
    ));
  };

  const selectAllSheets = () => {
    const allSelected = excelSheets.every(sheet => sheet.selected);
    setExcelSheets(excelSheets.map(sheet => ({ ...sheet, selected: !allSelected })));
  };

  const selectedFileType = fileTypes.find(ft => ft.id === fileType);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      {showSuccess ? (
        /* Success Message */
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md p-8 animate-in fade-in zoom-in duration-300">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Check className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-gray-900 dark:text-white mb-2">Import Successful!</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {fileType === 'excel' 
                ? `${excelSheets.filter(s => s.selected).length} sheet(s) imported successfully`
                : 'Your file has been imported successfully'}
            </p>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <span className="text-sm text-gray-600 dark:text-gray-400">Dataset</span>
                <span className="text-gray-900 dark:text-white">{title}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <span className="text-sm text-gray-600 dark:text-gray-400">Format</span>
                <span className="text-gray-900 dark:text-white uppercase">{fileType}</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <div>
              <h2 className="text-gray-900 dark:text-white">Import Data</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {step === 1 ? 'Select your data source' : 'Choose sheets to import'}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
          </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          {/* Step 1: File Information and Selection */}
          {step === 1 && (
            <div className="space-y-6">
              {/* Title */}
              <div>
                <label className="text-sm text-gray-700 dark:text-gray-300 mb-2 block">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    setErrors({ ...errors, title: undefined });
                  }}
                  placeholder="Enter a name for your dataset"
                  className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border ${
                    errors.title ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'
                  } rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white placeholder-gray-500`}
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1 flex items-center space-x-1">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.title}</span>
                  </p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="text-sm text-gray-700 dark:text-gray-300 mb-2 block">
                  Description <span className="text-gray-500">(Optional)</span>
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Add a description for this dataset..."
                  rows={3}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white placeholder-gray-500 resize-none"
                />
              </div>

              {/* File Type Selector */}
              <div>
                <label className="text-sm text-gray-700 dark:text-gray-300 mb-3 block">
                  File Type <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {fileTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setFileType(type.id as any)}
                      className={`p-3 rounded-xl border-2 transition-all hover:shadow-md ${
                        fileType === type.id
                          ? `${type.borderColor} ${type.bgColor}`
                          : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900'
                      }`}
                    >
                      <div className="flex flex-col items-center text-center space-y-1.5">
                        <div className={`w-10 h-10 rounded-lg ${
                          fileType === type.id ? type.bgColor : 'bg-gray-100 dark:bg-gray-800'
                        } flex items-center justify-center`}>
                          <type.icon className={`w-5 h-5 ${
                            fileType === type.id ? type.color : 'text-gray-600 dark:text-gray-400'
                          }`} />
                        </div>
                        <div>
                          <p className={`text-sm text-gray-900 dark:text-white mb-0.5 ${
                            fileType === type.id ? '' : ''
                          }`}>
                            {type.name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-500">{type.formats}</p>
                        </div>
                        {fileType === type.id && (
                          <div className={`w-5 h-5 rounded-full ${type.bgColor} flex items-center justify-center`}>
                            <Check className={`w-3.5 h-3.5 ${type.color}`} />
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* File Upload */}
              <div>
                <label className="text-sm text-gray-700 dark:text-gray-300 mb-2 block">
                  Select File <span className="text-red-500">*</span>
                </label>
                <div className={`border-2 border-dashed rounded-xl p-8 transition-colors ${
                  errors.file
                    ? 'border-red-500 bg-red-50 dark:bg-red-900/10'
                    : selectedFile
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/10'
                    : 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900'
                }`}>
                  <div className="text-center">
                    {selectedFile ? (
                      <div className="space-y-3">
                        <div className={`w-16 h-16 mx-auto rounded-full ${selectedFileType?.bgColor} flex items-center justify-center`}>
                          {selectedFileType && <selectedFileType.icon className={`w-8 h-8 ${selectedFileType.color}`} />}
                        </div>
                        <div>
                          <p className="text-gray-900 dark:text-white">{selectedFile.name}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                        <button
                          onClick={() => setSelectedFile(null)}
                          className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          Choose different file
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="w-16 h-16 mx-auto bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                          <Upload className="w-8 h-8 text-gray-600 dark:text-gray-400" />
                        </div>
                        <div>
                          <label
                            htmlFor="file-upload"
                            className="cursor-pointer text-blue-600 dark:text-blue-400 hover:underline"
                          >
                            Click to upload
                          </label>
                          <span className="text-gray-600 dark:text-gray-400"> or drag and drop</span>
                          <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                            {selectedFileType?.formats} files supported
                          </p>
                        </div>
                        <input
                          id="file-upload"
                          type="file"
                          accept={selectedFileType?.formats}
                          onChange={handleFileSelect}
                          className="hidden"
                        />
                      </div>
                    )}
                  </div>
                </div>
                {errors.file && (
                  <p className="text-red-500 text-sm mt-2 flex items-center space-x-1">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.file}</span>
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Step 2: Excel Sheet Selection */}
          {step === 2 && fileType === 'excel' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-gray-900 dark:text-white">Select Sheets to Import</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Choose one or more sheets from your Excel file
                  </p>
                </div>
                <button
                  onClick={selectAllSheets}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {excelSheets.every(s => s.selected) ? 'Deselect All' : 'Select All'}
                </button>
              </div>

              <div className="space-y-3">
                {excelSheets.map((sheet) => (
                  <label
                    key={sheet.id}
                    className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all hover:shadow-md ${
                      sheet.selected
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <input
                        type="checkbox"
                        checked={sheet.selected}
                        onChange={() => toggleSheet(sheet.id)}
                        className="w-5 h-5 rounded text-blue-600 focus:ring-blue-500 focus:ring-offset-0"
                      />
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-lg ${
                          sheet.selected
                            ? 'bg-blue-100 dark:bg-blue-900/40'
                            : 'bg-gray-100 dark:bg-gray-800'
                        } flex items-center justify-center`}>
                          <FileSpreadsheet className={`w-5 h-5 ${
                            sheet.selected
                              ? 'text-blue-600 dark:text-blue-400'
                              : 'text-gray-600 dark:text-gray-400'
                          }`} />
                        </div>
                        <div>
                          <p className="text-gray-900 dark:text-white">{sheet.name}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {sheet.rows.toLocaleString()} rows • {sheet.columns} columns
                          </p>
                        </div>
                      </div>
                    </div>
                    {sheet.selected && (
                      <Check className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    )}
                  </label>
                ))}
              </div>

              {excelSheets.filter(s => s.selected).length > 0 && (
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
                  <p className="text-sm text-blue-800 dark:text-blue-300">
                    <strong>{excelSheets.filter(s => s.selected).length}</strong> sheet(s) selected for import
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <button
              onClick={step === 1 ? onClose : () => setStep(1)}
              className="px-6 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center space-x-2"
            >
              {step === 1 ? (
                <>
                  <X className="w-4 h-4" />
                  <span>Cancel</span>
                </>
              ) : (
                <>
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back</span>
                </>
              )}
            </button>

            <button
              onClick={step === 1 ? handleStep1Next : handleImport}
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all flex items-center space-x-2"
            >
              <span>{step === 1 && fileType !== 'excel' ? 'Import' : step === 1 ? 'Next' : 'Import'}</span>
              {step === 1 && fileType === 'excel' ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <Upload className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}