import { ADMIN_LOGIN, ADMIN_LOGOUT } from "../actionTypes";

const defaultState = {
  name: "",
  email: "",
  token: null,
};
function handleLocalStorage() {
  const details = localStorage.getItem("auth");
  if (!details) {
    localStorage.setItem("auth", JSON.stringify(defaultState));
    return defaultState;
  }
  try {
    const parsed = JSON.parse(details);
    /*eslint-disable no-prototype-builtins*/
    if (
      parsed.hasOwnProperty("name") &&
      parsed.hasOwnProperty("email") &&
      parsed.hasOwnProperty("token")
    ) {
      return parsed;
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
