import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import {
  ORDERS_DATA_REQUEST,
  ORDERS_DATA_SUCCESS,
  ORDERS_DATA_ERROR,
  CART_DATA_SUCCESS,
  CART_DATA_ERROR,
  CART_DATA_REQUEST,
  ADD_FIRST200_DISCOUNT,
} from "./actionTypes";
export function getMyOrders(idToken) {
  return async (dispatch) => {
    dispatch({ type: ORDERS_DATA_REQUEST });
    try {
      const response = await axios.get(`${BACKEND_URL}/client/orders`, {
        headers: { Authorization: `Bearer ${idToken}` },
      });
      if (response.data.orders.length === 0) {
        dispatch({ type: ADD_FIRST200_DISCOUNT });
        dispatch({
          type: ORDERS_DATA_ERROR,
          payload: response.data.message,
        });
      } else
        dispatch({ type: ORDERS_DATA_SUCCESS, payload: response.data.orders });
    } catch (error) {
      dispatch({
        type: ORDERS_DATA_ERROR,
        payload: error.response?.data.message || error.message,
      });
    }
  };
}

export function getCartData(idToken) {
  return async (dispatch) => {
    dispatch({ type: CART_DATA_REQUEST });
    try {
      const response = await axios.get(`${BACKEND_URL}/client/cart`, {
        headers: { Authorization: `Bearer ${idToken}` },
      });

      dispatch({ type: CART_DATA_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({
        type: CART_DATA_ERROR,
        payload: error.response?.data.message || error.message,
      });
    }
  };
}
