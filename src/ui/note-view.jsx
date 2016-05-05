'use strict'

const React = require('react')
const NoteEditor = require('./note-editor')

const style = {
  default: {
    background: '#fff',
    height: '100%',
    width: '100%',
    position: 'absolute',
    borderLeft: '1px solid #e5e5e5',
  },
  
  test1: {
    background: '#fff',
    height: '100%',
    position: 'absolute',
    left: '30px',
    right: '30px',
  },


  line: {
    display: 'block',
    height: '1px',
    border: 0,
    borderTop: '1px solid #e5e5e5',
    margin: '1em 0',
    padding: 0,
    position: 'relative',
  },

  title: {
    fontSize: '17px',
    position: 'relative',
    textAlign: 'center',
    width: '100%',
    paddingBottom: '12px',
    color: '#626262'
  },

  header: {
    background: '#fff',
    height: 'auto',
    width: '100%',
    position: 'relative',
    borderBottom: '1px solid #e5e5e5',

  }

}

const NoteView = React.createClass({
  displayName: 'NoteView',

  render: function () {
    return (
      <div style={style.default}>
        <div style={style.test1}>
          <div style={style.header}>
            <h1 style={style.title} >NoteView</h1>
          </div>
          <NoteEditor />
        </div>
      </div>
    )
  }
})

module.exports = NoteView
