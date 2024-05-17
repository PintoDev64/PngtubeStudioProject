import { TypeAudioConfig, TypeModelsConfig } from "@renderer/types/context"
import { Dispatch } from "react"

export type TypeUpdateAvatarStyleClass = {
    AudioState: TypeAudioConfig,
    Animate: HTMLImageElement,
    Volume: number,
    setActualModel: Dispatch<React.SetStateAction<string>>,
    AvatarsState: TypeModelsConfig
}