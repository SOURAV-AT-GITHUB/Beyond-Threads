import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";
import authReducer from "./Reducers/auth.reducer";
import alertReducer from "./Reducers/alert.reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  alert:alertReducer
});
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
