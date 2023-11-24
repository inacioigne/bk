type Element = {
    label: string
    lang?: string
    uri: string
    type: string[]
}

type Title = {
    type: string
    mainTitle: string
    subtitle?: string
    label: string
}
export interface Bibframe {
    type: string
    identifiersLccn: string
    content: Element
    language: Element[]
    title: Title
}