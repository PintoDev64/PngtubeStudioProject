// Types
import { SelectType } from "@renderer/types/components";
// Contants
import Contants from "../../constants";

export default function Select({
    Complement,
    Execute
}: SelectType
) {

    const { consts } = Contants();

    return (
        <div className="OptionsElement">
            <div className="OptionsElement-Data">
                <h2>{Complement.Text}</h2>
                <p> {Complement.Definition} </p>
            </div>
            <div className="OptionsElement-Execution">
                <select value={Complement.value} className="OptionsElement-Execution-Select" onChange={(ev) => {
                    if (`${Complement.value}` !== ev.target.value) {
                        Execute(ev.target.value)
                    }
                }}>
                    {
                        consts.VoiceFftsizes.map(value => <option key={value} value={value}>{value}</option>)
                    }
                </select>
            </div>
        </div>
    )
}