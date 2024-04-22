import { ElectronAPI } from '@electron-toolkit/preload'
import { TypeModelConfigBase } from '@renderer/types'
import { AppDetails, TypeModelsConfig, TypeWallpaperConfig } from '@renderer/types/context'

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
        Receiver: () => TypeModelConfigBase,
        Send: () => TypeModelConfigBase
      }
      Wallpapers: {
        Receiver: () => TypeWallpaperConfig
        Send: (newWallpaper: TypeWallpaperConfig) => TypeWallpaperConfig
        Deleter: (wallpaperIndex: number) => TypeWallpaperConfig
      },
      App: {
        Checker: () => boolean,
        AppDetails: () => AppDetails
      }
    }
  }
}
