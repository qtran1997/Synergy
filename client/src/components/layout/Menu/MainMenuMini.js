import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import Fab from "@material-ui/core/Fab";
import Modal from "@material-ui/core/Modal";

import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

import NotepadIcon from "./NotepadIcon/NotepadIcon";

import { Fade, Icon, TextFieldGroup } from "../../";

import { NotepadContext } from "../../../contexts";

import "./MainMenu.scss";

class MainMenuMini extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      createNotepadModal: false,
      errors: {},
      notepadTitle: "",
      notepadDescription: ""
    };

    this.newNotepadOnChange = this.newNotepadOnChange.bind(this);
    this.newNotepadOnSubmit = this.newNotepadOnSubmit.bind(this);
  }

  newNotepadOnChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  newNotepadOnSubmit(e) {
    // Notepad Context Functions
    const { createNotepad } = this.context;

    e.preventDefault();

    const notepadData = {
      title: this.state.notepadTitle,
      description: this.state.notepadDescription
    };

    this.setState({ createNotepadModal: false });

    createNotepad(notepadData);
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

  render() {
    // Notepad Context State
    const { notepads } = this.context;

    // Notepad Context Functions
    const { getNotes } = this.context;

    const notepadIcons = Object.values(notepads).map(({ id, title }) => (
      <NotepadIcon
        key={id}
        title={title}
        id={id}
        action={() => {
          this.props.changeNotepad(id);
          getNotes(id, notepads[id].noteIds);
        }}
      />
    ));
    return (
      <div className='main-menu-mini'>
        <SimpleBar className='main-menu-mini-scrollable'>
          {[...notepadIcons]}
          <NotepadIcon
            key='create-notepad'
            title='Create New Notepad'
            picture={<Icon name='Add' />}
            id='create-notepad'
            action={() => this.openNotepadModal()}
          />
        </SimpleBar>
        <Modal
          aria-labelledby='notepad-create-modal-title'
          aria-describedby='notepad-create-modal-description'
          className='notepad-create-modal'
          open={this.state.createNotepadModal}
          onClose={() => this.closeNotepadModal()}
        >
          <Fade in={this.state.createNotepadModal}>
            <form onSubmit={this.newNotepadOnSubmit}>
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
                    type='submit'
                    onClick={() => this.openNotepadModal()}
                  >
                    CREATE
                  </Fab>
                </div>
              </div>
            </form>
          </Fade>
        </Modal>
      </div>
    );
  }
}

MainMenuMini.propTypes = {
  changeNotepad: PropTypes.func.isRequired
};

MainMenuMini.contextType = NotepadContext;

export default MainMenuMini;
