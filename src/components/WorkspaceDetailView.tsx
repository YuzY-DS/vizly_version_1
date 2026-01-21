import { useState } from "react";
import {
  ArrowLeft,
  Copy,
  Heart,
  Eye,
  MessageSquare,
  Share2,
  Award,
  Sparkles,
  BarChart3,
  PieChart,
  LineChart,
  User,
  Calendar,
  Tag,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Send,
} from "lucide-react";

interface WorkspaceDetailViewProps {
  workspace: any;
  onBack: () => void;
  onClone: (workspace: any) => void;
  onLike: (workspaceId: string) => void;
  isLiked: boolean;
  darkMode: boolean;
  userPlan?: 'normal' | 'pro';
}

// Mock comments data
const mockComments = [
  {
    id: "c1",
    user: {
      name: "Alex Thompson",
      avatar: "AT",
      isPro: true,
    },
    comment: "This is an excellent dashboard! I've cloned it and it's working perfectly for my team.",
    date: "2 days ago",
    likes: 12,
  },
  {
    id: "c2",
    user: {
      name: "Maria Garcia",
      avatar: "MG",
      isPro: false,
    },
    comment: "Love the clean design and the way you organized the metrics. Very helpful!",
    date: "3 days ago",
    likes: 8,
  },
  {
    id: "c3",
    user: {
      name: "John Smith",
      avatar: "JS",
      isPro: true,
    },
    comment: "Could you share more details about the data processing steps you used?",
    date: "5 days ago",
    likes: 5,
  },
];

