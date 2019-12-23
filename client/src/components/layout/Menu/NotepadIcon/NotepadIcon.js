import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import Fab from "@material-ui/core/Fab";
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";

import "./NotepadIcon.scss";

class NotepadIcon extends PureComponent {
  render() {
    const { action, picture, title } = this.props;

    // Display picture or display the first letter of the notepad if the picture does not exist
    const icon = picture ? picture : title.substring(0, 1);

    return (
      <div className='notepad-icon-button-container'>
        <Tooltip TransitionComponent={Zoom} title={title} placement='right'>
          <Fab
            color='primary'
            className='notepad-icon-button'
            onClick={() => {
              action();
            }}
          >
            {icon}
          </Fab>
        </Tooltip>
      </div>
    );
  }
}

NotepadIcon.propTypes = {
  picture: PropTypes.any, // TODO: CHANGE THIS
  title: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired
};

export default NotepadIcon;
