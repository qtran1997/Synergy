import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";

/**
 * The Dock buttons that navigate to different parts of the app
 *
 * @param {String} text - The text that is contained inside of the button
 * @param {String} onClick - The action that is to be performed when the element is clicked
 */
const Navigator = ({ text, onClick, dispatch }) => {
  return (
    <div>
      <Button onClick={() => dispatch(onClick)}>{text}</Button>
    </div>
  );
};

Navigator.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default connect()(Navigator);