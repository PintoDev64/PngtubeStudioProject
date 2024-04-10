import { writeFile } from "fs"
import { DecryptData, EncriptData, ReadPasswords } from "../../utils"

export function ReadFileBynari(path: string, callback: (responce: any) => void) {
    ReadPasswords
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

export function WriteFileBynari(path: string, _data: any, callback: (responce: boolean) => void) {
    ReadPasswords
        .then(async ({ iv, key }) => {
            const response = await EncriptData(key, iv, JSON.stringify(_data))
                .catch(() => console.log("Error al leer el archivo"))
            if (response) {
                writeFile(
                    path,
                    response,
                    (err) => {
                        if (err) callback(false)
                        else callback(true)
                    }
                )
            }
        })
        .catch(() => console.log("Failed to set Settings"))
}