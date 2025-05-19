import { legacy_createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";
import { authReducer, cartReducer, ordersReducer } from "./reducers";
const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  myOrders: ordersReducer,
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
