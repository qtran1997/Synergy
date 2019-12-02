import { CLOSE_CHAT, OPEN_CHAT } from "../actions/types";

const initialState = {
  open: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case OPEN_CHAT:
      return {
        ...state,
        open: true
      };
    case CLOSE_CHAT:
      return {
        ...state,
        open: false
      };
    default:
      return state;
  }
}
