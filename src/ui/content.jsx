const React = require('react')

const NoteSnippetView = require('./note-snippet-view')
const NoteStore = require('../note-store')

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
      <div className='container'>
        {notes.map(createNoteItem)}
      </div>
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
