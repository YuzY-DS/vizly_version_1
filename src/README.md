# Vizly Analytics Dashboard

A modern, feature-rich analytics dashboard built with React, TypeScript, and Tailwind CSS. Complete redesign with production-ready architecture.

## 🎨 Complete Redesign

This is a **complete, modern redesign** of the Vizly analytics dashboard featuring:

- ✅ 8 fully designed screens
- ✅ Feature-based architecture
- ✅ Clean, professional UI with gradient aesthetics
- ✅ Working charts and visualizations (Recharts)
- ✅ Comprehensive sample data
- ✅ Type-safe TypeScript
- ✅ Responsive design

## 📁 Project Structure

```
/src
  /assets              # Static files (images, icons, fonts)
  /components          # Shared, reusable UI components
  /features            # Feature-based modules
    /auth             # Authentication feature
    /workspace        # Workspace management
    /reports          # Report builder
    /dashboard        # Dashboard views
    /community        # Community hub
    /profile          # Profile settings
  /hooks               # Global custom hooks
  /layouts             # Page layout wrappers
  /pages               # Route components
  /services            # API clients
  /store               # State management
  /styles              # Global styles
  /utils               # Helper functions
  /types               # TypeScript types
```

See [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) for detailed information.

## 🚀 Features

### Authentication
- **Login** - Beautiful split-screen design with gradient branding
- **Sign Up** - Complete registration flow
- **Forgot Password** - Password reset with email confirmation

### Workspaces
- **Workspace Home** - Grid view of all workspaces with filtering
- **Workspace Detail** - Detailed view with collapsible sidebar
- **Create/Edit** - Modal-based workspace management
- **Favorites** - Star your favorite workspaces

### Reports & Analytics
- **Report Builder** - Three-panel layout for creating charts
- **Chart Types** - Line, Bar, Pie, Area charts (Recharts)
- **Color Schemes** - 10 beautiful gradient color palettes
- **Data Table** - Sortable, filterable data table view

### Dashboards
- **Dashboard View** - Multi-widget dashboard layout
- **Edit Mode** - Drag-and-drop widget management
- **Metric Cards** - Beautiful gradient metric displays
- **Charts** - Interactive visualizations

### Community
- **Featured Workspaces** - Carousel of highlighted projects
- **Browse & Search** - Filter by category, search, sort
- **Like & Clone** - Engage with community workspaces

### Profile & Settings
- **Profile** - Edit personal information
- **Account** - Security and password management
- **Notifications** - Preference toggles
- **Billing** - Subscription management (Pro plan)

## 🎯 Design System

### Colors
- **Primary**: Indigo-Purple gradient (`#3B82F6` to `#8B5CF6`)
- **Backgrounds**: Light slate (`#F9FAFB`)
- **Cards**: White with soft shadows
- **Accents**: Blue, Purple, Green, Orange, Red, Pink, Teal

### Typography
- **Headings**: Bold, modern sans-serif
- **Body**: Clean, readable text
- **Hierarchy**: 3xl → 2xl → xl → base

### Components
- **Rounded**: 8px (lg) to 24px (2xl)
- **Shadows**: Soft, layered shadows
- **Transitions**: Smooth 200-300ms animations
- **Spacing**: Consistent 16-24px padding

## 📦 Tech Stack

### Core
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool

### Styling
- **Tailwind CSS v4** - Utility-first CSS
- **Lucide React** - Icon library

### Data Visualization
- **Recharts** - Chart library

### State Management
- React Context / Redux Toolkit (ready)

### HTTP Client
- Axios (ready for API integration)

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📱 Screens

### 1. Authentication Flow
- Login screen with social auth
- Sign up with validation
- Password reset flow

### 2. Workspace Management
- Home page with workspace grid
- Detail view with sidebar navigation
- Create/edit workspace modals

### 3. Report Builder
- Left panel: Chart type & configuration
- Center: Live chart preview
- Right panel: AI assistant placeholder

### 4. Data Table
- Sortable columns
- Search & filter
- Pagination
- Status badges

### 5. Dashboard
- 2x2 widget grid
- Metric cards
- Edit mode with drag-and-drop
- Export functionality

### 6. Community Hub
- Featured carousel
- Category filtering
- Like & clone actions
- Search & sort

### 7. Profile Settings
- Profile information
- Account security
- Notification preferences
- Billing & subscription

## 🎨 Sample Data

Included mock data for:
- 6 workspaces with varied stats
- 3 data sources (CSV, Excel, JSON)
- 5 reports with different chart types
- 2 dashboards
- 12 months of revenue data
- 9 community workspaces
- 5 notifications

## 📚 Architecture Highlights

### Feature-Based Organization
Each feature is self-contained with:
- Components (UI)
- Services (API calls)
- Hooks (Logic)
- Types (TypeScript)

### Benefits
- **Scalability** - Easy to add new features
- **Maintainability** - Related code grouped together
- **Testability** - Features tested in isolation
- **Collaboration** - Multiple developers can work simultaneously

### Code Structure
```tsx
// Feature structure example
/features/workspace
  /components
    WorkspaceCard.tsx
    WorkspaceGrid.tsx
  /services
    workspaceService.ts
  /hooks
    useWorkspaces.ts
```

## 🔄 Data Flow

```
User Action → Component → Hook → Service → API
                ↑                              ↓
                └──────── State Update ────────┘
```

## 🎯 Best Practices

### Component Structure
1. Imports
2. Types/Interfaces
3. Component function
4. Hooks
5. Event handlers
6. Render JSX

### Naming Conventions
- **Components**: PascalCase (`WorkspaceCard.tsx`)
- **Hooks**: camelCase with `use` prefix (`useWorkspaces.ts`)
- **Services**: camelCase with `Service` suffix
- **Constants**: UPPER_SNAKE_CASE

### Styling
- Tailwind utility classes
- Mobile-first approach
- Consistent spacing
- Gradient accents

## 🚧 Next Steps (Backend Integration)

The app is **ready for backend integration**:

1. **API Setup**
   - Configure Axios base URL
   - Add authentication interceptors
   - Handle error responses

2. **Service Implementation**
   - Replace mock data with real API calls
   - Implement proper error handling
   - Add loading states

3. **State Management**
   - Set up Redux/Context
   - Add caching strategies
   - Implement optimistic updates

4. **Real-time Features**
   - WebSocket integration
   - Live notifications
   - Collaborative editing

5. **File Uploads**
   - Implement file upload
   - Parse CSV/Excel/JSON
   - Store in cloud storage

## 📄 License

This project is proprietary and confidential.

## 👥 Contributors

Built with ❤️ for modern analytics

---

## 📖 Documentation

- [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) - Detailed folder structure
- [REDESIGN_OVERVIEW.md](REDESIGN_OVERVIEW.md) - Complete redesign details

## ✨ Features at a Glance

- ✅ Modern gradient UI design
- ✅ 8 interconnected screens
- ✅ Feature-based architecture
- ✅ TypeScript type safety
- ✅ Responsive layouts
- ✅ Working charts (4 types)
- ✅ 10 color schemes
- ✅ Sample data included
- ✅ Modal dialogs
- ✅ Notification system
- ✅ User authentication flow
- ✅ Profile settings
- ✅ Community features
- ✅ Production-ready code

---

**Ready to build beautiful analytics dashboards!** 🚀

Navigate through the app starting from the Login screen to experience the complete redesign.
