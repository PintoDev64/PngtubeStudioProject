import { ReactNode } from "react"

export type TypeBaseConfig = {
    Resources: string,
    Wallpapers: string,
    Model: string,
    Avatars: string,
    Config: {
        AudioFftsize:  32 | 64 | 128 | 256 | 512 | 1024 | 2048 | 4096,
        hardwareAcceleration: boolean,
        trayMenu: boolean,
        Custom: {
            type: 'Color' | 'Image',
            colorBackground: `#${string}`,
            wallpaper: string,
            brightness: number
        }
    }
}

export interface Contextinterface {
    children: ReactNode
}