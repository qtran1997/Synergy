import { OPEN_CHAT, CLOSE_CHAT } from "./types";

export const openChat = () => {
  return {
    type: OPEN_CHAT
  };
};

export const closeChat = () => {
  return {
    type: CLOSE_CHAT
  };
};
