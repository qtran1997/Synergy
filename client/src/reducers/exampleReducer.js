import { EXAMPLE } from "../actions/types";

const initialState = {
  key1: null,
  key2: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case EXAMPLE:
      return {
        ...state,
        key1: action.payload,
        key2: true
      };
    default:
      return state;
  }
}
