export type hasInstance = {
    image: string
    publicationPlace: string[]
    publicationAgent: string[]
    publicationDate: number[]
}
type Contribution = {
    label: string[]
}

type Subject = {
    label: string[]
}

export type SolrCatalog = {
    id: string
    mainTitle: string[]
    subtitle: string[]
    contribution: Contribution | Contribution[]
    subject: Subject | Subject[]
    hasInstance: hasInstance[]
  };