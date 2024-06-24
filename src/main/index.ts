import { app, shell, BrowserWindow, ipcMain, session, Tray, Menu } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import { info, transports } from 'electron-log';
import icon from '../../resources/pngtubestudiologo.png?asset'
import { homedir } from 'os';

// Imports
import API_Initializer from './api';
import InitProcess from './init';
import { existsSync } from 'fs';
import { autoUpdater } from 'electron-updater';
import { Routes } from './constants';
import { ReadFileBynari, isVersionGreater } from './utils';
import { DiscordActivity } from './integrations';
import { TypeBaseConfig } from './types';

// init's
let reactDevToolsPath: string;
let tray: Tray;

//DevToools
if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
  reactDevToolsPath = join(
    homedir(),
    'AppData/Local/Google/Chrome/User Data/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/5.0.2_0'
  )
}

if (existsSync(Routes.Settings)) {
  ReadFileBynari(Routes.Settings, (response: TypeBaseConfig) => {
    if (response.Config.Integrations.Discord) {
      DiscordActivity()
    }
    if (!response.Config.hardwareAcceleration) {
      app.disableHardwareAcceleration()
    }
  })
}

transports.file.resolvePathFn = () => join(homedir(), 'AppData\\Roaming\\PNGtubeSettings\\Logs\\updates.log');
info(`Log Ready to work with version ${app.getVersion()}`);

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
      zoomFactor: 1,
      preload: join(__dirname, '../preload/index.js'),
      devTools: is.dev && process.env['ELECTRON_RENDERER_URL'] ? true : false,
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setMaxListeners(0)

  mainWindow.webContents.setUserAgent("PintoGamer64/PngtubeStudio");

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
// Updates Events
autoUpdater.forceDevUpdateConfig = true
// -----------------------------------------
autoUpdater.on('update-available', () => {
  info('Actualizacion Disponible')
}); // -----------------------------------------
autoUpdater.on('checking-for-update', () => {
  info('Buscando Actualizaciones...')
}); // -----------------------------------------
autoUpdater.on('update-downloaded', () => {
  info('Actualizacion Descargada')
}); // -----------------------------------------
autoUpdater.on('download-progress', (progress) => {
  info(`[ Descargando... ${Math.trunc(progress.percent)}% ]`)
}); // -----------------------------------------
autoUpdater.on('update-not-available', () => {
  info('Tienes La Ultima Version Disponible ✅')
}); // -----------------------------------------
autoUpdater.on('error', () => {
  info('Error En Actualizar La App ❌')
}) // -----------------------------------------

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(async () => {

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
    mainWindow.webContents.setZoomFactor(mainWindow.webContents.zoomFactor + 0.1)
  });
  ipcMain.on('ZoomMinus', () => {
    mainWindow.webContents.setZoomFactor(mainWindow.webContents.zoomFactor - 0.1)
  });
  ipcMain.on("AppUpdates", () => {
    autoUpdater.checkForUpdates()
      .then((value) => {
        if (value?.updateInfo) {
          mainWindow.webContents.send("AppUpdates", { version: isVersionGreater(value?.updateInfo.version, app.getVersion()) })
          autoUpdater.checkForUpdatesAndNotify({
            title: `New PngtubeStudio Version: ${app.getVersion()}`,
            body: "La actualizacion ha sido descargada y se instalara cuando cierre el programa (puede tardar un momento)"
          });
        } else {
          mainWindow.webContents.send("AppUpdates", { version: value?.updateInfo.version === app.getVersion() })
        }
      })
      .catch(() => mainWindow.webContents.send("AppUpdates", { version: false }))
  })

  API_Initializer(mainWindow)

  const CheckDirectorys = Object.entries(Routes)
  for (const directory of CheckDirectorys) {
    if (!existsSync(directory[1])) {
      await InitProcess().__Init__()
      app.quit();
      break;
    }
  }

  createWindow()

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    await session.defaultSession.loadExtension(reactDevToolsPath)
  }

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
  electronApp.setAppUserModelId('com.pintogamer.pngtubestudio')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

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
    info(`Saliendo de la aplicacion: (${new Date()})\n\n\n`)
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.

