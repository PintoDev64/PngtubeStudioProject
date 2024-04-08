import { useReducer } from "react";

// Context
import { AudioContext_Def } from "..";

// Types
import { TypeAudioConfig, TypeAudioReducerSettings } from "@renderer/types/context";
import { Contextinterface } from "@renderer/types";

export default function AudioProvider({ children }: Contextinterface) {

    const DefaultValues: TypeAudioConfig = {
        Amplifier: 100,
        Sensibility: 50,
        State: true,
        FftSize: 32
    }

    function reducer(state: TypeAudioConfig, { action, value }: TypeAudioReducerSettings) {
        return {
            ...state,
            [action]: value
        }
    }

    const [state, dispatch] = useReducer(reducer, DefaultValues);

    function ModifyState({ action, value }: TypeAudioReducerSettings): void {
        dispatch({
            action,
            value
        })
    }

    return (
        <AudioContext_Def.Provider value={{
            AudioState: state,
            ModifyState
        }}>
            {children}
        </AudioContext_Def.Provider>
    )
}