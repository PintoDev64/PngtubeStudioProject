import { useContext, useState } from "react"
import { MemoryContext, SettingsContext } from "../context"
import { SettingsAPI } from "@renderer/utils";

export default function useSaveSettings() {

    const { SettingsState, ModifyAll } = useContext(SettingsContext);
    const { MemoryState, ModifyState } = useContext(MemoryContext);
    const [SaveResponce, setSaveResponce] = useState(true)
    const { SendSettings } = SettingsAPI();

    function Compare() {
        return JSON.stringify(MemoryState.SettingsPreload) === JSON.stringify(SettingsState)
            ? true
            : false
    }

    function Discard() {
        ModifyAll(MemoryState.SettingsPreload)
    }

    function Save() {
        let responce = SendSettings(SettingsState)
        if (responce) {
            ModifyState({
                action: 'SettingsPreload',
                value: SettingsState
            })
            setSaveResponce(true)
        } else {
            setSaveResponce(false)
        }
    }

    return {
        Compare,
        Discard,
        Save,
        SaveResponce
    }

}