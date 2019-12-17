import {
  CHANGE_BOARD,
  CHANGE_MAIN,
  CHANGE_NOTEPAD,
  TOGGLE_CHAT,
  TOGGLE_MAIN_MENU
} from "./types";

export const changeMainScreen = component => {
  return {
    type: CHANGE_MAIN,
    payload: component
  };
};

export const changeNotepad = component => {
  return {
    type: CHANGE_NOTEPAD,
    payload: component
  };
};

export const changeBoard = component => {
  return {
    type: CHANGE_BOARD,
    payload: component
  };
};

export const toggleChat = () => {
  return {
    type: TOGGLE_CHAT
  };
};

export const toggleMainMenu = () => {
  return {
    type: TOGGLE_MAIN_MENU
  };
};
