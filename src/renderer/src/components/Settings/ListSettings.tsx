// Components
import SettingsListPropagator from "../packages/SettingsPorpagator";

// Extra
import Logo from '@renderer/assets/Logo.png'

export default function ListSettings() {

    return (
        <aside id="SettingsList">
            <div id="SettingsList-Content">
                <picture id="SettingsList-Content-Image">
                    <img src={Logo} alt="PngutbeStudio" id="SettingsList-Content-Image-Element" />
                </picture>
                <div id="SettingsList-Content-Scroll">
                    <SettingsListPropagator />
                </div>
            </div>
        </aside>
    )
}