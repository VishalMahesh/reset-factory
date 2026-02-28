const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');
const { URL } = require('url');

const isDev = process.env.NODE_ENV === 'development';

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 600,
    height: 700,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  let startURL;
  if (isDev) {
    startURL = 'http://localhost:5173';
  } else {
    // In packaged app, dist is 2 levels up from src/main directory
    const indexPath = path.join(__dirname, '..', '..', 'dist', 'renderer', 'index.html');
    startURL = new URL(`file://${indexPath}`).href;
    console.log('Loading URL:', startURL);
    console.log('Index path exists:', require('fs').existsSync(indexPath));
    console.log('__dirname:', __dirname);
  }

  console.log('Start URL:', startURL);
  mainWindow.loadURL(startURL);

  // Allow opening dev tools with Cmd+Option+I on macOS or Ctrl+Shift+I on Windows/Linux
  mainWindow.webContents.on('before-input-event', (event, input) => {
    const isMac = process.platform === 'darwin';
    if (isMac && input.meta && input.alt && input.keyCode === 73) { // Cmd+Option+I on Mac
      mainWindow.webContents.toggleDevTools();
    } else if (!isMac && input.control && input.shift && input.keyCode === 73) { // Ctrl+Shift+I on Windows/Linux
      mainWindow.webContents.toggleDevTools();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

// Create application menu
const template = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Exit',
        accelerator: 'CmdOrCtrl+Q',
        click: () => {
          app.quit();
        }
      }
    ]
  },
  {
    label: 'Edit',
    submenu: [
      { label: 'Undo', accelerator: 'CmdOrCtrl+Z', selector: 'undo:' },
      { label: 'Redo', accelerator: 'Shift+CmdOrCtrl+Z', selector: 'redo:' },
      { type: 'separator' },
      { label: 'Cut', accelerator: 'CmdOrCtrl+X', selector: 'cut:' },
      { label: 'Copy', accelerator: 'CmdOrCtrl+C', selector: 'copy:' },
      { label: 'Paste', accelerator: 'CmdOrCtrl+V', selector: 'paste:' }
    ]
  }
];

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);
