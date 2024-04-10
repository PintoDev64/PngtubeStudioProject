import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

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
    Receiver: () => ipcRenderer.sendSync("ModelsReceiver")
  },
  App: {
    Checker: () => ipcRenderer.send("SettingsChecker")
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
