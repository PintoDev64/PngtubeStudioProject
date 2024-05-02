import { readFileSync, unlink, existsSync, writeFile } from "node:fs";
import { IntDownloadFiles } from "../types";
import { get } from "node:https";
import { homedir } from "node:os";
import { join } from "node:path";
import { createCipheriv, createDecipheriv } from "node:crypto";
import { BrowserWindow, dialog } from "electron";

export function DownloadFiles({
    DownloadUrl,
    FileStream,
    FileLocation
}: IntDownloadFiles) {
    get(DownloadUrl, (response) => {
        if (response.statusCode !== 200) return;

        response.pipe(FileStream)

        FileStream.on('finish', () => {
            console.log('Archivo descargado y copiado con exito');
        });

        FileStream.on('error', (err) => {
            unlink(FileLocation, () => {
                console.error('Error al escribir el archivo:', err);
            });
        });
    }).on('error', (err) => {
        console.error('Error al descargar el archivo:', err);
    });
}

export const ReadPasswords: () => Promise<{ key: Buffer, iv: Buffer }> = () => {
    return new Promise((resolve, reject) => {
        existsSync(join(homedir(), 'AppData\\Roaming\\PNGtubeSettings\\bin')) && (() => {
            const searchPath = join(homedir(), 'AppData\\Roaming\\PNGtubeSettings\\bin')
            const JSONvalue: string = readFileSync(
                searchPath,
                {
                    encoding: 'utf-8'
                }
            )
    
            const result = JSON.parse(JSONvalue);
    
            resolve({
                key: Buffer.from(result.key, 'hex'),
                iv: Buffer.from(result.iv, 'hex'),
            })
    
            reject("no reasean available")
        })()
    })
}

export async function EncriptData(key: Buffer, iv: Buffer, data: string) {
    try {
        // Crear un objeto Cipher usando el algoritmo AES-256-CBC
        const cipher = createCipheriv('aes-256-cbc', key, iv);

        // Actualizar el cipher con el contenido del JSON y finalizar el cifrado
        const encryptedData = Buffer.concat([cipher.update(data, 'utf-8'), cipher.final()]);

        // Escribir el archivo cifrado
        return encryptedData
    } catch (error: any) {
        console.error('Error al encriptar el archivo JSON:', error.message);
        return
    }
}

export async function DecryptData(fileLoc: string, key: Buffer, iv: Buffer) {
    try {
        // Leer el contenido del archivo cifrado
        const encryptedData = readFileSync(fileLoc);

        // Crear un objeto Decipher usando el algoritmo AES-256-CBC
        const decipher = createDecipheriv('aes-256-cbc', key, iv);

        // Actualizar el decipher con el contenido cifrado y finalizar el descifrado
        const decryptedData = Buffer.concat([decipher.update(encryptedData), decipher.final()]);

        // Convertir la cadena descifrada a objeto JSON
        const decryptedJson: JSON = JSON.parse(decryptedData.toString('utf-8'));

        return decryptedJson
    } catch (error: any) {
        console.error('Error al desencriptar el archivo JSON:', error.message);
        return
    }
}

export function ImageBase64(img: string) {
    const bitmapImage = readFileSync(img)
    return `data:image/png;base64,${Buffer.from(bitmapImage).toString('base64')}`;
}

export function ReadFileBynari(path: string, callback: (responce: any) => void) {
    ReadPasswords()
        .then(async (value) => {
            let res = await DecryptData(
                path,
                value.key,
                value.iv,
            ).catch(() => console.log("Error al leer el archivo"))
            callback(res)
        })
        .catch(() => console.log("Failed to get Settings"))
}

export function WriteFileBynari(path: string, _data: any, callback: (responce: boolean, data?: any) => void) {
    ReadPasswords()
        .then(async ({ iv, key }) => {
            const response = await EncriptData(key, iv, JSON.stringify(_data))
                .catch(() => console.log("Error al leer el archivo"))
            if (response) {
                writeFile(
                    path,
                    response,
                    (err) => {
                        if (err) {
                            callback(false)
                        } else {
                            ReadFileBynari(
                                path,
                                (response) => callback(true, response)
                            )

                        }
                    }
                )
            }
        })
        .catch(() => console.log("Failed to set Settings"))
}

export function RequestFileText<T>(WindowSelector: BrowserWindow, title: string, label:string, name: string, extensions: string[]): T {
    const FilePath = dialog.showOpenDialogSync(WindowSelector, {
        title,
        buttonLabel: label,
        properties: ["openFile"],
        filters: [{
            extensions,
            name
        }]
    })
    if (FilePath) return readFileSync(FilePath[0], { encoding: 'utf-8' }) as T
    else return null as T
}

export function isVersionGreater(version1, version2) {
    const parts1 = version1.split('.').map(Number);
    const parts2 = version2.split('.').map(Number);

    for (let i = 0; i < Math.max(parts1.length, parts2.length); i++) {
        const part1 = parts1[i] || 0;
        const part2 = parts2[i] || 0;

        if (part1 > part2) {
            return true;
        } else if (part1 < part2) {
            return false;
        }
    }

    // Si las versiones son iguales, devuelve false
    return false;
}