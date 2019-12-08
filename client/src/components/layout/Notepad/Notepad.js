import React, { PureComponent } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Fade, Icon, Note, TextFieldGroup } from "../../";

import { createNote, createNotepad } from "../../../actions/notepadActions";

import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

import Fab from "@material-ui/core/Fab";
import Modal from "@material-ui/core/Modal";

import "./Notepad.scss";

class Notepad extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      createNotepadModal: false,
      errors: {},
      notes: Object.values(this.props.notes),
      notepadTitle: "",
      notepadDescription: "",
      newNoteCounter: 0
    };

    this.newNotepadOnChange = this.newNotepadOnChange.bind(this);
    this.newNotepadOnSubmit = this.newNotepadOnSubmit.bind(this);
  }

  componentDidUpdate(prevProps) {
    // Created new notepad and want modal to disappear
    if (
      Object.keys(prevProps.notepads).length <
      Object.keys(this.props.notepads).length
    ) {
      this.setState({ createNotepadModal: false });
    }
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

  newNotepadOnSubmit(e) {
    e.preventDefault();

    const notepadData = {
      title: this.state.notepadTitle,
      description: this.state.notepadDescription
    };

    this.props.createNotepad(notepadData);
  }

  openNotepadModal() {
    this.setState({
      createNotepadModal: true
    });
  }

  closeNotepadModal() {
    this.setState({
      createNotepadModal: false
    });
  }

  newNotepadOnChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const notes = Object.values(this.state.notes).map(({ header, body }) => (
      <Note key={header} header={header} body={body} />
    ));

    return (
      <SimpleBar className='notepad-container'>
        {// User does not have any notepads
        Object.keys(this.props.notepads).length === 0 ? (
          <div className='notepad-container-create-notepad'>
            <Fab
              variant='extended'
              color='primary'
              aria-label='add'
              onClick={() => this.openNotepadModal()}
            >
              CREATE NEW NOTEPAD
            </Fab>
          </div>
        ) : (
          <div>
            {[...notes]}
            <Fab
              color='primary'
              aria-label='add'
              className='notepad-container-add-button'
              onClick={() => this.createNoteOnClick(this.state.newNoteCounter)}
            >
              <Icon name='Add' />
            </Fab>
          </div>
        )}
        <Modal
          aria-labelledby='notepad-create-modal-title'
          aria-describedby='notepad-create-modal-description'
          className='notepad-create-modal'
          open={this.state.createNotepadModal}
          onClose={() => this.closeNotepadModal()}
        >
          <Fade in={this.state.createNotepadModal}>
            <div className='notepad-create-modal-container'>
              <h2 id='notepad-create-modal-title'>Create New Notepad</h2>
              <hr />
              <TextFieldGroup
                placeholder='Notepad Name'
                name='notepadTitle'
                type='text'
                label='Notepad Name'
                value={this.state.notepadTitle}
                onChange={this.newNotepadOnChange}
                error={this.state.errors.notepadTitle}
              />
              <TextFieldGroup
                placeholder='Notepad Description'
                name='notepadDescription'
                type='text'
                label='Notepad Description'
                value={this.state.notepadDescription}
                onChange={this.newNotepadOnChange}
                error={this.state.errors.notepadDescription}
              />
              <div className='notepad-create-modal-button'>
                <Fab
                  variant='extended'
                  color='primary'
                  aria-label='add'
                  onClick={() => this.props.createNotepad()}
                >
                  CREATE
                </Fab>
              </div>
            </div>
          </Fade>
        </Modal>
      </SimpleBar>
    );
  }
}

Notepad.propTypes = {
  errors: PropTypes.object.isRequired,
  notepads: PropTypes.object.isRequired,
  notes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  notepads: state.layout.main.notepads,
  notes: state.layout.main.notepads.Notepad1 || {},
  errors: state.errors
});

const mapDispatchToProps = {
  createNote,
  createNotepad
};

export default connect(mapStateToProps, mapDispatchToProps)(Notepad);
