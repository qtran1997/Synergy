import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

import NotepadIcon from "./NotepadIcon/NotepadIcon";

import "./MainMenu.scss";

class MainMenuMini extends PureComponent {
  render() {
    const notepads = Object.values(this.props.notepads).map(({ id, title }) => (
      <NotepadIcon key={id} title={title} />
    ));
    return (
      <div className='main-menu-mini'>
        <SimpleBar className='main-menu-mini-scrollable'>
          {[...notepads]}
        </SimpleBar>
      </div>
    );
  }
}

MainMenuMini.propTypes = {
  notepads: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  notepads: state.layout.main.notepads
});

export default connect(mapStateToProps, null)(MainMenuMini);
