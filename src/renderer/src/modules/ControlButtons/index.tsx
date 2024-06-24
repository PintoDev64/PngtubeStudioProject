// Modules
import { useContext } from 'react';
// Context
import { AvatarsContext, MemoryContext } from '@renderer/context';
// Icons
import Avatars from '@renderer/assets/icons/Avatars';

export default function ControlButtons() {

    const { AvatarsState, ModifyState: ModifyAvatars } = useContext(AvatarsContext)
    const { MemoryState, ModifyState } = useContext(MemoryContext);

    return (
        <div id="FooBar-LateralLeft">
            <a target='_blank' href='https://pintogamer64.itch.io/pngtubemini-modeleditor' className="FooBar-LateralLeft-ButtonExtended">
                Crear un Modelo
            </a>
            {
                AvatarsState.Data[AvatarsState.Select - 1].Data.States.length > 1 && AvatarsState.Data[AvatarsState.Select - 1].Data.States.map((_imageBase64, index) =>
                    <button key={index + 1} className={`FooBar-LateralLeft-Button ${AvatarsState.State === index && "FooBar-LateralLeft-Button-Selected"}`}
                        onClick={() => {
                            console.log(index);
                            AvatarsState.State !== index && ModifyAvatars({
                                action: 'State',
                                value: index
                            })
                        }}
                    >
                        <h2>{index + 1}</h2>
                    </button >
                )
            }
            <button className="FooBar-LateralLeft-Button"
                onClick={() => ModifyState({
                    action: 'AvatarsShowcase',
                    value: !MemoryState.AvatarsShowcase
                })}>
                <Avatars />
            </button>
        </div >
    )
}