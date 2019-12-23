import React, { PureComponent } from "react";
import Draggable from "react-draggable";
import PropTypes from "prop-types";

import { Icon } from "../";

import "./Note.scss";

class Note extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.id,
      x: this.props.x || 15,
      y: this.props.y || 15
    };
  }

  onFocus(input) {}

  onDragStop() {}

  render() {
    const { header, body } = this.props;
    return (
      <Draggable
        bounds='parent'
        handle='.note-draggable-icon'
        defaultPosition={{
          x: this.state.x,
          y: this.state.y
        }}
      >
        <div className='note-container'>
          <div className='note-header'>
            <span>{header}</span>
            <span style={{ position: "absolute", right: 0 }}>
              <Icon name='Edit' />
              <Icon name='Close' />
            </span>
          </div>
          <div className='note-body'>
            <span>{body}</span>
          </div>
          <div className='note-footer'>
            <span className='note-draggable-icon'>
              <Icon name='Adjust' />
            </span>
          </div>
        </div>
      </Draggable>
    );
  }
}

Note.propTypes = {
  id: PropTypes.string.isRequired,
  position: PropTypes.object.isRequired
};

export default Note;
