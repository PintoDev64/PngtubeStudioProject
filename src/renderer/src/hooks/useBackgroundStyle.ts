// Modules
import { useContext } from 'react';

// Contexts
import { MemoryContext, SettingsContext } from "../context";

export default function useBackgroundStyle() {

    const { MemoryState } = useContext(MemoryContext);

    const { SettingsState } = useContext(SettingsContext);

    const responceURLWallpaper = MemoryState.Wallpapers.find(({ Name }) => {
        return Name === SettingsState.Config.Custom.wallpaper
    });

    let responceStyle;
    if (SettingsState.Config.Custom.type === 'Color') {
        responceStyle = {
            background: SettingsState.Config.Custom.colorBackground
        }
    } else {
        responceStyle = {
            backgroundImage: `url("${responceURLWallpaper?.Source}")`,
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