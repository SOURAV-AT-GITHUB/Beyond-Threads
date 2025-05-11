import {
  USER_LOGIN,
  USER_LOGOUT,
  UPDATE_CART,
  ADD_OR_UPDATE_ITEM,
  REMOVE_SINGLE_ITEM,
} from "./actionTypes";
export function authReducer(
  state = JSON.parse(localStorage.getItem("auth")) || null,
  { type, payload }
) {
  switch (type) {
    case USER_LOGIN: {
      localStorage.setItem("auth", JSON.stringify(payload));
      return payload;
    }
    case USER_LOGOUT: {
      localStorage.removeItem("auth");
      return null;
    }
    default:
      return state;
  }
}
function getFinalPrice(products) {
  if (products.length === 0) return 0.00;
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
        return { products: updatedCartProducts, finalPrice: getFinalPrice(updatedCartProducts) };
      }
      return {
        products: [...state.products, payload],
        finalPrice: getFinalPrice([...state.products, payload]),
      };
    }
    case REMOVE_SINGLE_ITEM: {
      const updatedCartProducts = state.products.filter((item) => item.id !== payload.id);
      return { products: updatedCartProducts, finalPrice: getFinalPrice(updatedCartProducts) };
    }
    default:
      return state;
  }
}
