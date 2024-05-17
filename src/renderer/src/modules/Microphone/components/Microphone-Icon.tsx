import { MicrophoneClose, MicrophoneOpen } from '@renderer/assets/icons/Microphone';
import { AudioContext_Def } from '@renderer/context';
import { useContext } from 'react';

// Imports


export default function MicrophoneIconButton() {

    const { AudioState, ModifyState } = useContext(AudioContext_Def);

    return (
        <button id="FooBar-Microphone-Button" onClick={() => ModifyState({
            action: 'State',
            value: !AudioState.State
        })}>
            {AudioState.State ? <MicrophoneOpen /> : <MicrophoneClose />}
        </button>
    )
}