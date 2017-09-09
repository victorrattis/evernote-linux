'use strict';

const React = require('react');
const dateFormat = require('dateformat');
const ObjectAssign = require('object-assign');

const style = {
  item: {
    WebkitUserDrag: 'none',
    WebkitUserSelect: 'none',
    position: 'relative',
    width: 'auto',
    height: '25px',
    cursor: 'pointer',
  },

  selected: {
    background: '#fff',
    border: '1px solid #81bef3',
    boxSizing: 'border-box'
  },

  updateField: {
    float: 'left',
    width: '140px',
    position: 'relative',
    fontSize: '13px'
  },

  titleField: {
    fontSize: '12px',
    fontWeight: 400,
    marginBottom: '4px',
    overflow: 'hidden',
    overflowWrap: 'break-word',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    wordWrap: 'break-word',
    lineHeight: '20px',
    paddingLeft: '12px',
    paddingRight: '12px'
  },

  text: {
    fontSize: '12px',
    position: 'relative',
    left: '12px',
    top: '5px'
  },
};

let NoteItem = React.createClass({
  displayName: 'NoteItem',

  handleMouseDown: function () {
    if(this.props.onMouseDown !== undefined) {
      this.props.onMouseDown();
    }
  },

  render: function () {
    let selected = this.props.selected;
    let inlineStyle = selected ? ObjectAssign({}, style.item, style.selected) : style.item;
    let updated = dateFormat(new Date(this.props.date), 'mmm dd, yyyy');

    return (
      <div style={inlineStyle} onMouseDown={this.handleMouseDown} >
          <div style={style.updateField}>
            <font style={style.text}>{updated}</font>
          </div>
          <div style={style.titleField}  >{this.props.title}</div>
      </div>
    )
  }
});

module.exports = NoteItem;
