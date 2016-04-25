const React = require('react')

const ContentNotes = require('./content-notes')

const style = {
  content: {
    width: '100%',
    height: '100%',
    position: 'relative',
    background: '#fff',
    overflow: 'hidden'
  }
}

let Content = React.createClass({
  displayName: 'Content',

  render: function () {
    return (
      <div style={style.content}>
        <ContentNotes />
      </div>
    )
  }
})

module.exports = Content
