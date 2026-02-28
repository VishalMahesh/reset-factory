# Quick Start Guide - Reset Factory

## Prerequisites
- Node.js 16+ (download from nodejs.org if needed)
- macOS (M1 or Intel)

## Quick Start (3 Steps)

### 1. Install Dependencies
```bash
npm install
```
Wait for installation to complete (may take 2-3 minutes).

### 2. Start Development Server
```bash
npm run dev
```
You should see:
- ✓ Vite dev server running on http://localhost:5173
- ✓ Electron window opening with Reset Factory app
- ✓ DevTools console visible (you can close if you want)

### 3. Test the App
1. Select a model from the dropdown
2. Click the green "Start" button
3. Watch the progress bar animate for 5 seconds
4. See "Completed" message when done
5. Click blue "Refresh" button to reset

Done! The app is fully functional.

## File Locations

All important files are in:
- `src/renderer/App.jsx` - Main React component
- `src/renderer/App.css` - Styling
- `src/main/main.js` - Electron main process
- `package.json` - Dependencies

## Troubleshooting

### Issue: "Port 5173 is already in use"
```bash
lsof -ti:5173 | xargs kill -9
npm run dev
```

### Issue: Electron window shows blank/white screen
- Wait 3-5 seconds for Vite to start
- Check if http://localhost:5173 is accessible in browser
- Try restarting: Ctrl+C, then `npm run dev` again

### Issue: Module errors
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

## Production Build

When ready to distribute:
```bash
npm run build
```

Creates release build in `dist/` directory.

## Key Information

✅ **Zero Configuration** - All configs are pre-set
✅ **Hot Reload** - Edit code, changes appear instantly
✅ **Mac M1 Ready** - Fully compatible with Apple Silicon
✅ **Modern Stack** - React 18 + Vite + Electron 27
✅ **Secure** - Context isolation enabled by default

## Still Having Issues?

1. Ensure Node.js: Run `node --version` (should be v16+)
2. Check npm: Run `npm --version`
3. Try fresh install: `rm -rf node_modules && npm install`
4. Check console for error messages: Cmd+Option+I in app window

For more detailed documentation, see `README.md`
