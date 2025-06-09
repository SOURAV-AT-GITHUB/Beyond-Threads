import {
  AUTH_SET_USER,
  AUTH_SET_ID_TOKEN_AND_EMAIL,
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
  ADD_FIRST200_DISCOUNT,
} from "./actionTypes";
const initialAuthState = {
  user: null,
  idToken: null,
  userEmail:"",
  userLoading: true,
};
export function authReducer(state = initialAuthState, { type, payload }) {
  switch (type) {
    case AUTH_SET_USER:
      return { ...state, user: payload };
    case AUTH_SET_ID_TOKEN_AND_EMAIL:
      return { ...state, ...payload };
    case AUTH_SET_LOADING:
      return { ...state, userLoading: payload };
    case AUTH_LOGOUT:
      return { ...state, user: null, idToken: null, userLoading: false };
    default:
      return state;
  }
}

const initialCartState = {
  isCartLoading: false,
  cartProducts: [],
  finalPrice: 0.0,
  subTotal: 0.0,
  isCartError: null,
  activeDiscounts: [],
};
const discounts = [
  {
    code: "FIRST200",
    type: "flat",
    forFirstOrder: true,
    discount_value: 200.0,
    min_cart_value: 0.0,
    max_cart_value: null,
  },
  {
    code: "SAVE300",
    type: "flat",
    forFirstOrder: false,
    discount_value: 300.0,
    min_cart_value: 5000.0,
    max_cart_value: 6999.0,
  },
  {
    code: "SAVE500",
    type: "flat",
    forFirstOrder: false,
    discount_value: 500.0,
    min_cart_value: 7000.0,
    max_cart_value: null,
  },
];
function getSubTotal(products) {
  if (products.length === 0) return 0.0;
  return parseFloat(
    products
      .reduce((total, product) => total + product.price * product.quantity, 0)
      .toFixed(2)
  );
}
function updateDiscount(subTotal, activeDiscounts) {
  const result = activeDiscounts.filter(
    (discount) => discount.code === "FIRST200"
  );
  if (subTotal >= 5000 && subTotal <= 6999) {
    result.push(discounts[1]);
  } else if (subTotal >= 7000) {
    result.push(discounts[2]);
  }
  return result;
}
function allocateDiscounts(items, totalDiscount) {
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  let remainingDiscount = totalDiscount;
  let result = [];

  // Distribute discount for all except last
  for (let i = 0; i < items.length; i++) {
    const { price, quantity } = items[i];
    const itemSubtotal = price * quantity;

    let itemDiscount;

    if (i === items.length - 1) {
      // Last item: give remaining to fix rounding
      itemDiscount = Math.round(remainingDiscount * 100) / 100;
    } else {
      itemDiscount =
        Math.round((itemSubtotal / subtotal) * totalDiscount * 100) / 100;
      remainingDiscount -= itemDiscount;
    }

    result.push({
      ...items[i],
      discount: itemDiscount,
    });
  }

  return result;
}
export function cartReducer(state = initialCartState, { type, payload }) {
  switch (type) {
    case CART_DATA_REQUEST:
      return { ...state, isCartLoading: true };
    case CART_DATA_SUCCESS: {
      const subTotal = getSubTotal(payload);
      const activeDiscounts = updateDiscount(subTotal, state.activeDiscounts);
      const finalPrice = parseFloat(
        activeDiscounts
          .reduce((acc, discount) => acc - discount.discount_value, subTotal)
          .toFixed(2)
      );
      return {
        ...state,
        isCartLoading: false,
        isCartError: null,
        cartProducts: allocateDiscounts(payload, subTotal - finalPrice),
        finalPrice,
        subTotal,
        activeDiscounts,
      };
    }
    case ADD_OR_UPDATE_ITEM: {
      if (state.cartProducts.some((item) => item.id === payload.id)) {
        const updatedCartProducts = state.cartProducts.map((item) =>
          item.id === payload.id ? payload : item
        );
        const subTotal = getSubTotal(updatedCartProducts);
        const activeDiscounts = updateDiscount(subTotal, state.activeDiscounts);
        const finalPrice = parseFloat(
          activeDiscounts
            .reduce((acc, discount) => acc - discount.discount_value, subTotal)
            .toFixed(2)
        );
        return {
          ...state,
          isCartLoading: false,
          cartProducts: allocateDiscounts(
            updatedCartProducts,
            subTotal - finalPrice
          ),
          finalPrice,
          subTotal,
          isCartError: null,
          activeDiscounts,
        };
      }
      const updatedCartProducts = [...state.cartProducts, payload];
      const subTotal = getSubTotal(updatedCartProducts);
      const activeDiscounts = updateDiscount(subTotal, state.activeDiscounts);
      const finalPrice = parseFloat(
        activeDiscounts
          .reduce((acc, discount) => acc - discount.discount_value, subTotal)
          .toFixed(2)
      );
      return {
        ...state,
        isCartLoading: false,
        cartProducts: allocateDiscounts(
          updatedCartProducts,
          subTotal - finalPrice
        ),
        finalPrice,
        subTotal,
        isCartError: null,
        activeDiscounts,
      };
    }
    case REMOVE_SINGLE_ITEM: {
      const updatedCartProducts = state.cartProducts.filter(
        (item) => item.id !== payload.id
      );
      const subTotal = getSubTotal(updatedCartProducts);
      const activeDiscounts = updateDiscount(subTotal, state.activeDiscounts);
      const finalPrice = activeDiscounts
        .reduce((acc, discount) => acc - discount.discount_value, subTotal)
        .toFixed(2);
      return {
        ...state,
        isCartLoading: false,
        cartProducts: allocateDiscounts(
          updatedCartProducts,
          subTotal - finalPrice
        ),
        finalPrice,
        subTotal,
        isCartError: null,
        activeDiscounts,
      };
    }
    case ADD_FIRST200_DISCOUNT:
      if (state.activeDiscounts.some((discount) => discount.code === discounts[0].code))
        return state;
      return {
        ...state,
        activeDiscounts: [...state.activeDiscounts, discounts[0]],
      };
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
