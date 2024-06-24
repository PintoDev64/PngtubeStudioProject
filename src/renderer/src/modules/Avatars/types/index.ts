import { TypeAudioConfig } from "@renderer/context/audio/types"
import { TypeModelsConfig } from "@renderer/context/avatars/types"
import { Dispatch } from "react"

export type TypeUpdateAvatarStyleClass = {
    AudioState: TypeAudioConfig,
    Animate: HTMLImageElement,
    Volume: number,
    setActualModel: Dispatch<React.SetStateAction<string>>,
    AvatarsState: TypeModelsConfig
}