import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { TypeWallpaperConfig } from '../main/types'

// Custom APIs for renderer
const api = {
  Window: {
    Minimize: () => ipcRenderer.send("minimize"),
    MinMax: () => ipcRenderer.send("restore"),
    Close: () => ipcRenderer.send("close"),
    ZoomPlus: () => ipcRenderer.send("ZoomPlus"),
    ZoomMinus: () => ipcRenderer.send("ZoomMinus")
  },
  Settings: {
    Receive: () => ipcRenderer.sendSync("SettingsReceiver"),
    Send: (_data) => ipcRenderer.sendSync("SettingsSender", { _data })
  },
  Models: {
    Receiver: () => ipcRenderer.sendSync("ModelsReceiver"),
    Send: () => ipcRenderer.sendSync("ModelsSender")
  },
  Wallpapers: {
    Receiver: () => ipcRenderer.sendSync("WallpapersReceiver"),
    Send: (newWallpaper: TypeWallpaperConfig) => ipcRenderer.sendSync("WallpapersSender", { newWallpaper }),
    Deleter: (wallpaperIndex: number) => ipcRenderer.sendSync("WallpapersDeleter", { wallpaperIndex })
  },
  App: {
    Checker: () => ipcRenderer.send("SettingsChecker"),
    AppDetails: () => ipcRenderer.sendSync("AppDetails")
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
