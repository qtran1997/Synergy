import React, { PureComponent } from "react";

import { Icon, Navigator } from "../";

import Button from "@material-ui/core/Button";

import mainScreen from "../../../constants/mainScreen";
import { MainScreenContext } from "../../../contexts/mainContext";

import "./Dock.scss";

/**
 * The top panel of the entire app that controls the user navigation
 */
class Dock extends PureComponent {
  static contextType = MainScreenContext;

  render() {
    // enum constants
    const { BOARD, NOTEPAD } = mainScreen;

    // Main Screen Context Functions
    const { changeMainScreen, toggleChat, toggleMainMenu } = this.context;

    return (
      <div id='dock'>
        <div style={{ position: "absolute" }}>
          <Button className='dock-main-menu-button' onClick={toggleMainMenu}>
            <Icon name='Dehaze' />
          </Button>
        </div>
        <div className='dock-navigators'>
          <Navigator
            className='dock-navigator'
            text='NOTES'
            size='medium'
            onClick={() => changeMainScreen(NOTEPAD)}
          />
          <Navigator
            className='dock-navigator'
            text='BOARD'
            size='medium'
            onClick={() => changeMainScreen(BOARD)}
          />
        </div>
        <div style={{ position: "absolute", right: 0 }}>
          <Button className='dock-chat-button' onClick={toggleChat}>
            <Icon name='Chat' />
          </Button>
        </div>
      </div>
    );
  }
}

export default Dock;
