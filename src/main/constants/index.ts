import { homedir } from "os"
import { join } from "path"

export const pathsConfig = [
    join(homedir(), 'AppData\\Roaming\\PNGtubeSettings'),
    join(homedir(), 'AppData\\Roaming\\PNGtubeSettings\\Logs')
]

export const Routes = {
    Bin: join(homedir(), 'AppData\\Roaming\\PNGtubeSettings\\bin'),
    Settings: join(homedir(), 'AppData\\Roaming\\PNGtubeSettings\\settings'),
    Avatars: join(homedir(), 'AppData\\Roaming\\PNGtubeSettings\\avatars'),
    Wallpapers: join(homedir(), 'AppData\\Roaming\\PNGtubeSettings\\wallpapers')
}