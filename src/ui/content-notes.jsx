'use strict'

const React = require('react')
const SplitPane = require('react-split-pane')

const NoteSnippetView = require('./note-snippet-view')
const NoteView = require('./note-view')
const NoteHeader = require('./note-header')
const NoteStore = require('../store/note-store')
const AppAction = require('../action/app-action')
const NoteScroll = require('./note-scroll')

const style = {
}

let ContentNotes = React.createClass({
  displayName: 'ContentNotes',

  getInitialState: function () {
    return {
      notes: NoteStore.getNotes(),
      selected: NoteStore.getgetIdSelected()
    }
  },

  componentDidMount: function () {
    NoteStore.addChangeListener(this._onChange)
  },

  componentWillUnmount: function () {
    NoteStore.removeChangeListener(this._onChange)
  },

  _onChange: function () {
    this.setState({
      notes: NoteStore.getNotes(),
      selected: NoteStore.getgetIdSelected()
    })
  },

  render: function () {
    return (
      <SplitPane split='vertical' defaultSize={'372px'}>
        <SplitPane split='horizontal' defaultSize={'auto'}>
          <NoteHeader />
          <NoteScroll
            notes={this.state.notes}
            selected={this.state.selected}/>
        </SplitPane>
        <NoteView />
      </SplitPane>
    )
  }
})

module.exports = ContentNotes
