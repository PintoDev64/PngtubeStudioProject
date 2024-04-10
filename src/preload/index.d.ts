import { ElectronAPI } from '@electron-toolkit/preload'
import { TypeModelConfigBase } from '@renderer/types'
import { TypeModelsConfig } from '@renderer/types/context'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      Window: {
        Minimize: () => void,
        MinMax: () => void,
        Close: () => void,
        ZoomPlus: () => void,
        ZoomMinus: () => void
      }
      Settings: {
        Receive: () => TypeBaseConfig,
        Send: (_data: TypeBaseConfig) => boolean
      }
      Models: {
        Receiver: () => TypeModelConfigBase
      }
      App: {
        Checker: () => boolean
      }
    }
  }
}
