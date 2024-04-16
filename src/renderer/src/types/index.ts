import { ReactNode } from "react"

export type TypeBaseConfig = {
    Resources: string,
    Model: string,
    Avatars: string,
    Config: {
        AudioFftsize:  32 | 64 | 128 | 256 | 512 | 1024 | 2048 | 4096,
        hardwareAcceleration: boolean,
        NoiseSupression: boolean,
        EchoCancellation: boolean,
        trayMenu: boolean,
        Custom: {
            audioLevel: boolean,
            type: 'Color' | 'Image',
            colorBackground: `#${string}`,
            wallpaper: string,
            brightness: number
        }
    }
}

export type TypeModelConfigBase = {
    Id: number,
    Name: string,
    Owner: string,
    Date: string,
    Image: string,
    Data: {
        States: [
            string[]
        ]
    },
    URL: string
}[]

export interface Contextinterface {
    children: ReactNode
}