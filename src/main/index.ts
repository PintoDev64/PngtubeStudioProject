import { app, shell, BrowserWindow, ipcMain, session, Tray, Menu } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/Ookami.ico?asset'
import { homedir } from 'os';

// Imports
import API_Initializer from './api';
import InitProcess from './init';
import { existsSync } from 'fs';

// init's
let reactDevToolsPath: string;
let ZoomFactorLevel = 1
let tray: Tray;

//DevToools
if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
  reactDevToolsPath = join(
    homedir(),
    'AppData/Local/Google/Chrome/User Data/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/5.0.2_0'
  )
}

// MainWindow
let mainWindow: BrowserWindow;

function createWindow(): void {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    minWidth: 1280,
    minHeight: 720,
    frame: false,
    show: false,
    autoHideMenuBar: true,
    icon,
    titleBarStyle: "hidden",
    center: true,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  /* mainWindow.webContents.openDevTools({
    mode: 'undocked'
  }) */

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(async () => {

  await session.defaultSession.loadExtension(reactDevToolsPath)

  tray = new Tray(icon)
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Item1', type: 'radio' },
    { label: 'Item2', type: 'radio' },
    { label: 'Item3', type: 'radio', checked: true },
    { label: 'Item4', type: 'radio' }
  ])
  tray.setToolTip('This is my application.')
  tray.setContextMenu(contextMenu)

  // Set app user model id for windows
  electronApp.setAppUserModelId('com.pngtubestudio.app')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC Comunication
  ipcMain.on('minimize', () => {
    mainWindow.minimize()
  });
  ipcMain.on('close', () => {
    mainWindow.close()
  });
  ipcMain.on('restore', () => {
    if (mainWindow.isMaximized()) return mainWindow.restore();
    return mainWindow.maximize();
  });
  ipcMain.on('ZoomPlus', () => {
    ZoomFactorLevel = ZoomFactorLevel + 0.1
    mainWindow.webContents.setZoomFactor(ZoomFactorLevel)
  });
  ipcMain.on('ZoomMinus', () => {
    ZoomFactorLevel = ZoomFactorLevel - 0.1
    mainWindow.webContents.setZoomFactor(ZoomFactorLevel)
  });
  API_Initializer()

  if (!existsSync(join(homedir(), 'AppData\\Roaming\\PNGtubeSettings\\bin'))) {
    await InitProcess().__Init__()
    app.quit();
  } else {
    createWindow()
  }

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.

