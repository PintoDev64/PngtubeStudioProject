import { createContext } from "react";

// Types
import { AudioContextProps, MemoryContextProps } from "@renderer/types/context";

const AudioContext_Def = createContext<AudioContextProps>(null!)
const MemoryContext = createContext<MemoryContextProps>(null!)

export {
    AudioContext_Def,
    MemoryContext
}
