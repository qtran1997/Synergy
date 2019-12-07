import React, { PureComponent } from "react";

import { Note } from "../";

import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

import "./Notepad.scss";

class Notepad extends PureComponent {
  render() {
    return (
      <SimpleBar className='notepad-container'>
        <Note header='FUCK' body='shit' />
      </SimpleBar>
    );
  }
}

export default Notepad;
