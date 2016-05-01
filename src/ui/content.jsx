'use strict'
const React = require('react')

const ContentNotes = require('./content-notes')
const ContentNotebook = require('./content-notebook')
const ContentTag = require('./content-tag')
const AppStore = require('../store/app-store')

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

  getInitialState: function () {
    return {
      contentId: AppStore.getContentId()
    }
  },

  componentDidMount: function () {
    AppStore.addChangeListener(this._onChange)
  },

  componentWillUnmount: function () {
    AppStore.removeChangeListener(this._onChange)
  },

  _onChange: function () {
    this.setState({ contentId: AppStore.getContentId() })
  },

  render: function () {
    let contentView

    if (this.state.contentId === 'notes') {
      contentView = <ContentNotes />
    } else if (this.state.contentId === 'notebooks') {
      contentView = <ContentNotebook />
    } else if (this.state.contentId === 'tags') {
      contentView = <ContentTag />
    }

    return (
      <div style={style.content}>
        {contentView}
      </div>
    )
  }
})

module.exports = Content
