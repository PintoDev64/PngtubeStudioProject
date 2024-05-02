// Node Modules
import { mkdirSync, writeFileSync, existsSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

import icon from '../../resources/Ookami.ico?asset'

// Types
import { TypeBaseConfig, TypeModelsConfig, TypeWallpaperConfig } from "./types";
import { Routes, pathsConfig } from "./constants";
import { EncriptData, ReadPasswords, } from "./utils";
import { randomBytes } from "node:crypto";
import { Ookami, Ookami2, DefaultBg } from "./assets";
import { Notification } from "electron";

export default function InitProcess() {

    const NOTIFICATION_TITLE = 'Configuracion Creada'
    const NOTIFICATION_BODY = 'Vuelve a abrir el programa'

    const KeyValuesDecripters = {
        key: randomBytes(32),
        iv: randomBytes(16)
    }

    const baseConfig: TypeBaseConfig = {
        /* Wallpapers: `${join(homedir(), 'AppData\\Roaming\\PNGtubeSettings\\Wallpapers')}`, */
        Avatars: `${join(homedir(), 'AppData\\Roaming\\PNGtubeSettings\\avatars')}`,
        Model: 'Ookami',
        Config: {
            Integrations: {
                Discord: true
            },
            AudioFftsize: 128,
            hardwareAcceleration: true,
            NoiseSupression: true,
            EchoCancellation: true,
            trayMenu: true,
            Custom: {
                audioLevel: true,
                type: 'Color', // Color | Image
                colorBackground: '#00ff00', // Hex
                wallpaper: 'Base', // Wallpaper File Name
                brightness: 100
            }
        }
    }
    const modelsConfig: TypeModelsConfig = [
        {
            Id: 1,
            Name: "Ookami",
            Owner: "PintoGamer64",
            Date: "2023-03-15T05:00:00.000Z",
            Image: Ookami,
            Data: {
                States: [
                    [Ookami, Ookami2]
                ]
            },
            URL: "https://github.com/PintoGamer64"
        }
    ];
    const wallpaperConfig: TypeWallpaperConfig = [
        {
            Name: "Base",
            Type: "Default",
            Source: DefaultBg
        }
    ]

    async function CreateConfigDirectories(): Promise<void> {
        try {
            for (const path of pathsConfig) {
                if (!existsSync(path)) {
                    mkdirSync(path);
                }
            }
        } catch (error) {
            console.log("Failed To Create Directories", error);
        }
    }

    // Create Passwords To Encript o Desencrypt Files
    async function GeneratePasswords(): Promise<void> {
        try {
            !existsSync(Routes.Bin) && writeFileSync(
                Routes.Bin,
                Buffer.from(
                    JSON.stringify(KeyValuesDecripters)
                )
            )
        } catch (error) {
            console.log("Failed To Generate Passwords", error);
        }
    }

    async function CreateConfigBase(iv: Buffer, key: Buffer): Promise<void> {
        try {
            if (!existsSync(Routes.Settings)) {
                const encryptedData = await EncriptData(
                    key,
                    iv,
                    JSON.stringify(baseConfig, null, 4)
                );
                if (encryptedData) {
                    writeFileSync(Routes.Settings, encryptedData, { encoding: "utf-8" });
                }
            }
        } catch (error) {
            console.log("Failed To Create Config Base", error);
        }
    }

    async function CreateConfigModels(iv: Buffer, key: Buffer): Promise<void> {
        try {
            if (!existsSync(Routes.Avatars)) {
                const encryptedData = await EncriptData(
                    key,
                    iv,
                    JSON.stringify(modelsConfig, null, 4)
                );
                if (encryptedData) {
                    writeFileSync(Routes.Avatars, encryptedData, { encoding: "utf-8" });
                }
            }
        } catch (error) {
            console.log("Failed To Create Config Models", error);
        }
    }

    async function CreateWallpapers(iv: Buffer, key: Buffer): Promise<void> {
        try {
            if (!existsSync(Routes.Wallpapers)) {
                const encryptedData = await EncriptData(
                    key,
                    iv,
                    JSON.stringify(wallpaperConfig, null, 4)
                );
                if (encryptedData) {
                    writeFileSync(Routes.Wallpapers, encryptedData, { encoding: "utf-8" });
                }
            }
        } catch (error) {
            console.log("Failed To Create Config Models", error);
        }
    }

    async function __Init__() {
        if (!existsSync(Routes.Bin)) {
            try {
                await CreateConfigDirectories();
                console.log("Execute CreateConfigDirectories");
                await GeneratePasswords();
                console.log("Execute GeneratePasswords");
                await CreateConfigBase(KeyValuesDecripters.iv, KeyValuesDecripters.key);
                console.log("Execute CreateConfigBase");
                await CreateConfigModels(KeyValuesDecripters.iv, KeyValuesDecripters.key);
                console.log("Execute CreateConfigModels");
                await CreateWallpapers(KeyValuesDecripters.iv, KeyValuesDecripters.key);
                console.log("Execute CreateWallpapers");
                console.log("Execute Application");
                new Notification({
                    title: NOTIFICATION_TITLE,
                    body: NOTIFICATION_BODY,
                    icon
                }).show()
            } catch (error) {
                console.error("Error:", error);
            }
        } else {
            try {
                ReadPasswords()
                    .then(async ({ iv, key }) => {
                        await CreateConfigBase(iv, key);
                        console.log("Execute CreateConfigBase");
                        await CreateConfigModels(iv, key);
                        console.log("Execute CreateConfigModels");
                        await CreateWallpapers(iv, key);
                        console.log("Execute CreateWallpapers");
                        console.log("Execute Application");
                        new Notification({
                            title: NOTIFICATION_TITLE,
                            body: NOTIFICATION_BODY,
                            icon
                        }).show()
                    })
            } catch (error) {
                console.error("Error:", error);
            }
        }
    }

    return {
        __Init__
    }
}