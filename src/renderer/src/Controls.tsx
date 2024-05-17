// Components
import ControlButtons from "./modules/ControlButtons";
import Microphone from "./modules/Microphone";

export default function Controls() {

    return (
        <footer id="FooBar">
            <div id="FooterBar_Microphone">
                <Microphone />
            </div>
            <div id="FooterBar_Controls">
                <ControlButtons />
            </div>
        </footer>
    )
}