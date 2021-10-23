import {Dispatch} from "react";
import {LocaleActionObject} from "./types";

export function loadLanguage():(dispatch: Dispatch<LocaleActionObject>) => void {
  return async (dispatch) => {
    const resources = await import(`./en.json`);

    dispatch({
      type: "loadMessages",
      messages: resources.default,
    });
  };
}