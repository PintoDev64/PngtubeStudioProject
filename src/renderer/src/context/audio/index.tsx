import { useReducer } from "react";

// Context
import { AudioContext_Def } from "..";
import { TypeAudioConfig, TypeAudioReducerSettings } from "./types";
import { Contextinterface } from "@renderer/env";

// Types


export default function AudioProvider({ children }: Contextinterface) {

    const DefaultValues: TypeAudioConfig = {
        Amplifier: 100,
        Sensibility: 50,
        State: true
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