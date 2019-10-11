import { GET_ERRORS } from "../actions/types";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_SUCCESSES:
      return {
        successes: action.payload.successes,
        errors: action.payload.errors
      };
    case GET_ERRORS:
      return action.payload;
    default:
      return state;
  }
}
