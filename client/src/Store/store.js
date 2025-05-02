import { legacy_createStore,applyMiddleware,combineReducers } from "redux";
import {thunk} from 'redux-thunk'
import { authReducer, cartReducer } from "./reducers";
const rootReducer = combineReducers({
    token:authReducer,
    cart :cartReducer
})

export const store = legacy_createStore(rootReducer,applyMiddleware(thunk))

