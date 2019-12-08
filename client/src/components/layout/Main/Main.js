import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// Enums for the main screen
import mainScreen from "../../../constants/mainScreen";

import { getNotepads } from "../../../actions/notepadActions";

import {
  Board,
  ChatBox,
  ChatBoxMini,
  Dock,
  MainMenu,
  MainMenuMini,
  Notepad
} from "../";

import "./Main.scss";

class MainApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      auth: props.auth,
      display: props.display
    };
  }

  componentDidMount() {
    if (!this.state.auth.isAuthenticated) {
      this.props.history.push("/login");
    }

    // Get all notepads from the user
    this.props.getNotepads();
  }

  componentDidUpdate(prevProps, _prevState) {
    if (!this.state.auth.isAuthenticated) {
      this.props.history.push("/login");
    }

    // User changed the main display screen
    if (prevProps.display !== this.props.display) {
      this.setState({
        display: this.props.display
      });
    }
  }

  render() {
    let displayMain;
    switch (this.props.display) {
      case mainScreen.BOARD:
        displayMain = <Board />;
        break;
      case mainScreen.NOTEPAD:
        displayMain = <Notepad />;
        break;
      default:
        displayMain = <Notepad />;
    }

    return (
      <div className='main'>
        <Dock />
        <div className='main-app-container'>
          {this.props.layout.mainmenu.open ? <MainMenu /> : <MainMenuMini />}
          {displayMain}
          {this.props.layout.chat.open ? <ChatBox /> : <ChatBoxMini />}
        </div>
      </div>
    );
  }
}

MainApp.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  display: state.layout.main.display,
  layout: state.layout,
  notepads: state.layout.main.notepads
});

const mapDispatchToProps = {
  getNotepads
};

export default connect(mapStateToProps, mapDispatchToProps)(MainApp);
