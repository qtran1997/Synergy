import React, { PureComponent } from "react";
import { Form, FormControl } from "react-bootstrap";

import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

import { Icon } from "../index";

import "./MainMenu.scss";

class MainMenu extends PureComponent {
  render() {
    return (
      <SimpleBar className='main-menu-box'>
        <div className='main-menu-box-header'>
          <button
            className='main-menu-box-icon-button'
            onClick={() => console.log("FLKDJSLFKSDJK")}
          >
            <Icon name='Search' />
          </button>
          <Form inline>
            <FormControl
              type='text'
              placeholder='Search'
              className='main-menu-box-search-bar'
            />
          </Form>
        </div>
        <div className='main-menu-box-online'>
          <p>Online - </p>
        </div>
        <div className='main-menu-box-offline'>
          <p>Offline - </p>
        </div>
      </SimpleBar>
    );
  }
}

export default MainMenu;
