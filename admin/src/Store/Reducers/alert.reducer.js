import { OPEN_ALERT, CLOSE_ALERT } from "../actionTypes";
const defaultState = {
  message: "Something went wrong",
  severity: "error",
  open: false,
};

export default function alertReducer(state = defaultState, { type, payload }) {
  switch (type) {
    case OPEN_ALERT:
      return { ...payload, open: true };
    case CLOSE_ALERT:
      return defaultState;
    default:
      return state
  }
}
