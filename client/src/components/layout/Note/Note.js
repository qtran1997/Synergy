import React, { PureComponent } from "react";
import ReactDOM from "react-dom";
import Draggable from "react-draggable";
import PropTypes from "prop-types";

import { Icon } from "../";
import { NotepadContext } from "../../../contexts";

import "./Note.scss";

class Note extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.id,
      position: {
        x: this.props.position.x < 0.00001 ? 0 : this.props.position.x,
        y: this.props.position.y < 0.00001 ? 0 : this.props.position.y
      }
    };

    this.onFocus = this.onFocus.bind(this);
    this.onDragStop = this.onDragStop.bind(this);
  }

  onFocus(input) {}

  onDragStart(e) {}

  onDragStop(e) {
    // Get offset height of dock and width of menu to find position of note
    const offsetWidth = document.getElementById("main-menu-mini").clientWidth;
    const offsetHeight = document.getElementById("dock").clientHeight;
    const { x, y } = ReactDOM.findDOMNode(this).getBoundingClientRect();

    // Note Context Function
    const { modifyNote } = this.context;

    const modifiedData = {
      position: {
        x: x < 0 ? 0 : x - offsetWidth,
        y: y < 0 ? 0 : y - offsetHeight
      }
    };

    // Set local state position of note
    this.setState({
      position: modifiedData.position
    });

    // Change position data of note in db
    modifyNote(this.state.id, modifiedData);
  }

  render() {
    const { header, body } = this.props;
    return (
      <Draggable
        bounds='parent'
        handle='.note-draggable-icon'
        defaultPosition={this.state.position}
        onStart={this.onDragStart}
        onStop={this.onDragStop}
        key={this.props.id}
        ref={`note${this.props.id}`}
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

Note.defaultProps = {
  position: {
    // New Notes
    x: 15,
    y: 15
  }
};

Note.contextType = NotepadContext;

export default Note;
