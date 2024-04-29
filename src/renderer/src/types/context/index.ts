import { TypeBaseConfig } from ".."

// ------------ Audio Context
export type TypeAudioConfig = {
    State: boolean,
    Amplifier: number,
    Sensibility: number
}
export interface TypeAudioReducerSettings {
    action: "Amplifier" | "Sensibility" | "State",
    value: boolean | number
}
export type TypeModifyAudioState = ({ action, value }: TypeAudioReducerSettings) => void

export interface AudioContextProps {
    AudioState: TypeAudioConfig,
    ModifyState: TypeModifyAudioState
}

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
    SettingRouter: "Appareance" | "Advanced" | "Audio" | "Integrations",
    AvatarsShowcase: boolean,
    AppDetails: AppDetails,
    SettingsPreload: TypeBaseConfig,
    Wallpapers: TypeWallpaperConfig
}
export interface MemoryContextProps {
    MemoryState: DefaultValuesMemory,
    ModifyState: TypeModifyMemoryState
}
// ------------ Avatars Context
export type TypeModelConfigBase = {
    Id: number,
    Name: string,
    Owner: string,
    Date: string,
    Image: string,
    Data: {
        States: [
            string[]
        ]
    },
    URL: string
}[]
export type TypeModifyModelState = ({ action, value }: typeModelReducerSettings) => void
export interface typeModelReducerSettings {
    action: "Data" | "Select",
    value: TypeModelConfigBase | number
}
export type TypeModelsConfig = {
    Data: TypeModelConfigBase,
    Select: number,
}
export interface AvatarsContextProps {
    AvatarsState: TypeModelsConfig,
    ModifyState: TypeModifyModelState
}
// ------------ Wallpapers Context
export type TypeWallpaperConfig = {
    Type: "Default" | "Custom",
    Name: string,
    Source: string
}[]
// ------------ Settings Context
export type TypeModifySettingsState = ({ action, value }: TypeSettingsReducerSettings) => void
export type TypeModifyAllState = (value: TypeBaseConfig) => void
export interface TypeSettingsReducerSettings {
    action: "Model" | "Resources" | "Config" | "Avatars",
    value: string | number | object | `#${string}`
}
export interface SettingContextProps {
    SettingsState: TypeBaseConfig,
    ModifyState: TypeModifySettingsState,
    ModifyAll: TypeModifyAllState
}