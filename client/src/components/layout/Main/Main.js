import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

import mainScreen from "../../../constants/mainScreen";

import { Board, ChatBox, Dock, MainMenu, Notepad } from "../";

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
  }

  componentDidUpdate(prevProps, _prevState) {
    if (!this.state.auth.isAuthenticated) {
      this.props.history.push("/login");
    }

    // User changed the main display screen
    if (prevProps.display !== this.props.display) {
      this.state.display = this.props.display;
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
          {this.props.chat.open ? <MainMenu /> : null}
          <SimpleBar className='main-app'>{displayMain}</SimpleBar>
          {this.props.chat.open ? <ChatBox /> : null}
        </div>
      </div>
    );
  }
}

MainApp.propTypes = {
  auth: PropTypes.object.isRequired,
  chat: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  chat: state.layout.chat,
  display: state.layout.main.display
});

export default connect(mapStateToProps, null)(MainApp);
