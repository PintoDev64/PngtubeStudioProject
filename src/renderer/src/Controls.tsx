// Components
import ControlButtons from "./components/ControlButtons";
import Microphone from "./components/Microphone";

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