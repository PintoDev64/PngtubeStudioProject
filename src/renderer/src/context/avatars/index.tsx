import { Contextinterface } from "@renderer/types";
import { TypeModelsConfig, typeModelReducerSettings } from "@renderer/types/context";
import { AvatarsAPI } from "@renderer/utils";
import { useReducer } from "react";
import { AvatarsContext } from "..";

export default function AvatarsProvider({ children }: Contextinterface) {

    const { Receiver } = AvatarsAPI();

    const DefaultValues: TypeModelsConfig = {
        Data: Receiver(),
        Select: 1
    }

    function reducer(state: TypeModelsConfig, { action, value }: typeModelReducerSettings) {
        return {
            ...state,
            [action]: value
        }
    }

    const [state, dispatch] = useReducer(reducer, DefaultValues);

    function ModifyState({ action, value }: typeModelReducerSettings): void {
        dispatch({
            action,
            value
        })   
    }

    return (
        <AvatarsContext.Provider value={{
            AvatarsState: state,
            ModifyState
        }}>
            {children}
        </AvatarsContext.Provider>
    )
}