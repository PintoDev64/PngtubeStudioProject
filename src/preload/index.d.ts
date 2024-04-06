import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      Window: {
        Minimize: () => void,
        MinMax: () => void,
        Close: () => void
      }
    }
  }
}
