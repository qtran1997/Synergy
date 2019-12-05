import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { Icon, Navigator } from "../";

import Button from "@material-ui/core/Button";

import {
  changeMainScreen,
  toggleChat,
  toggleMainMenu
} from "../../../actions/layoutActions";
import mainScreen from "../../../constants/mainScreen";
import "./Dock.scss";

/**
 * The top panel of the entire app that controls the user navigation
 */
class Dock extends PureComponent {
  render() {
    // enum constants
    const { BOARD, NOTEPAD } = mainScreen;

    return (
      <div className='dock'>
        <div style={{ position: "absolute" }}>
          <Button
            className='dock-main-menu-button'
            onClick={() => this.props.toggleMainMenu()}
          >
            <Icon name='Dehaze' />
          </Button>
        </div>
        <div className='dock-navigators'>
          <Navigator
            className='dock-navigator'
            text='NOTES'
            size='lg'
            onClick={() => this.props.changeMainScreen(NOTEPAD)}
          />
          <Navigator
            className='dock-navigator'
            text='BOARD'
            size='lg'
            onClick={() => this.props.changeMainScreen(BOARD)}
          />
        </div>
        <div style={{ position: "absolute", right: 0 }}>
          <Button
            className='dock-chat-button'
            onClick={() => this.props.toggleChat()}
          >
            <Icon name='Chat' />
          </Button>
        </div>
      </div>
    );
  }
}

Dock.propTypes = {
  chat: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  chat: state.layout.chat
});

const mapDispatchToProps = {
  changeMainScreen,
  toggleChat,
  toggleMainMenu
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Dock));
