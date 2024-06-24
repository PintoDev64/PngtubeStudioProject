// Modules
import { useContext, useEffect, useState } from "react";
// Assets
import Close from "./assets/icons/Close";
import EnterFullscreen from "./assets/icons/FullScreen";
import MaxMin from "./assets/icons/MaxMin";
import Minimize from "./assets/icons/Minimize";
import SettingsIcon from "./assets/icons/Settings";
// Utilitys
import { AppAPI, WindowAPI } from "./utils";
// Contexts
import { MemoryContext } from "./context";
// Events
import useEventsDefinitios from "./events";
import DownloadIcon from "./assets/icons/Download";

export default function Header() {

    const [Updates, setUpdates] = useState<boolean>(false)

    useEventsDefinitios()

    const { CloseWindow, MinMaxWindow, MinimizeWindow, ZoomPlus, ZoomMinus } = WindowAPI();
    const { AppUpdates } = AppAPI();

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

    useEffect(() => {
        console.log("timer started");
        const inter = setInterval(() => AppUpdates((version) => {
            console.log(version);
            setUpdates(version)
        }), 150000)
        return () => clearInterval(inter)
    }, [])

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
                {
                    Updates && <div className="PngtubeStudio_HeaderControls_Elements" id="Download">
                        <DownloadIcon />
                    </div>
                }
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