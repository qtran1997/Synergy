import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { ChatBox, Dock } from "../";

import "./Main.scss";

class MainApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      auth: props.auth
    };
  }

  componentDidMount() {
    if (!this.state.auth.isAuthenticated) {
      this.props.history.push("/login");
    }
  }

  componentDidUpdate(_prevProps, _prevState) {
    if (!this.state.auth.isAuthenticated) {
      this.props.history.push("/login");
    }
  }
  render() {
    return (
      <div className='main'>
        <Dock />
        <div className='main-container'>
          <div className='main-app'>
            <p>MAIN COMPONENT</p>
          </div>
          <ChatBox />
        </div>
      </div>
    );
  }
}

MainApp.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  null
)(withRouter(MainApp));
