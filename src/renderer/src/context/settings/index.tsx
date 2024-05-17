// Modules
import { useReducer } from "react";
import { TypeSettingsReducerSettings } from "./types";
// Types
import { Contextinterface } from "@renderer/types";
// Context
import { SettingsContext } from "..";
// Utils
import { SettingsAPI } from "@renderer/utils";

export default function SettingsProvider({ children }: Contextinterface) {

    const { ReceiveSettings } = SettingsAPI();

    const { Avatars, Config, Model, Resources } = ReceiveSettings();

    const DefaultValues: TypeBaseConfig = {
        Model,
        Resources,
        Avatars,
        Config
    }

    function reducer(state: TypeBaseConfig, { action, value }: TypeSettingsReducerSettings) {
        return {
            ...state,
            [action]: value
        }
    }

    const [state, dispatch] = useReducer(reducer, DefaultValues);

    function ModifyState({ action, value }: TypeSettingsReducerSettings): void {
        dispatch({
            action,
            value
        })
    }

    function ModifyAll(value: TypeBaseConfig): void {
        dispatch({
            action: 'Config',
            value: value.Config
        })
        dispatch({
            action: 'Model',
            value: value.Model
        })
        dispatch({
            action: 'Avatars',
            value: value.Avatars
        })
        dispatch({
            action: 'Resources',
            value: value.Resources
        })
    }

    return (
        <SettingsContext.Provider value={{
            SettingsState: state,
            ModifyState,
            ModifyAll
        }}>
            {children}
        </SettingsContext.Provider>
    )
}