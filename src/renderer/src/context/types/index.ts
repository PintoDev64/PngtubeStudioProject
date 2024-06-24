import { ReactNode } from "react";
import { TypeModifyAllState, TypeModifySettingsState } from "../settings/types";
import { TypeAudioConfig, TypeModifyAudioState } from "../audio/types";
import { DefaultValuesMemory, TypeModifyMemoryState } from "../memory/types";
import { TypeModelsConfig, TypeModifyModelState } from "../avatars/types";
import { TypeBaseConfig } from "@renderer/env";

export interface SettingContextProps {
    SettingsState: TypeBaseConfig,
    ModifyState: TypeModifySettingsState,
    ModifyAll: TypeModifyAllState
}

export interface MemoryContextProps {
    MemoryState: DefaultValuesMemory,
    ModifyState: TypeModifyMemoryState
}

export interface AvatarsContextProps {
    AvatarsState: TypeModelsConfig,
    ModifyState: TypeModifyModelState
}

export interface AudioContextProps {
    AudioState: TypeAudioConfig,
    ModifyState: TypeModifyAudioState
}

export interface Contextinterface {
    children: ReactNode
}