export type PropagtorStructureList = {
    Id: number,
    Text: string,
    ChangeCondition: boolean,
    Execution: () => void
}[]

type temporal = {
    Main: (args?: any) => void
    Secundary: (args?: any) => void
}

export type PropagtorStructureComponents = {
    Id: number,
    Component: JSX.ElementType,
    Execute: ((args?: any) => void) | temporal
    ChangeCondition?: boolean,
    Complement: TypeComplement
}

export interface IntComponentPropagator {
    Data: PropagtorStructureComponents[],
}

// Complements
export type TypeComplement = {
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