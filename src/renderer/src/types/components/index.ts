export type PropagtorStructureList = {
    Id: number,
    Text: string,
    ChangeCondition: boolean,
    Execution: () => void
}[]

export type PropagtorStructureComponents = {
    Id: number,
    Component: JSX.ElementType,
    Execute: (args?: any) => void,
    ChangeCondition?: boolean,
    Complement: TypeComplement
}

export interface IntComponentPropagator {
    Data: PropagtorStructureComponents[],
}

// Complements
export type TypeComplement = {
    minLength?: number,
    maxLength?: number,
    steps?: number,
    Switch?: boolean,
    Text: string,
    Definition: string,
    value?: string,
    Accept?: "Non-Drag" | "Drag",
    Actions?: "Delete" | "Select" | "Multi-Delete",
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