import { useContext, useReducer } from "react";

// Context
import { AudioContext_Def, SettingsContext } from "..";

// Types
import { TypeAudioConfig, TypeAudioReducerSettings } from "@renderer/types/context";
import { Contextinterface } from "@renderer/types";

export default function AudioProvider({ children }: Contextinterface) {

    const { SettingsState } = useContext(SettingsContext);

    const DefaultValues: TypeAudioConfig = {
        Amplifier: 100,
        Sensibility: 50,
        State: true,
        NoiseSupression: SettingsState.Config.NoiseSupression,
        EchoCancellation: SettingsState.Config.EchoCancellation,
        FftSize: SettingsState.Config.AudioFftsize
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