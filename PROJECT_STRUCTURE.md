# Reset Factory - Complete Project Structure

## Directory Tree

```
reset-factory/
│
├── 📄 package.json                 # npm dependencies & scripts
├── 📄 vite.config.js              # Vite build configuration
├── 📄 README.md                   # Full documentation
├── 📄 QUICK_START.md              # Quick setup guide
├── 📄 setup.sh                    # Automated setup script
├── 📄 .gitignore                  # Git ignore rules
│
├── 📁 src/                        # Source code
│   │
│   ├── 📁 main/                   # Electron main process
│   │   ├── 📄 main.js             # Electron app entry point
│   │   └── 📄 preload.js          # Security context bridge
│   │
│   └── 📁 renderer/               # React frontend
│       ├── 📄 index.html          # HTML entry (Vite target)
│       ├── 📄 main.jsx            # React app bootstrap
│       ├── 📄 App.jsx             # Main React component
│       └── 📄 App.css             # Component styles
│
├── 📁 dist/ [generated]           # Build output (created by npm run build)
│   ├── 📁 renderer/               # Built React app
│   └── 📁 main/                   # Built Electron app
│
└── 📁 node_modules/ [generated]   # Installed dependencies (created by npm install)
```

## File Descriptions

### Root Configuration Files

#### `package.json`
- Lists all npm dependencies
- Defines build scripts (dev, build, preview)
- Electron app configuration for building
- macOS-specific build settings

**Key Scripts:**
- `npm run dev` - Start dev with Vite + Electron
- `npm run build` - Create production bundle
- `npm run build:vite` - Build React app only
- `npm run build:electron` - Package Electron app

#### `vite.config.js`
- Vite bundler configuration
- Sets output directory to `dist/renderer`
- Configures dev server on port 5173
- Enables React plugin for JSX/HMR

#### `.gitignore`
- Ignores node_modules/, dist/, build artifacts
- Ignores environment files (.env)
- Ignores OS files (.DS_Store)
- Ignores IDE settings

### Electron Main Process (`src/main/`)

#### `main.js`
**Purpose:** Electron application entry point and main process controller

**Responsibilities:**
- Creates the app window (600x700px)
- Loads React app from Vite dev server (dev mode)
- Loads built React app from file (production)
- Handles app lifecycle (ready, closed, activate)
- Creates application menus
- Configures security (context isolation, nodeIntegration disabled)

**Key Functions:**
- `createWindow()` - Creates and configures BrowserWindow
- Auto-opens dev tools in development

**IPC Ready:** Preload.js acts as security bridge for future IPC

#### `preload.js`
**Purpose:** Secure bridge between Node.js (main) and Chromium (renderer)

**Current Exports:**
- `window.electron.platform` - Returns OS platform
- `window.electron.version` - Returns Node.js version

**Expandable:** Add more IPC handlers here for main process communication

### React Renderer (`src/renderer/`)

#### `index.html`
- HTML entry point for the app
- Single `<div id="root">` for React mounting
- Loads `main.jsx` script module
- Sets title and viewport meta tags

#### `main.jsx`
**Purpose:** React application bootstrap

**What It Does:**
- Imports React and ReactDOM
- Creates root React element
- Renders `<App />` component
- Imports global CSS

#### `App.jsx`
**Purpose:** Main React component - entire UI logic

**State Variables:**
- `selectedModel` - Current dropdown selection
- `isRunning` - Programming/animation in progress
- `progress` - 0-100 progress percentage
- `statusText` - "Programming..." or "Completed"
- `isRefreshDisabled` - Refresh button state

