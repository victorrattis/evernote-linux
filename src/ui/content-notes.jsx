'use strict'

const React = require('react')
const SplitPane = require('react-split-pane')

const NoteSnippetView = require('./note-snippet-view')
const NoteView = require('./note-view')
const NoteHeader = require('./note-header')
const NoteStore = require('../note-store')

const style = {
  // content: {
  //   // position: 'relative',
  //   // float: 'left',
  //   width: '350px',
  //   height: '100%',
  //   display: 'table',
  //   overflow: 'hidden',
  //   borderRight: '1px solid #ececec'
  // },

  scrollNotes: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    overflowX: 'hidden',
    overflowY: 'auto'
  }
}

let Container = React.createClass({
  displayName: 'Container',

  getInitialState: function () {
    return {
      notes: []
    }
  },

  componentDidMount: function () {
    NoteStore.addChangeListener(this._onChange)
  },

  _onChange: function () {
    this.setState({ notes: NoteStore.getNotes() })
  },

  render: function () {
    var notes = this.state.notes

    return (
      <SplitPane split='vertical' defaultSize={'350px'}>
        <SplitPane split='horizontal' defaultSize={'100px'}>
          <NoteHeader />
          <div style={style.scrollNotes}>
            {notes.map(createNoteItem)}
          </div>
        </SplitPane>
        <NoteView />
      </SplitPane>
    )
  }
})

let createNoteItem = function (item, index) {
  return (
    <NoteSnippetView
      key={index}
      title={item.title}
      date={item.date}
      snippet={item.snippet}
      thumbnail={item.thumbnail} />
  )
}

module.exports = Container
