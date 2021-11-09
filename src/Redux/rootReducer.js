import { combineReducers } from "redux";

import table from "./reducers/table";

const rootReducer = combineReducers({
  table,
});

export default rootReducer;
