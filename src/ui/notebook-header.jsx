'use strict'

const React = require('react')

const style = {
  header: {
    width: '100%',
    height: '52px',
    position: 'relative',
    overflow: 'hidden',
    background: '#fbf7f4',
    borderBottom: '1px solid #cfcecb'
  },

  title: {
    fontSize: '17px',
    bottom: '0px',
    position: 'absolute',
    textAlign: 'center',
    width: '100%',
    paddingBottom: '12px',
    color: '#626262'
  },

  arrow: {
    paddingBottom: '2px',
    paddingLeft: '5px'
  },

  tag: {
    position: 'relative',
    height: '100%',
    width: '20px',
    float: 'right',
    paddingRight: '16px',
    paddingTop: '16px'
  }
}

const NotebookHeader = React.createClass({
  displayName: 'NotebookHeader',

  render: function () {
    return (
      <div style={style.header}>
        <div style={style.title}>
          Notebook Header
        </div>
      </div>
    )
  }
})

module.exports = NotebookHeader
