import { useState } from "react";
import {
  Download,
  Plus,
  Filter,
  ArrowUpDown,
  Upload,
  Search,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  Undo2,
  Redo2,
  Save,
  Moon,
  Sun,
  Trash2,
  Settings,
} from "lucide-react";
import DataProcessingModal from "./DataProcessingModal";
import DataProcessingLoader from "./DataProcessingLoader";
import DataProcessingResults from "./DataProcessingResults";
import SaveExportModal from "./SaveExportModal";

interface DataTableViewProps {
  onNavigate: (
    screen: "home" | "workspace" | "builder" | "dataview",
  ) => void;
  dataSource: {
    id: number;
    name: string;
    type: string;
    rows: string;
    lastUpdated: string;
    icon: any;
    color: string;
  } | null;
  darkMode: boolean;
  onToggleDarkMode?: (value: boolean) => void;
}

export default function DataTableView({
  onNavigate,
  dataSource,
  darkMode,
  onToggleDarkMode,
}: DataTableViewProps) {
  const [autoSave, setAutoSave] = useState(true);
  const [showProcessingModal, setShowProcessingModal] =
    useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] =
    useState(0);
  const [currentOperation, setCurrentOperation] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [processingResults, setProcessingResults] = useState<
    any[]
  >([]);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);

  // Mock data - in a real app, this would be fetched based on the data source
  const sampleData = {
    "Sales Data": {
      columns: [
        "Date",
        "Region",
        "Product Category",
        "Product",
        "Customer Name",
        "Sales",
        "Cost",
        "Profit",
      ],
      rows: [
        [
          "04 Jun, 2018",
          "East",
          "Grocery",
          "Fruits and Vegetables",
          "Pete Zachriah",
          "$3002.46",
          "$972.44",
          "$2030.02",
        ],
        [
          "02 Jun, 2018",
          "East",
          "Grocery",
          "Fruits and Vegetables",
          "Santa Cruz Clara",
          "$2875.25",
          "$1005.89",
          "$1869.36",
        ],
        [
          "02 Jun, 2018",
          "Central",
          "Stationery",
          "Specialty Envelopes",
          "John Britto",
          "$3882.65",
          "$1392.25",
          "$2490.4",
        ],
        [
          "29 May, 2018",
          "West",
          "Stationery",
          "Scissors",
          "Rozario Diego",
          "$986.38",
          "$569.35",
          "$417.03",
        ],
        [
          "29 May, 2018",
          "East",
          "Stationery",
          "Standard Labels",
          "Neil Seth",
          "$58.25",
          "$28.11",
          "$30.14",
        ],
        [
          "28 May, 2018",
          "East",
          "Stationery",
          "Binder Clips",
          "Thomas Mondrake",
          "$189.03",
          "$79.82",
          "$109.21",
        ],
        [
          "28 May, 2018",
          "West",
          "Grocery",
          "Fruits and Vegetables",
          "Rick Reed",
          "$360.78",
          "$164.12",
          "$196.66",
        ],
        [
          "23 May, 2018",
          "West",
          "Grocery",
          "Fruits and Vegetables",
          "Catherine Rose",
          "$1977.77",
          "$1228.05",
          "$749.72",
        ],
        [
          "20 May, 2018",
          "East",
          "Grocery",
          "Fruits and Vegetables",
          "Leena Mary",
          "$5118.45",
          "$3476.62",
          "$1641.83",
        ],
        [
          "19 May, 2018",
          "East",
          "Stationery",
          "Computer Paper",
          "John Britto",
          "$212.74",
          "$109.66",
          "$103.08",
        ],
        [
          "19 May, 2018",
          "West",
          "Stationery",
          "Binding Supplies",
          "Venus Powell",
          "$611.71",
          "$173.16",
          "$438.55",
        ],
        [
          "17 May, 2018",
          "Central",
          "Furniture",
          "Office Chairs",
          "Steven Roelie",
          "$696.47",
          "$210.78",
          "$485.69",
        ],
        [
          "16 May, 2018",
          "East",
          "Grocery",
          "Fruits and Vegetables",
          "Rozario Diego",
          "$3509.03",
          "$1047.01",
          "$2462.02",
        ],
        [
          "14 May, 2018",
          "East",
          "Grocery",
          "Fruits and Vegetables",
          "Steven Roelie",
          "$3612.79",
          "$1295.86",
          "$2316.93",
        ],
        [
          "12 May, 2018",
          "West",
          "Grocery",
          "Fruits and Vegetables",
          "Grace Kelly",
          "$331.23",
          "$138.09",
          "$193.14",
        ],
      ],
    },
    "Customer Data": {
      columns: [
        "Customer ID",
        "Name",
        "Email",
        "Country",
        "Signup Date",
        "Status",
      ],
      rows: [
        [
          "CUST-001",
          "John Smith",
          "john.smith@example.com",
          "USA",
          "2023-03-12",
          "Active",
        ],
        [
          "CUST-002",
          "Emma Wilson",
          "emma.wilson@example.com",
          "UK",
          "2023-04-18",
          "Active",
        ],
        [
          "CUST-003",
          "Yuki Tanaka",
          "yuki.tanaka@example.com",
          "Japan",
          "2023-05-22",
          "Active",
        ],
        [
          "CUST-004",
          "Michael Brown",
          "michael.brown@example.com",
          "Canada",
          "2023-06-08",
          "Active",
        ],
        [
          "CUST-005",
          "Sophie Martin",
          "sophie.martin@example.com",
          "France",
          "2023-07-15",
          "Active",
        ],
        [
          "CUST-006",
          "Li Wei",
          "li.wei@example.com",
          "China",
          "2023-08-03",
          "Active",
        ],
        [
          "CUST-007",
          "Carlos Rodriguez",
          "carlos.rodriguez@example.com",
          "Spain",
          "2023-09-11",
          "Inactive",
        ],
        [
          "CUST-008",
          "Anna Schmidt",
          "anna.schmidt@example.com",
          "Germany",
          "2023-10-20",
          "Active",
        ],
        [
          "CUST-009",
          "Raj Patel",
          "raj.patel@example.com",
          "India",
          "2023-11-14",
          "Active",
        ],
        [
          "CUST-010",
          "Maria Garcia",
          "maria.garcia@example.com",
          "Mexico",
          "2023-12-01",
          "Active",
        ],
      ],
    },
    "Product Inventory": {
      columns: [
        "SKU",
        "Product Name",
        "Category",
        "Stock",
        "Price",
        "Supplier",
      ],
      rows: [
        [
          "SKU-001",
          "Widget Pro",
          "Electronics",
          "245",
          "$399.99",
          "TechCorp Inc",
        ],
        [
          "SKU-002",
          "Widget Plus",
          "Electronics",
          "189",
          "$299.99",
          "TechCorp Inc",
        ],
        [
          "SKU-003",
          "Widget Basic",
          "Electronics",
          "432",
          "$199.99",
          "TechCorp Inc",
        ],
        [
          "SKU-004",
          "Widget Elite",
          "Electronics",
          "87",
          "$599.99",
          "Premium Tech",
        ],
        [
          "SKU-005",
          "Gadget Pro",
          "Accessories",
          "356",
          "$49.99",
          "AccessCo",
        ],
        [
          "SKU-006",
          "Gadget Plus",
          "Accessories",
          "278",
          "$39.99",
          "AccessCo",
        ],
        [
          "SKU-007",
          "Cable Type-C",
          "Accessories",
          "1234",
          "$12.99",
          "CableMart",
        ],
        [
          "SKU-008",
          "Cable USB-A",
          "Accessories",
          "987",
          "$9.99",
          "CableMart",
        ],
        [
          "SKU-009",
          "Adapter Set",
          "Accessories",
          "456",
          "$24.99",
          "AccessCo",
        ],
        [
          "SKU-010",
          "Screen Protector",
          "Accessories",
          "678",
          "$14.99",
          "ProtectPlus",
        ],
      ],
    },
  };

  if (!dataSource) {
    onNavigate("workspace");
    return null;
  }

  const data =
    sampleData[dataSource.name as keyof typeof sampleData] ||
    sampleData["Sales Data"];

  // Operation name mapping
  const operationNames: Record<string, string> = {
    "remove-duplicates": "Remove Duplicate Rows",
    "trim-whitespace": "Trim Whitespace",
    "remove-empty": "Remove Empty Rows",
    "fix-case": "Standardize Case",
    "remove-special": "Remove Special Characters",
    "fill-missing": "Fill Missing Values",
    "split-column": "Split Column",
    "merge-columns": "Merge Columns",
    "pivot-table": "Pivot Table",
    "unpivot-table": "Unpivot Table",
    "sort-data": "Sort Data",
    "filter-rows": "Filter Rows",
    "add-column": "Add Calculated Column",
    aggregate: "Aggregate Data",
    percentage: "Calculate Percentage",
    "running-total": "Running Total",
    "date-diff": "Date Difference",
    "conditional-calc": "Conditional Calculation",
    "check-duplicates": "Check for Duplicates",
    "find-missing": "Find Missing Values",
    "validate-format": "Validate Data Format",
    outliers: "Detect Outliers",
    "data-quality": "Data Quality Score",
    consistency: "Check Consistency",
    "descriptive-stats": "Descriptive Statistics",
  };

  // Simulate data processing
  const handleProcessData = async (
    operation: string,
    data: any,
  ) => {
    const { operations: selectedOperations, configs } = data;
    setShowProcessingModal(false);
    setIsProcessing(true);
    setProcessingProgress(0);

    const results: any[] = [];
    const totalOperations = selectedOperations.length;

    for (let i = 0; i < selectedOperations.length; i++) {
      const opId = selectedOperations[i];
      const opName = operationNames[opId] || opId;
      const opConfig = configs[opId];

      setCurrentOperation(opName);

      // Simulate processing time
      for (let progress = 0; progress <= 100; progress += 20) {
        setProcessingProgress(
          Math.floor(
            (i / totalOperations) * 100 +
              progress / totalOperations,
          ),
        );
        await new Promise((resolve) =>
          setTimeout(resolve, 200),
        );
      }

      // Generate mock results based on operation
      const result = generateMockResult(opId, opName, opConfig);
      results.push(result);
    }

    setProcessingProgress(100);
    await new Promise((resolve) => setTimeout(resolve, 500));

    setProcessingResults(results);
    setIsProcessing(false);
    setShowResults(true);
  };

  // Generate mock results for different operations
  const generateMockResult = (
    operationId: string,
    operationName: string,
    config?: any,
  ) => {
    const totalRows = data.rows.length;
    const selectedColumns = config?.columns || [];
    const columnsList =
      selectedColumns.length > 0
        ? selectedColumns.join(", ")
        : "all columns";

    const resultTemplates: Record<string, any> = {
      "remove-duplicates": {
        operation: operationId,
        operationName,
        status: "success",
        rowsAffected: 0,
        details:
          "Found and removed 0 duplicate rows based on all column values",
        metrics: [
          {
            label: "Total Rows",
            before: totalRows,
            after: totalRows - 0,
          },
          {
            label: "Duplicates Found",
            before: "0",
            after: "0",
          },
        ],
      },
      "trim-whitespace": {
        operation: operationId,
        operationName,
        status: "success",
        rowsAffected: 8,
        details:
          "Removed leading and trailing spaces from 8 rows across all text columns",
        metrics: [
          { label: "Cells Cleaned", before: "45", after: "0" },
        ],
      },
      "remove-empty": {
        operation: operationId,
        operationName,
        status: "success",
        rowsAffected: 0,
        details: "No empty rows detected in the dataset",
        metrics: [
          { label: "Empty Rows", before: "0", after: "0" },
        ],
      },
      "fix-case": {
        operation: operationId,
        operationName,
        status: "success",
        rowsAffected: totalRows,
        details:
          "Standardized text case to Title Case for all text columns",
        metrics: [
          {
            label: "Columns Affected",
            before: "5",
            after: "5",
          },
        ],
      },
      "fill-missing": {
        operation: operationId,
        operationName,
        status: "success",
        rowsAffected: 5,
        details:
          "Filled 5 missing values with appropriate defaults",
        metrics: [
          { label: "Missing Values", before: "5", after: "0" },
        ],
      },
      "split-column": {
        operation: operationId,
        operationName,
        status: "success",
        rowsAffected: totalRows,
        details:
          'Split "Customer Name" column into "First Name" and "Last Name"',
        metrics: [
          {
            label: "Columns",
            before: data.columns.length,
            after: data.columns.length + 1,
          },
        ],
      },
      "sort-data": {
        operation: operationId,
        operationName,
        status: "success",
        rowsAffected: totalRows,
        details:
          "Sorted data by Date column in descending order",
        metrics: [],
      },
      "add-column": {
        operation: operationId,
        operationName,
        status: "success",
        rowsAffected: totalRows,
        details: config?.newColumnName
          ? `Added calculated column "${config.newColumnName}" using ${config.calculationType} operation on columns: ${columnsList}`
          : `Added calculated column "Profit Margin %" based on Profit/Sales formula`,
        metrics: [
          {
            label: "New Column",
            before: "N/A",
            after: config?.newColumnName || "Profit Margin %",
          },
          {
            label: "Calculation Type",
            before: "N/A",
            after: config?.calculationType || "divide",
          },
          {
            label: "Source Columns",
            before: "N/A",
            after:
              selectedColumns.length > 0
                ? selectedColumns.length.toString()
                : "2",
          },
        ],
      },
      "percentage-change": {
        operation: operationId,
        operationName,
        status: "success",
        rowsAffected: totalRows,
        details: config?.newColumnName
          ? `Added percentage change column "${config.newColumnName}" calculating change from ${config.baseColumn} to ${config.compareColumn}`
          : `Added percentage change column calculating growth rate`,
        metrics: [
          {
            label: "New Column",
            before: "N/A",
            after: config?.newColumnName || "Percentage Change",
          },
          {
            label: "Base Column",
            before: "N/A",
            after: config?.baseColumn || "Base",
          },
          {
            label: "Compare Column",
            before: "N/A",
            after: config?.compareColumn || "Current",
          },
        ],
      },
      "check-duplicates": {
        operation: operationId,
        operationName,
        status: "warning",
        rowsAffected: 3,
        details:
          "Found 3 potential duplicate records. Review recommended.",
        metrics: [
          {
            label: "Duplicate Groups",
            before: "0",
            after: "3",
          },
        ],
      },
      "validate-format": {
        operation: operationId,
        operationName,
        status: "success",
        rowsAffected: 0,
        details:
          "All data formats are valid. No issues detected.",
        metrics: [
          { label: "Format Errors", before: "0", after: "0" },
        ],
      },
      "data-quality": {
        operation: operationId,
        operationName,
        status: "success",
        rowsAffected: totalRows,
        details:
          "Data quality score: 94/100. Excellent data quality!",
        metrics: [
          {
            label: "Quality Score",
            before: "N/A",
            after: "94/100",
          },
          {
            label: "Completeness",
            before: "N/A",
            after: "98%",
          },
          { label: "Accuracy", before: "N/A", after: "96%" },
        ],
      },
      "descriptive-stats": {
        operation: operationId,
        operationName,
        status: "success",
        rowsAffected: 0,
        details: selectedColumns.length > 0
          ? `Calculated descriptive statistics for ${selectedColumns.length} column(s): ${columnsList}`
          : "Calculated descriptive statistics for numeric columns",
        columns: selectedColumns.length > 0 ? selectedColumns : ["Sales", "Profit", "Cost"],
        statsData: selectedColumns.length > 0 
          ? selectedColumns.reduce((acc: any, col: string) => {
              acc[col] = {
                "Mean": "$2,847.32",
                "Median": "$2,490.40",
                "Mode": "$3,002.46",
                "Std Deviation": "$1,456.78",
                "Min Value": "$58.25",
                "Max Value": "$5,118.45",
              };
              return acc;
            }, {})
          : {
              "Sales": {
                "Mean": "$2,847.32",
                "Median": "$2,490.40",
                "Mode": "$3,002.46",
                "Std Deviation": "$1,456.78",
                "Min Value": "$58.25",
                "Max Value": "$5,118.45",
              },
              "Profit": {
                "Mean": "$1,523.15",
                "Median": "$1,100.50",
                "Mode": "$2,030.02",
                "Std Deviation": "$845.23",
                "Min Value": "$30.14",
                "Max Value": "$2,490.40",
              },
              "Cost": {
                "Mean": "$1,324.17",
                "Median": "$1,005.89",
                "Mode": "$972.44",
                "Std Deviation": "$611.55",
                "Min Value": "$28.11",
                "Max Value": "$3,476.62",
              },
            },
        metrics: [
          {
            label: "Mean",
            before: "N/A",
            after: "$2,847.32",
          },
          {
            label: "Median",
            before: "N/A",
            after: "$2,490.40",
          },
          {
            label: "Mode",
            before: "N/A",
            after: "$3,002.46",
          },
          {
            label: "Std Deviation",
            before: "N/A",
            after: "$1,456.78",
          },
          {
            label: "Min Value",
            before: "N/A",
            after: "$58.25",
          },
          {
            label: "Max Value",
            before: "N/A",
            after: "$5,118.45",
          },
        ],
      },
    };

    // Return specific result or a generic success message
    return (
      resultTemplates[operationId] || {
        operation: operationId,
        operationName,
        status: "success",
        rowsAffected: Math.floor(Math.random() * totalRows),
        details: `Successfully applied ${operationName} to the dataset`,
        metrics: [],
      }
    );
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
                onClick={() => onNavigate("workspace")}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
              <div>
                <h2 className="text-gray-900 dark:text-white">
                  {dataSource.name}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Updated {dataSource.lastUpdated}
                </p>
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
                  onChange={(e) =>
                    setAutoSave(e.target.checked)
                  }
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Auto-save
                </span>
              </label>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-2">
              {onToggleDarkMode && (
                <button
                  onClick={() => onToggleDarkMode(!darkMode)}
                  className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  {darkMode ? (
                    <Sun className="w-5 h-5" />
                  ) : (
                    <Moon className="w-5 h-5" />
                  )}
                </button>
              )}
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
      </nav>

      {/* Toolbar */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 lg:px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button className="px-3 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 flex items-center space-x-2 transition-colors">
              <Upload className="w-4 h-4" />
              <span>Import</span>
            </button>
            <button className="px-3 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 flex items-center space-x-2 transition-colors">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
            <button className="px-3 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 flex items-center space-x-2 transition-colors">
              <ArrowUpDown className="w-4 h-4" />
              <span>Sort</span>
            </button>

            {/* Divider */}
            <div className="h-8 w-px bg-gray-300 dark:bg-gray-600 mx-1"></div>

            {/* Important Action Buttons */}
            <button className="px-4 py-2 text-sm bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg flex items-center space-x-2 transition-all shadow-md hover:shadow-lg">
              <Plus className="w-4 h-4" />
              <span>Add</span>
            </button>
            <button className="px-4 py-2 text-sm bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white rounded-lg flex items-center space-x-2 transition-all shadow-md hover:shadow-lg">
              <Trash2 className="w-4 h-4" />
              <span>Delete</span>
            </button>
            <button
              className="px-4 py-2 text-sm bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg flex items-center space-x-2 transition-all shadow-md hover:shadow-lg"
              onClick={() => setShowProcessingModal(true)}
            >
              <Settings className="w-4 h-4" />
              <span>Processing Data</span>
            </button>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search data..."
              className="w-64 lg:w-80 pl-10 pr-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-900 p-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 sticky top-0 z-10">
                <tr>
                  <th className="px-4 py-3 text-left text-xs text-gray-600 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700 w-16">
                    #
                  </th>
                  {data.columns.map((column, index) => (
                    <th
                      key={index}
                      className="px-4 py-3 text-left text-xs text-gray-600 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors group"
                    >
                      <div className="flex items-center space-x-1">
                        <span className="group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {column}
                        </span>
                        <div className="flex flex-col opacity-50 group-hover:opacity-100 transition-opacity">
                          <ChevronUp className="w-3 h-3 -mb-1 text-gray-400" />
                          <ChevronDown className="w-3 h-3 text-gray-400" />
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800">
                {data.rows.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className="hover:bg-blue-50 dark:hover:bg-blue-950/20 transition-colors border-b border-gray-100 dark:border-gray-700/50 group"
                  >
                    <td className="px-4 py-3.5 text-xs text-gray-500 dark:text-gray-400 border-r border-gray-100 dark:border-gray-700/50">
                      {rowIndex + 1}
                    </td>
                    {row.map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        className="px-4 py-3.5 text-sm text-gray-900 dark:text-gray-200"
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Data Processing Modal */}
      {showProcessingModal && (
        <DataProcessingModal
          onClose={() => setShowProcessingModal(false)}
          onProcess={handleProcessData}
          darkMode={darkMode}
          columns={data.columns}
        />
      )}

      {/* Data Processing Loader */}
      {isProcessing && (
        <DataProcessingLoader
          progress={processingProgress}
          currentOperation={currentOperation}
          darkMode={darkMode}
        />
      )}

      {/* Data Processing Results */}
      {showResults && (
        <DataProcessingResults
          results={processingResults}
          onClose={() => setShowResults(false)}
          darkMode={darkMode}
          totalRows={data.rows.length}
        />
      )}

      {/* Save/Export Modal */}
      {showSaveModal && (
        <SaveExportModal
          isOpen={true}
          type="save"
          context="dataset"
          onClose={() => setShowSaveModal(false)}
          onConfirm={(name, description) => {
            console.log('Saving dataset:', name, description);
            setShowSaveModal(false);
          }}
        />
      )}

      {showExportModal && (
        <SaveExportModal
          isOpen={true}
          type="export"
          context="dataset"
          simpleExport={true}
          onClose={() => setShowExportModal(false)}
          onConfirm={(name, description, format) => {
            console.log('Exporting dataset as:', format);
            setShowExportModal(false);
          }}
        />
      )}
    </div>
  );
}