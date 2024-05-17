// ------------ Avatars Context
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
export type TypeModifyModelState = ({ action, value }: typeModelReducerSettings) => void
export interface typeModelReducerSettings {
    action: "Data" | "Select",
    value: TypeModelConfigBase | number
}
export type TypeModelsConfig = {
    Data: TypeModelConfigBase,
    Select: number,
}