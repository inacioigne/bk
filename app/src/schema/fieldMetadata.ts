export type field = {
    label: string;
    name: string;
    thesarus?: string;
    type: string;
    width: number;
    required: boolean
}

export type typeMetadata = {
    property: string;
    uri: string;
    label: string;
    repeatable: boolean;
    required: boolean;
    fields: field[];
}
