const React = require('react')
const SidebarItem = require('./sidebar-item')
const AppActions = require('../app-action')

const style = {
  sidebar: {
    borderRight: '1px solid #ececec',
    float: 'left',
    width: '73px',
    height: '100%',
    background: '#F8F8F8',
    padding: '12px 12px 24px 17px',
    zIndex: 200,
    boxSizing: 'border-box',
    overflow: 'hidden',
    WebkitUserDrag: 'none',
    WebkitUserSelect: 'none',
    cursor: 'default'
  },

  logo: {
    height: '66px'
  },

  unselectable: {
    WebkitUserDrag: 'none',
    WebkitUserSelect: 'none'
  },

  group: {
    marginBottom: '48px'
  }
}

let previousItem

let SideBar = React.createClass({
  displayName: 'SideBar',

  onItemSelected: function (item) {
    AppActions.change()
    if (previousItem !== undefined) {
      previousItem.unmarks()
    }
    previousItem = item
  },

  render: function () {
    return (
      <div style={style.sidebar}>
        <div style={style.logo}>
          <img style={style.unselectable} src='../../resources/evernote-logo1.png' />
        </div>
        <div style={style.group}>
          <SidebarItem
            imgNormal='../../resources/new-note-normal.png'
            imgOver='../../resources/new-note-over.png'
            imgSelected='../../resources/new-note-clicked.png'
            action='NEW_NOTE_ACTION'
            onItemSelected={this.onItemSelected} />
          <SidebarItem
            imgNormal='../../resources/search-normal.png'
            imgOver='../../resources/search-over.png'
            imgSelected='../../resources/search-clicked.png'
            action='SEARCH_ACTION'
            onItemSelected={this.onItemSelected} />
          <SidebarItem
            imgNormal='../../resources/work-chat-normal.png'
            imgOver='../../resources/work-chat-over.png'
            imgSelected='../../resources/work-chat-clicked.png'
            action='SHOW_WORK_CHAT_ACTION'
            onItemSelected={this.onItemSelected} />
        </div>
        <div style={style.group}>
          <SidebarItem
            imgNormal='../../resources/shortcut-normal.png'
            imgOver='../../resources/shortcut-over.png'
            imgSelected='../../resources/shortcut-clicked.png'
            action='SHOW_SHORCUTS_ACTION'
            onItemSelected={this.onItemSelected} />
          <SidebarItem
            imgNormal='../../resources/note-normal.png'
            imgOver='../../resources/note-over.png'
            imgSelected='../../resources/note-clicked.png'
            action='SHOW_NOTES_ACTION'
            onItemSelected={this.onItemSelected} />
          <SidebarItem
            imgNormal='../../resources/notebook-normal.png'
            imgOver='../../resources/notebook-over.png'
            imgSelected='../../resources/notebook-clicked.png'
            action='SHOW_NOTEBOOKS_ACTION'
            onItemSelected={this.onItemSelected} />
          <SidebarItem
            imgNormal='../../resources/tag-normal.png'
            imgOver='../../resources/tag-over.png'
            imgSelected='../../resources/tag-clicked.png'
            action='SHOW_TAGS_ACTION'
            onItemSelected={this.onItemSelected} />
        </div>
      </div>
    )
  }
})

module.exports = SideBar
