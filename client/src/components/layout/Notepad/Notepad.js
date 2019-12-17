import React, { PureComponent } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

import Fab from "@material-ui/core/Fab";
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";

import { Icon, Note } from "../../";

import { createNote } from "../../../actions/notepadActions";

import "./Notepad.scss";

class Notepad extends PureComponent {
  createNoteOnClick(currentNotepadId) {
    this.props.createNote(currentNotepadId);
  }

  render() {
    const notes = Object.values(
      this.props.notes
    ).map(({ id, title, description }) => (
      <Note key={id} header={title} body={description} />
    ));

    return this.props.currentNotepadId ? (
      <SimpleBar className='notepad-container'>
        {[...notes]}
        <Tooltip
          TransitionComponent={Zoom}
          title='Create A New Note'
          placement='left'
        >
          <Fab
            color='primary'
            aria-label='add'
            className='notepad-container-add-button'
            onClick={() => this.createNoteOnClick(this.props.currentNotepadId)}
          >
            <Icon name='Add' />
          </Fab>
        </Tooltip>
      </SimpleBar>
    ) : (
      <SimpleBar className='notepad-container'>
        <div className='notepad-container-create-notepad'>
          <span>Select A Notepad...</span>
        </div>
      </SimpleBar>
    );
  }
}

Notepad.propTypes = {
  currentNotepad: PropTypes.string,
  errors: PropTypes.object.isRequired,
  notepads: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  const currentNotepadId = state.layout.main.display.notepad || "";
  return {
    currentNotepadId,
    errors: state.errors,
    notepads: state.layout.main.notepads,
    notes:
      currentNotepadId && state.layout.main.notepads[currentNotepadId].notes
        ? Object.values(state.layout.main.notepads[currentNotepadId].notes)
        : []
  };
};

const mapDispatchToProps = {
  createNote
};

export default connect(mapStateToProps, mapDispatchToProps)(Notepad);
