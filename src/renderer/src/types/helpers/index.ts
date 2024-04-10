import { Dispatch, SetStateAction } from "react"
import { TypeAudioConfig, TypeModelsConfig } from "../context"

export type TypeUpdateCanvasVolume = {
    canvasLevelRef: React.MutableRefObject<HTMLCanvasElement>,
    AudioState: TypeAudioConfig,
    ModifyState: Dispatch<SetStateAction<number>>,
    Volume: number
}

export type TypeUpdateAvatarStyleClass = {
    AudioState: TypeAudioConfig,
    Animate: HTMLImageElement,
    Volume: number,
    setActualModel: Dispatch<React.SetStateAction<string>>,
    AvatarsState: TypeModelsConfig
}