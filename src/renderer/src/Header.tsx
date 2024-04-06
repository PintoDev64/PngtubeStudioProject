// Assets
import Close from "./assets/icons/Close";
import MaxMin from "./assets/icons/MaxMin";
import Minimize from "./assets/icons/Minimize";
import SettingsIcon from "./assets/icons/Settings";
import { PngtubeStudioAPI } from "./utils";

export default function Header() {

    const { CloseWindow, MinMaxWindow, MinimizeWindow } = PngtubeStudioAPI()

    return (
        <header id="PngtubeStudio_Header">
            <div id="PngtubeStudio_HeaderButtons">
                <button className="PngtubeStudio_HeaderButtons_Elements" id="Settings">
                    <SettingsIcon />
                </button>
            </div>
            <div id="PngtubeStudio_HeaderName">
                <h1>PngtubeStudio</h1>
            </div>
            <div id="PngtubeStudio_HeaderControls">
                <button className="PngtubeStudio_HeaderControls_Elements" id="Minimize" onClick={MinimizeWindow}>
                    <Minimize />
                </button>
                <button className="PngtubeStudio_HeaderControls_Elements" id="MaxMin" onClick={MinMaxWindow}>
                    <MaxMin />
                </button>
                <button className="PngtubeStudio_HeaderControls_Elements" id="Close" onClick={CloseWindow}>
                    <Close />
                </button>
            </div>
        </header>
    )
}