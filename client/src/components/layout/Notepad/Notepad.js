import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

import Fab from "@material-ui/core/Fab";
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";

import { Icon, Note } from "../../";

import { NotepadContext } from "../../../contexts/";

import "./Notepad.scss";

class Notepad extends PureComponent {
  createNoteOnClick(currentNotepadId) {
    const { createNote } = this.context;
    createNote(currentNotepadId);
  }

  render() {
    const { notepads } = this.context;

    if (this.props.currentNotepadId) {
      const { notes } = notepads[this.props.currentNotepadId];

      const noteComponents = Object.values(
        notes || {}
      ).map(({ id, title, description, x, y }) => (
        <Note
          id={id}
          key={id}
          header={title}
          body={description}
          position={{ x, y }}
        />
      ));

      return (
        <SimpleBar className='notepad-container'>
          {[...noteComponents]}
          <Tooltip
            TransitionComponent={Zoom}
            title='Create A New Note'
            placement='left'
          >
            <Fab
              color='primary'
              aria-label='add'
              className='notepad-container-add-button'
              onClick={() =>
                this.createNoteOnClick(this.props.currentNotepadId)
              }
            >
              <Icon name='Add' />
            </Fab>
          </Tooltip>
        </SimpleBar>
      );
    }

    return (
      <SimpleBar className='notepad-container'>
        <div className='notepad-container-create-notepad'>
          <span>Select A Notepad...</span>
        </div>
      </SimpleBar>
    );
  }
}

Notepad.propTypes = {
  currentNotepadId: PropTypes.string
};

Notepad.contextType = NotepadContext;

export default Notepad;
