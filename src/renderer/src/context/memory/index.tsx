// Modules
import { useContext, useReducer } from 'react';

import { MemoryContext, SettingsContext} from "..";
import { AppAPI, WallpapersAPI } from '@renderer/utils';
import { Contextinterface } from '../types';
import { DefaultValuesMemory, typeMemoryReducerSettings } from './types';

export default function MemoryProvider({ children }: Contextinterface) {

    const { AppDetails } = AppAPI()
    const { Receiver } = WallpapersAPI()

    const { SettingsState } = useContext(SettingsContext);

    const DefaultValues: DefaultValuesMemory = {
        Fullscreen: false,
        Settings: false,
        SettingRouter: 'Appareance',
        AvatarsShowcase: false,
        AppDetails: AppDetails(),
        SettingsPreload: SettingsState,
        Wallpapers: Receiver()
    }

    function reducer(state: DefaultValuesMemory, { action, value }: typeMemoryReducerSettings) {
        return {
            ...state,
            [action]: value
        }
    }

    const [state, dispatch] = useReducer(reducer, DefaultValues);

    function ModifyState({ action, value }: typeMemoryReducerSettings): void {
        dispatch({
            action,
            value
        })   
    }

    return (
        <MemoryContext.Provider value={{
            MemoryState: state,
            ModifyState
        }}>
            {children}
        </MemoryContext.Provider>
    )
}