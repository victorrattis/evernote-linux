'use strict';

const React = require('react');
const SplitPane = require('react-split-pane');

const NotebookHeader = require('./notebook-header');
const NotebookItem = require('./notebook-item');
const AppActions = require('../action/app-action');
const NotebookStore = require('../store/notebook-store');

const style = {
  test: {
    paddingLeft: '10px',
    paddingTop: '20px',
    background: '#f2f1ef',
    width: '100%',
    height: '100%'
  },

  item: {
    marginBottom: '5px'
  },

  list: {
    margin: 0,
    padding: 0,
    listStyle: 'none'
  }
};

let ContentNotebook = React.createClass({
  displayName: 'ContentNotebook',

  getInitialState: function () {
    return {
      notebooks: NotebookStore.getNotebooks()
    };
  },

  componentDidMount: function () {
    NotebookStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function () {
    NotebookStore.removeChangeListener(this._onChange);
  },

  _onChange: function () {
    this.setState({ notebooks: NotebookStore.getNotebooks() });
  },

  createNotebookItem: function (item, index) {
    return (
      <NotebookItem
        key={item.notebookId}
        title={item.name}
        number={item.number}
        onClick={() => AppActions.showNotes(index)} />
    );
  },

  render: function () {
    return (
      <SplitPane split='horizontal' defaultSize={'auto'}>
        <NotebookHeader />
        <div style={style.test}>
          <ul style={style.list}>
            {this.state.notebooks.map(this.createNotebookItem)}
          </ul>
        </div>
      </SplitPane>
    );
  }
});

module.exports = ContentNotebook;
