// Modules
import { useContext } from "react";
// Assets
import Close from "./assets/icons/Close";
import EnterFullscreen from "./assets/icons/FullScreen";
import MaxMin from "./assets/icons/MaxMin";
import Minimize from "./assets/icons/Minimize";
import SettingsIcon from "./assets/icons/Settings";
// Utilitys
import { WindowAPI } from "./utils";
// Contexts
import { MemoryContext } from "./context";
// Events
import useEventsDefinitios from "./events";

export default function Header() {

    useEventsDefinitios()

    const { CloseWindow, MinMaxWindow, MinimizeWindow, ZoomPlus, ZoomMinus } = WindowAPI()

    const { MemoryState, ModifyState } = useContext(MemoryContext)

    function SettingsRequest() {
        ModifyState({
            action: "Settings",
            value: !MemoryState.Settings
        })
        ModifyState({
            action: "SettingRouter",
            value: "Appareance"
        })
    }

    function FullscreenRequest() {
        ModifyState({
            action: "Fullscreen",
            value: !MemoryState.Fullscreen
        })
    }

    return (
        <header id="PngtubeStudio_Header">
            <div id="PngtubeStudio_HeaderButtons">
                <button className="PngtubeStudio_HeaderButtons_Elements" id="ZoomMinusButton" onClick={ZoomMinus}>
                    <Minimize />
                </button>
                <button className="PngtubeStudio_HeaderButtons_Elements" id="ZoomPlusButton" onClick={ZoomPlus}>
                    <Close />
                </button>
                <button className="PngtubeStudio_HeaderButtons_Elements" id="SettingsButton" onClick={SettingsRequest}>
                    <SettingsIcon />
                </button>
                <button className="PngtubeStudio_HeaderButtons_Elements" id="FullScreenButton" onClick={FullscreenRequest}>
                    <EnterFullscreen />
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