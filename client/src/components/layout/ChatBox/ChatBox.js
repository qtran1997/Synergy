import React, { PureComponent } from "react";
import { Form, FormControl } from "react-bootstrap";

import "./ChatBox.scss";

class ChatBox extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='chat-box'>
        <Form inline>
          <FormControl
            type='text'
            placeholder='Search'
            className='chat-box-search-bar'
          />
        </Form>
        <div className='chat-box-online'>
          <p>Online - </p>
        </div>
        <div className='chat-box-offline'>
          <p>Offline - </p>
        </div>
      </div>
    );
  }
}

export default ChatBox;
