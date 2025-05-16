import {
  DASHBOARD_DATA,
  DASHBOARD_ERROR,
  DASHBOARD_LOADING,
  OPEN_ALERT,
  ADMIN_LOGOUT,
  ALL_ORDERS_LOADING,
  ALL_ORDERS_DATA,
  ALL_ORDERS_ERROR,
} from "./actionTypes";
import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
function handleError(error, dispatch) {
  if (error.status === 401) {
    dispatch({ type: ADMIN_LOGOUT });
    dispatch({
      type: OPEN_ALERT,
      payload: {
        message: "Please Login again",
        severity: "warning",
      },
    });
  } else {
    dispatch({
      type: OPEN_ALERT,
      payload: {
        message: error.response?.data.message || error.message,
        severity: "error",
      },
    });
  }
}
export function loadDashboard(token) {
  return async (dispatch) => {
    dispatch({ type: DASHBOARD_LOADING });
    try {
      const response = await axios.get(`${BACKEND_URL}/admin/dashboard`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch({
        type: DASHBOARD_DATA,
        payload: {
          details: response.data.details,
          latest_orders: response.data.latest_orders,
        },
      });
    } catch (error) {
      dispatch({
        type: DASHBOARD_ERROR,
        payload: error.response?.data.message || error.message,
      });
      handleError(error, dispatch);
    }
  };
}

export function loadAllOrders(token,query) {
  return async (dispatch) => {
    dispatch({ type: ALL_ORDERS_LOADING });
    try {
      const response = await axios.get(`${BACKEND_URL}/admin/orders?${query}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch({ type: ALL_ORDERS_DATA, payload: response.data });
    } catch (error) {
      dispatch({
        type: ALL_ORDERS_ERROR,
        payload: error.response?.data.message || error.message,
      });
      handleError(error,dispatch);
    }
  };
}
