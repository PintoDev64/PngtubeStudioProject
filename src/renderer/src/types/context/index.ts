import { ReactNode } from "react"

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

export interface Contextinterface {
    children: ReactNode
}