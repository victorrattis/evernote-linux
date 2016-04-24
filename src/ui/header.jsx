const React = require('react')

const style = {
  width: '100%',
  height: '73px',
  background: '#F8F8F8',
  borderBottom: '1px solid #ececec',
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
