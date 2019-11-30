import React, { PureComponent } from "react";

import { MainMenu, Navigator } from "../";

import { test } from "../../../actions/exampleAction";
import "./Dock.scss";

/**
 * The top panel of the entire app that controls the user navigation
 */
class Dock extends PureComponent {
  render() {
    return (
      <div className='dock'>
        <div style={{ position: "absolute" }}>
          <MainMenu />
        </div>
        <div className='dock-navigators'>
          <Navigator
            className='dock-navigator'
            text='NOTES'
            size='lg'
            onClick={test}
          />
          <Navigator
            className='dock-navigator'
            text='BOARD'
            size='lg'
            onClick={test}
          />
        </div>
      </div>
    );
  }
}

export default Dock;