**Key Features:**
- Model dropdown with 3 options
- Start button (green, #10b981)
- Refresh button (blue, #3b82f6)
- Progress bar with percentage display
- Smooth 5-second animation using setInterval
- Status text updates
- Button disable/enable logic

**Functions:**
- `startProgramming()` - Handles Start button click
- `handleRefresh()` - Handles Refresh button click
- Cleanup in useEffect

#### `App.css`
**Purpose:** Complete styling for the application

**Key Styles:**
- Gradient background (gray tones)
- Card layout (white, rounded, shadow)
- Form elements (select dropdown, custom styling)
- Button styles (green Start, blue Refresh)
- Progress bar (blue gradient, smooth animation)
- Responsive layout
- Hover and active states
- Disabled states (grayed out)

**Breakpoints:** Responsive from 320px to 1200px+

### Build Outputs (`dist/`)

After running `npm run build`:

```
dist/
├── renderer/
│   ├── index.html        # Minified HTML
│   ├── assets/
│   │   ├── main-*.js     # Bundled React app
│   │   └── style-*.css   # Minified styles
│   └── ...
└── main/
    └── main.js           # Compiled Electron main
```

## Development Workflow

### Hot Module Replacement (HMR)

1. **Start dev:** `npm run dev`
2. **Vite watches** React code for changes
3. **Browser updates** automatically (no full reload needed)
4. **Electron stays** open during development

### File Change Examples

**Edit App.jsx:**
- HMR triggers immediately
- Component re-renders in 100ms
- No full app reload

**Edit App.css:**
- Styles update immediately
- No page refresh

**Edit main.js:**
- Must restart Electron
- Manual: Close window, app restarts with `npm run dev`

## Architecture Decisions

### Why Separate Main and Renderer?

**Security:** Electron's recommended pattern
- Main process can't be confused with web code
- Renderer can't access Node.js APIs directly
- IPC acts as controlled bridge

**Performance:**
- Main process handles OS tasks, file system, etc.
- Renderer focused on UI only
- Clear separation of concerns

### Why Vite + React?

**Vite:**
- Instant HMR (hot reload)
- Fast production builds
- Zero config needed
- Works perfectly with Electron

**React:**
- Component-based architecture
- Easy state management with Hooks
- Large ecosystem
- Familiar to most developers

### Why No UI Library?

**Advantages:**
- Zero dependencies for styling
- Full control over appearance
- Smaller bundle size
- Faster app startup
- No version conflicts

**CSS is Enough:**
- Modern CSS flexbox/grid
- Smooth transitions
- Custom styling straightforward

## Production Build

### Running `npm run build`:

1. **Vite builds React:**
   - Minifies JavaScript
   - Optimizes CSS
   - Creates static files in `dist/renderer/`

2. **Electron-builder packages:**
   - Copies dist/ into app bundle
   - Creates macOS .dmg installer
   - Creates .zip for distribution
   - Output: `release/` folder

### Result Files:

```
release/
├── Reset Factory-1.0.0.dmg      # macOS installer
├── Reset Factory-1.0.0.zip      # Portable version
└── ...
```

## Dependency Breakdown

### Runtime Dependencies (2)
- `electron-squirrel-startup` - Windows installer support

### Dev Dependencies (8)
- **Electron:** App framework
- **React, ReactDOM:** UI library
- **Vite, @vitejs/plugin-react:** Build tool
- **electron-builder:** Packaging tool
- **concurrently:** Run multiple npm scripts
- **cross-env:** Cross-platform environment variables

**Total:** ~500MB after npm install (mostly Chromium in Electron)

## Security Features Enabled

1. **Context Isolation:** Main and renderer isolated
2. **No Node Integration:** Renderer can't require()
3. **Preload Script:** Controlled API exposure
4. **Auto-Update Ready:** electron-builder compatible
5. **Code Signing Ready:** macOS signing support

## Next Steps for Extension

### Add Backend API:
1. Create Node.js Express server in `src/api/`
2. IPC communicate between Electron and React
3. Make HTTP requests from renderer to backend

### Add Database:
1. Use SQLite with Node.js binding
2. Main process handles database
3. Expose via IPC to renderer

### Add System Tray:
1. Create Tray in main.js
2. Show/hide app window from tray
3. System notifications

### Add Settings/Config:
1. Use electron-store for persistent settings
2. Save to `~/.config/reset-factory/`
3. Load on app startup

## Quick Reference

| Task | Command |
|------|---------|
| Install | `npm install` |
| Dev | `npm run dev` |
| Build | `npm run build` |
| Preview | `npm run preview` |
| Rebuild | `rm -rf node_modules && npm install` |

---

**Complete Architecture:** This setup follows Electron best practices with React/Vite for modern, performant desktop development.
