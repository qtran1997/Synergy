import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { Icon, MainMenu, Navigator } from "../";

import Button from "@material-ui/core/Button";

import { closeChat, openChat } from "../../../actions/chatBoxActions";
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
            // onClick={}
          />
          <Navigator
            className='dock-navigator'
            text='BOARD'
            size='lg'
            // onClick={test}
          />
        </div>
        <div style={{ position: "absolute", right: 0 }}>
          <Button
            onClick={
              this.props.chat.open
                ? () => this.props.closeChat()
                : () => this.props.openChat()
            }
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
  chat: state.chat
});

const mapDispatchToProps = {
  closeChat,
  openChat
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Dock));
