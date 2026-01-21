import { X, Download, FileText, Database, Calendar, Hash, Plus, Filter, ArrowUpDown, MoreHorizontal, Share2, Mail, Upload, Cloud, MessageSquare, Edit3, Search, ChevronUp, ChevronDown } from 'lucide-react';

interface DataPreviewModalProps {
  dataSource: {
    id: number;
    name: string;
    type: string;
    rows: string;
    lastUpdated: string;
    icon: any;
    color: string;
  };
  onClose: () => void;
  darkMode: boolean;
}

export default function DataPreviewModal({ dataSource, onClose, darkMode }: DataPreviewModalProps) {
  // Mock data - in a real app, this would be fetched based on the data source
  const sampleData = {
    'Sales Data': {
      columns: ['Date', 'Region', 'Product Category', 'Product', 'Customer Name', 'Sales', 'Cost', 'Profit'],
      rows: [
        ['04 Jun, 2018', 'East', 'Grocery', 'Fruits and Vegetables', 'Pete Zachriah', '$3002.46', '$972.44', '$2030.02'],
        ['02 Jun, 2018', 'East', 'Grocery', 'Fruits and Vegetables', 'Santa Cruz Clara', '$2875.25', '$1005.89', '$1869.36'],
        ['02 Jun, 2018', 'Central', 'Stationery', 'Specialty Envelopes', 'John Britto', '$3882.65', '$1392.25', '$2490.4'],
        ['29 May, 2018', 'West', 'Stationery', 'Scissors', 'Rozario Diego', '$986.38', '$569.35', '$417.03'],
        ['29 May, 2018', 'East', 'Stationery', 'Standard Labels', 'Neil Seth', '$58.25', '$28.11', '$30.14'],
        ['28 May, 2018', 'East', 'Stationery', 'Binder Clips', 'Thomas Mondrake', '$189.03', '$79.82', '$109.21'],
        ['28 May, 2018', 'West', 'Grocery', 'Fruits and Vegetables', 'Rick Reed', '$360.78', '$164.12', '$196.66'],
        ['23 May, 2018', 'West', 'Grocery', 'Fruits and Vegetables', 'Catherine Rose', '$1977.77', '$1228.05', '$749.72'],
        ['20 May, 2018', 'East', 'Grocery', 'Fruits and Vegetables', 'Leena Mary', '$5118.45', '$3476.62', '$1641.83'],
        ['19 May, 2018', 'East', 'Stationery', 'Computer Paper', 'John Britto', '$212.74', '$109.66', '$103.08'],
        ['19 May, 2018', 'West', 'Stationery', 'Binding Supplies', 'Venus Powell', '$611.71', '$173.16', '$438.55'],
        ['17 May, 2018', 'Central', 'Furniture', 'Office Chairs', 'Steven Roelie', '$696.47', '$210.78', '$485.69'],
        ['16 May, 2018', 'East', 'Grocery', 'Fruits and Vegetables', 'Rozario Diego', '$3509.03', '$1047.01', '$2462.02'],
        ['14 May, 2018', 'East', 'Grocery', 'Fruits and Vegetables', 'Steven Roelie', '$3612.79', '$1295.86', '$2316.93'],
        ['12 May, 2018', 'West', 'Grocery', 'Fruits and Vegetables', 'Grace Kelly', '$331.23', '$138.09', '$193.14'],
      ]
    },
    'Customer Data': {
      columns: ['Customer ID', 'Name', 'Email', 'Country', 'Signup Date', 'Status'],
      rows: [
        ['CUST-001', 'John Smith', 'john.smith@example.com', 'USA', '2023-03-12', 'Active'],
        ['CUST-002', 'Emma Wilson', 'emma.wilson@example.com', 'UK', '2023-04-18', 'Active'],
        ['CUST-003', 'Yuki Tanaka', 'yuki.tanaka@example.com', 'Japan', '2023-05-22', 'Active'],
        ['CUST-004', 'Michael Brown', 'michael.brown@example.com', 'Canada', '2023-06-08', 'Active'],
        ['CUST-005', 'Sophie Martin', 'sophie.martin@example.com', 'France', '2023-07-15', 'Active'],
        ['CUST-006', 'Li Wei', 'li.wei@example.com', 'China', '2023-08-03', 'Active'],
        ['CUST-007', 'Carlos Rodriguez', 'carlos.rodriguez@example.com', 'Spain', '2023-09-11', 'Inactive'],
        ['CUST-008', 'Anna Schmidt', 'anna.schmidt@example.com', 'Germany', '2023-10-20', 'Active'],
        ['CUST-009', 'Raj Patel', 'raj.patel@example.com', 'India', '2023-11-14', 'Active'],
        ['CUST-010', 'Maria Garcia', 'maria.garcia@example.com', 'Mexico', '2023-12-01', 'Active'],
      ]
    },
    'Product Inventory': {
      columns: ['SKU', 'Product Name', 'Category', 'Stock', 'Price', 'Supplier'],
      rows: [
        ['SKU-001', 'Widget Pro', 'Electronics', '245', '$399.99', 'TechCorp Inc'],
        ['SKU-002', 'Widget Plus', 'Electronics', '189', '$299.99', 'TechCorp Inc'],
        ['SKU-003', 'Widget Basic', 'Electronics', '432', '$199.99', 'TechCorp Inc'],
        ['SKU-004', 'Widget Elite', 'Electronics', '87', '$599.99', 'Premium Tech'],
        ['SKU-005', 'Gadget Pro', 'Accessories', '356', '$49.99', 'AccessCo'],
        ['SKU-006', 'Gadget Plus', 'Accessories', '278', '$39.99', 'AccessCo'],
        ['SKU-007', 'Cable Type-C', 'Accessories', '1234', '$12.99', 'CableMart'],
        ['SKU-008', 'Cable USB-A', 'Accessories', '987', '$9.99', 'CableMart'],
        ['SKU-009', 'Adapter Set', 'Accessories', '456', '$24.99', 'AccessCo'],
        ['SKU-010', 'Screen Protector', 'Accessories', '678', '$14.99', 'ProtectPlus'],
      ]
    }
  };

  const data = sampleData[dataSource.name as keyof typeof sampleData] || sampleData['Sales Data'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-7xl max-h-[90vh] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Top Header Bar */}
        <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-5 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <div className={`w-10 h-10 ${dataSource.color} rounded-xl flex items-center justify-center`}>
                  <dataSource.icon className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-gray-900 dark:text-white">{dataSource.name}</h1>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 ml-13">
                Table containing all the {dataSource.name.toLowerCase()} records • {dataSource.rows} • Updated {dataSource.lastUpdated}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all shadow-md hover:shadow-lg flex items-center space-x-2">
                <Edit3 className="w-4 h-4" />
                <span>Edit Design</span>
              </button>
              <button className="p-2.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <Plus className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </button>
              <button className="p-2.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <Share2 className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </button>
              <button className="p-2.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <Download className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </button>
              <button 
                onClick={onClose}
                className="p-2.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </button>
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button className="px-4 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 flex items-center space-x-2 transition-all shadow-sm hover:shadow">
                <Upload className="w-4 h-4" />
                <span>Import Data</span>
              </button>
              <button className="px-4 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 flex items-center space-x-2 transition-all shadow-sm hover:shadow">
                <Filter className="w-4 h-4" />
                <span>Filter</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              <button className="px-4 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 flex items-center space-x-2 transition-all shadow-sm hover:shadow">
                <ArrowUpDown className="w-4 h-4" />
                <span>Sort</span>
              </button>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Search data..."
                className="w-72 pl-10 pr-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="flex-1 overflow-auto bg-white dark:bg-gray-800 p-6">
          <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm">
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
                        <span className="group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{column}</span>
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

        {/* Footer */}
        <div className="border-t border-gray-200 dark:border-gray-700 px-6 py-4 bg-gray-50 dark:bg-gray-900/50">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Showing <span className="font-medium text-gray-900 dark:text-white">{data.rows.length}</span> of <span className="font-medium text-gray-900 dark:text-white">{dataSource.rows}</span>
            </p>
            <div className="flex items-center space-x-2">
              <button className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all shadow-sm hover:shadow disabled:opacity-50 disabled:cursor-not-allowed">
                Previous
              </button>
              <div className="flex items-center space-x-1">
                <button className="w-8 h-8 flex items-center justify-center text-sm text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-sm">
                  1
                </button>
                <button className="w-8 h-8 flex items-center justify-center text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  2
                </button>
                <button className="w-8 h-8 flex items-center justify-center text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  3
                </button>
              </div>
              <button className="px-4 py-2 text-sm text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-sm hover:shadow">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}