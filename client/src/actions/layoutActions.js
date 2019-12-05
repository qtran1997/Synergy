import { CHANGE_MAIN, TOGGLE_CHAT } from "./types";

export const toggleChat = () => {
  return {
    type: TOGGLE_CHAT
  };
};

export const changeMainScreen = component => {
  return {
    type: CHANGE_MAIN,
    payload: component
  };
};
