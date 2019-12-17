import axios from "axios";

import {
  CREATE_NEW_NOTE,
  CREATE_NEW_NOTEPAD,
  GET_ALL_NOTEPADS,
  GET_ERRORS,
  GET_NOTES
} from "./types";

export const createNotepad = notepadData => dispatch => {
  axios
    .post("/api/notepads/create", notepadData)
    .then(res => {
      dispatch({
        type: CREATE_NEW_NOTEPAD,
        payload: {
          id: res.data._id,
          title: res.data.title,
          description: res.data.description
        }
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const getNotepads = () => dispatch => {
  axios
    .get("/api/notepads/all")
    .then(res => {
      dispatch({
        type: GET_ALL_NOTEPADS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const createNote = notepadId => dispatch => {
  axios
    .post("/api/notes/create", {
      notepadId
    })
    .then(res => {
      dispatch({
        type: CREATE_NEW_NOTE,
        payload: {
          id: res.data._id,
          title: res.data.title,
          description: res.data.description,
          dueDate: res.data.dueDate,
          done: res.data.done,
          notepadId
        }
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const getNotes = (notepadId, noteIds) => dispatch => {
  axios
    .post("/api/notes/retrieve", noteIds)
    .then(res => {
      dispatch({
        type: GET_NOTES,
        payload: {
          notepadId: notepadId,
          data: res.data
        }
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
