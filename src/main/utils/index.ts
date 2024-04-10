import { readFileSync, unlink, existsSync } from "node:fs";
import { IntDownloadFiles } from "../types";
import { get } from "node:https";
import { homedir } from "node:os";
import { join } from "node:path";
import { createCipheriv, createDecipheriv } from "node:crypto";

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

export const ReadPasswords: Promise<{ key: Buffer, iv: Buffer }> = new Promise((resolve, reject) => {
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