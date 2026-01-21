import { useState } from 'react';
import { X, Mail, Link2, Code, Plus, Download, MessageSquare, Clock, User } from 'lucide-react';

interface ShareExportModalProps {
  onClose: () => void;
}

export default function ShareExportModal({ onClose }: ShareExportModalProps) {
  const [activeTab, setActiveTab] = useState<'email' | 'link' | 'embed'>('email');
  const [recipients, setRecipients] = useState<Array<{ email: string; access: string }>>([
    { email: 'john.doe@example.com', access: 'view' },
    { email: 'jane.smith@example.com', access: 'edit' },
  ]);

  const comments = [
    { id: 1, user: 'John Doe', action: 'shared this report', time: '2 hours ago', avatar: 'JD' },
    { id: 2, user: 'Jane Smith', action: 'exported as PDF', time: '1 day ago', avatar: 'JS' },
    { id: 3, user: 'Mike Johnson', action: 'commented', message: 'Great visualization!', time: '2 days ago', avatar: 'MJ' },
  ];

  const exportHistory = [
    { id: 1, format: 'PDF', date: 'Nov 28, 2025 10:30 AM', size: '2.4 MB' },
    { id: 2, format: 'Excel', date: 'Nov 27, 2025 3:15 PM', size: '1.8 MB' },
    { id: 3, format: 'CSV', date: 'Nov 26, 2025 9:45 AM', size: '890 KB' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h2 className="text-gray-900 dark:text-white">Share & Export</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        {/* Tabs */}
        <div className="px-6 border-b border-gray-200 dark:border-gray-700 flex space-x-1">
          <button
            onClick={() => setActiveTab('email')}
            className={`px-4 py-3 border-b-2 transition-colors ${
              activeTab === 'email'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300'
            }`}
          >
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4" />
              <span>Email</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('link')}
            className={`px-4 py-3 border-b-2 transition-colors ${
              activeTab === 'link'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300'
            }`}
          >
            <div className="flex items-center space-x-2">
              <Link2 className="w-4 h-4" />
              <span>Link</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('embed')}
            className={`px-4 py-3 border-b-2 transition-colors ${
              activeTab === 'embed'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300'
            }`}
          >
            <div className="flex items-center space-x-2">
              <Code className="w-4 h-4" />
              <span>Embed</span>
            </div>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="p-6">
            {/* Email Tab */}
            {activeTab === 'email' && (
              <div className="space-y-6">
                {/* Add Recipients */}
                <div>
                  <label className="text-sm text-gray-600 dark:text-gray-400 mb-2 block">Add Recipients</label>
                  <div className="flex space-x-2">
                    <input
                      type="email"
                      placeholder="Enter email address"
                      className="flex-1 px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                    />
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                      <Plus className="w-4 h-4" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>

                {/* Recipients List */}
                <div>
                  <label className="text-sm text-gray-600 dark:text-gray-400 mb-2 block">Recipients</label>
                  <div className="space-y-2">
                    {recipients.map((recipient, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm">
                            {recipient.email[0].toUpperCase()}
                          </div>
                          <span className="text-gray-900 dark:text-white">{recipient.email}</span>
                        </div>
                        <select
                          value={recipient.access}
                          onChange={(e) => {
                            const newRecipients = [...recipients];
                            newRecipients[index].access = e.target.value;
                            setRecipients(newRecipients);
                          }}
                          className="px-3 py-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                        >
                          <option value="view">Can View</option>
                          <option value="edit">Can Edit</option>
                        </select>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="text-sm text-gray-600 dark:text-gray-400 mb-2 block">Message (Optional)</label>
                  <textarea
                    placeholder="Add a message to recipients..."
                    rows={3}
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white resize-none"
                  ></textarea>
                </div>

                {/* Send Button */}
                <button className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md flex items-center justify-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>Send Email</span>
                </button>
              </div>
            )}

            {/* Link Tab */}
            {activeTab === 'link' && (
              <div className="space-y-6">
                {/* Link Settings */}
                <div>
                  <label className="text-sm text-gray-600 dark:text-gray-400 mb-2 block">Access Level</label>
                  <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white">
                    <option>Anyone with the link can view</option>
                    <option>Anyone with the link can edit</option>
                    <option>Only invited people</option>
                  </select>
                </div>

                {/* Generated Link */}
                <div>
                  <label className="text-sm text-gray-600 dark:text-gray-400 mb-2 block">Share Link</label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value="https://vizly.app/share/q4-sales-report-abc123"
                      readOnly
                      className="flex-1 px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none text-gray-900 dark:text-white"
                    />
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Copy
                    </button>
                  </div>
                </div>

                {/* Link Options */}
                <div className="space-y-3">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                    <span className="text-gray-700 dark:text-gray-300">Require password</span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                    <span className="text-gray-700 dark:text-gray-300">Set expiration date</span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded text-blue-600 focus:ring-blue-500" />
                    <span className="text-gray-700 dark:text-gray-300">Allow download</span>
                  </label>
                </div>

                {/* Export Formats */}
                <div>
                  <label className="text-sm text-gray-600 dark:text-gray-400 mb-3 block flex items-center space-x-2">
                    <Download className="w-4 h-4" />
                    <span>Export Format</span>
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    <button className="px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 transition-colors text-gray-900 dark:text-white">
                      PDF
                    </button>
                    <button className="px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 transition-colors text-gray-900 dark:text-white">
                      Excel
                    </button>
                    <button className="px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 transition-colors text-gray-900 dark:text-white">
                      CSV
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Embed Tab */}
            {activeTab === 'embed' && (
              <div className="space-y-6">
                {/* Embed Options */}
                <div>
                  <label className="text-sm text-gray-600 dark:text-gray-400 mb-2 block">Embed Size</label>
                  <div className="grid grid-cols-3 gap-3">
                    <button className="px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 transition-colors text-gray-900 dark:text-white">
                      Small
                    </button>
                    <button className="px-4 py-2 bg-blue-600 border border-blue-600 rounded-lg text-white">
                      Medium
                    </button>
                    <button className="px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 transition-colors text-gray-900 dark:text-white">
                      Large
                    </button>
                  </div>
                </div>

                {/* Custom Dimensions */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-600 dark:text-gray-400 mb-2 block">Width</label>
                    <input
                      type="text"
                      value="800px"
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 dark:text-gray-400 mb-2 block">Height</label>
                    <input
                      type="text"
                      value="600px"
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                {/* Embed Code */}
                <div>
                  <label className="text-sm text-gray-600 dark:text-gray-400 mb-2 block">Embed Code</label>
                  <div className="relative">
                    <textarea
                      readOnly
                      value={`<iframe src="https://vizly.app/embed/q4-sales-report" width="800" height="600" frameborder="0"></iframe>`}
                      rows={4}
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none text-gray-900 dark:text-white font-mono text-sm resize-none"
                    ></textarea>
                    <button className="absolute top-2 right-2 px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors">
                      Copy
                    </button>
                  </div>
                </div>

                {/* Preview */}
                <div>
                  <label className="text-sm text-gray-600 dark:text-gray-400 mb-2 block">Preview</label>
                  <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                    <div className="bg-white dark:bg-gray-800 rounded shadow-sm p-4 h-48 flex items-center justify-center">
                      <p className="text-gray-500 dark:text-gray-400">Embedded report preview</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Comments & Activity Section */}
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                <MessageSquare className="w-5 h-5" />
                <span>Activity & Comments</span>
              </h3>
              <div className="space-y-3">
                {comments.map((comment) => (
                  <div key={comment.id} className="flex space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm flex-shrink-0">
                      {comment.avatar}
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-900 dark:text-white">
                        <span>{comment.user}</span>{' '}
                        <span className="text-gray-600 dark:text-gray-400">{comment.action}</span>
                      </p>
                      {comment.message && (
                        <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{comment.message}</p>
                      )}
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{comment.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Export History */}
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>Export History</span>
              </h3>
              <div className="space-y-2">
                {exportHistory.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700"
                  >
                    <div>
                      <p className="text-gray-900 dark:text-white">{item.format}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{item.date}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-sm text-gray-500 dark:text-gray-400">{item.size}</span>
                      <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors">
                        <Download className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}