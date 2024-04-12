import { homedir } from "os"
import { join } from "path"

export const pathsConfig = [
    join(homedir(), 'AppData\\Roaming\\PNGtubeSettings'),
    join(homedir(), 'AppData\\Roaming\\PNGtubeSettings\\Logs'),
    /* join(homedir(), 'AppData\\Roaming\\PNGtubeSettings\\Wallpapers'), */
]

export const Routes = {
    Bin: join(homedir(), 'AppData\\Roaming\\PNGtubeSettings\\bin'),
    Settings: join(homedir(), 'AppData\\Roaming\\PNGtubeSettings\\settings'),
    Avatars: join(homedir(), 'AppData\\Roaming\\PNGtubeSettings\\avatars')
}