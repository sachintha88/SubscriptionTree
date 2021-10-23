import {LanguageState, LocaleActionObject} from "./types";

function loadMessages(state: LanguageState, action: LocaleActionObject) : LanguageState {
  return {
    ...state,
    messages: action.messages,
  };
}

export function languageReducer(state = {messages:  {"":""}}, action: LocaleActionObject):LanguageState {
  switch (action.type) {
    case "loadMessages":
      return loadMessages(state, action);
    default:
      return state;
  }
}
