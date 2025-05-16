import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";
import authReducer from "./Reducers/auth.reducer";
import alertReducer from "./Reducers/alert.reducer";
import { allOrdersReducer, dashboardReducer } from "./Reducers/data.reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  alert: alertReducer,
  dashboard: dashboardReducer,
  allOrders: allOrdersReducer,
});
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
