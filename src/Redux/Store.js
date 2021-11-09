import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./rootReducer";

export function configureStore(InitialState) {
  const Store = createStore(
    rootReducer,
    InitialState,
    composeWithDevTools(applyMiddleware(thunk))
  );

  return Store;
}
