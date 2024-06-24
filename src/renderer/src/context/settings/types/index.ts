import { TypeBaseConfig } from "@renderer/env"

// ------------ Settings Context
export type TypeModifySettingsState = ({ action, value }: TypeSettingsReducerSettings) => void
export type TypeModifyAllState = (value: TypeBaseConfig) => void
export interface TypeSettingsReducerSettings {
    action: "Model" | "Resources" | "Config" | "Avatars",
    value: string | number | object | `#${string}`
}