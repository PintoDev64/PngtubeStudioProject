import { WriteStream } from "node:fs"

export interface IntDownloadFiles {
    DownloadUrl: string,
    FileStream: WriteStream,
    FileLocation: string
}

export type TypeModelsConfigIndividual = {
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
}

export type TypeBaseConfig = {
    /* Wallpapers: string, */
    Model: string,
    Avatars: string,
    Config: {
        AudioFftsize:  32 | 64 | 128 | 256 | 512 | 1024 | 2048 | 4096,
        hardwareAcceleration: boolean,
        trayMenu: boolean,
        NoiseSupression: boolean,
        EchoCancellation: boolean,
        Custom: {
            type: 'Color' | 'Image',
            colorBackground: `#${string}`,
            /* wallpaper: string, */
            brightness: number
        }
    }
}

export type TypeModelsConfig = TypeModelsConfigIndividual[]