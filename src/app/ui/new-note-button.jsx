'use strict';

const React = require('react');
// const dateFormat = require('dateformat');
// const ObjectAssign = require('object-assign');

const style = {
  default: {
    background: '#fbfafb',
    display: 'inline-block',
    // margin: '20px',
    border: '1px solid #ceccce',
    borderRadius: '4px',
    padding: '3px',
    cursor: 'pointer',
    WebkitUserDrag: 'none',
    WebkitUserSelect: 'none',
    position: 'absolute',
    right: '10px',
    bottom: '10px',
  },

  image: {
    float: 'left',
    marginRight: '5px',
    marginLeft: '5px',
  },

  text: {
    fontSize: '12px',
    color: '#505050',
    marginRight: '7px',
    position: 'relative',
    top: '2px'
  }
};

let NewNoteButton = React.createClass({
  displayName: 'NewNoteButton',

  handleMouseDown: function () {
    if(this.props.onMouseDown !== undefined) {
      this.props.onMouseDown();
    }
  },

  render: function () {
    let notebook = this.props.notebook ? 'in ' + this.props.notebook : '';

    return (
      <div style={style.default} onMouseDown={this.handleMouseDown} >
        <img style={style.image} src='../../../res/plus-icon.png' />
        <font style={style.text}>New Note {notebook}</font>
      </div>
    );
  }
});

module.exports = NewNoteButton;
