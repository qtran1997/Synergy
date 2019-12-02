import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Form, FormControl } from "react-bootstrap";

import { Icon } from "../index";

import "./ChatBox.scss";

class ChatBox extends PureComponent {
  render() {
    return this.props.chat.open ? (
      <div className='chat-box'>
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
      </div>
    ) : null;
  }
}

ChatBox.propTypes = {
  chat: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  chat: state.chat
});

export default connect(mapStateToProps, null)(withRouter(ChatBox));
