import { CHANGE_MAIN, TOGGLE_CHAT } from "../actions/types";

import mainScreen from "../constants/mainScreen";

const initialState = {
  chat: {
    open: false
  },
  main: {
    display: mainScreen.NOTEPAD
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CHANGE_MAIN:
      return {
        ...state,
        main: {
          ...state.main,
          display: action.payload
        }
      };
    case TOGGLE_CHAT:
      return {
        ...state,
        chat: {
          ...state.chat,
          open: !state.chat.open
        }
      };
    default:
      return state;
  }
}
