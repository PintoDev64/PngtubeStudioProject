import { createContext } from "react";

// Types
import { AudioContextProps } from "@renderer/types/context";

const AudioContext_Def = createContext<AudioContextProps>(null!)

export {
    AudioContext_Def
}
