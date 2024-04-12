// Modules
import { useContext } from 'react';
// Context
import { MemoryContext } from '@renderer/context';
// Icons
import Avatars from '@renderer/assets/icons/Avatars';

export default function ControlButtons() {

    const { MemoryState, ModifyState } = useContext(MemoryContext);

    return (
        <div id="FooBar-LateralLeft">
            <button className="FooBar-LateralLeft-Button"
                onClick={() => ModifyState({
                    action: 'AvatarsShowcase',
                    value: !MemoryState.AvatarsShowcase
                })}>
                <Avatars />
            </button>
        </div>
    )
}