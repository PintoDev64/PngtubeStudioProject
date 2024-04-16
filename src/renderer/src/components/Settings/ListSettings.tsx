// Components
import { useContext } from "react";
import SettingsListPropagator from "../packages/SettingsPorpagator";

// Extra
import Logo from '@renderer/assets/Logo.png'
import { MemoryContext } from "@renderer/context";
import { GithubIcon } from "@renderer/assets/icons/Github";

export default function ListSettings() {

    const { MemoryState } = useContext(MemoryContext)

    return (
        <aside id="SettingsList">
            <div id="SettingsList-Content">
                <picture id="SettingsList-Content-Image">
                    <img src={Logo} alt="PngutbeStudio" id="SettingsList-Content-Image-Element" />
                </picture>
                <div id="SettingsList-Content-Scroll">
                    <SettingsListPropagator />
                </div>
                <div id="Settings-Info">
                    <a href="https://github.com/PintoGamer64/PngtubeStudioProject/releases" target="_blank" rel="noopener noreferrer"><GithubIcon /><p><b>Version: {MemoryState.AppDetails.AppVersion}</b></p></a>
                </div>
            </div>
        </aside>
    )
}