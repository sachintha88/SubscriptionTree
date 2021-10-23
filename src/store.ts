import {applyMiddleware, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import rootReducer from "./combiner";

// eslint-disable-next-line
const configureStore = ()  => {
  const middleware = applyMiddleware(thunkMiddleware);
  return middleware(createStore)(rootReducer);
};

export default configureStore
