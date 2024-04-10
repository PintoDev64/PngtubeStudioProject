import { AvatarsContext, MemoryContext } from "@renderer/context";
import { useContext } from "react";

export default function AvatarsShowcase() {

    const { AvatarsState, ModifyState } = useContext(AvatarsContext);
    const { MemoryState } = useContext(MemoryContext);

    return (
        <aside id="AvatarShowcase" className={MemoryState.AvatarsShowcase ? "AvatarShowcase-Active" : "AvatarShowcase-Desactive"}>
            <ul id="AvatarShowcase-List">
                {/* <li className="AvatarShowcase-List-Elements" onClick={() => {
                    LoadFile();
                    location.reload()
                }}>
                    <AddModel />
                    <p className="AvatarShowcase-List-AvatarName">Añadir</p>
                </li> */}
                {
                    AvatarsState.Data.map(({ Name, Id, Image }) =>
                        <li key={Id} className="AvatarShowcase-List-Elements" onClick={() => {
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
            </ul>
        </aside>
    )
}