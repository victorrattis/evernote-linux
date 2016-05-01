'use strict'

const React = require('react')
const SplitPane = require('react-split-pane')

const NotebookHeader = require('./notebook-header')
const NotebookItem = require('./notebook-item')
const AppActions = require('../action/app-action')
const AppStore = require('../store/app-store')

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
}

let ContentNotebook = React.createClass({
  displayName: 'ContentNotebook',

  getInitialState: function () {
    return {
      notebooks: AppStore.getNotebooks()
    }
  },

  componentDidMount: function () {
  },

  componentWillUnmount: function () {
  },

  createNotebookItem: function (item, index) {
    return (
      <NotebookItem
        key={item.id}
        title={item.title}
        number={item.number}
        onClick={() => AppActions.showNotes(index)} />
    )
  },

  // handleClick: function (index) {
  //   console.log('iindex: ' + index)
  //   AppActions.showNotes(index)
  // },

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
    )
  }
})

module.exports = ContentNotebook
