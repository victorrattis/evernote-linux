const React = require('react')

const NoteSnippetView = require('./note-snippet-view')
const NoteStore = require('../note-store')

const style = {
  content: {
    position: 'relative',
    // float: 'left',
    width: '350px',
    height: '100%',
    display: 'table',
    overflow: 'hidden',
    borderRight: '1px solid #ececec'
  },

  header: {
    width: '100%',
    height: '100px',
    position: 'relative',
    display: 'table-row',
    overflow: 'hidden'
  },

  scrollNotes: {
    width: '100%',
    height: '100%',
    position: 'relative',
    overflowX: 'hidden',
    overflowY: 'scroll'
  },

  test2: {
    position: 'relative',
    height: 'auto',
    width: '100%',
    display: 'table-row'
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
      <div style={style.content}>
        <div style={style.header}>
          <h1 style={{textAlign: 'center'}}>Header Notes</h1>
        </div>
        <div style={style.test2}>
          <div style={style.scrollNotes}>
              {notes.map(createNoteItem)}
          </div>
        </div>
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
