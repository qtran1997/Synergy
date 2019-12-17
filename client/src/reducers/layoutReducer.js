import {
  CHANGE_BOARD,
  CHANGE_MAIN,
  CHANGE_NOTEPAD,
  CREATE_NEW_NOTE,
  CREATE_NEW_NOTEPAD,
  GET_ALL_NOTEPADS,
  GET_NOTES,
  TOGGLE_CHAT,
  TOGGLE_MAIN_MENU
} from "../actions/types";

import mainScreen from "../constants/mainScreen";

const initialState = {
  chat: {
    open: false
  },
  main: {
    display: {
      screen: mainScreen.NOTEPAD,
      notepad: null,
      board: null
    },
    notepads: {},
    boards: {}
  },
  mainmenu: {
    open: false
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CHANGE_BOARD:
      return {
        ...state,
        main: {
          ...state.main,
          display: {
            ...state.main.display,
            board: action.payload
          }
        }
      };
    case CHANGE_MAIN:
      return {
        ...state,
        main: {
          ...state.main,
          display: {
            ...state.main.display,
            screen: action.payload
          }
        }
      };
    case CHANGE_NOTEPAD:
      return {
        ...state,
        main: {
          ...state.main,
          display: {
            ...state.main.display,
            notepad: action.payload
          }
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
              description: action.payload.description,
              notes: {}
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
            [action.payload.notepadId]: {
              ...state.main.notepads[action.payload.notepadId],
              notes: {
                ...state.main.notepads[action.payload.notepadId].notes,
                [action.payload.id]: {
                  id: action.payload.id,
                  title: action.payload.title,
                  description: action.payload.description,
                  dueDate: action.payload.dueDate,
                  done: action.payload.done
                }
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
    case GET_NOTES:
      return {
        ...state,
        main: {
          ...state.main,
          notepads: {
            ...state.main.notepads,
            [action.payload.notepadId]: {
              ...state.main.notepads[action.payload.notepadId],
              notes: {
                ...state.main.notepads[action.payload.notepadId].notes,
                ...action.payload.data
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
