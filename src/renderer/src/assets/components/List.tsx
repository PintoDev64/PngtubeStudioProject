import Close from "@renderer/assets/icons/Close"
import { MemoryContext } from "@renderer/context"
import { ListType } from "@renderer/assets/components/types"
import { WallpapersAPI } from "@renderer/utils"
import { ChangeEvent, useContext, useRef } from "react"

export default function ListComponent({
    Complement,
    Execute
}: ListType) {
    const { ModifyState } = useContext(MemoryContext);

    const { Send } = WallpapersAPI()

    const InputFileRef = useRef<HTMLInputElement>(null!)

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            ModifyState({
                action: 'Wallpapers',
                value: Send([
                    {
                        Name: e.target.files[0].name,
                        Source: e.target.files[0].path,
                        Type: "Custom"
                    }
                ])
            })
        }
    };

    return (
        <div className="OptionsElementList">
            <input type="file" hidden ref={InputFileRef} onChange={handleFileChange} accept=".png, .jpeg, .jpg" />
            <div className="OptionsElement-DataList">
                <h2>{Complement.Text}</h2>
                <p> {Complement.Definition} </p>
            </div>
            <div className="OptionsElement-List">
                {
                    Complement.Elements?.map(({ IdElement, ImageElement, TextElement, DefinitionElement }) => {
                        return (
                            <div key={IdElement} className="OptionsElement-ListElement" onClick={() => {
                                Execute.Main({
                                    id: IdElement,
                                    name: TextElement
                                })
                            }}>
                                <div className="OptionsElement-ListElementImage">
                                    <img src={ImageElement} />
                                </div>
                                <div className="OptionsElement-ListElementData">
                                    <h2>{TextElement}</h2>
                                    <p>{DefinitionElement}</p>
                                </div>
                                <div className="OptionsElement-ListElementAction">
                                    <button onClick={() => { Execute.Secundary(IdElement) }} style={{
                                        display: DefinitionElement === "Default" ? "none" : "grid"
                                    }}>
                                        <Close />
                                    </button>
                                </div>
                            </div>
                        )
                    }
                    )
                }
                <div id="OptionsElement-ListElement-Add" style={{ display: Complement.value ? "grid" : "none" }}>
                    <button onClick={() => {
                        console.log("Añadir imagen")
                        InputFileRef.current.click()
                    }}>
                        <Close />
                        <p>Añadir un fondo</p>
                    </button>
                </div>
            </div>
        </div>
    )
}