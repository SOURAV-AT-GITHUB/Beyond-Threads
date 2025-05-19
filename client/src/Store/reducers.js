import {
  AUTH_SET_USER,
  AUTH_SET_ID_TOKEN,
  AUTH_SET_LOADING,
  AUTH_LOGOUT,
  CART_DATA_REQUEST,
  CART_DATA_SUCCESS,
  CART_DATA_ERROR,
  ADD_OR_UPDATE_ITEM,
  REMOVE_SINGLE_ITEM,
  ORDERS_DATA_REQUEST,
  ORDERS_DATA_SUCCESS,
  ORDERS_DATA_ERROR,
} from "./actionTypes";
const initialAuthState = {
  user: null,
  idToken: null,
  userLoading: true,
};
export function authReducer(state = initialAuthState, { type, payload }) {
  switch (type) {
    case AUTH_SET_USER:
      return { ...state, user: payload };
    case AUTH_SET_ID_TOKEN:
      return { ...state, idToken: payload };
    case AUTH_SET_LOADING:
      return { ...state, userLoading: payload };
    case AUTH_LOGOUT:
      return { ...state, user: null, idToken: null, userLoading: false };
    default:
      return state;
  }
}

function getFinalPrice(products) {
  if (products.length === 0) return 0.0;
  return products
    .reduce((total, product) => total + product.price * product.quantity, 0)
    .toFixed(2);
}
const initialCartState = {
  isCartLoading: false,
  cartProducts: [],
  finalPrice: 0.0,
  isCartError: null,
};
export function cartReducer(state = initialCartState, { type, payload }) {
  switch (type) {
    case CART_DATA_REQUEST:
      return { ...initialCartState, isCartLoading: true };
    case CART_DATA_SUCCESS: {
      return {
        ...initialCartState,
        cartProducts: payload,
        finalPrice: getFinalPrice(payload),
      };
    }
    case ADD_OR_UPDATE_ITEM: {
      if (state.cartProducts.some((item) => item.id === payload.id)) {
        const updatedCartProducts = state.cartProducts.map((item) =>
          item.id === payload.id ? payload : item
        );
        return {
          ...initialCartState,
          cartProducts: updatedCartProducts,
          finalPrice: getFinalPrice(updatedCartProducts),
        };
      }
      return {
        ...initialCartState,
        cartProducts: [...state.cartProducts, payload],
        finalPrice: getFinalPrice([...state.cartProducts, payload]),
      };
    }
    case REMOVE_SINGLE_ITEM: {
      const updatedCartProducts = state.cartProducts.filter(
        (item) => item.id !== payload.id
      );
      return {
        ...initialCartState,
        cartProducts: updatedCartProducts,
        finalPrice: getFinalPrice(updatedCartProducts),
      };
    }
    case CART_DATA_ERROR:
      return { ...initialCartState, isCartError: payload };
    default:
      return state;
  }
}

const initialOrdersState = {
  isOrdersLoading: false,
  myOrders: null,
  isOrdersError: null,
};
export function ordersReducer(state = initialOrdersState, { type, payload }) {
  switch (type) {
    case ORDERS_DATA_REQUEST:
      return { ...state, isOrdersLoading: true };
    case ORDERS_DATA_SUCCESS: {
      return { ...initialOrdersState, myOrders: payload };
    }
    case ORDERS_DATA_ERROR: {
      return { ...initialOrdersState, isOrdersError: payload };
    }
    default:
      return state;
  }
}

