'use strict'

const React = require('react')
const SplitPane = require('react-split-pane')

const NoteSnippetView = require('./note-snippet-view')
const NoteView = require('./note-view')
const NoteHeader = require('./note-header')
const NoteStore = require('../store/note-store')
const AppAction = require('../action/app-action')

const style = {
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

  createNoteItem: function (item, index) {
    return (
      <NoteSnippetView
        key={item.id}
        title={item.title}
        date={item.updated}
        snippet={item.snippet}
        thumbnail={item.thumbnail}
        onMouseDown={ () => AppAction.selecteNote(item.id) } />
    )
  },

  render: function () {
    var notes = this.state.notes

    return (
      <SplitPane split='vertical' defaultSize={'372px'}>
        <SplitPane split='horizontal' defaultSize={'auto'}>
          <NoteHeader />
          <div style={style.scrollNotes}>
            {notes.map(this.createNoteItem)}
          </div>
        </SplitPane>
        <NoteView />
      </SplitPane>
    )
  }
})

module.exports = ContentNotes
