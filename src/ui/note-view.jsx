'use strict'

const React = require('react')

const style = {
  default: {
    background: '#F8F8F8',
    height: '100%',
    width: '100%',
    position: 'absolute',
  }
}

let NoteView = React.createClass({
    displayName: 'NoteView',

    render() {
      return (
        <div style={style.default}>
          <h1 style={{textAlign: 'center'}}>NoteView</h1>
        </div>
      )
    }
})

module.exports = NoteView