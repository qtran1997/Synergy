import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";

// Enums for the main screen
import mainScreen from "../../../constants/mainScreen";

import {
  Board,
  ChatBox,
  ChatBoxMini,
  Dock,
  MainMenu,
  MainMenuMini,
  Notepad
} from "../";

import { MainScreenContext } from "../../../contexts/";

import "./Main.scss";

class MainApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      auth: props.auth
    };
  }

  componentDidMount() {
    // Get all notepads from the user
    if (this.state.auth.isAuthenticated) {
      this.props.getNotepads();
    }
  }

  static contextType = MainScreenContext;

  render() {
    // Main Screen Context State
    const { chat, display, mainmenu } = this.context;

    // Main Screen Context Functions
    const { changeBoard, changeNotepad } = this.context;

    let displayMain;
    switch (display.screen) {
      case mainScreen.BOARD:
        displayMain = <Board />;
        break;
      case mainScreen.NOTEPAD:
        displayMain = <Notepad currentNotepadId={display.notepad} />;
        break;
      default:
        displayMain = <Notepad currentNotepadId={display.notepad} />;
    }

    return (
      <div className='main'>
        <Dock />
        <div className='main-app-container'>
          {mainmenu.open ? (
            <MainMenu
              display={display}
              changeBoard={changeBoard}
              changeNotepad={changeNotepad}
            />
          ) : (
            <MainMenuMini
              display={display}
              changeBoard={changeBoard}
              changeNotepad={changeNotepad}
            />
          )}
          {displayMain}
          {chat.open ? <ChatBox /> : <ChatBoxMini />}
        </div>
      </div>
    );
  }
}

MainApp.propTypes = {
  auth: PropTypes.object.isRequired,
  display: PropTypes.object.isRequired,
  getNotepads: PropTypes.func
};

export default withRouter(MainApp);
