import { TypeComplement } from "@renderer/env"

export type CheckboxType = {
    Execute: () => void,
    Complement: TypeComplement
    ChangeCondition?: boolean
}
export type SelectType = {
    Execute: (value: string) => void,
    Complement: TypeComplement
}
export type ColorType = {
    Execute: (args?: any) => void,
    Complement: TypeComplement
    value: string
}
export type ListType = {
    Execute: {
        Main: (value: any) => void,
        Secundary: (value: any) => void
    },
    Complement: TypeComplement
}