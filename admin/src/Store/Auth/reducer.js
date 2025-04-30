import { ADMIN_LOGIN, ADMIN_LOGOUT } from "../actionTypes";

const defaultState = {
  name: "",
  email: "",
  token: null,
};
function handleLocalStorage() {
  const details = JSON.parse(localStorage.getItem("auth")) || null;
  if (!details) {
    localStorage.setItem("auth", JSON.stringify(defaultState));
    return defaultState;
  }
  try {
    /*eslint-disable no-prototype-builtins*/
    if (
      details.hasOwnProperty("name") &&
      details.hasOwnProperty("email") &&
      details.hasOwnProperty("token")
    ) {
      return details;
    } else {
      localStorage.setItem("auth", JSON.stringify(defaultState));
      return defaultState;
    }
    //eslint-disable-next-line
  } catch (error) {
    localStorage.setItem("auth", JSON.stringify(defaultState));
    return defaultState;
  }
}
export default function authReducer(
  state = handleLocalStorage(),
  { type, payload }
) {
  switch (type) {
    case ADMIN_LOGIN: {
      localStorage.setItem("auth", JSON.stringify(payload));
      return payload;
    }
    case ADMIN_LOGOUT: {
      localStorage.removeItem("auth");
      return defaultState;
    }
    default:
      return state;
  }
}
