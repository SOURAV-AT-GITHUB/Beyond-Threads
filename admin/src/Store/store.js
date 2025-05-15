import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";
import authReducer from "./Reducers/auth.reducer";
import alertReducer from "./Reducers/alert.reducer";
import { dashboardReducer } from "./Reducers/data.reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  alert:alertReducer,
  dashboard:dashboardReducer
});
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
