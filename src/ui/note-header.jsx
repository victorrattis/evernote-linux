'use strict'

const React = require('react')

const style = {
  header: {
    width: '100%',
    height: '100px',
    position: 'absolute',
    overflow: 'hidden'
  }
}

let NoteHeader = React.createClass({
    displayName: 'NoteHeader',

    render() {
        return (
          <div style={style.header}>
            <h1 style={{textAlign: 'center'}}>Header Notes</h1>
          </div>
        )
    }
})

module.exports = NoteHeader
