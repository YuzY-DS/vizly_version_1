import { useState } from "react";
import {
  X,
  Globe,
  Lock,
  Eye,
  Tag,
  FileText,
  Upload,
  Check,
  AlertCircle,
  Sparkles,
} from "lucide-react";

interface PublishWorkspaceModalProps {
  onClose: () => void;
  workspace: any;
  darkMode: boolean;
  userPlan?: 'normal' | 'pro';
}

const categories = [
  "Sales",
  "Marketing",
  "Finance",
  "HR",
  "E-commerce",
  "Support",
  "Product",
  "Operations",
  "Analytics",
  "Custom",
];

const visibilityOptions = [
  {
    id: "public",
    name: "Public",
    description: "Anyone can view and clone this workspace",
    icon: Globe,
    isPro: false,
  },
  {
    id: "unlisted",
    name: "Unlisted",
    description: "Only people with the link can access",
    icon: Eye,
    isPro: true,
  },
  {
    id: "private",
    name: "Private",
    description: "Only you can access this workspace",
    icon: Lock,
    isPro: false,
  },
];

export default function PublishWorkspaceModal({
  onClose,
  workspace,
  darkMode,
  userPlan = 'normal',
}: PublishWorkspaceModalProps) {
  const [title, setTitle] = useState(workspace?.name || "");
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [visibility, setVisibility] = useState("public");
  const [allowComments, setAllowComments] = useState(true);
  const [allowCloning, setAllowCloning] = useState(true);
  const [step, setStep] = useState<"details" | "preview" | "success">("details");

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim()) && tags.length < 10) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handlePublish = () => {
    // Simulate publishing
    setStep("success");
    setTimeout(() => {
      onClose();
    }, 3000);
  };

  const canPublish = title.trim() && description.trim() && selectedCategory && tags.length > 0;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between flex-shrink-0">
          <div>
            <h2 className="text-2xl dark:text-white">
              {step === "details" && "Publish to Community"}
              {step === "preview" && "Preview & Publish"}
              {step === "success" && "Successfully Published!"}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {step === "details" && "Share your workspace with the Vizly community"}
              {step === "preview" && "Review your workspace before publishing"}
              {step === "success" && "Your workspace is now live in the community"}
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
        <div className="flex-1 overflow-y-auto p-6">
          {step === "details" && (
            <div className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm mb-2 dark:text-gray-200">
                  Workspace Title *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Sales Analytics Dashboard"
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none dark:text-white"
                  maxLength={100}
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {title.length}/100 characters
                </p>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm mb-2 dark:text-gray-200">
                  Description *
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe what your workspace does and what insights it provides..."
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none dark:text-white resize-none"
                  rows={4}
                  maxLength={500}
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {description.length}/500 characters
                </p>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm mb-2 dark:text-gray-200">
                  Category *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-3 rounded-lg border-2 transition-all ${
                        selectedCategory === category
                          ? "border-purple-600 bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
                          : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 dark:text-gray-300"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm mb-2 dark:text-gray-200">
                  Tags * (Add up to 10)
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleAddTag()}
                    placeholder="e.g., analytics, revenue, metrics"
                    className="flex-1 px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none dark:text-white"
                    disabled={tags.length >= 10}
                  />
                  <button
                    onClick={handleAddTag}
                    disabled={!tagInput.trim() || tags.length >= 10}
                    className="px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Add
                  </button>
                </div>
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-sm flex items-center gap-2"
                      >
                        <Tag className="w-3 h-3" />
                        {tag}
                        <button
                          onClick={() => handleRemoveTag(tag)}
                          className="hover:text-purple-800 dark:hover:text-purple-200"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  {tags.length}/10 tags added
                </p>
              </div>

              {/* Visibility */}
              <div>
                <label className="block text-sm mb-3 dark:text-gray-200">
                  Visibility
                </label>
                <div className="space-y-3">
                  {visibilityOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => {
                        if (option.isPro && userPlan !== 'pro') {
                          alert('This feature is only available for Pro users');
                          return;
                        }
                        setVisibility(option.id);
                      }}
                      className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                        visibility === option.id
                          ? "border-purple-600 bg-purple-50 dark:bg-purple-900/30"
                          : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <option.icon
                          className={`w-5 h-5 mt-0.5 ${
                            visibility === option.id
                              ? "text-purple-600 dark:text-purple-400"
                              : "text-gray-600 dark:text-gray-400"
                          }`}
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={visibility === option.id ? "dark:text-white" : "dark:text-gray-300"}>
                              {option.name}
                            </span>
                            {option.isPro && (
                              <span className="px-2 py-0.5 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full text-xs flex items-center gap-1">
                                <Sparkles className="w-2 h-2" />
                                Pro
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {option.description}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Additional Settings */}
              <div>
                <label className="block text-sm mb-3 dark:text-gray-200">
                  Additional Settings
                </label>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer">
                    <input
                      type="checkbox"
                      checked={allowComments}
                      onChange={(e) => setAllowComments(e.target.checked)}
                      className="w-5 h-5 text-purple-600 rounded focus:ring-2 focus:ring-purple-500"
                    />
                    <div>
                      <p className="dark:text-white">Allow Comments</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Let users leave feedback and questions
                      </p>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer">
                    <input
                      type="checkbox"
                      checked={allowCloning}
                      onChange={(e) => setAllowCloning(e.target.checked)}
                      className="w-5 h-5 text-purple-600 rounded focus:ring-2 focus:ring-purple-500"
                    />
                    <div>
                      <p className="dark:text-white">Allow Cloning</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Allow users to clone this workspace to their account
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Info Box */}
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 flex gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-800 dark:text-blue-300">
                  <p className="mb-1">Before publishing:</p>
                  <ul className="list-disc list-inside space-y-1 text-blue-700 dark:text-blue-400">
                    <li>Ensure your workspace doesn't contain sensitive data</li>
                    <li>Double-check that all charts and visualizations work correctly</li>
                    <li>Review your workspace name and description for clarity</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {step === "preview" && (
            <div className="space-y-6">
              {/* Preview Card */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 border border-gray-200 dark:border-gray-600">
                <h3 className="text-lg mb-4 dark:text-white">How it will appear in Community</h3>
                
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-4xl">📊</div>
                    <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-xs">
                      {selectedCategory}
                    </span>
                  </div>

                  <h3 className="mb-2 dark:text-white">{title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {description}
                  </p>

                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-xs">
                      JD
                    </div>
                    <div>
                      <p className="text-sm dark:text-gray-200">John Doe</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Just now</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      0
                    </span>
                    <span className="flex items-center gap-1">
                      <FileText className="w-4 h-4" />
                      0
                    </span>
                  </div>
                </div>
              </div>

              {/* Details Summary */}
              <div className="space-y-4">
                <div className="flex items-start justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Visibility</p>
                    <p className="dark:text-white capitalize">{visibility}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Settings</p>
                    <div className="flex gap-2">
                      {allowComments && (
                        <span className="text-xs px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded">
                          Comments
                        </span>
                      )}
                      {allowCloning && (
                        <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded">
                          Cloning
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === "success" && (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-2xl mb-3 dark:text-white">Workspace Published!</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Your workspace is now available in the community for others to discover and clone.
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg">
                <Globe className="w-5 h-5" />
                View in Community
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {step !== "success" && (
          <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between flex-shrink-0">
            <button
              onClick={() => {
                if (step === "preview") {
                  setStep("details");
                } else {
                  onClose();
                }
              }}
              className="px-6 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              {step === "preview" ? "Back" : "Cancel"}
            </button>
            <button
              onClick={() => {
                if (step === "details") {
                  setStep("preview");
                } else {
                  handlePublish();
                }
              }}
              disabled={!canPublish}
              className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {step === "details" ? (
                <>
                  Preview
                  <Eye className="w-4 h-4" />
                </>
              ) : (
                <>
                  Publish
                  <Upload className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