export default function WorkspaceDetailView({
  workspace,
  onBack,
  onClone,
  onLike,
  isLiked,
  darkMode,
  userPlan = 'normal',
}: WorkspaceDetailViewProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "comments">("overview");
  const [newComment, setNewComment] = useState("");
  const [showAllTags, setShowAllTags] = useState(false);
  const [comments, setComments] = useState(mockComments);

  const handlePostComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: `c${comments.length + 1}`,
        user: {
          name: "John Doe", // Current user
          avatar: "JD",
          isPro: userPlan === 'pro',
        },
        comment: newComment,
        date: "Just now",
        likes: 0,
      };
      setComments([comment, ...comments]);
      setNewComment("");
    }
  };

  const handleShare = () => {
    // Copy link to clipboard
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Community</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors flex items-center gap-2"
              >
                <Share2 className="w-4 h-4" />
                Share
              </button>
              <button
                onClick={() => onLike(workspace.id)}
                className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                  isLiked
                    ? "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                <Heart className={isLiked ? "w-4 h-4 fill-current" : "w-4 h-4"} />
                {workspace.stats.likes + (isLiked ? 1 : 0)}
              </button>
              <button
                onClick={() => onClone(workspace)}
                className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors flex items-center gap-2"
              >
                <Copy className="w-4 h-4" />
                Clone to My Workspace
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Workspace Header */}
        <div className="mb-8">
          <div className="flex items-start gap-6 mb-6">
            <div className="text-6xl">{workspace.thumbnail}</div>
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h1 className="text-3xl mb-2 dark:text-white">{workspace.title}</h1>
                  <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-xs">
                        {workspace.creator.avatar}
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="dark:text-gray-200">{workspace.creator.name}</span>
                        {workspace.creator.verified && (
                          <Award className="w-4 h-4 text-blue-500" />
                        )}
                        {workspace.creator.isPro && (
                          <Sparkles className="w-4 h-4 text-purple-500" />
                        )}
                      </div>
                    </div>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {workspace.publishedDate}
                    </span>
                  </div>
                </div>
                <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-sm">
                  {workspace.category}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {workspace.description}
              </p>

              {/* Stats */}
              <div className="flex items-center gap-6 text-sm">
                <span className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <Eye className="w-4 h-4" />
                  <span className="dark:text-gray-300">{workspace.stats.views.toLocaleString()}</span> views
                </span>
                <span className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <Copy className="w-4 h-4" />
                  <span className="dark:text-gray-300">{workspace.stats.clones}</span> clones
                </span>
                <span className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <MessageSquare className="w-4 h-4" />
                  <span className="dark:text-gray-300">{workspace.stats.comments}</span> comments
                </span>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {(showAllTags ? workspace.tags : workspace.tags.slice(0, 5)).map((tag: string) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full text-sm flex items-center gap-1"
              >
                <Tag className="w-3 h-3" />
                {tag}
              </span>
            ))}
            {workspace.tags.length > 5 && (
              <button
                onClick={() => setShowAllTags(!showAllTags)}
                className="px-3 py-1 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-full text-sm transition-colors"
              >
                {showAllTags ? "Show less" : `+${workspace.tags.length - 5} more`}
              </button>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
          <div className="flex gap-6">
            <button
              onClick={() => setActiveTab("overview")}
              className={`pb-3 px-1 border-b-2 transition-colors ${
                activeTab === "overview"
                  ? "border-purple-600 text-purple-600 dark:border-purple-400 dark:text-purple-400"
                  : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("comments")}
              className={`pb-3 px-1 border-b-2 transition-colors ${
                activeTab === "comments"
                  ? "border-purple-600 text-purple-600 dark:border-purple-400 dark:text-purple-400"
                  : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
              }`}
            >
              Comments ({comments.length})
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "overview" ? (
          <div className="space-y-6">
            {/* Charts Used */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg mb-4 dark:text-white flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                Charts & Visualizations
              </h3>
              <div className="flex flex-wrap gap-3">
                {workspace.charts.map((chart: string) => (
                  <div
                    key={chart}
                    className="px-4 py-2 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-lg flex items-center gap-2"
                  >
                    {chart.includes("Bar") && <BarChart3 className="w-4 h-4" />}
                    {chart.includes("Line") && <LineChart className="w-4 h-4" />}
                    {chart.includes("Pie") && <PieChart className="w-4 h-4" />}
                    {chart}
                  </div>
                ))}
              </div>
            </div>

            {/* Preview Section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg mb-4 dark:text-white">Workspace Preview</h3>
              <div className="aspect-video bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg flex items-center justify-center border-2 border-dashed border-purple-300 dark:border-purple-700">
                <div className="text-center">
                  <div className="text-6xl mb-4">{workspace.thumbnail}</div>
                  <p className="text-gray-600 dark:text-gray-400">Interactive preview coming soon</p>
                </div>
              </div>
            </div>

            {/* About this Workspace */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg mb-4 dark:text-white">About this Workspace</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                {workspace.description}
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                This workspace template is designed to help you quickly get started with {workspace.category.toLowerCase()} analytics. 
                It includes pre-configured charts, customizable metrics, and sample data to demonstrate best practices. 
                Clone it to your workspace and customize it with your own data sources.
              </p>
            </div>

            {/* How to Use */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg mb-4 dark:text-white">How to Use</h3>
              <ol className="space-y-3 text-gray-600 dark:text-gray-400">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center text-sm">1</span>
                  <span>Click the "Clone to My Workspace" button above to add this workspace to your account</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center text-sm">2</span>
                  <span>Connect your own data sources or use the sample data provided</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center text-sm">3</span>
                  <span>Customize the charts, metrics, and layout to fit your needs</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center text-sm">4</span>
                  <span>Share your customized workspace with your team or publish it back to the community</span>
                </li>
              </ol>
            </div>

            {/* Creator Info */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg mb-4 dark:text-white">About the Creator</h3>
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-xl">
                  {workspace.creator.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="dark:text-white">{workspace.creator.name}</h4>
                    {workspace.creator.verified && (
                      <Award className="w-4 h-4 text-blue-500" title="Verified Creator" />
                    )}
                    {workspace.creator.isPro && (
                      <span className="px-2 py-0.5 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full text-xs flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        Pro
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    Data analytics expert specializing in {workspace.category.toLowerCase()} dashboards and visualizations.
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <span>12 Published Workspaces</span>
                    <span>•</span>
                    <span>1.2k Total Clones</span>
                    <span>•</span>
                    <span>450 Followers</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Comment Input */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg mb-4 dark:text-white">Add a Comment</h3>
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white">
                  <User className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Share your thoughts..."
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none dark:text-white resize-none"
                    rows={3}
                  />
                  <div className="mt-3 flex justify-end">
                    <button
                      onClick={handlePostComment}
                      disabled={!newComment.trim()}
                      className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-4 h-4" />
                      Post Comment
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Comments List */}
            <div className="space-y-4">
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-sm">
                      {comment.user.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="dark:text-white">{comment.user.name}</span>
                        {comment.user.isPro && (
                          <span className="px-2 py-0.5 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full text-xs flex items-center gap-1">
                            <Sparkles className="w-2 h-2" />
                            Pro
                          </span>
                        )}
                        <span className="text-sm text-gray-500 dark:text-gray-400">•</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{comment.date}</span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 mb-3">{comment.comment}</p>
                      <button className="text-sm text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors flex items-center gap-1">
                        <Heart className="w-4 h-4" />
                        {comment.likes} {comment.likes === 1 ? 'like' : 'likes'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
