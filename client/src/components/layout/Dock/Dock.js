import React, { PureComponent } from "react";

import { MainMenu } from "../";
import Navigator from "./Navigator/Navigator";

import { test } from "../../../actions/exampleAction";
import "./Dock.scss";

/**
 * The top panel of the entire app that controls the user navigation
 */
class Dock extends PureComponent {
  render() {
    return (
      <div className='dock'>
        <MainMenu />
        <Navigator text='NOTES' onClick={test} />
        <Navigator text='BOARD' onClick={test} />
        <Navigator text='CHAT' onClick={test} />
      </div>
    );
  }
}

export default Dock;
