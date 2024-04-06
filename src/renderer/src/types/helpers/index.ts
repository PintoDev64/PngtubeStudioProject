import { Dispatch, SetStateAction } from "react"
import { TypeAudioConfig } from "../context"

export type TypeUpdateCanvasVolume = {
    canvasLevelRef: React.MutableRefObject<HTMLCanvasElement>,
    AudioState: TypeAudioConfig,
    ModifyState: Dispatch<SetStateAction<number>>,
    Volume: number
}