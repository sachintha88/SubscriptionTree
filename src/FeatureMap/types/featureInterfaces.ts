export interface Feature {
    featureId: number,
    parentId: number | null,
    path: string,
    name: string,
    sum?: number,
    price?: number,
    expanded: boolean,
    checked: boolean,
}

export interface FeatureArrayObject {
    features: Feature[]
}