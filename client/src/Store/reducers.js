import {
  AUTH_SET_USER,
  AUTH_SET_ID_TOKEN,
  AUTH_SET_LOADING,
  AUTH_LOGOUT,
  UPDATE_CART,
  ADD_OR_UPDATE_ITEM,
  REMOVE_SINGLE_ITEM,
} from "./actionTypes";
const initialState = {
  user: null,
  idToken: null,
  userLoading: true,
};

export function authReducer(state = initialState, { type, payload }) {
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
export function cartReducer(
  state = { products: [], finalPrice: 0 },
  { type, payload }
) {
  switch (type) {
    case UPDATE_CART: {
      return {
        products: payload,
        finalPrice: getFinalPrice(payload),
      };
    }
    case ADD_OR_UPDATE_ITEM: {
      if (state.products.some((item) => item.id === payload.id)) {
        const updatedCartProducts = state.products.map((item) =>
          item.id === payload.id ? payload : item
        );
        return {
          products: updatedCartProducts,
          finalPrice: getFinalPrice(updatedCartProducts),
        };
      }
      return {
        products: [...state.products, payload],
        finalPrice: getFinalPrice([...state.products, payload]),
      };
    }
    case REMOVE_SINGLE_ITEM: {
      const updatedCartProducts = state.products.filter(
        (item) => item.id !== payload.id
      );
      return {
        products: updatedCartProducts,
        finalPrice: getFinalPrice(updatedCartProducts),
      };
    }
    default:
      return state;
  }
}
