import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import {
  ORDERS_DATA_REQUEST,
  ORDERS_DATA_SUCCESS,
  ORDERS_DATA_ERROR,
} from "./actionTypes";
export function getMyOrders(idToken) {
  return async (dispatch) => {
    dispatch({ type: ORDERS_DATA_REQUEST });
    try {
      const response = await axios.get(`${BACKEND_URL}/client/orders`, {
        headers: { Authorization: `Bearer ${idToken}` },
      });
      dispatch({ type: ORDERS_DATA_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({
        type: ORDERS_DATA_ERROR,
        payload: error.response?.data.message || error.message,
      });
    }
  };
}
