import { TypeBaseConfig } from ".."

// ------------ Audio Context
export type TypeAudioConfig = {
    State: boolean,
    Amplifier: number,
    Sensibility: number,
    FftSize: 32 | 64 | 128 | 256 | 512 | 1024 | 2048 | 4096
}
export interface TypeAudioReducerSettings {
    action: "FftSize" | "Amplifier" | "Audio" | "Sensibility" | "State",
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
    action: "Fullscreen" | "Settings" | "SettingRouter" | "AvatarsShowcase" | "SettingsPreload",
    value: boolean | string | TypeBaseConfig
}
export type DefaultValuesMemory = {
    Fullscreen: boolean,
    Settings: boolean,
    SettingRouter: "Appareance" | "Advanced" | "Audio",
    AvatarsShowcase: boolean,
}
export interface MemoryContextProps {
    MemoryState: DefaultValuesMemory,
    ModifyState: TypeModifyMemoryState
}
// ------------ Avatars Context


// ------------ Settings Context
export interface SettingContextProps {

}