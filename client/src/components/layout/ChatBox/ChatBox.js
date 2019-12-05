import React, { PureComponent } from "react";
import { Form, FormControl } from "react-bootstrap";

import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

import { Icon } from "../index";

import "./ChatBox.scss";

class ChatBox extends PureComponent {
  render() {
    return (
      <SimpleBar className='chat-box'>
        <div className='chat-box-header'>
          <button
            className='chat-box-icon-button'
            onClick={() => console.log("FLKDJSLFKSDJK")}
          >
            <Icon name='Search' />
          </button>
          <Form inline>
            <FormControl
              type='text'
              placeholder='Search'
              className='chat-box-search-bar'
            />
          </Form>
        </div>
        <div className='chat-box-online'>
          <p>Online - </p>
        </div>
        <div className='chat-box-offline'>
          <p>Offline - </p>
        </div>
      </SimpleBar>
    );
  }
}

export default ChatBox;
