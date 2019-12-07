import { CREATE_NEW_NOTE } from "./types";

export const createNote = notepadId => {
  return {
    type: CREATE_NEW_NOTE,
    payload: notepadId
  };
};
