/// <reference types="vite/client" />

import { ReactNode } from "react"

declare interface Contextinterface {
    children: ReactNode
}

declare type TypeBaseConfig = {
    Resources: string,
    Model: string,
    Avatars: string,
    Config: {
        Integrations: {
            Discord: boolean
        }
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

declare type TypeComplement = {
    Text: string,
    Definition: string,
    minLength?: number,
    maxLength?: number,
    steps?: number,
    Switch?: boolean,
    RequireRestart?: boolean,
    value?: string,
    Accept?: "Non-Drag" | "Drag",
    Actions?: "Delete" | "Select" | "Multi-Delete" | "Upload",
    Elements?: {
        IdElement: number,
        TextElement: string,
        ImageElement: string,
        DefinitionElement?: string
    }[]
}

declare type TypeModelConfigBase = {
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