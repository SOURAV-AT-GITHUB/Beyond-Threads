import { USER_LOGIN, USER_LOGOUT } from "./actionTypes";
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
