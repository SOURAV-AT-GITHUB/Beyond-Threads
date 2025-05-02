import {
  USER_LOGIN,
  USER_LOGOUT,
  UPDATE_CART,
  ADD_SINGLE_ITEM,
  UPDATED_SINGLE_ITEM,
  REMOVE_SINGLE_ITEM,
} from "./actionTypes";
export function authReducer(
  state = localStorage.getItem("auth") || null,
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

export function cartReducer(state = [], { type, payload }) {
  switch (type) {
    case UPDATE_CART: {
      return payload;
    }
    case ADD_SINGLE_ITEM: {
      return  [...state, payload] ;
    }
    case UPDATED_SINGLE_ITEM: {
      const updatedCart = state.map((item) =>
        item.id === payload.id ? payload : item
      );
      return updatedCart;
    }
    case REMOVE_SINGLE_ITEM: {
      const updatedCart = state.filter((item) => item.id !== payload.id);
      return updatedCart;
    }
    default:
      return state;
  }
}
