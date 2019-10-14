import React from "react";
import { Icon as MUIcon } from "@material-ui/core";
import PropTypes from "prop-types";

import "./Icon.scss";

/**
 * React wrapper that displays a Material UI Icon
 *
 * @param {String} name - Name of the Material UI Icon
 * @param {String} [fontSize="default"] - The size of the Icon {default, small, large}
 */
const Icon = ({ name, fontSize = "default" }) => {
  // Retrieve Material UI Icon
  return <MUIcon fontSize={fontSize}>{name}</MUIcon>;
};

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  fontSize: PropTypes.string
};

export default Icon;
