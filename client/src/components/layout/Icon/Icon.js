import React, { PureComponent } from "react";
import * as Icons from "@material-ui/icons";
// import FacebookIcon from "@material-ui/icons/Facebook";
import PropTypes from "prop-types";

import "./Icon.scss";

/**
 * React wrapper that displays a Material UI Icon
 *
 * @param {String} name - Name of the Material UI Icon
 * @param {String} [size="default"] - The size of the Icon {default, small, large}
 */
class Icon extends PureComponent {
  render() {
    const { name, size = "default" } = this.props;

    const ErrorIcon = Icons.ErrorOutline;

    // Retrieve Material UI Icon
    const MUIcon = Icons[name];

    return MUIcon ? <MUIcon fontSize={size} /> : <ErrorIcon fontSize={size} />;
  }
}

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.string
};

export default Icon;
