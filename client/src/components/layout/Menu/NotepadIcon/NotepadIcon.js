import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import Fab from "@material-ui/core/Fab";
import Tooltip from "@material-ui/core/Tooltip";

import "./NotepadIcon.scss";

class NotepadIcon extends PureComponent {
  render() {
    const { picture, title } = this.props;

    // Display picture or display the first letter of the notepad if the picture does not exist
    const icon = picture ? picture : title.substring(0, 1);

    return (
      <div className='notepad-icon-button-container'>
        <Tooltip title={title} placement='right'>
          <Fab
            color='primary'
            className='notepad-icon-button'
            onClick={() => {}}
          >
            {icon}
          </Fab>
        </Tooltip>
      </div>
    );
  }
}

NotepadIcon.propTypes = {
  picture: PropTypes.string,
  title: PropTypes.string.isRequired
};

export default NotepadIcon;
