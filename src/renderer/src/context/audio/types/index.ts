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