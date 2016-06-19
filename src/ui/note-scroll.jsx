'use strict';

const React = require('react');

const NoteItem = require('./note-item');
const AppAction = require('../action/app-action');

let style = {
  default: {
      WebkitUserDrag: 'none',
      WebkitUserSelect: 'none',
      position: 'relative',
      width: '100%',
      height: '100%',
      background: '#f1f1f1'
  },

  header: {
    position: 'relative',
    height: '25px',
    width: '100%',
    background: '#f7f7f7',
    border: '1px solid #cfcdcb',
    boxSizing: 'border-box',
  },

  updateField: {
    float: 'left',
    width: '140px',
    height: '100%',
    position: 'relative',
    fontSize: '13px',
    borderRight: '1px solid #cfcdcb',
    boxSizing: 'border-box',
  },

  titleField: {
    float: 'left',
    position: 'relative',
    fontSize: '13px',
    height: '100%',
  },

  text: {
    fontSize: '11px',
    color: '#404040',
    position: 'relative',
    left: '12px',
    top: '5px'
  },

  scroll: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    overflowX: 'hidden',
    overflowY: 'auto',
    background: '#f1f1f1'
  }
};

let NoteScroll = React.createClass({
  displayName: 'NoteScroll',

  handleMouseDown: function () {
    if(this.props.onMouseDown !== undefined) {
      this.props.onMouseDown();
    }
  },

  createNoteItem: function (item) {
    return (
      <NoteItem
        key={item.noteId}
        title={item.title}
        date={item.updated}
        selected={item.noteId === this.props.selected}
        onMouseDown={ () => {
            AppAction.selecteNote(item.noteId);
          }
        } />
    );
  },

  render: function () {
    let notes = this.props.notes || [];

    return (
      <div style={style.default}>
        <div style={style.header}>
          <div style={style.updateField}>
            <b style={style.text}>Updated</b>
          </div>
          <div style={style.titleField}>
            <b style={style.text}>Title</b>
          </div>
        </div>
        <div style={style.scroll}>
          {notes.map(this.createNoteItem)}
        </div>
      </div>
    );
  }
});

module.exports = NoteScroll;
