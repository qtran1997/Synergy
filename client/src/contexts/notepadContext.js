import React, { createContext, Component } from "react";
import axios from "axios";

import { ErrorContext } from "./";

export const NotepadContext = createContext();

class NotepadProvider extends Component {
  constructor(props) {
    super(props);

    this.createNotepad = this.createNotepad.bind(this);
    this.getNotepads = this.getNotepads.bind(this);
    this.createNote = this.createNote.bind(this);
    this.getNotes = this.getNotes.bind(this);
    this.modifyNote = this.modifyNote.bind(this);
  }
  state = {
    notepads: {}
  };

  static contextType = ErrorContext;

  createNotepad(notepadData) {
    const { setError } = this.context;

    axios
      .post("/api/notepads/create", notepadData)
      .then(res => {
        this.setState({
          notepads: {
            ...this.state.notepads,
            [res.data._id]: {
              id: res.data._id,
              title: res.data.title,
              description: res.data.description,
              notes: {}
            }
          }
        });
      })
      .catch(err => setError(err.response.data));
  }

  getNotepads() {
    const { setError } = this.context;

    axios
      .get("/api/notepads/all")
      .then(res => {
        this.setState({
          notepads: {
            ...this.state.notepads,
            ...res.data
          }
        });
      })
      .catch(err => setError(err.response.data));
  }

  createNote(notepadId) {
    axios
      .post("/api/notes/create", {
        notepadId
      })
      .then(res => {
        this.setState({
          notepads: {
            ...this.state.notepads,
            [notepadId]: {
              ...this.state.notepads[notepadId],
              notes: {
                ...this.state.notepads[notepadId].notes,
                [res.data._id]: {
                  id: res.data._id,
                  title: res.data.title,
                  description: res.data.description,
                  dueDate: res.data.dueDate,
                  done: res.data.done
                }
              }
            }
          }
        });
      });
    // .catch(err => setError(err.response.data));
  }

  modifyNote(noteId, modifiedData) {
    axios
      .post("/api/notes/modify", {
        noteId,
        title: modifiedData.title,
        description: modifiedData.description,
        done: modifiedData.done,
        dueDate: modifiedData.dueDate,
        position: modifiedData.position
      })
      .then(res => {
        this.setState({
          notepads: {
            ...this.state.notepads,
            [res.data.notepadId]: {
              ...this.state.notepads[res.data.notepadId],
              notes: {
                ...this.state.notepads[res.data.notepadId].notes,
                // Backend is true source of data - replace old note
                [res.data.id]: res.data
              }
            }
          }
        });
        // Successfully modified
      })
      .catch(err => {
        // Failed to modify
      });
  }

  deleteNote(noteId) {
    axios.post("/api/notes/delete", noteId).then(res => {
      const updatedNotes = Object.assign(
        {},
        this.state.notepads[res.data.notepadId].notes
      );
      delete updatedNotes[noteId];

      this.setState({
        notepads: {
          ...this.state.notepads,
          [res.data.notepadId]: {
            ...this.state.notepads[res.data.notepadId],
            notes: updatedNotes
          }
        }
      });
    });
    // .catch(err => setError(err.response.data));
  }

  getNotes(notepadId, noteIds) {
    const { setError } = this.context;

    axios
      .post("/api/notes/retrieve", { noteIds })
      .then(res => {
        this.setState({
          notepads: {
            ...this.state.notepads,
            [notepadId]: {
              ...this.state.notepads[notepadId],
              notes: {
                // Backend is true source of data
                ...res.data
              }
            }
          }
        });
      })
      .catch(err => setError(err.response.data));
  }

  render() {
    return (
      <NotepadContext.Provider
        value={{
          ...this.state,
          createNotepad: this.createNotepad,
          getNotepads: this.getNotepads,
          createNote: this.createNote,
          getNotes: this.getNotes,
          modifyNote: this.modifyNote
        }}
      >
        {this.props.children}
      </NotepadContext.Provider>
    );
  }
}

export default NotepadProvider;
