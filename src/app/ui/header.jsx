'use strict';

const React = require('react');

const NotebookStore = require('../store/notebook-store');
const NewNoteButton = require('./new-note-button');
const AppAction = require('../action/app-action');

const style = {
  default: {
    width: '100%',
    height: '58px',
    background: '#d4d2d4',
    borderBottom: '1px solid #adabad',
    margin: '0px',
    position: 'relative',
    overflow: 'hidden'
  }
};

let Header = React.createClass({
  displayName: 'Header',

  handleMouseDown: function () {
    AppAction.newNote();
  },

  render: function () {
    let notebook = NotebookStore.getNotebookDefault();

    return (
      <div style={style.default}>
        <NewNoteButton
          notebook={notebook}
          onMouseDown={this.handleMouseDown} />
      </div>
    );
  }
});

module.exports = Header;
