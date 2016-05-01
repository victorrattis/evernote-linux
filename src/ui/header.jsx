'use strict'
const React = require('react')

const style = {
  width: '100%',
  height: '58px',
  background: '#d4d2d4',
  borderBottom: '1px solid #adabad',
  margin: '0',
  position: 'relative',
  overflow: 'hidden'
}

let textStyle = {
  textAlign: 'center'
}

let Header = React.createClass({
  displayName: 'Header',

  render: function () {
    return (
      <div style={style}>
        <h1 style={textStyle}>Header</h1>
      </div>
    )
  }
})

module.exports = Header
