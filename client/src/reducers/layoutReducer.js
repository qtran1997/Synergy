import {
  CHANGE_MAIN,
  CREATE_NEW_NOTE,
  CREATE_NEW_NOTEPAD,
  GET_ALL_NOTEPADS,
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
    case CREATE_NEW_NOTEPAD:
      return {
        ...state,
        main: {
          ...state.main,
          notepads: {
            ...state.main.notepads,
            [action.payload.id]: {
              id: action.payload.id,
              title: action.payload.title,
              description: action.payload.description
            }
          }
        }
      };
    case CREATE_NEW_NOTE:
      return {
        ...state,
        main: {
          ...state.main,
          notepads: {
            ...state.main.notepads,
            [action.payload.notepadNames]: {
              ...state.main.notepads[action.payload.notepadNames],
              [action.payload]: {
                header: action.payload,
                body: "Description"
              }
            }
          }
        }
      };
    case GET_ALL_NOTEPADS:
      return {
        ...state,
        main: {
          ...state.main,
          notepads: {
            ...state.main.notepads,
            ...action.payload
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
