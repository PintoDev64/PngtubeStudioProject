// Modules
import { useReducer } from 'react';

import { MemoryContext} from "..";
import { Contextinterface } from '@renderer/types';
import { DefaultValuesMemory, typeMemoryReducerSettings } from '@renderer/types/context';

export default function MemoryProvider({ children }: Contextinterface) {

    const DefaultValues: DefaultValuesMemory = {
        Fullscreen: false,
        Settings: false,
        SettingRouter: 'Appareance',
        AvatarsShowcase: false,
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

    console.log(state);
    

    return (
        <MemoryContext.Provider value={{
            MemoryState: state,
            ModifyState
        }}>
            {children}
        </MemoryContext.Provider>
    )
}