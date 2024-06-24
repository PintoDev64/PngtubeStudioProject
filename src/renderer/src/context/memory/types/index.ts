import { TypeBaseConfig } from "@renderer/env"

// ------------ Memory Context
export type TypeModifyMemoryState = ({ action, value }: typeMemoryReducerSettings) => void
export interface typeMemoryReducerSettings {
    action: "Fullscreen" | "Settings" | "SettingRouter" | "AvatarsShowcase" | "SettingsPreload" | "Wallpapers",
    value: boolean | string | TypeBaseConfig | TypeWallpaperConfig
}
export type AppDetails = {
    AppVersion: string
}
export type DefaultValuesMemory = {
    Fullscreen: boolean,
    Settings: boolean,
    SettingRouter: "Appareance" | "Advanced" | "Audio" | "Integrations" | "Avatars",
    AvatarsShowcase: boolean,
    AppDetails: AppDetails,
    SettingsPreload: TypeBaseConfig,
    Wallpapers: TypeWallpaperConfig
}
export type TypeWallpaperConfig = {
    Type: "Default" | "Custom",
    Name: string,
    Source: string
}[]