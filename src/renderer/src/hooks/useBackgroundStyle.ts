// Modules
import { useContext } from 'react';

// Contexts
import { SettingsContext } from "../context";

// Utils
import { ResolveRouteRight } from "../utils";

export default function useBackgroundStyle() {

    let Route: string = "example"

    const { SettingsState } = useContext(SettingsContext);

    const responceURLWallpaper = ResolveRouteRight(Route);
    
    let responceStyle;
    if (SettingsState.Config.Custom.type === 'Color') {
        responceStyle = {
            background: SettingsState.Config.Custom.colorBackground
        }
    } else {
        responceStyle = {
            backgroundImage: `url("${responceURLWallpaper}")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            backgroundAttachment: 'fixed',
            backgroundSize: 'cover',
            filter: ''
        }
    }
    if (Math.floor(SettingsState.Config.Custom.brightness) !== 100) {
        responceStyle.filter = `brightness(${SettingsState.Config.Custom.brightness}%)`
    }
    return responceStyle;
}