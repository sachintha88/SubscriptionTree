export type LocaleActionObject = {
    type: string
    messages: messages
}

export type LanguageState = {
    messages: messages
}

export interface messages {
    [key: string] : string
}
