import AddModel from "@renderer/assets/icons/AddModel";
import { AvatarsContext, MemoryContext } from "@renderer/context";
import { AvatarsAPI } from "@renderer/utils";
import { useContext } from "react";

export default function AvatarsShowcase() {

    const { Send } = AvatarsAPI()

    const { AvatarsState, ModifyState } = useContext(AvatarsContext);
    const { MemoryState } = useContext(MemoryContext);

    return (
        <aside id="AvatarShowcase" className={MemoryState.AvatarsShowcase ? "AvatarShowcase-Active" : "AvatarShowcase-Desactive"}>
            <ul id="AvatarShowcase-List">
                {
                    AvatarsState.Data.map(({ Name, Id, Image }) =>
                        <li key={Id} className={`AvatarShowcase-List-Elements ${AvatarsState.Select === Id ? "AvatarShowcase-List-Element-Selected" : ""}`} onClick={() => {
                            if (AvatarsState.Select !== Id) {
                                ModifyState({
                                    action: "Select",
                                    value: Id
                                })
                            }
                        }}>
                            <img src={Image} alt={Name} className="AvatarShowcase-List-AvatarImage" width={50} height={50} />
                            <p className="AvatarShowcase-List-AvatarName">{Name}</p>
                        </li>
                    )
                }
                <li className="AvatarShowcase-List-Elements" onClick={() => {
                    ModifyState({
                        action: 'Data',
                        value: Send()
                    })
                }}>
                    <AddModel />
                    <p className="AvatarShowcase-List-AvatarName">Añadir</p>
                </li>
            </ul>
        </aside>
    )
}