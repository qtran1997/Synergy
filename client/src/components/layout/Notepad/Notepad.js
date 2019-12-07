import React, { PureComponent } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Icon, Note } from "../";

import { createNote } from "../../../actions/noteActions";

import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

import Fab from "@material-ui/core/Fab";

import "./Notepad.scss";

class Notepad extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      id: "Notepad1",
      notes: Object.values(this.props.notes),
      newNoteCounter: 0
    };
  }

  createNoteOnClick(newNoteCounter) {
    if (newNoteCounter === 0) {
      this.props.createNote(`NewNote`);
    } else {
      this.props.createNote(`NewNote${newNoteCounter}`);
    }

    this.setState({
      notes: this.state.notes.concat({
        header: `NewNote${newNoteCounter === 0 ? "" : newNoteCounter}`,
        body: "Description"
      }),
      newNoteCounter: this.state.newNoteCounter + 1
    });
  }

  render() {
    const notes = Object.values(this.state.notes).map(({ header, body }) => (
      <Note header={header} body={body} />
    ));

    return (
      <SimpleBar className='notepad-container'>
        {[...notes]}
        <Fab
          color='primary'
          aria-label='add'
          className='notepad-container-add-button'
          onClick={() => this.createNoteOnClick(this.state.newNoteCounter)}
        >
          <Icon name='Add' />
        </Fab>
      </SimpleBar>
    );
  }
}

Notepad.propTypes = {
  notes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  notes: state.layout.main.notepads.Notepad1 || {}
});

const mapDispatchToProps = {
  createNote
};

export default connect(mapStateToProps, mapDispatchToProps)(Notepad);
