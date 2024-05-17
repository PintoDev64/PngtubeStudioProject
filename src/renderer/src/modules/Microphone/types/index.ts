import { TypeAudioConfig } from "@renderer/types/context"
import { Dispatch, SetStateAction } from "react"

export type TypeUpdateCanvasVolume = {
    canvasLevelRef: React.MutableRefObject<HTMLCanvasElement>,
    AudioState: TypeAudioConfig,
    ModifyState: Dispatch<SetStateAction<number>>,
    Volume: number
}