import { CHANGE_MAIN, TOGGLE_CHAT, TOGGLE_MAIN_MENU } from "./types";

export const changeMainScreen = component => {
  return {
    type: CHANGE_MAIN,
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
