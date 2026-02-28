# Reset Factory - 81XX Meter Reset Tool

A production-ready desktop application built with Electron and React for MacBook Air M1 (Apple Silicon).

## Project Structure

```
reset-factory/
├── src/
│   ├── main/
│   │   ├── main.js           # Electron main process
│   │   └── preload.js        # Context isolation layer
│   └── renderer/
│       ├── index.html        # HTML entry point
│       ├── main.jsx          # React entry
│       ├── App.jsx           # Main React component
│       └── App.css           # Styling
├── vite.config.js            # Vite configuration
├── package.json              # Dependencies and scripts
├── .gitignore                # Git ignore rules
└── README.md                 # This file
```

## Features

- ✅ Centered card layout with modern gradient background
- ✅ Model selection dropdown (C-8145/55, C-8150/60, C-8200/90)
- ✅ Smooth progress bar animation (5-second duration)
- ✅ Green Start button and Blue Refresh button
- ✅ Status text (Programming... / Completed)
- ✅ Percentage progress display
- ✅ Full Electron + React + Vite integration
- ✅ Native macOS application

## Requirements

- Node.js 16+ (LTS recommended)
- npm or yarn
- macOS (M1/Intel compatible, tested on M1)

## Installation & Setup (Mac M1)

### Step 1: Clone or Create Project Directory

```bash
cd ~/Desktop
mkdir reset-factory
cd reset-factory
```

Then copy all the files from this repository into the directory.

### Step 2: Install Dependencies

```bash
npm install
```

This will install:
- Electron 27
- React 18
- Vite 5
- Concurrently (for running dev/vite together)
- All required build tools

### Step 3: Run Development Mode

```bash
npm run dev
```

This command will:
1. Start Vite dev server on port 5173
2. Launch Electron with the app window
3. Enable DevTools automatically for debugging

You should see the "Reset Factory" window appear with the UI ready to use.

### Step 4: Build for Production

```bash
npm run build
```

This will:
1. Build React app with Vite to `dist/renderer`
2. Package Electron app for distribution

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server + Electron |
| `npm run dev:vite` | Start Vite dev server only |
| `npm run dev:electron` | Start Electron only |
| `npm run build` | Build for production |
| `npm run build:vite` | Build React app only |
| `npm run build:electron` | Build Electron app with electron-builder |
| `npm run preview` | Preview production build |

## How the App Works

### UI Components

1. **Header**
   - Title: "Reset Factory"
   - Subtitle: "81XX Meter Reset Tool"

2. **Model Selection**
   - Dropdown with default "-- Select Models --"
   - Options: C-8145/55, C-8150/60, C-8200/90

3. **Progress Display**
   - Progress bar (blue gradient)
   - Percentage text
   - Status text (Programming... / Completed)

4. **Controls**
   - Green "Start" button (disabled until model selected)
   - Blue "Refresh" button (enabled only after completion)

### User Flow

1. User selects a model from dropdown
2. User clicks "Start" button
3. Dropdown and Start button become disabled
4. Progress bar animates from 0% to 100% over 5 seconds
5. Status shows "Programming..."
6. After 5 seconds, status changes to "Completed"
7. Refresh button becomes enabled
8. Clicking "Refresh" resets everything to initial state

## Technical Details

### Electron Configuration
- **Main Process**: `src/main/main.js`
- **Preload Script**: `src/main/preload.js` (for context isolation)
- **Window Size**: 600x700px
- **Dev Tools**: Auto-open in development

### React + Vite
- **Framework**: React 18 with Hooks
- **Build Tool**: Vite 5 for lightning-fast HMR
- **No Build Config Needed**: Simple vite.config.js provided
- **Entry**: src/renderer/index.html

### Styling
- **CSS**: Plain CSS (no external libraries)
- **Design**: Modern card-based layout
- **Gradient**: Soft gray gradient background
- **Animations**: Smooth progress bar using CSS transitions

### State Management
- **React Hooks**: useState for UI state
- **useEffect**: Cleanup on unmount
- **useRef**: For managing progress interval

## Troubleshooting

### Port 5173 Already in Use
If you get an error about port 5173:
```bash
# Kill process on port
lsof -ti:5173 | xargs kill -9

# Or use a different port (edit vite.config.js)
```

### Electron Window Doesn't Appear
- Check console for errors
- Make sure port 5173 is accessible
- In development, there's a 3-second delay while Vite starts

### Build Errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Vite cache
rm -rf dist/
npm run build
```

## Development Tips

### Hot Reload
When you edit React code, changes hot-reload automatically in the window without rebuilding.

### DevTools
In development mode, the DevTools are automatically opened. You can close them and reopen with:
- Mac: Cmd + Option + I

### Environment Variables
Create `.env` file if needed:
```
VITE_API_BASE=http://localhost:3000
```

## Platform-Specific Notes

### M1 Mac
- This project is fully compatible with Apple Silicon
- All dependencies have M1-compatible binaries
- No additional configuration needed

### Intel Mac
- Works identically to M1
- All features supported

## Browser/Renderer Separation

This app follows Electron best practices:
- **Main Process** (Node.js): Can access file system, spawn processes
- **Renderer Process** (Chromium): Can access DOM, run React
- **IPC**: Can communicate via Electron IPC (optional expansion)
- **Context Isolation**: Enabled for security

## Next Steps for Expansion

To add IPC communication:

1. In main.js:
```javascript
import { ipcMain } from 'electron';

ipcMain.handle('some-action', async (event, args) => {
  return 'response';
});
```

2. In React:
```javascript
const result = await window.electron.invoke('some-action', args);
```

3. Update preload.js to expose the invoke method

## License

MIT

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Ensure Node.js version is 16+
3. Try `npm install` again
4. Check that all files are in correct locations

---

**Ready to use:** After `npm install` and `npm run dev`, the app is fully functional!
