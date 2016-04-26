'use strict'
const React = require('react')

let NoteSnippetView = React.createClass({
  displayName: 'NoteSnippetView',

  render: function () {
    let title = this.props.title
    let date = this.props.date
    let snippet = this.props.snippet
    let thumbnail

    let titleStyle = 'note-title '
    let snipperStyle = 'note-body '

    if (this.props.thumbnail !== undefined) {
      thumbnail = <img className='note-thumbnail' src={this.props.thumbnail} />
      titleStyle += 'note-tile-smaller'
      snipperStyle += 'note-body-smaller'
    }

    return (
      <div className='note'>
        <div className='divider'></div>
        {thumbnail}
        <div className='note-test'></div>
        <div className='note-border'></div>
        <div className='note-view'>
          <div className={titleStyle}>
            {title}
          </div>
          <div className='note-date'>
            {date}
          </div>
          <div className={snipperStyle}>
            {snippet}
          </div>
        </div>
      </div>
    )
  }
})

module.exports = NoteSnippetView
