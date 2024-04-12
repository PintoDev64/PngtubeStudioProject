import { homedir } from "os"
import { join } from "path"

export const pathsConfig = [
    join(homedir(), 'AppData\\Roaming\\PNGtubeSettings'),
    join(homedir(), 'AppData\\Roaming\\PNGtubeSettings\\Logs'),
    join(homedir(), 'AppData\\Roaming\\PNGtubeSettings\\Avatars'),
    join(homedir(), 'AppData\\Roaming\\PNGtubeSettings\\Resources'),
    /* join(homedir(), 'AppData\\Roaming\\PNGtubeSettings\\Wallpapers'), */
    join(homedir(), 'AppData\\Roaming\\PNGtubeSettings\\Avatars\\Ookami')
]

export const DownloadModels = [
    {
        file: "Ookami.png",
        model: "Ookami",
        url: "https://raw.githubusercontent.com/PintoGamer64/PngtubeStudioProject/main/resources/Ookami/Ookami.png"
    },
    {
        file: "Ookami2.png",
        model: "Ookami",
        url: "https://raw.githubusercontent.com/PintoGamer64/PngtubeStudioProject/main/resources/Ookami/Ookami2.png"
    }
]

export const DownloadResourcesLink = [
    {
        file: "PNGtube_Logo_Github.png",
        url: "https://raw.githubusercontent.com/PintoGamer64/PngtubeStudioProject/main/resources/PNGtube_Logo_Github.png"
    },
    {
        file: "Logo.png",
        url: "https://raw.githubusercontent.com/PintoGamer64/PngtubeStudioProject/main/resources/Logo.png"
    }
]