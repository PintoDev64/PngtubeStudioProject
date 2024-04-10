import { createContext } from "react";

// Types
import { AudioContextProps, AvatarsContextProps, MemoryContextProps, SettingContextProps } from "@renderer/types/context";

const AudioContext_Def = createContext<AudioContextProps>(null!)
const AvatarsContext = createContext<AvatarsContextProps>(null!)
const MemoryContext = createContext<MemoryContextProps>(null!)
const SettingsContext = createContext<SettingContextProps>(null!)

export {
    AudioContext_Def,
    MemoryContext,
    SettingsContext,
    AvatarsContext
}
