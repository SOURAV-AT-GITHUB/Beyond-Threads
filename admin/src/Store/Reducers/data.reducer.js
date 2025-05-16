import {
  DASHBOARD_LOADING,
  DASHBOARD_DATA,
  DASHBOARD_ERROR,
  ALL_ORDERS_LOADING,
  ALL_ORDERS_DATA,
  ALL_ORDERS_ERROR,
} from "../actionTypes";
const dashboardState = {
  isDashboardLoading: false,
  isDashboardError: null,
  details: {
    total_sales: 0,
    total_orders: 0,
    yet_to_dispatch: 0,
    total_products: 0,
  },
  latest_orders: [],
  fetched_at: null,
};

export function dashboardReducer(state = dashboardState, { type, payload }) {
  switch (type) {
    case DASHBOARD_LOADING:
      return {
        ...dashboardState,
        isDashboardLoading: true,
        fetched_at: Date.now(),
      };
    case DASHBOARD_DATA:
      return {
        ...dashboardState,
        details: payload.details,
        latest_orders: payload.latest_orders,
        fetched_at: Date.now(),
      };
    case DASHBOARD_ERROR:
      return {
        ...dashboardState,
        isDashboardError: payload,
        fetched_at: Date.now(),
      };
    default:
      return state;
  }
}

const allOrdersState = {
  isAllOrdersLoading: false,
  isAllOrdersError: null,
  allOrders: [],
  fetched_at: null,
};

export function allOrdersReducer(state = allOrdersState, { type, payload }) {
  switch (type) {
    case ALL_ORDERS_LOADING:
      return {
        ...allOrdersState,
        isAllOrdersLoading: true,
        fetched_at: Date.now(),
      };
    case ALL_ORDERS_DATA:
      return {
        ...allOrdersState,
        allOrders: payload,
        fetched_at: Date.now(),
      };
    case ALL_ORDERS_ERROR:
      return {
        ...allOrdersState,
        isAllOrdersError: payload,
        fetched_at: Date.now(),
      };
    default:
      return state;
  }
}
