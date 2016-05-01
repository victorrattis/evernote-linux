'use strict'

const React = require('react')
const SplitPane = require('react-split-pane')

const NoteSnippetView = require('./note-snippet-view')
const NoteView = require('./note-view')
const NoteHeader = require('./note-header')
const NoteStore = require('../store/note-store')

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

let ContentNotes = React.createClass({
  displayName: 'ContentNotes',

  getInitialState: function () {
    return {
      notes: NoteStore.getNotes()
    }
  },

  componentDidMount: function () {
    NoteStore.addChangeListener(this._onChange)
  },

  componentWillUnmount: function () {
    NoteStore.removeChangeListener(this._onChange)
  },

  _onChange: function () {
    this.setState({ notes: NoteStore.getNotes() })
  },

  render: function () {
    var notes = this.state.notes

    return (
      <SplitPane split='vertical' defaultSize={'372px'}>
        <SplitPane split='horizontal' defaultSize={'auto'}>
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
      key={item.id}
      title={item.title}
      date={item.date}
      snippet={item.snippet}
      thumbnail={item.thumbnail} />
  )
}

module.exports = ContentNotes
