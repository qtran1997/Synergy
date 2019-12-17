import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Fab from "@material-ui/core/Fab";
import Modal from "@material-ui/core/Modal";

import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

import NotepadIcon from "./NotepadIcon/NotepadIcon";

import { Fade, Icon, TextFieldGroup } from "../../";

import { changeNotepad } from "../../../actions/layoutActions";
import { createNotepad, getNotes } from "../../../actions/notepadActions";

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

  componentDidUpdate(prevProps) {
    // Created new notepad and want modal to disappear
    if (
      Object.keys(prevProps.notepads).length <
      Object.keys(this.props.notepads).length
    ) {
      this.setState({ createNotepadModal: false });
    }

    // Notepad has been changed
    if (prevProps.currentNotepadId !== this.props.currentNotepadId) {
      this.props.getNotes(
        this.props.currentNotepadId,
        this.props.notepads[this.props.currentNotepadId]
      );
    }
  }

  newNotepadOnChange(e) {
    this.setState({ [e.target.name]: e.target.value });
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

  render() {
    const notepads = Object.values(this.props.notepads).map(({ id, title }) => (
      <NotepadIcon
        key={id}
        title={title}
        id={id}
        action={() => {
          this.props.changeNotepad(id);
        }}
      />
    ));
    return (
      <div className='main-menu-mini'>
        <SimpleBar className='main-menu-mini-scrollable'>
          {[...notepads]}
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
      </div>
    );
  }
}

MainMenuMini.propTypes = {
  currentNotepadId: PropTypes.string.isRequired,
  notepads: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  currentNotepadId: state.layout.main.display.notepad,
  notepads: state.layout.main.notepads
});

const mapDispatchToProps = {
  changeNotepad,
  createNotepad,
  getNotes
};

export default connect(mapStateToProps, mapDispatchToProps)(MainMenuMini);
