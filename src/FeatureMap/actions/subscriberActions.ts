import {Feature} from "../types/featureInterfaces";
import {Dispatch} from "react";
import {BasicDispatchType, ExpandDispatchType, StatusDispatchType} from "../types/types";

export function setCheckStatus(feature : Feature):(dispatch: Dispatch<StatusDispatchType>) => void {
  return (dispatch: Dispatch<StatusDispatchType>) => {
    dispatch({
      type: "setCheckStatus",
      feature,
    });
  };
}

export function setExpand(featureId: number):(dispatch: Dispatch<ExpandDispatchType>) => void {
  return (dispatch: Dispatch<ExpandDispatchType>) => {
    dispatch({
      type: "setExpandStatus",
      featureId,
    });
  };
}

export function clearStore():(dispatch: Dispatch<BasicDispatchType>) => void {
  return (dispatch: Dispatch<BasicDispatchType>) => {
    dispatch({
      type: "clearStore",
    });
  };
}

export function saveSubscriptions(features: Feature[]): void {
  console.log("saved", features);
  //WebServiceCall to save the selected features goes here
  //new Promise(resolve => WebService.call(apiTopic, features))
  //   .then(clearStore);
}
