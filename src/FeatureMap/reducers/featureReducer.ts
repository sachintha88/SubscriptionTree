import { INITIAL_STATE } from "../resources/data";
import {FeatureState, ExpandDispatchType, StatusDispatchType} from "../types/types";

function setExpandStatus(state : FeatureState, action: ExpandDispatchType) : FeatureState {
  return {
    ...state,
    features: state.features.map((feature) => {
      if (feature.featureId === action.featureId) {
        //each node should expand or collapse when user clicks on top of them
        return { ...feature, expanded: !feature.expanded };
      }

      return feature;
    }),
  };
}

function setCheckStatus(state: FeatureState, action: StatusDispatchType) : FeatureState {
  const modifyingFeature = action.feature;
  const price = modifyingFeature.price;
  const path = modifyingFeature.path.split(".").map(Number);

  if (modifyingFeature.sum && modifyingFeature.sum > 0) {
    //we do not want to remove a check while a child node is selected
    return { ...state };
  }

  return {
    ...state,
    features: state.features.map((feature) => {
      if (path.includes(feature.featureId) && price && feature.sum !== undefined) {
        //calculate parent's price tag depending on add/remove features
        return {
          ...feature,
          sum: !modifyingFeature.checked
            ? feature.sum + price
            : feature.sum - price,
        };
      }

      if (feature.featureId === modifyingFeature.featureId) {
        return { ...feature, checked: !feature.checked };
      }

      return feature;
    }),
  };
}

export function featureReducer(state = INITIAL_STATE, action: ExpandDispatchType | StatusDispatchType): FeatureState  {
  switch (action.type) {
    case "setExpandStatus":
      return setExpandStatus(state, action as ExpandDispatchType);
    case "setCheckStatus":
      return setCheckStatus(state, action as StatusDispatchType);
    case "clearStore":
      return INITIAL_STATE
    default:
      return state;
  }
}
