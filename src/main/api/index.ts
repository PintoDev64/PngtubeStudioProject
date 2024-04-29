import { BrowserWindow, app, ipcMain } from "electron";
import { TypeBaseConfig, TypeModelsConfigIndividual, TypeWallpaperConfig } from "../types";
import { ImageBase64, ReadFileBynari, RequestFileText, WriteFileBynari } from "../utils";
import { existsSync } from "node:fs";
import { Routes } from "../constants";
import { exec } from "node:child_process";
import { join } from "node:path";

export default function API_Initializer(MainWindow: BrowserWindow) {
    ipcMain.on("AppDetails", _event => {
        _event.returnValue = {
            AppVersion: app.getVersion()
        }
    })
    // Ipc Events
    ipcMain.on("SettingsChecker", _event => {
        _event.returnValue = existsSync(Routes.Bin)
    })
    ipcMain.on("SettingsReceiver", _event => {
        ReadFileBynari(
            Routes.Settings,
            (responce: any) => {
                _event.returnValue = responce
            }
        )
    })
    ipcMain.on("SettingsSender", (_event, { _data }: { _data: TypeBaseConfig }) => {
        WriteFileBynari(
            Routes.Settings,
            _data,
            (responce) => {
                _event.returnValue = responce
            }
        )
    })
    ipcMain.on('ModelsReceiver', async _event => {
        ReadFileBynari(
            Routes.Avatars,
            responce => _event.returnValue = responce
        )
    })
    ipcMain.on('ModelsSender', async _event => {
        const newModel = RequestFileText<string>(MainWindow, "Selecciona tu modelo", "Cargar Modelo", "Modelo", ["json", "pngtubestudio"])

        if (newModel) {
            ReadFileBynari(Routes.Avatars, (response: TypeModelsConfigIndividual[]) => {
                response.push({
                    Id: response.length + 1,
                    ...JSON.parse(newModel)
                })
                WriteFileBynari(Routes.Avatars, response,
                    (_res, data) => _event.returnValue = data
                )
            }
            )
        } else {
            ReadFileBynari(
                Routes.Avatars,
                (response: TypeModelsConfigIndividual[]) => {
                    _event.returnValue = response
                }
            )
        }
    })
    ipcMain.on("WallpapersReceiver", _event => {
        ReadFileBynari(
            Routes.Wallpapers,
            response => _event.returnValue = response
        )
    })
    ipcMain.on("WallpapersSender", (_event, { newWallpaper }: { newWallpaper: TypeWallpaperConfig }) => {
        ReadFileBynari(
            Routes.Wallpapers,
            (response: TypeWallpaperConfig) => {
                response.push({
                    Name: newWallpaper[0].Name,
                    Source: ImageBase64(newWallpaper[0].Source),
                    Type: newWallpaper[0].Type
                })
                WriteFileBynari(
                    Routes.Wallpapers,
                    response,
                    (_res, data) => _event.returnValue = data
                )
            }
        )
    })
    ipcMain.on("WallpapersDeleter", (_event, { wallpaperIndex }: { wallpaperIndex: number }) => {
        ReadFileBynari(
            Routes.Wallpapers,
            (response: TypeWallpaperConfig) => {
                response.splice(wallpaperIndex, 1)
                WriteFileBynari(
                    Routes.Wallpapers,
                    response,
                    (_res, data) => _event.returnValue = data
                )
            }
        )
    })
}