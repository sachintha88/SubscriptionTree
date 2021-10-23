import {Feature, FeatureArrayObject} from "./featureInterfaces";
import {messages} from "../../Language/types";

export type RootState = {
    features: FeatureArrayObject
    messages: messages
}

export type FeatureState = {
    features: Feature[]
}

export type StatusDispatchType = {
    type: string
    feature: Feature
}

export type ExpandDispatchType = {
    type: string
    featureId: number
}

export type BasicDispatchType = {
    type: string
}