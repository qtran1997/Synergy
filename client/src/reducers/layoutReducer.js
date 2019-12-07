import {
  CHANGE_MAIN,
  CREATE_NEW_NOTE,
  TOGGLE_CHAT,
  TOGGLE_MAIN_MENU
} from "../actions/types";

import mainScreen from "../constants/mainScreen";

const initialState = {
  chat: {
    open: false
  },
  main: {
    display: mainScreen.NOTEPAD,
    notepads: {},
    boards: {}
  },
  mainmenu: {
    open: false
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
    case CREATE_NEW_NOTE:
      return {
        ...state,
        main: {
          ...state.main,
          notepads: {
            ...state.main.notepads,
            Notepad1: {
              [action.payload]: {
                header: action.payload,
                body: "Description"
              }
            }
          }
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
    case TOGGLE_MAIN_MENU:
      return {
        ...state,
        mainmenu: {
          ...state.mainmenu,
          open: !state.mainmenu.open
        }
      };
    default:
      return state;
  }
}
