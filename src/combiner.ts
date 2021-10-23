import { combineReducers } from "redux";
import { featureReducer } from "./FeatureMap/reducers/featureReducer";
import "./Language/en.json";
import {languageReducer} from "./Language/languageReducer";

  const rootReducer = combineReducers({
    features: featureReducer,
    messages: languageReducer,
  });

  export default rootReducer;
