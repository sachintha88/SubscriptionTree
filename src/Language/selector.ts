/**
 * Gets the externalized string for the given key.
 *
 * @param key The message key
 * @param bindings Optional string replacement variables
 * @returns {*} The external string
 */
import {RootState} from "../FeatureMap/types/types";
import {useSelector} from "react-redux";

export function getLocaleString(key:string, bindings?: string[] | null) : string | undefined {
    const messages = useSelector((state: RootState) => state.messages.messages)

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const value = messages[key]

    if (value === undefined || value === null) {
        return undefined;
    }

    if (!bindings) {
        return value;
    }

    return value.replace(/\{(\d+)}/g, (v:string, p1:number) => p1 < bindings.length ? bindings[p1] : v);
}